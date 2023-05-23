import { render, screen } from '@testing-library/react'
import App from './App'

test('render app header', () => {
  render(<App />)
  const headerElement = screen.getByRole('heading', { name: /color button/i })
  expect(headerElement).toBeInTheDocument()
})
