[<img src="https://flagcdn.com/w20/br.png" alt="Bandeira do Brasil" width="20"> Leia em: 🇧🇷 Português](README.pt-br.md)

# ui-startkit

Welcome to `ui-startkit`! 🎨
A collection of **reusable, accessible, and customizable UI components**, inspired by the philosophy of [Shadcn/ui](https://ui.shadcn.com/).

Unlike traditional libraries, `ui-startkit` provides a **CLI** that lets you copy components directly into your project, giving you **full control over the code**.

---

## 🌟 Features

*   **You own the code:** All components are copied to your source code.
*   **Tailwind CSS:** Modern and fully customizable styling.
*   **Radix UI:** High-quality and accessible primitives.
*   **Simple usage:** Add components with a single CLI command.

---

## 🚀 Installation and Usage

Before you start, your project must have:

*   React
*   TypeScript
*   Tailwind CSS

### Initialize `ui-startkit`

```bash
npx ui-startkit@latest init
```

This sets up the base styles and dependencies in your project.

### Add components

```bash
npx ui-startkit@latest add <component-name>
```

**Example:** Adding the `Button` component:

```bash
npx ui-startkit@latest add button
```

The component will be created at `src/components/ui/button.tsx`, and you can use it like this:

```tsx
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return <Button>Click me</Button>
}
```

---

## 📂 Available Components

### Accordion

```bash
npx ui-startkit@latest add accordion
```

### Avatar

```bash
npx ui-startkit@latest add avatar
```

### Badge

```bash
npx ui-startkit@latest add badge
```

### Breadcrumb

```bash
npx ui-startkit@latest add breadcrumb
```

### Button

```bash
npx ui-startkit@latest add button
```

### Card

```bash
npx ui-startkit@latest add card
```

### Checkbox

```bash
npx ui-startkit@latest add checkbox
```

### Color Picker

```bash
npx ui-startkit@latest add color-picker
```

### Date Picker

```bash
npx ui-startkit@latest add date-picker
```

### Input

```bash
npx ui-startkit@latest add input
```

### Input OTP

```bash
npx ui-startkit@latest add input-otp
```

### Modal

```bash
npx ui-startkit@latest add modal
```

### Pagination

```bash
npx ui-startkit@latest add pagination
```

### Progress Bar

```bash
npx ui-startkit@latest add progress-bar
```

### Radio Group

```bash
npx ui-startkit@latest add radio-group
```

### Range Slider

```bash
npx ui-startkit@latest add range-slider
```

### Score Bar

```bash
npx ui-startkit@latest add score-bar
```

### Select

```bash
npx ui-startkit@latest add select
```

### Switch

```bash
npx ui-startkit@latest add switch
```

### Table

```bash
npx ui-startkit@latest add table
```

### Tabs

```bash
npx ui-startkit@latest add tabs
```

### Tooltip

```bash
npx ui-startkit@latest add tooltip
```

> 💡 Copy and run the commands directly in your terminal to add the desired components.

---

## 🏗️ Development Workflow

### Set up the environment

```bash
git clone https://github.com/roxygens/ui-startkit.git
cd ui-startkit
npm install
```

You will have the **complete monorepo** with:

*   `packages/ui` → all components
*   `packages/cli` → the CLI tool

### Run the documentation app

```bash
npm run dev
# or
npm run storybook --workspace=ui
```

Access: [http://localhost:6006](http://localhost:6006) to view the components in real-time.

### Create or edit components

1.  Add the component files to their specific folder inside `packages/ui/src/components/ui/`.
    For example, for the Avatar component, the file structure in `packages/ui/src/components/ui/avatar/` would be:

    *   **`avatar.tsx`**: This is the main file containing the component's logic, JSX structure, and props. This is where the component is actually implemented.

    *   **`avatar.test.tsx`**: The file for unit and integration tests. Here you write tests using Vitest to ensure the component behaves as expected in different scenarios and doesn't break with future changes.

    *   **`avatar.stories.tsx`**: Defines the "stories" for Storybook. Each story represents a visual variation of the component (e.g., with an image, without an image, small size), serving as interactive documentation and an isolated development environment.

    *   **`index.tsx`**: Acts as the entry point (or "barrel file") for the component's directory. Its main function is to export the main component and any related types or hooks, allowing for cleaner imports elsewhere in the project (e.g., `import { Avatar } from '.../avatar'` instead of `.../avatar/avatar`).

2.  Import helpers from `lib/utils.ts` if needed.
3.  Test in Storybook before publishing.

### Add a component to the CLI

1.  Open `registry.json` at the root of the project.
2.  Add an entry for your component following the existing pattern:

```json
"my-component": {
  "name": "My Component",
  "dependencies": ["clsx", "tailwind-merge"],
  "files": [
    {
      "path": "components/ui/my-component.tsx",
      "contentUrl": "https://raw.githubusercontent.com/roxygens/ui-startkit/refs/heads/main/packages/ui/src/components/ui/my-component/my-component.tsx"
    },
    {
      "path": "lib/utils.ts",
      "contentUrl": "https://raw.githubusercontent.com/roxygens/ui-startkit/refs/heads/main/packages/ui/src/lib/utils.ts"
    }
  ]
}
```

> **Note:** Only add the `lib/utils.ts` file and the `clsx` and `tailwind-merge` dependencies if the component actually uses these utilities. Any other external dependencies should be added to the corresponding `dependencies` array.

### Contributing

```bash
git checkout main
git pull
git checkout -b feature/new-component
git commit -m "feat: adds the new component"
git push origin feature/new-component
```

Open a Pull Request on GitHub. All PR messages must be written in **English**.

---

## 📄 Monorepo Structure

```
ui-startkit/
├─ packages/
│  ├─ ui/          # component source code
│  └─ cli/         # CLI for adding components
├─ registry.json    # component registry for the CLI
└─ package.json     # monorepo scripts and dependencies
```

---

## 📌 Available Scripts

```bash
npm run dev           # runs Storybook
npm run test          # runs tests
npm run build         # builds the monorepo
npm run serve         # serves the Storybook build
npm run build-cli   # builds the CLI
npm run publish-cli # publishes the CLI
```

---

## 📖 Documentation

To see all components and examples, visit: [https://ui.roxygens.com](https://ui.roxygens.com)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE)