import productService from "../../services/Product.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"



const ProductDetailPage = () => {

    const [product, setProduct] = useState({})

    const { product_id } = useParams()

    useEffect(() => {

        productService
            .getOneProduct(product_id)
            .then(({ data }) => setProduct(data))
            .catch(err => console.log(err))
    }, [])



    return (
        <Container>
            {
                !product
                    ?
                    <h1>CARGANDO</h1>
                    :
                    <>
                        <h1 className="mb-4">Detalles de {product.name}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6, offset: 1 }}>
                                <h3>Especificaciones</h3>
                                <p>{product.description}</p>
                                <hr />

                                <Link to="/productos">
                                    <Button as="div" variant="dark">Volver a la lista </Button>
                                </Link>
                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={product.image} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                    </>
            }
        </Container>
    )
}
export default ProductDetailPage