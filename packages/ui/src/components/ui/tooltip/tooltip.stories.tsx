import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from '.'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      options: ['top', 'right', 'left', 'bottom'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    children: <h1 className="text-white">Text</h1>,
    title: 'This is a tooltip',
    description:
      'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.',
  },
}
