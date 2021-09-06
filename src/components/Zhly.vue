<template>
	<div>
		<PopBox :list="list" v-show='show4' @updata="getPopIndex"></PopBox>
		<transition name="fade">
			<div class="pop-common pop-list njl-bg" :class="e==1?'ms-bg':''" v-show="show">
				<div class="pop-inner-title">
					<span style="width: 60%">农家乐名称</span>
					<span style="width: 20%">监控</span>
					<span style="width: 20%">视频</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in njlList" :key='index' class="pop-inner-item" @click="goto(item)">
						<span style="width: 60%">{{item.name}}</span>
						<span style="width: 20%"><img src="../bgImages/监控.png" style="width:30%" v-if="item.monitor"></span>
						<span style="width: 20%"><img src="../bgImages/视频播放.png" style="width:30%" v-if="item.video" @click.stop="toPre(item)"></span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="showTenList">
				<div class="pop-common pop-list ten-bg">
					<div v-for="(item,index) in tenList" :key='index' class="pop-inner-item" @click="chooseTen(item)">
						<span>{{item.name}}</span>
					</div>
				</div>
				<div class="ten-info" v-show="showTenInfo">
					<div class="ten-title">{{tenInfo.name}}</div>
					<img :src="tenInfo.img" class="ten-img">
					<div class="ten-des" v-html="tenInfo.cont"></div>
					<img src="../../public/static/images/cancel.png" style="position: absolute;top: 0;right: -10px;" @click="showTenInfo = false">
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="showWest">
				<div class="pop-common pop-list west-bg">
					<div v-for="(item,index) in westList" :key='index' class="pop-inner-item" @click="chooseWest(item)">
						<span>{{item.name}}</span>
					</div>
				</div>
				<div v-show="westImgShow" class="banner">
					<el-carousel v-if="westImgList.length>0" indicator-position='none' arrow='hover' :interval='4000'>
						<el-carousel-item v-for="(item,index) in westImgList" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="showDrive">
				<div class="pop-common pop-list drive-bg">
					<div class="pop-inner-title">
						<span style="width: 15%">序号</span>
						<span style="width: 20%">姓名</span>
						<span style="width: 15%">性别</span>
						<span style="width: 20%">驾龄</span>
						<span style="width: 40%;">手机号</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in driveList" :key='index' class="pop-inner-item">
							<span style="width: 15%">{{index+1}}</span>
							<span style="width: 20%">{{item.name}}</span>
							<span style="width: 15%">{{item.sex==1?'男':'女'}}</span>
							<span style="width: 20%">{{item.driveAge}}年</span>
							<span style="width: 40%;">{{item.mob}}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="show" class="banner">
				<el-carousel v-if="imgList.length>0" indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
					<el-carousel-item v-for="(item,index) in imgList" :key="index">
						<img :src="item.img">
					</el-carousel-item>
				</el-carousel>
				<div class="banner-name" v-if="imgList.length>0&&imgList[nameIndex].name">{{imgList[nameIndex].name}}</div>
				<div class="banner-top-img" v-show="showVideo">
					<video controls="controls" :src="preVideo" ref="preVideo" width="100%" height="100%"></video>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="show2">
				<div class="pop-common pop-data">
					<div class="rm-bottom">
						<my-charts :id="rlss1" class="rm-item" :data="option"></my-charts>
						<my-charts :id="rlgy1" class="rm-item" :data="option4"></my-charts>
						<my-charts :id="clgy1" class="rm-item" :data="option5"></my-charts>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-list jd-bg" v-show="show2" >
				<img src="../bgImages/视频播放.png"
					 style="width: 30px;height: 30px;position: absolute;right: 170px;top:15px;" @click="toScenicSpot()">

				<div class="pop-inner-title">
					<span>序号</span>
					<span>景点名称</span>
				</div>
				<div class="pop-inner-box" >
					<div v-for="(item,index) in jdList" :key='index' class="pop-inner-item" @click="goto(item)">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-list shop-bg" v-show="show3">
				<div class="pop-inner-title">
					<span style="width: 100%;">购物地点</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in shopList" :key='index' class="pop-inner-item" @click="chooseShop(item)">
						<span style="width: 100%;">{{item.name}}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="showShopImg" class="banner banner-shop">
				<el-carousel v-if="shopImgList.length>0" indicator-position='none' arrow='hover' :interval='4000'>
					<el-carousel-item v-for="(item,index) in shopImgList" :key="index">
						<img :src="item.img">
					</el-carousel-item>
				</el-carousel>
			</div>
		</transition>
		<hik6 :codes="codes" ref="videoPlayer6" :playMode="1"></hik6>
		<BottomTab ref="botTab" :list="tabList" @updata="getIndex"></BottomTab>

		<div class="model" v-if="dialogVisible">
			<img src="../bgImages/关闭.png" @click="toStopScenicSpot">
			<video controls="controls" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"  width="100%" height="100%"></video>
		</div>


	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	import myCharts from '@/components/MyCharts.vue'
	//透明厨房
	import hik6 from '@/components/hik/index6.vue'
	export default {
		name: 'Zhly',
		props: {

		},
		components: {
			PopBox,
			BottomTab,
			myCharts,
			hik6
		},
		data() {
			return {
				isActive: 0,
				codes: '',
				preVideo:'',
				option: {
					title: {
						text: '{a|480}\n{c|剩余车位数}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 20,
									color: '#29EEF3'
								},
								c: {
									fontSize: 14,
									color: '#ffffff',
									padding: [5, 0]
								}
							}
						}
					},
					series: [{
							type: 'gauge',
							radius: '100%',
							clockwise: false,
							startAngle: '-269.9999',
							endAngle: '90',
							splitNumber: 25,
							detail: {
								offsetCenter: [0, -20],
								formatter: ' '
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: [
										[0.48, '#f70102'],
										[1, 'rgba(32,187,252,0.15)']
									],
									width: 30
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								length: 32,
								lineStyle: {
									color: '#051F54',
									width: 4
								}
							},
							axisLabel: {
								show: false
							}
						},

						{
							type: 'pie',
							name: '内层环',
							radius: [0, '83%'],
							hoverAnimation: false,
							clockWise: false,
							itemStyle: {
								normal: {
									color: '#02163F'
								}
							},
							label: {
								show: false
							},
							data: [100]
						}
					]
				},
				option4: {
					title: {
						text: '{a|113}\n{c|人流量}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 20,
									color: '#29EEF3'
								},
								c: {
									fontSize: 14,
									color: '#ffffff',
									padding: [5, 0]
								}
							}
						}
					},
					series: [{
							type: 'gauge',
							radius: '100%',
							clockwise: false,
							startAngle: '-269.9999',
							endAngle: '90',
							splitNumber: 25,
							detail: {
								offsetCenter: [0, -20],
								formatter: ' '
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: [
										[113 / 1000, '#3cd868'],
										[1, 'rgba(32,187,252,0.15)']
									],
									width: 30
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								length: 32,
								lineStyle: {
									color: '#051F54',
									width: 4
								}
							},
							axisLabel: {
								show: false
							}
						},

						{
							type: 'pie',
							name: '内层环',
							radius: [0, '83%'],
							hoverAnimation: false,
							clockWise: false,
							itemStyle: {
								normal: {
									color: '#02163F'
								}
							},
							label: {
								show: false
							},
							data: [100]
						}
					]
				},
				option5: {
					title: {
						text: '{a|187}\n{c|车流量}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 20,
									color: '#29EEF3'
								},
								c: {
									fontSize: 14,
									color: '#ffffff',
									padding: [5, 0]
								}
							}
						}
					},
					series: [{
							type: 'gauge',
							radius: '100%',
							clockwise: false,
							startAngle: '-269.9999',
							endAngle: '90',
							splitNumber: 25,
							detail: {
								offsetCenter: [0, -20],
								formatter: ' '
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: [
										[187 / 1000, '#f7dc46'],
										[1, 'rgba(32,187,252,0.15)']
									],
									width: 30
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								length: 32,
								lineStyle: {
									color: '#051F54',
									width: 4
								}
							},
							axisLabel: {
								show: false
							}
						},

						{
							type: 'pie',
							name: '内层环',
							radius: [0, '83%'],
							hoverAnimation: false,
							clockWise: false,
							itemStyle: {
								normal: {
									color: '#02163F'
								}
							},
							label: {
								show: false
							},
							data: [100]
						}
					]
				},
				rlss1: 'rlss1',
				rlgy1: 'rlgy1',
				clgy1: 'clgy1',
				show: false, //美食列表
				show2: false, //每日数据
				show3: false, 
				show4: false, // 美食统计
				showTenList: false, //十大碗
				showTenInfo: false, //十大碗详情
				showWest: false, //乡村西餐
				showDrive: false, //代驾联盟
				showVideo: false,
				showShopImg: false, //购轮播
				shopList: [], //购列表
				shopImgList: [], //购轮播列表
				tenList: [], //十大碗列表
				tenInfo: {}, //十大碗详情
				westList: [], //乡村西餐列表
				westImgShow: false, //乡村西餐轮播
				westImgList: [], //乡村西餐轮播列表
				driveList: [], //代驾联盟列表
				nameIndex: 0,
				labelIndex: 0,
				xingIndex: 0,
				e: 0,
				list: [{
					num: 37,
					url: 'static/images/house.png',
					title: '农家乐'
				}, {
					num: 10,
					url: 'static/images/mingsu.png',
					title: '九大碗'
				}, {
					num: 3,
					url: 'static/images/jingdian.png',
					title: '乡村西餐'
				}, {
					num: 5,
					url: 'static/images/daijialianmeng.png',
					title: '代驾联盟'
				}],
				tabList: [{
						sUrl: 'static/images/chiS.png',
						url: 'static/images/chi.png',
						hasUrl: true,
						title: '美食'
					}, {
						sUrl: 'static/images/zhuS.png',
						url: 'static/images/zhu.png',
						hasUrl: true,
						title: '住宿'
					}, {
						sUrl: 'static/images/youS.png',
						url: 'static/images/you.png',
						hasUrl: true,
						title: '游玩'
					},
					{
						sUrl: 'static/images/gouS.png',
						url: 'static/images/gou.png',
						hasUrl: true,
						title: '购物'
					}
				],
				eatList: [],
				hotelList: [],
				njlList: [],
				jdList: [],
				imgList: [],
				dialogVisible:false,
			}
		},
		methods: {
			toStopScenicSpot(){
				this.dialogVisible=false
			},
			toScenicSpot(){
				this.dialogVisible=true
			},
			toPre(item){
				this.showVideo = true
				this.preVideo=item.video
				this.$refs.preVideo.play()
			},
			goto(item) {
				let a = {
					X: item.lng,
					Y: item.lat,
				}
				this.$parent.test(a);
				this.$refs.videoPlayer6.off()
				if (item.monitor != '' && item.monitor != null) {
					this.codes = item.monitor;
					this.$refs.videoPlayer6.initPlugin()
				}
				if(item.video){
					this.preVideo=item.video
				}
				if(this.e == 1 || this.e == 0) {
					this.imgList = []
					this.$ajax.getAdvert({
						travelId: item.id,
						current: 1,
						size: 20
					}).then(res => {
						this.imgList = res.records
					})
				}
			},
			offHik() {
				this.$refs.videoPlayer6.off()
			},
			//打开关闭图层
			onOff(type, name) {
				let a = {
					type: type,
					name: name
				}
				this.$parent.test(a);
			},
			getIndex(e) {
				this.e = e
				if (e == 0) {
					this.onOff("打开图层", "农家乐")
					this.onOff("关闭图层", "旅游景点")
					this.onOff("关闭图层", "旅游路线")
					this.onOff("关闭图层", "民宿")
					this.imgList = []
					this.njlList = this.eatList
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = true
					this.showTenList = false
					this.showWest = false
					this.showDrive = false
					this.showVideo = false
					this.showShopImg = false
					this.showTenInfo = false
					this.westImgShow = false
				} else if (e == 1) {
					//住
					this.onOff("打开图层", "民宿")
					this.onOff("关闭图层", "旅游景点")
					this.onOff("关闭图层", "旅游路线")
					this.onOff("关闭图层", "农家乐")
					this.imgList = []
					this.njlList = this.hotelList
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = false
					this.showTenList = false
					this.showWest = false
					this.showDrive = false
					this.showVideo = false
					this.showShopImg = false
					this.showTenInfo = false
					this.westImgShow = false
				} else if (e == 2) {
					//玩
					this.onOff("打开图层", "旅游景点")
					this.onOff("打开图层", "旅游路线")
					this.onOff("关闭图层", "农家乐")
					this.onOff("关闭图层", "民宿")
					this.show = false
					this.show2 = true
					this.show3 = false
					this.show4 = false
					this.showTenList = false
					this.showWest = false
					this.showDrive = false
					this.showVideo = false
					this.showShopImg = false
					this.showTenInfo = false
					this.westImgShow = false
				} else if (e == 3) {
					//购
					this.onOff("关闭图层", "旅游景点")
					this.onOff("关闭图层", "旅游路线")
					this.onOff("关闭图层", "农家乐")
					this.onOff("关闭图层", "民宿")
					this.show = false
					this.show2 = false
					this.show3 = true
					this.show4 = false
					this.showTenList = false
					this.showWest = false
					this.showDrive = false
					this.showVideo = false
					this.showShopImg = false
					this.showTenInfo = false
					this.westImgShow = false
				}
			},
			changeIndex(e) {
				this.nameIndex = e
			},
			getPopIndex(e) {
				if(e==0) {
					this.show = true
					this.showTenList = false
					this.showTenInfo = false
					this.showWest = false
					this.showDrive = false
					this.westImgShow = false
				} else if(e==1) {
					this.show = false
					this.showTenList = true
					this.showWest = false
					this.showDrive = false
					this.westImgShow = false
				} else if(e==2) {
					this.show = false
					this.showTenList = false
					this.showTenInfo = false
					this.showWest = true
					this.showDrive = false
				} else if(e==3) {
					this.show = false
					this.showTenList = false
					this.showTenInfo = false
					this.showWest = false
					this.showDrive = true
					this.westImgShow = false
				}
			},
			random(lower, upper) {
				return Math.floor(Math.random() * (upper - lower)) + lower;
			},
			chooseShop(item) {
				this.showShopImg = true
				this.shopImgList = []
				this.$ajax.getAdvert({
					travelId: item.id,
					current: 1,
					size: 20
				}).then(res => {
					this.shopImgList = res.records
				})
			},
			chooseTen(item) {
				this.showTenInfo = true
				this.tenInfo = item
			},
			chooseWest(item) {
				this.westImgShow = true
				this.westImgList = item.img
			}
		},
		mounted() {
			this.$ajax.getEatList({
				size: 50,
				current: 1
			}).then(res => {
				// res.records.forEach((item, index) => {
				// 	if (item.type == "service_eat" || item.type == "service_all") {
				// 		this.eatList.push(item)
				// 	}
				// 	if (item.type == "service_hotel" || item.type == "service_all") {
				// 		this.hotelList.push(item)
				// 	}
				// })
				this.eatList = res.records
				this.njlList = this.eatList
			})
			this.$ajax.getHotelList({size:20,current:1}).then(res => {
				this.hotelList = res.records
			})
			this.$ajax.getShopList({size:20,current:1}).then(res => {
				this.shopList = res.records
			})
			this.$ajax.getTenList({size:20,current:1}).then(res => {
				this.tenList = res.records
			})
			this.$ajax.getWestList({size:20,current:1}).then(res => {
				res.records.forEach(item => {
					item.img = item.img.split(",")
				})
				this.westList = res.records
			})
			this.$ajax.getDriveList({size:20,current:1}).then(res => {
				this.driveList = res.records
			})
			this.$ajax.getSiteList({size:20,current:1}).then(res => {
				this.jdList = res.records
			})
			this.show = true
			this.show4 = true
			let that = this
			setInterval(function() {
				let option = that.random(297, 512)
				let option4 = that.random(187, 523)
				let option5 = that.random(113, 286)
				that.option.series[0].axisLine.lineStyle.color[0][0] = Number(option / 1000)
				that.option4.series[0].axisLine.lineStyle.color[0][0] = Number(option4 / 1000)
				that.option5.series[0].axisLine.lineStyle.color[0][0] = Number(option5 / 1000)
				that.option.title.text = '{a|' + option + '}\n{c|剩余车位数}'
				that.option4.title.text = '{a|' + option4 + '}\n{c|人流量}'
				that.option5.title.text = '{a|' + option5 + '}\n{c|车流量}'
			}, 60000)
		},
		watch:{
			isActive(val,oVal) {
				this.$refs.botTab.isActive = val
			}
		}
	}
