import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  const user = userEvent.setup()

  const { unmount } = render(<App />)

  // 1: OrderEntry Page
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')

  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '2')

  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  await user.click(cherriesInput)

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  })
  await user.click(orderSummaryButton)

  // 2: OrderSummary Page
  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByText('Scoops: $6.00')
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.getByText('Toppings: $1.50')
  expect(toppingsHeading).toBeInTheDocument()

  // check summary option item
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  // alternatively
  // const optionItems = screen.getAllByRole('listitem')
  // const optionItemsText = optionItems.map((item) => item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries'])

  // accept terms and conditions and click button to confirm order
  const tsCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  })
  await user.click(tsCheckbox)

  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  })
  await user.click(confirmOrderButton)

  // 3: OrderConfirmation Page\
  // Expect "loading to show"
  const loading = screen.getByText(/loading/i)
  expect(loading).toBeInTheDocument()

  // check confirmation page text
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  })
  expect(thankYouHeader).toBeInTheDocument()

  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading')
  expect(notLoading).not.toBeInTheDocument()

  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()
  expect(orderNumber).toHaveTextContent('12345678')

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: 'Create new order',
  })
  await user.click(newOrderButton)

  // check that scoop and toppings subtotals have been reset
  const scoopsSubTotal = await screen.findByText('Scoops total: $0.00')
  expect(scoopsSubTotal).toBeInTheDocument()

  const toppingsSubTotal = await screen.findByText('Toppings total: $0.00')
  expect(toppingsSubTotal).toBeInTheDocument()

  const grandTotal = screen.getByText('Grand total: $0.00')
  expect(grandTotal).toBeInTheDocument()

  // unmount the component to trigger cleanup and avoid "not wrapped in act()" error
  unmount()
})
