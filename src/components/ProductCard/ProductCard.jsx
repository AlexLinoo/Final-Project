import './ProductCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useLocation } from 'react-router-dom'
import productService from '../../services/Product.service'
import { Modal } from 'react-bootstrap'
import EditProductForm from '../EditProductForm/EditProductForm'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useEffect } from 'react'
import associationService from '../../services/Association.service'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';




const ProductCard = ({ name, image, description, _id, type, state, owner, status, refreshProducts }) => {

    const [userFavs, setUserFavs] = useState([])
    const { user } = useContext(AuthContext)

    const product = {
        name,
        image,
        description,
        _id,
        type,
        state,
        owner,
        status
    }


    const location = useLocation();
    const { pathname } = location
    const [showModal, setShowModal] = useState(false)


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)


    const likeProduct = () => {
        productService
            .getProductFav(_id)
            .then(() => getUserFavs())
            .catch(err => (err))
    }
    const [isAsosOwner, setIsAsosOwner] = useState(null)
    const [Association, setAssociation] = useState(null)
    let donatedProducts = undefined

    const getAssociatons = () => {

        associationService
            .getAssociatons()
            .then(({ data }) => {
                let AsosOwners = data.map(el => {
                    return ({ owner: el.owner._id, id: el._id, donated: el.donated })
                })

                AsosOwners.some(elm => {

                    if (elm.owner === user._id) {
                        setIsAsosOwner({
                            id: elm.id,
                            donated: elm.donated
                        })

                    }
                })
            })
            .catch(err => (err))
    }


    const apply = () => {
        productService
            .applyForProduct(_id, isAsosOwner)
            .then(() => {
                fireFinalActions()

            })
            .catch(err => (err))
    }

    const unLikeProduct = () => {
        productService
            .quitProductFav(_id)
            .then(() => getUserFavs())
            .catch(err => (err))
    }

    const fireFinalActions = () => {
        refreshProducts()
        closeModal()
    }

    const deleteProduct = () => {
        productService
            .deleteProduct(_id)
            .then(() => fireFinalActions())
            .catch(err => (err))
    }

    const getUserFavs = () => {
        productService
            .getUserFavs()
            .then(({ data }) => {
                const ids = data.favorites.map(el => el._id)
                setUserFavs(ids)
            })
            .catch(err => (err))

    }

    useEffect(() => {
        getUserFavs()
        getAssociatons()
    }, [])

    return (

        <div key={_id}>
            <Card className="mb-4 ProductCard">
                <Card.Img variant="top" src={image} alt="producto" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Donado por : {owner?.username}</Card.Text>
                    <Card.Text>Tipo: {type}</Card.Text>
                    <Card.Text>Estado: {state}</Card.Text>
                    <Link to={`/productos/detalles/${_id}`}>
                        <div className="d-grid">
                            <Button variant="dark" size="sm">Ver detalles</Button>
                        </div>
                    </Link>
                    {isAsosOwner &&
                        <div className="d-grid mt-3">
                            <Button variant="success" size="sm" onClick={apply}>Solicitar</Button>
                        </div>

                    }
                    {
                        !userFavs.includes(product._id) ?

                            <div className="d-grid mt-3">
                                <Button variant="danger" size="sm" onClick={likeProduct}>☆</Button>
                            </div>
                            :
                            <div className="d-grid mt-3">
                                <Button variant="danger" size="sm" onClick={unLikeProduct}>★</Button>
                            </div>
                    }

                    {
                        owner?._id === user?._id &&

                        <>
                            <div className="d-grid mt-3">
                                <Button variant="danger" size="sm" onClick={deleteProduct}>Borrar Producto</Button>
                            </div>
                            {user && <Button onClick={openModal} variant="dark" size="sm">editar Nuevo Producto</Button>}

                        </>
                    }
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