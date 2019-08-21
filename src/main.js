// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import currencyFilter from './filters/currency'
import 'bootstrap'
import './bus'

import zhTW from 'vee-validate/dist/locale/zh_TW';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
});


Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
import router from './router' 
Vue.component("Loading",Loading)
Vue.filter("currency",currencyFilter)





/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})



router.beforeEach((to, from, next) => {
  // console.log("to",to)
  // console.log("from",from)
  // console.log("next",next)
  if(to.meta.requiresAuth){
    const api=`${process.env.APIPATH}/api/user/check`
    const vm=this
    axios.post(api).then((response) => {
      console.log(response)
      if(response.data.success){
        next()
      }else{
        next({
          path:"/login",
        })
      }
    })
  }else{
    next()
  }
})