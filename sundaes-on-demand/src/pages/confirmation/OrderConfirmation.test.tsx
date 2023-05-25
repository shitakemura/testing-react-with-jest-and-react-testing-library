import { render, screen } from '../../test-utils/testing-library-utils'
import { rest } from 'msw'
import { server } from '../../mocks/server'
import { OrderConfirmation } from './OrderConfirmation'

test('error response from server for submitting order', async () => {
  // override mock handler
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (_, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<OrderConfirmation goToEntry={jest.fn()} />)

  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent(
    'An unexpected error occurred. Please try again later.'
  )
})
