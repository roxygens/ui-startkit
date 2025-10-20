import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'cursor-pointer flex items-center justify-center gap-[0.5rem] whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50  shrink-0  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0.2rem] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-disabled disabled:text-primary-foreground-disabled disabled:cursor-not-allowed shadow-xs  font-inter font-semibold text-sm leading-[1.25rem]  flex-none order-1 grow-0 ',
        secondary:
          'bg-secondary text-secondary-foreground border border-secondary-border hover:text-secondary-foreground-hover disabled:bg-disabled disabled:text-secondary-foreground-disabled disabled:cursor-not-allowed shadow-xs  font-inter font-semibold text-sm leading-[1.25rem]  flex-none order-1 grow-0 ',
        tertiary:
          'bg-tertiary text-tertiary-foreground border border-tertiary-border hover:bg-tertiary-hover hover:text-tertiary-foreground-hover disabled:bg-disabled disabled:text-tertiary-foreground-disabled disabled:cursor-not-allowed shadow-xs  font-inter font-semibold text-sm leading-[1.25rem]  flex-none order-1 grow-0 ',
        link: 'text-link-foreground hover:text-link-foreground-hover disabled:text-link-foreground-disabled disabled:cursor-not-allowed shadow-xs font-inter font-semibold text-sm leading-[1.25rem]  flex-none order-1 grow-0 ',
      },
      size: {
        sm: 'px-[0.75rem] py-[0.38rem] text-sm [&_svg]:w-[0.875rem] [&_svg]:h-[0.875rem]',
        md: 'px-[1rem] py-[0.6rem] text-base [&_svg]:w-[1rem] [&_svg]:h-[1rem]',
        lg: 'px-[1.25rem] py-[0.75rem] text-lg [&_svg]:w-[1.125rem] [&_svg]:h-[1.125rem]',
        xl: 'px-[1.5rem] py-[1rem] text-xl [&_svg]:w-[1.25rem] [&_svg]:h-[1.25rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
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
