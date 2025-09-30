import { type ComponentProps, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  `
    file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  shadow-[0_1px_2px_rgba(0,0,0,0.05)]  border border-[var(--secondary-border)]
    flex h-9 w-full min-w-0 bg-neutral-900 px-3 py-1 text-base shadow-xs 
    transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0  file:text-sm 
    file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm disabled:bg-[var(--disabled)] disabled:text-[var(--primary-foreground-disabled)]

    text-white 

    hover:border-[var(--primary)] 

    focus:border-[var(--primary)] 

    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
  `,
  {
    variants: {
      size: {
        xs: 'px-[0.5rem] h-[1.5rem] text-xs',
        sm: 'px-[0.5rem] h-[2rem] text-sm',
        md: 'px-[0.5rem] h-[2.25rem] text-base',
        lg: 'px-[0.5rem] h-[2.5rem] text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type OtherProps = {
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
}

type InputProps = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> &
  OtherProps

const iconVariants = cva(
  'absolute left-[0.5rem] flex items-center pointer-events-none text-muted-foreground',
  {
    variants: {
      size: {
        xs: '[&_svg]:h-[0.75rem] [&_svg]:w-[0.75rem]',
        sm: '[&_svg]:h-[0.875rem] [&_svg]:w-[0.875rem]',
        md: '[&_svg]:h-[1rem] [&_svg]:w-[1rem]',
        lg: '[&_svg]:h-[1.125rem] [&_svg]:w-[1.125rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {!!icon && <span className={cn(iconVariants({ size }))}>{icon}</span>}
        <input
          type={type}
          className={cn(inputVariants({ size, className }), {
            'pl-[1.75rem]': icon && size === 'xs',
            'pl-[1.875rem]': icon && size === 'sm',
            'pl-[2rem]': icon && size === 'md',
            'pl-[2.25rem]': icon && size === 'lg',
          })}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
