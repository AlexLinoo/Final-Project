import userService from "../../services/user.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

import productService from "../../services/Product.service"
import ProductList from "../../components/ProductList/ProductList"
import Loader from "../../components/Loader/Loader"


const UserDetailPage = () => {

    const [users, setUsers] = useState({})
    const [products, setProducts] = useState()

    const { user_id } = useParams()

    const loadUserProducts = () => {

        productService

            .getOneUserProducts(user_id)
            .then(({ data }) => {
                setProducts(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        userService
            .getOneUser(user_id)
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
        loadUserProducts()

    }, [])


    const { username, profileImage, email } = users

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
                                <p>email: {email}</p>
                                <hr />

                                {/* <Link to="/">
                                    <Button as="div" variant="dark">Volver Inicio</Button>
                                </Link> */}
                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={profileImage} style={{ width: '100%' }} />
                            </Col>
                            <hr />
                            <h1>Productos de {username}</h1>

                            <br />
                            <div className="mt-5">
                                {!products ? <Loader /> : <ProductList products={products} refreshProducts={loadUserProducts} />}
                            </div>
                        </Row>
                    </>
            }

        </Container>
    )
}

export default UserDetailPage