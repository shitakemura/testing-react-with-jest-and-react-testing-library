import { render, screen, logRoles, fireEvent } from '@testing-library/react'
import App from './App'

test('header exists', () => {
  const { container } = render(<App />)
  logRoles(container)

  const header = screen.getByRole('heading', { name: 'Color Button' })

  expect(header).toBeInTheDocument()
})

test('button has correct initial color, and updates when clicked', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  expect(colorButton).toHaveStyle({ 'background-color': 'red' })

  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({ 'background-color': 'blue' })
  expect(colorButton).toHaveTextContent('Change to red')
})

test('initial conditions', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  expect(colorButton).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()

  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
})
