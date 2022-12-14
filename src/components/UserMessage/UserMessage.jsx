import { useContext } from 'react';
import { Toast } from 'react-bootstrap';
import { MessageContext } from '../../contexts/userMessage.context';


const UserMessage = () => {

    const { setShowToast, toastMessage, showToast } = useContext(MessageContext)

    return (

        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 50, right: 10 }}>
            <Toast.Header>
                <strong className="me-auto">Hey!</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    )
}

export default UserMessage