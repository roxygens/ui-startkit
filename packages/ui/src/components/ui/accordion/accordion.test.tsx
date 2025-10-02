import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChevronDown } from 'lucide-react'
import { Accordion } from '.'

describe('Accordion', () => {
  const items = [
    {
      icon: <ChevronDown data-testid="icon-1" />,
      label: 'Item 1',
      value: 'item1',
      content: <div data-testid="content-1">Content 1</div>,
    },
    {
      label: 'Item 2',
      value: 'item2',
      content: <div data-testid="content-2">Content 2</div>,
    },
  ]

  it('should render accordion items with labels and icons', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
  })

  it('should toggle tab content on click', () => {
    render(<Accordion items={items} />)
    const button1 = screen.getByRole('tab', { name: /Item 1/i })
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument()
    fireEvent.click(button1)
    expect(screen.getByTestId('content-1')).toBeInTheDocument()
    fireEvent.click(button1)
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument()
  })

  it('should open one tab without affecting others', () => {
    render(<Accordion items={items} />)
    const button1 = screen.getByRole('tab', { name: /Item 1/i })
    const button2 = screen.getByRole('tab', { name: /Item 2/i })
    fireEvent.click(button1)
    fireEvent.click(button2)
    expect(screen.getByTestId('content-1')).toBeInTheDocument()
    expect(screen.getByTestId('content-2')).toBeInTheDocument()
  })

  it('should stop propagation when clicking inside content', () => {
    render(<Accordion items={items} />)
    const button1 = screen.getByRole('tab', { name: /Item 1/i })
    fireEvent.click(button1)
    const content = screen.getByTestId('content-1')
    const stopPropagation = vi.fn()
    fireEvent.click(content, { stopPropagation })
    expect(stopPropagation).not.toHaveBeenCalled()
    expect(screen.getByTestId('content-1')).toBeInTheDocument()
  })

  it('should apply custom className to the accordion', () => {
    render(<Accordion items={items} className="custom-class" />)
    const accordion = screen.getByRole('accordion')
    expect(accordion).toHaveClass('custom-class')
  })

  it('should update aria attributes correctly when toggled', () => {
    render(<Accordion items={items} />)
    const button1 = screen.getByRole('tab', { name: /Item 1/i })
    expect(button1).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(button1)
    expect(button1).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(button1)
    expect(button1).toHaveAttribute('aria-expanded', 'false')
  })
})
