import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './select'

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

const searchPlaceholderText = 'Pesquisar...'
const defaultPlaceholderText = 'Selecione'

const setup = (props = {}) => {
  const user = userEvent.setup()
  const defaultProps = {
    options: mockOptions,
    onChange: vi.fn(),
    isCombobox: true,
  }
  const view = render(<Select {...defaultProps} {...props} />)
  return {
    user,
    onChange: defaultProps.onChange,
    ...view,
  }
}

describe('Select', () => {
  describe('Rendering and Initial State', () => {
    it('should render with the default placeholder when no value is provided', () => {
      setup()
      expect(screen.getByRole('button', { name: defaultPlaceholderText })).toBeInTheDocument()
    })

    it('should render with the label of the provided default value', () => {
      setup({ defaultValue: 'banana' })
      expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument()
    })

    it('should render as disabled when the disabled prop is true', () => {
      setup({ disabled: true })
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should have aria-invalid attribute when aria-invalid prop is true', () => {
      setup({ 'aria-invalid': true })
      expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true')
    })

    it('should apply a custom className to the trigger button', () => {
      setup({ className: 'my-custom-select' })
      expect(screen.getByRole('button')).toHaveClass('my-custom-select')
    })

    it.each([
      ['xs', 'px-[0.5rem] h-[1.5rem] text-xs'],
      ['sm', 'px-[0.5rem] h-[2rem] text-xs'],
      ['md', 'px-[0.5rem] h-[2.25rem] text-sm'],
      ['lg', 'px-[0.5rem] h-[2.5rem] text-sm'],
    ])('should apply the correct styles for size %s', (size, expectedClass) => {
      setup({ size })
      const trigger = screen.getByRole('button')
      expect(trigger).toHaveClass(expectedClass)
    })
  })

  describe('Interactions', () => {
    it('should open the popover and display options when the trigger is clicked', async () => {
      const { user } = setup()
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      expect(await screen.findByRole('option', { name: 'Apple' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument()
      expect(screen.getByPlaceholderText(searchPlaceholderText)).toBeInTheDocument()
    })

    it('should update trigger, call onChange, and close popover when an option is selected', async () => {
      const { user, onChange } = setup()
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      const appleOption = await screen.findByRole('option', { name: 'Apple' })
      await user.click(appleOption)

      expect(onChange).toHaveBeenCalledWith('apple')
      expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument()
      expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
    })

    it('should deselect the value if the currently selected item is clicked again', async () => {
      const { user, onChange } = setup({ defaultValue: 'banana' })
      await user.click(screen.getByRole('button', { name: 'Banana' }))

      const popoverContent = await screen.findByRole('dialog')

      const bananaOption = within(popoverContent).getByRole('option', { name: 'Banana' })
      await user.click(bananaOption)

      expect(onChange).toHaveBeenCalledWith('')
      expect(screen.getByRole('button', { name: defaultPlaceholderText })).toBeInTheDocument()
    })
    it('should not open the popover if disabled', async () => {
      const { user } = setup({ disabled: true })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
    })

    it('should display the empty state placeholder when no options match the search', async () => {
      const { user } = setup({ emptyStatePlaceholder: 'No results found' })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      const searchInput = await screen.findByPlaceholderText(searchPlaceholderText)
      await user.type(searchInput, 'xyz')

      expect(await screen.findByText('No results found')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should close the popover when the Escape key is pressed', async () => {
      const { user } = setup({ isCombobox: true })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      const searchInput = await screen.findByPlaceholderText(searchPlaceholderText)
      expect(searchInput).toBeInTheDocument()

      await user.keyboard('{Escape}')
      expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
    })

    it('should navigate options with ArrowDown and select with Enter', async () => {
      const { user, onChange } = setup({ isCombobox: true })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      const searchInput = await screen.findByPlaceholderText(searchPlaceholderText)
      expect(searchInput).toHaveFocus()

      await user.keyboard('{ArrowDown}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toHaveFocus())

      await user.keyboard('{ArrowDown}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Banana' })).toHaveFocus())

      await user.keyboard('{Enter}')
      expect(onChange).toHaveBeenCalledWith('banana')
      expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument()
    })

    it('should navigate options with ArrowUp and wrap around to the end', async () => {
      const { user } = setup({ isCombobox: true })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))
      await screen.findByPlaceholderText(searchPlaceholderText)

      await user.keyboard('{ArrowUp}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Cherry' })).toHaveFocus())

      await user.keyboard('{ArrowUp}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Banana' })).toHaveFocus())
    })

    it('should move focus from first option back to search input with ArrowUp', async () => {
      const { user } = setup({ isCombobox: true })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      const searchInput = await screen.findByPlaceholderText(searchPlaceholderText)

      await user.keyboard('{ArrowDown}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toHaveFocus())

      await user.keyboard('{ArrowUp}')

      await waitFor(() => expect(searchInput).toHaveFocus())
    })

    it('should navigate options with ArrowUp and wrap around to the end', async () => {
      const { user } = setup({ isCombobox: false })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      await user.keyboard('{ArrowDown}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toHaveFocus())

      await user.keyboard('{ArrowUp}')
      await waitFor(() => expect(screen.getByRole('option', { name: 'Cherry' })).toHaveFocus())
    })
  })

  describe('Non-Combobox Mode', () => {
    it('should open and show options without a search input', async () => {
      const { user } = setup({ isCombobox: false })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      expect(await screen.findByRole('option', { name: 'Apple' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
      expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
    })

    it('should still select an option on click', async () => {
      const { user, onChange } = setup({ isCombobox: false })
      await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

      const cherryOption = await screen.findByRole('option', { name: 'Cherry' })
      await user.click(cherryOption)

      expect(onChange).toHaveBeenCalledWith('cherry')
      expect(screen.getByRole('button', { name: 'Cherry' })).toBeInTheDocument()
    })
  })
})
