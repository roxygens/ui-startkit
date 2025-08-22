import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CategoryTag } from './category-tag'

describe('CategoryTag', () => {
  it('should render the children content correctly', () => {
    render(<CategoryTag>Luvas Desportivas</CategoryTag>)
    expect(screen.getByText('Luvas Desportivas')).toBeInTheDocument()

    render(
      <CategoryTag>
        <span>Testando com um span</span>
      </CategoryTag>,
    )
    expect(screen.getByText('Testando com um span')).toBeInTheDocument()
  })

  it('should have the default base classes applied', () => {
    const testContent = 'Test Content'
    const { container } = render(<CategoryTag>{testContent}</CategoryTag>)

    const tagElement = container.firstChild

    expect(tagElement).toHaveClass('inline-flex')
    expect(tagElement).toHaveClass('items-center')
    expect(tagElement).toHaveClass('rounded')
    expect(tagElement).toHaveClass('border')
    expect(tagElement).toHaveClass('border-white/15')
    expect(tagElement).toHaveClass('bg-white/5')
    expect(tagElement).toHaveClass('px-2')
    expect(tagElement).toHaveClass('py-[6px]')
    expect(tagElement).toHaveClass('text-xs')
    expect(tagElement).toHaveClass('font-semibold')
    expect(tagElement).toHaveClass('uppercase')
    expect(tagElement).toHaveClass('tracking-wider')
    expect(tagElement).toHaveClass('text-[#FFF172]')
  })

  it('should correctly merge and override classes passed via the className prop', () => {
    const testContent = 'Custom Tag'
    const { container } = render(
      <CategoryTag className="bg-red-500 mt-4 text-white">{testContent}</CategoryTag>,
    )
    const tagElement = container.firstChild

    expect(tagElement).toHaveClass('mt-4')

    expect(tagElement).toHaveClass('bg-red-500')
    expect(tagElement).not.toHaveClass('bg-white/5')

    expect(tagElement).toHaveClass('text-white')
    expect(tagElement).not.toHaveClass('text-[#FFF172]')

    expect(tagElement).toHaveClass('rounded')
    expect(tagElement).toHaveClass('uppercase')
  })
})
