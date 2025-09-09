import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '.'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Select>

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
    onChange: (value) => {
      console.log(value)
    },
  },
}
