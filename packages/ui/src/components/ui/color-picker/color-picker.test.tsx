import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ColorPicker } from '.'

const options = [
  { from: '#ff0000', to: '#00ff00' },
  { from: '#0000ff', to: '#ffff00' },
]

describe('ColorPicker', () => {
  it('should render all color options', () => {
    render(<ColorPicker options={options} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(options.length)
  })

  it('should select color on click and call onSelect', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ColorPicker options={options} onSelect={onSelect} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith({ from: '#0000ff', to: '#ffff00', index: 1 })
  })

  it('should apply selected styles when clicked', async () => {
    const user = userEvent.setup()
    render(<ColorPicker options={options} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])

    expect(buttons[0]).toHaveClass('border-white')
    expect(buttons[1]).not.toHaveClass('border-white')
  })

  it('should initialize with selectedIndex', () => {
    render(<ColorPicker options={options} selectedIndex={1} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toHaveClass('border-white')
    expect(buttons[0]).not.toHaveClass('border-white')
  })

  it('should update selection when selectedIndex changes', () => {
    const { rerender } = render(<ColorPicker options={options} selectedIndex={0} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveClass('border-white')

    rerender(<ColorPicker options={options} selectedIndex={1} />)
    expect(buttons[1]).toHaveClass('border-white')
    expect(buttons[0]).not.toHaveClass('border-white')
  })

  it('should handle null selectedIndex without errors', () => {
    render(<ColorPicker options={options} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).not.toHaveClass('border-white')
    expect(buttons[1]).not.toHaveClass('border-white')
  })
})
