import userService from "../../services/user.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import productService from "../../services/Product.service"
import ProductList from "../../components/ProductList/ProductList"
import Loader from "../../components/Loader/Loader"


const UserDetailPage = () => {

    const [users, setUsers] = useState({})
    const [products, setProducts] = useState()

    const { user_id } = useParams()

    const loadUserProducts = () => {

        productService

            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadUserProducts()
        userService
            .getOneUser(user_id)
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))

    }, [])


    const { username, profileImage } = users

    return (

        <Container>
            {
                !users
                    ?
                    <Loader />
                    :
                    <>
                        <h1 className="mb-4">Peril de {username}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6, offset: 1 }}>
                                <p>DETALLES DEL USUARIO AQUI(productos)</p>
                                <hr />

                                <Link to="/">
                                    <Button as="div" variant="dark">Volver Inicio</Button>
                                </Link>
                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={profileImage} style={{ width: '100%' }} />
                            </Col>
                            <hr />

                            {!products ? <Loader /> : <ProductList products={products} refreshProducts={loadUserProducts} />}

                        </Row>
                    </>
            }

        </Container>
    )
}

export default UserDetailPage