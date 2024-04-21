<template>
    <div>
      <HeaderHome />
      <main>
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
import HeaderHome from '@/components/ui/HeaderHome.vue';
 
  export default {
    components: {
        HeaderHome,
      
    }
  };
  </script>