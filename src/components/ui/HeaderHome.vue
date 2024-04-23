<template>
  <div class="header">

    <div class="header-left">
      <router-link to="/">
        <img src="@/assets/logo1.png" style="width: 160px;" />
      </router-link>
    </div>
    <div class="right">

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

export default {
  name: 'HeaderHome',
  computed: {
    ...mapState(['docGia'])
  },
  methods: {
    logout() {
      console.log('User logged out');
    },
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