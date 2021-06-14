<template>
	<div>
		<transition name="fade">
			<el-carousel indicator-position='none' v-if="show" class="banner" arrow='hover' :interval='2000'>
				<el-carousel-item v-for="(item,index) in imgList" :key="index">
					<img :src="item.url">
				</el-carousel-item>
			</el-carousel>
		</transition>
		<transition name="fade">
			<div v-if="show2" class="xingTab">
				<div v-for="(item,index) in xingList" :key='index' :class="{'xingActive':xingIndex==index}" class="xingTab-item" @click="changeXing(index)">
					<img :src="item.url">
					<span>{{item.title}}</span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="banner-box" v-if="show3">
				<el-carousel indicator-position='none' class="banner-center" arrow='hover' :interval='2000'
					@change="changeIndex">
					<el-carousel-item v-for="(item,index) in imgList" :key="index">
						<img :src="item.url">
					</el-carousel-item>
				</el-carousel>
				<div class="banner-label">
					{{imgList[labelIndex].des}}
				</div>
			</div>
		</transition>
		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	export default {
		name: 'Zhly',
		props: {

		},
		components: {
			PopBox,
			BottomTab
		},
		data() {
			return {
				show: false,
				show2: false,
				show3: false,
				labelIndex: 0,
				xingIndex: 0,
				tabList: [{
					sUrl: 'static/images/chiS.png',
					url: 'static/images/chi.png',
					hasUrl: true,
					title: '吃'
				}, {
					sUrl: 'static/images/zhuS.png',
					url: 'static/images/zhu.png',
					hasUrl: true,
					title: '住'
				}, {
					sUrl: 'static/images/xingS.png',
					url: 'static/images/xing.png',
					hasUrl: true,
					title: '行'
				}, {
					sUrl: 'static/images/youS.png',
					url: 'static/images/you.png',
					hasUrl: true,
					title: '游'
				}, {
					sUrl: 'static/images/gouS.png',
					url: 'static/images/gou.png',
					hasUrl: true,
					title: '购'
				}],
				imgList: [{
					url: 'static/images/banner1.png',
					des: '111111111111111111111111111111111111aaa'
				}, {
					url: 'static/images/banner2.png',
					des: '222222222222222aaa'
				}, {
					url: 'static/images/banner3.png',
					des: '33333333333aaa'
				}, {
					url: 'static/images/banner4.png',
					des: '4444444444aaa'
				}],
				xingList: [{
					url: 'static/images/hslx.png',
					title: '旅游路线'
				},{
					url: 'static/images/jtsk.png',
					title: '交通实况'
				}]
			}
		},
		methods: {
			getIndex(e) {
        console.log(e)
				if (e == 0) {
					this.show = true
					this.show2 = false
					this.show3 = false
				} else if (e == 1) {
					this.show = true
					this.show2 = false
					this.show3 = false
				} else if (e == 2) {
					this.show = false
					this.show2 = true
					this.show3 = false
				} else if (e == 3) {
					this.show = true
					this.show2 = false
					this.show3 = false
				} else if (e == 4) {
					this.show = false
					this.show2 = false
					this.show3 = true
				}
			},
			changeIndex(e) {
				this.labelIndex = e
			},
			changeXing(e) {
				this.xingIndex = e
			}
		},
		mounted() {
			this.show = true
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		width: 500px;
		// height: 333px;
		position: absolute;
		top: 200px;
		left: 35px;

		.el-carousel__item {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.banner-box {
		width: 500px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;

		.banner-center {
			width: 100%;
			// height: 333px;
			margin-bottom: 10px;
			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.banner-label {
			width: 100%;
			min-height: 300px;
			background-color: rgba(0, 0, 0, 0.3);
			color: #fff;
			font-size: 14px;
			line-height: 20px;
			padding: 20px 10px;
			box-sizing: border-box;
		}
	}

	.xingTab {
		position: absolute;
		top: 200px;
		left: 35px;
		display: flex;
		flex-direction: column;
		.xingTab-item {
			width: 230px;
			height: 80px;
			line-height: 80px;
			border: 1px solid #fff;
			background-color: rgba(0, 0, 0, 0.64);
			color: #fff;
			font-size: 24px;
			margin-bottom: 15px;
			border-radius: 10px;
			padding: 0 15px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			img {
				width: 46px;
				height: 46px;
				margin-right: 10px;
			}
		}
		.xingActive {
			background-color: rgba(207, 21, 8, 0.55);
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
