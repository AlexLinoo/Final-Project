import { useState } from "react"
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap"
import productService from "../../services/Product.service"
import { useNavigate } from "react-router-dom"

const NewProductForm = () => {

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        image: '',
        state: '',
        type: '',

    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleFromSubmit = e => {
        e.preventDefault()

        productService

            .saveProduct(productData)
            .then(() => navigate('/productos'))
            .catch(err => console.error(err))
    }
    const { name, description, image, state, type } = productData



    return (

        <Form onSubmit={handleFromSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleInputChange} />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="url" name="image" value={image} onChange={handleInputChange} />
                    </Form.Group>

                </Col>

            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="state" /><h5>Nuevo</h5></InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="state" /><h5>Semi-Nuevo</h5></InputGroup>
                </Col>
            </Row>
            <Row>
                <Form.Select className="mb-5" aria-label="Default select example" name="type">
                    <option>Tipo</option>
                    <option value="clothes">Ropa</option>
                    <option value="toys">Juguetes</option>
                    <option value="school">Material Escolar</option>
                    <option value="others">Otros</option>
                </Form.Select>
            </Row>


            <div className="d-grid">
                <Button variant="dark" type="submit">Crear Producto</Button>
            </div>
        </Form>



    )
}
export default NewProductForm