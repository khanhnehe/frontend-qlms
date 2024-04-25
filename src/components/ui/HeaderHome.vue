<template>
  <div class="header col-12">

    <div class="header-left col-3">
      <router-link to="/">
        <img src="@/assets/logo1.png" style="width: 160px;" />
      </router-link>
    </div>

    <!-- search -->
    <div class="center col-5">
      <div> <input class="thanh-text" type="text" v-model="searchsach" placeholder="Tìm kiếm" />
      </div>
      <div><button class="bnt-search" type="submit" @click="search">
          <i class="fa fa-search"></i>
        </button></div>
    </div>

    <div class="right col-4">

      <div class="name" style="margin-top: 8px;">
        <h6 style="color:white;">Hello! {{ docGia?.ten }}</h6>
      </div>

      <div class="icon" @click="goToCart">
        <i class="bi bi-cart"></i>
      </div>

      <div class="icon" @click="goToPhieu">
        <i class="bi bi-person"></i>
      </div>

      <router-link to="/login">
        <div class="icon" style="color: white">
          <i class="bi bi-box-arrow-right"></i>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import SachService from '@/services/sach.service';

export default {
  name: 'HeaderHome',
  data() {
    return {
      searchsach: '',
    };
  },
  computed: {
    ...mapState(['docGia'])
  },
  methods: {
    goToCart() {
      if (!this.docGia) {
        alert('Vui lòng đăng nhập trước khi xem giỏ hàng');
        return;
      }
      this.$router.push({ name: 'user.CartSach', params: { id: this.docGia._id } });
    },

    goToPhieu() {
      if (!this.docGia) {
        alert('Vui lòng đăng nhập trước khi xem phiếu');
        return;
      }
      this.$router.push({ name: 'user.PhieuCho', params: { id: this.docGia._id } });
    }
    ,

    async search() {
      try {
        const response = await SachService.searchSach(this.searchsach);
        this.$store.dispatch('setketQuaSearch', response.sach);
        this.$router.push({ name: 'user.SearchSach', query: { searchsach: this.searchsach } });
        this.searchsach = '';
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style lang="scss">
@import 'bootstrap-icons/font/bootstrap-icons.css';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 37px;
  background-color: #4ed0d8;
  color: white;

  .header-left {
    width: 50%;
  }

  .center {
    display: flex;

    .thanh-text {
      border: none;
      height: 32px;
      width: 500px;
      border-radius: 5px 0px 0px 5px;
      padding: 12px;
    }

    .bnt-search {
      background-color: #00f8ff;
      height: 32px;
      border-radius: 0px 5px 5px 0px;
      padding: 0px 15px;
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;
    color: white;
    gap: 40px;
  }

  .icon {
    font-size: 21px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>