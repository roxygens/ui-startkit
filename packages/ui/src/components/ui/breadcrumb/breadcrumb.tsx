import { type ComponentProps, type ElementType, Fragment } from 'react'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

function BreadcrumbContainer({ ...props }: ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-[0.5rem] break-words font-medium text-xs leading-[150%]',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        'inline-flex items-center text-white [word-spacing:0.15rem] uppercase',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn('hover:text-gray-200 transition-colors', className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-primary', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-testid="breadcrumb-separator"
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-[1rem] text-white', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

type Item = {
  label: string
  href?: string
}

type Props = {
  items: Item[]
  linkComponent?: ElementType
}

export function Breadcrumb({ items, linkComponent: LinkComp }: Props) {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {LinkComp ? (
                  <LinkComp href={item.href} className="hover:text-neutral-200 transition-colors">
                    {item.label}
                  </LinkComp>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}
