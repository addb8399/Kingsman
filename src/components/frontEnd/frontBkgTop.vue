<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-light bg-primary d-flex justify-content-start">
      <router-link class="navbar-brand text-white mr-auto" to="/products">
        <i class="fas fa-user-tie" aria-hidden="true"></i>
        金仕曼 Gentleman Shop
      </router-link>
      <div>
        <router-link class="text-white ml-3 text-decoration-none" to="/aboutUs">關於我們</router-link>
        <router-link class="text-white ml-3 text-decoration-none" to="/products">金仕曼商場</router-link>
        <router-link class="text-white ml-3 text-decoration-none" to="/manteacher">金仕曼講師</router-link>
      </div>

      <div class="dropdown ml-3">
        <button
          class="btn btn-sm btn-cart"
          data-toggle="dropdown"
          data-flip="false"
          id="carmenu"
          @click="showcarORnot"
        >
          <i class="fa fa-shopping-cart text-dark fa-2x text-white" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{cartData.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3 tooltip"
          style="min-width: 400px"
          data-offset="400"
          :class="{show:showcar}"
          aria-labelledby="carmenu"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cartData" :key="item.id">
                <td class="align-middle text-center">
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                    @click.prevent="delCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </a>
                </td>
                <td class="align-middle">{{item.product.title}}</td>
                <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                <td class="align-middle text-right">${{item.total}}</td>
              </tr>
            </tbody>
          </table>
          <a href="#" class="btn btn-primary btn-block" @click.prevent="gotoCheckOut()">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["cartData"],
  data() {
    return {
      isLoading: false,
      showcar: false
    };
  },

  methods: {
    delCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        console.log(response);
        this.$emit("afterRemove", id);
        vm.isLoading = false;
      });
    },
    showcarORnot() {
      this.showcar = !this.showcar;
    },
    gotoCheckOut() {
      const vm = this;
      console.log("gotoCheckOut");
      vm.$router.push(`/checkPage`);
    }
  }
};
</script>

