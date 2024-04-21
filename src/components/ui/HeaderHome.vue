<template>
    <header>
      <h1>Hello! {{ username }}</h1>
      <button @click="logout">Logout</button>
    </header>
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
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
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