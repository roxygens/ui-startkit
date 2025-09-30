#!/usr/bin/env node
import 'dotenv/config'
import { Command } from 'commander'
import fetch from 'node-fetch'
import ora from 'ora'
import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'
import { execa } from 'execa'
import chalk from 'chalk'

const program = new Command()

// =================================================================
// COMANDO INIT (ATUALIZADO COM O TEMA DO FIGMA PARA TAILWIND v4)
// =================================================================
program
  .command('init')
  .description('Inicializa seu projeto com o tema "Default" para Tailwind CSS v4')
  .action(async () => {
    const spinner = ora('Iniciando configuração...').start()
    try {
      spinner.stop()
      const options = await prompts([
        {
          type: 'text',
          name: 'tailwindCssFile',
          message: 'Onde está seu arquivo CSS global?',
          initial: 'src/app/globals.css',
        },
        {
          type: 'text',
          name: 'componentsAlias',
          message: 'Qual alias você quer para os componentes?',
          initial: '@/components/ui',
        },
        {
          type: 'text',
          name: 'utilsAlias',
          message: 'Qual alias você quer para os utils?',
          initial: '@/lib/utils',
        },
      ])
      spinner.start('Configurando arquivos...')

      const componentsJson = {
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'default',
        rsc: false,
        tsx: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: options.tailwindCssFile,
          baseColor: 'slate',
          cssVariables: true,
        },
        aliases: {
          components: options.componentsAlias,
          utils: options.utilsAlias,
        },
      }

      await fs.writeFile('components.json', JSON.stringify(componentsJson, null, 2))
      spinner.succeed('Arquivo `components.json` criado.')

      spinner.start('Adicionando tema ao CSS...')

      const cssPath = path.resolve(__dirname, 'index.css')
      const themeConfig = await fs.readFile(cssPath, 'utf-8')
      const originalCss = await fs.readFile(options.tailwindCssFile, 'utf-8')

      function mergeCss(base: string, update: string): string {
        const baseLines = base
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
        const updateLines = update
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)

        const sameLines = updateLines.filter((line) => baseLines.includes(line)).length
        const similarity = sameLines / updateLines.length

        if (similarity > 0.9) {
          const mergedLines = [
            ...updateLines,
            ...baseLines.filter((line) => !updateLines.includes(line)),
          ]
          return mergedLines.join('\n')
        }

        return update + '\n' + base
      }

      const mergedCss = mergeCss(originalCss, themeConfig)
      await fs.writeFile(options.tailwindCssFile, mergedCss)
      spinner.succeed(`Tema "Skins Games" adicionado a \`${options.tailwindCssFile}\`.`)

      spinner.start('Instalando dependências...')
      const dependencies = ['tailwindcss-animate', 'lucide-react', 'tw-animate-css']
      await execa('npm', ['install', ...dependencies])
      spinner.succeed('Dependências instaladas.')

      console.log(chalk.green('\n✔ Projeto inicializado com sucesso!'))
      console.log(chalk.yellow('\n🚨 Lembretes:'))
      console.log(
        chalk.yellow(
          '  - Adicione a fonte "Manrope" ao seu projeto para uma correspondência visual perfeita.',
        ),
      )
    } catch (error) {
      spinner.fail('Falha na inicialização.')
      console.error(chalk.red(error))
    }
  })

program
  .command('add <component>')
  .description('Adiciona um componente ao seu projeto')
  .action(async (componentName) => {
    const spinner = ora('Buscando registro de componentes...').start()
    try {
      const REGISTRY_API_URL =
        'https://api.github.com/repos/roxygens/ui-startkit/contents/registry.json'

      const response = await fetch(REGISTRY_API_URL)

      const fileData: any = await response.json()

      const registryContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
      const registry = JSON.parse(registryContent)

      spinner.succeed('Registro encontrado.')

      const componentData = registry.components[componentName]

      if (!componentData) {
        spinner.fail(`Erro: Componente '${componentName}' não encontrado no registro.`)
        return
      }

      spinner.start(`Instalando ${componentData.name}...`)

      let config
      try {
        const configContent = await fs.readFile('components.json', 'utf-8')
        config = JSON.parse(configContent)
      } catch (error) {
        spinner.fail(
          'Erro: Arquivo `components.json` não encontrado. Por favor, execute `npx ui-startkit@latest init` primeiro.',
        )
        return
      }

      for (const file of componentData.files) {
        const fileResponse = await fetch(file.contentUrl)

        if (!fileResponse.ok) {
          throw new Error(`Erro ao baixar arquivo: ${file.path}`)
        }
        const fileContent = await fileResponse.text()

        let savePath
        if (file.path.includes('lib/utils')) {
          const utilsDir = config.aliases.utils.replace('@/', 'src/')
          savePath = path.join(process.cwd(), utilsDir + '.ts')
        } else {
          const componentsDir = config.aliases.components.replace('@/', 'src/')
          savePath = path.join(process.cwd(), componentsDir, path.basename(file.path))
        }

        await fs.ensureDir(path.dirname(savePath))
        await fs.writeFile(savePath, fileContent)
      }

      spinner.succeed(`${componentData.name} instalado com sucesso!`)

      if (componentData.dependencies?.length > 0) {
        console.log(chalk.yellow('\nEste componente tem dependências adicionais:'))
        console.log(`npm install ${componentData.dependencies.join(' ')}`)
        await execa('npm', ['install', ...componentData.dependencies], {
          stdio: 'inherit',
          shell: true,
        })
      }
    } catch (error) {
      spinner.fail('Falha ao buscar ou instalar o componente.')
      console.error(chalk.red(error))
    }
  })

program.parse(process.argv)
