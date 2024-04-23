import ApiClient from '../services/api.service';


class PhieuService {
    constructor() {
        this.api = ApiClient;
    }

    async checkOutPhieu(data) {
        try {
            return await this.api.post('/checkOutPhieu', data);
        } catch (error) {
            throw error;
        }
    }

    async getPhieuById(docgiaId) {
        try {
            return await this.api.get(`/getPhieuById/${docgiaId}`);
        } catch (error) {
            throw error;
        }
    }

    async confirmStatus(phieuId, actionStatus) {
        try {
            return await this.api.put(`/confirmStatus/${phieuId}`, { actionStatus });
        } catch (error) {
            throw error;
        }
    }

    async getAllPhieu() {
        try {
            return await this.api.get('/getAllPhieu');
        } catch (error) {
            throw error;
        }
    }

    async getPhieuByStatus(status) {
        try {
            return await this.api.get(`/getPhieuByStatus?status=${status}`);
        } catch (error) {
            throw error;
        }
    }
}

export default new PhieuService();