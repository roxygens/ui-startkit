import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { DatePicker } from '.' // Adjust the import path

describe('DatePicker', () => {
  const scrollIntoViewMock = vi.fn()
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView

  beforeEach(() => {
    vi.useFakeTimers()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView
  })

  it('should render the DatePicker with default month and weekdays', () => {
    render(<DatePicker />)
    expect(screen.getByText('Dom')).toBeInTheDocument()
    expect(screen.getByText('Seg')).toBeInTheDocument()
    expect(screen.getByText('Ter')).toBeInTheDocument()
    expect(screen.getByText('Qua')).toBeInTheDocument()
    expect(screen.getByText('Qui')).toBeInTheDocument()
    expect(screen.getByText('Sex')).toBeInTheDocument()
    expect(screen.getByText('Sáb')).toBeInTheDocument()
  })

  it('should format caption correctly', () => {
    render(<DatePicker month={new Date(2025, 0, 1)} />)
    expect(screen.getByText('Janeiro de 2025')).toBeInTheDocument()
  })

  it('should navigate to next and previous month with "label" layout', () => {
    render(<DatePicker defaultMonth={new Date(2025, 0, 1)} captionLayout="label" />)
    const nextButton = screen.getByRole('button', { name: /next/i })
    const prevButton = screen.getByRole('button', { name: /previous/i })

    fireEvent.click(nextButton)
    expect(screen.getByText('Fevereiro de 2025')).toBeInTheDocument()

    fireEvent.click(prevButton)
    expect(screen.getByText('Janeiro de 2025')).toBeInTheDocument()
  })

  it('should open and select a year in the dropdown', async () => {
    const onMonthChange = vi.fn()
    render(
      <DatePicker
        captionLayout="dropdown-years"
        fromYear={2020}
        toYear={2026}
        month={new Date(2024, 0, 1)}
        onMonthChange={onMonthChange}
      />,
    )

    const yearTrigger = screen.getAllByTestId('calendar-dropdown-trigger')[0]
    fireEvent.click(yearTrigger)

    vi.advanceTimersByTime(20)

    const calendarDropdownOption = screen.getAllByTestId('calendar-dropdown-option-2024')[0]
    fireEvent.click(calendarDropdownOption)

    expect(onMonthChange).toHaveBeenCalledTimes(1)
  })

  it('should select a day when clicked', () => {
    const onSelect = vi.fn()
    const testDate = new Date(2024, 4, 15)
    render(<DatePicker mode="single" onSelect={onSelect} month={testDate} />)

    const dayButton = screen.getByText(15)
    fireEvent.click(dayButton)

    expect(onSelect).toHaveBeenCalledWith(testDate, testDate, expect.anything(), expect.anything())
  })

  it('should show week numbers when enabled', () => {
    render(<DatePicker showWeekNumber />)
    expect(screen.getAllByRole('rowheader').length).toBeGreaterThan(0)
  })

  it('should not display outside days when showOutsideDays is false', () => {
    render(<DatePicker month={new Date(2024, 1, 1)} showOutsideDays={false} />)
    const gridcells = screen.getAllByRole('gridcell')
    const outsideDayCell = gridcells.find(
      (cell) => cell.textContent === '28' && cell.querySelector('button')?.disabled,
    )
    expect(outsideDayCell?.querySelector('button')).toBeFalsy()
  })

  it('should handle range selection', () => {
    const onSelect = vi.fn()
    const from = new Date(2024, 4, 10)
    const to = new Date(2024, 4, 20)
    render(<DatePicker mode="range" onSelect={onSelect} selected={{ from, to }} month={from} />)

    const day15 = screen.getByText('15')
    expect(day15.parentElement).toHaveClass('rdp-range_middle')
  })
})
