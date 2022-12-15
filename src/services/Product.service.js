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
        return this.api.put(`/editProduct/${product_id}`, productData)
    }

    getUserProducts() {
        return this.api.get(`/getUserProducts`)
    }

    getProductType() {
        return this.api.get(`/getProductType`)
    }

    getProductFav(product_id) {
        return this.api.post(`/favProduct/${product_id}`)
    }

    quitProductFav(product_id) {
        return this.api.post(`/noFavProduct/${product_id}`)
    }

    getUserFavs() {
        return this.api.get('/getFavProduct')
    }

    applyForProduct(product_id, association_id,) {
        return this.api.put(`/applyForProduct/${association_id}`, { donated: product_id })
    }

    getDonations(association_id) {
        return this.api.get(`/getDonations/${association_id}`)
    }

    getOneUserProducts(user_id) {
        return this.api.get(`/getOneUserProducts/${user_id}`)
    }


}

const productService = new ProductService()

export default productService