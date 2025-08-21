import type { Meta, StoryObj } from '@storybook/react-vite'
import { DiscountBadge } from '.'

const meta: Meta<typeof DiscountBadge> = {
  title: 'Components/DiscountBadge',
  component: DiscountBadge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['lg'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof DiscountBadge>

export const Default: Story = {
  args: {
    value: 15,
    size: 'lg',
  },
}
