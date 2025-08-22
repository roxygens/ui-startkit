import type { Meta, StoryObj } from '@storybook/react-vite'
import { QualityBar } from './quality-bar'

const meta: Meta<typeof QualityBar> = {
  title: 'Components/QualityBar',
  component: QualityBar,
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

type Story = StoryObj<typeof QualityBar>

export const Default: Story = {
  args: {
    value: 0.324,
  },
}
