import productService from "../../services/Product.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader/Loader"



const ProductDetailPage = () => {

    const [product, setProduct] = useState(null)

    const { product_id } = useParams()

    const [isLoading, setIsLoading] = useState(true)

    const loadProduct = () => {
        productService
            .getOneProduct(product_id)
            .then(({ data }) => {
                setProduct(data)
                setIsLoading(false)
            }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadProduct()
    }, [])

    if (isLoading) {
        return (<Loader />)
    }

    const { name, description, image, owner, state, type } = product

    return (

        <Container>


            <h1 className="mb-4">Detalles de {name}</h1>
            <hr />

            <Row>

                <Col md={{ span: 6, offset: 1 }}>
                    <h3>Donado por: <Link to={`/usuarios/perfil/${owner._id}`}>{owner.username}</Link></h3>
                    <p>Descripcion: {description}</p>
                    <p>{type}</p>
                    <p>{state}</p>
                    <hr />

                    <Link to="/productos">
                        <Button as="div" variant="dark">Volver a la lista </Button>
                    </Link>

                </Col>

                <Col md={{ span: 4 }}>
                    <img src={image} style={{ width: '100%' }} />
                </Col>

            </Row>


        </Container>
    )
}

export default ProductDetailPage