<template>
    <div class="container">
        <div class="col-5 mt-4">
            <h2 class="">Đăng nhập</h2>
            <form @submit.prevent="login">
                <label class="form-label mt-2">Điện thoại:</label>
                <input class="form-control" type="text" v-model="dienThoai" required>

                <label class="form-label">Mật khẩu:</label>
                <input class="form-control mb-3" type="password" v-model="password" required>

                <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">Đăng
                    nhập</button>
                <div class="register mt-2"> <router-link to="/register">Nếu bạn chưa có tài khoản đăng ký
                        ngay</router-link>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import DocGiaService from '@/services/docGia.service';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            dienThoai: '',
            password: '',
        };
    },
    methods: {
        ...mapMutations(['setDocGia']),
        async login() {
            try {
                const data = {
                    dienThoai: this.dienThoai,
                    password: this.password,
                };
                const response = await DocGiaService.loginDocGia(data);
                if (response.errCode === 0) {
                    console.log('Đăng nhập thành công');
                    this.setDocGia(response.docGia);
                    this.$router.push({ name: 'user.home' });
                } else {
                    alert(response.errMessage);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>