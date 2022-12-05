import { Col, Row } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"

const ProductList = ({ product }) => {
    return (
        <Row>
            {product.map(elm => {
                return (
                    <Col sm={{ span: 4 }} key={elm._id} >
                        <ProductCard {...elm} />
                    </Col>
                )
            })}
        </Row>
    )

}
export default ProductList