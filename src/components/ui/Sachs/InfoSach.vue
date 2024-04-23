<template>
    <div class="container mt-4">

        <router-link :to="{ name: 'user.home' }">Trang chủ</router-link> &gt; Chi tiết sản phẩm
        <div class="row mt-3">
            <div class="left col-md-4">
                <img :src="sach.anhSach" class="image">
            </div>

            <div class="right col-md-6">
                <div class="name mb-5">{{ sach.tenSach }}</div>
                <div class="tac-gia mb-3">Tác giả: {{ sach.tacGia }}</div>
                <div class="tac-gia mb-3">Nhà xuất bản: {{ sach?.MaXNB?.tenNXB }}</div>
                <div class="price mb-3">Đơn giá: {{ sach.donGia?.toLocaleString('vi-VN', {
                    style: 'currency', currency:
                    'VND' }) }}</div>
                <div class="tac-gia mb-5">Số quyển: {{ sach.soQuyen }}</div>

                <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8"
                    @click="addToCart(sach)">
                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                </button>

            </div>
        </div>

        <div class="row mt-5 mb-5">
            <div class="col">
                <h3>Mô tả sách</h3>
                <div class="mota" style="text-align: justify;">{{ sach.moTa }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import SachService from '@/services/sach.service';
import CartService from '@/services/cart.service';
import { mapState } from 'vuex';

export default {
    name: 'InfoSach',
    data() {
        return {
            sach: {}
        }
    },
    computed: {
        ...mapState(['sharedSachs', 'sharedNxbs', 'docGia']), // Thêm 'docGia' vào đây


    },
    async created() {
        const id = this.$route.params.id;
        this.$store.dispatch('fetchSachs');
        this.$store.dispatch('fetchNxbs');

        try {
            const response = await SachService.getSachById(id);
            if (response.errCode === 0) {
                this.sach = response.sach;
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
        async addToCart(sach) {
            console.log(this.docGia);
            try {
                if (!this.docGia) {
                alert('Vui lòng đăng nhập trước khi thêm sách vào giỏ hàng');
                return;
            }
            
                const data = {
                    sachId: sach._id,
                    docgia: this.docGia._id, // Sử dụng ID của độc giả từ state
                    amount: 1, // changed from 1 to 2
                };
                const response = await CartService.addCart(data);
                if (response.errCode === 0) {
                    alert('Sách đã được thêm vào giỏ hàng');
                }
                else {
                    alert(`${response.errMessage}`);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style lang="scss">
.left {
    .image {
        width: 90%;
        height: auto;
    }
}

.right {
    .name {
        font-size: 17px;
        font-weight: 700;
        color: darkred;

    }

    .tac-gia {
        font-size: 16px;
        font-weight: 600;
    }

    .price {
        font-size: 16px;
        font-weight: 500;
        color: darkred;
    }



}
</style>