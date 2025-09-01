'use client'
import { useState, type PropsWithChildren, createContext, useContext } from 'react'
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
        className={cn(
          'cursor-pointer bg-[var(--card)] rounded-[8px] card-shadow group/card',
          'flex flex-col relative hover:border-[2px] hover:border-[var(--primary)] rounded-[8px] group/footer-buttons',
          {
            'bg-[#36393F]': isNavOptionsOpen,
          },
          className,
        )}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
}

type CardHeaderProps = { className?: string } & PropsWithChildren

Card.Header = function CardHeader({ children, className }: CardHeaderProps) {
  return <header className={cn('group/header px-[16px] pt-[16px]', className)}>{children}</header>
} as React.FC<CardHeaderProps>

type Image = {
  url: string
  alt: string
}

type CardHeaderImagesProps = {
  images: Image[]
  className?: string
}

Card.Header.displayName = 'Card.Header'

Card.HeaderImages = function CardHeaderImages({ images, className }: CardHeaderImagesProps) {
  const [primaryImage, hoverImage] = images

  return (
    <div className={cn('relative h-auto mb-[50px] group-hover/card:mb-[16px]', className)}>
      <img
        className={cn('h-[96px] mx-auto', {
          'transition-opacity duration-300 group-hover/header:opacity-0': hoverImage,
        })}
        src={primaryImage.url}
        alt={primaryImage.alt}
      />

      {hoverImage && (
        <img
          className="
                mx-auto
                absolute inset-0 h-[96px] object-cover 
                opacity-0 group-hover/header:opacity-100 
                transition-opacity duration-300 ease-in-out
              "
          src={hoverImage.url}
          alt={hoverImage.alt}
        />
      )}
    </div>
  )
} as React.FC<CardHeaderImagesProps>

Card.HeaderImages.displayName = 'Card.HeaderImages'

type CardContentProps = { className?: string } & PropsWithChildren

Card.Content = function CardContent({ children, className }: CardContentProps) {
  return (
    <div
      className={cn('flex flex-col gap-[8px] p-[16px] mb-[16px] group-hover/card:mb-0', className)}
    >
      {children}
    </div>
  )
} as React.FC<CardContentProps>

Card.Content.displayName = 'Card.Content'

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
          ` 
            h-0 flex justify-between items-stretch 
            text-[var(--primary-foreground)] bg-[var(--primary)] 
            font-inter font-semibold text-xs leading-[18px] 
            rounded-b-[6px]
            transform-gpu transition-all duration-300 ease-in-out
            opacity-0 -translate-y-4 pointer-events-none
            hover:opacity-80
            group-hover/footer-buttons:h-[50px] group-hover/footer-buttons:opacity-100 group-hover/footer-buttons:translate-y-0 group-hover/footer-buttons:pointer-events-auto
            
            `,
          className,
          {
            'bg-[var(--disabled)] text-[#515559]': disabled,
          },
        )}
      >
        <button
          onClick={handleClickButton}
          className={'cursor-pointer flex w-full items-center justify-center py-[16px]'}
          disabled={disabled}
        >
          {children}
        </button>

        {options?.length && (
          <button
            data-testid="options-button"
            onClick={handleOpenNavOptions}
            className={cn('cursor-pointer px-[6px] border-l border-black/20')}
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
          `absolute w-full left-[0] bottom-[50px] bg-[var(--card)] 
          font-inter not-italic font-semibold text-[12px] leading-[18px] text-center 
          text-white rounded-[8px] overflow-hidden`,
          'transform-gpu transition-all duration-200 ease-out',
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
      <div
        data-testid="card-mini-container"
        onClick={onClick}
        className={cn(
          'cursor-pointer bg-[var(--card)] rounded-b-[5.89px] card-shadow group/card',
          'flex flex-col relative !border-t-[3px] !border-t-[var(--primary)] group/footer-buttons ',
          className,
        )}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
}

CardMini.Header = function CardMiniHeader({ children, className }: CardHeaderProps) {
  return (
    <Card.Header className={cn('px-[16px] pt-[32px] pb-[12px]', className)}>{children}</Card.Header>
  )
} as React.FC<CardHeaderProps>

CardMini.Header.displayName = 'CardMini.Header'

CardMini.Images = function CardMiniImages(props: CardHeaderImagesProps) {
  return (
    <Card.HeaderImages
      images={props.images}
      className={cn('m-0 group-hover/card:m-0', props.className)}
    />
  )
} as React.FC<CardHeaderImagesProps>

CardMini.Images.displayName = 'CardMini.Images'

CardMini.Content = function CardMiniContent({ children, className }: CardContentProps) {
  return (
    <Card.Content
      className={cn(
        'flex flex-col items-center gap-[8px] p-[0] mt-[12px] mb-[20px] group-hover/card:mb-[20px]',
        className,
      )}
    >
      {children}
    </Card.Content>
  )
} as React.FC<CardContentProps>

CardMini.Content.displayName = 'CardMini.Content'

CardMini.FooterButton = function CardMiniFooterButton({
  className,
  children,
  ...rest
}: CardFooterButtonProps) {
  return (
    <Card.FooterButton className={cn(className)} {...rest}>
      {children}
    </Card.FooterButton>
  )
} as React.FC<CardFooterButtonProps>

CardMini.FooterButton.displayName = 'CardMini.FooterButton'
