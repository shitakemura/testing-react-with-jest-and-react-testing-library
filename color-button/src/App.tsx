import { useState } from 'react'

// eslint-disable-next-line
export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [buttonColor, setButtonColor] = useState<
    'MediumVioletRed' | 'MidnightBlue'
  >('MediumVioletRed')
  const [disabled, setDisabled] = useState(false)

  const newButtonColor =
    buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'
  const changeButtonColor = () => setButtonColor(newButtonColor)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(event.target.checked)
  }

  return (
    <div>
      <h1>Color Button</h1>
      <div>
        <button
          style={{
            backgroundColor: disabled ? 'gray' : buttonColor,
          }}
          onClick={changeButtonColor}
          disabled={disabled}
        >
          {`Change to ${replaceCamelWithSpaces(newButtonColor)}`}
        </button>
      </div>
      <label>
        <input
          type="checkbox"
          defaultChecked={disabled}
          onChange={handleOnChange}
        />
        Disable button
      </label>
    </div>
  )
}

export default App
