import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../public/static/css/reset.css';
import ElementUI from 'element-ui';
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import {api} from './api/ajax.js'
import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
Vue.prototype.$echarts = echarts
Vue.use(dataV)
Vue.use(echarts)
Vue.use(ElementUI);
Vue.use(UmyUi);

Vue.prototype.$ajax = new api();
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  data: function(){
    return {
      hsxl: false,
      zl:false,
      njl:false,
      lyjd:false,
      wf:false,
      fnsjkd:false,
      nsl:false,
      zhjg:false,
    }
  },
  render: h => h(App)
})
