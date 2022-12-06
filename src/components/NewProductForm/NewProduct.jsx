import { useState } from "react"
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap"
import productService from "../../services/Product.service"
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.service"


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

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProductData({ ...productData, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })


            .catch(err => console.log(err))

    }
    const [loadingImage, setLoadingImage] = useState(false)

    const { name, description, image } = productData



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
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>

                </Col>

            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3" onChange={handleInputChange}>
                        <InputGroup.Radio aria-label="Radio for following text input" name="state" value='Nuevo' /><h5>Nuevo</h5>
                        <InputGroup.Radio aria-label="Radio for following text input" name="state" value='Semi-Nuevo' /><h5>Semi-Nuevo</h5>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Form.Select className="mb-5" aria-label="Default select example" name="type" onChange={handleInputChange}>
                    <option>Tipo</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Material Escolar">Material Escolar</option>
                    <option value="Otros">Otros</option>
                </Form.Select>
            </Row>


            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear Producto'}</Button>
            </div>
        </Form>



    )
}
export default NewProductForm