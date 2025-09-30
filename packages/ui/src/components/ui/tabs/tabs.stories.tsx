import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from '.'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    defaultValue: 'graphics',
    tabs: [
      {
        value: 'graphics',
        label: 'Gráficos',
        content: <p className="text-white mt-2">Gráficos</p>,
        tabs: [
          {
            value: '1s',
            label: '1s',
            content: <p className="text-white mt-2">Gráficos - 1S</p>,
          },
          {
            value: '1m',
            label: '1m',
            content: <p className="text-white mt-2">Gráficos - 1M</p>,
          },
          {
            value: '3m',
            label: '3m',
            content: <p className="text-white mt-2">Gráficos - 3M</p>,
          },
          {
            value: '6m',
            label: '6m',
            content: <p className="text-white mt-2">Gráficos - 6M</p>,
            disabled: true,
          },
          {
            value: '1a',
            label: '1a',
            content: <p className="text-white mt-2">Gráficos - 1A</p>,
          },
        ],
      },
      {
        value: 'historic',
        label: 'Histórico',
        content: <p className="text-white mt-2">Histórico</p>,
        disabled: true,
      },
      {
        value: 'variations',
        label: 'Variações',
        content: <p className="text-white mt-2">Variações</p>,
      },
    ],
  },
}
