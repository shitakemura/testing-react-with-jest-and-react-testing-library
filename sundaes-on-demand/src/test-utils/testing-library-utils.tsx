// MEMO: https://testing-library.com/docs/react-testing-library/setup/#custom-render
import { RenderOptions, render } from '@testing-library/react'
import { OrderDetailsProvider } from '../contexts/OrderDetails'

const renderWithContext = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: OrderDetailsProvider, ...options })

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

export { renderWithContext as render }
