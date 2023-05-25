import { render, screen, waitFor } from '../../test-utils/testing-library-utils'
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
