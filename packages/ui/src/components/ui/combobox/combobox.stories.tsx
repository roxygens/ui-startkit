import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from '.'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Combobox>

const options = [
  {
    label: 'Next.js',
    value: 'Next.js',
  },
  {
    label: 'SvelteKit',
    value: 'SvelteKit',
  },
  {
    label: 'Nuxt.js',
    value: 'Nuxt.js',
  },
  {
    label: 'Remix',
    value: 'Remix',
  },
]

export const Default: Story = {
  args: {
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework',
    options,
    className: 'min-w-[200px]',
  },
}
