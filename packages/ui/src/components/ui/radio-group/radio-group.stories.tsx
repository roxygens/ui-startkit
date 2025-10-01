import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from '.'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    size: 'md',
    defaultValue: 'item_one',
    options: [
      {
        label: 'Item One',
        value: 'item_one',
      },
      {
        label: 'Item Two',
        value: 'item_two',
      },
      {
        label: 'Item Three',
        value: 'item_three',
      },
      {
        label: 'Item disabled',
        value: 'item_disabled',
        disabled: true,
      },
    ],
  },
}
