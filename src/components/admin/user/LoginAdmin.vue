<template>
    <div class="container">
        <div class="col-5 mt-4">
            <h2>Đăng nhập</h2>
            <form @submit.prevent="login">
                <div>
                    <label class="form-label">Số điện thoại:</label>
                    <input class="form-control mb-2" v-model="loginData.dienThoai" type="text" required>
                </div>
                <div>
                    <label class="form-label">Mật khẩu:</label>
                    <input class="form-control mb-2" v-model="loginData.password" type="password" required>
                </div>
                <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">Đăng
                    nhập</button>
            </form>
        </div>
    </div>
</template>

<script>
import NhanVienService from '@/services/nhanVien.service';

export default {
    name: "loginAdmin",
    data() {
        return {
            loginData: {
                dienThoai: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            try {
                const response = await NhanVienService.loginAdmin(this.loginData);
                if (response.errCode === 0) {
                    alert('Đăng nhập thành công');
                    this.$router.push({ name: 'admin.CrudSach' });

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