import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { OptionItem } from '../../types'
import { useOrderDetailsDispatch } from '../../contexts/OrderDetails'
import { useState } from 'react'

export function isValidNumber(value: number): boolean {
  return value % 1 === 0
}

export function ScoopOption({ name, imagePath }: OptionItem) {
  const [isValidInput, setIsValidInput] = useState(true)
  const { updateItemCount } = useOrderDetailsDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const numberValue = Number(inputValue) ?? 0
    const valueIsValid =
      isValidNumber(numberValue) && numberValue > 0 && numberValue < 11

    setIsValidInput(valueIsValid)

    const newValue = valueIsValid ? numberValue : 0
    updateItemCount(name, newValue, 'scoops')
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs={6} style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            min={0}
            max={100}
            onChange={handleChange}
            isInvalid={!isValidInput}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
