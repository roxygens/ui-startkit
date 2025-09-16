'use client'

import { type ComponentProps, useState, useRef } from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const switchVariants = cva(
  `
   peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-[var(--disabled)] 
   focus-visible:border-ring focus-visible:ring-ring/50 
   inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs 
   transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      size: {
        xs: 'h-3 w-6',
        sm: 'h-3.5 w-7',
        md: 'h-4 w-8',
        lg: 'h-5 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const switchThumbVariants = cva(
  `
    bg-white
    pointer-events-none block rounded-full ring-0 transition-transform 
    data-[state=checked]:translate-x-[calc(100%)] data-[state=unchecked]:translate-x-0
  `,
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
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

type Props = {
  disabled?: boolean
  className?: string
  label?: string
  description?: string
  checked?: boolean
} & ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>

function Switch({ className, size, label, description, ...props }: Props) {
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
        'border-neutral-400': checked || props.checked,
      })}
      onClick={handleContainerClick}
    >
      <SwitchPrimitive.Root
        {...props}
        ref={checkboxRef}
        data-slot="switch"
        className={cn(switchVariants({ size, className }))}
        onClick={handleCheck}
        checked={props?.checked ? props.checked : checked}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(switchThumbVariants({ size }))}
        />
      </SwitchPrimitive.Root>

      <div className="flex flex-col">
        {label && (
          <label
            data-testid={`label-${size}`}
            htmlFor={props?.id}
            className={labelVariants({ size })}
          >
            {label}
          </label>
        )}
        {description && (
          <p data-testid={`desc-${size}`} className={descriptionVariants({ size })}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export { Switch }
