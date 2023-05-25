import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'
import { Options } from './Options'

type OrderEntryProps = {
  goToSummary: () => void
}

export function OrderEntry({ goToSummary }: OrderEntryProps) {
  const { totals } = useOrderDetails()

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <button type="button" onClick={goToSummary}>
        Order Sundae!
      </button>
    </div>
  )
}
