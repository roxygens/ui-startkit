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
        onBlur={handleBlur}
        onMouseLeave={handleCloseNavOptions}
        onClick={onClick}
        className={cn(
          'cursor-pointer bg-[#1F1F1F] pt-[14px] pr-[28px] pl-[16px] pb-[32px] hover:bg-[#36393F] rounded-[8px]',
          'flex flex-col relative group  hover:border hover:border-[var(--primary)] rounded-[8px]',
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
  return <header>{children}</header>
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
    <div className="relative w-[206px] h-auto mb-[12px]">
      <img
        className={cn(
          'w-full',
          {
            'transition-opacity duration-300 group-hover:opacity-0': hoverImage,
          },
          className,
        )}
        src={primaryImage.url}
        alt={primaryImage.alt}
      />

      {hoverImage && (
        <img
          className="
                absolute inset-0 w-full h-full object-cover 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 ease-in-out
              "
          src={hoverImage.url}
          alt={hoverImage.alt}
        />
      )}
    </div>
  )
}

type CardContentProps = {} & PropsWithChildren

Card.Content = function CardContent({ children }: CardContentProps) {
  return <div className="flex flex-col gap-[8px]">{children}</div>
}

type Option = {
  icon: React.ReactNode
  title: string
  onClick: () => void
}

type CardFooterButtoProps = {
  options?: Option[]
  isToRemoveCart?: boolean
  onClickAddCart?: () => void
  onClickRemoveCart?: () => void
} & PropsWithChildren

Card.FooterButton = function CardFooterButton({
  children,
  options,
  onClickAddCart,
  isToRemoveCart,
  onClickRemoveCart,
}: CardFooterButtoProps) {
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
    if (isToRemoveCart) {
      if (onClickRemoveCart) onClickRemoveCart()
    } else {
      if (onClickAddCart) onClickAddCart()
    }
  }

  return (
    <>
      <footer
        className={cn(
          `
              
            absolute bottom-[-20px] left-0 right-0 flex justify-between items-stretch 
            text-[var(--primary-foreground)] bg-[var(--primary)] 
            font-inter font-semibold text-xs leading-[18px] 
            rounded-b-[8px]
            transform-gpu transition-all duration-300 ease-in-out
            opacity-0 -translate-y-4 pointer-events-none  
            mx-[-1px]
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
          
            `,
          {
            'bg-destructive text-white': isToRemoveCart,
          },
        )}
      >
        <button
          onClick={handleClickButton}
          className={cn(`cursor-pointer flex w-full items-center justify-center `, {
            'py-[9px]': !options?.length,
          })}
        >
          {children}
        </button>

        {options?.length && (
          <button
            onClick={handleOpenNavOptions}
            className={cn('cursor-pointer py-[9px] px-[18px] border-l border-black/20', {
              'border-white': isToRemoveCart,
            })}
          >
            <svg
              width="4"
              height="18"
              viewBox="0 0 4 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                stroke={isToRemoveCart ? '#FFFFFF' : '#3A3A3A'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                stroke={isToRemoveCart ? '#FFFFFF' : '#3A3A3A'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                stroke={isToRemoveCart ? '#FFFFFF' : '#3A3A3A'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </footer>

      <nav
        className={cn(
          'absolute w-full left-[0] bottom-[18px] bg-[#1F1F1F] font-inter font-semibold text-sm text-white rounded-[8px] overflow-hidden',
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
            className="cursor-pointer w-full p-[16px] hover:bg-[#2C2C2C] flex flex-row items-center gap-[10px]"
          >
            {option.icon} <p>{option.title}</p>
          </button>
        ))}
      </nav>
    </>
  )
}
