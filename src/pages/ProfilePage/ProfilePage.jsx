import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import productService from "../../services/Product.service";
import ProductList from "../../components/ProductList/ProductList";


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()


    const { username, profileImage, email } = user

    const loadUserProducts = () => {

        productService

            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        loadUserProducts()

    }, [])


    return (
        <>
            <h1>Tu Perfil</h1>
            <hr />
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profileImage} alt="profilepic" />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{email}</ListGroup.Item>
                </ListGroup>
            </Card>
            <div className="mt-5">
                <h2>Tus Productos</h2>
                <hr />
                {!products ? <h1>Cargando productos</h1> : <ProductList products={products} refreshProducts={loadUserProducts} />}
            </div>
        </>
    )


}
export default ProfilePage