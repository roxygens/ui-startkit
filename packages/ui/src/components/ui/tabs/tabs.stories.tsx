import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from '.'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    defaultValue: 'option_pill',
    options: [
      {
        value: 'option_pill',
        label: 'Option with pill',
        content: <p className="text-white">Option with pill</p>,
        pill: '2',
      },
      {
        value: 'disabled_option',
        label: 'Disabled option',
        content: <p className="text-white">Disabled option</p>,
        disabled: true,
      },
      {
        value: 'disabled_option_pill',
        label: 'Disabled option with pill',
        content: <p className="text-white">Disabled option with pill</p>,
        disabled: true,
        pill: 4,
      },
      {
        value: 'other_option',
        label: 'Other option',
        content: <p className="text-white">Other option</p>,
      },
    ],
  },
}
