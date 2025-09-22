import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputOtp } from '.'

const meta: Meta<typeof InputOtp> = {
  title: 'Components/Input OTP',
  component: InputOtp,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    'aria-invalid': {
      control: { type: 'boolean' },
    },
  },
}

export default meta

type Story = StoryObj<typeof InputOtp>

export const Default: Story = {
  args: {},
}
