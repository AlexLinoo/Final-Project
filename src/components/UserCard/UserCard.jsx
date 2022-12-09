import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../../services/user.service'


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
            <Card className="mb-4 ProductCard">
                <Card.Img variant="top" src={profileImage} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>

                    <Link to={`/usuarios/perfil/${_id}`}>
                        <div className="d-grid">
                            <Button variant="dark" size="sm">Perfil</Button>
                        </div>
                        <div className="d-grid mt-3">
                            <Button variant="danger" size="sm" onClick={deleteUser}>Borrar Usuario</Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard