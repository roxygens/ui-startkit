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

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.25rem] text-sm')
    })

    it('should apply specified size variant (xs) classes', () => {
      render(<Input size="xs" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[1.5rem] text-xs')
    })

    it('should apply specified size variant (sm) classes', () => {
      render(<Input size="sm" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2rem] text-xs')
    })

    it('should apply specified size variant (md) classes', () => {
      render(<Input size="md" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.25rem] text-sm')
    })

    it('should apply specified size variant (lg) classes', () => {
      render(<Input size="lg" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.5rem] text-sm')
    })

    it('should apply specified size variant (xl) classes', () => {
      render(<Input size="xl" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('px-[0.5rem] h-[3rem] text-base')
    })

    it('should merge additional classNames with variant classes', () => {
      render(<Input size="lg" className="my-custom-class" />)
      const inputElement = screen.getByRole('textbox')

      expect(inputElement).toHaveClass('my-custom-class')
      expect(inputElement).toHaveClass('px-[0.5rem] h-[2.5rem] text-sm')
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
    expect(input).toHaveClass('pl-[1.75rem]')
  })

  it('should render with md size and icon', () => {
    render(<Input data-testid="input" size="md" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('pl-[1.875rem]')
  })

  it('should render with lg size and icon', () => {
    render(<Input data-testid="input" size="lg" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('pl-[1.875rem]')
  })

  it('should render with xl size and icon', () => {
    render(<Input data-testid="input" size="xl" icon={<Home data-testid="icon" />} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('pl-[2rem]')
  })

  it('should render with xs size and icon applying iconVariants', () => {
    render(<Input data-testid="input" size="xs" icon={<Home data-testid="icon" />} />)
    const icon = screen.getByTestId('icon')
    expect(icon.parentElement).toHaveClass('[&_svg]:h-[0.75rem] [&_svg]:w-[0.75rem]')
  })

  it('should render with sm size and icon applying iconVariants', () => {
    render(<Input data-testid="input" size="sm" icon={<Home data-testid="icon" />} />)
    const icon = screen.getByTestId('icon')
    expect(icon.parentElement).toHaveClass('[&_svg]:h-[0.75rem] [&_svg]:w-[0.75rem]')
  })

  it('should render with md size and icon applying iconVariants', () => {
    render(<Input data-testid="input" size="md" icon={<Home data-testid="icon" />} />)
    const icon = screen.getByTestId('icon')
    expect(icon.parentElement).toHaveClass('[&_svg]:h-[0.875rem] [&_svg]:w-[0.875rem]')
  })

  it('should render with lg size and icon applying iconVariants', () => {
    render(<Input data-testid="input" size="lg" icon={<Home data-testid="icon" />} />)
    const icon = screen.getByTestId('icon')
    expect(icon.parentElement).toHaveClass('[&_svg]:h-[0.875rem] [&_svg]:w-[0.875rem]')
  })

  it('should render with xl size and icon applying iconVariants', () => {
    render(<Input data-testid="input" size="xl" icon={<Home data-testid="icon" />} />)
    const icon = screen.getByTestId('icon')
    expect(icon.parentElement).toHaveClass('[&_svg]:h-[1rem] [&_svg]:w-[1rem]')
  })

  it('should render prefix with xs size and correct variant classes', () => {
    render(<Input data-testid="input" size="xs" prefix="R$" />)
    const prefix = screen.getByText('R$')
    expect(prefix).toHaveClass('text-xs')
    expect(prefix).toHaveClass('absolute')
  })

  it('should render prefix with sm size and correct variant classes', () => {
    render(<Input data-testid="input" size="sm" prefix="R$" />)
    const prefix = screen.getByText('R$')
    expect(prefix).toHaveClass('text-xs')
    expect(prefix).toHaveClass('absolute')
  })

  it('should render prefix with md size and correct variant classes', () => {
    render(<Input data-testid="input" size="md" prefix="R$" />)
    const prefix = screen.getByText('R$')
    expect(prefix).toHaveClass('text-sm')
    expect(prefix).toHaveClass('absolute')
  })

  it('should render prefix with lg size and correct variant classes', () => {
    render(<Input data-testid="input" size="lg" prefix="R$" />)
    const prefix = screen.getByText('R$')
    expect(prefix).toHaveClass('text-sm')
    expect(prefix).toHaveClass('absolute')
  })

  it('should render prefix with xl size and correct variant classes', () => {
    render(<Input data-testid="input" size="xl" prefix="R$" />)
    const prefix = screen.getByText('R$')
    expect(prefix).toHaveClass('text-base')
    expect(prefix).toHaveClass('absolute')
  })

  it('should apply dynamic padding-left when prefix is present', () => {
    render(<Input data-testid="input" prefix="R$" />)
    const input = screen.getByTestId('input')
    const style = input.getAttribute('style') || ''
    expect(style.includes('padding-left')).toBe(true)
  })

  it('should display the error message when errors prop is provided', () => {
    const errorMessage = 'This field is required'

    render(
      <Input
        name="email"
        errors={{ email: { message: errorMessage } }}
        placeholder="Enter email"
      />,
    )

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()

    const inputElement = screen.getByPlaceholderText('Enter email')
    expect(inputElement).toHaveAttribute('aria-invalid', 'true')
  })

  it('should not display error when errors prop is empty', () => {
    render(<Input name="email" errors={{}} placeholder="Enter email" />)

    const errorElements = screen.queryByText(/./)
    expect(errorElements).not.toBeInTheDocument()

    const inputElement = screen.getByPlaceholderText('Enter email')
    expect(inputElement).toHaveAttribute('aria-invalid', 'false')
  })
})
