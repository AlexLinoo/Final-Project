import { useEffect, useState, useContext } from "react"
import ProductList from "../../components/ProductList/ProductList"
import productService from "../../services/Product.service"
import { Container, Modal, Button } from "react-bootstrap"
import NewProductForm from './../../components/NewProductForm/NewProduct'
import { MessageContext } from "../../contexts/userMessage.context"
import { AuthContext } from "../../contexts/auth.context"
import './ProductListPage.css'
import Loader from "../../components/Loader/Loader"
import AddIcon from '@mui/icons-material/Add';
import ToysIcon from '@mui/icons-material/Toys';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ToysOutlinedIcon from '@mui/icons-material/ToysOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';




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


    const handleFilterButton = (value) => {

        if (value === 'all') {
            const offeredProduct = products.filter(el => el.status === 'offered')
            setFilteredProducts(offeredProduct)
        } else {
            const productCopy = products.filter(elm => elm.type === value && elm.status === 'offered')
            console.log(productCopy)
            setFilteredProducts(productCopy)
        }
    }

    useEffect(() => {

        loadProducts(filteredProducts)

    }, [])

    return (

        <>

            <Container>

                {user && <Button onClick={openModal} className="done-button" variant="outline-dark" size="lg">Donar</Button>}

                <CategoryOutlinedIcon className="filterButton" sx={{ fontSize: 150 }} onClick={() => handleFilterButton('all')} />
                <ToysOutlinedIcon className="filterButton" sx={{ fontSize: 150 }} onClick={() => handleFilterButton('Juguetes')} />
                <CheckroomIcon className="filterButton" sx={{ fontSize: 150 }} onClick={() => handleFilterButton('Ropa')} />
                <SchoolOutlinedIcon className="filterButton" sx={{ fontSize: 150 }} onClick={() => handleFilterButton('Material Escolar')} />
                <AddIcon className="filterButton" sx={{ fontSize: 150 }} onClick={() => handleFilterButton('Otros')} />


                {!products ? <Loader /> : <ProductList products={filteredProducts} refreshProducts={loadProducts} />}

                <div className='instructions'>
                    <p>Descubre<AddCircleIcon /> Likea <FavoriteIcon /> Dona <VolunteerActivismIcon /></p>
                </div>
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