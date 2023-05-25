export type OptionType = 'scoops' | 'toppings'

export type OptionItem = {
  name: string
  imagePath: string
}

export type Option = Record<string, number>

export type OrderPhase = 'inProgress' | 'review' | 'completed'

export type Order = {
  orderNumber: number
}
