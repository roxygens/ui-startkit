'use client'
import { useState, useEffect, type PropsWithChildren, createContext, useContext } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

type CardContextType = {
  isNavOptionsOpen: boolean
  setIsNavOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
}

const CardContext = createContext<CardContextType | undefined>(undefined)

const useCardContext = () => {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCardContext deve ser usado dentro de CardProvider')
  }
  return context
}

type Props = {
  onClick?: () => void
  className?: string
  disabled?: boolean
} & PropsWithChildren

export function Card(props: Props) {
  const [isNavOptionsOpen, setIsNavOptionsOpen] = useState(false)

  const { children, onClick, className, disabled } = props

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsNavOptionsOpen(false)
    }
  }

  function handleCloseNavOptions() {
    setIsNavOptionsOpen(false)
  }

  return (
    <CardContext.Provider value={{ isNavOptionsOpen, setIsNavOptionsOpen, disabled }}>
      <div
        data-testid="card-container"
        onBlur={handleBlur}
        onMouseLeave={handleCloseNavOptions}
        onClick={onClick}
        className={cn('relative group/card', className)}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
}

type CardContentProps = { className?: string } & PropsWithChildren

Card.Content = function CardContent({ children, className }: CardContentProps) {
  const { isNavOptionsOpen } = useCardContext()
  return (
    <div
      className={cn(
        'cursor-pointer bg-[var(--card)] rounded-[.5rem] card-shadow p-[1rem] ',
        'flex flex-col hover:bg-[var(--card-hover)] group-hover/card:bg-[var(--card-hover)] gap-[.5rem]  group-hover/card:rounded-b-[0px] hover:border-t-[.13rem]  group-hover/card:border-t-[var(--primary)] rounded-[.5rem] hover:border-x-[.13rem] group-hover/card:border-x-[var(--primary)]  group-hover/card:border-b-0',
        {
          'bg-[var(--card-hover)]': isNavOptionsOpen,
        },
        className,
      )}
    >
      {children}
    </div>
  )
} as React.FC<CardContentProps>

Card.Content.displayName = 'Card.Content'

type Image = {
  url: string
  alt: string
}

type CardImagesProps = {
  images: Image[]
  className?: string
  hoverInterval?: number
}

