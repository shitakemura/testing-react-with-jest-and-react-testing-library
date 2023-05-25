// MEMO: https://testing-library.com/docs/react-testing-library/setup/#custom-render
import { RenderOptions, render } from '@testing-library/react'
import { OrderDetailsProviderContainer } from '../contexts/OrderDetails'

const renderWithContext = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: OrderDetailsProviderContainer, ...options })

export * from '@testing-library/react'

export { renderWithContext as render }
