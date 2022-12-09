import { useState, useEffect } from "react"
import productService from "../../services/Product.service"


const [products, setProducts] = useState()

const filterButton = () => {
    const type = 'toys'

    const loadUserProducts = () => {

        productService

            .getProductType(type)
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        loadUserProducts()

    }, [])

    return (
        <h1></h1>

    )
}

export default FilterButton