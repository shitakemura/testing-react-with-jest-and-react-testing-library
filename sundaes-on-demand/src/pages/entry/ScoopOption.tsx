import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { OptionItem } from '../../types/OptionType'
import { useOrderDetails } from '../../contexts/OrderDetails'

export function ScoopOption({ name, imagePath }: OptionItem) {
  const { updateItemCount } = useOrderDetails()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, Number(event.target.value), 'scoops')
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
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
