<template>
	<div>
		<transition name="fade">
			<div class="pop-common srjf" v-show="show">
				<!-- <div class="pop-title"><span>私人建房统计</span></div> -->
				<div class="srjf-title">
					<span>序号</span>
					<span>户主姓名</span>
					<span>户内人口</span>
					<span>原有宅基地房屋处置方式</span>
					<span>新申请用地面积</span>
					<span>预选建房地址</span>
					<span>办理进展情况</span>
					<span>优先排序</span>
				</div>
				<div class="srjf-item" v-for="(item, index) in srjfList" :key="index">
					<span>{{index+1}}</span>
					<span>{{item.name}}</span>
					<span>{{item.num}}</span>
					<span>{{item.solve}}</span>
					<span>{{item.newArea}}</span>
					<span>{{item.newArea}}</span>
					<span>{{item.schedule}}</span>
					<span>{{item.sort}}</span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-list ggcs-bg" v-show="showPubilc">
				<!-- <div class="pop-title"><span>公共场所</span></div> -->
				<div class="pop-inner-title">
					<span>序号</span>
					<span>公共场所名称</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in publicList" :key='index' class="pop-inner-item" @click="toMap(item)">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>



    <iframe v-if="show2" style="margin-top: 120px ;z-index: 9999999" width="2236" height="1104" id="iframe" src="http://124.70.199.84:8200/" frameborder="0"></iframe>


		<transition name="fade">
			<div class="proof-guide" v-show="showGuide">
				<div class="guide-cont guide-left" v-if="pageCont[pageIndex]">
					<img :src="pageCont[pageIndex]"/>
				</div>
				<div class="guide-cont guide-right" v-if="pageCont[pageIndex+1]">
					<img :src="pageCont[pageIndex+1]"/>
				</div>
				<div class="guide-btn guide-previous" @click="pre">上一页</div>
				<div class="guide-btn guide-next" @click="next">下一页</div>
			</div>
		</transition>
		<!-- <BottomTab :list="tabList" @updata="getIndex"></BottomTab> -->
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	export default {
		name: 'Bmfw',
		props: {},
		data() {
			return {
				show: false, //私人建房
        show2: false, //居家养老
				showPubilc: false, //公共场所
				showGuide: false, //证明指南
				pageIndex: 0,
				pageCont: [],
				tabList: [{
					hasUrl: false,
					title: '建房申请'
				}, {
					hasUrl: false,
					title: '证明指南'
				},{
					hasUrl: false,
					title: '居家养老'
				},{
					hasUrl: false,
					title: '公共场所'
				}],
				srjfList: [{
					name: '周国栋',
					num: 3,
					solve: '拆除',
					newArea: 100,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '困难户'
				}, {
					name: '邱世云',
					num: 3,
					solve: '无',
					newArea: 80,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '无房户'
				}, {
					name: '叶敏华',
					num: 4,
					solve: '无',
					newArea: 120,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '无房户'
				}, {
					name: '项舜',
					num: 1,
					solve: '无',
					newArea: 80,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '无房户'
				}, {
					name: '陈雪宝',
					num: 2,
					solve: '村集体回购',
					newArea: 48,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '危房户'
				}],
				publicList: [{
					name: '九龙湖镇九龙湖社区卫生服务站',
					lng: '121.504729',
					lat: '30.051343'
				}, {
					name: '横溪农贸市场',
					lng: '121.505037',
					lat: '30.05139'
				}, {
					name: '横溪村文化礼堂',
					lng: '121.505213',
					lat: '30.051743'
				}, {
					name: '九龙湖村村委会',
					lng: '121.538627',
					lat: '30.034315'
				}, {
					name: '九龙湖村篮球场',
					lng: '121.538061',
					lat: '30.034214'
				}, {
					name: '九龙湖村文化礼堂',
					lng: '121.538095',
					lat: '30.034395'
				}, {
					name: '个体医疗诊所',
					lng: '121.537764',
					lat: '30.03434'
				}, {
					name: '九龙湖村敬老院',
					lng: '121.542275',
					lat: '30.035262'
				}, {
					name: '九龙湖村居家养老服务站',
					lng: '121.536489',
					lat: '30.03422'
				}, {
					name: '九龙湖村残疾人康复站',
					lng: '121.536329',
					lat: '30.034198'
				}, {
					name: '九龙湖村避灾点',
					lng: '121.538298',
					lat: '30.034399'
				}, {
					name: '九龙湖镇残疾人阳光康福苑',
					lng: '121.542506',
					lat: '30.034955'
				}, {
					name: '九龙湖镇居家养老（残）银龄互助中心',
					lng: '121.542615',
					lat: '30.034968'
				}]
			}
		},
		components: {
			PopBox,
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
			toMap(item) {
				let a = {
					X: item.lng,
					Y: item.lat,
				}
				this.$parent.test(a);
			},
			getIndex(e) {
				// this.$parent.isChildShow = false
				if (e == 0) {
					this.show = true
					this.showPubilc = false
          this.show2 = false
					this.showGuide = false
					this.onOff('关闭图层', '公共场所')
				} else if (e == 1) {
					this.show = false
					this.showPubilc = false
					this.showGuide = true
          this.show2 = false
					this.onOff('关闭图层', '公共场所')
					let data = {
						current: 1,
						size: 20
					}
					this.getGuideList(data)
				} else if (e == 2) {
					this.show = false
					this.showPubilc = false
					this.showGuide = false
          this.show2 = true
					this.onOff('关闭图层', '公共场所')
				} else if (e == 3) {
					this.show = false
					this.showPubilc = true
          this.show2 = false
					this.showGuide = false
					this.onOff('打开图层', '公共场所')
				}
			},
			getGuideList(data) {
				this.$ajax.getGuideList(data).then(res => {
					console.log(res.records)
					res.records.forEach(item => {
						if(item.name == "证明指南") {
							this.pageCont = item.img.split(",")
						}
						console.log(this.pageCont)
					})
				})
			},
			pre() {
				if(this.pageIndex<2){
					return
				} else {
					this.pageIndex=this.pageIndex-2
				}
			},
			next() {
				if(this.pageIndex+2>this.pageCont.length){
					return
				} else {
					this.pageIndex = this.pageIndex+2
				}
			},
		},
		mounted() {
			this.show = true
			// this.$parent.isChildShow = false
			// this.$parent.tabActive = 0
			this.onOff('关闭图层', '公共场所')
			
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

	.pop-common {
		width: 520px;
		// border: 1px solid #fff;
		// border-radius: 10px;
		// background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
	}

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

	.pop-list {
		position: absolute;
		top: 200px;
		left: 35px;

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span:first-child {
				text-align: center;
				width: 15%;
			}

			span:last-child {
				text-align: center;
				width: 85%;
			}
		}

		.pop-inner-box {
			max-height: 400px;
			margin-bottom: 10px;
			overflow-y: auto;

			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span:first-child {
					text-align: center;
					width: 15%;
				}

				span:last-child {
					text-align: center;
					width: 85%;
				}
			}
		}
	}

	.srjf {
		position: absolute;
		width: 1450px;
		top: 200px;
		left: 35px;
		background: url(../bgImages/私人建房统计.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		.pop-title {
			width: 1420px;
			height: 32px;
			background: url(../../public/static/images/lineBL.png);
			background-size: 100% 32px;
			font-size: 20px;
			padding: 0 20px;
			margin: 0 auto;
			box-sizing: border-box;
			line-height: 20px;

			span {
				margin-left: 20px;
			}
		}

		.srjf-title {
			display: flex;
			align-items: center;

			span {
				margin: 5px 0;
				text-align: center;
				flex: 1;
				font-size: 18px;
			}

			span:nth-child(4) {
				flex: 2;
			}
		}

		.srjf-item {
			display: flex;
			align-items: center;

			span {
				margin: 5px 0;
				text-align: center;
				flex: 1;
				font-size: 18px;
			}

			span:nth-child(4) {
				flex: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.ggcs-bg {
		background: url(../bgImages/公共场所.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 80px;
	}

	.proof-guide {
		width: 1127px;
		height: 830px;
		background: url(../bgImages/book.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 100;
		.guide-cont {
			width: 500px;
			height: 620px;
			padding: 10px;
			box-sizing: border-box;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.guide-left{
			position: absolute;
			top: 80px;
			left: 30px;
		}
		.guide-right {
			position: absolute;
			top: 80px;
			right: 40px;
		}
		.guide-btn {
			width: 70px;
			height: 30px;
			line-height: 30px;
			border-radius: 30px;
			border: 1px solid #9e9e9e;
			color: #000;
			text-align: center;
			cursor: pointer;
		}
		.guide-previous {
			position: absolute;
			bottom: 70px;
			left: 50px;
		}
		.guide-next {
			position: absolute;
			bottom: 70px;
			right: 50px;
		}
	}
</style>
