import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Slot } from '@radix-ui/react-slot'
import { Breadcrumb } from '.'

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Shoes' },
  ]

  const FakeLink = ({ href, children, ...props }: any) => (
    <a data-testid="fake-link" href={href} {...props}>
      {children}
    </a>
  )

  it('should render container with proper attributes', () => {
    render(<Breadcrumb items={items} />)
    const container = screen.getByRole('navigation')
    expect(container).toHaveAttribute('data-slot', 'breadcrumb')
    expect(container).toHaveAttribute('aria-label', 'breadcrumb')
  })

  it('should render breadcrumb list with styles', () => {
    render(<Breadcrumb items={items} />)
    const list = screen.getByRole('list')
    expect(list).toHaveAttribute('data-slot', 'breadcrumb-list')
    expect(list).toHaveClass(
      'flex',
      'flex-wrap',
      'items-center',
      'gap-[0.5rem]',
      'break-words',
      'font-medium',
      'text-[0.75rem]',
      'leading-[150%]',
      'uppercase',
    )
  })

  it('should render breadcrumb items and links correctly', () => {
    render(<Breadcrumb items={items} />)
    const itemsEls = screen.getAllByRole('listitem')
    expect(itemsEls[0]).toHaveAttribute('data-slot', 'breadcrumb-item')
    expect(itemsEls[0]).toHaveClass('inline-flex', 'items-center', 'text-white')
    expect(screen.getByText('Home')).toHaveAttribute('href', '/')
  })

  it('should render separator with default icon', () => {
    render(<Breadcrumb items={items} />)
    const separators = screen.getAllByTestId('breadcrumb-separator')
    expect(separators[0]).toHaveAttribute('data-slot', 'breadcrumb-separator')
    expect(separators[0].querySelector('svg')).toBeInTheDocument()
    expect(separators[0]).toHaveClass('[&>svg]:size-[1rem]', 'text-white')
  })

  it('should render page element for last item', () => {
    render(<Breadcrumb items={items} />)
    const page = screen.getByText('Shoes')
    expect(page).toHaveAttribute('data-slot', 'breadcrumb-page')
    expect(page).toHaveAttribute('role', 'link')
    expect(page).toHaveAttribute('aria-disabled', 'true')
    expect(page).toHaveAttribute('aria-current', 'page')
    expect(page).toHaveClass('text-primary')
  })

  it('should render breadcrumb with default BreadcrumbLink', () => {
    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Shoes')).toBeInTheDocument()

    const defaultLink = screen.getByText('Home')
    expect(defaultLink.tagName).toBe('A')
  })

  it('should render breadcrumb using custom linkComponent', () => {
    render(<Breadcrumb items={items} linkComponent={FakeLink} />)

    const customLink = screen.getAllByTestId('fake-link')
    expect(customLink).toHaveLength(2)
    expect(customLink[0]).toHaveAttribute('href', '/')
    expect(customLink[1]).toHaveAttribute('href', '/products')

    const currentPage = screen.getByText('Shoes')
    expect(currentPage).toBeInTheDocument()
    expect(currentPage.tagName).toBe('SPAN')
  })
})
