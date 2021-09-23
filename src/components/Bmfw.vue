<template>
	<div>
		<transition name="fade">
			<div class="pop-common srjf" v-show="show">
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



    <iframe v-if="show2" style="margin-top: 120px ;z-index: 9999999" width="2236" height="1104" id="iframe" src="http://36.134.5.123:8200" frameborder="0"></iframe>


		<transition name="fade">
			<div class="proof-guide" v-show="showGuide">
				<div class="proof-guide-top">
					<div class="proof-guide-top-title">{{guideInfo.name}}</div>
					<div class="proof-guide-top-cont" v-html="guideInfo.cont"></div>
				</div>
				<div class="proof-guide-bottom">
					<div class="proof-guide-bottom-box">
						<div class="proof-guide-bottom-title">出具说明与证明</div>
						<div class="search-box">
							<input type="text" placeholder="请输入关键字" v-model="keyWord" @keyup.enter="searchKey">
							<img src="static/images/search.png" @click="searchKey">
						</div>
						<div class="proof-guide-bottom-list">
							<span v-for="(item,index) in guideList" :key="index" @click="chooseGuide(item)">{{index+1}}、{{item.name}}</span>
						</div>
					</div>
					<div class="proof-guide-bottom-box" v-if="guideDetailShow">
						<div class="proof-guide-bottom-title">详情</div>
						<img src="../../public/static/images/cancel.png" style="position: absolute;top: 8px;right: -8px;" @click="guideDetailShow = false">
						<div class="proof-guide-bottom-name">{{guideDetail.name}}</div>
						<div class="proof-guide-bottom-cont">{{guideDetail.cont}}</div>
					</div>
				</div>
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
				keyWord: '',
				show: false, //私人建房
				show2: false, //居家养老
				showPubilc: false, //公共场所
				showGuide: false, //减负清单
				guideDetailShow: false, //减负清单详情
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
					name: '刘飞',
					num: 4,
					solve: '拆除',
					newArea: 100,
					newAdd: '横溪墙头25号',
					schedule: '审核中',
					sort: '2'
				}, {
					name: '俞棋辉',
					num: 2,
					solve: '拆除',
					newArea: 100,
					newAdd: '九龙湖横溪',
					schedule: '申请',
					sort: '1'
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
				}],
				guideList:[],
				guideInfo: {},
				guideDetail: {}
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
					this.guideDetailShow = false
					this.onOff('关闭图层', '公共场所')
				} else if (e == 1) {
					this.show = false
					this.showPubilc = false
					this.showGuide = true
					this.show2 = false
					this.guideDetailShow = false
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
					this.guideDetailShow = false
					this.onOff('关闭图层', '公共场所')
				} else if (e == 3) {
					this.onOff('打开图层', '公共场所')
					this.show = false
					this.showPubilc = true
					this.show2 = false
					this.showGuide = false
					this.guideDetailShow = false
					let data = {
						current: 1,
						size: 50
					}
					this.$ajax.getPub(data).then(res => {
						this.publicList = res.records
					})
				}
			},
			getGuideList(data) {
				this.$ajax.getGuideList(data).then(res => {
					this.guideInfo = res.records[0]
					this.$ajax.getAdvert({current:1,size:30,travelId:res.records[0].id}).then(resp => {
						this.guideList = resp.records
					})
				})
			},
			searchKey() {
				this.guideDetailShow = false
				if(this.keyWord!="") {
					this.$ajax.getGuideList({size:10,current:1}).then(res => {
						this.guideInfo = res.records[0]
						this.$ajax.getAdvert({current:1,size:30,travelId:res.records[0].id}).then(resp => {
							this.guideList = resp.records
							this.guideList = this.guideList.filter(item=>item.name.indexOf(this.keyWord)>-1)
						})
					})
				} else {
					this.getGuideList({size:10,current: 1})
				}
			},
			chooseGuide(item) {
				this.guideDetailShow = true
				this.guideDetail = item
			}
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
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
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
		min-height: 298px;
		top: 200px;
		left: 35px;
		background: url(../bgImages/私人建房统计.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
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
		display: flex;
		flex-direction: column;
		width: 1652px;
		position: absolute;
		top: 188px;
		left: 292px;
		.proof-guide-top {
			width: 1652px;
			height: 299px;
			background: url(../bgImages/减负清单-上.png) no-repeat;
			background-size: 100% 100%;
			margin-bottom: 30px;
			.proof-guide-top-title {
				width: 100%;
				padding: 10px 630px;
				box-sizing: border-box;
				font-size: 22px;
				color: #8CACF9;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.proof-guide-top-cont {
				width: 1505px;
				max-height: 220px;
				overflow-y: scroll;
				margin: 0 auto;
				margin-top: 10px;
				color: #fff;
				font-size: 18px;
			}
		}
		.proof-guide-bottom {
			display: flex;
			justify-content: space-between;
			.proof-guide-bottom-box {
				width: 811px;
				height: 616px;
				background: url(../bgImages/减负清单-左右.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				.proof-guide-bottom-title {
					width: 100%;
					padding: 13px 300px 10px 320px;
					box-sizing: border-box;
					font-size: 22px;
					color: #8CACF9;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.search-box {
					width: 326px;
					border: 1px solid #fff;
					border-radius: 5px;
					display: flex;
					padding: 10px 20px;
					box-sizing: border-box;
					color: #fff;
					margin-left: 50px;
					margin-top: 20px;
					input {
						flex: 1;
						background-color: transparent;
						border: none;
						color: #fff;
						font-size: 18px;
						opacity: 0.45;
					}
				
					input::-webkit-input-placeholder {
						color: #fff;
					}
				}
				.proof-guide-bottom-list {
					width: 780px;
					max-height: 450px;
					padding-left: 50px;
					margin-top: 20px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					color: #fff;
					font-size: 18px;
					overflow-y: scroll;
					span {
						margin-bottom: 20px;
					}
					span:last-child {
						margin-bottom: 0;
					}
				}
				.proof-guide-bottom-name {
					width: 100%;
					font-size: 18px;
					color: #fff;
					text-align: center;
					padding: 0 30px;
					box-sizing: border-box;
					margin: 20px auto;
				}
				.proof-guide-bottom-cont {
					width: 100%;
					max-height: 450px;
					overflow-y: scroll;
					font-size: 18px;
					color: #fff;
					padding: 0 30px;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
