import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Table, TableCell, TableRow } from '.'

describe('Table components', () => {
  it('should render TableContainer and Table correctly with className', () => {
    render(
      <Table
        header={[
          { value: 'name', label: 'Name' },
          { value: 'action', label: '' },
        ]}
        data={[{ name: 'John' }]}
        className="custom-class"
      />,
    )
    const container = screen.getByRole('table')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('custom-class')
  })

  it('should render TableHeader with headers', () => {
    render(
      <Table
        header={[
          { value: 'name', label: 'Name' },
          { value: 'age', label: 'Age' },
        ]}
        data={[{ name: 'Alice', age: 25 }]}
      />,
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('should render TableBody with default rows', () => {
    render(
      <Table
        header={[
          { value: 'name', label: 'Name' },
          { value: 'age', label: 'Age' },
        ]}
        data={[{ name: 'Bob', age: 30 }]}
      />,
    )
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('should render TableBody with custom renderRow', () => {
    render(
      <Table
        header={[{ value: 'name', label: 'Name' }]}
        data={[{ name: 'Charlie' }]}
        renderRow={(row, idx) => (
          <TableRow key={idx} className="custom-row">
            <TableCell className="custom-cell">{row.name}</TableCell>
          </TableRow>
        )}
      />,
    )
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('Charlie').closest('td')).toHaveClass('custom-cell')
    expect(screen.getByText('Charlie').closest('tr')).toHaveClass('custom-row')
  })

  it('should render empty data gracefully', () => {
    render(<Table header={[{ value: 'name', label: 'Name' }]} data={[]} />)
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(1)
  })
})
