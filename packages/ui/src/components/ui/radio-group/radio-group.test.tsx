import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RadioGroup } from '.'

describe('RadioGroup', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2', description: 'Second option' },
    { label: 'Option 3', value: 'opt3', disabled: true },
  ]

  it('should render all options with labels', () => {
    render(<RadioGroup options={options} />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('should call props.onValueChange when a radio option is selected', () => {
    const handleChange = vi.fn()
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]

    render(<RadioGroup options={options} onValueChange={handleChange} />)

    const option1 = screen.getByLabelText('Option 1')
    const option2 = screen.getByLabelText('Option 2')

    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith('option1')

    fireEvent.click(option2)
    expect(handleChange).toHaveBeenCalledWith('option2')

    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('should render with description when provided', () => {
    render(<RadioGroup options={options} />)
    expect(screen.getByText('Second option')).toBeInTheDocument()
  })

  it('should select an option when clicked', () => {
    render(<RadioGroup options={options} />)
    const option1 = screen.getByLabelText('Option 1')
    const option2 = screen.getByLabelText('Option 2')

    fireEvent.click(option1)
    expect(option1).toBeChecked()

    fireEvent.click(option2)
    expect(option2).toBeChecked()
    expect(option1).not.toBeChecked()
  })

  it('should select defaultValue on mount', () => {
    render(<RadioGroup options={options} defaultValue="opt2" />)
    const option2 = screen.getByLabelText('Option 2')
    expect(option2).toBeChecked()
  })

  it('should not allow selecting disabled option', () => {
    render(<RadioGroup options={options} />)
    const option3 = screen.getByLabelText('Option 3')
    expect(option3).toBeDisabled()
    fireEvent.click(option3)
    expect(option3).not.toBeChecked()
  })

  it('should toggle when container is clicked if description exists', () => {
    render(<RadioGroup options={options} />)
    const container = screen.getByText('Second option').closest('div')
    const option2 = screen.getByLabelText('Option 2')
    if (container) fireEvent.click(container)
    expect(option2).toBeChecked()
  })
})
