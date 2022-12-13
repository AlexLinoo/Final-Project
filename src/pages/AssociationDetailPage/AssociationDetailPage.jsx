import associationService from "../../services/Association.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import productService from "../../services/Product.service"
import userService from "../../services/user.service"
import Loader from "../../components/Loader/Loader"
import ProductList from "../../components/ProductList/ProductList"






const AssociationDetailPage = () => {

    const [association, setAssociation] = useState(null)

    const [users, setUsers] = useState({})

    const [donations, setDonations] = useState(null)

    const { association_id } = useParams()

    const [isLoading, setIsLoading] = useState(true)

    const getDonations = () => {
        productService
            .getDonations()
            .then(({ data }) => {
                const ids = data.donated.map(elm => elm)
                setDonations(ids)
                console.log(ids)


            })
            .catch(err => console.log(err))
    }


    const getAssociation = (association_id) => {
        setIsLoading(true)
        associationService
            .getOneAssociation(association_id)
            .then(({ data }) => {
                console.log(data)
                setAssociation(data)
                setIsLoading(false)

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getDonations()
        getAssociation(association_id)
    }, [])

    if (isLoading) {
        return (<p>Cargando...</p>)
    }

    const { name, description, image, address, needs, children, owner } = association


    return (

        <Container>
            {

                <>
                    <h1 className="mb-4">{name}</h1>
                    <hr />

                    <Row>

                        <Col md={{ span: 6, offset: 1 }}>
                            <h3>Especificaciones</h3>
                            <p>Persona de contacto: {owner.username} : {owner.email}</p>
                            <img src={users.profileImage} alt="" />
                            <p>{description}</p>
                            <p>Necesidades: {needs}</p>
                            <p>Niños: {children}</p>
                            <p>Dirección: {address}</p>
                            <hr />

                            <Link to="/productos">
                                <Button as="div" variant="dark">Volver a la lista </Button>
                            </Link>
                        </Col>

                        <Col md={{ span: 4 }}>
                            <img src={image} style={{ width: '100%' }} />
                        </Col>
                        <Col>
                            <h1>Productos Donados</h1>

                            {!donations ? <Loader /> : <ProductList products={donations} refreshProducts={getDonations} />}
                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default AssociationDetailPage