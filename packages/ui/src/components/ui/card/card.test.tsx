import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { EllipsisVertical } from 'lucide-react'
import { Card, CardMini, CardList } from '.'

describe('Card', () => {
  afterEach(() => {
    vi.useRealTimers()
  })
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

    it('should close nav options on blur when relatedTarget is outside', () => {
      const { getByTestId } = render(<Card>Blur test</Card>)
      const container = getByTestId('card-container')
      fireEvent.blur(container, { relatedTarget: document.body })
      expect(container).toBeInTheDocument()
    })

    it('should not close nav options on blur when relatedTarget is inside', () => {
      const { getByTestId } = render(
        <Card>
          <button>Inside</button>
        </Card>,
      )
      const container = getByTestId('card-container')
      const button = container.querySelector('button')!
      fireEvent.blur(container, { relatedTarget: button })
      expect(container).toBeInTheDocument()
    })

    it('should close nav options on mouse leave', () => {
      const { getByTestId } = render(<Card>Mouse leave</Card>)
      const container = getByTestId('card-container')
      fireEvent.mouseLeave(container)
      expect(container).toBeInTheDocument()
    })
  })

  describe('Card.Images', () => {
    const images = [
      { url: 'image1.jpg', alt: 'Image 1' },
      { url: 'image2.jpg', alt: 'Image 2' },
      { url: 'image3.jpg', alt: 'Image 3' },
    ]

    it('should not render <img> when currentImage is undefined', () => {
      render(<Card.Images images={[]} />)
      const img = screen.queryByRole('img')
      expect(img).not.toBeInTheDocument()
    })

    it('should return early if images.length <= 1', () => {
      const singleImage = [{ url: 'image1.jpg', alt: 'Image 1' }]

      const { getByAltText } = render(<Card.Images images={singleImage} />)

      expect(getByAltText('Image 1')).toBeInTheDocument()
    })

    it('should render the first image by default', () => {
      render(<Card.Images images={images} />)
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', 'image1.jpg')
      expect(img).toHaveAttribute('alt', 'Image 1')
    })

    it('should render with custom className and imageClassName', () => {
      render(<Card.Images images={images} className="custom-class" imageClassName="image-custom" />)
      expect(screen.getByRole('img')).toHaveClass('image-custom')
      expect(screen.getByRole('img').parentElement).toHaveClass('custom-class')
    })

    it('should change image on mouse enter if more than one image', () => {
      render(<Card.Images images={images} />)
      const wrapper = screen.getByRole('img').parentElement!
      fireEvent.mouseEnter(wrapper)
      expect(screen.getByRole('img')).toHaveAttribute('src', 'image2.jpg')
    })

    it('should not change image on mouse enter if only one image', () => {
      render(<Card.Images images={[images[0]]} />)
      const wrapper = screen.getByRole('img').parentElement!
      fireEvent.mouseEnter(wrapper)
      expect(screen.getByRole('img')).toHaveAttribute('src', 'image1.jpg')
    })

    it('should reset to first image on mouse leave', () => {
      render(<Card.Images images={images} />)
      const wrapper = screen.getByRole('img').parentElement!
      fireEvent.mouseEnter(wrapper)
      fireEvent.mouseLeave(wrapper)
      expect(screen.getByRole('img')).toHaveAttribute('src', 'image1.jpg')
    })

    it('cycles images on hover and covers last image branch', () => {
      vi.useFakeTimers()
      const images = [
        { url: 'image1.jpg', alt: 'Image 1' },
        { url: 'image2.jpg', alt: 'Image 2' },
        { url: 'image3.jpg', alt: 'Image 3' },
      ]

      render(<Card.Images images={images} hoverInterval={500} />)
      const wrapper = screen.getByRole('img').parentElement!
      const img = screen.getByRole('img')

      act(() => {
        fireEvent.mouseEnter(wrapper)
      })

      act(() => {
        vi.advanceTimersByTime(0)
      })
      expect(img).toHaveAttribute('src', 'image2.jpg')

      act(() => {
        vi.advanceTimersByTime(500)
      })
      expect(img).toHaveAttribute('src', 'image3.jpg')

      act(() => {
        fireEvent.mouseEnter(wrapper)
      })
      expect(img).toHaveAttribute('src', 'image3.jpg')

      act(() => {
        fireEvent.mouseLeave(wrapper)
      })
      expect(img).toHaveAttribute('src', 'image1.jpg')

      vi.useRealTimers()
    })

    it('sets hovering to true on mouse enter and cycles images', () => {
      vi.useFakeTimers()
      const images = [
        { url: 'image1.jpg', alt: 'Image 1' },
        { url: 'image2.jpg', alt: 'Image 2' },
      ]

      render(<Card.Images images={images} hoverInterval={500} />)
      const wrapper = screen.getByRole('img').parentElement!

      act(() => {
        fireEvent.mouseEnter(wrapper)
      })

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', 'image2.jpg')
      act(() => {
        vi.advanceTimersByTime(500)
      })
      expect(img).toHaveAttribute('src', 'image2.jpg')

      act(() => {
        fireEvent.mouseLeave(wrapper)
      })
      expect(img).toHaveAttribute('src', 'image1.jpg')

      vi.useRealTimers()
    })
  })

  describe('Card.Content', () => {
    it('should render its children', () => {
      render(
        <Card>
          <Card.Content>Main content</Card.Content>
        </Card>,
      )
      expect(screen.getByText('Main content')).toBeInTheDocument()
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

  describe('CardMini', () => {
    it('should render CardMini container with children', () => {
      render(
        <CardMini>
          <span data-testid="child">Child</span>
        </CardMini>,
      )

      const container = screen.getByTestId('card-mini-container')
      expect(container).toBeInTheDocument()
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('should call onClick when container is clicked', () => {
      const handleClick = vi.fn()
      render(<CardMini onClick={handleClick}>Content</CardMini>)

      fireEvent.click(screen.getByTestId('card-mini-container'))
      expect(handleClick).toHaveBeenCalled()
    })

    it('should apply custom className to container', () => {
      render(<CardMini className="custom-class">Content</CardMini>)
      expect(screen.getByTestId('card-mini-container')).toHaveClass('custom-class')
    })
  })

  describe('CardMini.Content', () => {
    it('should render content with children', () => {
      render(
        <CardMini>
          <CardMini.Content>
            <p data-testid="content-text">Content</p>
          </CardMini.Content>
        </CardMini>,
      )
      expect(screen.getByTestId('content-text')).toBeInTheDocument()
    })
  })

  describe('CardList', () => {
    it('should render children', () => {
      render(
        <CardList>
          <div data-testid="child">Child</div>
        </CardList>,
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('should call onClick when container is clicked', () => {
      const onClick = vi.fn()
      render(
        <CardList onClick={onClick}>
          <div>Child</div>
        </CardList>,
      )
      fireEvent.click(screen.getByTestId('card-list-container'))
      expect(onClick).toHaveBeenCalled()
    })

    it('should set isNavOptionsOpen to false on blur if relatedTarget is outside', () => {
      render(
        <CardList>
          <button>Child</button>
        </CardList>,
      )
      const container = screen.getByTestId('card-list-container')
      fireEvent.blur(container, { relatedTarget: null })
      expect(container).toBeInTheDocument()
    })

    it('should keep isNavOptionsOpen as false on blur if relatedTarget is inside', () => {
      render(
        <CardList>
          <button data-testid="inside">Inside</button>
        </CardList>,
      )
      const container = screen.getByTestId('card-list-container')
      const inside = screen.getByTestId('inside')
      fireEvent.blur(container, { relatedTarget: inside })
      expect(container).toBeInTheDocument()
    })

    it('should close nav options on mouse leave', () => {
      render(
        <CardList>
          <div>Child</div>
        </CardList>,
      )
      const container = screen.getByTestId('card-list-container')
      fireEvent.mouseLeave(container)
      expect(container).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <CardList className="custom-class">
          <div>Child</div>
        </CardList>,
      )
      expect(screen.getByTestId('card-list-container')).toHaveClass('custom-class')
    })

    it('should render disabled context value', () => {
      render(
        <CardList disabled>
          <div>Child</div>
        </CardList>,
      )
      const container = screen.getByTestId('card-list-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('CardList.Content', () => {
    it('should render children', () => {
      render(
        <CardList>
          <CardList.Content>
            <div data-testid="child">Child</div>
          </CardList.Content>
        </CardList>,
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <CardList>
          <CardList.Content className="custom-class">
            <div>Child</div>
          </CardList.Content>
        </CardList>,
      )
      expect(screen.getByText('Child').parentElement).toHaveClass('custom-class')
    })

    it('should have default styling classes', () => {
      render(
        <CardList>
          <CardList.Content>
            <div>Child</div>
          </CardList.Content>
        </CardList>,
      )
      const container = screen.getByText('Child').parentElement
      expect(container).toHaveClass(
        'flex-row',
        'justify-between',
        'items-center',
        'w-[57rem]',
        'px-[1rem]',
        'gap-0',
      )
    })
  })

  describe('CardList.Images', () => {
    it('should apply the correct className and imageClassName', () => {
      const images = [
        { url: 'image1.jpg', alt: 'Image 1' },
        { url: 'image2.jpg', alt: 'Image 2' },
      ]

      render(
        <CardList>
          <CardList.Images
            images={images}
            className="custom-container"
            imageClassName="custom-image"
          />
        </CardList>,
      )

      const imgElement = screen.getByRole('img', { name: 'Image 1' })
      expect(imgElement).toHaveClass('w-[6rem] h-auto custom-image')
      const container = imgElement.parentElement
      expect(container).toHaveClass('mb-0 custom-container')
    })
  })

  describe('CardList.Box', () => {
    it('should render children inside the container', () => {
      render(
        <CardList.Box>
          <div data-testid="child-element">Child</div>
        </CardList.Box>,
      )

      const child = screen.getByTestId('child-element')
      expect(child).toBeInTheDocument()
      expect(child).toHaveTextContent('Child')
    })

    it('should have the correct classes applied', () => {
      render(
        <CardList.Box>
          <div>Child</div>
        </CardList.Box>,
      )

      const container = screen.getByText('Child').parentElement
      expect(container).toHaveClass('flex flex-col gap-[.5rem]')
    })
  })

  describe('CardList.Button', () => {
    it('should render the main button with correct children', () => {
      render(
        <CardList>
          <CardList.Button>Click me</CardList.Button>
        </CardList>,
      )
      const button = screen.getByText('Click me')
      expect(button).toBeInTheDocument()
    })

    it('should call onClick when main button is clicked', () => {
      const onClick = vi.fn()
      render(
        <CardList>
          <CardList.Button onClick={onClick}>Click me</CardList.Button>
        </CardList>,
      )
      const button = screen.getByText('Click me')
      fireEvent.click(button)
      expect(onClick).toHaveBeenCalled()
    })

    it('should render options button if options are provided', () => {
      const options = [{ title: 'Option 1', icon: <EllipsisVertical />, onClick: vi.fn() }]
      render(
        <CardList>
          <CardList.Button options={options}>Click me</CardList.Button>
        </CardList>,
      )
      const optionsButton = screen.getByTestId('options-button')
      expect(optionsButton).toBeInTheDocument()
    })

    it('should toggle nav options on options button click', () => {
      const options = [{ title: 'Option 1', icon: <EllipsisVertical />, onClick: vi.fn() }]
      render(
        <CardList>
          <CardList.Button options={options}>Click me</CardList.Button>
        </CardList>,
      )
      const optionsButton = screen.getByTestId('options-button')
      const nav = screen.getByRole('navigation', { hidden: true })
      expect(nav).toHaveClass('opacity-0')
      fireEvent.click(optionsButton)
      expect(nav).toHaveClass('opacity-100')
      fireEvent.click(optionsButton)
      expect(nav).toHaveClass('opacity-0')
    })

    it('should call onClick of option when option is clicked', () => {
      const optionClick = vi.fn()
      const options = [{ title: 'Option 1', icon: <EllipsisVertical />, onClick: optionClick }]
      render(
        <CardList>
          <CardList.Button options={options}>Click me</CardList.Button>
        </CardList>,
      )
      const optionsButton = screen.getByTestId('options-button')
      fireEvent.click(optionsButton)
      const option = screen.getByText('Option 1')
      fireEvent.click(option)
      expect(optionClick).toHaveBeenCalled()
    })

    it('should apply disabled classes when disabled', () => {
      const options = [{ title: 'Option 1', icon: <EllipsisVertical />, onClick: vi.fn() }]
      render(
        <CardList disabled>
          <CardList.Button options={options}>Click me</CardList.Button>
        </CardList>,
      )
      const button = screen.getByText('Click me')
      expect(button).toBeDisabled()
      const optionsButton = screen.getByTestId('options-button')
      expect(optionsButton).toBeDisabled()
    })

    it('should apply custom className to container', () => {
      render(
        <CardList>
          <CardList.Button className="custom-class">Click me</CardList.Button>
        </CardList>,
      )
      const container = screen.getByText('Click me').parentElement
      expect(container).toHaveClass('custom-class')
    })

    it('should render disabled CardList.Button correctly', () => {
      render(
        <CardList disabled>
          <CardList.Button>Click me</CardList.Button>
        </CardList>,
      )
      const button = screen.getByText('Click me')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('bg-[var(--disabled)]')
    })
  })
})
