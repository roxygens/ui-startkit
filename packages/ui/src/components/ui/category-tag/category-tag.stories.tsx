import type { Meta, StoryObj } from '@storybook/react-vite'
import { CategoryTag } from '.'

const meta: Meta<typeof CategoryTag> = {
  title: 'Components/CategoryTag',
  component: CategoryTag,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof CategoryTag>

export const Default: Story = {
  args: {
    children: 'Luvas Esportivas',
  },
}
