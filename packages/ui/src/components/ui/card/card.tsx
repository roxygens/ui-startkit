'use client'
import { useState, type PropsWithChildren, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

type CardContextType = {
  isNavOptionsOpen: boolean
  setIsNavOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
} & PropsWithChildren

export function Card(props: Props) {
  const [isNavOptionsOpen, setIsNavOptionsOpen] = useState(false)

  const { children, onClick, className } = props

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsNavOptionsOpen(false)
    }
  }

  function handleCloseNavOptions() {
    setIsNavOptionsOpen(false)
  }

  return (
    <CardContext.Provider value={{ isNavOptionsOpen, setIsNavOptionsOpen }}>
      <div
        data-testid="card-container"
        onBlur={handleBlur}
        onMouseLeave={handleCloseNavOptions}
        onClick={onClick}
        className={cn(
          'cursor-pointer bg-[#1F1F1F] pt-[14px]  pb-[32px] hover:bg-[#36393F] rounded-[8px]',
          'flex flex-col relative hover:border hover:border-[var(--primary)] rounded-[8px] group/footer-buttons',
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

type CardHeaderProps = {} & PropsWithChildren

Card.Header = function CardHeader({ children }: CardHeaderProps) {
  return <header className="group/header ">{children}</header>
}

type Image = {
  url: string
  alt: string
}

type CardHeaderImagesProps = {
  images: Image[]
  className?: string
}

Card.HeaderImages = function CardHeaderImages({ images, className }: CardHeaderImagesProps) {
  const [primaryImage, hoverImage] = images

  return (
    <div className={cn('relative h-auto', className)}>
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
}

type CardContentProps = { className?: string } & PropsWithChildren

Card.Content = function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('flex flex-col gap-[8px]', className)}>{children}</div>
}

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
  const { isNavOptionsOpen, setIsNavOptionsOpen } = useCardContext()

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
            absolute bottom-[-36px] left-0 right-0 flex justify-between items-stretch 
            text-[var(--primary-foreground)] bg-[var(--primary)] 
            font-inter font-semibold text-xs leading-[18px] 
            rounded-b-[8px]
            transform-gpu transition-all duration-300 ease-in-out
            opacity-0 -translate-y-4 pointer-events-none  
            mx-[-1px]
            group-hover/footer-buttons:opacity-100 group-hover/footer-buttons:translate-y-0 group-hover/footer-buttons:pointer-events-auto  
            
            `,
          className,
        )}
      >
        <button
          onClick={handleClickButton}
          className="cursor-pointer flex w-full items-center justify-center py-[16px]"
        >
          {children}
        </button>

        {options?.length && (
          <button
            data-testid="options-button"
            onClick={handleOpenNavOptions}
            className={cn('cursor-pointer py-[18px] px-[16px] border-l border-black/20')}
            style={{ borderColor: 'currentColor' }}
            aria-label="Abrir opções do card"
          >
            <svg
              width="4"
              height="18"
              viewBox="0 0 4 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-inherit"
            >
              <path
                d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </footer>

      <nav
        aria-label="Menu de opções"
        className={cn(
          `absolute w-full left-[0] bottom-[18px] bg-[#1F1F1F] 
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
            className="cursor-pointer w-full px-[20px] py-[10px] hover:bg-[#2C2C2C] flex flex-row items-center gap-[10px] border-b border-[var(--secondary-border)] last:border-b-0"
          >
            {option.icon} <p>{option.title}</p>
          </button>
        ))}
      </nav>
    </>
  )
}
