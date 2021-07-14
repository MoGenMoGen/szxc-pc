<template>
	<div id="app">
		<div class="top-tab" v-if="flag">
			<img src="static/images/logo.png" />
			<span class="top-title" @click="test2">九龙湖村数字平台</span>
			<div class="top-tab-box">
				<div class="top-tab-item" :class="{'active':isActive==index}" v-for="(item,index) in tabList"
					:key="index" @click="changeIndex(index)">
					{{ item }}
					<div v-if="(isActive==index&&isChildShow) ||(index==5&&isChildShow2)" class="top-tab-item-child">
						<span v-for="(newitem,newindex) in tabChildList" :key="newindex" @click.stop="choose(newindex,index)"
							:class="{'tabActive':tabActive==newindex}">{{ newitem }}</span>
					</div>
				</div>
				
			</div>
			<span class="top-time">{{ nowTime }}</span>
		</div>
		<Summary ref="summary" v-show="isActive==0&&flag"></Summary>
		<!-- <Yhyd ref="Yhyd" v-show="isActive==1&&flag"></Yhyd> -->
		<Zhdj ref="Zhdj" v-show="isActive==1&&flag"></Zhdj>
		<Jczl v-show="isActive==2&&flag" ref="jczl"></Jczl>
		<Cwgk v-show="isActive==3&&flag" ref="cwgk"></Cwgk>
		<Zhly ref="Zhly" v-show="isActive==4&&flag"></Zhly>
		<!-- 显示综合指挥 -->
		<!-- <div class="imgBtn" v-if="!flag">
      <img style="width: 100%; height: 100%;" src="../public/static/images/sgptBg.png">
      <div class="btn btn1" @click="openPop(1)"></div>
      <div class="btn btn2" @click="openPop(2)"></div>
      <div class="btn btn3" @click="openPop(3)"></div>
      <div class="btn btn4" @click="openImg(1)"></div>
      <div class="btn btn5" @click="openImg(2)"></div>
      <div class="btn btn6" @click="openImg(3)"></div>
      <div>
        <img :src="imgUrl" class="show-img" v-if="showImg">
        <img src="../public/static/images/cancel.png" class="cancelLogo" v-if="showImg">
      </div>
    </div> -->
		<iframe width="2236" height="1204" id="iframe" src="http://218.0.7.176:90/" frameborder="0"></iframe>
	</div>
</template>

