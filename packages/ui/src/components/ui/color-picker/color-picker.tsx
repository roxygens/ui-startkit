'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ColorOption {
  from: string
  to: string
}

interface ColorPickerProps {
  options: ColorOption[]
  onSelect?: (color: { from: string; to: string; index: number }) => void
  selectedIndex?: number
  className?: string
}

export function ColorPicker({ options, onSelect, selectedIndex, className }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null)

  const handleColorClick = (index: number) => {
    setSelectedColor(index)
    const selected = options[index]
    onSelect?.({
      from: selected.from,
      to: selected.to,
      index,
    })
  }

  useEffect(() => {
    if (selectedIndex != null && options[selectedIndex]) {
      setSelectedColor(selectedIndex)
    }
  }, [selectedIndex, options])

  return (
    <div className={cn('inline-flex flex-col', className)}>
      <div className="flex gap-2 flex-wrap">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(index)}
            className={cn(
              'relative cursor-pointer focus:outline-none rounded-xs p-[2px] border-[1.5px] border-transparent',
              selectedColor === index &&
                'bg-transparent rounded-[0.25rem] border-[1.5px] border-white',
            )}
          >
            <div className="size-[calc(1.5rem-3px)] relative rounded-xs overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  backgroundColor: option.from,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  backgroundColor: option.to,
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
