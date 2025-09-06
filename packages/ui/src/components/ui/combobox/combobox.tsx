import React, { useState, useRef, useEffect } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Search, Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type ComboboxOption = {
  value: string
  label: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyStatePlaceholder?: string
  className?: string
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione',
  searchPlaceholder = 'Pesquisar...',
  emptyStatePlaceholder = 'Sem dados',
  className,
}) => {
  const [search, setSearch] = useState('')
  const [internalValue, setInternalValue] = useState(value)
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const itemRefs = useRef<HTMLButtonElement[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

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

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(
            `
              box-border
              flex flex-row gap-[1.9rem] justify-between items-center
              px-[0.75rem] py-[0.5rem]
              border border-white
              rounded-[0.38rem]
              shadow-[0px_0.06rem_0.11rem_rgba(0,0,0,0.1)]
              not-italic
              font-medium
              text-[0.78rem]
              leading-[1.11rem]
              text-white
          `,
            className,
          )}
          type="button"
          onClick={clearSearch}
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
          className="bg-neutral-900 w-[var(--radix-popover-trigger-width)] rounded-md shadow-lg z-50"
          onKeyDown={handleKeyDown}
        >
          <div className="flex flex-col font-normal text-[0.75rem] leading-[1.25rem]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                ref={inputRef}
                className="bg-neutral-800 text-white placeholder:text-[var(--muted-foreground)] pl-9 px-[0.75rem] py-[0.65rem] outline-none focus:outline-none focus:ring-0 w-full"
                placeholder={searchPlaceholder}
                onChange={handleSearch}
                autoFocus
              />
            </div>

            {!filteredOptions.length && (
              <div className="w-full px-[0.75rem] py-[0.65rem] flex flex-row items-center gap-[0.65rem] text-white">
                {emptyStatePlaceholder}
              </div>
            )}

            {filteredOptions.map((option, index) => (
              <Popover.Close asChild key={option.value}>
                <button
                  ref={(el) => {
                    itemRefs.current[index] = el!
                  }}
                  tabIndex={-1}
                  onClick={() => handleSelect(option.value)}
                  className="cursor-pointer w-full hover:bg-neutral-800 text-white px-[0.75rem] py-[0.65rem] flex flex-row items-center gap-[0.65rem]"
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
