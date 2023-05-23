import { Options } from './pages/entry/Options'
import { SummaryForm } from './pages/summary/SummaryForm'

function App() {
  return (
    <>
      <h1>Sandaes on demand</h1>
      <SummaryForm />
      <Options optionType="scoops" />
    </>
  )
}

export default App
