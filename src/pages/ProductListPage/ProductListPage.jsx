import { useEffect, useState } from "react"
import ProductList from "../../components/ProductList/ProductList"
import productService from "../../services/Product.service"
import { Container, Modal, Button } from "react-bootstrap"
import NewProductForm from './../../components/NewProductForm/NewProduct'
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"


const ProductListPage = () => {

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const loadProducts = () => {
        productService
            .getProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }


    useEffect(() => {

        loadProducts()

    }, [])

    return (
        <>
            <Container>
                <h1>Lista de productos</h1>

                {user && <Button onClick={openModal} variant="dark" size="sm">Crear Nuevo Producto</Button>}

                <hr />

                {!products ? <h1>Cargando productos</h1> : <ProductList products={products} />}

            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewProductForm closeModal={closeModal} refreshList={loadProducts} />
                </Modal.Body>

            </Modal>
        </>
    )
}
export default ProductListPage