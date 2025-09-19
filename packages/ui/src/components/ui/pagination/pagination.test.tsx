import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from '.'

describe('Pagination', () => {
  it('should call onPageChange when a page is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />)
    const page2 = screen.getByText('2')
    fireEvent.click(page2)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should disable previous button on first page', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />)
    const prevButton = screen.getByLabelText('Go to previous page')
    expect(prevButton).toBeDisabled()
  })

  it('should disable next button on last page', () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />)
    const nextButton = screen.getByLabelText('Go to next page')
    expect(nextButton).toBeDisabled()
  })

  it('should render active page with correct styles', () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />)
    const activePage = screen.getByRole('button', { current: 'page' })
    expect(activePage).toHaveAttribute('data-active', 'true')
    expect(activePage).toHaveClass('border')
  })

  it('should trigger previous page change when clicking previous button', () => {
    const onPageChange = vi.fn()
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />)
    const prevButton = screen.getByLabelText('Go to previous page')
    fireEvent.click(prevButton)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should trigger next page change when clicking next button', () => {
    const onPageChange = vi.fn()
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />)
    const nextButton = screen.getByLabelText('Go to next page')
    fireEvent.click(nextButton)
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('should render start ellipsis when pages exceed sibling and boundary counts', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={5}
        onPageChange={vi.fn()}
        siblingCount={1}
        boundaryCount={1}
      />,
    )
    expect(
      screen.getAllByText((_, element) => element?.getAttribute('aria-hidden') === 'true'),
    ).toHaveLength(6)
  })

  it('should render end ellipsis correctly', () => {
    render(
      <Pagination
        totalPages={20}
        currentPage={2}
        onPageChange={vi.fn()}
        siblingCount={1}
        boundaryCount={1}
      />,
    )
    expect(
      screen.getAllByText((_, element) => element?.getAttribute('aria-hidden') === 'true'),
    ).toHaveLength(4)
  })

  it('uses endPages[0] - 2 branch when endPages exists (covers ternary true)', () => {
    render(
      <Pagination
        totalPages={12}
        currentPage={6}
        onPageChange={vi.fn()}
        boundaryCount={1}
        siblingCount={1}
      />,
    )
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument()
    const more = screen.getAllByText('Mais páginas')
    expect(more.length).toBeGreaterThanOrEqual(1)
  })

  it('uses total - 1 branch when endPages is empty (covers ternary false)', () => {
    render(
      <Pagination
        totalPages={2}
        currentPage={1}
        onPageChange={vi.fn()}
        boundaryCount={3}
        siblingCount={1}
      />,
    )
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.queryByText('Mais páginas')).toBeNull()
  })
})
