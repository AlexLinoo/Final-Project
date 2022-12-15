import { useEffect, useState, useContext } from "react"
import AssociationList from "../../components/AssociationList/AssociationList"
import associationService from "../../services/Association.service"
import { Container, Modal, Button } from "react-bootstrap"
import NewAssociationForm from "../../components/NewAssociationForm/NewAssociationForm"
import { MessageContext } from "../../contexts/userMessage.context"
import { AuthContext } from "../../contexts/auth.context"
import Loader from "../../components/Loader/Loader"
import './AssociationListPage.css'



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
                <div className="display">
                    <h1>Asociaciones</h1>
                    {user && <Button className='buttonCenter' onClick={openModal} variant="outline-dark" size="sm">Registra tu Asociación</Button>}
                </div>
                <br />



                {!associations ? <Loader /> : <AssociationList associations={associations} refreshAssociations={loadAssociations} />}

            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea un perfil de Asociación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewAssociationForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AssociationListPage




