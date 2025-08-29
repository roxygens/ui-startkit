import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  `
    file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  shadow-[0_1px_2px_rgba(0,0,0,0.05)]  border border-[var(--secondary-border)]
    dark:bg-input/30  flex h-9 w-full min-w-0 rounded-[8px] bg-transparent px-3 py-1 text-base shadow-xs 
    transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm 
    file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm disabled:bg-[var(--disabled)] disabled:text-[var(--primary-foreground-disabled)]

    text-white 

    hover:border-[var(--primary)] 

    focus:border-[var(--primary)] 

    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
  `,
  {
    variants: {
      size: {
        xs: 'px-[8px] h-[26px] text-xs',
        sm: 'px-[8px] h-[32px] text-sm',
        md: 'px-[8px] h-[36px] text-base',
        lg: 'px-[8px] h-[40px] text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type OtherProps = {
  disabled?: boolean
}

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> &
  OtherProps

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input type={type} className={cn(inputVariants({ size, className }))} ref={ref} {...props} />
    )
  },
)

Input.displayName = 'Input'

export { Input }
