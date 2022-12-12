import { useState } from "react"
import { Form, Button, Row, Col, InputGroup, FormLabel } from "react-bootstrap"
import associationService from "../../services/Association.service"
import uploadServices from "../../services/upload.service"


const NewAssociationForm = ({ fireFinalActions }) => {

    const [associationData, setAssociationData] = useState({
        name: '',
        description: '',
        image: '',
        address: '',
        needs: '',
        children: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setAssociationData({ ...associationData, [name]: value })

    }

    const handleFromSubmit = e => {
        e.preventDefault()

        associationService
            .saveAssociation(associationData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => setErrors(err))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()

        formData.append('imageData', e.target.files[0])

        uploadServices

            .uploadimage(formData)
            .then(res => {
                setAssociationData({ ...associationData, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const { name, description, children, address, needs } = associationData

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
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="address" value={address} onChange={handleInputChange} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Imagen de la Asociación</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>

                </Col>

            </Row>
            <Row>
                <InputGroup className="mb-3" onChange={handleInputChange}>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="needs" value='Ropa' /><h5>Ropa</h5>


                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="needs" value='Juguetes' /><h5>Juguetes</h5>


                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="needs" value='Material Escolar' /><h5>Material Escolar</h5>


                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="needs" value='Otros' /><h5>Otros</h5>

                </InputGroup>
            </Row>
            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Nº de niños que se encuentran en el centro actualmente</Form.Label>
                <Form.Control type="number" name="children" value={children} onChange={handleInputChange} />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear Centro'}</Button>
            </div>
        </Form>

    )
}

export default NewAssociationForm


/* function CheckboxesExample() {
    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <Form.Control aria-label="Text input with checkbox" />
            </InputGroup>
            <InputGroup>
                <InputGroup.Radio aria-label="Radio button for following text input" />
                <Form.Control aria-label="Text input with radio button" />
            </InputGroup>
        </>
    );
} */