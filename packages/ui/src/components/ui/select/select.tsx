import React, { useState, useRef, useEffect } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Search, Check, ChevronsUpDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const selectVariants = cva(
  `
    text-white data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50  flex w-fit items-center justify-between gap-2 rounded-[0.25rem]  bg-neutral-900 px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px]  data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4

    shadow-[0_1px_2px_rgba(0,0,0,0.05)]  border border-[var(--secondary-border)]

    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm disabled:bg-[var(--disabled)] disabled:text-[var(--primary-foreground-disabled)]

    hover:border-[var(--primary)] 

    focus:border-[var(--primary)] 

    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
  `,
  {
    variants: {
      size: {
        xs: 'px-[0.5rem] h-[1.5rem] text-xs',
        sm: 'px-[0.5rem] h-[2rem] text-sm',
        md: 'px-[0.5rem] h-[2.25rem] text-sm',
        lg: 'px-[0.5rem] h-[2.5rem] text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const popoverContentItemVariants = cva(
  `w-full flex items-center gap-2 cursor-pointer outline-none hover:bg-neutral-800 text-white`,
  {
    variants: {
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2 py-1.5 text-sm',
        md: 'px-2 py-2 text-sm',
        lg: 'px-2 py-2.5 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  options: SelectOption[]
  defaultValue?: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyStatePlaceholder?: string
  className?: string
  isCombobox?: boolean
  disabled?: boolean
  'aria-invalid'?: boolean
} & VariantProps<typeof selectVariants>

export const Select: React.FC<SelectProps> = ({
  options,
  defaultValue = '',
  onChange,
  placeholder = 'Selecione',
  searchPlaceholder = 'Pesquisar...',
  emptyStatePlaceholder = 'Sem dados',
  className,
  isCombobox,
  size,
  disabled,
  ...rest
}) => {
  const [search, setSearch] = useState('')
  const [internalValue, setInternalValue] = useState('')
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const itemRefs = useRef<HTMLButtonElement[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const isInvalid = rest['aria-invalid']

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  )

  function handleSelect(optionValue: string) {
    const newValue = optionValue === internalValue ? '' : optionValue
    setInternalValue(newValue)
    onChange(newValue)
    setOpen(false)
  }

  function clearSearch() {
    setSearch('')
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
    setFocusedIndex(0)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((prev) => (prev + 1) % filteredOptions.length)
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((prev) => (prev <= 0 ? filteredOptions.length - 1 : prev - 1))
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredOptions[focusedIndex]) {
        handleSelect(filteredOptions[focusedIndex].value)
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].focus()
    }
  }, [focusedIndex])

  useEffect(() => {
    setInternalValue(defaultValue)
  }, [defaultValue])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(selectVariants({ size, className }))}
          type="button"
          onClick={clearSearch}
          disabled={disabled}
          aria-invalid={isInvalid}
        >
          {options?.find((opt) => opt.value === internalValue)?.label || placeholder}
          <ChevronsUpDown className="w-[0.89rem] h-[0.89rem] opacity-50" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={4}
          className="bg-neutral-900 w-[var(--radix-popover-trigger-width)] rounded-none hover:rounded-none shadow-lg z-50"
          onKeyDown={handleKeyDown}
        >
          <div className="flex flex-col font-normal text-[0.75rem] leading-[1.25rem]">
            {isCombobox && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input
                    ref={inputRef}
                    className={cn(
                      popoverContentItemVariants({ size }),
                      'bg-neutral-800 placeholder:text-[var(--muted-foreground)] pl-9 focus:ring-0 rounded-none',
                    )}
                    placeholder={searchPlaceholder}
                    onChange={handleSearch}
                    autoFocus
                  />
                </div>

                {!filteredOptions.length && (
                  <div className={cn(popoverContentItemVariants({ size }), 'rounded-none')}>
                    {emptyStatePlaceholder}
                  </div>
                )}
              </>
            )}

            {filteredOptions.map((option, index) => (
              <Popover.Close asChild key={option.value}>
                <button
                  ref={(el) => {
                    itemRefs.current[index] = el!
                  }}
                  tabIndex={-1}
                  onClick={() => handleSelect(option.value)}
                  className={cn(popoverContentItemVariants({ size }), 'rounded-none')}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto w-[1rem] h-[1rem]',
                      internalValue === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </button>
              </Popover.Close>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
