import Vue from 'vue'
import App from './App.vue'
import '../public/static/css/reset.css';
import ElementUI from 'element-ui';
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import {api} from './api/ajax.js'
Vue.prototype.$echarts = echarts
Vue.use(dataV)
Vue.use(echarts)
Vue.use(ElementUI);

Vue.prototype.$ajax = new api();
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
