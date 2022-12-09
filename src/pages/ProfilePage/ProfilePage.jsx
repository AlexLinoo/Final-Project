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
        </>
    )


}
export default ProfilePage