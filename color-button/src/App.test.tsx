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

test('checkbox disables button on first click and enables on second click', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  expect(colorButton).toBeEnabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('Disabled button has gray background and reverts to red', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'red' })
})

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(colorButton)

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'blue' })
})
