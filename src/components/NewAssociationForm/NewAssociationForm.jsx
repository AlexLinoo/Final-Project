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
        children: '',
        needs: { ropa: null, material_escolar: null, juguetes: null, otros: null }
    })

    // const [needs, setNeeds] = useState({
    //     ropa: false,
    //     juguetes: false,
    //     material_escolar: false,
    //     otros: false
    // })

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

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setAssociationData({ ...associationData, needs: { ...associationData.needs, [name]: checked } })

        console.log(e)
    }

    const { name, description, children, address } = associationData

    return (

        <Form onSubmit={handleFromSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Descripci??n</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Direcci??n</Form.Label>
                <Form.Control type="text" name="address" value={address} onChange={handleInputChange} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Imagen de la Asociaci??n</Form.Label>
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
                <Form.Label>N?? de ni??os que se encuentran en el centro actualmente</Form.Label>
                <Form.Control type="number" name="children" value={children} onChange={handleInputChange} />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear Centro'}</Button>
            </div>
        </Form >

    )
}

export default NewAssociationForm


