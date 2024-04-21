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
import { useRouter } from 'vue-router';
import DocGiaService from '@/services/docGia.service';

export default {
    data() {
        return {
            dienThoai: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const data = {
                    dienThoai: this.dienThoai,
                    password: this.password,
                };
                const response = await DocGiaService.loginDocGia(data);
                if (response.errCode === 0) {
                    console.log('Đăng nhập thành công');
                    const router = useRouter();
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