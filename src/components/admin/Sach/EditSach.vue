<template>
    <div class="contai-sach">
        <div class="mt-4">
            <!-- tạo sách -->
            <h4 class="mr-5" style="margin-left: 92px;">Chỉnh sửa sách</h4>
            <form @submit.prevent="submitEditForm">
                <div class="row">
                    <!-- cột 1 -->
                    <div class="col-1"></div>
                    <div class="col-5">
                        <div class="mb-3">
                            <label class="form-label">Mã Sách:</label>
                            <input placeholder="Nhập mã sách" class="form-control" v-model="sach.maSach" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tên Sách:</label>
                            <input placeholder="Nhập tên sach" class="form-control" v-model="sach.tenSach" required>
                        </div>

                        <!-- ảnh -->
                        <div class="row">
                            <div class="col-3 mb-3" style="">
                                <label class="form-label">Ảnh Sách:</label>
                                <input type="file" @change="onFileChange" id="fileInput">
                            </div>
                            <div class="col">
                                <!-- hiển thị ảnh đã chọn -->
                                <img :src="sach.anhSach" class="image" v-if="sach.anhSach">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Mô Tả:</label>
                            <textarea placeholder="Nhập mô tả" class="form-control" v-model="sach.moTa" rows="5"
                                required></textarea>
                        </div>

                    </div>
                    <!-- cột 2 -->
                    <div class="col-5">
                        <div class="mb-3">
                            <label class="form-label ">Đơn Giá:</label>
                            <input placeholder="Nhập đơn giá" class="form-control" v-model="sach.donGia" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Số Quyển:</label>
                            <input placeholder="Nhập số quyển" class="form-control" v-model="sach.soQuyen" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Năm Xuất Bản:</label>
                            <input placeholder="Nhập năm xuất bản" class="form-control" v-model="sach.namXuatBan"
                                required>
                        </div>
                        <!-- truyền vào nxb -->
                        <div class="mb-3">
                            <label class="form-label">Nhà Xuất Bản:</label>
                            <select class="form-control" v-model="sach.MaXNB._id" required>
                                <option v-for="nxb in sharedNxbs" :value="nxb._id" :key="nxb._id">{{ nxb.tenNXB }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tác Giả:</label>
                            <input placeholder="Nhập tên tác giả" class="form-control" v-model="sach.tacGia" required>
                        </div>

                        <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">
                            Lưu thay đổi
                        </button>
                    </div>
                    <div class="col-1"></div>
                </div>
            </form>
        </div>

    </div>
    <!-- phân trang -->

</template>

<script>
import SachService from '@/services/sach.service';
import { getBase64 } from '@/util/Base64';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            sach: {
                _id: '',
                maSach: '',
                tenSach: '',
                anhSach: '',
                moTa: '',
                donGia: '',
                soQuyen: '',
                namXuatBan: '',
                MaXNB: '',
                tacGia: '',
            },
        };

    },
    computed: {
        //lấy state
        ...mapState(['sharedNxbs']),
        ...mapState(['sharedSachs']),
    },
    async created() {
        const id = this.$route.params.id;
        this.$store.dispatch('fetchNxbs');
        this.$store.dispatch('fetchSachs');

        // Lấy sách dựa trên id
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
    methods: {
        //upload ảnh
        async onFileChange(e) {
            const file = e.target.files[0];
            const upImage = await getBase64(file);
            this.sach.anhSach = upImage;
        },

        async fetchData() {
            try {
                const response = await sachService.getAllSach();
                this.sachs = response.sach;
                this.$store.dispatch('fetchSachs', this.sachs);

            } catch (error) {
                console.error(error);
            }
        },

        async submitEditForm() {
            try {
                const response = await SachService.editSach(this.sach, this.sach._id);
                if (response.errCode === 0) {
                    alert('Chỉnh sửa Sách thành công');
                    this.$store.dispatch('fetchSachs');
                } else {
                    console.error(response.errMessage);
                }
            } catch (error) {
                console.error(error);
            }
        },

    }
}



</script>

<style scoped>
.contai-sach {
    padding: 0px 150px;
}

.upload-btn {
    padding: 5px 10px;
    background-color: #4ed0d8;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.image {
    width: 120px;
    margin-top: 10px;
    height: auto;
}

.ten-sach {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mo-ta {
    max-width: 250px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: auto;
    text-overflow: ellipsis;
    height: 88px;
    width: 80%;
}
</style>