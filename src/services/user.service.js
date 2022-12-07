import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getOneUser(user_id) {
        return this.api.get(`/getOneUser/${user_id}`)
    }

    getUsers() {
        return this.api.get('/')
    }

}

const userService = new UserService()

export default userService