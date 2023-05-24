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
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2 style={{ marginTop: '24px' }}>
        Grand total: {formatCurrency(totals.scoops + totals.toppings)}
      </h2>
      <button type="button" onClick={goToSummary}>
        Go to summary
      </button>
    </div>
  )
}
