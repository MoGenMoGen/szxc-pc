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
		<transition name="fade">
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
				<!-- <div class="pop-common dangfei">
					<div class="pop-title"><span>党费收缴</span></div>
					<div class="dangfei-info">
						<div>
							<span>当月收缴</span>
							<span>人次：109</span>
							<span>总额：3924元</span>
						</div>
						<div>
							<span>年累计</span>
							<span>人次：542</span>
							<span>总额：19512元</span>
						</div>
					</div>
				</div> -->
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
					<div v-for="(item,index) in avctivityList" :key="index" class="activity-item" @click="showDetail(index)">
						<span>{{index+1}}</span>
						<div class="item-right">
							<span class="item-title">{{item.title}}</span>
							<div><span style="color: #fff;margin-right: 50px;">{{item.time}}</span><span>参与人数：<span style="color: #3FECFF;">{{item.num}}</span>人</span></div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common activity-now" v-show="show4">
				<div class="pop-title"><span>当前活动</span></div>
				<div class="activity-now-box">
					<span class="activity-now-content">活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容</span>
					<span class="activity-now-content">开始时间: 2021-06-08 08:00</span>
					<span class="activity-now-content">结束时间: 2021-06-08 08:00</span>
					<span class="activity-now-content">活动地址: 宁波镇海区九龙湖风景区</span>
					<span class="activity-now-content">目前参与人数: 50人</span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common activity-detail" v-show="show6">
				<div class="pop-title"><span>党员活动</span></div>
				<div class="activity-detail-box">
					<span class="activity-detail-title">开展主题实践活动应与加强支部建设</span>
					<span class="activity-detail-content activity-detail-contentF">活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容</span>
					<img class="activity-detail-img" src="static/images/banner2.png">
					<span class="activity-detail-content">开始时间: 2021-06-08 08:00</span>
					<span class="activity-detail-content">结束时间: 2021-06-08 08:00</span>
					<span class="activity-detail-content">活动地址: 宁波镇海区九龙湖风景区</span>
				</div>
				<img src="static/images/cancel.png" class="detail-cancel" @click="cancelDetail">
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common qianyi" v-show="show5">
				<div class="pop-title"><span>党员信息</span></div>
				<span class="qianyi-tips">此网格支部人员已迁至【九龙家苑】和【骆驼街道】</span>
				<img src="static/images/cancel.png" class="qianyi-cancel" @click="cancel">
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
				show5: false,
				show6: false,
				list: [{
					num: 17,
					url: 'static/images/hslx.png',
					title: '红色路线'
				}, {
					num: 111,
					url: 'static/images/dyrs.png',
					title: '党员人数'
				}, {
					num: 1,
					url: 'static/images/dwgk.png',
					title: '党务公开'
				}, {
					num: 3,
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
					//title: '长胜周家港、孟家、毛家网格支部'
					title: '横溪网格支部',
					name: '横溪党员'
				}, {
					title: '周家港、孟家、毛岭网格支部',
					name: '长胜周家港孟家毛岭党员'
				}, {
					title: '田央沈、长桥头网格支部',
					name: '长胜田央沈长桥头党员'
				}, {
					title: '朗家坪、十字路网格支部',
					name: ''
				},{
					title: '农家乐联盟支部',
					name: '农家乐支部党员'
				}],
				cunweiList: [{
					name: '杨勇',
					post: '党委书记、村主任、社长'
				},{
					name: '翁志元',
					post: '党委副书记、村副主任、社管会成员'
				},{
					name: '王丹凤',
					post: '党委副书记'
				},{
					name: '黄杰锋',
					post: '党委委员、副社长'
				},{
					name: '朱丽红',
					post: '党委委员、纪委书记、村监会主任'
				},{
					name: '王佳丹',
					post: '党委委员、村委委员、社监会主任'
				}],
				avctivityList: [{
					title: '九龙湖村开展“颗颗元宵、浓浓深情”元宵节党日活动',
					time: '2021-02-26',
					num: 87
				},{
					title: '九龙湖村开展红色旅游线路环境卫生整治工作',
					time: '2021-03-13',
					num: 89
				},{
					title: '九龙湖村开展5月主题党日活动',
					time: '2021-05-10',
					num: 85
				},{
					title: '九龙湖村召开党员和村民代表大会',
					time: '2021-05-21',
					num: 84
				}]
			}
		},
		components: {
			PopBox,
			BottomTab
		},
		methods: {
			getIndex(e) {
        console.log(e)
				if (e == 0) {


          this.$parent.test("红色景点");
          this.$parent.test("红色路线");
          // if (!this.$root.hsxl){
          //   this.$parent.test("红色景点");
          //   this.$parent.test("红色路线");
          //   this.$root.hsxl = true;
          // }else {
          //   this.$parent.test("红色景点");
          //   this.$parent.test("红色路线");
          //   this.$parent.test("红色景点");
          //   this.$parent.test("红色路线");
          //   this.$root.hsxl = true;
          // }

          this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
				} else if (e == 1) {
					if(this.partyInfoList[this.isPartyTab].name) {
						this.show5 = false
						this.$parent.test(this.partyInfoList[this.isPartyTab].name);
					} else {
						this.show5 = true
					}
					this.show = true
					this.show2 = true
					this.show3 = false
					this.show4 = false
				} else if (e == 2) {
          if (!this.$root.zl){
            this.$parent.test("总览");
            this.$root.zl = true;
          }else {
            this.$parent.test("总览");
            this.$parent.test("总览");
            this.$root.zl = true;
          }

          this.show = false
					this.show2 = false
					this.show3 = true
					this.show4 = false
					this.show5 = false
				} else if (e == 3) {
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = true
					this.show5 = false
				}
			},
			changePartyTab(e) {
				if(e==3) {
					this.show5 = true
				} else {
					this.$parent.test(this.partyInfoList[e].name);
					this.show5 = false
				}
				this.isPartyTab = e
			},
			cancel() {
				this.show5 = false
			},
			showDetail(index) {
				console.log(index)
				this.show6 = true
			},
			cancelDetail() {
				this.show6 = false
			}
		},
		mounted() {
      console.log(123)
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
		z-index: 1998;
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
			// bottom: 190px;
			// left: 35px;
			top: 200px;
			right: 35px;
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

	.activity-now {
		top: 200px;
		left: 750px;
		.activity-now-box {
			width: 90%;
			margin: 10px auto;
			font-size: 16px;
			display: flex;
			flex-direction: column;
			.activity-now-content {
				margin: 10px 0;
			}
			.activity-now-content:first-child {
				font-size: 19px;
				letter-spacing: 2px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 5;
				word-wrap: break-word;
				/*! autoprefixer: ignore next */
				-webkit-box-orient: vertical;
			}
		}
	}
	
	.activity-detail {
		top: 200px;
		right: 35px;
		.activity-detail-box{
			width: 90%;
			margin: 10px auto;
			font-size: 16px;
			display: flex;
			flex-direction: column;
			.activity-detail-title {
				margin: 10px 0;
				font-size: 22px;
				letter-spacing: 2px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.activity-detail-content {
				margin: 10px 0;
			}
			.activity-detail-contentF {
				font-size: 19px;
				letter-spacing: 2px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 5;
				word-wrap: break-word;
				/*! autoprefixer: ignore next */
				-webkit-box-orient: vertical;
			}
			.activity-detail-img {
				width: 100%;
			}
		}
		.detail-cancel {
			position: absolute;
			width: 40px;
			height: 40px;
			top: -20px;
			right: -20px;
			cursor: pointer;
		}
	}

	.qianyi{
		top: 300px;
		right: 80px;
		.qianyi-tips {
			width: 70%;
			margin: 20px auto;
			font-size: 28px;
			color: #CF1508;
		}
		.qianyi-cancel {
			position: absolute;
			width: 40px;
			height: 40px;
			top: -20px;
			right: -20px;
			cursor: pointer;
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
