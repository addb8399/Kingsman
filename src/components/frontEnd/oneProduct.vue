<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <frontBkgTop :cartData="cartList" @afterRemove="gerCart"></frontBkgTop>
    <Alert></Alert>
    <div class="container main-contant mb-1">
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item">
            <a href="#">首頁</a>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products">金仕曼{{productData.category}}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{productData.title}}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-8">
          <img :src="productData.imageUrl" class="w-100 mt-3" alt />
        </div>
        <div class="col-md-4 mb-5">
          <div class="sticky-top" style="top: 10px;">
            <h1 class="h2">
              {{productData.title}}
              <small
                class="text-muted"
                v-if="productData.description==undefined||productData.description==''"
              ></small>
              <small class="text-muted" v-else>({{productData.description}})</small>
            </h1>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted">售價 ${{productData.origin_price}}</del>
              <div class="h3 mb-0 ml-auto text-danger">
                <small>網路價 NT$</small>
                <strong>{{productData.price}}</strong>
              </div>
            </div>
            <hr />
            <div v-if="productData.category=='西裝'">
              尺寸 :
              <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-outline-secondary active">
                  <input type="radio" name="size" checked /> SM
                </label>
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="size" /> M
                </label>
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="size" /> L
                </label>
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="size" /> XL
                </label>
              </div>
            </div>

            <div class="input-group mt-3">
              <select name class="form-control mr-1" id v-model="qty">
                <option value="0" qty>--請選擇數量--</option>
                <option :value="num" v-for="num in 5" :key="num">選購 {{num}} {{productData.unit}}</option>
              </select>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block mt-3"
              @click.prevent="addtoCart(productID,qty)"
            >
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
            </button>

            <div class="mt-2 text-right text-muted">
              <i class="fab fa-cc-visa" aria-hidden="true"></i>
              <i class="fab fa-cc-jcb" aria-hidden="true"></i>
              <i class="fab fa-cc-paypal" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <div>
          <hr class="mt-5" />
          <h2 class="mt-1">我們的商品皆具有以下特色</h2>
          <h3 class="mt-2 text-center">合身剪裁</h3>
          <img
            src="https://images.unsplash.com/photo-1472417583565-62e7bdeda490?w=634"
            class="w-100"
            alt
          />
          <h3 class="mt-5 text-center">純手工製作</h3>
          <img
            src="https://images.unsplash.com/photo-1562725380-6751d8de70f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            class="w-100"
            alt
          />
          <h3 class="mt-5 text-center">環保、愛護地球</h3>
          <img
            src="https://images.unsplash.com/photo-1561363702-e07252da3399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            class="w-100"
            alt
          />
          <div class="alert alert-secondary mt-4" role="alert">
            <h2 class="text-center">購物說明</h2>
            <p>【約定條款】購買前請先詳細閱讀金仕曼官網會員服務條款</p>
            <br />
            <p>【購物流程】 選購商品→購物結帳→填寫資料與付款→訂購完成</p>
            <br />
            <p>【訂購完成】付款完成後訂單即成立，您的電子信箱會即時收到訂單成立的通知信件，商品將於七個工作天內（不含週休及國定例假日）送達收件地址。</p>
            <br />
          </div>
        </div>
      </div>
    </div>
    <frontBkgBtn></frontBkgBtn>
  </div>
</template>

<script>
import frontBkgTop from "@/components/frontEnd/frontBkgTop";
import frontBkgBtn from "@/components/frontEnd/frontBkgBtn";
import Alert from "@/components/both/AlertMessage";

export default {
  data() {
    return {
      productID: "",
      productData: {},
      qty: "0",
      loadingItem: false,
      cartList: [],
      isLoading: false
    };
  },
  methods: {
    getProductData(id) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.productData = response.data.product;
        console.log(response.data.product);
        console.log(vm.productData.description);
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      vm.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.loadingItem = "";
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "成功加入購物車", "success");
          console.log("message:", response.data.success);
          vm.gerCart();
        } else {
          vm.loadingItem = "";
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "無法加入購物車", "danger");
          console.log("message:", response.data.success);
          vm.gerCart();
        }
      });
    },
    gerCart() {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.cartList = response.data.data.carts;
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.productID = this.$route.params.productId;
    this.getProductData(this.productID);
    this.gerCart();
  },
  components: {
    frontBkgTop,
    frontBkgBtn,
    Alert
  }
};
</script>