import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColorPicker } from '.'

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/Color Picker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    selectedIndex: {
      description:
        'Índice usado como opção selecionada por padrão, começando em 0, de acordo com a quantidade de itens em options.',
    },
  },
}

export default meta

type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  args: {
    options: [
      { from: '#0055FF', to: '#00D7FF' },
      { from: '#654229', to: '#B37448' },
      { from: '#999999', to: '#CCCCCC' },
      { from: '#178B00', to: '#B4D40C' },
      { from: '#8F00FF', to: '#FF33DD' },
      { from: '#FF2101', to: '#FF6900' },
      { from: '#FFC802', to: '#FFFA02' },
    ],
    selectedIndex: 2,
  },

  render(props) {
    return (
      <div className="flex w-[12rem]">
        <ColorPicker {...props} />
      </div>
    )
  },
}
