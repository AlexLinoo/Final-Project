import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import productService from "../../services/Product.service";
import ProductList from "../../components/ProductList/ProductList";
import userService from "../../services/user.service";
import { Container, Row, Col, Button } from 'react-bootstrap'


const ProfilePage = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState({})

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()

    const [favProducts, setFavProducts] = useState()


    const { email, _id, } = user

    const getFavProducts = () => {
        productService
            .getProductFav()
            .then(({ data }) => setFavProducts(data))
            .catch(err => console.log(err))

    }

    const loadUserProducts = () => {

        productService

            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    const deleteUser = () => {
        userService
            .deleteOneUser(_id)
            .then(() => navigate("/usuarios"))
            .catch(err => (err))
    }

    const getOneUser = () => {
        userService
            .getOneUser(_id)
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        loadUserProducts()
        getFavProducts()
        getOneUser()

    }, [])

    const { username, profileImage } = users


    return (
        <>
            <h1>Tu Perfil</h1>
            <Container>
                <Row>
                    <Col>

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={profileImage} />
                            <Card.Body>
                                <Card.Title>{username}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{email}</ListGroup.Item>
                                <ListGroup.Item></ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <div className="d-grid mt-3">
                                    <Button variant="danger" size="sm" onClick={deleteUser}>Borrar Perfil</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="mt-5">
                            {!products ? <h1>Cargando productos</h1> : <ProductList products={products} refreshProducts={loadUserProducts} />}
                        </div>
                    </Col>
                    <Col>
                        <h1>Favoritos</h1>

                        {!favProducts ? <h1>Cargando productos</h1> : <ProductList products={favProducts} refreshProducts={getFavProducts} />}
                    </Col>
                </Row>
            </Container>
        </>
    )


}
export default ProfilePage