import './AssociationCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import associationService from '../../services/Association.service'
import { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import EditAssociationForm from '../EditAssociationForm/EditAssociationForm'



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
    console.log(needs)

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
        <div className="gap-3 mt-4" key={_id}>
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
                        <div className="d-grid">
                            <Button variant="dark" size="sm">Ver detalles</Button>
                        </div>
                    </Link>


                    {
                        owner?._id === user?._id &&

                        <>
                            <div className="d-grid mt-3">
                                <Button variant="danger" size="sm" onClick={deleteAssociation}>Borrar Asociación</Button>
                            </div>
                            {user && <Button onClick={openModal} variant="dark" size="sm">editar Asociación</Button>}
                        </>
                    }
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditAssociationForm fireFinalActions={fireFinalActions} association={association} />
                </Modal.Body>
            </Modal>



        </div >
    )
}
export default AssociationCard