<template>
	<div>
		<!-- <transition name="fade">
			
		</transition> -->
		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import BottomTab from '@/components/BottomTab.vue'
	export default {
	  name: 'Cwgk',
	  props: {
	    
	  },
	  data() {
	  	return {
			show: false,
			tabList: [{
				hasUrl: false,
				title: '概览'
			}, {
				hasUrl: false,
				title: '村土地资产等承包'
			}, {
				hasUrl: false,
				title: '土地征用费发放'
			}, {
				hasUrl: false,
				title: '各种补助、补贴和优待抚恤金发放情况'
			},{
				hasUrl: false,
				title: '低保、医疗保险、养老保险情况'
			}, {
				hasUrl: false,
				title: '村民建房'
			}, {
				hasUrl: false,
				title: '其他内容'
			}],
	  	}
	  },
	  components: {
	  	BottomTab
	  },
	  mounted() {
	  	this.show = true
	  },
	  methods: {
		  getIndex(e) {
			  
		  }
	  }
	}
</script>

<style scoped lang="less">
	.fade-enter-active {
		transition: opacity 1s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
