import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import { InputOtp } from '.'

describe('InputOtp', () => {
  it('should render the correct number of inputs', () => {
    render(<InputOtp length={4} type="text" />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })

  it('should call onChange with concatenated values', () => {
    const handleChange = vi.fn()
    render(<InputOtp length={3} onChange={handleChange} type="text" />)
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'A' } })
    expect(handleChange).toHaveBeenCalledWith('A')
    fireEvent.change(inputs[1], { target: { value: 'B' } })
    expect(handleChange).toHaveBeenCalledWith('AB')
    fireEvent.change(inputs[2], { target: { value: 'C' } })
    expect(handleChange).toHaveBeenCalledWith('ABC')
  })

  it('should only accept numbers when type is number', () => {
    const handleChange = vi.fn()
    render(<InputOtp length={2} onChange={handleChange} type="number" />)
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '1' } })
    expect(handleChange).toHaveBeenCalledWith('1')
    fireEvent.change(inputs[1], { target: { value: 'x' } })
    expect(handleChange).not.toHaveBeenCalledWith('1x')
  })

  it('should move focus to next input when typing', () => {
    render(<InputOtp length={2} type="text" />)
    const inputs = screen.getAllByRole('textbox')
    inputs[0].focus()
    fireEvent.change(inputs[0], { target: { value: 'A' } })
    expect(document.activeElement).toBe(inputs[1])
  })

  it('should move focus to previous input when deleting', () => {
    render(<InputOtp length={2} type="text" />)
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'A' } })
    fireEvent.change(inputs[1], { target: { value: 'B' } })
    fireEvent.change(inputs[1], { target: { value: '' } })
    expect(document.activeElement).toBe(inputs[0])
  })

  it('should handle paste with numbers when type is number', () => {
    const handleChange = vi.fn()
    render(<InputOtp length={4} onChange={handleChange} type="number" />)
    const inputs = screen.getAllByRole('textbox')
    const event = {
      clipboardData: {
        getData: () => '12ab34',
      },
      preventDefault: vi.fn(),
    }
    fireEvent.paste(inputs[0], event)
    expect(handleChange).toHaveBeenCalledWith('1234')
  })

  it('should handle paste with text when type is text', () => {
    const handleChange = vi.fn()
    render(<InputOtp length={4} onChange={handleChange} type="text" />)
    const inputs = screen.getAllByRole('textbox')
    const event = {
      clipboardData: {
        getData: () => 'WXYZ',
      },
      preventDefault: vi.fn(),
    }
    fireEvent.paste(inputs[0], event)
    expect(handleChange).toHaveBeenCalledWith('WXYZ')
  })

  it('should apply disabled attribute', () => {
    render(<InputOtp length={2} disabled type="text" />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs[0]).toBeDisabled()
    expect(inputs[1]).toBeDisabled()
  })

  it('should apply size variants correctly', () => {
    render(<InputOtp length={1} size="lg" type="text" />)
    expect(screen.getByRole('textbox').className).toContain('h-[2.5rem]')
  })

  it('should ignore paste when clipboard has no data', () => {
    const handleChange = vi.fn()
    render(<InputOtp length={3} onChange={handleChange} type="text" />)
    const inputs = screen.getAllByRole('textbox')
    const event = {
      clipboardData: {
        getData: () => '',
      },
      preventDefault: vi.fn(),
    }
    fireEvent.paste(inputs[0], event)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('should fill empty values with blank when pasted data is shorter than length', () => {
    const handleChange = vi.fn()
    render(<InputOtp length={4} onChange={handleChange} type="text" />)
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
    const event = {
      clipboardData: {
        getData: () => 'AB',
      },
      preventDefault: vi.fn(),
    }
    fireEvent.paste(inputs[0], event)
    expect(handleChange).toHaveBeenCalledWith('AB')
    expect(inputs[2].value).toBe('')
    expect(inputs[3].value).toBe('')
  })

  it('should move focus to the last filled input after paste', () => {
    render(<InputOtp length={4} type="text" />)
    const inputs = screen.getAllByRole('textbox')
    const event = {
      clipboardData: {
        getData: () => 'XYZ',
      },
      preventDefault: vi.fn(),
    }
    fireEvent.paste(inputs[0], event)
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(document.activeElement).toBe(inputs[2])
        resolve(true)
      }, 0)
    })
  })
})
