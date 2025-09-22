[<img src="https://flagcdn.com/w20/us.png" alt="Bandeira dos EUA" width="20">  Read in: 🇺🇸 English](README.md)

# @roxygens/ui-startkit

Bem-vindo ao `@roxygens/ui-startkit`! 🎨
Uma coleção de **componentes de UI reutilizáveis, acessíveis e customizáveis**, inspirados na filosofia do [Shadcn/ui](https://ui.shadcn.com/).

Diferente de bibliotecas tradicionais, `@roxygens/ui-startkit` fornece uma **CLI** que permite copiar os componentes diretamente para o seu projeto, garantindo **total controle sobre o código**.

---

## 🌟 Características

* **Você é o dono do código:** Todos os componentes vão para o seu código-fonte.
* **Tailwind CSS:** Estilização moderna e totalmente customizável.
* **Radix UI:** Primitivos de alta qualidade e acessíveis.
* **Uso simples:** Adicione componentes com um único comando CLI.

---

## 🚀 Instalação e Uso

Antes de começar, seu projeto deve ter:

* React
* TypeScript
* Tailwind CSS

### Inicializar o `ui-startkit`

```bash
npx @roxygens/ui-startkit@latest init
```

Isso configura os estilos base e dependências no seu projeto.

### Adicionar componentes

```bash
npx @roxygens/ui-startkit@latest add <nome-do-componente>
```

**Exemplo:** Adicionando o componente `Button`:

```bash
npx @roxygens/ui-startkit@latest add button
```

O componente será criado em `src/components/ui/button.tsx` e você poderá usá-lo assim:

```tsx
import { Button } from '@/components/ui/button'

export function MeuComponente() {
  return <Button>Clique aqui</Button>
}
```

---

## 📂 Instalação rápida de todos os componentes

### Avatar

```bash
npx @roxygens/ui-startkit@latest add avatar
```

### Badge

```bash
npx @roxygens/ui-startkit@latest add badge
```

### Breadcrumb

```bash
npx @roxygens/ui-startkit@latest add breadcrumb
```

### Button

```bash
npx @roxygens/ui-startkit@latest add button
```

### Card

```bash
npx @roxygens/ui-startkit@latest add card
```

### Checkbox

```bash
npx @roxygens/ui-startkit@latest add checkbox
```

### Date Picker

```bash
npx @roxygens/ui-startkit@latest add date-picker
```

### Input

```bash
npx @roxygens/ui-startkit@latest add input
```

### Input OTP

```bash
npx @roxygens/ui-startkit@latest add input-otp
```

### Pagination

```bash
npx @roxygens/ui-startkit@latest add pagination
```

### Progress Bar

```bash
npx @roxygens/ui-startkit@latest add progress-bar
```

### Radio Group

```bash
npx @roxygens/ui-startkit@latest add radio-group
```

### Score Bar

```bash
npx @roxygens/ui-startkit@latest add score-bar
```

### Select

```bash
npx @roxygens/ui-startkit@latest add select
```

### Switch

```bash
npx @roxygens/ui-startkit@latest add switch
```

### Tabs

```bash
npx @roxygens/ui-startkit@latest add tabs
```

### Tooltip

```bash
npx @roxygens/ui-startkit@latest add tolltip
```


> 💡 Copie e execute os comandos diretamente no terminal para adicionar os componentes desejados.

---

## 🏗️ Fluxo de Desenvolvimento

### Preparar o ambiente

```bash
git clone https://github.com/roxygens/ui-startkit.git
cd ui-startkit
npm install
```

Você terá o **monorepo completo** com:

* `packages/ui` → todos os componentes
* `packages/cli` → ferramenta CLI

### Rodar a aplicação de documentação

```bash
npm run dev
# ou
npm run storybook --workspace=ui
```

Acesse: [http://localhost:6006](http://localhost:6006) para visualizar os componentes em tempo real.

### Criar ou editar componentes

1.  Adicione os arquivos do componente em sua pasta específica dentro de `packages/ui/src/components/ui/`.
    Por exemplo, para o componente Avatar, a estrutura de arquivos em `packages/ui/src/components/ui/avatar/` seria:

    *   **`avatar.tsx`**: Este é o arquivo principal que contém a lógica, a estrutura JSX e as `props` do componente. É aqui que o componente é de fato implementado.

    *   **`avatar.test.tsx`**: Arquivo para os testes unitários e de integração. Aqui você escreve testes usando Vitest para garantir que o componente se comporte como esperado em diferentes cenários e não quebre com futuras alterações.

    *   **`avatar.stories.tsx`**: Define as "histórias" para o Storybook. Cada história representa uma variação visual do componente (ex: com imagem, sem imagem, tamanho pequeno), servindo como documentação interativa e um ambiente de desenvolvimento isolado.

    *   **`index.tsx`**: Atua como o ponto de entrada (ou "barrel file") para o diretório do componente. Sua principal função é exportar o componente principal e quaisquer tipos ou hooks relacionados, permitindo importações mais limpas em outras partes do projeto (ex: `import { Avatar } from '.../avatar'` em vez de `.../avatar/avatar`).

2.  Importe helpers do `lib/utils.ts` se necessário.
3.  Teste no Storybook antes de publicar.

### Adicionar componente à CLI

1. Abra `registry.json` na raiz do projeto.
2. Adicione uma entrada para seu componente seguindo o padrão existente:

```json
"meu-componente": {
  "name": "Meu Componente",
  "dependencies": ["clsx", "tailwind-merge"],
  "files": [
    {
      "path": "components/ui/meu-componente.tsx",
      "contentUrl": "https://raw.githubusercontent.com/roxygens/ui-startkit/refs/heads/main/packages/ui/src/components/ui/meu-componente/meu-componente.tsx"
    },
    {
      "path": "lib/utils.ts",
      "contentUrl": "https://raw.githubusercontent.com/roxygens/ui-startkit/refs/heads/main/packages/ui/src/lib/utils.ts"
    }
  ]
}
```


> **Observação:** Apenas adicione o arquivo `lib/utils.ts` e as dependências `clsx` e `tailwind-merge` se o componente realmente utilizar esses utilitários. Qualquer outra dependência externa deve ser adicionada ao array `dependencies` correspondente.

### Contribuindo

```bash
git checkout main
git checkout pull
git checkout -b feature/new-component
git commit -m "feat: adds the new component"
git push origin feature/new-component
```

Abra um Pull Request no GitHub. Todas as mensagens de PR devem ser escritas em **inglês**.

---

## 📄 Estrutura do Monorepo

```
ui-startkit/
├─ packages/
│  ├─ ui/          # código-fonte dos componentes
│  └─ cli/         # CLI para adicionar componentes
├─ registry.json    # registro de componentes para a CLI
└─ package.json     # scripts e dependências do monorepo
```

---

## 📌 Scripts disponíveis

```bash
npm run dev           # roda Storybook
npm run test          # executa testes
npm run build         # build do monorepo
npm run serve         # serve Storybook build
npm run build-cli     # build da CLI
npm run publish-cli   # publica a CLI
```

---

## 📖 Documentação

Para ver todos os componentes e exemplos, acesse: [https://ui.roxygens.com](https://ui.roxygens.com)

---

## 📝 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE)
