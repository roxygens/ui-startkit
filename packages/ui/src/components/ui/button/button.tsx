import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex items-center justify-center gap-[8px] whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50  shrink-0  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-[var(--primary-disabled)] disabled:text-[var(--primary-foreground-disabled)] disabled:cursor-not-allowed shadow-xs rounded-sm font-inter font-semibold text-sm leading-[20px]  flex-none order-1 grow-0 ',
        secondary:
          'bg-secondary text-secondary-foreground border border-secondary-border hover:text-secondary-foreground-hover disabled:bg-[var(--secondary-disabled)] disabled:text-[var(--secondary-foreground-disabled)] disabled:cursor-not-allowed shadow-xs rounded-sm font-inter font-semibold text-sm leading-[20px]  flex-none order-1 grow-0 ',
        tertiary:
          'bg-tertiary text-tertiary-foreground border border-tertiary-border hover:bg-tertiary-hover hover:text-tertiary-foreground-hover disabled:bg-[var(--tertiary-disabled)] disabled:text-[var(--tertiary-foreground-disabled)] disabled:cursor-not-allowed shadow-xs rounded-sm font-inter font-semibold text-sm leading-[20px]  flex-none order-1 grow-0 ',
        link: 'text-link-foreground hover:text-link-foreground-hover disabled:text-[var(--link-foreground-disabled)] disabled:cursor-not-allowed shadow-xs rounded-sm font-inter font-semibold text-sm leading-[20px]  flex-none order-1 grow-0 ',
      },
      size: {
        sm: 'px-[16px] py-[8px] [&_svg]:w-[20px] [&_svg]:h-[20px]',
        md: 'px-[16px] py-[10px] [&_svg]:w-[20px] [&_svg]:h-[20px]',
        lg: 'px-[20px] py-[12px] [&_svg]:w-[20px] [&_svg]:h-[20px]',
        xl: 'px-[24px] py-[16px] [&_svg]:w-[24px] [&_svg]:h-[24px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
)

type OtherProps = {
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end' | 'both' | 'none'
  isIconButton?: boolean
  disabled?: boolean
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  icon,
  iconPosition,
  isIconButton,
  children,
  ...props
}: React.ComponentProps<'button'> &
  OtherProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isIconButton ? (
        icon
      ) : (
        <>
          {icon && (iconPosition === 'start' || iconPosition === 'both') && icon}
          {children}
          {icon && (iconPosition === 'end' || iconPosition === 'both') && icon}
        </>
      )}
    </Comp>
  )
}
