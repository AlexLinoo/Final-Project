import axios from 'axios'

class AssociationService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/associations`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getOneAssociation(association_id) {
        return this.api.get(`/getOneAssociation/${association_id}`)
    }

    getAssociatons() {
        return this.api.get('/')
    }


    saveAssociation(associationData) {
        return this.api.post('/uploadAssociation', associationData)
    }

    deleteAssociation(association_id) {
        return this.api.delete(`/deleteAssociation/${association_id}`)
    }

    editAssociation(associationData, association_id) {
        return this.api.put(`/editAssociation/${association_id}`, associationData)
    }

}

const associationService = new AssociationService()

export default associationService