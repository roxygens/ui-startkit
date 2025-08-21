'use client'
import { useState, useEffect } from 'react'
import { DiscountBadge } from '@/components/ui/discount-badge'
import { CategoryTag } from '@/components/ui/category-tag'
import { QualityBar } from '@/components/ui/quality-bar'
import { cn } from '@/lib/utils'

type Image = {
  url: string
  alt: string
}

type Option = {
  icon: React.ReactNode
  title: string
  onClick: () => void
}

type Props = {
  price: number
  referencePrice?: number
  discount?: number
  category: string
  quality: number
  name: string
  hasNameBadge?: boolean
  additionalInfo?: string
  tradeStatus?: string
  images: Image[]
  options?: Option[]
  onClick?: () => void
  onClickAddCart?: () => void
}

export function ShoppingCard(props: Props) {
  const [isNavOptionsOpen, setIsNavOptionsOpen] = useState(false)
  const [isNavOptionsMounted, setIsNavOptionsMounted] = useState(false)

  const formatCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const {
    price,
    referencePrice,
    discount,
    category,
    quality,
    name,
    hasNameBadge,
    additionalInfo,
    tradeStatus,
    images,
    onClick,
    onClickAddCart,
    options,
  } = props

  const primaryImage = images?.[0]
  const hoverImage = images?.[1]

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsNavOptionsOpen(false)
    }
  }

  function handleOpenNavOptions(e: React.MouseEvent) {
    e.stopPropagation()
    if (isNavOptionsMounted) {
      setIsNavOptionsOpen(false)
    } else {
      setIsNavOptionsMounted(true)
      setTimeout(() => setIsNavOptionsOpen(true), 10)
    }
  }

  function handleCloseNavOptions() {
    setIsNavOptionsOpen(false)
  }

  useEffect(() => {
    if (!isNavOptionsOpen && isNavOptionsMounted) {
      const timer = setTimeout(() => {
        setIsNavOptionsMounted(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isNavOptionsOpen, isNavOptionsMounted])

  return (
    <div
      onBlur={handleBlur}
      onMouseLeave={handleCloseNavOptions}
      className="flex flex-col relative group  hover:border hover:border-[var(--primary)] rounded-[8px]"
    >
      <div
        onClick={onClick}
        className={cn(
          'cursor-pointer bg-[#1F1F1F] pt-[14px] pr-[28px] pl-[16px] pb-[32px] hover:bg-[#36393F] rounded-[8px]',
          {
            'bg-[#36393F]': isNavOptionsOpen,
          },
        )}
      >
        <section
          className={cn('flex flex-col transition-opacity duration-200', {
            'opacity-60': isNavOptionsOpen,
          })}
        >
          {!!tradeStatus && (
            <div className="flex items-center gap-2 mb-[8px]">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.69562 13.6783C7.29505 14.3879 9.20002 14.3494 10.8313 13.4075C13.5417 11.8427 14.4703 8.37704 12.9055 5.66672L12.7388 5.37804M3.09022 11.3335C1.52541 8.62314 2.45404 5.15746 5.16437 3.59265C6.79569 2.65081 8.70066 2.61227 10.3001 3.32185M1.66016 11.3892L3.48152 11.8773L3.96956 10.0559M12.0263 6.94393L12.5143 5.12256L14.3357 5.6106"
                  stroke="var(--primary)"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-[var(--primary)] font-inter font-medium text-xs leading-[15px]">
                {tradeStatus}
              </p>
            </div>
          )}

          <div className="relative w-[206px] h-auto mb-[12px]">
            {primaryImage && (
              <img
                className="w-full transition-opacity duration-300 group-hover:opacity-0"
                src={primaryImage.url}
                alt={primaryImage.alt}
              />
            )}

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

          <div className="flex flex-row items-start gap-[8px] mb-[4px]">
            <p className="font-inter font-bold text-2xl leading-8 text-white">
              {formatCurrency.format(price).replace(/\./g, '')}
            </p>

            {!!discount && <DiscountBadge value={discount} />}
          </div>

          {!!referencePrice && (
            <p className="font-inter font-medium text-xs leading-[18px] text-[#707179] mb-[16px]">
              Preço de referência {referencePrice.toFixed(2).replace('.', ',')} R$
            </p>
          )}

          <div className="flex flex-col gap-[8px]">
            <CategoryTag className="w-fit">{category}</CategoryTag>

            <div className="flex flex-row items-center gap-1">
              <p className="font-inter font-normal text-base leading-6 text-white">{name}</p>

              {!!hasNameBadge && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_16181_64072)">
                    <path
                      d="M5.33203 5.3335H5.3387M1.33203 3.46683L1.33203 6.44984C1.33203 6.77596 1.33203 6.93902 1.36887 7.09247C1.40153 7.22852 1.45541 7.35858 1.52851 7.47787C1.61097 7.61243 1.72627 7.72773 1.95687 7.95833L7.06929 13.0708C7.86132 13.8628 8.25734 14.2588 8.714 14.4072C9.11568 14.5377 9.54838 14.5377 9.95006 14.4072C10.4067 14.2588 10.8027 13.8628 11.5948 13.0708L13.0693 11.5962C13.8613 10.8042 14.2573 10.4082 14.4057 9.95153C14.5362 9.54984 14.5362 9.11715 14.4057 8.71546C14.2573 8.2588 13.8613 7.86279 13.0693 7.07075L7.95687 1.95833C7.72627 1.72773 7.61097 1.61243 7.47641 1.52998C7.35711 1.45687 7.22705 1.403 7.09101 1.37034C6.93756 1.3335 6.7745 1.3335 6.44837 1.3335L3.46536 1.3335C2.71863 1.3335 2.34526 1.3335 2.06004 1.47882C1.80916 1.60665 1.60519 1.81063 1.47736 2.06151C1.33203 2.34672 1.33203 2.72009 1.33203 3.46683ZM5.66537 5.3335C5.66537 5.51759 5.51613 5.66683 5.33203 5.66683C5.14794 5.66683 4.9987 5.51759 4.9987 5.3335C4.9987 5.1494 5.14794 5.00016 5.33203 5.00016C5.51613 5.00016 5.66537 5.1494 5.66537 5.3335Z"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_16181_64072">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>

            {!!additionalInfo && (
              <p className="w-[218px] font-inter font-medium text-sm leading-5 text-[#707179]">
                {additionalInfo}
              </p>
            )}

            <QualityBar value={quality} />
          </div>
        </section>

        <footer
          className="
            absolute bottom-[-20px] left-0 right-0 flex justify-between items-stretch 
            text-[var(--primary-foreground)] bg-[var(--primary)] 
            font-inter font-semibold text-xs leading-[18px] 
            rounded-b-[8px]
            transform-gpu transition-all duration-300 ease-in-out
            opacity-0 -translate-y-4 pointer-events-none  
            mx-[-1px]
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onClickAddCart) {
                onClickAddCart()
              }
            }}
            className={`cursor-pointer flex  w-full items-center justify-center ${!options?.length && 'py-[9px]'}`}
          >
            Adicionar ao carrinho
          </button>

          {options?.length && (
            <button
              onClick={handleOpenNavOptions}
              className="cursor-pointer py-[9px] px-[18px] border-l border-black/20"
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
                  stroke="#3A3A3A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                  stroke="#3A3A3A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                  stroke="#3A3A3A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </footer>
      </div>

      {isNavOptionsMounted && (
        <nav
          className={cn(
            'absolute w-full bottom-[18px] bg-[#1F1F1F] font-inter font-semibold text-sm text-white rounded-[8px] overflow-hidden',
            'transform-gpu transition-all duration-200 ease-out',
            isNavOptionsOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none',
          )}
        >
          {options?.map((option) => (
            <div
              key={option.title}
              onClick={option?.onClick}
              className="cursor-pointer p-[16px]  hover:bg-[#2C2C2C] flex flex-row items-center gap-[10px]"
            >
              {option.icon} <p>{option.title}</p>
            </div>
          ))}
        </nav>
      )}
    </div>
  )
}
