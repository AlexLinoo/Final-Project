
import './Navigation.css'
import { Nav, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Navigation = () => {


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
                        <Link to="/usuarios">
                            <Nav.Link as="div">Usuarios</Nav.Link>
                        </Link>

                        <Nav.Link as="div">¡Bienvenido!</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}

export default Navigation