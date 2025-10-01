import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    type: {
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      control: { type: 'select' },
    },
    'aria-invalid': {
      control: { type: 'boolean' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    size: 'md',
    placeholder: 'Placeholder',
  },
}
