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

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setAssociationData({ ...associationData, needs: { ...associationData.needs, [name]: checked } })

        console.log(e)
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

                <Form.Check onChange={handleCheckbox} label='Ropa' type='switch' id='custom-switch' name="ropa" />


                <Form.Check onChange={handleCheckbox} label='Juguetes' type='switch' name="juguetes" id='custom-switch' />


                <Form.Check onChange={handleCheckbox} label='Material Escolar' type='switch' name="material_escolar" id='custom-switch' />


                <Form.Check onChange={handleCheckbox} label='Otros' type='switch' name="otros" id='custom-switch' />


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