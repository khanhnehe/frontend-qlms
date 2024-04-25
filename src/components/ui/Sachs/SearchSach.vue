<template>
    <div class="container">
        <div class="mt-4"></div>
        <router-link :to="{ name: 'user.home' }">Trang chủ</router-link> &gt; Tìm kiếm

        <h5 class="title mt-5">Kết quả tìm kiếm</h5>
        <div class="row top">
            <div class="col-md-2" v-for="(sach, index) in ketQuaSearch" :key="index">
                <div class="card mb-4" @click="handeInfoSach(sach)">
                    <img :src="sach.anhSach" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-name">{{ sach.tenSach }}</h5>
                        <p class="card-text">{{ sach.donGia.toLocaleString('vi-VN',
                            { style: 'currency', currency: 'VND' }
                        ) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SachService from '@/services/sach.service';

export default {
    name: 'SearchSach',

    data() {
        return {
            ketQuaSearch: this.$store.state.ketQuaSearch,
        };
    },
    computed: {

        ...mapState(['docGia']),
    },

    methods: {

        handeInfoSach(sach) {
            this.$router.push({ name: 'user.infoSach', params: { id: sach._id } });
        },
    },
}
</script>