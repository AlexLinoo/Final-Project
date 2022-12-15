import './AssociationDetailPage.css'
import associationService from "../../services/Association.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import ProductList from "../../components/ProductList/ProductList"
import { Avatar } from '@nextui-org/react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';



const AssociationDetailPage = () => {

    const [association, setAssociation] = useState(null)



    const { association_id } = useParams()

    const [isLoading, setIsLoading] = useState(true)



    const getAssociation = (association_id) => {

        setIsLoading(true)

        associationService
            .getOneAssociation(association_id)
            .then(({ data }) => {
                setAssociation(data)
                setIsLoading(false)

            })
            .catch(err => console.log(err))
    }


    useEffect(() => {

        getAssociation(association_id)


    }, [])

    if (isLoading) {
        return (<Loader />)
    }

    const { name, description, image, address, needs, children, owner, donated } = association

    const donations = donated.map(elm => elm)


    return (

        <Container>



            <h1 className="mb-4">{name}</h1>

            <Row>


                <Col md={{ span: 6, offset: 1 }}>
<<<<<<< HEAD
                    <h3>Especificaciones</h3>
                    <p>Persona de contacto: <Link to={`/usuarios/perfil/${owner._id}`}>{owner.username}</Link></p>
                    <p>email: {owner.email}</p>
                    <img src={owner.profileImage} alt="" />
                    <p>{description}</p>
                    {needs.ropa && <Card.Text>ropa</Card.Text>}
                    {needs.juguetes && <Card.Text>juguetes</Card.Text>}
                    {needs.material_escolar && <Card.Text>material escolar</Card.Text>}
                    {needs.otros && <Card.Text>otros</Card.Text>}
                    <p>Niños: {children}</p>
                    <p>Dirección: {address}</p>
                    <hr />

                    <Link to="/productos">
                        <Button as="div" variant="dark">Volver a la lista </Button>
                    </Link>
=======
                    <Card className="asosDetail" style={{ width: '35rem' }}>

                        <Card.Body>
                            <Card.Title>Persona de Contacto: <Link to={`/usuarios/perfil/${owner._id}`}>{owner.username}</Link> </Card.Title>
                            <Avatar className='avatar'
                                src={owner.profileImage}
                                size="lg"
                            />
                            <Card.Title className='mt-2'>Sobre nuestra Asociación:</Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>
                            <Card.Title>Necesidades:</Card.Title>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Ropa  {needs.ropa && <CheckBoxIcon />}</ListGroup.Item>
                            <ListGroup.Item>Juguetes  {needs.juguetes && <CheckBoxIcon />}</ListGroup.Item>
                            <ListGroup.Item>Material Escolar  {needs.material_escolar && <CheckBoxIcon />}</ListGroup.Item>
                            <ListGroup.Item>Otros {needs.otros && <CheckBoxIcon />}</ListGroup.Item>
                        </ListGroup>
                    </Card>
>>>>>>> 116a9c2a56a9f103393b0345ef7ef57b0cc5c3a2
                </Col>

                <Col md={{ span: 4 }}>
                    <img className="asosDetailImage" src={image} style={{ width: '100%' }} />
                </Col>
                <Col>
                    <h1>Productos Donados</h1>

                    {!donations ? <Loader /> : <ProductList products={donations} refreshProducts={getAssociation} />}
                </Col>
            </Row>


        </Container >
    )
}

export default AssociationDetailPage





