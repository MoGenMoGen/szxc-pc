import Vue from 'vue'
import Router from 'vue-router'
import Sgpt from '@/components/Sgpt'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sgpt',
      component: Sgpt
    }
  ]
})
