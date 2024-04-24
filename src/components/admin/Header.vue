<template>
  <nav>
    <div class="header">
      <div class="router"><router-link to="/admin/manager-nxb">Nhà xuất bản</router-link></div>
      <div class="router"><router-link to="/admin/manager-sach">Sách</router-link></div>
      <div class="router"><router-link to="/doc-gia">Độc giả</router-link></div>
      <div class="router"><router-link to="/admin/phieu-muon">Phiếu Mượn</router-link></div>
      <div class="router"><router-link to="/ho-so">Hồ sơ</router-link></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
nav {
  list-style-type: none;
  padding: 0;

  .header {
    display: flex;
    background-color: #4ed0d8;
    justify-content: flex-start;
    gap: 74px;
    height: 50px;
    padding: 10px 30px;

    .router {
      font-size: 17px;
      font-weight: 600;

      &:hover,
      &.router-link-active,
      &.router-link-exact-active {
        a {
          border-bottom: 3px solid white;
          color: white;
          text-decoration: none;
        }
      }

    }

  }



  a {
    text-decoration: none;
    color: white;
  }

}
</style>