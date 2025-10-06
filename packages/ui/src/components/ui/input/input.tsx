'use client'
import { type ComponentProps, forwardRef, useRef, useLayoutEffect, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  `
    text-white placeholder:text-neutral-500 selection:bg-primary selection:text-primary-foreground  shadow-[0_1px_2px_rgba(0,0,0,0.05)]  border border-[var(--secondary-border)]
    flex w-full min-w-0 bg-background shadow-xs font-normal leading-[140%]
    transition-[color,box-shadow] outline-none
    disabled:bg-[var(--disabled)] disabled:placeholder:text-[var(--primary-foreground-disabled)]  disabled:text-[var(--primary-foreground-disabled)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-none
    hover:border-[var(--primary)] 
    focus:border-[var(--primary)] 
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
  `,
  {
    variants: {
      size: {
        xs: 'px-[0.5rem] h-[1.5rem] text-xs',
        sm: 'px-[0.5rem] h-[2rem] text-xs',
        md: 'px-[0.5rem] h-[2.25rem] text-sm',
        lg: 'px-[0.5rem] h-[2.5rem] text-sm',
        xl: 'px-[0.5rem] h-[3rem] text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type FormErrors = Record<string, unknown | undefined>

type OtherProps = {
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  prefix?: string
  errors?: FormErrors
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
        sm: '[&_svg]:h-[0.75rem] [&_svg]:w-[0.75rem]',
        md: '[&_svg]:h-[0.875rem] [&_svg]:w-[0.875rem]',
        lg: '[&_svg]:h-[0.875rem] [&_svg]:w-[0.875rem]',
        xl: '[&_svg]:h-[1rem] [&_svg]:w-[1rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const prefixVariants = cva(
  'absolute left-[0.5rem] flex items-center pointer-events-none text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, icon, prefix, errors, ...props }, ref) => {
    const prefixRef = useRef<HTMLSpanElement>(null)
    const [prefixWidth, setPrefixWidth] = useState(0)

    const error = errors?.[props.name as string] as { message: string }

    useLayoutEffect(() => {
      if (prefixRef.current) {
        setPrefixWidth(prefixRef.current.offsetWidth + 8)
      }
    }, [prefix])

    return (
      <div className="relative flex items-center w-full">
        {!!icon && <span className={cn(iconVariants({ size }))}>{icon}</span>}
        {!!prefix && (
          <span ref={prefixRef} className={cn(prefixVariants({ size }))}>
            {prefix}
          </span>
        )}
        <div className="flex flex-col gap-1 w-full">
          <input
            type={type}
            className={cn(inputVariants({ size, className }), {
              'pl-[1.75rem]': icon && (size === 'xs' || size === 'sm'),
              'pl-[1.875rem]': icon && (size === 'md' || size === 'lg'),
              'pl-[2rem]': icon && size === 'xl',
            })}
            style={{
              paddingLeft: prefix ? `${prefixWidth + 8}px` : '',
            }}
            aria-invalid={props['aria-invalid'] || !!error?.message?.length}
            ref={ref}
            {...props}
          />
          {!!error?.message?.length && (
            <span className="text-xs text-destructive">{error.message}</span>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
