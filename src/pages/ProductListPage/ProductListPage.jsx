import { useEffect, useState, useContext } from "react"
import ProductList from "../../components/ProductList/ProductList"
import productService from "../../services/Product.service"
import { Container, Modal, Button } from "react-bootstrap"
import NewProductForm from './../../components/NewProductForm/NewProduct'
import { MessageContext } from "../../contexts/userMessage.context"
import { AuthContext } from "../../contexts/auth.context"
import './ProductListPage.css'
import Loader from "../../components/Loader/Loader"



const ProductListPage = () => {

    const { user } = useContext(AuthContext)

    const [products, setProducts] = useState()
    const [showModal, setShowModal] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const loadProducts = () => {

        productService
            .getProducts()
            .then(({ data }) => {
                const offeredProducts = data.filter(elm => elm.status === 'offered');
                setProducts(data)
                setFilteredProducts(offeredProducts)
            })
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {

        setShowToast(true)
        setToastMessage('Producto creado')
        loadProducts()
        closeModal()

    }


    const handleFilterButton = (e) => {


        if (e.target.value === 'all') {
            setFilteredProducts(products)
        } else {
            const productCopy = products.filter(elm => elm.type === e.target.value)
            setFilteredProducts(productCopy)
        }


    }

    useEffect(() => {

        loadProducts()

    }, [])

    return (

        <>

            <Container>
                <h1><strong>Lista de Productos</strong></h1>
                <br />

                {user && <Button onClick={openModal} variant="dark" size="lg">Donar</Button>}
                <hr />
                <Button className="filterButton" onClick={handleFilterButton} value='all' variant="outline-secondary">Todos los Productos</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Juguetes' variant="outline-success">Juguetes</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Ropa' variant="outline-info">Ropa</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Material Escolar' variant="outline-warning">Material Escolar</Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Otros' variant="outline-dark">Otros</Button>

                {!products ? <Loader /> : <ProductList products={filteredProducts} refreshProducts={loadProducts} />}



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