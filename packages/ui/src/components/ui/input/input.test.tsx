import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input Component', () => {
  it('should render the input element correctly', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('should apply standard HTML input attributes', () => {
    render(<Input type="email" placeholder="Digite seu e-mail" />)

    const inputElement = screen.getByPlaceholderText('Digite seu e-mail')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'email')
  })

  it('should call onChange handler when the user types', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input onChange={handleChange} />)

    const inputElement = screen.getByRole('textbox')
    await user.type(inputElement, 'Olá Mundo')

    expect(handleChange).toHaveBeenCalled()
    expect(inputElement).toHaveValue('Olá Mundo')
  })

  it('should be disabled when the disabled prop is true', () => {
    render(<Input disabled />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeDisabled()
  })

  describe('Styling Variants', () => {
    it('should apply default size variant (md) classes', () => {
      render(<Input />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('h-[36px]')
      expect(inputElement).toHaveClass('text-base')
    })

    it('should apply specified size variant (sm) classes', () => {
      render(<Input size="sm" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('h-[32px]')
      expect(inputElement).toHaveClass('text-sm')
    })

    it('should merge additional classNames with variant classes', () => {
      render(<Input size="lg" className="my-custom-class" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('my-custom-class')
      expect(inputElement).toHaveClass('h-[40px]')
    })
  })

  it('should forward the ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)

    expect(ref.current).toBe(screen.getByRole('textbox'))

    ref.current?.focus()
    expect(ref.current).toHaveFocus()
  })
})
