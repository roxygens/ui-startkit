import { useState } from 'react'
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
    label: 'Preço (BRL)',
  },
  {
    value: 'sales',
    label: 'Quantidade',
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
    price: '1.598,46 BRL',
    sales: '3 vendas',
    action: 'Visualizar',
  },
  {
    id: 2,
    condition: 'Pouco Usada',
    price: '559,74 BRL',
    sales: '12 vendas',
    action: 'Visualizar',
  },
  {
    id: 3,
    condition: 'STATTRAK™ Testado em Campo',
    price: '262,60 BRL',
    sales: '17 vendas',
    action: 'Visualizar',
  },
  {
    id: 4,
    condition: 'Bem Desgastada',
    price: '261,49 BRL',
    sales: '77 vendas',
    action: 'Visualizar',
  },
  {
    id: 5,
    condition: 'Muito Desgastada',
    price: '92,30 BRL',
    sales: '3 vendas',
    action: 'Visualizar',
  },
  {
    id: 6,
    condition: 'Original de fábrica',
    price: '1.598,46 BRL',
    sales: '3 vendas',
    action: 'Visualizar',
  },
]

export const Default: Story = {
  args: {
    variant: 'Default',
  } as Record<string, unknown>,
  render: (args: { variant?: Variant; tableClassName?: string }) => {
    const { variant, tableClassName } = args

    if (variant === 'Custom Rows') {
      const [selectedRow, setSelectedRow] = useState<number | null>(null)

      const handleRowClick = (rowIdx: number) => {
        setSelectedRow(rowIdx === selectedRow ? null : rowIdx)
      }

      return (
        <Table
          header={customHeader}
          data={customData}
          tableClassName={tableClassName}
          renderRow={(row, rowIdx) => (
            <TableRow
              data-state={rowIdx === selectedRow ? 'selected' : ''}
              onClick={() => handleRowClick(rowIdx)}
              key={row.id}
            >
              <TableCell data-state={rowIdx === selectedRow ? 'selected' : ''}>
                <div className="flex flex-col gap-[0.25rem]">
                  <p className="text-primary font-bold leading-[140%] uppercase">StatTrak™</p>
                  {row.condition}
                </div>
              </TableCell>
              <TableCell data-state={rowIdx === selectedRow ? 'selected' : ''}>
                {row.price}
              </TableCell>
              <TableCell data-state={rowIdx === selectedRow ? 'selected' : ''}>
                {row.sales}
              </TableCell>
              <TableCell data-state={rowIdx === selectedRow ? 'selected' : ''}>
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
