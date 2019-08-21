<template>
  <div>
    <loading :active.sync="isLoading"></loading>
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
          <div class="alert alert-light alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            role="alert"
            :class="{'alert-success':!order.is_paid,'alert-light':order.is_paid}"
          >2.金流付款</div>
        </div>
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            role="alert"
            :class="{'alert-success':order.is_paid,'alert-light':!order.is_paid}"
          >3.完成</div>
        </div>
      </section>
    </div>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <h2 class="text-center">購買項目</h2>
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <h2 class="text-center">金仕曼資訊</h2>
        <table class="table">
          <tbody>
            <tr>
              <th width="200">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="!order.is_paid">
          <button class="btn btn-danger">確認付款</button>
        </div>
      </form>
      <div class="alert alert-secondary mt-4" role="alert" v-if="order.is_paid">
        <h2 class="text-center">購物說明</h2>
        <p>恭喜您購買完成，請記下您的訂單編號，若後續有任何問題，請聯絡客服提供您的訂單編號，我們會馬上為您處理</p>
        <br />
        <p>【訂單編號】{{orderID}}</p>
        <br />
        <p>【訂購完成】付款完成後訂單即成立，您的電子信箱會即時收到訂單成立的通知信件，商品將於七個工作天內（不含週休及國定例假日）送達收件地址。</p>
        <br />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isLoading: "",
      orderID: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/order/${vm.orderID}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/pay/${vm.orderID}`;
      vm.isLoading = true;
      this.$http.post(url).then(response => {
        console.log(response);
        if (response.data.success) {
          console.log(response);
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderID = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>