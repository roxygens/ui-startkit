'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

function TableContainer({ className, ...props }: React.ComponentProps<'table'>) {
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

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b border-r border-l  border-[var(--table-border)]', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        '[&_tr:last-child]:border-0 text-white border-r border-l border-b border-[var(--table-border)]',
        className,
      )}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'data-[state=selected]:bg-muted border-b border-[var(--table-border)] transition-colors text-xs font-normal leading-[140%] tracking-[0px] hover:bg-[var(--card-hover)]',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
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

export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'px-[1.5rem] py-[1rem] align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
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
  className?: string
}

export function Table<T extends Record<string, unknown>>({
  header,
  data,
  renderRow,
  className,
}: Props<T>) {
  return (
    <TableContainer className={className}>
      <TableHeader>
        <TableRow className="hover:bg-neutral-950">
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
            <TableRow key={rowIdx}>
              {header.map((col, colIdx) => (
                <TableCell key={colIdx}>{String(row?.[col.value] || '')}</TableCell>
              ))}
            </TableRow>
          ),
        )}
      </TableBody>
    </TableContainer>
  )
}
