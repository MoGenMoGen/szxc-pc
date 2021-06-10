<template>
	<div id="app">
		<div class="top-tab">
			<img src="static/images/logo.png"/>
			<span class="top-title">九龙湖数字乡村大屏</span>
			<div class="top-tab-box">
				<div class="top-tab-item" :class="{'active':isActive==index}" v-for="(item,index) in tabList" :key="index" @click="changeIndex(index)">
					{{item}}
				</div>
			</div>
			<span class="top-time">{{nowTime}}</span>
		</div>
		<Summary v-show="isActive==0"></Summary>
		<!-- <iframe src="http://218.0.7.176:90/" frameborder="0"></iframe> -->
	</div>
</template>

<script>
	import {
		ModelObj
	} from 'vue-3d-model';
	import myCharts from '@/components/MyCharts.vue'
	import Summary from '@/components/Summary.vue'
	export default {
		data() {
			return {
				nowTime: "",
				timer: "",
				isActive: 0,
				tabList: ['概要','一户一档','智慧党建','智慧旅游','基层治理','村务公开']
			}
		},
		name: 'app',
		components: {
			ModelObj,
			myCharts,
			Summary
		},
		methods: {
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
				this.isActive = e
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
		.top-tab {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 130px;
			background: rgba(6,11,32,0.4);
			z-index: 10000;
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
				margin-right: 198px;
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
	}
</style>
