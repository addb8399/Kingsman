<template>
  <div>
    <narbar />
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <sidebar />

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>


<script>
import narbar from "./narbar";
import sidebar from "./sidebar";
import Alert from "@/components/both/AlertMessage";

export default {
  components: {
    narbar,
    sidebar,
    Alert
  }
};
</script>


<style src="@/assets/dashboard.scss">
</style>