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


    const handleFilterButton = (e) => {


        if (e.target.value === 'all') {
            setFilteredProducts(filteredProducts)
        } else {
            const productCopy = products.filter(elm => elm.type === e.target.value && elm.status === 'offered')
            setFilteredProducts(productCopy)
        }
    }

    useEffect(() => {

        loadProducts()

    }, [])

    return (

        <>

            <Container>

                {user && <Button onClick={openModal} className="done-button" variant="outline-dark" size="lg">Donar</Button>}

                <Button className="filterButton" onClick={handleFilterButton} value='all' variant="outline-secondary"><CategoryOutlinedIcon sx={{ fontSize: 70 }} /></Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Juguetes' variant="outline-success">< ToysOutlinedIcon sx={{ fontSize: 70 }} /></Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Ropa' variant="outline-info"><CheckroomIcon sx={{ fontSize: 70 }} /></Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Material Escolar' variant="outline-warning"><SchoolOutlinedIcon sx={{ fontSize: 70 }} /></Button>
                <Button className="filterButton" onClick={handleFilterButton} value='Otros' variant="outline-dark"><AddIcon sx={{ fontSize: 70 }} /></Button>

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