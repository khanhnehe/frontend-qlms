<template>
  <div class="d-flex flex-column min-vh-100">
    <HeaderHome />
    <main class="flex-fill">
      <router-view />
    </main>
    <Footer />
  </div>
</template>



<script>
import HeaderHome from '@/components/ui/HeaderHome.vue';
import Footer from '@/components/ui/Footer.vue';

export default {
  components: {
    HeaderHome,
    Footer
  }
};
</script>
<style scoped>
.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.flex-fill {
  flex: 1;
}
</style>