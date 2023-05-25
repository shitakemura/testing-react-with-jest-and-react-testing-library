import { rest } from 'msw'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const handlers = [
  rest.get('http://localhost:3030/scoops', (_, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  }),
  rest.get('http://localhost:3030/toppings', (_, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    )
  }),
  rest.post('http://localhost:3030/order', async (_, res, ctx) => {
    await sleep(100)
    return res(ctx.json({ orderNumber: 12345678 }))
  }),
]
