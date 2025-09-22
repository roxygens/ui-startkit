import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '.'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Label',
    description: 'Secondary text',
  },
}
