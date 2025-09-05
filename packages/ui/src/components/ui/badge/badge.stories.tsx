import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'select' },
    },
    variant: {
      options: ['success', 'info', 'warning', 'danger', 'critical'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Luvas Esportivas',
  },
}
