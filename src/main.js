//  引入vue-awe-swipercha插件样式表
require('swiper/dist/css/swiper.css');
import 'assets/css/icon.css';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vue-lazyload
import VueLazyload from 'vue-lazyload';
// Vue.use(VueLazyload);
 // or with options
Vue.use(VueLazyload, {
   preLoad: 1.3,
   loading: '../static/default.png',
   attempt: 1
})


// 引入vue-awe-swipercha插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 把页面挂载在vue全局上
Vue.use(VueAwesomeSwiper) 


// 引入配置好的store模块
import store from './store';

Vue.config.productionTip = false

 // eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
  	bus: new Vue(),
  }
})
