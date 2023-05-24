type OrderConfirmationProps = {
  goToEntry: () => void
}

export function OrderConfirmation({ goToEntry }: OrderConfirmationProps) {
  return (
    <div>
      <h1>Order Confirmation</h1>
      <button type="button" onClick={goToEntry}>
        back
      </button>
    </div>
  )
}
