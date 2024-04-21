import ApiClient from '../services/api.service';

class CartService {
    constructor() {
        this.api = ApiClient;
    }

    async addCart(data) {
        try {
            return await this.api.post('/addCart', data);
        } catch (error) {
            throw error;
        }
    }

    async getCartByUserId(userId) {
        try {
            return await this.api.get(`/getCartByUseId/${userId}`);
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