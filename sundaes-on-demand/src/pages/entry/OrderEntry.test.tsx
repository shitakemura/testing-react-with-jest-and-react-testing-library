import { render, screen, waitFor } from '../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { OrderEntry } from './OrderEntry'
import { rest } from 'msw'
import { server } from '../../mocks/server'

test('handles error for scoops and toppings routes', async () => {
  // override mock handlers
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (_, res, ctx) => {
      return res(ctx.status(500))
    }),
    rest.get('http://localhost:3030/toppings', (_, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<OrderEntry goToSummary={jest.fn()} />)

  await waitFor(async () => {
    // const alerts = await screen.findAllByRole('alert')
    const alerts = await screen.findAllByText(
      'An unexpected error occurred. Please try again later.'
    )
    expect(alerts).toHaveLength(2)
  })
})

test('disabled order summary button if there are no scoops ordered', async () => {
  const user = userEvent.setup()
  render(<OrderEntry goToSummary={jest.fn()} />)

  const orderSummaryButton = screen.getByRole('button', {
    name: 'Order Sundae!',
  })
  expect(orderSummaryButton).toBeDisabled()

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')
  expect(orderSummaryButton).toBeEnabled()

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '0')
  expect(orderSummaryButton).toBeDisabled()
})
