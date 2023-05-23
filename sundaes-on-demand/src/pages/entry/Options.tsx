import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { OptionItem, OptionType } from '../../types/OptionType'
import { ScoopOption } from './ScoopOption'
import { ToppingOption } from './ToppingOption'

type OptionsProps = {
  optionType: OptionType
}

export function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<OptionItem[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get<OptionItem[]>(
          `http://localhost:3030/${optionType}`
        )
        setItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOptions()
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}
