import { createContext, useContext, useState } from 'react'
import { Option, OptionType } from '../types'
import { pricePerItem } from '../constants'

type OptionCounts = {
  [key in OptionType]: Option
}

type OrderDetailsContextType = {
  optionCounts: OptionCounts
  totals: {
    [key in OptionType]: number
  }
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) => void
  resetOrder: () => void
}

const OrderDetails = createContext({} as OrderDetailsContextType)

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails)
  return contextValue
}

export function OrderDetailsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [optionCounts, setOptionCounts] = useState<OptionCounts>({
    scoops: {}, // example { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // example: { "Gummi Bears": 1 }
  })

  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) {
    setOptionCounts((prev) => {
      return {
        ...prev,
        [optionType]: {
          ...prev[optionType],
          [itemName]: newItemCount,
        },
      }
    })
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} })
  }

  function calculateTotal(optionType: OptionType) {
    const totalCounts = Object.values(optionCounts[optionType]).reduce(
      (total, value) => total + value,
      0
    )
    return totalCounts * pricePerItem[optionType]
  }

  const totals: { [key in OptionType]: number } = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  }

  const value = { optionCounts, totals, updateItemCount, resetOrder }
  return <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
}
