'use client'

import { type ComponentProps, useRef, useState } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const checkboxVariants = cva(
  `
    peer group shrink-0 rounded-[0.19rem] border border-neutral-gray shadow-xs mt-[0.15rem]
    transition-shadow outline-none 
    data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground 
    dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary 
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      size: {
        xs: 'h-3 w-3 [&_svg]:size-2',
        sm: 'h-3.5 w-3.5 [&_svg]:size-2.5',
        md: 'h-4 w-4 [&_svg]:size-3',
        lg: 'h-5 w-5 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const labelVariants = cva('text-white font-normal', {
  variants: {
    size: {
      xs: 'text-[0.75rem] leading-[1.2] tracking-[0.005rem]',
      sm: 'text-[0.8125rem] leading-[1.3] tracking-[0.006rem]',
      md: 'text-[0.875rem] leading-[1.5] tracking-[0.007rem]',
      lg: 'text-[1rem] leading-[1.6] tracking-[0.01rem]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const descriptionVariants = cva('text-neutral-gray', {
  variants: {
    size: {
      xs: 'text-[0.625rem] leading-[1.1] tracking-[0.01em]',
      sm: 'text-[0.6875rem] leading-[1.2] tracking-[0.012em]',
      md: 'text-[0.75rem] leading-[1.5] tracking-[0.015em]',
      lg: 'text-[0.875rem] leading-[1.6] tracking-[0.02em]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>

type Props = {
  disabled?: boolean
  className?: string
  'aria-invalid'?: boolean
  label?: string
  description?: string
  checked?: boolean
} & CheckboxProps

function Checkbox({ className, size, label, description, ...props }: Props) {
  const checkboxRef = useRef<HTMLButtonElement | null>(null)
  const [checked, setChecked] = useState(false)

  function handleCheck(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setChecked((state) => !state)
  }

  const handleContainerClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click()
    }
  }

  return (
    <div
      className={cn('flex flex-row place-items-start gap-[0.5rem]', {
        'border-1 border-neutral-gray rounded-[0.5rem] px-[0.75rem] min-w-[15rem] py-[0.5rem]':
          description,
        'border-neutral-400': checked || props?.checked,
      })}
      onClick={handleContainerClick}
    >
      <CheckboxPrimitive.Root
        {...props}
        ref={checkboxRef}
        data-slot="checkbox"
        role="checkbox"
        className={cn(checkboxVariants({ size, className }))}
        onClick={handleCheck}
        checked={props?.checked ? props.checked : checked}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <div className="flex flex-col">
        {label && (
          <label htmlFor={props?.id} className={labelVariants({ size })}>
            {label}
          </label>
        )}
        {description && <p className={descriptionVariants({ size })}>{description}</p>}
      </div>
    </div>
  )
}

export { Checkbox }
