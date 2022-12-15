import './ProductCard.css'
import Button from 'react-bootstrap/Button'
/* import Card from 'react-bootstrap/Card' */
import { Link } from 'react-router-dom'
import productService from '../../services/Product.service'
import { Modal } from 'react-bootstrap'
import EditProductForm from '../EditProductForm/EditProductForm'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useEffect } from 'react'
import associationService from '../../services/Association.service'
import { Card, Grid, Row, Text } from "@nextui-org/react";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';









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

    const getAssociatons = () => {

        associationService
            .getAssociatons()
            .then(({ data }) => {
                let AsosOwners = data.map(el => {
                    return ({ owner: el.owner._id, id: el._id, donated: el.donated })
                })

                AsosOwners.some(elm => {

                    if (elm.owner === user._id) {
                        setIsAsosOwner(elm.id)
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

        <div /* key={_id} */>
            {/*       <Card className="mb-4 ProductCard">
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
            </Card> */}
            <Grid.Container gap={2} justify="flex-start">

                <Grid key={_id}>
                    <Card className='productCard' isPressable css={{ w: 330, h: 330 }}>
                        <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                src={image}
                                objectFit="cover"
                                width="100%"
                                height={300}
                                alt="product"
                            />
                            <Text b>{name}</Text>
                        </Card.Body>
                        <Card.Footer css={{ justifyItems: "flex-start" }}>
                            <Row wrap="wrap" justify="space-between" align="center">
                                <Link to={`/productos/detalles/${_id}`}>
                                    <div>
                                        <Button className='details' variant="dark" size="sm"><AddCircleIcon /></Button>
                                    </div>
                                </Link>
                                {!userFavs.includes(product._id) ?

                                    <div >
                                        <Button className='like' variant="danger" size="sm" onClick={likeProduct}><FavoriteBorderIcon /></Button>
                                    </div>
                                    :
                                    <div >
                                        <Button className='like' variant="danger" size="sm" onClick={unLikeProduct}><FavoriteIcon /></Button>
                                    </div>
                                }
                                {owner?._id === user?._id &&

                                    <>
                                        <div>
                                            <Button className="delete" variant="danger" size="sm" onClick={deleteProduct}><DeleteForeverIcon /></Button>
                                        </div>
                                        {user && <Button className='edit' onClick={openModal} variant="dark" size="sm"><BorderColorIcon /></Button>}

                                    </>
                                }
                                {isAsosOwner &&

                                    <Button className='donated' variant="success" size="sm" onClick={apply}><VolunteerActivismIcon /></Button>
                                }
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>

            </Grid.Container>



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








