<template>
  <div>
    <HeaderHome />
    <main>
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