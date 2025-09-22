import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Avatar } from '.'

vi.mock('@radix-ui/react-avatar', async () => {
  const actual =
    await vi.importActual<typeof import('@radix-ui/react-avatar')>('@radix-ui/react-avatar')

  return {
    ...actual,
    Image: (props: React.ComponentProps<typeof AvatarPrimitive.Image>) => <img {...props} />,
  }
})
describe('Avatar', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  it('should render with default size (sm)', () => {
    render(<Avatar fallback="AB" />)
    const avatar = screen.getByText('AB').closest('[data-slot="avatar"]')
    expect(avatar).toHaveClass('size-[2rem]')
    expect(avatar).toHaveClass('text-sm')
  })

  it('should render all size variants with correct classes', () => {
    sizes.forEach((size) => {
      render(<Avatar fallback={size} size={size} />)
      const avatar = screen.getByText(size).closest('[data-slot="avatar"]')
      switch (size) {
        case 'xs':
          expect(avatar).toHaveClass('size-[1.5rem]', 'text-xs')
          break
        case 'sm':
          expect(avatar).toHaveClass('size-[2rem]', 'text-sm')
          break
        case 'md':
          expect(avatar).toHaveClass('size-[2.5rem]', 'text-base')
          break
        case 'lg':
          expect(avatar).toHaveClass('size-[3rem]', 'text-lg')
          break
        case 'xl':
          expect(avatar).toHaveClass('size-[3.5rem]', 'text-xl')
          break
        case '2xl':
          expect(avatar).toHaveClass('size-[4rem]', 'text-2xl')
          break
      }
    })
  })

  it('should render image when provided', () => {
    render(<Avatar image={{ src: '/images/avatar.jpg', alt: 'Test Image' }} fallback="FB" />)
    const container = screen.getByText('FB').closest('[data-slot="avatar"]')
    const img = container?.querySelector('[data-slot="avatar-image"]') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/images/avatar.jpg')
    expect(img).toHaveAttribute('alt', 'Test Image')
  })

  it('should render fallback when no image is provided', () => {
    render(<Avatar fallback="XY" />)
    expect(screen.getByText('XY')).toBeInTheDocument()
  })
})