Card.Images = function CardImages({ images, className, hoverInterval = 1000 }: CardImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!isHovering || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= images.length - 1) return prev
        return prev + 1
      })
    }, hoverInterval)

    return () => clearInterval(interval)
  }, [isHovering, images.length, hoverInterval])

  const handleMouseEnter = () => {
    if (images.length > 1) {
      setIsHovering(true)
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev))
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setCurrentIndex(0)
  }

  const currentImage = images[currentIndex]

  return (
    <div
      className={cn('relative h-auto mb-[16px]', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="h-[96px] mx-auto object-cover transition-opacity duration-300 ease-in-out"
        src={currentImage.url}
        alt={currentImage.alt}
        loading="lazy"
      />
    </div>
  )
} as React.FC<CardImagesProps>

Card.Images.displayName = 'Card.Images'

type Option = {
  icon: React.ReactNode
  title: string
  onClick: () => void
}

type CardFooterButtonProps = {
  options?: Option[]
  onClick?: () => void
  className?: string
} & PropsWithChildren

Card.FooterButton = function CardFooterButton({
  children,
  options,
  onClick,
  className,
}: CardFooterButtonProps) {
  const { isNavOptionsOpen, setIsNavOptionsOpen, disabled } = useCardContext()

  function handleOpenNavOptions(e: React.MouseEvent) {
    e.stopPropagation()
    setIsNavOptionsOpen((state) => !state)
  }

  function handleClickMenuItem(e: React.MouseEvent, onClick: () => void) {
    e.stopPropagation()
    onClick()
  }

  function handleClickButton(e: React.MouseEvent) {
    e.stopPropagation()
    if (onClick) {
      onClick()
    }
  }

  return (
    <>
      <footer
        className={cn(
          ` group/footer-button 
            absolute left-0  right-0 
            flex justify-between items-stretch 
            font-inter font-semibold text-xs leading-[1.13rem] 
            transform-gpu transition-transform duration-300 ease-in-out-translate-y-0
            pointer-events-none opacity-0
            group-hover/card:pointer-events-auto group-hover/card:opacity-100
            group-hover/card:border-[var(--primary)]  group-hover/card:border-x-[.13rem]  group-hover/card:border-b-[.13rem]  group-hover/card:rounded-x-[0.35rem] group-hover/card:rounded-b-[0.35rem]
            `,
          className,
          {
            'bg-[var(--disabled)] text-[var(--disabled-foreground)]': disabled,
          },
        )}
      >
        <button
          onClick={handleClickButton}
          className={cn(
            'cursor-pointer h-[2.7rem] flex w-full items-center justify-center py-[1rem] bg-[var(--primary)]/100  hover:bg-[var(--primary)]/70  rounded-bl-[0.2rem]',
            {
              'rounded-br-[0.35rem]': !options?.length,
            },
            className,
          )}
          disabled={disabled}
        >
          {children}
        </button>

        {options?.length && (
          <button
            data-testid="options-button"
            onClick={handleOpenNavOptions}
            className={cn(
              'cursor-pointer px-[.38rem] border-l border-black/20 bg-[var(--primary)]/100  hover:bg-[var(--primary)]/70  rounded-br-[0.2rem]',
              className,
            )}
            style={{ borderColor: 'currentColor' }}
            aria-label="Abrir opções do card"
            disabled={disabled}
          >
            <EllipsisVertical />
          </button>
        )}
      </footer>

      <nav
        aria-label="Menu de opções"
        className={cn(
          `absolute w-full left-[0] bottom-0 bg-[var(--card)] 
          font-inter not-italic font-semibold text-[12px] leading-[1.13rem] text-center 
          text-white rounded-t-[.5rem] overflow-hidden`,
          'transform-gpu transition-transform duration-200 ease-out',
          isNavOptionsOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        {options?.map((option) => (
          <button
            key={option.title}
            onClick={(e) => handleClickMenuItem(e, option.onClick)}
            className="cursor-pointer w-full px-[20px] py-[10px] hover:bg-[var(--menu-card-background-hover)] flex flex-row items-center gap-[10px] border-b border-[var(--secondary-border)] last:border-b-0"
          >
            {option.icon} <p>{option.title}</p>
          </button>
        ))}
      </nav>
    </>
  )
} as React.FC<CardFooterButtonProps>

Card.FooterButton.displayName = 'Card.FooterButton'

export function CardMini(props: Props) {
  const { children, onClick, className, disabled } = props

  return (
    <CardContext.Provider
      value={{ disabled, isNavOptionsOpen: false, setIsNavOptionsOpen: () => {} }}
    >
      <Card
        data-testid="card-mini-container"
        onClick={onClick}
        className={cn(
          '!border-b-0 !border-x-0 !border-t-[3px] !border-t-[var(--primary)]',
          className,
        )}
      >
        {children}
      </Card>
    </CardContext.Provider>
  )
}

CardMini.Content = function CardMiniContent({ children, className }: CardContentProps) {
  return (
    <Card.Content
      className={cn('!border-0 !rounded-t-[0] rounded-b-[.35rem] text-center', className)}
    >
      {children}
    </Card.Content>
  )
} as React.FC<CardContentProps>

CardMini.Content.displayName = 'CardMini.Content'

export function CardList(props: Props) {
  const [isNavOptionsOpen, setIsNavOptionsOpen] = useState(false)

  const { children, onClick, className, disabled } = props

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsNavOptionsOpen(false)
    }
  }

  function handleCloseNavOptions() {
    setIsNavOptionsOpen(false)
  }

  return (
    <CardContext.Provider value={{ disabled, isNavOptionsOpen, setIsNavOptionsOpen }}>
      <div
        data-testid="card-list-container"
        onBlur={handleBlur}
        onMouseLeave={handleCloseNavOptions}
        onClick={onClick}
        className={cn('relative group/card', className)}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
}

CardList.Content = function CardListContent({ children, className }: CardContentProps) {
  return (
    <Card.Content
      className={cn(
        'flex-row justify-between items-center group-hover/card:rounded-b-[.5rem] hover:border-b-[.13rem] group-hover/card:border-b-[var(--primary)] w-[57rem] px-[2rem] gap-0',
        className,
      )}
    >
      {children}
    </Card.Content>
  )
} as React.FC<CardContentProps>

CardList.Content.displayName = 'CardList.Content'

type CardListBoxProps = {} & PropsWithChildren

CardList.Box = function CardListBox({ children }: CardListBoxProps) {
  return <div className="flex flex-col gap-[.5rem]">{children}</div>
} as React.FC<CardListBoxProps>

CardList.Box.displayName = 'CardList.Box'

CardList.Button = function CardListButton({
  children,
  onClick,
  options,
  className,
}: CardFooterButtonProps) {
  const { isNavOptionsOpen, setIsNavOptionsOpen, disabled } = useCardContext()

  function handleOpenNavOptions() {
    setIsNavOptionsOpen((state) => !state)
  }

  function handleClickMenuItem(e: React.MouseEvent, onClick: () => void) {
    e.stopPropagation()
    onClick()
  }

  return (
    <div
      className={cn(
        ` relative
          text-[var(--primary-foreground)] hidden cursor-pointer 
          group-hover/card:flex justify-between items-stretch 
          font-inter font-semibold text-xs leading-[1.13rem] 
        `,
        className,
        {
          'bg-[var(--disabled)] text-[var(--disabled-foreground)]': disabled,
          '!rounded-t-[0]': isNavOptionsOpen,
        },
      )}
    >
      <button
        className={cn(
          'cursor-pointer rounded-l-[0.35rem] flex w-full items-center justify-center px-[.66rem] h-[2.7rem] bg-[var(--primary)]/100  hover:bg-[var(--primary)]/70',
          {
            '!rounded-t-[0]': isNavOptionsOpen,
          },
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>

      {options?.length && (
        <button
          data-testid="options-button"
          onClick={handleOpenNavOptions}
          className={cn(
            'cursor-pointer px-[.4rem] border-l border-black/20 rounded-r-[0.35rem] bg-[var(--primary)]/100  hover:bg-[var(--primary)]/70',
            {
              '!rounded-t-[0]': isNavOptionsOpen,
            },
          )}
          style={{ borderColor: 'currentColor' }}
          aria-label="Abrir opções do card"
          disabled={disabled}
        >
          <EllipsisVertical />
        </button>
      )}

      <nav
        aria-label="Menu de opções"
        className={cn(
          `absolute w-full left-[0] bottom-[100%] bg-[var(--card)] 
          font-inter not-italic font-semibold text-[12px] leading-[18px] text-center 
          text-white rounded-t-[8px] overflow-hidden`,
          'transform-gpu transition-transform duration-200 ease-out',
          isNavOptionsOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        {options?.map((option) => (
          <button
            key={option.title}
            onClick={(e) => handleClickMenuItem(e, option.onClick)}
            className="cursor-pointer w-full px-[20px] py-[10px] hover:bg-[var(--menu-card-background-hover)] flex flex-row items-center gap-[10px] border-b border-[var(--secondary-border)] last:border-b-0"
          >
            {option.icon} <p>{option.title}</p>
          </button>
        ))}
      </nav>
    </div>
  )
} as React.FC<CardFooterButtonProps>

CardList.Button.displayName = 'CardList.Button'
