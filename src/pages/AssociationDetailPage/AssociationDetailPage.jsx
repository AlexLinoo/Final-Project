import associationService from "../../services/Association.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"



const AssociationDetailPage = () => {

    const [association, setAssociation] = useState({})

    const { association_id } = useParams()

    useEffect(() => {
        associationService
            .getOneAssociation(association_id)
            .then(({ data }) => setAssociation(data))
            .catch(err => console.log(err))
    }, [])

    const { name, description, image, address } = association

    return (
        <Container>
            {
                !association
                    ?
                    <h1>CARGANDO</h1>
                    :
                    <>
                        <h1 className="mb-4">Detalles de {name}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6, offset: 1 }}>
                                <h3>Especificaciones</h3>
                                <p>{description}</p>
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