import userService from "../../services/user.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"



const UserDetailPage = () => {

    const [users, setUsers] = useState({})

    const { user_id } = useParams()

    useEffect(() => {
        userService
            .getOneUser(user_id)
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }, [])

    const { username, image } = users

    return (
        <Container>
            {
                !users
                    ?
                    <h1>CARGANDO</h1>
                    :
                    <>
                        <h1 className="mb-4">Peril de {username}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6, offset: 1 }}>
                                <h3>Especificaciones</h3>
                                <p>DETALLES DEL USUARIO AQUI(productos)</p>
                                <hr />

                                <Link to="/">
                                    <Button as="div" variant="dark">Volver Inicio</Button>
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
export default UserDetailPage