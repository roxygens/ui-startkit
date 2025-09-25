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
    value: 'date',
    label: 'Data e Hora',
  },
  {
    value: 'notes',
    label: 'Notas',
  },
  {
    value: 'price',
    label: 'Preço (BRL)',
  },
]

const defaultData = [
  {
    id: 1,
    date: '24/09/2025 - 11:36 AM',
    notes: 'Factory Original 0.061 - Fade 93.0%',
    price: '4,250.00 BRL',
  },
  {
    id: 2,
    date: '24/09/2025 - 9:20 AM',
    notes: 'Factory Original 0.062 - Fade 93.1%',
    price: '5,500.30 BRL',
  },
  {
    id: 3,
    date: '23/09/2025 - 8:40 PM',
    notes: 'Factory Original 0.063 - Fade 93.2%',
    price: '2,980.50 BRL',
  },
  {
    id: 4,
    date: '23/09/2025 - 4:35 PM',
    notes: 'Factory Original 0.064 - Fade 93.3%',
    price: '5,100.75 BRL',
  },
  {
    id: 5,
    date: '23/09/2025 - 7:59 AM',
    notes: 'Factory Original 0.065 - Fade 93.4%',
    price: '3,750.25 BRL',
  },
  {
    id: 6,
    date: '22/09/2025 - 10:15 PM',
    notes: 'Factory Original 0.066 - Fade 93.5%',
    price: '1,500.00 BRL',
  },
  {
    id: 7,
    date: '22/09/2025 - 3:45 PM',
    notes: 'Factory Original 0.067 - Fade 93.6%',
    price: '6,300.40 BRL',
  },
  {
    id: 8,
    date: '22/09/2025 - 1:30 AM',
    notes: 'Factory Original 0.068 - Fade 93.7%',
    price: '2,150.10 BRL',
  },
  {
    id: 9,
    date: '21/09/2025 - 6:00 PM',
    notes: 'Factory Original 0.069 - Fade 93.8%',
    price: '3,600.85 BRL',
  },
  {
    id: 10,
    date: '21/09/2025 - 7:15 AM',
    notes: 'Factory Original 0.070 - Fade 93.9%',
    price: '4,800.90 BRL',
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
          data={defaultData}
          tableHeaderClassName="bg-neutral-800 hover:bg-neutral-800 text-neutral-300"
          tableRowClassName="even:bg-neutral-800"
        />
      )
    }

    return <Table header={defaultHeader} data={defaultData} tableCellClassName="odd:bg-[#161719]" />
  },
}
