import Container from 'react-bootstrap/Container'
import { OrderEntry } from './pages/entry/OrderEntry'
import { OrderSummary } from './pages/summary/OrderSummary'
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation'
import { OrderDetailsProviderContainer } from './contexts/OrderDetails'
import { useState } from 'react'
import { OrderPhase } from './types'

function App() {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>('inProgress')
  const goToSummary = () => setOrderPhase('review')
  const goToConfirmation = () => setOrderPhase('completed')
  const goToEntry = () => setOrderPhase('inProgress')

  return (
    <OrderDetailsProviderContainer>
      <Container>
        {orderPhase === 'inProgress' ? (
          <OrderEntry goToSummary={goToSummary} />
        ) : orderPhase === 'review' ? (
          <OrderSummary goToConfirmation={goToConfirmation} />
        ) : (
          <OrderConfirmation goToEntry={goToEntry} />
        )}
      </Container>
    </OrderDetailsProviderContainer>
  )
}

export default App