<script>
	import {
		ModelObj
	} from 'vue-3d-model';
	import myCharts from '@/components/MyCharts.vue'
	import Summary from '@/components/Summary.vue'
	import Yhyd from '@/components/Yhyd.vue'
	import Zhdj from '@/components/Zhdj.vue'
	import Zhly from '@/components/Zhly.vue'
	import Jczl from '@/components/Jczl.vue'
	import Cwgk from '@/components/Cwgk.vue'

	export default {
		data() {
			return {
				showImg: false,
				showPop: true,
				isChildShow: false,
				isChildShow2: false,
				flag: true,
				nowTime: "",
				timer: "",
				isActive: 0,
				tabActive: 0,
				tabList: ['概要', '智慧党建', '基层治理', '村务管理', '智慧旅游', '便民服务'],
				tabChildList: ['建房申请', '证明指南','居家养老','公共场所']
			}
		},
		name: 'app',
		components: {
			ModelObj,
			myCharts,
			Summary,
			Yhyd,
			Zhdj,
			Zhly,
			Jczl,
			Cwgk
		},
		methods: {
			test(val) {
				document.getElementById('iframe').contentWindow.postMessage(val, '*')
			},
			test2() {},

			getDate() {
				let str = new Date()
				let week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				let year = str.getFullYear();
				let month = str.getMonth() + 1 < 10 ? "0" + (str.getMonth() + 1) : str.getMonth() + 1;
				let day = str.getDate() < 10 ? "0" + str.getDate() : str.getDate();
				let hour = str.getHours() < 10 ? "0" + str.getHours() : str.getHours();
				let minite = str.getMinutes() < 10 ? "0" + str.getMinutes() : str.getMinutes();
				let second = str.getSeconds() < 10 ? "0" + str.getSeconds() : str.getSeconds();
				let weekDay = week[str.getDay()];
				let data = year + '-' + month + '-' + day + ' ' + hour + ':' + minite + '(' + weekDay + ')'
				return data
			},
			changeIndex(e) {
				if (e !== 3&&e!==5) {
					this.$refs.cwgk.offShow()
				}
				if (e !== 0) {
					this.$refs.summary.offHik()
				}
				if (e !== 2) {
					this.$refs.jczl.offHik()
				}
				if (e == 0) {
					this.$refs.summary.onLoad()
				}
				if (e == 5) {
					this.tabChildList = ['建房申请', '证明指南','居家养老','公共场所']
					this.isChildShow = false
					this.isChildShow2 = true
					return
				} else {
					this.isActive = e
				}
				// //一档一户
				// if (e === 1) {
				//   this.onOff("打开图层","总览")
				//   this.offAllDj()
				//   this.offAllLy()
				//   this.offAllJc()
				// }
				//智慧党建
				if (e === 1) {
					this.onOff("打开图层", "红色景点")
					this.onOff("打开图层", "红色路线")
					this.offAllLy()
					this.offAllJc()
					this.offAllYh()
					this.isChildShow = false
					this.isChildShow2 = false
				}
				//旅游
				if (e === 4) {
					this.onOff("打开图层", "农家乐")
					this.offAllDj()
					this.offAllJc()
					this.offAllYh()
					this.isChildShow = false
					this.isChildShow2 = false
				}
				//基层治理
				if (e === 2) {
					// this.onOff("打开图层","山塘水库")
					// this.onOff("打开图层","垃圾点位")
					// this.onOff("打开图层","防溺水监控点")
					this.test("网格")
					this.offAllDj()
					this.offAllLy()
					this.offAllYh()
					this.tabChildList = ['网格管理','综合监管','线上指挥','综合巡查']
					this.isChildShow = true
					this.isChildShow2 = false
				}
				//村务管理
				if (e === 3) {
					this.offAllDj()
					this.offAllJc()
					this.offAllYh()
					this.offAllLy()
					this.isChildShow = false
					this.isChildShow2 = false
				}
			},
			//打开图层
			onOff(type, name) {
				let a = {
					type: type,
					name: name
				}
				this.test(a);
			},
			//关闭所有智慧党建下图层
			offAllDj() {
				this.onOff("关闭图层", "执法记录仪")
				this.onOff("关闭图层", "红色路线")
				this.onOff("关闭图层", "红色景点")
				this.onOff("关闭图层", "横溪党员")
				this.onOff("关闭图层", "长胜周家港孟家毛岭党员")
				this.onOff("关闭图层", "长胜田央沈长桥头党员")
				this.onOff("关闭图层", "农家乐支部党员")
			},
			//关闭所有旅游图层
			offAllLy() {
				this.onOff("关闭图层", "执法记录仪")
				this.onOff("关闭图层", "旅游路线")
				this.onOff("关闭图层", "旅游景点")
				this.onOff("关闭图层", "民宿")
				this.onOff("关闭图层", "农家乐")
			},
			//关闭所有一户一档
			offAllYh() {
				this.onOff("关闭图层", "执法记录仪")
				this.onOff("关闭图层", "一户一档人口")
			},
			//关闭所有基层
			offAllJc() {
				this.onOff("关闭图层", "执法记录仪")
				this.onOff("关闭图层", "综合监管")
				this.onOff("关闭图层", "危房")
				this.onOff("关闭图层", "防溺水监控点")
				this.onOff("关闭图层", "泥石流")
				this.onOff("关闭图层", "垃圾点位")
				this.onOff("关闭图层", "企业")
				this.onOff("关闭图层", "山塘水库")
			},



			showChild(e) {
				if (e == 5) {
					
				}
			},
			hiddenChild(e) {
				this.isChildShow = false
			},
			choose(newindex,index) {
				if(index == 2) {
					this.tabActive = newindex
					this.$refs.jczl.getIndex(newindex)
				}
			}
		},
		mounted() {
			if (window.location.hash == '#/Sgpt') {
				this.flag = false
				console.log(this.flag)
			}
			let _this = this
			this.nowTime = this.getDate()
			this.timer = setInterval(function() {
				_this.nowTime = _this.getDate()
			}, 60000)
		},
		beforeDestroy() {
			clearInterval(this.timer);
		}
	}
</script>

<style scoped lang="less">
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;

		.top-tab {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 130px;
			background: rgba(6, 11, 32, 0.4);
			z-index: 1999;
			display: flex;
			align-items: center;
			color: #fff;
			padding: 0 35px;
			box-sizing: border-box;

			img {
				width: 72px;
				height: 100px;
			}

			.top-title {
				font-size: 46px;
				margin-left: 28px;
				margin-right: 148px;
			}

			.top-tab-box {
				width: 900px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				flex: 1;
				font-size: 22px;
				margin-right: 78px;
				position: relative;

				.top-tab-item {
					width: 143px;
					height: 59px;
					background-image: url(../public/static/images/tab.png);
					background-size: 143px 59px;
					text-align: center;
					line-height: 59px;
				}

				.active {
					background-image: url(../public/static/images/tab-select.png);
				}

				.top-tab-item-child {
					// position: absolute;
					// top: 50px;
					// right: 15px;
					margin-left: 18px;
					display: flex;
					flex-direction: column;
					width: 110px;
					background-color: #181a28;
					color: #fff;
					transition: 0.5s;

					span {
						padding: 10px;
						font-size: 22px;
					}
					.tabActive{
						background-color: #C90D09;
					}
				}
			}

			.top-time {
				font-size: 24px;
			}
		}

		.imgBtn {
			width: 100%;
			height: 100%;
			position: relative;

			.btn {
				width: 160px;
				// background-color: red;
				position: absolute;
				opacity: 0;
			}

			.btn1 {
				height: 75px;
				top: 204px;
				left: 595px;
			}

			.btn2 {
				height: 75px;
				top: 204px;
				left: 775px;
			}

			.btn3 {
				height: 75px;
				top: 204px;
				left: 950px;
			}

			.btn4 {
				width: 170px;
				height: 34px;
				top: 501px;
				left: 28px;
			}

			.btn5 {
				width: 170px;
				height: 34px;
				top: 501px;
				left: 206px;
			}

			.btn6 {
				width: 170px;
				height: 34px;
				top: 501px;
				left: 386px;
			}

			.show-img {
				width: 1200px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.cancelLogo {
				position: absolute;
				top: -20px;
				right: -20px;
			}

		}
	}
</style>
