
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const UserCard = ({ username, profileImage, _id }) => {
    return (
        <div key={_id}>
            <Card className="mb-4 ProductCard">
                <Card.Img variant="top" src={profileImage} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>

                    <Link to={`/usuarios/detalles/${_id}`}>
                        <div className="d-grid">
                            <Button variant="dark" size="sm">Ver detalles</Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}
export default UserCard