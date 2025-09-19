'use client'

import { type ComponentProps, Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function PaginationContainer({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(
        'mx-auto flex w-full justify-center text-white font-medium text-sm leading-[150%] tracking-[0.005em]',
        className,
      )}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-[2rem]', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<'button'>

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        'cursor-pointer hover:text-neutral-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-link-foreground-disabled',
        {
          'border py-[0.5rem] px-[0.90rem]': isActive,
        },

        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('cursor-pointer flex gap-[0.5rem] items-center [&>svg]:size-[1rem]', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Anterior</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('cursor-pointer flex gap-[0.5rem] items-center [&>svg]:size-[1rem]', className)}
      {...props}
    >
      <span className="hidden sm:block">Próximo</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

type Props = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
}: Props) {
  function range(start: number, end: number) {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  function getItens(total: number, current: number, siblingCount: number, boundaryCount: number) {
    const startPages = range(1, Math.min(boundaryCount, total))
    const endPages = range(Math.max(total - boundaryCount + 1, boundaryCount + 1), total)

    const siblingsStart = Math.max(
      Math.min(current - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2,
    )

    const siblingsEnd = Math.min(
      Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : total - 1,
    )

    const itemList: Array<number | 'start-ellipsis' | 'end-ellipsis'> = [...startPages]

    if (siblingsStart > boundaryCount + 2) {
      itemList.push('start-ellipsis')
    } else if (boundaryCount + 1 < total - boundaryCount) {
      itemList.push(boundaryCount + 1)
    }

    itemList.push(...range(siblingsStart, siblingsEnd))

    if (siblingsEnd < total - boundaryCount - 1) {
      itemList.push('end-ellipsis')
    } else if (total - boundaryCount > boundaryCount) {
      itemList.push(total - boundaryCount)
    }

    itemList.push(...endPages)

    return itemList
  }

  const pages = getItens(totalPages, currentPage, siblingCount, boundaryCount)
  const previousDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  function handlePreviousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={previousDisabled} onClick={handlePreviousPage} />
        </PaginationItem>

        {pages.map((page, idx) => (
          <Fragment key={`${page}-${idx}`}>
            {page === 'start-ellipsis' || page === 'end-ellipsis' ? (
              <PaginationItem>
                <span aria-hidden className="flex items-center justify-center text-white">
                  <MoreHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Mais páginas</span>
                </span>
              </PaginationItem>
            ) : (
              <PaginationItem onClick={() => onPageChange(page)}>
                <PaginationLink isActive={page === currentPage}>{page}</PaginationLink>
              </PaginationItem>
            )}
          </Fragment>
        ))}
        <PaginationItem>
          <PaginationNext disabled={nextDisabled} onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  )
}
