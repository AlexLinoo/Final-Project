import './ProductCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'



const ProductCard = ({ name, image, description, _id, type, state, owner }) => {


    return (
        <div key={_id}>
            <Card className="mb-4 ProductCard">
                <Card.Img variant="top" src={image} alt="producto" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Donado por : {owner}</Card.Text>
                    <Card.Text>Descripción: {description}</Card.Text>
                    <Card.Text>Tipo: {type}</Card.Text>
                    <Card.Text>Estado: {state}</Card.Text>
                    <Link to={`/productos/detalles/${_id}`}>
                        <div className="d-grid">
                            <Button variant="dark" size="sm">Ver detalles</Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}
export default ProductCard