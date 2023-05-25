import { SummaryForm } from './SummaryForm'
import { useOrderDetailsState } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'

type OrderSummaryProps = {
  goToConfirmation: () => void
}

export function OrderSummary({ goToConfirmation }: OrderSummaryProps) {
  const { totals, optionCounts } = useOrderDetailsState()

  const scoopArray = Object.entries(optionCounts.scoops) // [["chocolate, 2"], ["vanilla", 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingArray = Object.keys(optionCounts.toppings) // ["M&Ms", "Gummi bears"]
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>)

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm goToConfirmation={goToConfirmation} />
    </div>
  )
}
