import ApiClient from '../services/api.service';

class SachService {
    constructor() {
        this.api = ApiClient;
    }
    async searchSach(seachsach) {
        try {
            return await this.api.get(`/search?seachsach=${seachsach}`);
        } catch (error) {
            throw error;
        }
    }
    async createSach(data) {
        try {
            return await this.api.post('/createSach', data);
        } catch (error) {
            throw error;
        }
    }

    async deleteSach(sachId) {
        try {
            return await this.api.delete(`/deleteSach/${sachId}`);
        } catch (error) {
            throw error;
        }
    }

    async getAllSach() {
        try {
            return await this.api.get('/getAllSach');
        } catch (error) {
            throw error;
        }
    }

    async getSachById(sachId) {
        try {
            return await this.api.get(`/getSachById/${sachId}`);
        } catch (error) {
            throw error;
        }
    }

    async editSach(data, sachId) {
        try {
            return await this.api.put(`/editSach/${sachId}`, data);
        } catch (error) {
            throw error;
        }
    }
}

export default new SachService();
