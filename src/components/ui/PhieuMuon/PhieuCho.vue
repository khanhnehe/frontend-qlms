<template>
    <div class="container mb-5">
        <div class="mt-4"></div>
        <router-link :to="{ name: 'user.home' }">Trang chủ</router-link> &gt; Phiếu theo dõi
        <div class="boc col-12 mt-2" v-for="(phieu, index) in phieuList" :key="index">
            <!-- mã  -->
            <div class="code" @click="openModal(phieu)"> Mã phiếu: {{ phieu.orderCode }}</div>

            <!-- info -->
            <div class="phieu-muon" v-for="(item, index) in phieu.PhieuMuonItems" :key="index">
                <div class="top">
                    <div class="left">
                        <div class="anh">
                            <img :src="item.image" style="width: 60px;">
                        </div>
                        <div class="name">{{ item.name }} </div>
                    </div>
                    <div class="right">

                        <div class="price"> Giá: {{ item.price.toLocaleString('vi-VN', {
                            style: 'currency', currency:
                                'VND'
                        }) }}</div>
                        <div class="ma-sach"> Mã sách: {{ item.sach.maSach }}</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <!-- Hủy mượn -->
                <div class="left" v-if="phieu.trangThai === 'Chờ xác nhận'">
                    <button class="btn-huy" type="submit" @click="huyMuon(phieu._id)">Hủy mượn</button>
                </div>
                <!-- Trả sách -->
                <div class="left" v-if="phieu.trangThai === 'Đang mượn'">
                    <button class="btn-tra" type="submit" @click="traSach(phieu._id)">Trả sách</button>
                </div>


                <div class="right">
                    <!-- ngày muọn -->
                    <div class="ngay-muon" v-if="phieu.trangThai !== 'Đã hủy' && phieu.trangThai !== 'Chờ xác nhận'">
                        Ngày mượn: {{ formatDate(phieu.ngayMuon) }}
                    </div>

                    <div class="han-tra" v-if="phieu.trangThai !== 'Đã hủy' && phieu.trangThai !== 'Chờ xác nhận'">
                        Hạn trả: {{ formatDate(phieu.hanTra) }}
                    </div>

                    <div class="ngay-tra" v-if="phieu.trangThai === 'Đã trả' && phieu.trangThai !== 'Chờ xác nhận'">
                        Ngày trả: {{ formatDate(phieu.ngayTra) }}
                    </div>

                    <!-- tong -->
                    <div class="total">Tổng giá: {{ phieu.totalPrice.toLocaleString('vi-VN', {
                        style:
                            'currency', currency: 'VND'
                    })
                        }}</div>
                    <div class="status"> {{ phieu.trangThai }}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div v-if="showModal" class="modal">
        <div class="modal-content col-6">
            <div class="close mb-3" @click="closeModal">&times;</div>
            <h4 class="mb-4">Chi tiết phiếu theo dõi</h4>
            <p>Mã phiếu: {{ modalPhieu.orderCode }}</p>
            <p>Sách: {{ modalPhieu.PhieuMuonItems[0].name }}</p>
            <p>Tổng tiền: {{ modalPhieu.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
            </p>
            <p>Trạng thái: {{ modalPhieu.trangThai }}</p>
            <p v-if="modalPhieu.trangThai !== 'Chờ xác nhận'">Ngày Mượn: {{ formatDate(modalPhieu.ngayMuon) }}</p>
            <p v-if="modalPhieu.trangThai !== 'Chờ xác nhận'">Hạn trả: {{ formatDate(modalPhieu.hanTra) }}</p>
            <p v-if="modalPhieu.trangThai === 'Đã trả'">Ngày trả: {{ formatDate(modalPhieu.ngayTra) }}</p>
            <p>Người mượn: {{ modalPhieu.docgia.hoLot }} {{ modalPhieu.docgia.ten }}</p>
            <p>Điện thoại: {{ modalPhieu.docgia.dienThoai }}</p>
        </div>
    </div>
</template>

<script>
import PhieuService from '@/services/phieu.service';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
    name: 'PhieuCho',
    data() {
        return {
            phieuList: [],
            showModal: false,
            modalPhieu: null,
        }
    },
    computed: {
        ...mapState(['docGia']),
    },
    async created() {
        const docgiaId = this.$route.params.id;
        try {
            const response = await PhieuService.getPhieuById(docgiaId);
            if (response.errCode === 0) {
                this.phieuList = response.phieu;
            } else {
                console.error(response.errMessage);
            }
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async traSach(phieuId) {
            try {
                const response = await PhieuService.confirmStatus(phieuId, 'Đã trả');
                if (response.errCode === 0) {
                    alert('Bạn đã trả sách');
                    // Fetch getPhieuById again
                    const docgiaId = this.$route.params.id;
                    const response = await PhieuService.getPhieuById(docgiaId);
                    if (response.errCode === 0) {
                        this.phieuList = response.phieu;
                    }
                } else {

                    console.error(response.errMessage);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async huyMuon(phieuId) {
            try {
                const response = await PhieuService.confirmStatus(phieuId, 'Hủy Mượn');
                if (response.errCode === 0) {
                    alert('Hủy mượn sách thành công');
                    // Fetch getPhieuById again
                    const docgiaId = this.$route.params.id;
                    const response = await PhieuService.getPhieuById(docgiaId);
                    if (response.errCode === 0) {
                        this.phieuList = response.phieu;
                    }
                } else {

                    console.error(response.errMessage);
                }
            } catch (error) {
                console.error(error);
            }
        },
        openModal(phieu) {
            this.modalPhieu = phieu;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        //format
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}
</script>


<style lang=scss>
.container.mb-5 {
    padding: 0px 100px;
}

.navbar {
    display: flex;
    gap: 20px;
    border-radius: 5px;
    padding: 10px 15px;
    box-shadow: 0px 0px 10px rgba(23, 23, 23, 0.15);

    .loc {}
}

.boc {

    border: 1px solid #e8e8e8;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 15px;
    box-shadow: 0px 0px 10px rgba(23, 23, 23, 0.15);


    .code {
        font-size: 13px;
        font-weight: 700;
        text-align: right;
        margin-bottom: 5px;
    }

    .phieu-muon {
        .top {
            padding: 5px 0px;
            display: flex;
            justify-content: space-between;
            gap: 10px;

            .left {
                display: flex;
                gap: 10px;

                .image {}

                .name {
                    font-size: 15px;
                    max-width: 550px;
                    word-wrap: break-word;
                    font-weight: 500;
                }
            }

            .right {
                display: grid;
                justify-items: end;

                .price {
                    font-size: 17px;
                    font-weight: 500;
                    color: darkred;
                }

                .maSach {
                    font-size: 13px;
                    font-weight: 500;
                }



            }
        }


    }

    .bottom {
        display: flex;
        border-top: 1px solid #acacac;
        padding: 10px 0px;
        justify-content: space-between;

        .left {
            .btn-huy {
                background-color: #4ed0d8;
                border: none;
                color: white;
                border-radius: 5px;
                padding: 5px 5px;
                margin-top: 9px;
            }

            .btn-tra {
                background-color: #4ed887;
                border: none;
                color: white;
                border-radius: 5px;
                padding: 5px 5px;
                margin-top: 9px;
            }


        }

        .right {
            display: flex;
            gap: 10px;

            .total {
                font-weight: 500;
                color: #17a2b8;
            }

            .status {
                background-color: #d6fdff;
                color: rgb(47, 133, 137);
                padding: 1px 12px;
                border-radius: 23px;
                margin-bottom: 13px;
            }

            .ngay-muon {
                background-color: #d2f6e1;
                color: rgb(38 145 82);
                padding: 1px 12px;
                border-radius: 23px;
                margin-bottom: 17px;
                font-size: 14px;
            }

            .han-tra {
                background-color: #ffd6e2;
                color: rgb(137 47 82);
                padding: 1px 12px;
                border-radius: 23px;
                margin-bottom: 17px;
                font-size: 14px;

            }

            .ngay-tra {
                background-color: #ffebd6;
                color: #8f6b00;
                padding: 1px 12px;
                border-radius: 23px;
                margin-bottom: 17px;
                font-size: 14px;
            }
        }

    }
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>