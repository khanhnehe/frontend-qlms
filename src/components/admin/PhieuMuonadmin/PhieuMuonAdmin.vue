<template>
    <div class="phieu-content mb-5">
        <div class="mt-4"></div>
        <button class="fetch" @click="fetchPhieuMuon">Tải lại</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>

                    <th>Hành động</th>

                    <th>Mã phiếu</th>
                    <th>Sách</th>
                    <th>Người mượn</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>

                    <th>Ngày mượn</th>
                    <th>Hạn trả</th>
                    <th>Ngày trả</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(phieu, index) in phieuList" :key="index">
                    <td>{{ index + 1 }}</td>

                    <td>
                        <!-- hành động -->
                        <template v-if="phieu.trangThai === 'Chờ xác nhận'">
                            <button class="btn-huy" @click="huyMuon(phieu._id)">Hủy mượn</button>
                            <button class="btn-xac" @click="xacNhanMuon(phieu._id)">Xác nhận</button>
                        </template>
                        <template v-else>
                            &nbsp;
                        </template>
                    </td>
                    <!-- ma phieu -->
                    <td class="code" @click="openModal(phieu)">{{ phieu.orderCode }}</td>

                    <!-- sách -->
                    <td>
                        <div class="top" v-for="(item, index) in phieu.PhieuMuonItems" :key="index">
                            <div class="left">
                                <img :src="item.image" style="width: 40px;">
                            </div>
                            <div class="right">
                                <div class="name">{{ item.name }} </div>
                                <div class="price"> Giá: {{ item.price.toLocaleString('vi-VN', {
                                    style: 'currency', currency: 'VND'
                                }) }}</div>
                            </div>
                        </div>
                    </td>
                    <!-- sách -->

                    <td class="ten-docgia">{{ phieu.docgia.ten }}</td>
                    <td class="total">{{ phieu.totalPrice.toLocaleString('vi-VN', {
                        style: 'currency', currency: 'VND'
                    }) }}</td>

                    <!-- trạng thái -->
                    <td>
                        <span class="status">{{ phieu.trangThai }}</span>
                    </td>

                    <!-- ngày -->
                    <td v-if="phieu.trangThai !== 'Đã hủy' && phieu.trangThai !== 'Chờ xác nhận'">
                        <span class="ngay-muon">{{ formatDate(phieu.ngayMuon) }}</span>
                    </td>
                    <td v-if="phieu.trangThai !== 'Đã hủy' && phieu.trangThai !== 'Chờ xác nhận'">
                        <span class="han-tra">{{ formatDate(phieu.hanTra) }}</span>
                    </td>

                    <td v-if="phieu.trangThai === 'Đã trả' && phieu.trangThai !== 'Chờ xác nhận'">
                        <span class="ngay-tra">{{ formatDate(phieu.ngayTra) }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Modal -->
    <div v-if="showModal" class="modal">
        <div class="modal-content col-6">
            <div class="close mb-3" @click="closeModal">&times;</div>
            <h4 class="mb-3">Chi tiết phiếu mượn</h4>
            <p>Mã phiếu: {{ modalPhieu.orderCode }}</p>
            <p>Sách: {{ modalPhieu.PhieuMuonItems[0].name }}</p>
            <p>Người mượn: {{ modalPhieu.docgia.hoLot }} {{ modalPhieu.docgia.ten }}</p>
            <p>Tổng tiền: {{ modalPhieu.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
            </p>
            <p>Trạng thái: {{ modalPhieu.trangThai }}</p>
            <p v-if="modalPhieu.trangThai !== 'Chờ xác nhận'">Ngày Mượn: {{ formatDate(modalPhieu.ngayMuon) }}</p>
            <p v-if="modalPhieu.trangThai !== 'Chờ xác nhận'">Hạn trả: {{ formatDate(modalPhieu.hanTra) }}</p>
            <p v-if="modalPhieu.trangThai === 'Đã trả'">Ngày trả: {{ formatDate(modalPhieu.ngayTra) }}</p>
            <p>Địa chỉ: {{ modalPhieu.docgia.diaChi }}</p>
            <p>Điện thoại: {{ modalPhieu.docgia.dienThoai }}</p>
        </div>
    </div>
</template>

<script>
import PhieuService from '@/services/phieu.service';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
    name: 'PhieuMuonAdmin',
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
        await this.fetchPhieuMuon();
    },
    methods: {
        async fetchPhieuMuon() {
            try {
                const response = await PhieuService.getAllPhieu();
                if (response.errCode === 0) {
                    this.phieuList = response.phieu;
                } else {
                    console.error(response.errMessage);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async xacNhanMuon(phieuId) {
            try {
                const response = await PhieuService.confirmStatus(phieuId, 'Đang mượn');
                if (response.errCode === 0) {
                    alert('Bạn xác nhận đuơc mượn sách');
                    await this.fetchPhieuMuon();

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
                    await this.fetchPhieuMuon();

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
.phieu-content {
    padding: 0px 50px;

    .fetch {
        color: #28a745;
        border-radius: 5px;
        padding: 5px 14px;
        margin-top: 9px;
        width: fit-content;
        border: 2px solid #28a745;
        font-weight: 500;
        margin-bottom: 11px;
        background-color: white;

        &:hover {
            background-color: #bdfacb;

        }

    }

    .btn-huy {
        background-color: #4ed0d8;
        border: none;
        color: white;
        border-radius: 5px;
        padding: 5px 5px;
        margin-top: 9px;
    }

    .btn-xac {
        background-color: #4ed887;
        border: none;
        color: white;
        border-radius: 5px;
        padding: 5px 5px;
        margin-top: 9px;
        margin-left: 5px;

    }

    .code {
        font-size: 12px;
        font-weight: 500;

    }

    .top {
        display: flex;
        gap: 7px;

        .left {}

        .right {
            display: grid;

            .name {
                font-size: 12px;
                font-weight: 500;
                width: 150px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: black;
            }

            .price {
                font-size: 13px;
                font-weight: 500;
                color: darkred;
            }
        }
    }

    .ten-docgia {
        font-size: 14px;
        font-weight: 500;
    }

    .total {
        font-size: 14px;
        font-weight: 500;
        color: darkred;
    }

    .status {
        background-color: #d6fdff;
        color: rgb(47, 133, 137);
        padding: 1px 12px;
        border-radius: 23px;
        margin-bottom: 13px;

    }

    .status {
        background-color: #d6fdff;
        color: rgb(47, 133, 137);
        padding: 1px 12px;
        border-radius: 23px;
        margin-bottom: 13px;
    }

    .ngay-muon {

        color: rgb(38, 145, 82);
        padding: 1px 12px;
        border-radius: 23px;
        margin: 17px;
        font-size: 14px;
        width: fit-content;
        background-color: #d2f6e1;

    }

    .han-tra {
        background-color: #ffd6e2;
        color: rgb(137 47 82);
        padding: 1px 12px;
        border-radius: 23px;
        margin-bottom: 17px;
        font-size: 14px;
        width: fit-content;

    }

    .ngay-tra {
        background-color: #ffebd6;
        color: #8f6b00;
        padding: 1px 12px;
        border-radius: 23px;
        margin-bottom: 17px;
        font-size: 14px;
        width: fit-content;
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