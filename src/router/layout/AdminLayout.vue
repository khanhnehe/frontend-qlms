<template>
    <div>
      <Header />
      <main>
        <router-view />
      </main>
    </div>
</template>
  
  <script>
  import Header from '@/components/admin/Header.vue';
 
  export default {
    components: {
      Header,
      
    }
  };
  </script>