import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SelectInput } from './select'

const mockOptions = [
  { label: 'Maçã', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Uva', value: 'grape' },
]

describe('SelectInput Component', () => {
  const user = userEvent.setup()

  it('should render with a placeholder', () => {
    render(
      <SelectInput options={mockOptions} placeholder="Selecione uma fruta" selectLabel="Frutas" />,
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Selecione uma fruta')
  })

  it('should open the dropdown, display options, and update the value on selection', async () => {
    render(
      <SelectInput options={mockOptions} placeholder="Selecione uma fruta" selectLabel="Frutas" />,
    )

    const trigger = screen.getByRole('combobox')

    await user.click(trigger)

    expect(screen.getByText('Frutas')).toBeInTheDocument()
    const optionBanana = await screen.findByText('Banana')
    expect(optionBanana).toBeInTheDocument()
    expect(screen.getByText('Maçã')).toBeInTheDocument()

    await user.click(optionBanana)

    expect(screen.queryByText('Maçã')).not.toBeInTheDocument()

    expect(trigger).toHaveTextContent('Banana')
    expect(trigger).not.toHaveTextContent('Selecione uma fruta')
  })

  it('should call onValueChange with the correct value when an item is selected', async () => {
    const handleValueChange = vi.fn()
    render(
      <SelectInput
        options={mockOptions}
        placeholder="Selecione uma fruta"
        selectLabel="Frutas"
        onValueChange={handleValueChange}
      />,
    )

    await user.click(screen.getByRole('combobox'))
    await user.click(await screen.findByText('Uva'))

    expect(handleValueChange).toHaveBeenCalledTimes(1)
    expect(handleValueChange).toHaveBeenCalledWith('grape')
  })

  it('should be disabled when the disabled prop is true', async () => {
    render(
      <SelectInput
        options={mockOptions}
        placeholder="Selecione uma fruta"
        selectLabel="Frutas"
        disabled
      />,
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()

    await user.click(trigger)

    expect(screen.queryByText('Maçã')).not.toBeInTheDocument()
  })

  it('should apply size variant classes correctly', () => {
    render(<SelectInput options={mockOptions} placeholder="Select" selectLabel="Label" size="sm" />)
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('h-[32px]')
  })

  it('should APPLY the hover class when aria-invalid prop is not provided', () => {
    render(<SelectInput options={mockOptions} placeholder="Válido por padrão" />)

    const icon = screen.getByTestId('select-chevron-icon')

    expect(icon.classList).toContain('group-hover:text-[var(--primary)]')
  })

  it('should NOT apply the hover class when the component is invalid (aria-invalid={true})', () => {
    render(<SelectInput options={mockOptions} placeholder="Inválido" aria-invalid={true} />)

    const icon = screen.getByTestId('select-chevron-icon')

    expect(icon.classList).not.toContain('group-hover:text-[var(--primary)]')
  })

  it('should forward the ref to the trigger element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<SelectInput ref={ref} options={mockOptions} placeholder="Select" selectLabel="Label" />)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toEqual(screen.getByRole('combobox'))
  })
})
