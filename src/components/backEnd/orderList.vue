<template>
  <div>
    <table class="table mt-4">
      <thead>
        <th width="150" class="text-left">購買日期</th>
        <th width="280" class="text-left">訂單編號</th>
        <th width="320" class="text-left">Email</th>
        <th>購買款項</th>
        <th width="120" class="text-center">應付金額</th>
        <th width="180" class="text-center">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item in order" :key="item.paid_date">
          <td
            class="text-left"
            v-if="item.is_paid"
          >{{new Date(item.paid_date*1000).getFullYear()}} / {{new Date(item.paid_date*1000).getMonth()}} / {{new Date(item.paid_date*1000).getDate()}}</td>
          <td class="text-left" v-else>無</td>
          <td class="text-left">{{item.id}}</td>
          <td class="text-left">{{item.user.email}}</td>
          <td class="text-left">
            <p
              v-for="productTitle in item.products"
              :key="productTitle.id"
            >{{productTitle.product.title}} * {{productTitle.qty}}/{{productTitle.product.unit}}</p>
          </td>

          <td class="text-right">{{item.total|currency}}</td>
          <td class="text-center">
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <page :pagedata="page" v-on:chosepage="getOrder" class="d-flex justify-content-center"></page>
  </div>
</template>
<script>
import page from "@/components/both/page";

export default {
  data() {
    return {
      is_enabled: true,
      order: [],
      page: {}
    };
  },
  methods: {
    getOrder(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.order = response.data.orders;
        vm.page = response.data.pagination;
        console.log(response);
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getOrder();
  },
  components: {
    page
  }
};
</script>