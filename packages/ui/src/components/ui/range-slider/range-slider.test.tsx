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

  it('should clamp initialMin to min prop when initialMin is below min', () => {
    render(<RangeSlider min={10} max={100} initialMin={0} displayValues />)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('should clamp initialMax to max prop when initialMax is above max', () => {
    render(<RangeSlider min={0} max={50} initialMax={100} displayValues />)
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('should set initialMax equal to initialMin when initialMax is less than initialMin', () => {
    render(<RangeSlider min={0} max={100} initialMin={60} initialMax={40} displayValues />)
    const values = screen.getAllByText('60')
    expect(values).toHaveLength(2)
  })

  it('should clamp values.min and values.max within props range', () => {
    render(<RangeSlider min={10} max={90} values={{ min: 0, max: 100 }} displayValues />)
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()
  })

  it('should set max equal to min when values.max is less than values.min', () => {
    render(<RangeSlider min={0} max={100} values={{ min: 70, max: 50 }} displayValues />)
    const values = screen.getAllByText('70')
    expect(values).toHaveLength(2)
  })

  it('should keep values when inside the allowed range', () => {
    render(<RangeSlider min={0} max={100} values={{ min: 30, max: 80 }} displayValues />)
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
  })
})
