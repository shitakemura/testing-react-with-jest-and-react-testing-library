import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { OptionItem, OptionType } from '../../types/OptionType'
import { ScoopOption } from './ScoopOption'
import { ToppingOption } from './ToppingOption'
import { AlertBanner } from '../../components/AlertBanner'
import { pricePerItem } from '../../constants'
import { formatCurrency } from '../../utilities'
import { useOrderDetails } from '../../contexts/OrderDetails'

type OptionsProps = {
  optionType: OptionType
}

export function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<OptionItem[]>([])
  const [error, setError] = useState<Error | null>(null)
  const { totals } = useOrderDetails()

  useEffect(() => {
    // create an abortController to attach to network request
    const controller = new AbortController()

    const fetchOptions = async () => {
      try {
        const { data } = await axios.get<OptionItem[]>(
          `http://localhost:3030/${optionType}`,
          { signal: controller.signal }
        )
        setItems(data)
      } catch (error) {
        if (error instanceof Error && error.name !== 'CanceledError') {
          setError(error)
        }
      }
    }
    fetchOptions()

    // abort axios call on component unmount
    return () => {
      controller.abort()
    }
  }, [optionType])

  if (error) return <AlertBanner />

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title =
    optionType[0].toUpperCase() + optionType.slice(1).toLocaleLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}
