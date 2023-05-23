import { OptionItem } from '../../types/OptionType'

export function ToppingOption({ name, imagePath }: OptionItem) {
  return (
    <>
      <div>{name}</div>
      <div>{imagePath}</div>
    </>
  )
}
