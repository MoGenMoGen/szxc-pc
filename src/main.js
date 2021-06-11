import Vue from 'vue'
import App from './App.vue'
import '../public/static/css/reset.css';
import ElementUI from 'element-ui';
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
Vue.prototype.$echarts = echarts
Vue.use(echarts)
Vue.use(ElementUI);
Vue.use(dataV)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
