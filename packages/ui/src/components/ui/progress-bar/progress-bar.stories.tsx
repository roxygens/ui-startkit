import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './progress-bar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor entre 0 e 100',
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    showPercentage: {
      options: ['left', 'right', 'bottom-left', 'bottom-right', 'none'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    value: 10,
  },
}