</script>

<style lang="less" scoped>
	.pop-common {
		width: 520px;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
	}

	.njl-bg {
		background: url(../bgImages/农家乐统计.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 70px;
	}

	.ms-bg {
		background: url(../bgImages/民宿统计.png) no-repeat;
		background-size: 100% 100%;
		min-height: 400px;
		padding-top: 70px;
		top: 200px !important;
	}

	.jd-bg {
		height: 450px;
		background: url(../bgImages/景点列表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 50px;
	}
	
	.shop-bg {
		background: url(../bgImages/购物列表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 80px;
		top: 200px !important;
	}

	.ten-bg {
		background: url(../bgImages/十大碗.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 80px;
		.pop-inner-item {
			width: 100%;
			text-align: center;
			font-size: 20px;
			margin-bottom: 10px;
		}
	}

	.ten-info {
		background: url(../bgImages/border-back.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		width: 800px;
		height: 886px;
		position: absolute;
		left: 640px;
		top: 200px;
		font-size: 22px;
		color: #8BEBFF;
		.ten-title {
			width: 100%;
			padding: 15px 240px;
			box-sizing: border-box;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: center;
		}
		.ten-img {
			width: 700px;
			height: 400px;
			margin: 0 auto;
		}
		.ten-des {
			width: 700px;
			margin: 10px auto;
			max-height: 410px;
			overflow-y: scroll;
		}
	}
	
	.west-bg {
		background: url(../bgImages/乡村西餐.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 100px;
		min-height: 500px;
		.pop-inner-item {
			width: 100%;
			text-align: center;
			font-size: 20px;
			margin-bottom: 10px;
		}
	}
	
	.drive-bg {
		background: url(../bgImages/代驾联盟.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 90px;
		min-height: 500px;
		span {
			text-align: center;
		}
	}

	.pop-list {
		position: absolute;
		top: 500px;
		left: 35px;

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span:first-child {
				text-align: center;
				width: 35%;
			}

			span:last-child {
				text-align: center;
				width: 65%;
			}
		}

		.pop-inner-box {
			max-height: 500px;
			margin-bottom: 10px;
			overflow-y: auto;

			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span:first-child {
					text-align: center;
					width: 35%;
				}

				span:last-child {
					text-align: center;
					width: 65%;
				}
			}
		}
	}

	.pop-data {
		position: absolute;
		top: 200px;
		left: 35px;
		height: 250px;
		background: url(../bgImages/每日数据.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 50px;
		.rm-bottom {
			width: 95%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.rm-item {
				margin-top: 30px;
				width: 130px;
				height: 130px;
			}
		}
	}

	.banner {
		width: 500px;
		// height: 333px;
		position: absolute;
		top: 150px;
		right: 35px;

		border-radius: 10px;
		box-sizing: border-box;

		.banner-top-img {
			width: 100%;
			height: 304px;
			margin-bottom: 20px;
			border: 2px solid #fff;
			box-sizing: border-box;
			object-fit:cover;
		}

		/deep/ .el-carousel__container {
			border: 2px solid #fff;

			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}

		.banner-name {
			width: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			margin-top: 10px;
			font-size: 18px;
			color: #fff;
			padding: 10px 0;
			box-sizing: border-box;
			border-radius: 20px;
			text-align: center;
		}

		.banner-tip {
			width: 500px;
			padding: 10px 0;
			margin-top: 20px;

			.banner-tip-word {
				width: 100%;
				padding: 100px 0;
				font-size: 28px;
				text-align: center;
			}
		}
	}

	.banner-shop {
		top: 400px;
		left: 640px;
		width: 1083px;
		height: 607px;
		border: 2px solid #fff;
		border-radius: 0;
		// box-sizing: border-box;
		/deep/ .el-carousel {
			width: 100%;
			height: 100%;
			.el-carousel__container {
				border: none;
				width: 100%;
				height: 100%;
				.el-carousel__item {
					width: 100%;
					height: 100%;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		 
	}

	.banner-box-left {
		left: 35px;
	}

	.banner-box-center {
		left: 900px;
	}

	.banner-box-right {
		right: 35px;
	}

	.banner-box-box {
		width: 100%;
		position: absolute;
		top: 200px;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;

		/deep/ .el-carousel__container {
			border: 2px solid #fff;
			margin-bottom: 100px;

			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.banner-box {
		width: 500px;
		display: flex;
		flex-direction: column;

		.banner-center {
			width: 100%;
			// height: 333px;
			margin-bottom: 10px;
			border: 2px solid #fff;
			border-radius: 10px;
			box-sizing: border-box;

			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.banner-img {
			width: 500px;
			height: 333px;
			margin-bottom: 10px;
			border: 2px solid #fff;
			border-radius: 10px;
			box-sizing: border-box;
		}

		.banner-label {
			width: 100%;
			min-height: 200px;
			background-color: rgba(0, 0, 0, 0.3);
			color: #fff;
			font-size: 16px;
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
	.model{

		width: 1000px;
		height: 500px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 10000;
		img{
			position: absolute;
			right: 0;
			top:0;
			width: 30px;
			z-index: 10001;
		}
	}

</style>
