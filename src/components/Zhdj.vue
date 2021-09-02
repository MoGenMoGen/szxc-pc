<template>
	<div>
		<transition name="fade">
			<div v-show="redClass">
				<div class="red-class-left">
					<div class="red-class-top">
						<div v-for="(item,index) in redClassTab" :key="index" @click="redClassClick(index)">
							<span>{{item.num}}</span>
							<img :src="item.url">
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="red-class-bottom" v-show="showRedClassList">
						<div class="red-class-title">{{redClassTitle}}</div>
						<div class="red-class-list" v-show="redClassTabIndex!=1">
							<span v-for="(item,index) in redClassList" :key="index" @click="redClassListClick(item.id,index)">· {{item.title}}</span>
						</div>
						<div class="red-class-list2" v-show="redClassTabIndex==1">
							<span v-for="(item,index) in redClassList" :key="index" @click="redClassListClick(item.id,index)">{{item.title}}</span>
						</div>
					</div>
				</div>
				<div class="red-class-center" v-if="showRedClassInfo">
					<div class="red-class-title">{{redClassInfoTitle}}</div>
					<div class="red-class-detail" v-if="redClassTabIndex==0||redClassTabIndex==4">
						<video :src="redClassInfoDetail.url" autoplay></video>
						<div class="red-class-detail-title"><div></div>详情介绍</div>
						<div class="red-class-detail-cont" v-html="redClassInfoDetail.content"></div>
					</div>
					<div class="red-class-detail" v-if="redClassTabIndex==3">
						<el-image class="red-class-detail-img" fit="cover" :src="redClassInfoDetail.img"  :preview-src-list="redClassInfoDetail.imgList"></el-image>
					</div>
					<div class="red-class-detail" v-if="redClassTabIndex==2">
						<div class="red-class-detail-cont" v-html="redClassInfoDetail.content"></div>
					</div>
				</div>
				<div class="red-class-center2" v-show="showRedClassHistory">
					<img :src="redClassInfoDetail.img">
					<span>{{redClassInfoDetail.title}}</span>
					<div v-html="redClassInfoDetail.content"></div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="mission">
				<div class="mission-left">
					<div class="mission-top">
						<div v-for="(item,index) in missionTab" :key="index" @click="missionClick(index)">
							<span>{{item.num}}</span>
							<img :src="item.url">
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="mission-bottom"></div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="branch">
				<div class="branch-left">
					<div class="branch-top">
						<div v-for="(item,index) in branchTab" :key="index" @click="branchClick(index)">
							<img :src="item.url">
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="branch-bottom"></div>
				</div>
			</div>
		</transition>
		<BottomTab :list="tabList" @updata="getIndex" ref="botTab"></BottomTab>
	</div>
</template>

