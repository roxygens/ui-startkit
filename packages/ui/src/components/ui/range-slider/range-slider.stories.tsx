import type { Meta, StoryObj } from '@storybook/react-vite'
import { RangeSlider } from '.'

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/Range Slider',
  component: RangeSlider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  args: {},
}
