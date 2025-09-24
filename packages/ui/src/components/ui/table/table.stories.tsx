import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowUpRight } from 'lucide-react'
import { Table, TableRow, TableCell } from '.'

type RowData = {
  id: number
  condition: string
  price: string
  sales: string
}

type Variant = 'Default' | 'Custom Rows' | 'Striped Rows'

const meta: Meta<typeof Table<RowData>> & { argTypes: { variant: Record<string, unknown> } } = {
  title: 'Components/Table',
  component: Table<RowData>,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
      argTypesOrder: ['variant', '*'],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['Default', 'Custom Rows', 'Striped Rows'],
      description: 'Seleciona a variante da Tabela',
    },
  },
}

export default meta

type Story = StoryObj<typeof Table<RowData>>

const defaultHeader = [
  {
    value: 'condition',
    label: 'Variantes',
  },
  {
    value: 'price',
    label: 'Preço da venda (R$)',
  },
  {
    value: 'sales',
    label: 'Quantidade da venda',
  },
]

const customHeader = [
  {
    value: 'condition',
    label: 'Variantes',
  },
  {
    value: 'price',
    label: 'Preço da venda (R$)',
  },
  {
    value: 'sales',
    label: 'Quantidade da venda',
  },
  {
    value: 'action',
    label: '',
  },
]

const customData = [
  {
    id: 1,
    condition: 'Original de fábrica',
    price: 'R$ 1.598,46',
    sales: '3 vendas',
  },
  {
    id: 2,
    condition: 'Pouco Usada',
    price: 'R$ 559,74',
    sales: '12 vendas',
  },
  {
    id: 3,
    condition: 'Testado em Campo',
    price: 'R$ 262,60',
    sales: '17 vendas',
  },
  {
    id: 4,
    condition: 'Bem Desgastada',
    price: 'R$ 261,49',
    sales: '77 vendas',
  },
  {
    id: 5,
    condition: 'Muito Desgastada',
    price: 'R$ 92,30',
    sales: '3 vendas',
  },
]

export const Default: Story = {
  args: {
    variant: 'Default',
  } as Record<string, unknown>,
  render: (args: { variant?: Variant; tableClassName?: string }) => {
    const { variant, tableClassName } = args

    if (variant === 'Custom Rows') {
      return (
        <Table<RowData>
          header={customHeader}
          data={customData}
          tableClassName={tableClassName}
          renderRow={(row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex flex-col gap-[0.25rem]">
                  <p className="text-primary font-bold leading-[140%] uppercase">StatTrak™</p>
                  {row.condition}
                </div>
              </TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.sales}</TableCell>
              <TableCell>
                <button
                  onClick={() => console.log(row.id)}
                  className="cursor-pointer flex gap-[0.35rem] justify-center align-bottom text-white"
                >
                  <span>Visualizar</span>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </button>
              </TableCell>
            </TableRow>
          )}
        />
      )
    }

    if (variant === 'Striped Rows') {
      return (
        <Table
          header={defaultHeader}
          data={customData}
          tableHeaderClassName="bg-neutral-800 hover:bg-neutral-800 text-neutral-300"
          tableRowClassName="even:bg-neutral-800"
        />
      )
    }

    return <Table header={defaultHeader} data={customData} tableCellClassName="odd:bg-[#161719]" />
  },
}
