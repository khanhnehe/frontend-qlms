<template>
    <div>
        <h2>Đăng nhập</h2>
        <form @submit.prevent="login">
            <label for="dienThoai">Điện thoại:</label>
            <input type="text" id="dienThoai" v-model="dienThoai" required>

            <label for="password">Mật khẩu:</label>
            <input type="password" id="password" v-model="password" required>

            <button type="submit">Đăng nhập</button>
        </form>
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
                    this.setDocGia(response.docGia); // Sửa dòng này
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