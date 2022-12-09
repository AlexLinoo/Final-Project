import './ProductCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import productService from '../../services/Product.service'
import { Modal } from 'react-bootstrap'
import EditProductForm from '../EditProductForm/EditProductForm'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'



const ProductCard = ({ name, image, description, _id, type, state, owner }) => {

    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState()

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        loadProducts()
        closeModal()
    }

    const navigate = useNavigate()

    const loadProducts = () => {
        productService
            .getProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

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
                    {user && <Button onClick={openModal} variant="dark" size="sm">editar Nuevo Producto</Button>}
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProductForm fireFinalActions={fireFinalActions} product={{ name, image, description, _id, type, state, owner }} />
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ProductCard