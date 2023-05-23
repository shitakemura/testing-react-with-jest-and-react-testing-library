import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SummaryForm } from './SummaryForm'

describe('SummaryForm', () => {
  test('Initial condition', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
    })
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole('button', { name: 'Confirm order' })
    expect(confirmButton).toBeDisabled()
  })

  test('Checkbox disables button on first click and enables on second click', async () => {
    const user = userEvent.setup()

    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox')
    const confirmButton = screen.getByRole('button', { name: 'Confirm order' })

    await user.click(checkbox)
    expect(confirmButton).toBeEnabled()

    await user.click(checkbox)
    expect(confirmButton).toBeDisabled()
  })

  test('popover responds to hover', async () => {
    const user = userEvent.setup()

    render(<SummaryForm />)

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      'No ice cream will actually be delivered'
    )
    expect(nullPopover).not.toBeInTheDocument()

    // popover appears on mouseover of checkbox label
    const termsOfConditions = screen.getByText('Terms and Conditions')
    await user.hover(termsOfConditions)

    const popover = screen.getByText('No ice cream will actually be delivered')
    expect(popover).toBeInTheDocument()

    // popover disappears when we mouse out
    await user.unhover(termsOfConditions)
    expect(popover).not.toBeInTheDocument()
  })
})
