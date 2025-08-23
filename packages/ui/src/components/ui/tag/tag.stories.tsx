import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from '.'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    children: 'Luvas Esportivas',
  },
}
