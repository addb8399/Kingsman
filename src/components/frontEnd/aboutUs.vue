<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <frontBkgTop :cartData="cartList" @afterRemove="gerCart"></frontBkgTop>

    <div class="container main-contant mt-5">
      <h1 class="text-center">
        <i class="fas fa-user-tie" aria-hidden="true"></i>
        金仕曼 Gentleman Shop
      </h1>

      <div class="row my-5">
        <div class="col-6 bg-secondary">
          <h3 class="text-center">關於我們</h3>
          <p>
            ​金仕曼起源由西裝,紳士為主題開始發想我們提供專業的服務及舒適的空間，
            讓各位紳士來到KINGSMAN如同來到專屬自己的秘密基地，
            <strong>
            我們重視每一位客人的需求,堅持帶給您最好的服務，
           
            聆聽每一位客人的意見、不斷的精進技術，
            </strong>
            維持乾淨且時尚的環境，
            讓您能夠感受到我們的專業，
            ​你們的支持，是我們最大的動力!!!
          </p>
        </div>
        <div class="col-6">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/27/22/05/businessman-1284463_960_720.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
       <div class="row my-5">
       
        <div class="col-6">
          <img
              src="https://cdn.pixabay.com/photo/2017/01/11/12/21/suit-1971670_960_720.jpg"
              class="d-block w-100"
              alt="..."
            />
        </div>
         <div class="col-6 bg-secondary">
          <h3 class="text-center">穿搭顧問</h3>
          <p>
           我們提供一對一客製化的諮詢，根據您的個人特質以及身材，找出屬於您的最完美的黃金比例，讓您約會無往不利，
           在此特別強調，<strong>我們的此項服務不會跟您收取任何的額外費用，也就是完全免費</strong>，立即加入金仕曼的行列，讓我們成為你強而有力的後盾
           
          </p>
        </div>
      </div>
       <div class="row my-5">
        <div class="col-6 bg-secondary">
          <h3 class="text-center">專業的約會諮詢</h3>
          <p>
            怕約會說錯話? 怕約會沒話聊? 還是不知道要去哪約會?
            以上的問題都不用擔心，金仕曼通通都幫你準備好了，<strong>現在只要單筆購買滿1999，立即免費贈送約會實戰攻略(市面售價3000)
            </strong>
          </p>
        </div>
        <div class="col-6">
          <img
            src="https://cdn.pixabay.com/photo/2016/04/10/21/34/woman-1320810_960_720.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
       <div class="row my-5">
       
        <div class="col-6">
          <img
              src="https://cdn.pixabay.com/photo/2017/08/03/12/21/tailoring-2575930_960_720.jpg"
              class="d-block w-100"
              alt="..."
            />
        </div>
         <div class="col-6 bg-secondary">
          <h3 class="text-center">我們的商品</h3>
          <p>
           身為金仕曼，就是要有保衛地球的決心，女生往往都愛能夠拯救地球的男人(你看看007身邊有多少女主角)，因此我的商品在生產的過程以及產出後，絕對符合環保、愛地球。
          </p>
        </div>
      </div>
      <button is="router-link" to="/products" type="button" class="h1 btn btn-primary btn-block btn-sm my-5 py-5 rounded-pill">別再說了，我想馬上逛商場</button>
    </div>
    
    
    <!-- <button is="router-link"
              type="button"
              class="btn btn-primary mt-3"
              to="/products"
            >別再說了，我想馬上逛商場</button> -->
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
      cartList: [],
      isLoading: false
    };
  },
  methods: {
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
    this.gerCart();
  },
  components: {
    frontBkgTop,
    frontBkgBtn,
    Alert
  }
};
</script>