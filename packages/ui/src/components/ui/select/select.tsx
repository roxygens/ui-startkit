import React, { useState, useRef, forwardRef, useEffect } from 'react'
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
      size: 'sm',
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
        md: 'px-2 py-2 text-base',
        lg: 'px-2 py-2.5 text-lg',
      },
    },
    defaultVariants: {
      size: 'sm',
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

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
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
    },
    ref,
  ) => {
    const [search, setSearch] = useState('')
    const [internalValue, setInternalValue] = useState('')
    const [open, setOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState<number>(-1)

    const triggerRef = useRef<HTMLButtonElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

    const isInvalid = rest['aria-invalid']

    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    )

    function handleSelect(optionValue: string) {
      const newValue = optionValue === internalValue ? '' : optionValue
      setInternalValue(newValue)
      onChange(newValue)

      setOpen(false)
      triggerRef.current?.focus()
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
        if (document.activeElement === inputRef.current) {
          setFocusedIndex(0)
        } else {
          setFocusedIndex((prev) => (prev + 1) % filteredOptions.length)
        }
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (focusedIndex === 0 && isCombobox) {
          setFocusedIndex(-1)
          inputRef.current?.focus()
        } else {
          setFocusedIndex((prev) => (prev <= 0 ? filteredOptions.length - 1 : prev - 1))
        }
      }

      if (e.key === 'Enter' && focusedIndex !== -1) {
        e.preventDefault()
        if (filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value)
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    useEffect(() => {
      if (open && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
        const item = itemRefs.current[focusedIndex]
        item?.focus()
        item?.scrollIntoView({ block: 'nearest' })
      }
    }, [focusedIndex, open])

    useEffect(() => {
      setInternalValue(defaultValue)
    }, [defaultValue])

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            ref={triggerRef}
            className={cn(selectVariants({ size, className }))}
            type="button"
            onClick={clearSearch}
            disabled={disabled}
            aria-invalid={isInvalid}
          >
            {options?.find((opt) => opt.value === internalValue)?.label || placeholder}
            <ChevronsUpDown className="w-[0.89rem] h-[0.89rem] opacity-50" />
            <input type="hidden" {...rest} ref={ref} disabled={disabled} />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={4}
            className="bg-neutral-900 w-[var(--radix-popover-trigger-width)] rounded-none hover:rounded-none shadow-lg z-50 overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div
              ref={listRef}
              className="flex flex-col font-normal text-[0.75rem] leading-[1.25rem] max-h-60 overflow-y-auto"
            >
              {isCombobox && (
                <>
                  <div className="relative p-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <input
                      ref={inputRef}
                      className={cn(
                        popoverContentItemVariants({ size }),
                        'bg-neutral-800 placeholder:text-[var(--muted-foreground)] pl-9 focus:ring-0 rounded-none w-full',
                      )}
                      placeholder={searchPlaceholder}
                      onChange={handleSearch}
                      value={search}
                    />
                  </div>

                  {!filteredOptions.length && search && (
                    <div className={cn(popoverContentItemVariants({ size }), 'rounded-none')}>
                      {emptyStatePlaceholder}
                    </div>
                  )}
                </>
              )}

              {filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  role="option"
                  aria-selected={internalValue === option.value}
                  data-focused={focusedIndex === index}
                  tabIndex={-1}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    popoverContentItemVariants({ size }),
                    'rounded-none data-[focused=true]:bg-neutral-800',
                  )}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto w-[1rem] h-[1rem]',
                      internalValue === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  },
)

Select.displayName = 'Select'
