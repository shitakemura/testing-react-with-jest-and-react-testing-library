import Container from 'react-bootstrap/Container'
import { OrderEntry } from './pages/entry/OrderEntry'
import { OrderDetailsProvider } from './contexts/OrderDetails'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page and entry page need provider */}
    </Container>
  )
}

export default App
