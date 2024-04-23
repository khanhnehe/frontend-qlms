<template>
    <div class="container mt-4">

        <router-link :to="{ name: 'user.home' }">Trang chủ</router-link> &gt; Giỏ hàng
        <div class="row mt-3">
            <div class="col-md-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mã sách</th>
                            <th>Tên sách</th>
                            <th>Hình ảnh</th>
                            <th>Đơn giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.cartItems" :key="item._id">
                            <td><button class="xoa" @click="removeSach(item)">X</button></td>
                            <td class="text">{{ item.sach.maSach }}</td>
                            <td class="text">{{ item.sach.tenSach }}</td>
                            <td><img :src="item.image" width="60"></td>
                            <td class="price">{{ item.sach.donGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</td>                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-3 px-5">
                <!-- <h5 style="color: darkred;">Tạm tính: {{ cart && !isNaN(Number(cart.totalPrice)) ? Number(cart.totalPrice) : '0' }}</h5>         -->
                <button class="btn btn-primary mt-3" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">
                    Mượn sách
                </button>
            </div>
        </div>
    </div>

</template>

<script>
import CartService from '@/services/cart.service';
import { mapState } from 'vuex';

export default {
    name: 'CartSach',
    data() {
        return {
            cart: {
                cartItems: []
            }
        }
    },
    computed: {
        ...mapState(['docGia']),
    },
    async created() {

        const docgiaId = this.$route.params.id;
        this.$store.dispatch('fetchSachs');
        try {
            const response = await CartService.getCartByUserId(docgiaId);
            if (response.errCode === 0) {
                this.cart = response.cart;
            } else {
                console.error(response.errMessage);
            }
        } catch (error) {
            console.error(error);
        }
    },

    watch: {
        '$route': 'fetchSachs'
    },
    methods: {
        async removeSach(item) {
            console.log(this.cart.totalPrice);
            console.log('giá', this.cart.donGia);
            try {
                const response = await CartService.deleteSachCart(item._id);
                if (response.errCode === 0) {
                    // Cập nhật giỏ hàng sau khi xóa thành công
                    alert('Xóa sách thành công');
                    const cartResponse = await CartService.getCartByUserId(this.$route.params.id);
                    if (cartResponse.errCode === 0) {
                        this.cart = cartResponse.cart;
                    } else {
                        console.error(cartResponse.errMessage);
                    }
                } else {
                    alert(`${response.errMessage}`);
                }
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style lang="scss">
.row {
    display: flex;
}

.col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
}

.xoa {
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    padding: 2px 7px;
    font-size: 11px;

    &:hover {
        background-color: #befbff;

    }

}


.text {
    font-size: 15px;
}

.price {
    font-size: 16px;
    font-weight: 500;
    color: darkred;
}
</style>