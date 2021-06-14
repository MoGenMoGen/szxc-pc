<template>
	<div>
		<transition name="fade">
			<PopBox :list="list" v-show='show'></PopBox>
		</transition>
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	export default {
	  name: 'Yhyd',
	  props: {

	  },
	  data() {
	  	return {
			show: false,
	  		list: [{
				num: 722,
				url: 'static/images/house.png',
				title: '总户数'
			},{
				num: 1627,
				url: 'static/images/zrs.png',
				title: '总人数'
			},{
				num: 27,
				url: 'static/images/zhs.png',
				title: '租户数'
			},{
				num: 109,
				url: 'static/images/dys.png',
				title: '党户数'
			}]
	  	}
	  },
	  components: {
	  	PopBox
	  },
	  mounted() {
	  	this.show = true
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
