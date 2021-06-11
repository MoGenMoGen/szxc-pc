<template>
	<div>
		<transition name="fade">
			<PopBox :list="list" v-show='show'></PopBox>
		</transition>
		<transition name="fade">
			<div class="pop-common szgl" v-show='show2'>
				<div class="pop-title"><span>三资管理</span></div>
				<span class="pop-item-title"><img src="static/images/cwgk.png">财务公开</span>
				<div class="cwList">
					<span class="cwList-item" v-for="(item,index) in cwList" :key="index">
						{{item.name}}
					</span>
				</div>
				<span class="pop-item-title"><img src="static/images/zzxx.png">招租信息</span>
				<span class="pop-item-title"><img src="static/images/ywgk.png">业务公开</span>
			</div>
		</transition>
		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	export default {
	  name: 'Jczl',
	  props: {
	    
	  },
	  data() {
	  	return {
			show: false,
			show2: false,
	  		list: [{
				num: 200,
				url: 'static/images/house.png',
				title: '农家乐'
			},{
				num: 200,
				url: 'static/images/qy.png',
				title: '企业'
			},{
				num: 200,
				url: 'static/images/stsk.png',
				title: '山塘水库'
			},{
				num: 200,
				url: 'static/images/ljfl.png',
				title: '垃圾分类'
			}],
			tabList: [{
				hasUrl: false,
				title: '三资管理'
			}, {
				hasUrl: false,
				title: '山塘水库'
			}, {
				hasUrl: false,
				title: '企业'
			}, {
				hasUrl: false,
				title: '5+X平台'
			},{
				hasUrl: false,
				title: '垃圾分类'
			}, {
				hasUrl: false,
				title: '乡村关爱'
			}, {
				hasUrl: false,
				title: '四个平台'
			}, {
				hasUrl: false,
				title: '防溺水'
			}, {
				hasUrl: false,
				title: '线上执法'
			}],
			cwList: [{
				name: '资产负债'
			},{
				name: '资产负债'
			},{
				name: '资产负债'
			},{
				name: '资产负债'
			}]
	  	}
	  },
	  components: {
	  	PopBox,
		BottomTab
	  },
	  mounted() {
	  	this.show2 = true
	  },
	  methods: {
		  getIndex(e) {
			  if(e==0) {
				this.show = false
			  } else if(e==1) {
				this.show = false
			  } else if(e==2||e==4) {
				this.show = true
			  } else if(e==3||e==8) {
				  this.show = false
			  } else if(e==5) {
				  this.show = false
			  } else if(e==6) {
				  this.show = false
				  // 打开新页面
			  } else if(e==7) {
				  this.show = false
			  }
		  }
	  }
	}
</script>

<style scoped lang="less">
	.pop-title {
		width: 485px;
		height: 32px;
		background: url(../../public/static/images/line.png) no-repeat;
		font-size: 20px;
		padding: 0 20px;
		margin: 0 auto;
		box-sizing: border-box;
	
		span {
			margin-left: 20px;
		}
	}
	.pop-common {
		width: 520px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		z-index: 10000;
	}
	.szgl {
		top: 200px;
		left: 500px;
		.pop-item-title {
			font-size: 20px;
			margin: 10px 0;
			img {
				margin-right: 10px;
				vertical-align: middle;
			}
		}
		.cwList {
			width: 90%;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
			.cwList-item {
				width: 33%;
				text-decoration: underline;
				font-size: 16px;
			}
		}
	}
	.fade-enter-active {
		transition: opacity 1s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
