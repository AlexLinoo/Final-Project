import axios from 'axios'

class ProductService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/products`
        })
    }

    getOneProduct(product_id) {
        return this.api.get(`/getOneProduct/${product_id}`)
    }

    getProducts() {
        return this.api.get('/')
    }


    saveProduct(productData) {
        return this.api.post('/uploadProduct', productData)
    }
}

const productService = new ProductService()

export default productService