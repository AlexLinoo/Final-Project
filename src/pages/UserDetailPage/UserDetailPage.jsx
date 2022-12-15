import './UserDetailPage.css'
import userService from "../../services/user.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import EmailIcon from '@mui/icons-material/Email';
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
                        <Row>

                            <Col md={{ span: 4 }}>
                                <img src={profileImage} className="userPic mb-3 mt-3" style={{ width: '50%' }} />

                                <Card>
                                    <Card.Header>{username}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <EmailIcon /> {email}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col md={{ span: 6, offset: 1 }} className='imageDoning'>
                                <img src='https://img.freepik.com/free-vector/illustration-donation-support-icons_53876-6149.jpg?w=2000' alt="hola" />

                            </Col>

                            <hr className='mt-4' />
                            <h1 className='userProductsTitle'>Productos de {username}</h1>

                            <br />
                            <div className="mt-2">
                                {!products ? <Loader /> : <ProductList products={products} refreshProducts={loadUserProducts} />}
                            </div>
                        </Row>
                    </>
            }

        </Container >
    )
}

export default UserDetailPage