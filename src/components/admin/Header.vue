<template>
  <nav>
    <div class="header">
      <div class="left">
        <div class="router"><router-link to="/admin/manager-nxb">Nhà xuất bản</router-link></div>
        <div class="router"><router-link to="/admin/manager-sach">Sách</router-link></div>
        <div class="router"><router-link to="/admin/phieu-muon">Phiếu Mượn</router-link></div>
      </div>
      <div class="right">
        <router-link to="/admin/login-admin">
          <div class="icon" style="color: white">
            <i class="bi bi-box-arrow-right"></i>
          </div>
        </router-link>
      </div>

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
    justify-content: space-between;
    padding: 10px 30px;


    .left {
      display: flex;
      justify-content: flex-start;
      gap: 74px;
      height: 40px;

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

    .icon {
      font-size: 21px;
      cursor: pointer;
    }



  }



  a {
    text-decoration: none;
    color: white;
  }

}
</style>