<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage : `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.description}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h5" v-if="!item.price">現在只要{{ item.origin_price}}元</del>
              <del class="h6" v-if="item.price">原價{{ item.origin_price}}元</del>
              <div class="h5" v-if="item.price">現在只要{{ item.price}}元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click.prevent="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click.prevent="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <blockquote class="blockquote mt-3">
              <p class="mb-0" v-html="product.content">{{ product.content }}</p>
              <footer class="blockquote-footer text-right" v-html="product.description "></footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: {},
      cartList: [],
      status: {
        loadingItem: ""
      },
      isLoading: false
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
      console.log(vm.products);
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        console.log(response);
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        $("#productModal").modal("hide");
        console.log(response);
        vm.status.loadingItem = "";
        vm.isLoading = false;
        vm.gerCart();
      });
    },
    gerCart() {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.cartList = response.data.data.carts;

        console.log("response.data.data.carts", vm.cartList);
        console.log("cartList", vm.cartList);
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getProducts();
    this.gerCart();
  }
};
</script>