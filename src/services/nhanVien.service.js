import ApiClient from '../services/api.service';

class NhanVienService {
    constructor() {
        this.api = ApiClient;
    }
    async loginAdmin(data) {
        try {
            return await this.api.post('/loginAdmin', data);
        } catch (error) {
            throw error;
        }
    }
    async createNhanVien(data) {
        try {
            return await this.api.post('/createNhanVien', data);
        } catch (error) {
            throw error;
        }
    }

    async editNhanVien(data) {
        try {
            return await this.api.put('/editNhanVien', data);
        } catch (error) {
            throw error;
        }
    }

    async deleteNhanVien(nhanVienId) {
        try {
            return await this.api.delete(`/deleteNhanVien/${nhanVienId}`);
        } catch (error) {
            throw error;
        }
    }

    async getAllNhanVien() {
        try {
            return await this.api.get('/getAllNhanVien');
        } catch (error) {
            throw error;
        }
    }
}

export default new NhanVienService();