import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import productService from "../../services/Product.service";
import ProductList from "../../components/ProductList/ProductList";
import Loader from '../../components/Loader/Loader'
import userService from "../../services/user.service";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmailIcon from '@mui/icons-material/Email';
import './ProfilePage.css'
import { Container, Row, Col, Button } from 'react-bootstrap'


const ProfilePage = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState({})

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()

    const [favProducts, setFavProducts] = useState()


    const { email, _id, } = user


    const loadUserProducts = () => {

        productService

            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    const getUserFavs = () => {
        productService
            .getUserFavs()
            .then(({ data }) => {
                const ids = data.favorites.map(elm => elm)
                setFavProducts(ids)

            })
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
        getUserFavs()
        getOneUser()

    }, [])

    const { username, profileImage } = users


    return (
        <>

            <Container>


                <Row>


                    <Col md={{ span: 2 }} className="profile">
                        <div className="mt-3">
                            <h1 className="yourProfile" >Tu Perfil</h1>
                            <img className="profileImage" src={profileImage} alt="" />
                            <h3>{username}</h3>
                            <p className="email"><EmailIcon /> {email}</p>
                            <div className="div-delete">
                                <Button variant="danger" className="delete" size="lg" onClick={deleteUser}><DeleteForeverIcon sx={{ fontSize: 30 }} />Borrar tu perfil</Button>
                            </div>
                        </div>
                    </Col>
                    <Col md={{ span: 5, offset: 2 }}>
                        <h1 className="favourite">Favoritos</h1>

                        {!favProducts ? <Loader /> : <ProductList classname products={favProducts} refreshProducts={getUserFavs} />}
                    </Col>
                </Row>
                <h2 className="yourProducts">Tus Productos</h2>

                <div>
                    {!products ? <h1>Cargando productos</h1> : <ProductList products={products} refreshProducts={loadUserProducts} />}
                </div>
            </Container>
        </>
    )


}
export default ProfilePage