import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Combobox } from './combobox'

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
  }
  const view = render(<Combobox {...defaultProps} {...props} />)
  return {
    user,
    onChange: defaultProps.onChange,
    ...view,
  }
}

describe('Combobox', () => {
  it('should render with the default placeholder when no value is provided', () => {
    setup()
    expect(screen.getByRole('button', { name: defaultPlaceholderText })).toBeInTheDocument()
  })

  it('should render with the label of the provided value', () => {
    setup({ defaultValue: 'banana' })
    expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument()
  })

  it('should open the popover and display options when the trigger is clicked', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

    expect(await screen.findByRole('button', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cherry' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(searchPlaceholderText)).toBeInTheDocument()
  })

  it('should update trigger, call onChange, and close popover when an option is selected', async () => {
    const { user, onChange } = setup()
    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

    const appleOption = await screen.findByRole('button', { name: 'Apple' })
    await user.click(appleOption)

    expect(onChange).toHaveBeenCalledWith('apple')
    expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
  })

  it('should deselect the value if the currently selected item is clicked again', async () => {
    const { user, onChange } = setup({ defaultValue: 'banana' })

    await user.click(screen.getByRole('button', { name: 'Banana' }))

    const popoverContent = await screen.findByRole('dialog')
    const bananaOption = within(popoverContent).getByRole('button', { name: 'Banana' })

    await user.click(bananaOption)

    expect(onChange).toHaveBeenCalledWith('')
    expect(screen.getByRole('button', { name: defaultPlaceholderText })).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
  })

  it('should wrap focus to the last item when pressing ArrowUp on the first item', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

    await screen.findByPlaceholderText(searchPlaceholderText)

    const options = [
      screen.getByRole('button', { name: 'Apple' }),
      screen.getByRole('button', { name: 'Banana' }),
      screen.getByRole('button', { name: 'Cherry' }),
    ]

    options[0].focus()
    expect(options[0]).toHaveFocus()

    await user.keyboard('{ArrowUp}')

    await waitFor(() => expect(options[options.length - 1]).toHaveFocus())

    await user.keyboard('{ArrowUp}')

    await waitFor(() => expect(options[options.length - 2]).toHaveFocus())
  })

  it('should display the empty state when no options match the search', async () => {
    const { user } = setup({ emptyStatePlaceholder: 'No results found' })
    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

    const searchInput = await screen.findByPlaceholderText(searchPlaceholderText)
    await user.type(searchInput, 'xyz')

    expect(await screen.findByText('No results found')).toBeInTheDocument()
  })

  it('should close the popover when the Escape key is pressed', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

    expect(await screen.findByPlaceholderText(searchPlaceholderText)).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
  })

  it('should navigate options with ArrowDown key and select with Enter', async () => {
    const { user, onChange } = setup()
    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))

    const searchInput = await screen.findByPlaceholderText(searchPlaceholderText)
    expect(searchInput).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    const appleOption = screen.getByRole('button', { name: 'Apple' })
    await waitFor(() => expect(appleOption).toHaveFocus())

    await user.keyboard('{ArrowDown}')
    const bananaOption = screen.getByRole('button', { name: 'Banana' })
    await waitFor(() => expect(bananaOption).toHaveFocus())

    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('banana')
    expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()
  })

  it('should navigate options with ArrowUp key and wrap around to the end', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: defaultPlaceholderText }))
    await screen.findByPlaceholderText(searchPlaceholderText)

    await user.keyboard('{ArrowDown}')
    const appleOption = screen.getByRole('button', { name: 'Apple' })
    await waitFor(() => expect(appleOption).toHaveFocus())

    await user.keyboard('{ArrowUp}')
    const cherryOption = screen.getByRole('button', { name: 'Cherry' })
    await waitFor(() => expect(cherryOption).toHaveFocus())
  })

  it('should not handle keyboard navigation when the popover is closed', async () => {
    const { user, onChange } = setup()
    const trigger = screen.getByRole('button', { name: defaultPlaceholderText })
    trigger.focus()

    await user.keyboard('{ArrowDown}')
    expect(screen.queryByPlaceholderText(searchPlaceholderText)).not.toBeInTheDocument()

    await user.keyboard('{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should handle custom placeholders correctly', async () => {
    const customSearchPlaceholder = 'Find a fruit...'
    const { user } = setup({
      placeholder: 'Choose Fruit',
      searchPlaceholder: customSearchPlaceholder,
      emptyStatePlaceholder: 'No fruit here',
    })

    expect(screen.getByRole('button', { name: 'Choose Fruit' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Choose Fruit' }))

    const searchInput = await screen.findByPlaceholderText(customSearchPlaceholder)
    await user.type(searchInput, 'xyz')

    expect(await screen.findByText('No fruit here')).toBeInTheDocument()
  })

  it('should apply a custom className to the trigger button', () => {
    setup({ className: 'my-custom-combobox' })
    expect(screen.getByRole('button')).toHaveClass('my-custom-combobox')
  })
})
