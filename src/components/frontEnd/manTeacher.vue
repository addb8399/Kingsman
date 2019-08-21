<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <frontBkgTop :cartData="cartList" @afterRemove="gerCart"></frontBkgTop>
    <div class="container  pt-2">
      <div class="teacher1 bg-secondary my-5 p-5">
        <div class="row">
          <div class="col-2">
            <img
              class="rounded-pill"
              src="https://img.gq.com.tw/userfiles/sm/sm160160_images_VBL/64/2018010434046909.jpg"
              alt
            />
          </div>
          <div class="col-10">
            <h2>那個奧客</h2>
            <p>精神分裂到以為自己是哲學家，喜歡東方哲學、西方心理學，是個對任何知識學派都毫無節操的傢伙。著有《壞男人的孫子兵法：情場與人際的雙贏謀略》。</p>
            <h2>推薦文章</h2>

            <ul class="list-group list-group-flush ">
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/neganchor/detail-5159.html">《幹話解答時間》如何增加自己的桃花運？</a></li>
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/neganchor/detail-4414.html">好桃花致勝關鍵：方便造型的養髮秘訣</a></li>
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/neganchor/detail-4134.html">男子漢的健身房搭訕法則</a></li>
            </ul>
          </div>
        </div>
        <div>
            
        </div>
      </div>
       <div class="teacher2 bg-secondary my-5 p-5">
        <div class="row">
          <div class="col-2">
            <img
              class="rounded-pill"
              src="https://img.gq.com.tw/userfiles/sm/sm160160_images_VBL/34/2015110985631481.png"
              alt
            />
          </div>
          <div class="col-10">
            <h2>萊特（Wright)</h2>
            <p>拿筷子就知道出身，成為一個紳士，就從餐廳禮儀開始。 喝酒就知道品味，擴展人際關係，就從葡萄酒社交出發。</p>
            <h2>推薦文章</h2>

            <ul class="list-group list-group-flush ">
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/wright/detail-4293.html">最打動人心的握壽司，也最能打動約會女伴的芳心</a></li>
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/wright/detail-4083.html">雞翅與啤酒，回憶起背包客生活那無拘無束的放肆</a></li>
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/wright/detail-3715.html">約會前必做功課：盤點台北市五家不同情調的餐廳</a></li>
            </ul>
          </div>
        </div>
        <div>
            
        </div>
      </div>
      <div class="teacher3 bg-secondary my-5 p-5">
        <div class="row">
          <div class="col-2">
            <img
              class="rounded-pill"
              src="https://img.gq.com.tw/userfiles/sm/sm160160_images_VBL/21/2017042018485657.jpg"
              alt
            />
          </div>
          <div class="col-10">
            <h2>繪美理</h2>
            <p>Food Trader/旅遊/文化觀察/倫敦日常/歐亞小旅行/搭地鐵玩遍新加坡 www.instagram.com/Emilytanuk/?hl＝en</p>
            <h2>推薦文章</h2>

            <ul class="list-group list-group-flush ">
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/emily/detail-3148.html">「女人真心話」線上交友經典問題，怕踩雷，這樣回答就對了！</a></li>
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/emily/detail-3147.html">「女人真心話」第一次約會，這樣就對了！</a></li>
                <li class="list-group-item bg-secondary"><a href="https://www.gq.com.tw/blog/emily/detail-2876.html">還在為那已讀不回的簡訊念念不忘?別傻了，女孩子也在進化中。</a></li>
            </ul>
          </div>
        </div>
        <div>
            
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