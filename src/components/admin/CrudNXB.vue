<template>
  <div class="container">
    <div class="col-6 mt-4">
      <h4 class="ms-">Tạo nhà xuất bản</h4>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Tên nhà xuất bản:</label>
          <input class="form-control" v-model="nxb.tenNXB" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Địa chỉ:</label>
          <input class="form-control" v-model="nxb.diaChi" required>
        </div>
        <button class="btn btn-primary" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">Thêm
          mới</button>
      </form>
    </div>

    <!-- get all nxb -->
    <div class="bottom mt-5 mb-5">
      <div class="mt-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên NXB</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(nxb, index) in paginatedData" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ nxb.tenNXB }}</td>
              <td>{{ nxb.diaChi }}</td>

              <td>
                <button class="btn mr-2" @click="openEditModal(nxb)"><i class="fa fa-edit"></i></button>
                <button class="btn " @click="deleteNXB(nxb._id)"><i class="fa fa-trash text-danger"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- get all nxb -->

        <!-- phân trang -->
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage--">Trước</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
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

  <!-- modal -->
  <div class="modal" v-show="showEditModal">
    <div class="modal-content col-5">
      <h5>Chỉnh sửa Nhà xuất bản</h5>
      <form @submit.prevent="submitEditForm">
        <label class="form-label">Tên Nhà xuất bản</label>
        <input class="form-control" v-model="editForm.tenNXB" type="text" required>

        <label class="form-label mt-3">Địa chỉ</label>
        <input class="form-control mb-3" v-model="editForm.diaChi" type="text" required>

        <button class="btn btn-primary mr-3" style="background-color: #4ed0d8; border:#4ed0d8" type="submit">Cập
          nhật</button>
        <button class="btn btn-warning" type="button" @click="showEditModal = false">Đóng</button>
      </form>
    </div>
  </div>
  <!-- modal -->

</template>

<script>
import NxbService from '@/services/nxb.service';
import { mapState } from 'vuex';

export default {
  name: "CrudNXB",
  data() {
    return {
      nxb: {
        tenNXB: '',
        diaChi: ''
      },
      currentPage: 1,
      perPage: 6,
      showEditModal: false,
      editForm: {
        _id: '',
        tenNXB: '',
        diaChi: '',
      },
    };
  },
  computed: {
    ...mapState(['sharedNxbs']), // Thêm sharedNxbs từ Vuex store

    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sharedNxbs.slice(start, end); // Thay nxbs bằng sharedNxbs
    },
    totalPages() {
      return Math.ceil(this.sharedNxbs.length / this.perPage); // Thay nxbs bằng sharedNxbs
    }
  },

  created() {
    this.$store.dispatch('fetchNxbs');
  },
  methods: {
    //fetch
    async fetchData() {
      try {
        const response = await NxbService.getAllNXB();
        this.nxbs = response.nxb; // lưu trữ kết quả vào biến dữ liệu

        this.$store.dispatch('setSharedNxbs', this.nxbs); // đổi tên setNxbs thành setSharedNxbs
      } catch (error) {
        console.error(error);
      }
    },
    // craete
    async submitForm() {
      try {
        const response = await NxbService.createNXB(this.nxb);
        if (response.errCode === 0) {
          alert('Thêm nhà xuất bản thành công');
          this.nxb.tenNXB = '';
          this.nxb.diaChi = '';
          this.$store.dispatch('fetchNxbs'); // tải lại danh sách nhà xuất bản
        } else {
          alert(`${response.errMessage}`);
        }
      } catch (error) {
        console.error(error);
        alert('Có lỗi khi thêm nhà xuất bản.');
      }
    },
    //edit
    openEditModal(nxb) {
      this.editForm._id = nxb._id;
      this.editForm.tenNXB = nxb.tenNXB;
      this.editForm.diaChi = nxb.diaChi;
      this.showEditModal = true;
    },
    async submitEditForm() {
      try {
        const response = await NxbService.editNXB(this.editForm);
        if (response.errCode === 0) {
          alert('Chỉnh sửa nhà xuất bản thành công');
          this.$store.dispatch('fetchNxbs'); // tải lại danh sách nhà xuất bản
          this.showEditModal = false;

        } else {
          console.error(response.errMessage);
        }
      } catch (error) {
        console.error(error);
      }
    },
    //xóa
    async deleteNXB(nxbId) {
      try {
        const response = await NxbService.deleteNXB(nxbId);
        if (response.errCode === 0) {
          alert('Xóa nhà xuất bản thành công');
          this.$store.dispatch('fetchNxbs'); // tải lại danh sách nhà xuất bản
        } else {
          console.error(response.errMessage);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

};
</script>

<style scoped>
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
</style>