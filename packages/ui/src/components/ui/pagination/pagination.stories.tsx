import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from '.'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: { page: null },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    totalPages: 10,
    boundaryCount: 1,
    siblingCount: 1,
  },
  render: ({ totalPages, boundaryCount, siblingCount }) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
        boundaryCount={boundaryCount}
        siblingCount={siblingCount}
      />
    )
  },
}
