import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Home } from 'lucide-react'

import { Input } from '.'

describe('Input', () => {
  const user = userEvent.setup()

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

  it('should display the value from props and not update on user input', () => {
    const mockOnChange = vi.fn()
    const initialValue = 'controlled value'

    render(<Input value={initialValue} onChange={mockOnChange} data-testid="controlled-input" />)
    const inputElement = screen.getByTestId('controlled-input')

    expect(inputElement).toHaveValue(initialValue)

    fireEvent.change(inputElement, { target: { value: 'user typing' } })

    expect(inputElement).toHaveValue(initialValue)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should update its displayed value only when the props.value changes', () => {
    const { rerender } = render(<Input value="first value" data-testid="controlled-input" />)
    const inputElement = screen.getByTestId('controlled-input')

    expect(inputElement).toHaveValue('first value')

    rerender(<Input value="second value" data-testid="controlled-input" />)

    expect(inputElement).toHaveValue('second value')
  })

  it('should manage its own state and update its value on user input', () => {
    render(<Input data-testid="uncontrolled-input" />)
    const inputElement = screen.getByTestId('uncontrolled-input')

    expect(inputElement).toHaveValue('')

    fireEvent.change(inputElement, { target: { value: 'user typing' } })

    expect(inputElement).toHaveValue('user typing')
  })

  it('should correctly apply a mask while in uncontrolled mode', () => {
    render(<Input mask="cpf" data-testid="uncontrolled-input" />)
    const inputElement = screen.getByTestId('uncontrolled-input')

    expect(inputElement).toHaveValue('')

    fireEvent.change(inputElement, { target: { value: '12345678900' } })

    expect(inputElement).toHaveValue('123.456.789-00')
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

    const inputElement = screen.getByPlaceholderText('Enter email')
    expect(inputElement).toHaveAttribute('aria-invalid', 'false')
  })

  it('should apply the currency mask correctly for various values', async () => {
    render(<Input mask="currency" data-testid="currency-input" />)
    const input = screen.getByTestId('currency-input')

    await user.type(input, '12345')
    expect(input).toHaveValue('123,45')

    await user.clear(input)
    await user.type(input, '5')
    expect(input).toHaveValue('0,05')

    await user.clear(input)
    await user.type(input, '123456789')
    expect(input).toHaveValue('1.234.567,89')

    await user.clear(input)
    await user.type(input, '000')
    expect(input).toHaveValue('0,00')

    await user.clear(input)
    await user.type(input, '00123')
    expect(input).toHaveValue('1,23')
  })

  it('should apply the phone mask correctly for 8 digits', async () => {
    render(<Input mask="phone" data-testid="phone-input" />)
    const input = screen.getByTestId('phone-input')
    await user.type(input, '1198765432')
    expect(input).toHaveValue('(11) 9876-5432')
  })

  it('should apply the phone mask correctly for 9 digits (mobile)', async () => {
    render(<Input mask="phone" data-testid="phone-input" />)
    const input = screen.getByTestId('phone-input')
    await user.type(input, '21987654321')
    expect(input).toHaveValue('(21) 98765-4321')
  })

  it('should apply the cpf mask correctly', async () => {
    render(<Input mask="cpf" data-testid="cpf-input" />)
    const input = screen.getByTestId('cpf-input')

    await user.type(input, '12345678900')
    expect(input).toHaveValue('123.456.789-00')

    await user.clear(input)
    await user.type(input, '123')
    expect(input).toHaveValue('123')
    await user.type(input, '456')
    expect(input).toHaveValue('123.456')
    await user.type(input, '789')
    expect(input).toHaveValue('123.456.789')
    await user.type(input, '00')
    expect(input).toHaveValue('123.456.789-00')
  })

  it('should apply the cnpj mask correctly', async () => {
    render(<Input mask="cnpj" data-testid="cnpj-input" />)
    const input = screen.getByTestId('cnpj-input')

    await user.type(input, '12345678000199')
    expect(input).toHaveValue('12.345.678/0001-99')

    await user.clear(input)
    await user.type(input, '12')
    expect(input).toHaveValue('12')
    await user.type(input, '3')
    expect(input).toHaveValue('12.3')
    await user.type(input, '456')
    expect(input).toHaveValue('12.345.6')
    await user.type(input, '78')
    expect(input).toHaveValue('12.345.678')
    await user.type(input, '0001')
    expect(input).toHaveValue('12.345.678/0001')
    await user.type(input, '99')
    expect(input).toHaveValue('12.345.678/0001-99')
  })

  it('should not apply mask if mask prop is not provided', async () => {
    render(<Input data-testid="no-mask-input" />)
    const input = screen.getByTestId('no-mask-input')
    await user.type(input, 'abcdef123')
    expect(input).toHaveValue('abcdef123')
  })

  it.each([
    { input: '1', expected: '0,01' },
    { input: '12', expected: '0,12' },
    { input: '123', expected: '1,23' },
    { input: '12345', expected: '123,45' },
    { input: '1234567', expected: '12.345,67' },
    { input: '0', expected: '0,00' },
    { input: 'abc123def', expected: '1,23' },
  ])('should format "$input" into "$expected"', ({ input, expected }) => {
    render(<Input mask="currency" data-testid="currency-input" />)
    const inputElement = screen.getByTestId('currency-input')

    fireEvent.change(inputElement, { target: { value: input } })

    expect(inputElement).toHaveValue(expected)
  })

  it('should return "0,00" for an input of only zeros', () => {
    render(<Input mask="currency" data-testid="currency-input" />)
    const inputElement = screen.getByTestId('currency-input')

    fireEvent.change(inputElement, { target: { value: '0000' } })

    expect(inputElement).toHaveValue('0,00')
  })

  it('should apply the correct mask when a valid "mask" prop is provided', () => {
    render(<Input mask="cnpj" data-testid="cnpj-input" />)
    const inputElement = screen.getByTestId('cnpj-input')
    const rawValue = '12345678000195'
    const maskedValue = '12.345.678/0001-95'

    fireEvent.change(inputElement, { target: { value: rawValue } })

    expect(inputElement).toHaveValue(maskedValue)
  })

  it('should not apply any mask if the "mask" prop is not provided', () => {
    render(<Input data-testid="no-mask-input" />)
    const inputElement = screen.getByTestId('no-mask-input')
    const rawValue = 'some-unformatted-value'

    fireEvent.change(inputElement, { target: { value: rawValue } })

    expect(inputElement).toHaveValue(rawValue)
  })

  it('should not apply any mask if an invalid "mask" prop is provided', () => {
    render(<Input mask={'invalid-mask' as any} data-testid="invalid-mask-input" />)
    const inputElement = screen.getByTestId('invalid-mask-input')
    const rawValue = 'another-value'

    fireEvent.change(inputElement, { target: { value: rawValue } })

    expect(inputElement).toHaveValue(rawValue)
  })

  it('should call the onChange prop with the masked value', () => {
    const mockOnChange = vi.fn()

    render(<Input mask="phone" onChange={mockOnChange} data-testid="phone-input" />)
    const inputElement = screen.getByTestId('phone-input')
    const rawValue = '11987654321'
    const maskedValue = '(11) 98765-4321'

    fireEvent.change(inputElement, { target: { value: rawValue } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: maskedValue,
        }),
      }),
    )
    expect(inputElement).toHaveValue(maskedValue)
  })
})
