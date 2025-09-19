import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from '.'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Início',
        href: '/',
      },
      {
        label: 'Item 1',
        href: '/item-1',
      },
      {
        label: 'Item 2',
        href: '/item-2',
      },
      {
        label: 'Item Principal',
        href: '/item-principal',
      },
    ],
  },
}
