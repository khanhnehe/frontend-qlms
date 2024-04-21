<template>
    <div class="contai-sach">
        <div class="mt-4">
            <!-- tạo sách -->
            <h4 class="mr-5" style="margin-left: 92px;">Tạo Sách</h4>
            <form @submit.prevent="submitForm">
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
                            <select class="form-control" v-model="sach.MaXNB" required>
                                <option v-for="nxb in sharedNxbs" :value="nxb._id" :key="nxb._id">{{ nxb.tenNXB }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tác Giả:</label>
                            <input placeholder="Nhập tên tác giả" class="form-control" v-model="sach.tacGia" required>
                        </div>

                        <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8"
                            type="submit">Thêm
                            mới</button>
                    </div>
                    <div class="col-1"></div>
                </div>
            </form>
        </div>
        <!-- tạo sách -->

        <!-- get all sach -->
        <div class="bottom mt-5 mb-5">
            <div class="row- mt-4">
                <table class="table table-to">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số quyển</th>
                            <th scope="col">Nhà xuất bản</th>
                            <th scope="col">Tác giả</th>
                            <th scope="col">Năm xuất bản</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sach, index) in paginatedData" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ sach.maSach }}</td>
                            <td class="ten-sach">{{ sach.tenSach }}</td>
                            <td>
                                <img :src="sach.anhSach" v-if="sach.anhSach" style="width: 60px; height: auto;">
                            </td>
                            <td class="mo-ta">{{ sach.moTa }}</td>
                            <td>{{ sach.donGia }}</td>
                            <td>{{ sach.soQuyen }}</td>
                            <td>{{ sach.MaXNB.tenNXB }}</td>
                            <td>{{ sach.tacGia }}</td>
                            <td>{{ sach.namXuatBan }}</td>
                            <td>
                                <button class="btn mr-2" @click="handeditSach(sach)">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn " @click="deleteSach(sach._id)">
                                    <i class="fa fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- get all sach -->


                <!-- phân trang -->
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="currentPage--">Trước</a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page"
                            :class="{ active: currentPage === page }">
                            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="currentPage++">Sau</a>
                        </li>
                    </ul>
                </nav>
            </div>
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
            currentPage: 1,
            perPage: 6,
            //edit 
            
        };
    },
    computed: {
        //lấy state
        ...mapState(['sharedNxbs']),
        ...mapState(['sharedSachs']),

        //phân trang
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.sharedSachs.slice(start, end);
        },
        // chia trang
        totalPages() {
            return Math.ceil(this.sharedSachs.length / this.perPage);
        }
    },
    created() {
        //gọi action
        this.$store.dispatch('fetchNxbs');
        this.$store.dispatch('fetchSachs');

    },
    methods: {
        //đến page edit
        handeditSach(sach) {
        this.$router.push({ name: 'sach.edit', params: { id: sach._id } });
    },
        //upload ảnh
        async onFileChange(e) {
            const file = e.target.files[0];
            const upImage = await getBase64(file);
            this.sach.anhSach = upImage;
        },
       
        //fetch
        async fetchData() {
            try {
                const response = await sachService.getAllSach();
                this.sachs = response.sach;
                this.$store.dispatch('fetchSachs', this.sachs);

            } catch (error) {
                console.error(error);
            }
        },
        // craete
        async submitForm() {
            try {
                const response = await SachService.createSach(this.sach);
                if (response.errCode === 0) {
                    alert('Thêm Sách thành công');
                    this.sach = {
                        maSach: '',
                        tenSach: '',
                        anhSach: '',
                        moTa: '',
                        donGia: '',
                        soQuyen: '',
                        namXuatBan: '',
                        MaXNB: '',
                        tacGia: '',
                    };
                    this.$store.dispatch('fetchSachs');
                } else {
                    alert(`${response.errMessage}`);
                }
            } catch (error) {
                console.error(error);
                alert('Có lỗi khi thêm Sách.');
            }
        },      
        //xóa
        async deleteSach(sachId) { 
            try {
                const response = await SachService.deleteSach(sachId);
                if (response.errCode === 0) {
                    alert('Xóa sách thành công');
                    this.$store.dispatch('fetchSachs'); // tải lại danh sách sách
                } else {
                    alert(`${response.errMessage}`);
                }
            } catch (error) {
                console.error(error);
                alert('Có lỗi khi xóa sách.');
            }
        },
    },
};
</script>

<style scoped>
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

.table-to {
    width: 100%;
    max-width: 100%;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
</style>