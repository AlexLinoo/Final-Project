import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import userService from "../../services/user.service"
import UserList from "../../components/UserList/UserList"



const UserListPage = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {

        userService
            .getUsers()
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))

    }, [])


    return (

        <Container>

            <h1 className="mb-4 mt-3">Lista de Usuarios</h1>


            {!users ? <h1>Cargando usuarios...</h1> : <UserList users={users} />}

        </Container>
    )
}

export default UserListPage