import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../../services/user.service'
import './UserCard.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';


const UserCard = ({ username, profileImage, _id }) => {

    const navigate = useNavigate()

    const deleteUser = () => {
        userService
            .deleteOneUser(_id)
            .then(() => navigate("/usuarios"))
            .catch(err => (err))
    }

    return (

        <div key={_id}>
            <Card className="mb-4 UserCard">
                <Card.Img variant="top" src={profileImage} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>

                    <Link to={`/usuarios/perfil/${_id}`}>
                        <div className="button">
                            <Button className='userButton' variant="dark" size="sm"><AddCircleIcon /></Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard