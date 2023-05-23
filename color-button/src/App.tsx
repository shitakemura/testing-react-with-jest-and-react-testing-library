import { useState } from 'react'

function App() {
  const [buttonColor, setButtonColor] = useState<'red' | 'blue'>('red')
  const [disabled, setDisabled] = useState(false)

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'
  const changeButtonColor = () => setButtonColor(newButtonColor)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(event.target.checked)
  }

  return (
    <div>
      <h1>Color Button</h1>
      <div>
        <button
          style={{ backgroundColor: disabled ? 'gray' : buttonColor }}
          onClick={changeButtonColor}
          disabled={disabled}
        >
          {`Change to ${newButtonColor}`}
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
