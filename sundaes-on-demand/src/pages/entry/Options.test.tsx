import { render, screen } from '../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { Options } from './Options'

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />)

  // find images
  const scoopImages = (await screen.findAllByRole('img', {
    name: /scoop$/i,
  })) as HTMLImageElement[]
  expect(scoopImages).toHaveLength(2)

  // confirm alt text of images
  const altTexts = scoopImages.map((image) => image.alt)
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />)

  const toppingImages = (await screen.findAllByRole('img', {
    name: /topping$/i,
  })) as HTMLImageElement[]
  expect(toppingImages).toHaveLength(3)

  const altTexts = toppingImages.map((image) => image.alt)
  expect(altTexts).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '2.5')
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '100')
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '-1')
  expect(scoopsSubtotal).toHaveTextContent('0.00')
})
