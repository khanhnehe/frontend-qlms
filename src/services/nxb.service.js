import ApiClient from '../services/api.service';

class NxbService {
    constructor() {
        this.api = ApiClient;
    }

    async createNXB(data) {
        try {
            return await this.api.post('/createNXB', data);
        } catch (error) {
            throw error;
        }
    }

    async deleteNXB(nxbId) {
        try {
            return await this.api.delete(`/deleteNXB/${nxbId}`);
        } catch (error) {
            throw error;
        }
    }

    async getAllNXB() {
        try {
            return await this.api.get('/getAllNXB');
        } catch (error) {
            throw error;
        }
    }

    // Chỉnh sửa một nhà xuất bản
    async editNXB(data) {
        try {
            return await this.api.put('/editNXB', data);
        } catch (error) {
            throw error;
        }
    }
}

export default new NxbService();
