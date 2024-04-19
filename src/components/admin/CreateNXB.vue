<template>
    <div>
      <h1>Create NXB</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="tenNXB">Tên NXB:</label>
          <input id="tenNXB" v-model="nxbData.tenNXB" required>
        </div>
        <div>
          <label for="diaChi">Địa chỉ:</label>
          <input id="diaChi" v-model="nxbData.diaChi" required>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  import NxbService from '@/services/nxb.service';
  
  export default {
    data() {
      return {
        nxbData: {
          tenNXB: '',
          diaChi: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await NxbService.createNXB(this.nxbData);
          if (response.errCode === 0) {
            alert('Created successfully');
            // Reset form
            this.nxbData.tenNXB = '';
            this.nxbData.diaChi = '';
          } else {
            alert(`Error: ${response.errMessage}`);
          }
        } catch (error) {
          console.error(error);
          alert('There was an error while creating the NXB.');
        }
      }
    }
  };
  </script>