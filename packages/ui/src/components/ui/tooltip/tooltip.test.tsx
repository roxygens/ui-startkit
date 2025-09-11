import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Tooltip } from '.'

describe('Tooltip', () => {
  it('should render children', () => {
    render(
      <Tooltip description="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('should render description', () => {
    render(
      <Tooltip description="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content')
  })

  it('should render title when provided', () => {
    render(
      <Tooltip title="Tooltip title" description="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByText('Tooltip title')).toBeInTheDocument()
  })

  it('should apply default position (top) classes', () => {
    render(
      <Tooltip description="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('bottom-full left-1/2 -translate-x-1/2 mb-2')
  })

  it('should apply bottom position classes', () => {
    render(
      <Tooltip description="Tooltip content" position="bottom">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('top-full left-1/2 -translate-x-1/2 mt-2')
  })

  it('should apply left position classes', () => {
    render(
      <Tooltip description="Tooltip content" position="left">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('right-full top-1/2 -translate-y-1/2 mr-2')
  })

  it('should apply right position classes', () => {
    render(
      <Tooltip description="Tooltip content" position="right">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('left-full top-1/2 -translate-y-1/2 ml-2')
  })

  it('should merge additional className', () => {
    render(
      <Tooltip description="Tooltip content" className="custom-class">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('custom-class')
  })

  it('should have max width and grow until max-w', () => {
    render(
      <Tooltip description="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('max-w-[18.75rem]')
    expect(tooltip).toHaveClass('w-max')
  })

  it('should contain title and description in proper order', () => {
    render(
      <Tooltip title="Title" description="Description">
        <button>Hover me</button>
      </Tooltip>,
    )
    const tooltip = screen.getByRole('tooltip')
    const [titleEl, descEl] = tooltip.children
    expect(titleEl.textContent).toBe('Title')
    expect(descEl.textContent).toBe('Description')
  })
})
