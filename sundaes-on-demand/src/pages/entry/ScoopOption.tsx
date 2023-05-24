import Col from 'react-bootstrap/Col'
import { OptionItem } from '../../types/OptionType'

export function ScoopOption({ name, imagePath }: OptionItem) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  )
}
