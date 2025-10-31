import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '.'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}
