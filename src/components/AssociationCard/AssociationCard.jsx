import './AssociationCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import associationService from '../../services/Association.service'
import { useContext } from 'react'
import { Modal, Col, Row, Container, ListGroup } from 'react-bootstrap'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditAssociationForm from '../EditAssociationForm/EditAssociationForm'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage
} from 'mdb-react-ui-kit';





const AssociationCard = ({ name, image, address, description, needs, children, _id, owner, refreshAssociations }) => {
    const association = {
        name,
        image,
        address,
        needs,
        children,
        description,
        _id,
        owner
    }

    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        refreshAssociations()
        closeModal()
    }

    const deleteAssociation = () => {

        associationService
            .deleteAssociation(_id)
            .then(() => fireFinalActions())
            .catch(err => (err))
    }

    return (
        <>
            <MDBCard className='mb-3 allCard'>
                <MDBCardImage position='top' src={image} alt='...' />
                <MDBCardBody>
                    <MDBCardTitle><h3>{name}</h3></MDBCardTitle>
                    <MDBCardText>
                        <small className='text-muted'>{address}</small>
                    </MDBCardText>
                    {/* {needs.ropa && <MDBCardText>ropa</MDBCardText>}
                    {needs.juguetes && <MDBCardText>juguetes</MDBCardText>}
                    {needs.material_escolar && <MDBCardText>material escolar</MDBCardText>}
                    {needs.otros && <MDBCardText>otros</MDBCardText>} */}
                    <div className='buttons'>
                        {
                            owner?._id === user?._id &&

                            <>
                                <div className="mt-3 mb-3">
                                    <Button className='delete' variant="danger" size="sm" onClick={deleteAssociation}><DeleteForeverIcon /></Button>
                                </div>
                                <div className="mt-3 mb-3">
                                    {user && <Button className='edit' onClick={openModal} variant="dark" size="sm"><BorderColorIcon /></Button>}
                                </div>
                            </>
                        }
                        <Link to={`/centros/detalles/${_id}`}>
                            <div className="mt-3 mb-3">
                                <Button className='details' variant="dark" size="sm"><AddCircleIcon /></Button>
                            </div>
                        </Link>
                    </div>
                </MDBCardBody>
            </MDBCard>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sube tu asociación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditAssociationForm fireFinalActions={fireFinalActions} association={association} />
                </Modal.Body>
            </Modal>

        </>



        /* 
                <Container >
        
                    <Row>
                        <div className="gap-3 mt-4 " key={_id}>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={image} />
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>Dirección: {address}</Card.Text>
                                        <Card.Text>Tipo Necesidades</Card.Text>
                                        {needs.ropa && <Card.Text>ropa</Card.Text>}
                                        {needs.juguetes && <Card.Text>juguetes</Card.Text>}
                                        {needs.material_escolar && <Card.Text>material escolar</Card.Text>}
                                        {needs.otros && <Card.Text>otros</Card.Text>}
                                        <Card.Text>Numero de niños: {children}</Card.Text>
                                        <Link to={`/centros/detalles/${_id}`}>
                                            <div className="mt-3 mb-3">
                                                <Button variant="dark" size="sm"><AddCircleIcon /></Button>
                                            </div>
                                        </Link>
        
        
                                        {
                                            owner?._id === user?._id &&
        
                                            <>
                                                <div className="mt-3 mb-3">
                                                    <Button variant="danger" size="sm" onClick={deleteAssociation}><DeleteForeverIcon /></Button>
                                                </div>
                                                <div className="mt-3 mb-3">
                                                    {user && <Button onClick={openModal} variant="dark" size="sm"><BorderColorIcon /></Button>}
                                                </div>
                                            </>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <img src={image} />
                            </Col>
                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditAssociationForm fireFinalActions={fireFinalActions} association={association} />
                                </Modal.Body>
                            </Modal>
        
                        </div >
        
        
                    </Row>
        
                </Container>
         */

    )
}
export default AssociationCard




