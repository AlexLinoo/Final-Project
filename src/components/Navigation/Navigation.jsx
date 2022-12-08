
import './Navigation.css'
import { Nav, Container, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'



const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)
    return (
        <Navbar bg="dark" expand="md" variant="dark" className="mb-5">
            <Container>
                <Link to="/">
                    <Navbar.Brand as="div">Don_App</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/productos">
                            <Nav.Link as="div">Productos</Nav.Link>
                        </Link>
                        <Link to="/centros">
                            <Nav.Link as="div">Asociaciones</Nav.Link>
                        </Link>

                        {user ?
                            <>
                                <Nav.Link as="div" onClick={logoutUser}>Cerrar sesión</Nav.Link>
                                <Link to="/usuarios">
                                    <Nav.Link as="div">Usuarios</Nav.Link>
                                </Link>
                            </>
                            :
                            <>
                                <Link to="/registro">
                                    <Nav.Link as="div">Registro</Nav.Link>
                                </Link>
                                <Link to="/iniciar-sesion">
                                    <Nav.Link as="div">Iniciar Sesión</Nav.Link>
                                </Link>


                            </>
                        }

                        {user && <Nav.Link as="div">¡Bienvenido {user.username}!</Nav.Link>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation