import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Card } from '.'

vi.mock('@/components/ui/discount-badge', () => ({
  DiscountBadge: ({ value }: { value: number }) => (
    <div data-testid="discount-badge">Discount {value}</div>
  ),
}))
vi.mock('@/components/ui/category-tag', () => ({
  CategoryTag: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="category-tag" className={className}>
      {children}
    </div>
  ),
}))
vi.mock('@/components/ui/quality-bar', () => ({
  QualityBar: ({ value }: { value: number }) => (
    <div data-testid="quality-bar">Quality {value}</div>
  ),
}))

const baseProps = {
  price: 100,
  category: 'Eletrônicos',
  quality: 80,
  name: 'Produto Teste',
  images: [
    { url: 'primary.jpg', alt: 'Primary image' },
    { url: 'hover.jpg', alt: 'Hover image' },
  ],
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('ShoppingCard', () => {
  it('should render with mandatory props', () => {
    render(<Card {...baseProps} />)

    expect(screen.getByTestId('category-tag')).toHaveTextContent('Eletrônicos')
    expect(screen.getByText('Produto Teste')).toBeInTheDocument()
    expect(screen.getByAltText('Primary image')).toBeInTheDocument()
    expect(screen.getByAltText('Hover image')).toBeInTheDocument()
    expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument()
    expect(screen.getByTestId('quality-bar')).toHaveTextContent('Quality 80')
  })

  it('should render with discount and reference price', () => {
    render(<Card {...baseProps} discount={20} referencePrice={200} />)
    expect(screen.getByTestId('discount-badge')).toHaveTextContent('Discount 20')
    expect(screen.getByText('Preço de referência 200,00 R$')).toBeInTheDocument()
  })

  it('should render with tradeStatus and name badge', () => {
    render(<Card {...baseProps} tradeStatus="Em troca" hasNameBadge />)
    expect(screen.getByText('Em troca')).toBeInTheDocument()

    expect(screen.getByText('Produto Teste')).toBeInTheDocument()
  })

  it('should render with additional info', () => {
    render(<Card {...baseProps} additionalInfo="Mais detalhes aqui" />)
    expect(screen.getByText('Mais detalhes aqui')).toBeInTheDocument()
  })

  it('should call onClick when clicking the card', () => {
    const onClick = vi.fn()
    render(<Card {...baseProps} onClick={onClick} />)

    fireEvent.click(screen.getByText('Produto Teste'))
    expect(onClick).toHaveBeenCalled()
  })

  it('should call onClickAddCart when clicking add to cart', () => {
    const onClickAddCart = vi.fn()
    render(<Card {...baseProps} onClickAddCart={onClickAddCart} />)

    fireEvent.click(screen.getByText('Adicionar ao carrinho'))
    expect(onClickAddCart).toHaveBeenCalled()
  })

  it('should toggle nav options closed when clicking options button again', () => {
    vi.useFakeTimers()
    const options = [{ title: 'Opção Teste', icon: <span>⭐</span>, onClick: vi.fn() }]

    render(<Card {...baseProps} options={options} />)

    const button = screen.getByRole('button', { name: '' })

    // Primeiro clique: abre
    fireEvent.click(button)
    act(() => {
      vi.advanceTimersByTime(20) // tempo do open
    })
    expect(screen.getByText('Opção Teste')).toBeInTheDocument()

    // Segundo clique: fecha
    fireEvent.click(button)

    // avança o timer do useEffect (200ms)
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(screen.queryByText('Opção Teste')).not.toBeInTheDocument()
  })

  it('should open and close nav options when clicking options button', () => {
    const optionClick = vi.fn()
    const options = [{ title: 'Editar', icon: <span>📝</span>, onClick: optionClick }]

    render(<Card {...baseProps} options={options} />)

    expect(screen.queryByText('Editar')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '' }))
    act(() => {
      vi.advanceTimersByTime(20)
    })
    expect(screen.getByText('Editar')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Editar'))
    expect(optionClick).toHaveBeenCalled()

    const editDiv = screen.getByText('Editar').closest('div')
    if (editDiv) {
      fireEvent.blur(editDiv)
    }

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(screen.queryByText('Editar')).not.toBeInTheDocument()
  })

  it('should close nav options on mouse leave', () => {
    const options = [{ title: 'Remover', icon: <span>❌</span>, onClick: vi.fn() }]

    render(<Card {...baseProps} options={options} />)

    fireEvent.click(screen.getByRole('button', { name: '' }))
    act(() => {
      vi.advanceTimersByTime(20)
    })
    expect(screen.getByText('Remover')).toBeInTheDocument()

    const productDiv = screen.getByText('Produto Teste').closest('div')
    if (productDiv) {
      fireEvent.mouseLeave(productDiv)
    }

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(screen.queryByText('Remover')).not.toBeInTheDocument()
  })
})
