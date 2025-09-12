import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from '.'

describe('Checkbox', () => {
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg']

  it('should render without label and description', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('should render with label and description', () => {
    render(<Checkbox label="Test Label" description="Test Description" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('should toggle checked state when clicking the checkbox', () => {
    render(<Checkbox label="Test Label" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })
  it('should toggle checked state when clicking the container if description exists', () => {
    render(<Checkbox label="Label" description="Description" />)
    const container = screen.getByText('Description').parentElement?.parentElement
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(container).toBeDefined()
    fireEvent.click(container!)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(container!)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('should apply border-neutral-400 class when checked', () => {
    render(<Checkbox label="Label" description="Description" />)
    const container = screen.getByText('Description').parentElement?.parentElement
    const checkbox = screen.getByRole('checkbox')
    expect(container).not.toHaveClass('border-neutral-400')
    fireEvent.click(checkbox)
    expect(container).toHaveClass('border-neutral-400')
  })

  it('should render all size variants with correct classes', () => {
    sizes.forEach((size) => {
      render(
        <Checkbox size={size} label="Label" description="Desc" data-testid="checkbox-primitive" />,
      )

      const checkbox = screen.getByTestId('checkbox-primitive')
      const label = screen.getByText('Label')
      const description = screen.getByText('Desc')

      switch (size) {
        case 'xs':
          expect(checkbox).toHaveClass('h-3 w-3')
          expect(label).toHaveClass('text-[0.75rem]')
          expect(description).toHaveClass('text-[0.625rem]')
          break
        case 'sm':
          expect(checkbox).toHaveClass('h-3.5 w-3.5')
          expect(label).toHaveClass('text-[0.8125rem]')
          expect(description).toHaveClass('text-[0.6875rem]')
          break
        case 'md':
          expect(checkbox).toHaveClass('h-4 w-4')
          expect(label).toHaveClass('text-[0.875rem]')
          expect(description).toHaveClass('text-[0.75rem]')
          break
        case 'lg':
          expect(checkbox).toHaveClass('h-5 w-5')
          expect(label).toHaveClass('text-[1rem]')
          expect(description).toHaveClass('text-[0.875rem]')
          break
      }

      cleanup() // limpa o DOM para a próxima iteração
    })
  })

  it('should not toggle when checkbox is disabled', () => {
    render(<Checkbox label="Label" disabled />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('should stop propagation when clicking the checkbox', () => {
    const clickHandler = vi.fn()
    render(
      <div onClick={clickHandler}>
        <Checkbox label="Label" />
      </div>,
    )
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(clickHandler).not.toHaveBeenCalled()
  })

  it('should render aria-invalid when passed', () => {
    render(<Checkbox label="Label" aria-invalid />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
  })
})
