import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOrderDetailsDispatch } from '../../contexts/OrderDetails'
import { Order } from '../../types'

type OrderConfirmationProps = {
  goToEntry: () => void
}

export function OrderConfirmation({ goToEntry }: OrderConfirmationProps) {
  const { resetOrder } = useOrderDetailsDispatch()
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const [error, setError] = useState<Error | null>(null)

  console.log(error)

  const handleClick = () => {
    resetOrder()
    goToEntry()
  }

  useEffect(() => {
    const postOrder = async () => {
      try {
        const { data } = await axios.post<Order>('http://localhost:3030/order')
        setOrderNumber(data.orderNumber)
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        }
      }
    }

    postOrder()
  }, [])

  if (!orderNumber) return <div>Loading</div>

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: '25%' }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <button type="button" onClick={handleClick}>
        Create new order
      </button>
    </div>
  )
}
