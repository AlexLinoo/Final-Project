import axios from 'axios'

class ProductService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/products`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
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

    deleteProduct(product_id) {
        return this.api.delete(`/deleteProduct/${product_id}`)
    }

    editProduct(productData, product_id) {
        return this.api.put(`/editProduct/${productData._id}`, productData)
    }

    getUserProducts() {
        return this.api.get(`/getUserProducts`)
    }
}

const productService = new ProductService()

export default productService