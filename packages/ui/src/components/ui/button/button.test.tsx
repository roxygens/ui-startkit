import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './button'

const Icon = () => <svg data-testid="icon" />

describe('Button', () => {
  it('should render correctly with children', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should apply default variant (primary) and size (sm) classes', () => {
    render(<Button>Default Button</Button>)
    const button = screen.getByRole('button', { name: /default button/i })

    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('px-[16px]')
  })

  it.each([
    ['primary', 'bg-primary'],
    ['secondary', 'bg-secondary'],
    ['tertiary', 'bg-tertiary'],
    ['link', 'text-link-foreground'],
  ])('should apply the correct class for variant "%s"', (variant, expectedClass) => {
    render(<Button variant={variant as 'primary'}>{variant}</Button>)
    const button = screen.getByRole('button', { name: new RegExp(variant, 'i') })
    expect(button).toHaveClass(expectedClass)
  })

  it.each([
    ['sm', 'py-[8px]'],
    ['md', 'py-[10px]'],
    ['lg', 'py-[12px]'],
    ['xl', 'py-[16px]'],
  ])('should apply the correct class for size "%s"', (size, expectedClass) => {
    render(<Button size={size as any}>{size}</Button>)
    const button = screen.getByRole('button', { name: new RegExp(size, 'i') })
    expect(button).toHaveClass(expectedClass)
  })

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Cannot click</Button>)
    const button = screen.getByRole('button', { name: /cannot click/i })
    expect(button).toBeDisabled()
  })

  it('should render as a link when asChild is true and child is an anchor tag', () => {
    render(
      <Button asChild>
        <a href="/home">Go Home</a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: /go home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/home')

    expect(link).not.toHaveClass('bg-primary')

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  describe('with icons', () => {
    it('should render as an icon button without children text', () => {
      render(
        <Button isIconButton icon={<Icon />}>
          Text should not be visible
        </Button>,
      )

      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.queryByText(/text should not be visible/i)).not.toBeInTheDocument()
    })

    it('should render an icon at the start', () => {
      render(
        <Button icon={<Icon />} iconPosition="start">
          Icon Start
        </Button>,
      )

      const button = screen.getByRole('button', { name: /icon start/i })
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(button.firstChild).toBe(screen.getByTestId('icon'))
    })

    it('should render an icon at the end', () => {
      render(
        <Button icon={<Icon />} iconPosition="end">
          Icon End
        </Button>,
      )

      const button = screen.getByRole('button', { name: /icon end/i })
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(button.lastChild).toBe(screen.getByTestId('icon'))
    })

    it('should render icons on both sides', () => {
      render(
        <Button icon={<Icon />} iconPosition="both">
          Icon Both
        </Button>,
      )

      const icons = screen.getAllByTestId('icon')
      expect(icons).toHaveLength(2)

      const button = screen.getByRole('button', { name: /icon both/i })
      expect(button.textContent).toBe('Icon Both')
    })
  })
})
