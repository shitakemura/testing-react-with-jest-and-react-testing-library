import { fireEvent, render, screen, logRoles } from '@testing-library/react'
import { SummaryForm } from './SummaryForm'

describe('SummaryForm', () => {
  test('Initial condition', () => {
    const { container } = render(<SummaryForm />)
    logRoles(container)

    const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
    })
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole('button', { name: 'Confirm order' })
    expect(confirmButton).toBeDisabled()
  })

  test('Checkbox disables button on first click and enables on second click', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox')
    const confirmButton = screen.getByRole('button', { name: 'Confirm order' })

    fireEvent.click(checkbox)
    expect(confirmButton).toBeEnabled()

    fireEvent.click(checkbox)
    expect(confirmButton).toBeDisabled()
  })
})
