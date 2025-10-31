import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from '.'

describe('Spinner', () => {
  it('should render the component without crashing', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByRole('status')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('should have an accessible name for screen readers', () => {
    render(<Spinner />)
    const srOnlyText = screen.getByText('Loading...')
    expect(srOnlyText).toBeInTheDocument()
    expect(srOnlyText).toHaveClass('sr-only')
  })

  it('should apply the default base classes', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByRole('status')
    expect(spinnerElement).toHaveClass('animate-spin', 'rounded-full', 'text-primary')
  })

  it('should accept and apply a custom className', () => {
    const customClass = 'mt-4 w-16 h-16'
    render(<Spinner className={customClass} />)
    const spinnerElement = screen.getByRole('status')
    expect(spinnerElement).toHaveClass(customClass)
  })

  it('should merge the custom className with the default classes', () => {
    const customClass = 'opacity-50'
    render(<Spinner className={customClass} />)
    const spinnerElement = screen.getByRole('status')

    expect(spinnerElement).toHaveClass('animate-spin')
    expect(spinnerElement).toHaveClass('text-primary')
    expect(spinnerElement).toHaveClass(customClass)
  })
})
