import Vue from 'vue'
import Router from 'vue-router'
import Summary from '@/components/Summary'
import Zhly from '@/components/Zhly'
import Zhdj from '@/components/Zhdj'
Vue.use(Router)

export default new Router({
  routes: [
	{
	  path: '/',
	  name: 'Summary',
	  component: Summary
	},
	{
	  path: '/',
	  name: 'Zhdj',
	  component: Zhdj
	},
	{
	  path: '/',
	  name: 'Zhly',
	  component: Zhly
	}
  ]
})
