import productService from "../../services/Product.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { Avatar } from '@nextui-org/react'



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



            <h1 className="mb-4">{name}</h1>

            <Row>


                <Col md={{ span: 6, offset: 1 }}>
                    <Card className="asosDetail" style={{ width: '35rem' }}>

                        <Card.Body>
                            <Card.Title>Donado por: <Link to={`/usuarios/perfil/${owner._id}`}>{owner.username}</Link> </Card.Title>
                            <Avatar className='avatar'
                                src={owner.profileImage}
                                size="lg"
                            />
                            <Card.Title className='mt-2'>{description}</Card.Title>
                            <hr />
                            <Card.Title>Tipo:</Card.Title>
                            <Card.Text>{type}</Card.Text>
                            <Card.Title>Estado:</Card.Title>
                            <Card.Text>{state}</Card.Text>
                        </Card.Body>

                    </Card>
                </Col>

                <Col md={{ span: 4 }}>
                    <img className="asosDetailImage" src={image} style={{ width: '100%' }} />
                </Col>

            </Row>
            <div className="mt-5 back p-5">
                <Link to="/productos" >
                    <Button as="div" className="p-3" variant="outline-dark">Volver a Productos</Button>
                </Link>
            </div>



            {/* <h1 className="mb-4">Detalles de {name}</h1>
            <hr /> */}

            {/* <Row>

                <Col md={{ span: 6, offset: 1 }}>
                    <h3>Donado por: <Link to={`/usuarios/perfil/${owner._id}`}>{owner.username}</Link></h3>
                    <p>Descripcion: {description}</p>
                    <p>{type}</p>
                    <p>{state}</p>
                    <hr />

                   

                </Col>

                <Col md={{ span: 4 }}>
                    <img src={image} style={{ width: '100%' }} />
                </Col>

            </Row> */}


        </Container>
    )
}

export default ProductDetailPage