import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import productService from "../../services/Product.service";
import ProductList from "../../components/ProductList/ProductList";
import { Container, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()

    const [favProducts, setFavProducts] = useState()


    const { username, profileImage, email } = user

    const getUserFavs = () => {
        productService
            .getUserFavs()
            .then(({ data }) => {
                const ids = data.favorites.map(el => el._id)
                setFavProducts(ids)
            })
            .catch(err => console.log(err))

    }
    const loadUserProducts = () => {

        productService

            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        loadUserProducts()
        getUserFavs()

    }, [])



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
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                        <div className="mt-5">
                            {!products ? <h1>Cargando productos</h1> : <ProductList products={products} refreshProducts={loadUserProducts} />}
                        </div>
                    </Col>
                    <Col>
                        <h1>Favoritos</h1>

                        {!favProducts ? <Loader /> : <ProductList products={favProducts} refreshProducts={getUserFavs} />}
                    </Col>
                </Row>
            </Container>
        </>
    )


}
export default ProfilePage