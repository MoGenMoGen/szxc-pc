<template>
	<div id="app">
		<div class="top-tab" v-if="flag">
			<!-- <img src="static/images/logo.png" /> -->
			<span class="top-title" @click="test2">万安庄村数字平台</span>
			<div class="top-tab-box">
				<div class="top-tab-item" :class="{'active':isActive==index}" v-for="(item,index) in tabList"
					:key="index" @click="changeIndex(index)" @mouseover="showChild(index)">
					{{ item }}
					<div @mouseout="hiddenChild" v-show="isActive2==index&&isChildShow" class="top-tab-item-child">
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
		<Bmfw ref="bmfw" v-show="isActive==5&&flag"></Bmfw>


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
	import Bmfw from '@/components/Bmfw.vue'

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
				isActive2: 0,
				tabActive: 0,
				tabList: ['概要', '智慧党建', '基层治理', '清廉九龙', '智慧旅游', '便民服务'],
				tabChildList: []
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
			Cwgk,
			Bmfw
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
				if (e !== 4){
          this.$refs.Zhly.offHik()
        }
				if (e !== 2) {
					this.$refs.jczl.offHik()
				}
				if (e == 0) {
					this.isChildShow = false
					this.$refs.summary.onLoad()
				}
				if (e == 5) {
					this.offAllDj()
					this.offAllJc()
					this.offAllLy()
					this.offAllYh()
				}
				this.isActive = e
				//智慧党建
				if (e === 1) {
					this.onOff("打开图层", "红色景点")
					this.onOff("打开图层", "红色路线")
					this.offAllLy()
					this.offAllJc()
					this.offAllYh()
				}
				//旅游
				if (e === 4) {
					this.offAllDj()
					this.offAllJc()
					this.offAllYh()
				}
				//基层治理
				if (e === 2) {
					if(this.$refs.jczl.e==0) {
						this.onOff("打开图层", "网格")
					}
					this.offAllDj()
					this.offAllLy()
					this.offAllYh()
				}
				//村务管理
				if (e === 3) {
					this.offAllDj()
					this.offAllJc()
					this.offAllYh()
					this.offAllLy()
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
				this.onOff("关闭图层", "红色路线")
				this.onOff("关闭图层", "红色景点")
				this.onOff("关闭图层", "横溪党员")
				this.onOff("关闭图层", "长胜周家港孟家毛岭党员")
				this.onOff("关闭图层", "长胜田央沈长桥头党员")
				this.onOff("关闭图层", "农家乐支部党员")
			},
			//关闭所有旅游图层
			offAllLy() {
				this.onOff("关闭图层", "旅游路线")
				this.onOff("关闭图层", "旅游景点")
				this.onOff("关闭图层", "民宿")
				this.onOff("关闭图层", "农家乐")
			},
			//关闭所有一户一档
			offAllYh() {
				this.onOff("关闭图层", "一户一档人口")
			},
			//关闭所有基层
			offAllJc() {
				this.onOff("关闭图层", "综合监管")
				this.onOff("关闭图层", "危房")
				this.onOff("关闭图层", "防溺水监控点")
				this.onOff("关闭图层", "泥石流")
				this.onOff("关闭图层", "边坡位移")
				this.onOff("关闭图层", "垃圾点位")
				this.onOff("关闭图层", "企业")
				this.onOff("关闭图层", "山塘水库")
				this.onOff("关闭图层", "执法记录仪")
				this.onOff("关闭图层", "网格")
				this.onOff("关闭图层", "五保户")
				this.onOff("关闭图层", "低保")
				this.onOff("关闭图层", "残障人员")
				this.onOff("关闭图层", "老年人")
			},
			showChild(e) {
				if(e==1){
					this.tabChildList = ['红色课堂', '牢记使命','支部力量','红色足迹']
					this.isChildShow = true
					this.isActive2 = e
				} else if (e==2) {
					this.tabChildList = ['网格管理','综合监管']
					this.isChildShow = true
					this.isActive2 = e
				} else if (e==3) {
					this.tabChildList = ['阳光村务', '村民说事','民意体检', '清风廉韵']
					this.isChildShow = true
					this.isActive2 = e
				} else if (e==4) {
					this.tabChildList = ['美食', '住宿','游玩','购物']
					this.isChildShow = true
					this.isActive2 = e
				} else if (e==5) {
					this.tabChildList = ['建房申请', '减负清单','居家养老','公共场所']
					this.isChildShow = true
					this.isActive2 = e
				}
			},
			hiddenChild() {
				this.isChildShow = false
			},
			choose(newindex,index) {
				this.isActive = index
				this.isChildShow = false
				if (index !== 3&&index!==5) {
					this.$refs.cwgk.offShow()
				}
				if (index !== 0) {
					this.$refs.summary.offHik()
				}
				if (index !== 4){
				  this.$refs.Zhly.offHik()
				}
				if (index !== 2) {
					this.$refs.jczl.offHik()
				}
				if(index == 1) {
					this.tabActive = newindex
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.onOff('关闭图层', '公共场所')
					this.$refs.Zhdj.getIndex(newindex)
					this.$refs.Zhdj.isActive = newindex
					this.offAllLy()
					this.offAllJc()
					this.offAllYh()
				}  else if(index == 2) {
					this.onOff('关闭图层', '公共场所')
					this.tabActive = newindex
					this.$refs.jczl.getIndex(newindex)
					if(this.$refs.jczl.e==0) {
						this.onOff("打开图层", "网格")
					}
					this.offAllDj()
					this.offAllLy()
					this.offAllYh()
				} else if (index==3) {
					this.tabActive = newindex
					this.$refs.cwgk.getIndex(newindex)
					this.onOff('关闭图层', '公共场所')
					this.offAllDj()
					this.offAllJc()
					this.offAllYh()
					this.offAllLy()
				} else if (index==4) {
					this.tabActive = newindex
					this.$refs.Zhly.getIndex(newindex)
					this.$refs.Zhly.isActive = newindex
					this.onOff('关闭图层', '公共场所')
					this.offAllDj()
					this.offAllJc()
					this.offAllYh()
				} else if (index==5) {
					this.tabActive = newindex
					this.$refs.bmfw.getIndex(newindex)
					this.offAllDj()
					this.offAllJc()
					this.offAllLy()
					this.offAllYh()
				}
			}
		},
		mounted() {
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
		::-webkit-scrollbar {
		  width: 5px;
		  height: 1px;
		}
		::-webkit-scrollbar-thumb { //滑块部分
		  border-radius: 5px;
		  background-color: #b6b6b6;
		}
		// ::-webkit-scrollbar-track { //轨道部分
		//   box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		//   background: #ededed;
		//   border-radius: 5px;
		// }
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
					margin-left: 28px;
					display: flex;
					flex-direction: column;
					width: 90px;
					background-color: #181a28;
					color: #fff;
					transition: 0.5s;
					line-height: 32px;

					span {
						padding: 10px;
						font-size: 16px;
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
