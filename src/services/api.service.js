import axios from 'axios';

const instance = axios.create({
    baseURL: '/api', // Thêm tiền tố "/api" cho các request API
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
