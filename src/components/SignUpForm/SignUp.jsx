import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/auth.service"
import uploadServices from "../../services/upload.service"
import { useNavigate } from 'react-router-dom'
import ErrorMessage from "../ErrorMessage/ErrorMessage"


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])
    const { username, password, email, profileImage } = signupData

    const handleInputChange = e => {

        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })

    }

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService

            .signup(signupData)
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log(err.response.data)
                setErrors(err.response.data.errorMessages)
            })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices

            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, profileImage: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))

    }

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileImage">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm} style={{ color: 'red' }}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Registrarme'}</Button>
            </div>


        </Form >
    )
}

export default SignupForm