<script>
	import BottomTab from '@/components/BottomTab.vue'
	export default {
		name: 'Zhdj',
		props: {

		},
		data() {
			return {
				isActive: 0,
				tabList: [{
					hasUrl: false,
					title: '红色课堂'
				}, {
					hasUrl: false,
					title: '牢记使命'
				}, {
					hasUrl: false,
					title: '支部力量'
				}, {
					hasUrl: false,
					title: '红色足迹'
				}],
				redClass: false, // 红色课堂
				showRedClassList: false, //红色课堂坐下列表
				showRedClassInfo: false, //红色课堂详情
				showRedClassHistory: false, //红色历史
				redClassTitle: '', //红色课堂左下角标题
				redClassInfoTitle: '', //红色课堂中间标题
				redClassInfoDetail: '', //红色课堂详情
				redClassTabIndex: 0, //红色课堂概览下标
				redClassList: [], //红色课堂列表
				redClassTab: [{
					num: 2,
					name: '红色宣讲',
					detailTitle: '红色宣讲视频',
					url: 'static/images/red-talk.png'
				},{
					num: 20,
					name: '红色历史',
					detailTitle: '',
					url: 'static/images/red-history.png'
				},{
					num: 18,
					name: '红色百宝箱',
					detailTitle: '详情',
					url: 'static/images/red-case.png'
				},{
					num: 1,
					name: '精选课程',
					detailTitle: '精选课程',
					url: 'static/images/red-course.png'
				},{
					num: 2,
					name: '微视频',
					detailTitle: '微视频详情',
					url: 'static/images/red-video.png'
				}],
				mission: false, //牢记使命
				missionTab: [{
					num: 25,
					name: '活动预告',
					detailTitle: '红色宣讲视频',
					url: 'static/images/mission-active.png'
				},{
					num: 3,
					name: '三会一课主题党建活动',
					detailTitle: '',
					url: 'static/images/mission-three.png'
				},{
					num: 18,
					name: '点亮微心愿',
					detailTitle: '详情',
					url: 'static/images/mission-wish.png'
				},{
					num: 15,
					name: '户居分离党员',
					detailTitle: '精选课程',
					url: 'static/images/mission-separate.png'
				},{
					num: 2,
					name: '党费缴纳',
					detailTitle: '微视频详情',
					url: 'static/images/mission-money.png'
				},{
					num: 2,
					name: '先锋榜',
					detailTitle: '微视频详情',
					url: 'static/images/mission-pioneer.png'
				}],
				branch: false, //支部力量
				branchTab: [{
					num: 0,
					name: '党员总数',
					detailTitle: '红色宣讲视频',
					url: 'static/images/branch-all.png'
				},{
					num: 0,
					name: '发展党员',
					detailTitle: '',
					url: 'static/images/branch-develop.png'
				},{
					num: 0,
					name: '村委两班子',
					detailTitle: '详情',
					url: 'static/images/branch-leader.png'
				},{
					num: 0,
					name: '网格党支部',
					detailTitle: '精选课程',
					url: 'static/images/branch-party.png'
				},{
					num: 2,
					name: '荣誉',
					detailTitle: '微视频详情',
					url: 'static/images/branch-honor.png'
				}]
			}
		},
		components: {
			BottomTab
		},
		methods: {
			//打开关闭图层
			onOff(type, name) {
				let a = {
					type: type,
					name: name
				}
				this.$parent.test(a);
			},
			offP() {
				this.onOff("关闭图层", "横溪党员")
				this.onOff("关闭图层", "长胜周家港孟家毛岭党员")
				this.onOff("关闭图层", "长胜田央沈长桥头党员")
				this.onOff("关闭图层", "农家乐支部党员")
			},
			getIndex(e) {
				//红色课堂
				if (e == 0) {
					this.offP()
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.redClass = true
					this.mission = false
					this.branch = false
				} else if (e == 1) {
					//牢记使命
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.redClass = false
					this.mission = true
					this.branch = false
				} else if (e == 2) {
					this.offP()
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.redClass = false
					this.mission = false
					this.branch = true
				} else if (e == 3) {
					this.offP()
					this.onOff("打开图层", "红色景点")
					this.onOff("打开图层", "红色路线")
					this.redClass = false
					this.mission = false
					this.branch = false
				}
			},
			redClassClick(index) {
				let data = {
					current: 1,
					size: 100
				}
				this.redClassTabIndex = index
				if(index != 3 ) {
					this.showRedClassList = true
					this.showRedClassInfo = false
					this.showRedClassHistory = false
					this.redClassTitle = this.redClassTab[index].name
					this.redClassInfoTitle = this.redClassTab[index].detailTitle
				} else if (index==3){
					this.showRedClassList = false
					this.showRedClassInfo = true
					this.showRedClassHistory = false
					this.redClassInfoTitle = this.redClassTab[index].detailTitle
					this.$ajax.getRedCourse(data).then(res => {
						res.imgList=res.img.split(",")
						this.redClassInfoDetail = res
					})
				}
				if(index==0) {
					data.type = 1
					this.$ajax.getRedClassVideo(data).then(res => {
						this.redClassList = res
					})
				} else if(index==1) {
					this.$ajax.getRedHistoryList(data).then(res => {
						this.redClassList = res.records
					})
				} else if(index==2) {
					this.$ajax.getRedCaseList(data).then(res => {
						this.redClassList = res.records
					})
				} else if(index==4) {
					data.type = 2
					this.$ajax.getRedClassVideo(data).then(res => {
						this.redClassList = res
					})
				}
			},
			redClassListClick(id,index) {
				if(this.redClassTabIndex!=1) {
					this.showRedClassInfo = true
					this.showRedClassHistory = false
				} else if (this.redClassTabIndex==1) {
					this.showRedClassInfo = false
					this.showRedClassHistory = true
					this.$ajax.getRedHistoryDetail({id:id}).then(res => {
						this.redClassInfoDetail = res
					})
				}
				if(this.redClassTabIndex==0||this.redClassTabIndex==4) {
					this.$ajax.getRedClassVideoDetail({id:id}).then(res => {
						this.redClassInfoDetail = res
					})
				} else if (this.redClassTabIndex==2) {
					this.$ajax.getRedCaseDetail({id:id}).then(res => {
						this.redClassInfoDetail = res
					})
				}
			},
			missionClick(index) {
				
			},
			branchClick(index) {
				
			}
		},
		mounted() {
			this.redClass = true
		},
		watch:{
			isActive(val,oVal) {
				this.$refs.botTab.isActive = val
			}
		}
	}
