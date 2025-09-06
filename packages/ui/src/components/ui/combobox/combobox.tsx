import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

type ComboboxOption = {
  value: string
  label: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value: string
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
  const [open, setOpen] = React.useState(false)
  const [internalValue, setinternalValue] = useState(value)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
        >
          {options?.find((opt) => opt.value === internalValue)?.label || placeholder}

          <ChevronsUpDown className="w-[0.89rem] h-[0.89rem] opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 rounded-none border-0"
        align="start"
      >
        <Command className="rounded-none border-none">
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyStatePlaceholder}</CommandEmpty>
            <CommandGroup className="p-0">
              {options.map((option) => (
                <CommandItem
                  className={`
                    bg-[#1C1C1E]
                    text-white
                    data-[selected=true]:bg-[#1C1C1E]
                    data-[selected=true]:text-white
                    rounded-none 
                    not-italic
                    font-normal
                    text-[0.88rem]
                    leading-[1.25rem]
                    `}
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setinternalValue(currentValue === internalValue ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      internalValue === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
