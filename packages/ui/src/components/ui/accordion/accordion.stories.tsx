import type { Meta, StoryObj } from '@storybook/react-vite'
import { DollarSign, Palette } from 'lucide-react'
import { Accordion } from '.'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Accordion>

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
        <Accordion {...props} />
      </div>
    )
  },
}
