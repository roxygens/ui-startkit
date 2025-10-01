import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RangeSlider } from '.'

describe('RangeSlider', () => {
  it('should render with default values', () => {
    render(<RangeSlider />)
    const inputs = screen.getAllByRole('slider')
    expect(inputs).toHaveLength(2)
    expect((inputs[0] as HTMLInputElement).value).toBe('20')
    expect((inputs[1] as HTMLInputElement).value).toBe('80')
  })

  it('should render with custom initial values', () => {
    render(<RangeSlider initialMin={10} initialMax={90} />)
    const inputs = screen.getAllByRole('slider')
    expect((inputs[0] as HTMLInputElement).value).toBe('10')
    expect((inputs[1] as HTMLInputElement).value).toBe('90')
  })

  it('should call onChange when min value changes', () => {
    const onChange = vi.fn()
    render(<RangeSlider onChange={onChange} />)
    const inputs = screen.getAllByRole('slider')
    fireEvent.change(inputs[0], { target: { value: '25' } })
    expect(onChange).toHaveBeenCalledWith({ min: 25, max: 80 })
  })

  it('should not allow min value to exceed max - step', () => {
    const onChange = vi.fn()
    render(<RangeSlider step={5} initialMax={30} onChange={onChange} />)
    const inputs = screen.getAllByRole('slider')
    fireEvent.change(inputs[0], { target: { value: '50' } })
    expect((inputs[0] as HTMLInputElement).value).toBe('25')
    expect(onChange).toHaveBeenCalledWith({ min: 25, max: 30 })
  })

  it('should call onChange when max value changes', () => {
    const onChange = vi.fn()
    render(<RangeSlider onChange={onChange} />)
    const inputs = screen.getAllByRole('slider')
    fireEvent.change(inputs[1], { target: { value: '70' } })
    expect(onChange).toHaveBeenCalledWith({ min: 20, max: 70 })
  })

  it('should not allow max value to go below min + step', () => {
    const onChange = vi.fn()
    render(<RangeSlider step={5} initialMin={30} onChange={onChange} />)
    const inputs = screen.getAllByRole('slider')
    fireEvent.change(inputs[1], { target: { value: '10' } })
    expect((inputs[1] as HTMLInputElement).value).toBe('35')
    expect(onChange).toHaveBeenCalledWith({ min: 30, max: 35 })
  })

  it('should display values when displayValues is true', () => {
    render(<RangeSlider initialMin={15} initialMax={45} displayValues />)
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('45')).toBeInTheDocument()
  })

  it('should not display values when displayValues is false', () => {
    render(<RangeSlider initialMin={15} initialMax={45} />)
    expect(screen.queryByText('15')).toBeNull()
    expect(screen.queryByText('45')).toBeNull()
  })
})
