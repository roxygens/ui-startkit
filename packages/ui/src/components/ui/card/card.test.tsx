import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Card } from '.'

describe('Card', () => {
  describe('Card (Provider)', () => {
    it('should render its children correctly', () => {
      render(
        <Card>
          <div>Card Content</div>
        </Card>,
      )
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply a custom className', () => {
      const { container } = render(<Card className="my-custom-class" />)
      expect(container.firstChild).toHaveClass('my-custom-class')
    })

    it('should call the onClick handler when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Card onClick={handleClick} />)

      const cardElement = screen.getByTestId('card-container')
      await user.click(cardElement)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should toggle the background color when options are opened and closed', async () => {
      const user = userEvent.setup()
      render(
        <Card>
          <Card.FooterButton options={[{ title: 'Opção 1', icon: <i />, onClick: vi.fn() }]}>
            Ação
          </Card.FooterButton>
        </Card>,
      )

      const cardContainer = screen.getByTestId('card-container')
      const optionsButton = screen.getByTestId('options-button')

      expect(cardContainer).not.toHaveClass('bg-[#36393F]')

      await user.click(optionsButton)

      await waitFor(() => {
        expect(cardContainer).toHaveClass('bg-[#36393F]')
      })

      await user.click(optionsButton)

      await waitFor(() => {
        expect(cardContainer).not.toHaveClass('bg-[#36393F]')
      })
    })

    it('should close the navigation options on the onBlur event', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <Card>
            <Card.FooterButton options={[{ title: 'Option 1', icon: <i />, onClick: vi.fn() }]}>
              Action
            </Card.FooterButton>
          </Card>
          <button>External Button</button>
        </div>,
      )

      const cardContainer = screen.getByTestId('card-container')
      const optionsButton = screen.getByRole('button', { name: /abrir opções/i })

      await user.click(optionsButton)
      expect(cardContainer).toHaveClass('bg-[#36393F]')

      await user.tab()
      await user.tab()
      await user.tab()

      expect(cardContainer).not.toHaveClass('bg-[#36393F]')
    })
  })

  describe('Card.Header', () => {
    it('should render its children', () => {
      render(<Card.Header>Header Title</Card.Header>)
      expect(screen.getByText('Header Title')).toBeInTheDocument()
    })
  })

  describe('Card.HeaderImages', () => {
    const primaryImage = { url: 'primary.jpg', alt: 'Primary Image' }
    const hoverImage = { url: 'hover.jpg', alt: 'Hover Image' }

    it('should render only the primary image if it is the only one provided', () => {
      render(<Card.HeaderImages images={[primaryImage]} />)
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(1)
      expect(images[0]).toHaveAttribute('src', primaryImage.url)
      expect(images[0]).toHaveAttribute('alt', primaryImage.alt)
    })

    it('should render both images when two are provided', () => {
      render(<Card.HeaderImages images={[primaryImage, hoverImage]} />)
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(2)
      expect(screen.getByAltText(primaryImage.alt)).toBeInTheDocument()
      expect(screen.getByAltText(hoverImage.alt)).toBeInTheDocument()
    })

    it('should apply the correct transition class when a hover image is present', () => {
      render(<Card.HeaderImages images={[primaryImage, hoverImage]} />)
      const primaryImgElement = screen.getByAltText(primaryImage.alt)
      expect(primaryImgElement).toHaveClass('group-hover/header:opacity-0')
    })

    it('should apply a custom className', () => {
      const { container } = render(
        <Card.HeaderImages images={[primaryImage]} className="custom-images" />,
      )
      expect(container.firstChild).toHaveClass('custom-images')
    })
  })

  describe('Card.Content', () => {
    it('should render its children', () => {
      render(<Card.Content>Main content</Card.Content>)
      expect(screen.getByText('Main content')).toBeInTheDocument()
    })

    it('should apply a custom className', () => {
      const { container } = render(<Card.Content className="custom-content">Content</Card.Content>)
      expect(container.firstChild).toHaveClass('custom-content')
    })
  })

  describe('Card.FooterButton', () => {
    it('should render the main button with its child content', () => {
      render(
        <Card>
          <Card.FooterButton>Buy Now</Card.FooterButton>
        </Card>,
      )
      expect(screen.getByRole('button', { name: 'Buy Now' })).toBeInTheDocument()
    })

    it('should call the main button onClick handler and stop event propagation', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      const handleCardClick = vi.fn()
      render(
        <Card onClick={handleCardClick}>
          <Card.FooterButton onClick={handleClick}>Action</Card.FooterButton>
        </Card>,
      )

      await user.click(screen.getByRole('button', { name: 'Action' }))
      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(handleCardClick).not.toHaveBeenCalled()
    })

    it('should not render the options button if no options are provided', () => {
      render(
        <Card>
          <Card.FooterButton>Action</Card.FooterButton>
        </Card>,
      )
      const optionsButton = screen.queryByRole('button', { name: /open options/i })
      expect(optionsButton).not.toBeInTheDocument()
    })

    it('should toggle the navigation menu visibility when the options button is clicked', async () => {
      const user = userEvent.setup()
      const options = [{ title: 'Option 1', icon: <i />, onClick: vi.fn() }]
      render(
        <Card>
          <Card.FooterButton options={options}>Action</Card.FooterButton>
        </Card>,
      )

      const optionsButton = screen.getByRole('button', { name: 'Abrir opções do card' })
      const navMenu = screen.getByRole('navigation', { name: 'Menu de opções' })

      expect(navMenu).toHaveClass('opacity-0')

      await user.click(optionsButton)
      expect(navMenu).toHaveClass('opacity-100')

      await user.click(optionsButton)
      expect(navMenu).toHaveClass('opacity-0')
    })

    it('should call a menu item onClick handler and stop event propagation', async () => {
      const user = userEvent.setup()
      const handleItemClick = vi.fn()
      const handleCardClick = vi.fn()
      const options = [{ title: 'Delete', icon: <i>Icon</i>, onClick: handleItemClick }]
      render(
        <Card onClick={handleCardClick}>
          <Card.FooterButton options={options}>Action</Card.FooterButton>
        </Card>,
      )

      const optionsButton = screen.getByRole('button', { name: 'Abrir opções do card' })

      await user.click(optionsButton)

      const menuItem = screen.getByRole('button', { name: /Delete/i })
      await user.click(menuItem)

      expect(handleItemClick).toHaveBeenCalledTimes(1)
      expect(handleCardClick).not.toHaveBeenCalled()
    })
  })

  describe('useCardContext Hook', () => {
    it('should throw an error when used outside of a CardProvider', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

      function ComponentOutsideContext() {
        return <Card.FooterButton>Test</Card.FooterButton>
      }

      expect(() => render(<ComponentOutsideContext />)).toThrow(
        'useCardContext deve ser usado dentro de CardProvider',
      )

      spy.mockRestore()
    })
  })
})
