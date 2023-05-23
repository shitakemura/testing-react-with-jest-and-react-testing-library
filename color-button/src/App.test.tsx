import { render, screen, logRoles, fireEvent } from '@testing-library/react'
import App, { replaceCamelWithSpaces } from './App'

test('header exists', () => {
  const { container } = render(<App />)
  logRoles(container)

  const header = screen.getByRole('heading', { name: 'Color Button' })

  expect(header).toBeInTheDocument()
})

test('button has correct initial color, and updates when clicked', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  expect(colorButton).toHaveStyle({ 'background-color': 'MediumVioletRed' })

  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({ 'background-color': 'MidnightBlue' })
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  expect(colorButton).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()

  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
})

test('checkbox disables button on first click and enables on second click', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  expect(colorButton).toBeEnabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('Disabled button has gray background and reverts to Medium Violet Red', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'MediumVioletRed' })
})

test('Clicked disabled button has gray background and reverts to Midnight Blue', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(colorButton)

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ 'background-color': 'MidnightBlue' })
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
