<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <frontBkgTop :cartData="cartList" @afterRemove="gerCart"></frontBkgTop>
    <carousel></carousel>

    <!-- 列表頁 -->
    <div class="container mb-1">
      <!-- 左側選單 (List group) -->
      <div class="row">
        <div class="btn-group col">
          <button
            type="button"
            class="btn border border-bottom-0 rounded-left"
            :class="{'btn-white border-primary':choosetype=='all','btn-primary border-light':choosetype!='all'}"
            @click.prevent="choosetype='all'"
            @click="removeSearchName"
          >全部商品</button>
          <button
            type="button"
            class="btn border border-bottom-0 rounded-0"
            :class="{'btn-white border-primary':choosetype=='suit','btn-primary border-light':choosetype!='suit'}"
            @click.prevent="choosetype='suit'"
            @click="removeSearchName"
          >金仕曼西裝</button>
          <button
            type="button"
            class="btn border border-bottom-0 rounded-0"
            :class="{'btn-white border-primary':choosetype=='shoes','btn-primary border-light':choosetype!='shoes'}"
            @click.prevent="choosetype='shoes'"
            @click="removeSearchName"
          >金仕曼鞋子</button>
          <button
            type="button"
            class="btn border border-bottom-0 rounded-right"
            :class="{'btn-white border-primary':choosetype=='others','btn-primary border-light':choosetype!='others'}"
            @click.prevent="choosetype='others'"
            @click="removeSearchName"
          >金仕曼配件</button>
        </div>
      </div>

      <div class="row">
        <div class="col pt-3">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <div class=" mr-auto">
              <div class="input-group ">
                <input type="text" class="form-control" placeholder="Search" aria-label="Search" v-model="searchnameReady">
                <div class="input-group-append" >
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="searchProducts()"><i class="fa fa-search" aria-hidden="true"></i> Search</button>
                
                </div>
              </div>
            </div>
            <label for="onePageData" class="col-form-label pr-1">一頁商品數量</label>
            <select
              class="rounded px-2"
              id="onePageData"
              v-model="page.onePageData"
              @change="page.current_page=1"
            >
              <option value="6" page.onePageData>6個</option>
              <option value="9">9個</option>
            </select>
          </div>
          <!-- 主要商品列表 (Card) -->
          <div class="tab-content">
            <div class="tab-pane active" id="list-gold">
              <div class="row" v-if="productsType.length!=0">
                <!-- 金牌 -->
                <div class="col-md-4 mb-4" v-for="item in productsType" :key="item.id">
                  <div class="card border-0 box-shadow text-center h-100">
                    <img class="card-img-top" :src="item.imageUrl" alt="Card image cap" />
                    <div class="card-body">
                      <h4 class="card-title">{{item.title}}</h4>
                      <p class="card-text">{{item.description}}</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <a
                        v-if="item.is_enabled"
                        href="#"
                        class="btn btn-primary btn-block btn-sm"
                        @click.prevent="getTheProduct(item.id)"
                      >
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                      </a>
                      <a v-else href="#" class="btn btn-outline-warning btn-block btn-sm disabled">
                        <i class="fas fa-exclamation-circle"></i> 缺貨中
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center pt-5 pb-5" v-else>
                <h1>查無商品</h1>
              </div>
              <page :pagedata="page" @chosepage="chosepage"></page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <frontBkgBtn></frontBkgBtn>
  </div>
</template>


<script>
import frontBkgTop from "@/components/frontEnd/frontBkgTop";
import carousel from "@/components/frontEnd/carousel";
import frontBkgBtn from "@/components/frontEnd/frontBkgBtn";
import page from "@/components/both/page";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      choosetype: "all",
      itemType: {
        all: [],
        suit: [],
        hat: [],
        shoes: [],
        others: []
      },
      searchname: "",
      searchnameReady: "",
      page: {
        total_pages: "",
        current_page: 1,
        has_pre: "",
        has_next: "",
        onePageData: 6
      },
      cartList: []
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.isLoading = false;

        vm.products = response.data.products;

        response.data.products.forEach(item => {
          if (item.category == "西裝") {
            vm.itemType.suit.push(item);
          }
          if (item.category == "帽子") {
            vm.itemType.hat.push(item);
          }
          if (item.category == "鞋子") {
            vm.itemType.shoes.push(item);
          }
          if (item.category == "配件") {
            vm.itemType.others.push(item);
          }
        });
        vm.itemType.all = vm.itemType.suit.concat(
          vm.itemType.hat,
          vm.itemType.shoes,
          vm.itemType.others
        );
        //按照分類排列
      });
    },
    getTheProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        console.log("response", response);
        if (response.data.success) {
          vm.$router.push(`/product/${response.data.product.id}`);
        } else {
          console.log("false message", response.data.message);
        }
      });
    },
    searchProducts() {
      const vm = this;
      vm.searchname = vm.searchnameReady;
      vm.searchnameReady = "";
    },
    removeSearchName() {
      const vm = this;
      vm.searchname = "";
      vm.page.current_page = 1;
    },
    gerCart() {
      const api = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.cartList = response.data.data.carts;
        vm.isLoading = false;
      });
    },
    chosepage(page) {
      const vm = this;
      vm.page.current_page = page;
    }
  },
  created() {
    this.getProduct();
    this.gerCart();
  },
  computed: {
    productsType: function() {
      const vm = this;
      let Result = [];
      if (this.choosetype == "all") {
        Result = vm.itemType.all;
      }
      if (this.choosetype == "suit") {
        Result = vm.itemType.suit;
      }
      if (this.choosetype == "hat") {
        Result = vm.itemType.hat;
      }
      if (this.choosetype == "shoes") {
        Result = vm.itemType.shoes;
      }
      if (this.choosetype == "others") {
        Result = vm.itemType.others;
      }

      if (vm.searchname == "") {
        let pageDataStar = (vm.page.current_page - 1) * vm.page.onePageData;
        let pageDataEnd = pageDataStar + vm.page.onePageData;

        vm.page.total_pages = Math.ceil(Result.length / vm.page.onePageData);

        if (vm.page.current_page == 1) {
          vm.page.has_pre = false;
        } else {
          vm.page.has_pre = true;
        }

        if (vm.page.total_pages >= 2) {
          if (vm.page.current_page >= vm.page.total_pages) {
            vm.page.has_next = false;
          } else {
            vm.page.has_next = true;
          }
        } else {
          vm.page.has_next = false;
        }

        console.log(Result);
        Result = Result.slice(pageDataStar, pageDataEnd);
        console.log(Result);
        return Result;
      } else {
        let searchResult = [];
        Result.forEach(item => {
          if (item.title.search(vm.searchname) != -1) {
            searchResult.push(item);
          }
        });

        vm.page.total_pages = Math.ceil(
          searchResult.length / vm.page.onePageData
        );
        vm.page.current_page = 1;
        vm.page.has_pre = false;
        if (vm.page.total_pages >= 2) {
          vm.page.has_next = true;
        } else {
          vm.page.has_next = false;
        }

        return searchResult;
      }
    }
  },
  components: {
    frontBkgTop,
    frontBkgBtn,
    page,
    carousel
  }
};
</script>