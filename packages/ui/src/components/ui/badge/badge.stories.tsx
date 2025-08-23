import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['lg'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Large: Story = {
  args: {
    value: 15,
    size: 'lg',
  },
}
