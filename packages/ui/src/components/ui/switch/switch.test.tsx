import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Switch } from '.'

describe('Switch', () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const

  it('should render with default size', () => {
    render(<Switch />)
    const root = screen.getByRole('switch')
    expect(root).toHaveClass('h-4 w-8')
  })

  it('should render as checked when the `checked` prop is true', () => {
    render(<Switch label="My switch" checked={true} />)

    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeChecked()

    const container = switchEl.closest('div')
    expect(container).toHaveClass('border-neutral-400')
  })

  it('should render as unchecked when the `checked` prop is false', () => {
    render(<Switch label="My switch" checked={false} />)

    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeChecked()

    const container = switchEl.closest('div')
    expect(container).not.toHaveClass('border-neutral-400')
  })

  it('should render all size variants with correct classes', () => {
    sizes.forEach((size) => {
      render(<Switch size={size} data-testid={`switch-${size}`} />)
      const root = screen.getByTestId(`switch-${size}`)
      if (size === 'xs') expect(root).toHaveClass('h-3 w-6')
      if (size === 'sm') expect(root).toHaveClass('h-3.5 w-7')
      if (size === 'md') expect(root).toHaveClass('h-4 w-8')
      if (size === 'lg') expect(root).toHaveClass('h-5 w-10')
    })
  })

  it('should toggle state when clicked', () => {
    render(<Switch />)
    const root = screen.getByRole('switch')
    expect(root).toHaveAttribute('data-state', 'unchecked')
    fireEvent.click(root)
    expect(root).toHaveAttribute('data-state', 'checked')
    fireEvent.click(root)
    expect(root).toHaveAttribute('data-state', 'unchecked')
  })

  it('should toggle state when container is clicked', () => {
    render(<Switch />)
    const container = screen.getByRole('switch').parentElement!
    const root = screen.getByRole('switch')
    expect(root).toHaveAttribute('data-state', 'unchecked')
    fireEvent.click(container)
    expect(root).toHaveAttribute('data-state', 'checked')
  })

  it('should render label with correct size variants', () => {
    sizes.forEach((size) => {
      render(<Switch size={size} label="My Label" id={`switch-${size}`} />)
      const label = screen.getByTestId(`label-${size}`)
      if (size === 'xs') expect(label).toHaveClass('text-[0.75rem]')
      if (size === 'sm') expect(label).toHaveClass('text-[0.8125rem]')
      if (size === 'md') expect(label).toHaveClass('text-[0.875rem]')
      if (size === 'lg') expect(label).toHaveClass('text-[1rem]')
    })
  })

  it('should render description with correct size variants', () => {
    sizes.forEach((size) => {
      render(<Switch size={size} description="My Desc" />)
      const desc = screen.getByTestId(`desc-${size}`)
      if (size === 'xs') expect(desc).toHaveClass('text-[0.625rem]')
      if (size === 'sm') expect(desc).toHaveClass('text-[0.6875rem]')
      if (size === 'md') expect(desc).toHaveClass('text-[0.75rem]')
      if (size === 'lg') expect(desc).toHaveClass('text-[0.875rem]')
    })
  })

  it('should apply container border styles when description is provided', () => {
    render(<Switch description="With border" />)
    const container = screen.getByText('With border').parentElement!.parentElement!
    expect(container).toHaveClass('border-1 border-neutral-gray')
  })

  it('should apply border-neutral-400 when checked', () => {
    render(<Switch description="With border" />)
    const container = screen.getByText('With border').parentElement!.parentElement!
    const root = screen.getByRole('switch')
    expect(container).not.toHaveClass('border-neutral-400')
    fireEvent.click(root)
    expect(container).toHaveClass('border-neutral-400')
  })

  it('should not toggle when disabled', () => {
    render(<Switch disabled />)
    const root = screen.getByRole('switch')
    expect(root).toBeDisabled()
    expect(root).toHaveAttribute('data-state', 'unchecked')
    fireEvent.click(root)
    expect(root).toHaveAttribute('data-state', 'unchecked')
  })
})
