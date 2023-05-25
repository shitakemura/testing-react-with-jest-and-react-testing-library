import { render, screen } from '../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { ScoopOption } from './ScoopOption'

test('indicate if scoop count is non-int or out of range', async () => {
  const user = userEvent.setup()
  render(<ScoopOption name="Vanilla" imagePath="/images/vanilla.png" />)

  // input number is negative number
  const vanillaInput = screen.getByRole('spinbutton', { name: 'Vanilla' })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '-1')
  expect(vanillaInput).toHaveClass('is-invalid')

  // input number is decimal number
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '2.5')
  expect(vanillaInput).toHaveClass('is-invalid')

  // input number is too high
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '11')
  expect(vanillaInput).toHaveClass('is-invalid')

  // input number is valid
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '3')
  expect(vanillaInput).not.toHaveClass('is-invalid')
})
