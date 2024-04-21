import ApiClient from '../services/api.service';

class DocGiaService {
    constructor() {
        this.api = ApiClient;
    }

    async loginDocGia(data) {
        try {
            return await this.api.post('/login', data);
        } catch (error) {
            throw error;
        }
    }

    async createDocGia(data) {
        try {
            return await this.api.post('/createDocGia', data);
        } catch (error) {
            throw error;
        }
    }



    async editDocGia(docgiaId, data) {
        try {
            return await this.api.put(`/editDocGia/${docgiaId}`, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteDocGia(docgiaId) {
        try {
            return await this.api.delete(`/deleteDocGia/${docgiaId}`);
        } catch (error) {
            throw error;
        }
    }

    async getAllDocGia() {
        try {
            return await this.api.get('/getAllDocGia');
        } catch (error) {
            throw error;
        }
    }
}

export default new DocGiaService();