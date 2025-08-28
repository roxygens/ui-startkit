#!/usr/bin/env node

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
  .description('Inicializa seu projeto com o tema "Skins Games" para Tailwind CSS v4')
  .action(async () => {
    const spinner = ora('Iniciando configuração...').start()
    try {
      spinner.stop()
      const options = await prompts([
        {
          type: 'text',
          name: 'tailwindCssFile',
          message: 'Onde está seu arquivo CSS global?',
          initial: 'src/index.css',
        },
        {
          type: 'text',
          name: 'componentsAlias',
          message: 'Qual alias você quer para os componentes?',
          initial: '@/components',
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
      const themeConfig = `
      /* Configuração de tema "Skins Games" adicionada por @roxygens/ui-startkit */
        @import "tailwindcss";
        @import "tw-animate-css";

        @custom-variant dark (&:is(.dark *));

        @theme inline {
          --radius-sm: 8px;
          --radius-md: calc(var(--radius) - 2px);
          --radius-lg: var(--radius);
          --radius-xl: calc(var(--radius) + 4px);
          --color-background: var(--background);
          --color-foreground: var(--foreground);
          --color-card: var(--card);
          --color-card-foreground: var(--card-foreground);
          --color-popover: var(--popover);
          --color-popover-foreground: var(--popover-foreground);
          --color-primary: var(--primary);
          --color-primary-foreground: var(--primary-foreground);
          --color-primary-hover: var(--primary-hover);
          --color-secondary: var(--secondary);
          --color-secondary-foreground: var(--secondary-foreground);
          --color-secondary-border: var(--secondary-border);
          --color-secondary-foreground-border: var(--secondary-foreground-border);
          --color-secondary-foreground-hover: var(--secondary-foreground-hover);
          --color-secondary-disabled: var(--secondary-foreground-hover);
          --color-secondary-foreground-disabled: var(--secondary-foreground-disabled);
          --color-tertiary: var(--tertiary);
          --color-tertiary-hover: var(--tertiary-hover);
          --color-tertiary-foreground: var(--tertiary-foreground);
          --color-tertiary-border: var(--tertiary-border);
          --color-tertiary-foreground-border: var(--tertiary-foreground-border);
          --color-tertiary-foreground-hover: var(--tertiary-foreground-hover);
          --color-tertiary-disabled: var(--tertiaryy-foreground-hover);
          --color-tertiary-foreground-disabled: var(--tertiary-foreground-hover);
          --color-link-foreground: var(--link-foreground);
          --color-link-foreground-hover: var(--link-foreground-hover);
          --color-link-foreground-disabled: var(--link-foreground-disabled);
          --color-muted: var(--muted);
          --color-muted-foreground: var(--muted-foreground);
          --color-accent: var(--accent);
          --color-accent-foreground: var(--accent-foreground);
          --color-destructive: var(--destructive);
          --color-border: var(--border);
          --color-input: var(--input);
          --color-ring: var(--ring);
          --color-chart-1: var(--chart-1);
          --color-chart-2: var(--chart-2);
          --color-chart-3: var(--chart-3);
          --color-chart-4: var(--chart-4);
          --color-chart-5: var(--chart-5);
          --color-sidebar: var(--sidebar);
          --color-sidebar-foreground: var(--sidebar-foreground);
          --color-sidebar-primary: var(--sidebar-primary);
          --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
          --color-sidebar-accent: var(--sidebar-accent);
          --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
          --color-sidebar-border: var(--sidebar-border);
          --color-sidebar-ring: var(--sidebar-ring);
        }

        :root {
          --radius: 0.625rem;
          --background: #0C0E12 ;
          --foreground: oklch(0.145 0 0);
          --card: oklch(1 0 0);
          --card-foreground: oklch(0.145 0 0);
          --popover: oklch(1 0 0);
          --primary: #23C7FD;
          --primary-rgb: 35, 199, 253;
          --primary-foreground: #031328;
          --primary-hover: #1AA4D0;
          --primary-disabled: #434651;
          --primary-foreground-disabled: #A3A2A8;
          --secondary: transparent;
          --secondary-foreground: #FFFFFF;
          --secondary-border: #3A3A3A;
          --secondary-foreground-border: #3A3A3A;
          --secondary-foreground-hover: #23C7FD;
          --secondary-disabled: #434651;
          --secondary-foreground-disabled: #A3A2A8;
          --tertiary: #FFFFFF;
          --tertiary-hover: #DEDEDE;
          --tertiary-foreground: #3A3A3A;
          --tertiary-border: #3A3A3A;
          --tertiary-foreground-border: #3A3A3A;
          --tertiary-foreground-hover: #3A3A3A;
          --tertiary-disabled: #434651;
          --tertiary-foreground-disabled: #A3A2A8;
          --link-foreground: #FFFFFF;
          --link-foreground-hover: #23C7FD;
          --link-foreground-disabled: #A3A2A8;
          --muted: oklch(0.97 0 0);
          --muted-foreground: #707179;
          --accent: oklch(0.97 0 0);
          --accent-foreground: oklch(0.205 0 0);
          --destructive: #EF4444;
          --border: oklch(0.922 0 0);
          --input: oklch(0.922 0 0);
          --ring: oklch(0.708 0 0);
          --chart-1: oklch(0.646 0.222 41.116);
          --chart-2: oklch(0.6 0.118 184.704);
          --chart-3: oklch(0.398 0.07 227.392);
          --chart-4: oklch(0.828 0.189 84.429);
          --chart-5: oklch(0.769 0.188 70.08);
          --sidebar: oklch(0.985 0 0);
          --sidebar-foreground: oklch(0.145 0 0);
          --sidebar-primary: oklch(0.205 0 0);
          --sidebar-primary-foreground: oklch(0.985 0 0);
          --sidebar-accent: oklch(0.97 0 0);
          --sidebar-accent-foreground: oklch(0.205 0 0);
          --sidebar-border: oklch(0.922 0 0);
          --sidebar-ring: oklch(0.708 0 0);
          --card-background: #1F1F1F;
        }

        .dark {
          --background: oklch(0.145 0 0);
          --foreground: oklch(0.985 0 0);
          --card: oklch(0.205 0 0);
          --card-foreground: oklch(0.985 0 0);
          --popover: oklch(0.205 0 0);
          --popover-foreground: oklch(0.985 0 0);
          --primary: oklch(0.922 0 0);
          --primary-foreground: #031328;
          --primary-hover: #031328;
          --secondary: oklch(0.269 0 0);
          --secondary-foreground: oklch(0.985 0 0);
          --muted: oklch(0.269 0 0);
          --muted-foreground: oklch(0.708 0 0);
          --accent: oklch(0.269 0 0);
          --accent-foreground: oklch(0.985 0 0);
          --destructive: oklch(0.704 0.191 22.216);
          --border: oklch(1 0 0 / 10%);
          --input: oklch(1 0 0 / 15%);
          --ring: oklch(0.556 0 0);
          --chart-1: oklch(0.488 0.243 264.376);
          --chart-2: oklch(0.696 0.17 162.48);
          --chart-3: oklch(0.769 0.188 70.08);
          --chart-4: oklch(0.627 0.265 303.9);
          --chart-5: oklch(0.645 0.246 16.439);
          --sidebar: oklch(0.205 0 0);
          --sidebar-foreground: oklch(0.985 0 0);
          --sidebar-primary: oklch(0.488 0.243 264.376);
          --sidebar-primary-foreground: oklch(0.985 0 0);
          --sidebar-accent: oklch(0.269 0 0);
          --sidebar-accent-foreground: oklch(0.985 0 0);
          --sidebar-border: oklch(1 0 0 / 10%);
          --sidebar-ring: oklch(0.556 0 0);
          --card-background: #1F1F1F;
        }

        @layer base {
          * {
            @apply border-border outline-ring/50;
          }
          body {
            @apply bg-background text-foreground;
          }
        }

      `

      const originalCss = await fs.readFile(options.tailwindCssFile, 'utf-8')
      await fs.writeFile(options.tailwindCssFile, themeConfig + '\n' + originalCss)
      spinner.succeed(`Tema "Skins Games" adicionado a \`${options.tailwindCssFile}\`.`)

      spinner.start('Instalando dependências...')
      const dependencies = [
        'tailwindcss-animate',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
      ]
      await execa('npm', ['install', ...dependencies])
      spinner.succeed('Dependências instaladas.')

      console.log(chalk.green('\n✔ Projeto inicializado com sucesso!'))
      console.log(chalk.yellow('\n🚨 Lembretes:'))
      console.log(
        chalk.yellow(
          '  - Certifique-se de que seu `tailwind.config.js` está configurado para o modo escuro (`darkMode: "class"`).',
        ),
      )
      console.log(
        chalk.yellow(
          '  - Adicione a fonte "Inter" ao seu projeto para uma correspondência visual perfeita.',
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
      const REGISTRY_URL =
        'https://raw.githubusercontent.com/roxygens/ui-startkit/main/registry.json'
      const response = await fetch(REGISTRY_URL)
      const registry: any = await response.json()
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
          'Erro: Arquivo `components.json` não encontrado. Por favor, execute `npx @roxygens/ui-startkit@latest init` primeiro.',
        )
        return
      }

      for (const file of componentData.files) {
        const fileContent = await fetch(file.contentUrl).then((res) => res.text())

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
      }
    } catch (error) {
      spinner.fail('Falha ao buscar ou instalar o componente.')
      console.error(chalk.red(error))
    }
  })

program.parse(process.argv)
