'use client'
import { type ComponentProps, useState } from 'react'
import { cn } from '@/lib/utils'

function TableContainer({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto bg-neutral-950">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b border-r border-l  border-table-border', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        '[&_tr:last-child]:border-0 text-white border-r border-l border-b border-table-border',
        className,
      )}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'data-[state=selected]:bg-primary-200 border-b border-table-border text-xs font-normal leading-[140%] tracking-[0px] hover:bg-card-hover group',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'uppercase text-neutral-500 h-10 px-[1.5rem] py-[0.7rem] text-left align-middle text-xs font-bold leading-[140%] tracking-[1px] whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'px-[1.5rem] py-[1rem] align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
        'group-hover:odd:bg-card-hover',
        'data-[state=selected]:bg-primary-200',
        'group-hover:data-[state=selected]:bg-primary-200',
      )}
      {...props}
    />
  )
}

type Header = {
  value: string
  label: string
}

type Props<T extends Record<string, unknown>> = {
  header: Header[]
  data: T[]
  renderRow?: (row: T, rowIdx: number) => React.ReactNode
  tableClassName?: string
  tableHeaderClassName?: string
  tableRowClassName?: string
  tableCellClassName?: string
}

export function Table<T extends Record<string, unknown>>({
  header,
  data,
  renderRow,
  tableClassName,
  tableHeaderClassName,
  tableRowClassName,
  tableCellClassName,
}: Props<T>) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const handleRowClick = (rowIdx: number) => {
    setSelectedRow(rowIdx === selectedRow ? null : rowIdx)
  }

  return (
    <TableContainer className={tableClassName}>
      <TableHeader>
        <TableRow className={cn('hover:bg-neutral-950', tableHeaderClassName)}>
          {header?.map((item, index) => (
            <TableHead key={index}>{item.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIdx) =>
          renderRow ? (
            renderRow(row, rowIdx)
          ) : (
            <TableRow
              data-state={rowIdx === selectedRow ? 'selected' : ''}
              onClick={() => handleRowClick(rowIdx)}
              key={rowIdx}
              className={tableRowClassName}
            >
              {header.map((col, colIdx) => (
                <TableCell
                  data-state={rowIdx === selectedRow ? 'selected' : ''}
                  className={tableCellClassName}
                  key={colIdx}
                >
                  {String(row?.[col.value] || '')}
                </TableCell>
              ))}
            </TableRow>
          ),
        )}
      </TableBody>
    </TableContainer>
  )
}
