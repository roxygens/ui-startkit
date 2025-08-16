# @roxygens/ui-startkit

Bem-vindo ao `@roxygens/ui-startkit`! Uma coleção de componentes de UI reutilizáveis, lindamente projetados e acessíveis, inspirados na filosofia do [Shadcn/ui](https://ui.shadcn.com/).

Este não é um pacote de componentes tradicional. Em vez de instalar uma biblioteca com código que você não controla, `@roxygens/ui-startkit` fornece uma **ferramenta de linha de comando (CLI)** para você copiar os componentes diretamente para o seu projeto. Você tem total controle sobre o código, podendo adaptá-lo às suas necessidades.

**Características:**
-   **Você é o dono do código:** Componentes são adicionados ao seu código-fonte.
-   **Estilização com Tailwind CSS:** Moderno, flexível e totalmente customizável.
-   **Desenvolvido com Radix UI:** Primitivos de UI acessíveis e de alta qualidade.
-   **Fácil de usar:** Adicione componentes com um único comando.

---

## 🚀 Instalação e Uso

Para começar a usar os componentes, seu projeto deve ter React, Tailwind CSS e TypeScript configurados.

### 1. Inicialize o `ui-startkit` (Em breve)

Execute comando `init` para configurar os estilos base e dependências no seu projeto.

```bash
npx @roxygens/ui-startkit@latest init
```

### 2. Adicione Componentes

Use o comando `add` para adicionar qualquer componente disponível ao seu projeto.

```bash
npx @roxygens/ui-startkit@latest add <nome-do-componente>
```

**Exemplo:**
Para adicionar o componente `Button`, execute:

```bash
npx @roxygens/ui-startkit@latest add button
```

Isso criará o arquivo `src/components/ui/button.tsx` (ou onde quer que você tenha configurado) no seu projeto. Agora você pode importá-lo e usá-lo:

```tsx
import { Button } from '@/components/ui/button';

function MyComponent() {
  return <Button>Clique aqui</Button>;
}
```

Para ver a lista completa de componentes disponíveis, visite nossa [página de documentação](#) (link a ser adicionado).

---

### Estrutura do Projeto

-   `packages/ui`: O código-fonte de todos os componentes da biblioteca. É aqui que você criará e editará componentes.
-   `packages/cli`: O código-fonte da ferramenta de linha de comando (`@roxygens/ui-startkit`).

### 1. Configuração do Ambiente Local

Para começar a desenvolver, clone o repositório e instale as dependências.

```bash
# 1. Clone o repositório
git clone https://github.com/roxygens/ui-startkit.git
cd ui-startkit

# 2. Instale todas as dependências do monorepo
npm install
```

### 2. Fluxo de Desenvolvimento

O fluxo principal para desenvolver um novo componente é:

1.  **Rode a aplicação de documentação:**
    Este comando iniciará um servidor de desenvolvimento com Vite, onde você pode ver suas alterações em tempo real.

    ```bash
    # Na raiz do projeto
    npm run storybook --workspace=ui
    ```
    A aplicação estará disponível em `http://localhost:6006` 

2.  **Crie ou edite um componente:**
    Adicione um novo arquivo de componente em `packages/ui/src/`. Por exemplo, `packages/ui/src/card.tsx`.



### 3. Adicionando um Componente à CLI

Após criar e testar seu componente, você precisa adicioná-lo ao registro para que a CLI possa encontrá-lo.

1.  **Edite o arquivo `registry.json`** na raiz do projeto.
2.  Adicione uma nova entrada para seu componente, seguindo a estrutura existente. Aponte o `contentUrl` para o link bruto do arquivo do seu componente no GitHub.

### 4. Enviando sua Contribuição

1.  Crie uma nova branch para sua feature (`git checkout -b feature/novo-componente`).
2.  Faça o commit das suas alterações (`git commit -m "feat: adiciona componente Card"`).
3.  Faça o push e abra um Pull Request.


---

### Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).