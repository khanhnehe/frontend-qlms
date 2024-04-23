import ApiClient from '../services/api.service';

class CartService {
    constructor() {
        this.api = ApiClient;
    }
    async getCartByUserId(docgiaId) {
        try {
            return await this.api.get(`/getCartByUseId/${docgiaId}`);
        } catch (error) {
            throw error;
        }
    }
    async addCart(data) {
        try {
            return await this.api.post('/addCart', data);
        } catch (error) {
            throw error;
        }
    }



    async deleteSachCart(sachId) {
        try {
            return await this.api.delete(`/deleteSachCart/${sachId}`);
        } catch (error) {
            throw error;
        }
    }
}

export default new CartService();