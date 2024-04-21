<template>
    <div class="header">
      <div class="name">
        <h6>Hello! {{ username }}</h6>

      </div>
      <div class="icon">
        <i class="bi bi-cart"></i>
      </div>
      <div class="icon">
        <i class="bi bi-person"></i>
      </div>

      <div class="icon">
        <i class="bi bi-box-arrow-right"></i>
      </div>

        </div>
  </template>
  
  <script>


  export default {
    data() {
      return {
        username: 'User' // Thay đổi này dựa trên trạng thái đăng nhập của người dùng
      }
    },
    methods: {
      logout() {
        // Thêm logic đăng xuất ở đây
        console.log('User logged out');
      }
    }
  }
  </script>
  
  <style scoped>
  @import 'bootstrap-icons/font/bootstrap-icons.css';
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 37px;
    background-color: #4ed0d8;
    gap: 40px;
    color: white;
  }

  .icon{
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
  </style>