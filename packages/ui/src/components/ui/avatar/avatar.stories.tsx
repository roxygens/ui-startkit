import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '.'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    image: {
      src: '/images/avatar.jpg',
      alt: 'Avatar image',
    },
    fallback: 'OR',
  },
}
