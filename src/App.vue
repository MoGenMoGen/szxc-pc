<template>
	<div id="app">
		<div class="top-tab" v-if="flag">
			<img src="static/images/logo.png"/>
			<span class="top-title" @click="test2">九龙湖数字乡村大屏</span>
			<div class="top-tab-box">
				<div class="top-tab-item" :class="{'active':isActive==index}" v-for="(item,index) in tabList" :key="index" @click="changeIndex(index)">
					{{item}}
					
				</div>
			</div>
			<span class="top-time">{{nowTime}}</span>
		</div>
		<Summary v-show="isActive==0&&flag"></Summary>
		<Yhyd v-show="isActive==1&&flag"></Yhyd>
		<Zhdj v-show="isActive==2&&flag"></Zhdj>
		<Zhly v-show="isActive==3&&flag"></Zhly>
		<Jczl v-show="isActive==4&&flag" ref="jczl"></Jczl>
		<Cwgk v-show="isActive==5&&flag"></Cwgk>
		<!-- 显示综合指挥 -->
		<div class="imgBtn" v-if="!flag">
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
<!--			<div class="sj-pop" v-if="showPop">-->
<!--				<img src="../public/static/images/cancel.png" class="cancelLogo" v-if="showPop">-->
<!--				<div class="sj-pop-title"><span>{{title}}</span></div>-->
<!--				<div class="sj-pop-info">-->
<!--					<span style="width: 10%;">事件编号</span>-->
<!--					<span style="width: 20%;">内容</span>-->
<!--					<span style="width: 10%;">地址</span>-->
<!--					<span style="width: 10%;">问题类型</span>-->
<!--					<span style="width: 10%;">时间分类</span>-->
<!--					<span style="width: 10%;">上报时间</span>-->
<!--					<span style="width: 10%;">职能科室/部门</span>-->
<!--					<span style="width: 10%;">办结时间</span>-->
<!--					<span style="width: 10%;">是否超时关闭</span>-->
<!--				</div>-->
<!--				<div v-for="(item,index) in sjList" :key="index" class="sj-pop-item">-->
<!--					<span style="width: 10%;">{{item.id}}</span>-->
<!--					<span style="width: 20%;">{{item.content}}</span>-->
<!--					<span style="width: 10%;">{{item.add}}</span>-->
<!--					<span style="width: 10%;">{{item.type}}</span>-->
<!--					<span style="width: 10%;">{{item.timeType}}</span>-->
<!--					<span style="width: 10%;">{{item.reportTime}}</span>-->
<!--					<span style="width: 10%;">{{item.department}}</span>-->
<!--					<span style="width: 10%;">{{item.overTime}}</span>-->
<!--					<span style="width: 10%;">{{item.timeOut}}</span>-->
<!--				</div>-->
<!--			</div>-->
		</div>



		  <!-- <iframe width="2236" height="1204" id="iframe" src="http://218.0.7.176:90/" frameborder="0"></iframe> -->


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
				imgUrl: '../public/static/images/banner3.png',
				title: '一级事件',
				flag: true,
				nowTime: "",
				timer: "",
				isActive: 0,
				tabList: ['概要','一户一档','智慧党建','智慧旅游','基层治理','村务管理','便民服务'],
				sjList: [{
					id: 'jlw202012130102',
					content: '河头村河西上街网格预征土地上有违章搭建',
					add: '河头村',
					type: '治危拆违',
					timeType: '网格关闭',
					reportTime: '2020-12-15 10:07:09',
					department: '镇海区九龙湖镇城建管理服务中心',
					overTime: '2020-12-15 10:07:09',
					timeOut: '否'
				},{
					id: 'jlw202012130102',
					content: '河头村河西上街网格预征土地上有违章搭建',
					add: '河头村',
					type: '治危拆违',
					timeType: '网格关闭',
					reportTime: '2020-12-15 10:07:09',
					department: '镇海区九龙湖镇城建管理服务中心',
					overTime: '2020-12-15 10:07:09',
					timeOut: '否'
				},{
					id: 'jlw202012130102',
					content: '河头村河西上街网格预征土地上有违章搭建',
					add: '河头村',
					type: '治危拆违',
					timeType: '网格关闭',
					reportTime: '2020-12-15 10:07:09',
					department: '镇海区九龙湖镇城建管理服务中心',
					overTime: '2020-12-15 10:07:09',
					timeOut: '否'
				},{
					id: 'jlw202012130102',
					content: '河头村河西上街网格预征土地上有违章搭建',
					add: '河头村',
					type: '治危拆违',
					timeType: '网格关闭',
					reportTime: '2020-12-15 10:07:09',
					department: '镇海区九龙湖镇城建管理服务中心',
					overTime: '2020-12-15 10:07:09',
					timeOut: '否'
				},{
					id: 'jlw202012130102',
					content: '河头村河西上街网格预征土地上有违章搭建',
					add: '河头村',
					type: '治危拆违',
					timeType: '网格关闭',
					reportTime: '2020-12-15 10:07:09',
					department: '镇海区九龙湖镇城建管理服务中心',
					overTime: '2020-12-15 10:07:09',
					timeOut: '否'
				}]
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
		  test(val){
        document.getElementById('iframe').contentWindow.postMessage(val,'*')
      },
      test2(){
        document.getElementById('iframe').contentWindow.postMessage("农家乐",'*')
        let a = {
		      type:'农家乐',
          name:'月波农家菜馆'
        }
        document.getElementById('iframe').contentWindow.postMessage(a,'*')
      },

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
				if(e == 6) {
					return
				} else {
					this.isActive = e
				}
        console.log(e)
        if (e === 1){
          if (!this.$root.zl){
            this.test("总览");
            this.$root.zl = true;
          }else {
            this.test("总览");
            this.test("总览");
            this.$root.zl = true;
          }
        }
        // if (e !== 4){
        //   this.$refs.jczl.offHik()
        // }


        //地图跳转
        if (e === 2){
            this.test("红色景点");
            this.test("红色路线");

          // if (!this.$root.hsxl){
          //   this.test("红色景点");
          //   this.test("红色路线");
          //   this.$root.hsxl = true;
          // }else {
          //   this.test("红色景点");
          //   this.test("红色路线");
          //   this.test("红色景点");
          //   this.test("红色路线");
          //   this.$root.hsxl = true;
          // }
        }
        //旅游
        if (e === 3){
          this.test("旅游景点");
        }
        //
        // console.log(e === 2){
        //
        // }
			}
		},
		mounted() {
			if(window.location.hash=='#/Sgpt') {
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
			background: rgba(6,11,32,0.4);
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
				transform: translate(-50%,-50%);
			}
			.cancelLogo {
				position: absolute;
				top: -20px;
				right: -20px;
			}

		}
	}
</style>
