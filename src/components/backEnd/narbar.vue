<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/admin/productList">金仕曼管理平台</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        vm.$router.push("/products");
      });
    }
  }
};
</script>