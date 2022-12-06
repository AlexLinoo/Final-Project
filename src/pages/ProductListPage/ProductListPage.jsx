import { useEffect, useState } from "react"
import ProductList from "../../components/ProductList/ProductList"
import productService from "../../services/Product.service"
import { Container } from "react-bootstrap"

const ProductListPage = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        productService
            .getProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))

    }, [])

    return (
        <Container>
            <h1>Lista de productos</h1>
            <hr />

            {!products ? <h1>Cargando productos</h1> : <ProductList products={products} />}

        </Container>

    )
}
export default ProductListPage