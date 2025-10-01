import type { Meta, StoryObj } from '@storybook/react-vite'
import { DollarSign, Palette, Star } from 'lucide-react'
import { List } from '.'

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    items: [
      {
        value: 'price',
        label: 'Preço',
        content: <p className="text-white">Preço</p>,
        icon: <DollarSign />,
      },
      {
        value: 'color',
        label: 'Cor',
        content: <p className="text-white">Cor</p>,
        icon: <Palette />,
      },
    ],
  },

  render(props) {
    return (
      <div className="flex h-[10rem]">
        <List {...props} />
      </div>
    )
  },
}
