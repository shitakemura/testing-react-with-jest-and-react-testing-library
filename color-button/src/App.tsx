import { useState } from 'react'

function App() {
  const [buttonColor, setButtonColor] = useState<'red' | 'blue'>('red')

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'
  const changeButtonColor = () => setButtonColor(newButtonColor)

  return (
    <div>
      <h1>Color Button</h1>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={changeButtonColor}
      >
        {`Change to ${newButtonColor}`}
      </button>
      <input type="checkbox" />
    </div>
  )
}

export default App
