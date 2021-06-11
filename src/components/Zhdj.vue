<template>
	<div>
		<transition name="fade">
			<PopBox :list="list" v-show='show'></PopBox>
		</transition>
		<transition name="fade">
			<div class="party-info" v-show="show2">
				<div class="party-tab" :class="{'partyTabActive':isPartyTab==index}"
					v-for="(item,index) in partyInfoList" :key="index" @click="changePartyTab(index)">
					{{index+1}}、{{item.title}}
				</div>
			</div>
		</transition>
		<transition>
			<div class="pop-box" v-show="show3">
				<div class="pop-common cunwei">
					<div class="pop-title"><span>村两委班子</span></div>
					<div class="cunwei-info">
						<div class="cunwei-item"><span>姓名</span><span>职位</span></div>
						<div v-for="(item,index) in cunweiList" :key="index" class="cunwei-item"><span>{{item.name}}</span><span>{{item.post}}</span></div>
					</div>
				</div>
				<div class="pop-common fazhan">
					<div class="pop-title"><span>发展党员</span></div>
					<span class="fazhan-info">计划1人</span>
				</div>
				<div class="pop-common dangfei">
					<div class="pop-title"><span>党费收缴</span></div>
					<div class="dangfei-info">
						<div>
							<span>当月收缴</span>
							<span>人数：10</span>
							<span>总额：1000元</span>
						</div>
						<div>
							<span>年累计</span>
							<span>人数：10</span>
							<span>总额：1000元</span>
						</div>
					</div>
				</div>
				<div class="pop-common xinyuan">
					<div class="pop-title"><span>微心愿</span></div>
					<div class="xinyuan-info">
						<span>微心愿</span>
						<span>总数：3个</span>
						<span>已领取：3个</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="activity pop-common" v-show="show4">
				<div class="pop-title"><span>党员历次活动</span></div>
				<div class="activity-info">
					<div v-for="(item,index) in avctivityList" :key="index" class="activity-item">
						<span>{{index+1}}</span>
						<div class="item-right">
							<span class="item-title">{{item.title}}</span>
							<div><span style="color: #fff;margin-right: 50px;">{{item.time}}</span><span>参与人数：<span style="color: #3FECFF;">{{item.num}}</span>人</span></div>
						</div>
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
		name: 'Zhdj',
		props: {

		},
		data() {
			return {
				isPartyTab: 0,
				show: false,
				show2: false,
				show3: false,
				show4: false,
				list: [{
					num: 200,
					url: 'static/images/hslx.png',
					title: '红色路线'
				}, {
					num: 200,
					url: 'static/images/dyrs.png',
					title: '党员人数'
				}, {
					num: 200,
					url: 'static/images/dwgk.png',
					title: '党务公开'
				}, {
					num: 200,
					url: 'static/images/dyhd.png',
					title: '党员活动'
				}],
				tabList: [{
					hasUrl: false,
					title: '红色路线'
				}, {
					hasUrl: false,
					title: '党员信息'
				}, {
					hasUrl: false,
					title: '党务公开'
				}, {
					hasUrl: false,
					title: '党员活动'
				}],
				partyInfoList: [{
					title: '长胜周家港、孟家、毛家网格支部'
				}, {
					title: '长胜周家港、孟家、毛家网格支部'
				}, {
					title: '长胜周家港、孟家、毛家网格支部'
				}, {
					title: '长胜周家港、孟家、毛家网格支部'
				}, {
					title: '长胜周家港、孟家、毛家网格支部'
				}],
				cunweiList: [{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				},{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				},{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				},{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				},{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				},{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				}],
				avctivityList: [{
					title: '开展共产党员先进性教育活动',
					time: '2020-02-05',
					num: 105
				},{
					title: '开展共产党员先进性教育活动',
					time: '2020-02-05',
					num: 105
				},{
					title: '开展共产党员先进性教育活动',
					time: '2020-02-05',
					num: 105
				},{
					title: '开展共产党员先进性教育活动',
					time: '2020-02-05',
					num: 105
				}]
			}
		},
		components: {
			PopBox,
			BottomTab
		},
		methods: {
			getIndex(e) {
				if (e == 0) {
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = false
				} else if (e == 1) {
					this.show = true
					this.show2 = true
					this.show3 = false
					this.show4 = false
				} else if (e == 2) {
					this.show = false
					this.show2 = false
					this.show3 = true
					this.show4 = false
				} else if (e == 3) {
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = true
				}
			},
			changePartyTab(e) {
				this.isPartyTab = e
			}
		},
		mounted() {
			this.show = true
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
	.party-info {
		position: absolute;
		bottom: 30px;
		left: 35px;
		display: flex;
		flex-direction: column;

		.party-tab {
			width: 520px;
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
		}

		.partyTabActive {
			background-color: rgba(207, 21, 8, 0.55);
		}
	}

	.pop-box {
		.cunwei {
			height: 380px;
			top: 200px;
			left: 35px;
			.cunwei-info {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 20px;
				.cunwei-item {
					height: 40px;
					line-height: 40px;
					display: flex;
					align-items: center;
					font-size: 20px;
					span:first-child {
						width: 35%;
						text-align: center;
					}
					span:last-child {
						width: 65%;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}

		.fazhan {
			height: 150px;
			bottom: 190px;
			left: 35px;
			.fazhan-info {
				font-size: 30px;
				text-align: center;
				line-height: 30px;
				margin-top: 30px;
			}
		}

		.dangfei {
			height: 190px;
			top: 200px;
			right: 35px;
			.dangfei-info {
				display: flex;
				flex-direction: column;
				margin-top: 20px;
				div {
					width: 100%;
					height: 40px;
					line-height: 40px;
					display: flex;
					align-items: center;
					font-size: 20px;
					span {
						text-align: center;
						width: 30%;
					}
					span:last-child {
						width: 40%;
					}
				}
			}
		}

		.xinyuan {
			height: 144px;
			top: 480px;
			right: 35px;
			.xinyuan-info {
				width: 100%;
				margin-top: 20px;
				display: flex;
				align-items: center;
				height: 40px;
				line-height: 40px;
				span {
					width: 33%;
					font-size: 20px;
					text-align: center;
				}
			}
		}
	}

	.activity {
		height: 380px;
		top: 500px;
		left: 35px;
		.activity-info {
			width: 100%;
			margin-top: 20px;
			.activity-item {
				width: 474px;
				height: 62px;
				padding: 13px;
				box-sizing: border-box;
				display: flex;
				font-size: 16px;
				color: #BCF0FE;
				background: url(../../public/static/images/dylchdBg.png) no-repeat;
				background-size: 100% 100%;
				margin: 10px auto;
				.item-right {
					width: 420px;
					margin-left: 10px;
					font-size: 12px;
					.item-title {
						max-width: 420px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 14px;
					}
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
