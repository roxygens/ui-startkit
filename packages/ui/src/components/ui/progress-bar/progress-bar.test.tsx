import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from '.'

describe('ProgressBar', () => {
  it('should render with percentage on the left and correct styles', () => {
    render(<ProgressBar value={25} showPercentage="left" />)
    const percentage = screen.getByText('25%')
    expect(percentage).toBeInTheDocument()
    expect(percentage).toHaveClass('text-xs text-white')
    expect(percentage).toHaveStyle({ marginRight: '0.75rem' })
  })

  it('should render with percentage on the right and correct styles', () => {
    render(<ProgressBar value={50} showPercentage="right" />)
    const percentage = screen.getByText('50%')
    expect(percentage).toBeInTheDocument()
    expect(percentage).toHaveClass('text-xs text-white')
    expect(percentage).toHaveStyle({ marginLeft: '0.75rem' })
  })

  it('should render with percentage on the bottom-left and correct styles', () => {
    render(<ProgressBar value={75} showPercentage="bottom" />)
    const percentage = screen.getByText('75%')
    expect(percentage).toBeInTheDocument()
    expect(percentage).toHaveClass('absolute text-xs text-white')
    expect(percentage).toHaveStyle({ marginTop: '0.75rem' })
    expect(percentage).not.toHaveStyle({ right: '0' })
  })

  it('should not render percentage when showPercentage is none', () => {
    render(<ProgressBar value={80} showPercentage="none" />)
    expect(screen.queryByText('80%')).not.toBeInTheDocument()
  })

  it('should clamp percentage below 0 to 0% and apply width 0%', () => {
    render(<ProgressBar value={-10} showPercentage="left" />)
    const percentage = screen.getByText('0%')
    expect(percentage).toBeInTheDocument()
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveStyle({ width: '0%' })
  })

  it('should clamp percentage above 100 to 100% and apply width 100%', () => {
    render(<ProgressBar value={150} showPercentage="right" />)
    const percentage = screen.getByText('100%')
    expect(percentage).toBeInTheDocument()
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveStyle({ width: '100%' })
  })
})
