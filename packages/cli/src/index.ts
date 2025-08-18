#!/usr/bin/env node

import { Command } from 'commander';
import fetch from 'node-fetch';
import ora from 'ora';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';

const program = new Command();

// =================================================================
// COMANDO INIT (ATUALIZADO COM O TEMA DO FIGMA PARA TAILWIND v4)
// =================================================================
program
  .command('init')
  .description('Inicializa seu projeto com o tema "Skins Games" para Tailwind CSS v4')
  .action(async () => {
    const spinner = ora('Iniciando configuração...').start();
    try {
      spinner.stop();
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
      ]);
      spinner.start('Configurando arquivos...');

      const componentsJson = {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: false,
        tsx: true,
        tailwind: {
          config: "tailwind.config.js",
          css: options.tailwindCssFile,
          baseColor: "slate", 
          cssVariables: true,
        },
        aliases: {
          components: options.componentsAlias,
          utils: options.utilsAlias,
        },
      };
      await fs.writeFile('components.json', JSON.stringify(componentsJson, null, 2));
      spinner.succeed('Arquivo `components.json` criado.');

      spinner.start('Adicionando tema do Figma ao CSS...');
      const themeConfig = `
      /* Configuração de tema "Skins Games" adicionada por @roxygens/ui-startkit */
        @import "tailwindcss/preflight";
        @import "tailwindcss/utilities";

        @layer base {
          :root {
            --radius: 0.5rem; /* 8px */
          }
        }

        @theme {
          /* MODO CLARO (LIGHT MODE) */
          --background: hsl(0 0% 96.1%); /* #F5F5F5 */
          --foreground: hsl(220 16% 12%); /* #1A1D23 */

          --card: hsl(0 0% 96.1%); /* #F5F5F5 */
          --card-foreground: hsl(220 16% 12%); /* #1A1D23 */

          --popover: hsl(0 0% 100%);
          --popover-foreground: hsl(220 16% 12%);

          --primary: hsl(220 16% 12%); /* #1A1D23 */
          --primary-foreground: hsl(0 0% 100%); /* #FFFFFF */
          
          --secondary: hsl(0 0% 52.2%); /* #858585 */
          --secondary-foreground: hsl(0 0% 100%); /* #FFFFFF */
          
          --muted: hsl(240 5% 90%); /* Um cinza mais claro para texto muted */
          --muted-foreground: hsl(0 0% 45%);

          --accent: hsl(240 5% 92%); /* Cor de hover sutil */
          --accent-foreground: hsl(220 16% 12%);

          --destructive: hsl(0 97% 49%); /* #F90404 */
          --destructive-foreground: hsl(0 0% 100%);

          --border: hsl(240 5% 90%); /* #E4E4E7 */
          --input: hsl(240 5% 90%);
          --ring: hsl(220 16% 12%);

          /* MODO ESCURO (DARK MODE) */
          .dark {
            --background: hsl(220 15% 8%); /* #111317 */
            --foreground: hsl(0 0% 100%); /* #FFFFFF */

            --card: hsl(220 16% 12%); /* #1A1D23 */
            --card-foreground: hsl(0 0% 100%);

            --popover: hsl(220 16% 12%);
            --popover-foreground: hsl(0 0% 100%);

            --primary: hsl(0 0% 96.1%); /* #F5F5F5 - Botão claro */
            --primary-foreground: hsl(220 15% 8%); /* #111317 - Texto escuro no botão */

            --secondary: hsl(240 5% 16%); /* #27272A */
            --secondary-foreground: hsl(0 0% 100%);
            
            --muted: hsl(240 5% 16%);
            --muted-foreground: hsl(0 0% 52.2%);

            --accent: hsl(225 9% 19%); /* Hover um pouco mais claro que o card */
            --accent-foreground: hsl(0 0% 100%);

            --destructive: hsl(0 97% 49%); /* #F90404 */
            --destructive-foreground: hsl(0 0% 100%);
            
            --border: hsl(225 9% 19%);
            --input: hsl(225 9% 19%);
            --ring: hsl(0 0% 96.1%);
          }
        }

        @layer base {
          * {
            @apply border-border;
          }
          body {
            @apply bg-background text-foreground;
            font-family: Inter, sans-serif; /* Adicionado para combinar com o Figma */
          }
        }
      `;

      const originalCss = await fs.readFile(options.tailwindCssFile, 'utf-8');
      await fs.writeFile(options.tailwindCssFile, themeConfig + '\n' + originalCss);
      spinner.succeed(`Tema "Skins Games" adicionado a \`${options.tailwindCssFile}\`.`);

      spinner.start('Instalando dependências...');
      const dependencies = ['tailwindcss-animate', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'];
      await execa('npm', ['install', ...dependencies]);
      spinner.succeed('Dependências instaladas.');

      console.log(chalk.green('\n✔ Projeto inicializado com sucesso!'));
      console.log(chalk.yellow('\n🚨 Lembretes:'));
      console.log(chalk.yellow('  - Certifique-se de que seu `tailwind.config.js` está configurado para o modo escuro (`darkMode: "class"`).'));
      console.log(chalk.yellow('  - Adicione a fonte "Inter" ao seu projeto para uma correspondência visual perfeita.'));

    } catch (error) {
      spinner.fail('Falha na inicialização.');
      console.error(chalk.red(error));
    }
  });


program
  .command('add <component>')
  .description('Adiciona um componente ao seu projeto')
  .action(async (componentName) => {
    const spinner = ora('Buscando registro de componentes...').start();
    try {
      const REGISTRY_URL = "https://raw.githubusercontent.com/roxygens/ui-startkit/main/registry.json";
      const response = await fetch(REGISTRY_URL);
      const registry: any = await response.json();
      spinner.succeed('Registro encontrado.');

      const componentData = registry.components[componentName];
      if (!componentData) {
        spinner.fail(`Erro: Componente '${componentName}' não encontrado no registro.`);
        return;
      }
      
      spinner.start(`Instalando ${componentData.name}...`);
      
      let config;
      try {
        const configContent = await fs.readFile('components.json', 'utf-8');
        config = JSON.parse(configContent);
      } catch (error) {
        spinner.fail('Erro: Arquivo `components.json` não encontrado. Por favor, execute `npx @roxygens/ui-startkit@latest init` primeiro.');
        return;
      }

      for (const file of componentData.files) {
        const fileContent = await fetch(file.contentUrl).then(res => res.text());
        
        let savePath;
        if (file.path.includes("lib/utils")) {
            const utilsDir = config.aliases.utils.replace('@/', 'src/');
            savePath = path.join(process.cwd(), utilsDir + ".ts");
        } else {
            const componentsDir = config.aliases.components.replace('@/', 'src/');
            savePath = path.join(process.cwd(), componentsDir, path.basename(file.path));
        }
        
        await fs.ensureDir(path.dirname(savePath));
        await fs.writeFile(savePath, fileContent);
      }
      
      spinner.succeed(`${componentData.name} instalado com sucesso!`);
      
      if (componentData.dependencies?.length > 0) {
        console.log(chalk.yellow('\nEste componente tem dependências adicionais:'));
        console.log(`npm install ${componentData.dependencies.join(' ')}`);
      }

    } catch (error) {
      spinner.fail('Falha ao buscar ou instalar o componente.');
      console.error(chalk.red(error));
    }
  });


program.parse(process.argv);