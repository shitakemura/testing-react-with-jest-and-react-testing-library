import { render, screen } from '@testing-library/react'
import App from './App'

test('renders correctly', () => {
  render(<App />)

  const header = screen.getByRole('heading', { name: 'Sandaes on demand' })
  expect(header).toBeInTheDocument()
})
