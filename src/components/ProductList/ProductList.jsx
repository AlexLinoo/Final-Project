import { Col, Row, Button } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"
import './ProductList.css'



const ProductList = ({ products, refreshProducts }) => {



    return (
        <>

            <Row>
                {products.map(elm => {
                    return (
                        <Col sm={{ span: 4 }} key={elm._id} >
                            <ProductCard {...elm} refreshProducts={refreshProducts} />
                        </Col>
                    )
                })}
            </Row>
        </>

    )

}

export default ProductList