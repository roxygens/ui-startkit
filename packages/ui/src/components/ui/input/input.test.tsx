import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Home } from 'lucide-react'

import { Input } from '.'

describe('Input', () => {
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

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.25rem] text-base')
    })

    it('should apply specified size variant (xs) classes', () => {
      render(<Input size="xs" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[1.5rem] text-xs')
    })

    it('should apply specified size variant (sm) classes', () => {
      render(<Input size="sm" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2rem] text-sm')
    })

    it('should apply specified size variant (md) classes', () => {
      render(<Input size="md" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.25rem] text-base')
    })

    it('should apply specified size variant (lg) classes', () => {
      render(<Input size="lg" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.5rem] text-lg')
    })

    it('should merge additional classNames with variant classes', () => {
      render(<Input size="lg" className="my-custom-class" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('my-custom-class')
      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.5rem] text-lg')
    })
  })

  it('should forward the ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)

    expect(ref.current).toBe(screen.getByRole('textbox'))

    ref.current?.focus()
    expect(ref.current).toHaveFocus()
  })

  it('should render with xs size and icon', () => {
    render(<Input data-testid="input" size="xs" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    const icon = screen.getByTestId('icon')
    expect(input).toHaveClass('pl-[1.75rem]')
    expect(icon).toBeInTheDocument()
  })

  it('should render with sm size and icon', () => {
    render(<Input data-testid="input" size="sm" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('pl-[1.875rem]')
  })

  it('should render with md size and icon', () => {
    render(<Input data-testid="input" size="md" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('pl-[2rem]')
  })

  it('should render with lg size and icon', () => {
    render(<Input data-testid="input" size="lg" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('pl-[2.25rem]')
  })
})
