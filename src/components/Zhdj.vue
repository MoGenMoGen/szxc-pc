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
					<!-- <div class="pop-title"><span>村两委班子</span></div> -->
					<div class="cunwei-info">
						<div class="cunwei-item"><span>姓名</span><span>职位</span></div>
						<div v-for="(item,index) in cunweiList" :key="index" class="cunwei-item" @click="showImg(index)"><span>{{item.name}}</span><span>{{item.post}}</span></div>
					</div>
				</div>
				<div class="pop-common fazhan">
					<!-- <div class="pop-title"><span>发展党员</span></div> -->
					<span class="fazhan-info">计划2人</span>
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
					<!-- <div class="pop-title"><span>微心愿</span></div> -->
					<div class="xinyuan-info">
						<span>微心愿</span>
						<span>总数：8个</span>
						<span>已领取：8个</span>
					</div>
					<div class="xinyuan-title">
						<span>许愿人</span>
						<span>心愿标题</span>
						<span>许愿人联系方式</span>
					</div>
					<div class="xinyuan-item" v-for="(item,index) in xyList" :key="index">
						<span>{{item.name}}</span>
						<span>{{item.title}}</span>
						<span>{{item.phone}}</span>
					</div>
				</div>
        <div class="leader-img-box">
          <img :src="leaderImg" v-if="showLeaderImg" style="border: 2px solid #fff;">
          <img src="static/images/cancel.png"  v-if="showLeaderImg" class="cancelLogo" @click="closeImg">
        </div>
			</div>
		</transition>
		<transition name="fade">
			<div class="activity pop-common" v-show="show4">
				<!-- <div class="pop-title"><span>党员历次活动</span></div> -->
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
		<!-- <transition name="fade">
			<div class="pop-common activity-now" v-show="show4">
				<div class="pop-title"><span>当前活动</span></div>
				<div class="activity-now-box">
					<span class="activity-now-content" v-html="nowContent"></span>
					<span class="activity-now-content">开始时间: 2021-06-08 08:00</span>
					<span class="activity-now-content">结束时间: 2021-06-08 08:00</span>
					<span class="activity-now-content">活动地址: {{nowAdd}}</span>
					<span class="activity-now-content">目前参与人数: <span style="color: red;font-size: 20px;">{{nowNum}}</span>人</span>
				</div>
			</div>
		</transition> -->
		<transition name="fade">
			<div class="pop-common activity-detail" v-show="show6">
				<!-- <div class="pop-title"><span>党员活动</span></div> -->
				<div class="activity-detail-box">
					<span class="activity-detail-title">{{avctivityList[activityIndex].title}}</span>
					<span class="activity-detail-content activity-detail-contentF">{{avctivityList[activityIndex].content}}</span>
					<img class="activity-detail-img" :src="avctivityList[activityIndex].url">
					<span class="activity-detail-content">时间: {{avctivityList[activityIndex].time}}</span>
					<span class="activity-detail-content">活动地址: {{avctivityList[activityIndex].add}}</span>
				</div>
				<img src="static/images/cancel.png" class="detail-cancel" @click="cancelDetail">
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common qianyi" v-show="show5">
				<div class="qianyi-title">党员信息</div>
				<span class="qianyi-tips">此网格支部人员已迁至【九龙家苑】和【骆驼街道】</span>
				<img src="static/images/cancel.png" class="qianyi-cancel" @click="cancel">
			</div>
		</transition>
		<!-- <BottomTab :list="tabList" @updata="getIndex"></BottomTab> -->
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
        showLeaderImg: false,
        leaderImg: '',
				activityIndex: 0,
				nowContent: '<p>主题：红色旅游路线党史教育活动</p><p>活动流程：</p><p>1、锋领指数测评</p><p>2、党员重温入党誓词</p><p>3、参观红色记忆展览馆以及红色线路</p><p>4、书记上党课</p>',
				nowAdd: '九龙湖村红色展馆',
				nowNum: 100,
				list: [{
					num: 17,
					url: 'static/images/hslx.png',
					title: '红色路线'
				}, {
					num: 111,
					url: 'static/images/dyrs.png',
					title: '党员人数'
				}, {
					num: 3,
					url: 'static/images/dwgk.png',
					title: '党务公开'
				}, {
					num: 4,
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
					title: '郎家坪、十字路网格支部',
					name: ''
				},{
					title: '农家乐联盟支部',
					name: '农家乐支部党员'
				}],
				cunweiList: [{
					name: '杨勇',
					post: '党委书记、村主任、社长',
          url: 'static/images/leaderYy.png'
				},{
					name: '翁志元',
					post: '党委副书记、村副主任、社管会成员',
          url: 'static/images/leaderWzy.png'
				},{
					name: '王丹凤',
					post: '党委副书记',
          url: 'static/images/leaderWdf.png'
				},{
					name: '黄杰锋',
					post: '党委委员、副社长',
          url: 'static/images/leaderHjf.png'
				},{
					name: '朱丽红',
					post: '党委委员、纪委书记、村监会主任',
          url: 'static/images/leaderZhl.png'
				},{
					name: '王佳丹',
					post: '党委委员、村委委员、社监会主任',
          url: 'static/images/leaderWjd.png'
				}],
				avctivityList: [{
					title: '“颗颗元宵、浓浓深情”元宵节党日活动',
					content: '九龙湖村横溪网格支部开展“颗颗元宵、浓浓深情”元宵节党日活动。党员们欢聚一堂，开展包汤圆的活动。糯米面、芝麻馅在巧手制作下变成了一个个汤圆。随后我们将汤圆送给年老的党员，让他们感受到温暖。此次活动进一步弘扬中华民族优秀传统文化，让大家在欢声笑语中度过一个快乐难忘的元宵节。',
					time: '2021-02-26',
					num: 23,
					add: '九龙湖村会议室',
					url: 'static/images/activity1.png'
				},{
					title: '红色旅游路线环境卫生整治',
					content: '九龙湖村周家港、孟家、毛岭网格支部开展红色旅游线路环境卫生整治工作。在此次活动中，党员们充分展现了不怕脏、不怕苦、不怕累，敢于冲在前面、敢于抢挑重担的精神风貌。此次卫生整治活动，不仅美化了红色旅游路线，更培养了党员吃苦耐劳、乐于奉献的精神，真正地做到了为人民群众办实事、办好事。',
					time: '2021-03-13',
					num: 16,
					add: '九龙湖村长胜',
					url: 'static/images/activity2.png'
				},{
					title: '参观红色旅游路线',
					content: '九龙湖村田央沈、长桥头网格支部开展主题党日活动。以“铭党恩、强党性、正党风”为主题，讴歌党的丰功伟绩。有以下四项内容：1、观看红色电影《建国大业》通过重温光辉岁月和交流心得体会，提升党员的责任感。2、参观红色旅游路线，树立党员的坚定信念。3、在红色路线碉堡处，杨勇书记上党课—讲述朱枫的故事，激发党员走前列、当先行、开拓奋进、建功立业的使命感。4、进行反电信诈骗宣传。',
					time: '2021-05-10',
					num: 18,
					add: '九龙湖村田央沈',
					url: 'static/images/activity3.png'
				},{
					title: '《学党史、忆初心、担使命》党课学习',
					content: '2021年5月21日，九龙湖村召开党员和村民代表大会，共有以下几项会议内容：1、联村组长高伟平书记主持并领学了《镇海区农村基层组织规范化运行基本规则》。2、高伟平书记为党员上党课—《学党史、忆初心、担使命》3、向党员分发党史学习教育书籍。',
					time: '2021-05-21',
					num: 84,
					add: '九龙湖村长胜',
					url: 'static/images/activity4.png'
				}],
				xyList: [{
					name: '钱兴华',
					title: '想要一盒铁皮枫斗',
					time: '20210730',
					phone: '18258771317'
				},{
					name: '戎巧芬',
					title: '想要一个炖锅',
					time: '20210730',
					phone: '18069045433'
				},{
					name: '严晓芬',
					title: '想要米油等生活用品',
					time: '20210730',
					phone: '13738875923'
				},{
					name: '费爱娥',
					title: '想要米油等生活用品',
					time: '20210730',
					phone: '13738442315'
				},{
					name: '张秀菊',
					title: '想要米油等生活用品',
					time: '20210730',
					phone: '26298501'
				},{
					name: '沈振兴',
					title: '独居老人希望有个电饭煲',
					time: '20210730',
					phone: '13116605081'
				},{
					name: '方建萍',
					title: '希望有个空调扇',
					time: '20210730',
					phone: '15356095457'
				},{
					name: '徐树民',
					title: '独居老人希望有个空调扇',
					time: '20210730',
					phone: '18989305404'
				}]
			}
		},
		components: {
			PopBox,
			BottomTab
		},
		methods: {
      // 打开村委两班子图片
      showImg(e) {
        this.showLeaderImg = true
        this.leaderImg = this.cunweiList[e].url
      },
      closeImg() {
        this.showLeaderImg = false
      },
      //打开关闭图层
      onOff(type,name){
        let a = {
          type: type,
          name: name
        }
        this.$parent.test(a);
      },
      offP(){
        this.onOff("关闭图层","横溪党员")
        this.onOff("关闭图层","长胜周家港孟家毛岭党员")
        this.onOff("关闭图层","长胜田央沈长桥头党员")
        this.onOff("关闭图层","农家乐支部党员")
      },
			getIndex(e) {
        //红色路线
				if (e == 0) {
          this.onOff("打开图层","红色景点")
          this.onOff("打开图层","红色路线")
          this.offP()
          this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
          this.showLeaderImg = false
				} else if (e == 1) {
				  //党员信息
					if(this.partyInfoList[this.isPartyTab].name) {
						this.show5 = false
            this.onOff("打开图层",this.partyInfoList[this.isPartyTab].name)
            this.onOff("关闭图层","红色景点")
            this.onOff("关闭图层","红色路线")
					} else {
						this.show5 = true
					}
					this.show = true
					this.show2 = true
					this.show3 = false
					this.show4 = false
          this.showLeaderImg = false
				} else if (e == 2) {
          this.offP()
          this.onOff("关闭图层","红色景点")
          this.onOff("关闭图层","红色路线")
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
          this.showLeaderImg = false
				} else if (e == 3) {
          this.offP()
          this.onOff("关闭图层","红色景点")
          this.onOff("关闭图层","红色路线")
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = true
					this.show5 = false
          this.showLeaderImg = false
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
				this.activityIndex = index
				this.show6 = true
			},
			cancelDetail() {
				this.show6 = false
			}
		},
		mounted() {
			this.show = true
			let that = this
			setInterval(function(){
				that.nowNum +=1
			},60000)
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
		// border: 1px solid #fff;
		// border-radius: 10px;
		// background-color: rgba(0, 0, 0, 0.64);
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
			border: 1px solid rgb(30,42,108);
			background-color: rgba(30,42,108, 0.5);
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
			background: url(../bgImages/村两委班子.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 60px;
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
						width: 25%;
						text-align: center;
					}
					span:last-child {
						width: 75%;
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
			background: url(../bgImages/发展党员.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 60px;
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
			// height: 144px;
			top: 480px;
			right: 35px;
			background: url(../bgImages/微心愿.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 60px;
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
			.xinyuan-title {
				display: flex;
				align-items: center;
				span {
					flex: 1;
					font-size: 16px;
					text-align: center;
				}
			}
			.xinyuan-item {
				display: flex;
				align-items: center;
				span {
					flex: 1;
					font-size: 16px;
					text-align: center;
				}
			}
		}
    
    .leader-img-box {
      width: 600px;
      position: absolute;
      top: 200px;
      left: 580px;
      img {
        width: 100%;
      }
      .cancelLogo {
        width: 40px;
        height: 40px;
        position: absolute;
        top: -20px;
        right: -20px;
      }
    }
  }

	.activity {
		height: 380px;
		top: 500px;
		left: 35px;
		background: url(../bgImages/党员历次活动.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		.activity-info {
			width: 90%;
			margin: 0 auto;
			.activity-item {
				width: 100%;
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
		left: 800px;
		background: url(../bgImages/党员活动.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		.activity-detail-box{
			width: 90%;
			margin: 10px auto;
			font-size: 16px;
			display: flex;
			flex-direction: column;
			.activity-detail-title {
				margin: 10px 0;
				font-size: 23px;
				letter-spacing: 2px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: center;
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
			top: 20px;
			right: -10px;
			cursor: pointer;
		}
	}

	.qianyi{
		top: 300px;
		right: 80px;
		background: url(../bgImages/二级菜单.png) no-repeat;
		background-size: 100% 100%;
		width: 520px;
		height: 298px;
		padding: 0;
		.qianyi-title {
			width: 100%;
			padding: 10px 200px;
			box-sizing: border-box;
			font-size: 22px;
			text-align: center;
			color: #8CACF9;
		}
		.qianyi-tips {
			width: 70%;
			margin: 70px auto;
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