</script>

<style scoped lang="less">
	.red-class-left {
		width: 616px;
		position: absolute;
		top: 180px;
		left: 40px;
		.red-class-top {
			width: 616px;
			height: 276px;
			background: url(../bgImages/红色课堂-概览.png) no-repeat;
			background-size: 100% 100%;
			padding: 66px 35px 44px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			div {
				width: 20%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				font-size: 20px;
				color: #fff;
				img {
					width: 46px;
					height: 46px;
				}
				span:first-child {
					font-size: 30px;
				}
			}
		}
		.red-class-bottom {
			width: 616px;
			height: 506px;
			background: url(../bgImages/红色课堂-左下框.png) no-repeat;
			background-size: 100% 100%;
			margin-top: 60px;
			.red-class-title {
				width: 100%;
				padding: 13px 208px;
				box-sizing: border-box;
				text-align: center;
				font-size: 22px;
				color: #8CACF9;
			}
			.red-class-list {
				width: 100%;
				max-height: 390px;
				overflow-y: scroll;
				padding: 0 30px;
				margin-top: 30px;
				box-sizing: border-box;
				font-size: 18px;
				color: #fff;
				display: flex;
				flex-direction: column;
				span {
					margin-bottom: 10px;
				}
			}
			.red-class-list2 {
				width: 100%;
				max-height: 390px;
				overflow-y: scroll;
				padding: 0 30px;
				margin-top: 30px;
				box-sizing: border-box;
				font-size: 18px;
				color: #fff;
				display: flex;
				flex-wrap: wrap;
				span {
					width: 25%;
					margin-bottom: 40px;
					text-align: center;
				}
			}
		}
	}
	
	.red-class-center {
		width: 752px;
		height: 746px;
		background: url(../bgImages/红色课堂-大背景.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		.red-class-title {
			width: 100%;
			padding: 13px 280px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #8CACF9;
		}
		.red-class-detail {
			width: 100%;
			max-height: 610px;
			padding: 0 50px;
			box-sizing: border-box;
			margin-top: 50px;
			overflow-y: scroll;
			video {
				width: 650px;
				height: 380px;
				margin: 0 auto;
			}
			.red-class-detail-title {
				display: flex;
				align-items: center;
				font-size: 24px;
				color: #fff;
				margin: 20px 0 10px;
				div {
					width: 6px;
					height: 30px;
					background-color: #EC2C17;
					margin-right: 16px;
				}
			}
			.red-class-detail-cont {
				width: 100%;
				color: #fff !important;
			}
			.red-class-detail-img {
				width: 650px;
			}
		}
	}
	
	.red-class-center2 {
		width: 575px;
		height: 844px;
		background: url(../bgImages/redBg.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 134px;
			height: 134px;
			border: 1px solid #fff;
			border-radius: 50%;
			margin-top: 215px;
		}
		span {
			font-size: 30px;
			color: #fff;
			margin: 20px 0 30px;
		}
		div {
			width: 428px;
			max-height: 370px;
			overflow-y: scroll;
			margin: 0 auto;
			color: #fff;
		}
	}
	
	.mission-left {
		width: 552px;
		position: absolute;
		top: 180px;
		left: 40px;
		.mission-top {
			width: 552px;
			height: 462px;
			background: url(../bgImages/牢记使命-概览.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 66px 35px 44px;
			box-sizing: border-box;
			div {
				width: 33%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 20px;
				color: #fff;
				span {
					text-align: center;
				}
				img {
					width: 46px;
					height: 46px;
					margin: 20px 0 10px;
				}
				span:first-child {
					font-size: 30px;
				}
			}
		}
	}
	
	.branch-left {
		width: 616px;
		position: absolute;
		top: 180px;
		left: 40px;
		.branch-top {
			width: 616px;
			height: 226px;
			background: url(../bgImages/支部力量-概览.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 66px 35px 44px;
			box-sizing: border-box;
			div {
				width: 20%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 20px;
				color: #fff;
				img {
					width: 46px;
					height: 46px;
					margin-bottom: 20px;
				}
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
