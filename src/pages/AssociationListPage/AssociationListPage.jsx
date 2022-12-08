import { useEffect, useState, useContext } from "react"
import AssociationList from "../../components/AssociationList/AssociationList"
import associationService from "../../services/Association.service"
import { Container, Modal, Button } from "react-bootstrap"
import NewAssociationForm from "../../components/NewAssociationForm/NewAssociationForm"
import { MessageContext } from "../../contexts/userMessage.context"
import { AuthContext } from "../../contexts/auth.context"


const AssociationListPage = () => {

    const { user } = useContext(AuthContext)

    const [associations, setAssociations] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const loadAssociations = () => {
        associationService
            .getAssociatons()
            .then(({ data }) => setAssociations(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage('Centro creado')
        loadAssociations()
        closeModal()
    }

    useEffect(() => {
        loadAssociations()
    }, [])

    return (

        <>
            <Container>
                <h1>Lista de Asociaciones</h1>

                {user && <Button onClick={openModal} variant="dark" size="sm">Crear Nuevo Centro</Button>}

                <hr />

                {!associations ? <h1>Cargando Centros</h1> : <AssociationList associations={associations} />}
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewAssociationForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AssociationListPage