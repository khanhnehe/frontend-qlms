<template>
  <div id="app">
    <Header />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/admin/Header.vue';

export default {
  components: {
    Header
  }
};
</script>