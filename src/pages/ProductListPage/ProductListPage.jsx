import { useEffect, useState, useContext } from "react"
import ProductList from "../../components/ProductList/ProductList"
import productService from "../../services/Product.service"
import { Container, Modal, Button } from "react-bootstrap"
import NewProductForm from './../../components/NewProductForm/NewProduct'
import { MessageContext } from "../../contexts/userMessage.context"
import { AuthContext } from "../../contexts/auth.context"
import './ProductListPage.css'



const ProductListPage = () => {

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const loadProducts = () => {

        productService

            .getProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {

        setShowToast(true)
        setToastMessage('Producto creado')
        loadProducts()
        closeModal()

    }
    const handleFilterButton = (e) => {
        // console.log(e.target.value)

        let productCopy = []

        if (e.target.value === 'all') {
            productCopy = products
        } else {
            productCopy = products.filter(elm => elm.type === e.target.value)
        }

    }

    useEffect(() => {

        loadProducts()

    }, [])

    return (

        <>

            <Container>
                <h1>Lista de productos</h1>
                <br />

                {user && <Button onClick={openModal} variant="dark" size="sm">Crear Nuevo Producto</Button>}
                <hr />
                <Button className="filterButton" onClick={handleFilterButton} value='all' variant="outline-secondary">Todos los Productos</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='toys' variant="outline-success">Juguetes</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='clothes' variant="outline-info">Ropa</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='school' variant="outline-warning">Material Escolar</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='others' variant="outline-dark">Otros</Button>

                <hr />

                {!products ? <h1>Cargando productos</h1> : <ProductList products={products} refreshProducts={loadProducts} />}



            </Container>


            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Dona un producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewProductForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductListPage