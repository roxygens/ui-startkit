'use client'

import { type ComponentProps, useState, useEffect } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const radioGroupVariants = cva(
  `
    shadow-xs 
    transition-shadow outline-none 
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5 ',
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

const circleIconVariants = cva(
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary',
  {
    variants: {
      size: {
        xs: 'size-3 stroke-[0.5rem] rounded-full',
        sm: 'size-3.5 stroke-[0.5rem] rounded-full',
        md: 'size-4 stroke-[0.5rem] rounded-full',
        lg: 'size-6 stroke-[0.5rem] rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

function RadioGroupRoot({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  size,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupVariants>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-neutral-gray data-[state=checked]:border-primary  text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        radioGroupVariants({ size }),
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon
          className={circleIconVariants({ size })}
          stroke="currentColor"
          fill="transparent"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root> &
  VariantProps<typeof radioGroupVariants>

type Option = {
  label: string
  value: string
  disabled?: boolean
  description?: string
}

type Props = {
  className?: string
  options: Option[]
  defaultValue?: string
} & RadioGroupProps

export function RadioGroup({ size, className, defaultValue, options, ...props }: Props) {
  const [selected, setSelected] = useState<string | undefined>()

  const handleContainerClick = (option: Option) => {
    const el = document.getElementById(option.value)
    if (el) el.click()
  }

  function handleChangeValue(value: string) {
    if (props.onValueChange) {
      props.onValueChange(value)
    }
    setSelected(value)
  }

  useEffect(() => {
    setSelected(defaultValue)
  }, [defaultValue])

  return (
    <RadioGroupRoot {...props} defaultValue={defaultValue} onValueChange={handleChangeValue}>
      {options?.map((option) => (
        <div
          key={option.value}
          className={cn(
            'flex flex-row items-center gap-[0.5rem]',
            {
              'border-1 border-neutral-gray rounded-[0.25rem] px-[0.75rem] min-w-[15rem] py-[0.5rem]':
                option?.description,
              'border-neutral-400': selected === option.value,
            },
            className,
          )}
          onClick={() => handleContainerClick(option)}
        >
          <RadioGroupItem
            size={size}
            disabled={option.disabled}
            value={option.value}
            id={option.value}
            className={cn({
              'mt-[-1rem]': option?.description,
            })}
          />
          <div className="flex flex-col">
            {option.label && (
              <label htmlFor={option.value} className={cn(labelVariants({ size }))}>
                {option.label}
              </label>
            )}
            {option.description && (
              <p className={descriptionVariants({ size })}>{option.description}</p>
            )}
          </div>
        </div>
      ))}
    </RadioGroupRoot>
  )
}
