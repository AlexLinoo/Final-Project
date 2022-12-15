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



            <h1 className="mb-5 asosName mt-3">{name}</h1>

            <Row>


                <Col md={{ span: 6, offset: 1 }}>
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
                </Col>

                <Col md={{ span: 4 }}>
                    <img className="asosDetailImage" src={image} style={{ width: '100%' }} />
                </Col>
                <Col>
                    <h1 className='mt-5 mb-4'>Productos Donados</h1>

                    {!donations ? <Loader /> : <ProductList products={donations} refreshProducts={getAssociation} />}
                </Col>
            </Row>


        </Container >
    )
}

export default AssociationDetailPage





