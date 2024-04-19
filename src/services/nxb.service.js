import ApiClient from '../services/api.service';

class NxbService {
    constructor() {
        // Khởi tạo một instance của ApiClient từ api.service.js
        this.api = ApiClient;
    }

    // Tạo một nhà xuất bản mới
    async createNXB(data) {
        try {
            return await this.api.post('/createNXB', data);
        } catch (error) {
            throw error;
        }
    }

    // Xóa một nhà xuất bản dựa trên ID
    async deleteNXB(nxbId) {
        try {
            return await this.api.delete(`/deleteNXB/${nxbId}`);
        } catch (error) {
            throw error;
        }
    }

    // Lấy tất cả các nhà xuất bản
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
