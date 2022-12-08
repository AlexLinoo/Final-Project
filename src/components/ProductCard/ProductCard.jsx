import './ProductCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import productService from '../../services/Product.service'


const ProductCard = ({ name, image, description, _id, type, state, owner }) => {

    const navigate = useNavigate()

    const deleteProduct = () => {

        productService

            .deleteProduct(_id)
            .then(() => navigate("/productos"))
            .catch(err => (err))
    }

    return (

        <div key={_id}>
            <Card className="mb-4 ProductCard">
                <Card.Img variant="top" src={image} alt="producto" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Donado por : {owner.username}</Card.Text>
                    <Card.Text>Descripción: {description}</Card.Text>
                    <Card.Text>Tipo: {type}</Card.Text>
                    <Card.Text>Estado: {state}</Card.Text>
                    <Link to={`/productos/detalles/${_id}`}>
                        <div className="d-grid">
                            <Button variant="dark" size="sm">Ver detalles</Button>
                        </div>
                        <div className="d-grid mt-3">
                            <Button variant="danger" size="sm" onClick={deleteProduct}>Borrar Producto</Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProductCard