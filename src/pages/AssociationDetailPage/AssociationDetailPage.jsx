import associationService from "../../services/Association.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import userService from "../../services/user.service"


const AssociationDetailPage = () => {

    const [association, setAssociation] = useState({})

    const [users, setUsers] = useState({})

    const { association_id } = useParams()

    const { name, description, image, address, needs, children, owner } = association

    const getOneUser = () => {

        userService
            .getOneUser(owner)
            .then(({ data }) => {
                setUsers({ data })
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {

        associationService
            .getOneAssociation(association_id)
            .then(({ data }) => {
                setAssociation(data)
                getOneUser()
            })
            .catch(err => console.log(err))
    }, [])



    return (

        <Container>
            {
                !association
                    ?
                    <h1>CARGANDO</h1>
                    :
                    <>
                        <h1 className="mb-4">{name}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6, offset: 1 }}>
                                <h3>Especificaciones</h3>
                                <p>Persona de contacto: {owner}</p>
                                <img src="" alt="" />
                                <p>{description}</p>
                                <p>Necesidades: {needs}</p>
                                <p>Niños: {children}</p>
                                <p>Dirección: {address}</p>
                                <hr />

                                <Link to="/productos">
                                    <Button as="div" variant="dark">Volver a la lista </Button>
                                </Link>
                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={image} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                    </>
            }
        </Container>
    )
}

export default AssociationDetailPage