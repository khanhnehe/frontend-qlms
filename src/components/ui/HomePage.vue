<template>
    <div class="container">
        <div id="carouselExampleIndicators" class="carousel slide mt-3" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../../assets/ms_banner_img5.webp" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../../assets/ms_banner_img3.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../../assets/ms_banner_img4.webp" class="d-block w-100" alt="...">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>


        <h3 class="title mt-4">Tất cả sách</h3>
        <div class="row top">
            <div class="col-md-2" v-for="(sach, index) in sharedSachs" :key="index">
                <!-- điều hướng đén info -->
                <div class="card mb-4" @click="handeditSach(sach)">
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

export default {
    name: 'HomePage',
    computed: {
        ...mapState(['sharedSachs']),
    },
    created() {
        this.$store.dispatch('fetchSachs');
    },
    watch: {
        '$route': 'fetchSachs'
    },
    methods: {
        handeditSach(sach) {
            this.$router.push({ name: 'user.infoSach', params: { id: sach._id } });
        }
    }
}
</script>

<style lang="scss">
.top {
    padding: 10px 0px;

    .card {
        .card-img-top {
            width: 100%;
            height: 220px;
        }

        .card-body {

            .card-name {
                font-size: 14px;
                font-weight: 500;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .card-text {
                font-size: 14px;
                font-weight: 500;
                color: #ca0303;
            }
        }
    }

}
</style>