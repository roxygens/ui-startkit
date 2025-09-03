import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '.'

describe('Badge', () => {
  it('should render correctly and display the formatted discount value', () => {
    render(<Badge value={15} />)
    const badgeElement = screen.getByText('-15%')

    expect(badgeElement).toBeInTheDocument()
  })

  it('should have the base CSS classes applied', () => {
    render(<Badge value={10} />)
    const badgeElement = screen.getByText('-10%')

    expect(badgeElement).toHaveClass('font-inter')
    expect(badgeElement).toHaveClass('font-semibold')
    expect(badgeElement).toHaveClass('text-white')
  })

  describe('Variants', () => {
    it('should apply the correct classes for the default "lg" size', () => {
      render(<Badge value={20} size="lg" />)
      const badgeElement = screen.getByText('-20%')

      expect(badgeElement).toHaveClass('px-[.38rem]')
      expect(badgeElement).toHaveClass('py-[.38rem]')
      expect(badgeElement).toHaveClass('rounded-[1.5rem]')
      expect(badgeElement).toHaveClass('text-[.75rem]')
      expect(badgeElement).toHaveClass('leading-[.95rem]')
    })
  })

  it('should correctly merge additional classes passed via className prop', () => {
    render(<Badge value={25} className="mt-4 animate-pulse" />)
    const badgeElement = screen.getByText('-25%')

    expect(badgeElement).toHaveClass('mt-4')
    expect(badgeElement).toHaveClass('animate-pulse')

    expect(badgeElement).toHaveClass('rounded-[1.5rem]')
  })

  it('should apply the correct linear-gradient background style', () => {
    render(<Badge value={30} />)
    const badgeElement = screen.getByText('-30%')

    expect(badgeElement.style.backgroundImage).toContain('linear-gradient')
    expect(badgeElement.style.backgroundImage).toContain('var(--primary)')
    expect(badgeElement.style.backgroundImage).toContain('color-mix')
  })
})
