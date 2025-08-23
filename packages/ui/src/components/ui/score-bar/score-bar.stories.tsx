import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScoreBar } from './score-bar'

const meta: Meta<typeof ScoreBar> = {
  title: 'Components/ScoreBar',
  component: ScoreBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor entre 0 e 1 com 3 casas decimais de precisão',
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.001,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ScoreBar>

export const Default: Story = {
  args: {
    value: 0.324,
  },
}
