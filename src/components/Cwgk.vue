<template>
	<div>
		<transition name="fade">
			<div class="pop-box" v-show="show">
				<div class="pop-common pop-gl">
					<div class="pop-title"><span>经济发展情况</span></div>
					<div v-html="jjData"></div>
				</div>
				<div class="pop-common pop-cm">
					<div class="pop-title"><span>村民代表会议</span></div>
					<div v-html="cmData"></div>
				</div>
				<div class="pop-common pop-cgc">
					<div class="pop-titleL"><span>村工程建设情况</span></div>
					<div v-html="cgcData"></div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-box" v-show="show2">
				<div class="pop-common pop-cb">
					<div class="pop-titleL"><span>村土地（山林，山塘，鱼塘）资产等承包情况</span></div>
					<div v-html="cbData"></div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-box" v-show="show3">
				<div class="pop-common pop-other">
					<div class="pop-title"><span>{{title}}</span></div>
					<div v-html="data"></div>
				</div>
			</div>
		</transition>
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
			show2: false,
			show3: false,
			jjData: '',
			cgcData: '',
			cbData: '',
			title: '',
			data: '',
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
			if(e==0) {
				this.show = true
				this.show2 = false
				this.show3 = false
			} else if (e==1) {
				this.show = false
				this.show2 = true
				this.show3 = false
			} else {
				this.show = false
				this.show2 = false
				this.show3 = true
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
	.pop-titleL {
		width: 620px;
		height: 32px;
		background: url(../../public/static/images/lineL.png) no-repeat;
		font-size: 20px;
		padding: 0 20px;
		margin: 0 auto;
		box-sizing: border-box;
			
		span {
			margin-left: 20px;
		}
	}
	.pop-common {
		// width: 520px;
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
	
	.pop-gl {
		top: 200px;
		left: 35px;
	}
	
	.pop-cm {
		top: 200px;
		left: 600px;
	}
	
	.pop-cgc {
		top: 200px;
		left: 1200px;
	}
	
	.pop-cb {
		top: 200px;
		left: 450px;
	}
	
	.pop-other {
		top: 200px;
		left: 630px;
	}
	
	.fade-enter-active {
		transition: opacity 1s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
