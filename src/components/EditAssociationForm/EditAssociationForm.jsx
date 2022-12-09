import associationService from "../../services/Association.service"
import { useState } from "react"
import { Form, Button, Row, Col, FormLabel } from "react-bootstrap"
import uploadServices from "../../services/upload.service"
const EditAssociationForm = ({ fireFinalActions, association }) => {


    const [associationData, setAssociationData] = useState({

        name: association.name,
        description: association.description,
        address: association.address,
        image: association.image,
        state: association.state,
        type: association.type,

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
            .editAssociation(associationData, association._id)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
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

    const { name, description, address, children, needs } = associationData



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
                <FormLabel>Tipo de necesidades</FormLabel>
                <Form.Select className="mb-5" aria-label="Default select example" name="needs" onChange={handleInputChange}>
                    <option value="Ropa">Ropa</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Material Escolar">Material Escolar</option>
                    <option value="Otros">Otros</option>
                </Form.Select>
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
export default EditAssociationForm