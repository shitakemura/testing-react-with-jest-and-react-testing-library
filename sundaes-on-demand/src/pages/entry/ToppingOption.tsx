import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { OptionItem } from '../../types'
import { useOrderDetails } from '../../contexts/OrderDetails'

export function ToppingOption({ name, imagePath }: OptionItem) {
  const { updateItemCount } = useOrderDetails()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemCount = event.target.checked ? 1 : 0
    updateItemCount(name, itemCount, 'toppings')
  }

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  )
}
