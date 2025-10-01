'use client'
import { useState, KeyboardEvent } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Item = {
  icon?: React.ReactNode
  label: string
  value: string
  content: string | React.ReactElement
}

type Props = {
  items: Item[]
  className?: string
}

export function List({ items, className }: Props) {
  const [openTabs, setOpenTabs] = useState<string[]>([])

  function handleToggle(value: string) {
    setOpenTabs((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  function handleClickContent(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  return (
    <ul className={cn('flex flex-col min-w-[15rem]', className)}>
      {items.map((item) => {
        const isOpen = openTabs.includes(item.value)
        const tabId = `tab-${item.value}`
        const panelId = `panel-${item.value}`

        return (
          <li
            onClick={() => handleToggle(item.value)}
            className="flex flex-col text-white bg-neutral-950 text-xs font-bold leading-[150%] [&_svg]:h-[1rem] [&_svg]:w-[1rem]"
          >
            <button
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isOpen}
              aria-expanded={isOpen}
              aria-controls={panelId}
              tabIndex={0}
              className={
                'border-b border-[var(--table-border)] cursor-pointer flex items-center justify-between  hover:bg-[var(--card-hover)] px-[2rem] py-[0.75rem]'
              }
            >
              <div className="flex gap-[1rem]">
                {item?.icon} <p>{item.label}</p>
              </div>
              {isOpen ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                tabIndex={0}
                onClick={handleClickContent}
                className="px-[2rem] py-[1rem]"
              >
                {item?.content}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
