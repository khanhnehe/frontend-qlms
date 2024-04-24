<template>
    <div class="container">
        <div class="col-5 mt-4 mb-5">
            <h2 class="">Đăng ký</h2>
            <form @submit.prevent="register">
                <div>
                    <label class="form-label">Họ lót:</label>
                    <input class="form-control mb-2" v-model="docGia.hoLot" type="text" required>
                </div>
                <div>
                    <label class="form-label">Tên:</label>
                    <input class="form-control mb-2" v-model="docGia.ten" type="text" required>
                </div>
                <div>
                    <label class="form-label">Ngày sinh:</label>
                    <input class="form-control mb-2" v-model="docGia.ngaySinh" type="date" required>
                </div>
                <div>
                    <label class="form-label">Địa chỉ:</label>
                    <input class="form-control mb-2" v-model="docGia.diaChi" type="text" required>
                </div>
                <div>
                    <label class="form-label">Điện thoại:</label>
                    <input class="form-control mb-2" v-model="docGia.dienThoai" type="tel" required>
                </div>
                <div>
                    <label class="form-label">Mật khẩu:</label>
                    <input class="form-control mb-2 mb-3" v-model="docGia.password" type="password" required>
                </div>
                <div>
                    <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">Đăng
                        ký</button>
                </div>

                <div class="register mt-2"> <router-link to="/login">Quay lại trang đăng nhập</router-link>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import DocGiaService from '@/services/docGia.service';

export default {
    name: "Register",
    data() {
        return {
            docGia: {
                hoLot: '',
                ten: '',
                ngaySinh: '',
                diaChi: '',
                dienThoai: '',
                password: ''
            }
        }
    },
    methods: {
        async register() {
            try {
                const response = await DocGiaService.createDocGia(this.docGia);
                if (response.errCode === 0) {
                    alert('Đăng ký thành công');
                    this.docGia = {
                        hoLot: '',
                        ten: '',
                        ngaySinh: '',
                        diaChi: '',
                        dienThoai: '',
                        password: ''
                    };
                } else {
                    alert(response.errMessage);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>