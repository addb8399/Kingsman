<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openMoudal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th>名稱</th>
        <th width="250" class="text-center">優惠碼</th>
        <th width="120" class="text-center">折扣百分比</th>
        <th width="200" class="text-center">到期日</th>
        <th width="120" class="text-center">是否啟用</th>

        <th width="180" class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td class="text-center">{{item.code}}</td>
          <td class="text-center">{{item.percent}}%</td>
          <td class="text-center">{{item.due_date}}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-primary btn-sm" @click="openMoudal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="opendelMoudal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠券名稱</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="coupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="title">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="coupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="title">折扣百分比</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="coupon.percent"
                placeholder="請輸入折扣"
              />
            </div>
            <div class="form-group">
              <label for="title">到期日</label>

              <input
                type="date"
                class="form-control"
                id="title"
                v-model="coupon.due_date"
                placeholder="請輸入到期日"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="coupon.is_enabled"
                  :ture-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="couponData(isNew)">確認</button>
            <!--@click="updateProduct"-->
          </div>
        </div>
      </div>
    </div>
    <!-- DeletModal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCouponModal()">確認刪除</button>
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
      coupons: [],
      isLoading: false,
      tempProduct: {},
      coupon: {},
      isNew: ""
    };
  },
  methods: {
    getcoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("getcoupons response", response);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        console.log(vm.coupons);
      });
    },
    openMoudal(isNew, item) {
      if (isNew) {
        this.coupon = {};
        this.isNew = true;
      } else {
        this.coupon = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    opendelMoudal(item) {
      this.coupon = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    delCouponModal() {
      console.log("Coupon ID ", this.coupon.id);
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/admin/coupon/${vm.coupon.id}`;
      this.$http.delete(api).then(response => {
        console.log(response);
        $("#delProductModal").modal("hide");
        vm.getcoupons();
      });
    },
    couponData(isNew) {
      console.log("couponData");
      let vm = this;
      if (isNew) {
        const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/admin/coupon`;
        vm.isLoading = true;
        this.$http.post(api, { data: vm.coupon }).then(response => {
          console.log(response);
          vm.isLoading = false;
          vm.getcoupons();
          $("#productModal").modal("hide");
        });
      } else {
        console.log("couponData upDate");
        const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/admin/coupon/${vm.coupon.id}`;
        vm.isLoading = true;
        this.$http.put(api, { data: vm.coupon }).then(response => {
          console.log("couponData upDate response", response);
          vm.isLoading = false;
          vm.getcoupons();
          $("#productModal").modal("hide");
        });
      }
    }
  },
  created() {
    this.getcoupons();
  }
};
</script>