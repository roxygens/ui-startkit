import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectInput } from '.'

const meta: Meta<typeof SelectInput> = {
  title: 'Components/Select',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Size = 'xs' | 'sm' | 'md' | 'lg'

type Story = StoryObj<typeof SelectInput>

const args = {
  placeholder: 'Selecione o item',
  selectLabel: 'Selecione o item',
  options: [
    {
      label: 'Opção 1',
      value: 'Opção 1',
    },
    {
      label: 'Opção 2',
      value: 'Opção 2',
    },
    {
      label: 'Opção 3',
      value: 'Opção 3',
    },
  ],
  size: 'md' as Size,
  className: 'w-full',
}

export const Default: Story = {
  args: {
    ...args,
  },
}

export const Small: Story = {
  args: {
    ...args,
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    ...args,
    size: 'lg',
  },
}

export const Error: Story = {
  args: {
    ...args,
    'aria-invalid': true,
  },
}
