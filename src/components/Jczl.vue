<template>
	<div>
		<transition name="fade">
			<PopBox :list="list" v-show='show'></PopBox>
		</transition>
		<transition name="fade">
			<div class="pop-common szgl" v-show='show2'>
				<img :src="cwList[imgIndex].img" class="cwImg" v-if="imgShow">
				<img src="static/images/cancel-B.png" class="cwImg-cancel" v-if="imgShow" @click="close">
				<div class="pop-title"><span>三资管理</span></div>
				<span class="pop-item-title"><img src="static/images/szcwgk.png">财务公开</span>
				<div class="cwList">
					<span class="cwList-item" v-for="(item,index) in cwList" :key="index" @click="showImg(index)">
						{{item.name}}
					</span>
				</div>
				<span class="pop-item-title"><img src="static/images/szzzxx.png">招租信息</span>
				<span class="pop-item-title"><img src="static/images/szywgk.png">业务公开</span>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-box" v-show="show3">
				<div class="pop-common sttj">
					<div class="pop-title"><span>山塘统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>山塘名称</span>
						<span>总容积 <span style="font-size: 14px;">(万m³)</span></span>
					</div>
					<div v-for="(item,index) in stList" :key='index' class="pop-inner-item">
						<span>{{index+1}}</span>
						<span>{{item.name}}</span>
						<span>{{item.capacity}}</span>
					</div>
				</div>
				<div class="pop-common sktj">
					<div class="pop-title"><span>水库统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>水库名称</span>
						<span>库容 <span style="font-size: 14px;">(万m³)</span></span>
					</div>
					<div v-for="(item,index) in skList" :key='index' class="pop-inner-item">
						<span>{{index+1}}</span>
						<span>{{item.name}}</span>
						<span>{{item.capacity}}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="xcga" v-show="show4">
				<div class="xcga-title"><span>乡村关爱</span></div>
				<div class="content">
					<div v-for="(item,index) in xcgaList" :key="index" class="item">
						<span>{{item.num}}</span>
						<img :src="item.url">
						<span>{{item.title}}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="xcga-tab" v-show="show4">
				<div v-for="(item,index) in xcgaList" :key="index" class="item">
					<img :src="item.url">
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-box" v-show="show5">
				<div class="pop-common fns">
					<div class="pop-title"><span>报警统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>水库名称</span>
						<span>报警次数</span>
					</div>
					<div v-for="(item,index) in fnsList" :key='index' class="pop-inner-item">
						<span>{{index+1}}</span>
						<span>{{item.name}}</span>
						<span :style="{color:item.capacity>=15?'#D00E00':''}">{{item.capacity}}</span>
					</div>
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
		name: 'Jczl',
		props: {

		},
		data() {
			return {
				imgIndex: 0,
				imgShow: false,
				show: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				list: [{
					num: 200,
					url: 'static/images/house.png',
					title: '农家乐'
				}, {
					num: 200,
					url: 'static/images/qy.png',
					title: '企业'
				}, {
					num: 200,
					url: 'static/images/stsk.png',
					title: '山塘水库'
				}, {
					num: 200,
					url: 'static/images/ljfl.png',
					title: '垃圾分类'
				}],
				xcgaList: [{
					num: 200,
					url: 'static/images/jzry.png',
					title: '矫正人员'
				}, {
					num: 200,
					url: 'static/images/dbh.png',
					title: '低保家庭'
				}, {
					num: 200,
					url: 'static/images/lnr.png',
					title: '老年人'
				}, {
					num: 200,
					url: 'static/images/czr.png',
					title: '残障人员'
				}, {
					num: 200,
					url: 'static/images/jstsjt.png',
					title: '计生特殊家庭'
				}, {
					num: 200,
					url: 'static/images/wbh.png',
					title: '五保户'
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
				}, {
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
				cwList: [],
				stList: [{
					name: '石英坎山塘',
					capacity: 2.21
				},{
					name: '石英坎山塘',
					capacity: 2.21
				},{
					name: '石英坎山塘',
					capacity: 2.21
				},{
					name: '石英坎山塘',
					capacity: 2.21
				}],
				skList: [{
					name: '劈开猪头',
					capacity: 2.21
				},{
					name: '石英坎山塘',
					capacity: 2.21
				},{
					name: '石英坎山塘',
					capacity: 2.21
				},{
					name: '石英坎山塘',
					capacity: 2.21
				}],
				fnsList: [{
					name: '劈开猪头',
					capacity: 56
				},{
					name: '石英坎山塘',
					capacity: 15
				},{
					name: '石英坎山塘',
					capacity: 11
				},{
					name: '石英坎山塘',
					capacity: 8
				}]
			}
		},
		components: {
			PopBox,
			BottomTab
		},
		mounted() {
			this.show2 = true
			this.getSzglData()
		},
		methods: {
			getSzglData() {
				let data = {
					current: 1,
					size: 30
				}
				this.$ajax.getCwgk(data).then(res => {
					this.cwList = res.records
				})
			},
			getIndex(e) {
				if (e == 0) {
					// 三资管理
					this.show2 = true
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.getSzglData()
				} else if (e == 1) {
					// 山塘统计
					this.show2 = false
					this.show = false
					this.show3 = true
					this.show4 = false
					this.show5 = false
				} else if (e == 2 || e == 4) {
					// 企业，垃圾分类
					this.show2 = false
					this.show = true
					this.show3 = false
					this.show4 = false
					this.show5 = false
				} else if (e == 3 || e == 8) {
					// 5+x平台，线上执法
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
				} else if (e == 5) {
					// 乡村关爱
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = true
					this.show5 = false
				} else if (e == 6) {
					//四个平台 打开新页面
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					let {href} = this.$router.resolve({path:'/Sgpt',params:{type: 1}})
					window.open(href, '_blank')
				} else if (e == 7) {
					// 防溺水
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = true
				}
			},
			showImg(e) {
				this.imgShow = true
				this.imgIndex = e
			},
			close() {
				this.imgShow = false
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
		z-index: 10000;
		max-height: 280px;
	}

	.szgl {
		position: absolute;
		top: 200px;
		left: 500px;
		max-height: none;
		.cwImg {
			width: 200px;
			position: absolute;
			right: -220px;
			top: 0;
		}

		.cwImg-cancel {
			position: absolute;
			right: -240px;
			top: -20px;
			cursor: pointer;
		}

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
				cursor: pointer;
				width: 33%;
				text-decoration: underline;
				font-size: 16px;
				margin-bottom: 10px;
			}
		}
	}

	.pop-box {
		position: absolute;
		top: 200px;
		left: 35px;
	}
	.sttj {
		margin-bottom: 50px;
	}
	
	.pop-inner-title {
		width: 90%;
		margin: 5px auto;
		display: flex;
		align-items: center;
		span {
			width: 30%;
			text-align: center;
			font-size: 19px;
		}
		span:nth-child(2) {
			width: 40%;
		}
	}
	.pop-inner-item {
		width: 90%;
		margin: 5px auto;
		display: flex;
		align-items: center;
		span {
			width: 30%;
			text-align: center;
			font-size: 18px;
		}
		span:nth-child(2) {
			width: 40%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		span:last-child {
			font-size: 22px;
		}
	}
	.xcga {
		width: 680px;
		// height: 270px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 35px;
		z-index: 10000;
		.xcga-title {
			width: 620px;
			height: 30px;
			background: url(../../public/static/images/lineL.png) no-repeat;
			font-size: 20px;
			padding: 0 20px;
			margin: 0 auto;
			box-sizing: border-box;
			span {
				margin-left: 20px;
			}
		}
		.content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32px;
			margin-top: 30px;
			.item {
				width: 16.7%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					// width: 38px;
					// height: 38px;
					margin: 20px 0;
				}
				span:last-child {
					font-size: 18px;
				}
			}
		}
	}

	.xcga-tab {
		position: absolute;
		bottom: 60px;
		left: 35px;
		display: flex;
		flex-direction: column;
		.item {
			width: 80px;
			height: 80px;
			cursor: pointer;
			margin-bottom: 10px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.fns {
		position: absolute;
		.pop-inner-item{
			span:last-child {
				font-size: 24px;
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
