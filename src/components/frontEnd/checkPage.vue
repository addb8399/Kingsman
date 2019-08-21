<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- headers -->
    <nav class="navbar navbar-light bg-primary">
      <router-link class="navbar-brand" to="/products">
        <i class="fas fa-user-tie" aria-hidden="true"></i>
        金仕曼 Gentleman Shop
      </router-link>
    </nav>
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">金仕曼結帳系統</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>

      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">{{total|currency}}</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartList" :key="item.id">
                  <td class="align-middle text-center">
                    <a
                      href="#removeModal"
                      class="text-muted"
                      data-toggle="modal"
                      data-title="刪除此項目"
                      @click.prevent="delCartItem(item.id)"
                    >
                      <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img :src="item.product.imageUrl" class="img-fluid img-thumbnail" alt />
                  </td>
                  <td class="align-middle">
                    {{item.product.title}}
                    <div class="text-success" v-if="item.total!==item.final_total">已套用優惠券</div>
                  </td>
                  <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                  <td class="align-middle text-right">{{item.total|currency}}</td>
                </tr>

                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>{{total|currency}}</strong>
                  </td>
                </tr>
                <tr v-if="total!=final_total">
                  <td colspan="4" class="text-right text-success">折扣價為</td>
                  <td class="text-right text-success">
                    <strong>{{final_total|currency}}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
              </div>
            </div>
          </div>
          <hr class="mt-5" />

          <!-- 表單 Form -->
          <h5 class="py-3 mt-3 mb-2 text-center bg-light">金仕曼資訊</h5>
          <form id="needs-validation" @submit.prevent="createOrder">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{'is-invalid': errors.has('name')}"
                  v-model="form.user.name"
                  v-validate="'required'"
                  name="name"
                  id="username"
                  placeholder="姓名"
                />
                <div class="invalid-feedback text-danger" v-show="errors.has('name')">請輸入姓名</div>
              </div>
              <div class="form-group col-md-6">
                <label for="usertel">電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="form.user.tel"
                  v-validate="'required'"
                  name="digits_field"
                  :class="{'is-invalid': errors.has('digits_field')}"
                  placeholder="0912-345-678"
                />
                <div class="invalid-feedback" v-show="errors.has('digits_field')">請輸入電話</div>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.user.email"
                v-validate="'required|email'"
                name="email"
                :class="{'is-invalid': errors.has('email')}"
                placeholder="Email"
              />
              <div
                class="invalid-feedback text-danger"
                v-show="errors.has('email')"
              >{{ errors.first('email') }}</div>
            </div>

            <div class="form-group">
              <label for="inputAddress">地址</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                v-model="form.user.address"
                v-validate="'required'"
                name="address"
                :class="{'is-invalid': errors.has('address')}"
                placeholder="xx縣xx區xx路xx號xx樓"
              />
              <div class="invalid-feedback" v-show="errors.has('address')">請輸入地址</div>
            </div>
            <div class="form-group">
              <label for="message">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.user.message"
              ></textarea>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary" to="/products">繼續選購</router-link>
              <button type="submit" class="btn btn-primary">建立訂單</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

 <script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  "use strict";

  window.addEventListener(
    "load",
    function() {
      var form = document.getElementById("needs-validation");
      form.addEventListener(
        "submit",
        function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    },
    false
  );
})();
</script>


<script>
export default {
  data() {
    return {
      cartList: [],
      isLoading: false,
      total: 0,
      final_total: 0,
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.cartList = response.data.data.carts;
        vm.total = response.data.data.total;
        vm.final_total = response.data.data.final_total;
        vm.isLoading = false;
      });
    },
    delCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        console.log(response);
        this.$emit("afterRemove", id);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      console.log("createOrder");
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(url, { data: order }).then(response => {
            console.log(response);
            if (response.data.success) {
              console.log(response.data.orderId);
              vm.$router.push(`/checkOut/${response.data.orderId}`);
              vm.isLoading = false;
            } else {
              console.log("訂單已建立失敗");
              vm.isLoading = false;
            }
          });
        } else {
          console.log("欄位不完整");
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>
