import { useEffect, useState } from "react"
import ProductList from "../../components/ProductList/ProductList"
import productService from "../../services/Product.service"
import { Container } from "react-bootstrap"

const ProductListPage = () => {

    const [product, setProduct] = useState([])

    useEffect(() => {

        productService

            .getProducts()
            .then(({ data }) => setProduct(data))
            .catch(err => console.log(err))

    }, [])

    return (
        <Container>
            <h1>Lista de productos</h1>
            <hr />

            {!product ? <h1>Cargando productos</h1> : <ProductList product={product} />}

        </Container>

    )
}
export default ProductListPage