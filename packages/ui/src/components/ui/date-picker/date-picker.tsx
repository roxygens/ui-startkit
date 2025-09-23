'use client'

import { useState, useRef, useEffect, forwardRef, type ComponentProps } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayButton, DayPicker, getDefaultClassNames, type DropdownProps } from 'react-day-picker'
import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

const Button = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={cn(className)} {...props} />
  },
)
Button.displayName = 'Button'

const defaultClassNames = getDefaultClassNames()

export function DatePicker({
  className,
  classNames,
  showOutsideDays,
  captionLayout,
  components,
  ...props
}: ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-neutral-950 text-white  group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatCaption: (date, options) => {
          const originalCaption = format(date, "LLLL 'de' yyyy", { locale: options?.locale })
          return originalCaption.replace(/^./, (char) => char.toUpperCase())
        },
        formatWeekdayName: (date, options) => {
          const originalWeekday = format(date, 'eee', { locale: options?.locale })
          return originalWeekday.replace(/^./, (char) => char.toUpperCase()).substring(0, 3)
        },
        formatMonthDropdown: (month) =>
          format(month, 'MMMM', { locale: ptBR }).replace(/^./, (char) => char.toUpperCase()),
        formatYearDropdown: (year) => format(year, 'yyyy', { locale: ptBR }),
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          'cursor-pointer flex items-center justify-center text-white border border-white bg-transparent aria-disabled:opacity-50 w-[2rem] h-[2rem] select-none',
          defaultClassNames.button_previous,
          {
            hidden: captionLayout !== 'label',
          },
        ),
        button_next: cn(
          'cursor-pointer flex items-center justify-center text-white border border-white bg-transparent aria-disabled:opacity-50 w-[2rem] h-[2rem] select-none',
          defaultClassNames.button_next,
          {
            hidden: captionLayout !== 'label',
          },
        ),

        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full  flex items-center text-sm font-medium justify-center h-(--cell-size) gap-[0.5rem]',
          defaultClassNames.dropdowns,
        ),
        caption_label: cn('select-none font-medium text-sm', defaultClassNames.caption_label),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-none flex-1 font-normal text-xs font-normal not-italic leading-[150%] tracking-[0.015em] select-none',
          defaultClassNames.weekday,
        ),
        weeks: cn('flex flex-col gap-[1px] mt-[0.5rem]', defaultClassNames.weeks),
        week: cn('flex w-full', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative text-sm not-italic font-normal leading-[150%] tracking-[0.005em] w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-none [&:last-child[data-selected=true]_button]:rounded-none group/day  select-none',
          defaultClassNames.day,
        ),
        range_start: cn('rounded-none bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-neutral-800 text-white data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className, 'rounded-none border-none')}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />
          }
          return <ChevronRightIcon className={cn('size-4', className)} {...props} />
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        Dropdown: CalendarDropdown,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDropdown({ value, onChange, options }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(options?.find((opt) => opt.value === value)?.label)

  const selectedOptionRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      selectedOptionRef.current?.scrollIntoView({ block: 'nearest' })
    })

    return () => cancelAnimationFrame(id)
  }, [selected, open])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'cursor-pointer relative border border-input shadow-xs rounded-none p-2 z-20 flex justify-center items-center gap-2 bg-neutral-900 text-white',
          )}
          data-testid={`calendar-dropdown-trigger`}
        >
          {selected}
          <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={4}
          className="bg-neutral-900 text-white shadow-lg rounded-none w-[var(--radix-popover-trigger-width)] z-50 min-w-[8rem] max-h-90 overflow-y-auto scrollbar-hide"
        >
          <div className="flex flex-col">
            {options?.map((opt) => (
              <button
                key={opt.value}
                ref={opt.label === selected ? selectedOptionRef : null}
                data-testid={`calendar-dropdown-option-${opt.label}`}
                type="button"
                onClick={() => {
                  if (onChange) {
                    onChange({
                      target: { value: opt.value },
                    } as unknown as React.ChangeEvent<HTMLSelectElement>)
                  }
                  setSelected(opt.label)
                  setOpen(false)
                }}
                className={cn(
                  'px-2 py-1 text-sm text-left cursor-pointer hover:bg-neutral-800',
                  selected === opt.label && 'bg-neutral-700',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

function CalendarDayButton({
  className,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        `   cursor-pointer h-[3rem] w-[3rem] flex flex-col items-center justify-center 
            data-[selected-single=true]:bg-white data-[selected-single=true]:text-neutral-900
            data-[range-middle=true]:bg-white data-[range-middle=true]:text-neutral-900 data-[range-start=true]:bg-white 
            data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-white data-[range-end=true]:text-primary-foreground 
            min-w-(--cell-size)  leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 
            [&>span]:text-xs [&>span]:opacity-70
        `,
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}
