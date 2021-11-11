<template>
	<div>
		<div class="pop-box">
			<div class="content">
				<div v-for="(item,index) in list" :key="index" class="item" @click="getIndex(index)">
					<img :src="item.url">
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="service-point" v-if="ggflfwShow">
			<div class="title">公共法律服务点</div>
			<div class="list-title">
				<span>服务点</span>
				<span>负责人</span>
			</div>
			<div class="list-box">
				<div class="branch-list-item" v-for="(item,index) in ggfwList" :key="index">
					<span>{{item.point}}</span>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="service-map" v-if="ggflfwShow">
			<div class="title">公共法律服务点地图</div>
			<el-image :src="mapUrl" :preview-src-list="mapUrlList" fit="cover"></el-image>
		</div>
		<div class="tjy-list" v-if="tjyShow">
			<div class="title">调解员</div>
			<div class="list-title">
				<span>村、社区</span>
				<span>姓名</span>
				<span>职务</span>
				<span>手机</span>
			</div>
			<div class="list-box">
				<div class="branch-list-item" v-for="(item,index) in tjyList" :key="index">
					<span>{{item.area}}</span>
					<span>{{item.name}}</span>
					<span>{{item.position}}</span>
					<span>{{item.phone}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ggflfwd from '../../bgImages/fzzf/公共法律服务点.png';
	import tjy from '../../bgImages/fzzf/调解员.png';
	import lxlf from '../../bgImages/fzzf/来信来访.png';
	import mapUrl from '../../bgImages/fzzf/公共法律服务点地图(1).png'
	export default {
		name: 'zfgg',
		props: {},
		data() {
			return {
				mapUrl,
				mapUrlList: [],
				ggflfwShow: false,
				tjyShow: false,
				list: [{
					name: '公共法律服务点',
					detailTitle: '公共法律服务点',
					url: ggflfwd
				},{
					name: '调解员',
					detailTitle: '调解员',
					url: tjy
				},{
					name: '来信来访',
					detailTitle: '详情',
					url: lxlf
				}],
				ggfwList: [{
					point: '九龙湖公共法律服务点',
					name: '周月华'
				},{
					point: '河头公共法律服务点',
					name: '王柯'
				},{
					point: '九龙湖司法所',
					name: '朱美菊'
				},{
					point: '龙源公共法律服务点',
					name: '王柯'
				},{
					point: '河源公共法律服务点',
					name: '严巧娜'
				},{
					point: '田顾公共法律服务点',
					name: '陆一娇'
				},{
					point: '田杨陈公共法律服务点',
					name: '顾安荣'
				},{
					point: '西经堂公共法律服务点',
					name: '徐家庆'
				},{
					point: '杜夹岙公共法律服务点',
					name: '周茹琴'
				},{
					point: '西河公共法律服务点',
					name: '徐家庆'
				},{
					point: '汶溪公共法律服务点',
					name: '周月华'
				},{
					point: '中心公共法律服务点',
					name: '潘晓'
				},{
					point: '长石公共法律服务点',
					name: '周茹琴'
				},{
					point: '长宏公共法律服务点',
					name: '潘晓'
				},{
					point: '思源公共法律服务点',
					name: '陈洁'
				}],
				tjyList: [{
					area: '龙源社区',
					name: '韩健勇',
					position: '治调主任',
					phone: '13967802754'
				},{
					area: '河源社区',
					name: '郑国振',
					position: '治调主任',
					phone: '13968276009'
				},{
					area: '九龙湖司法所',
					name: '朱美菊',
					position: '治调主任',
					phone: '15865124302'
				},{
					area: '思源社区',
					name: '胡文浩',
					position: '治调主任',
					phone: '15867214086'
				},{
					area: '河头村',
					name: '朱凯明',
					position: '治调主任',
					phone: '15257493523'
				},{
					area: '九龙湖村',
					name: '黄杰锋',
					position: '副社长',
					phone: '13857477521'
				},{
					area: '田顾村',
					name: '韩鸿翔',
					position: '副主任',
					phone: '13857887920'
				},{
					area: '杜夹岙村',
					name: '沈智灵',
					position: '治调主任',
					phone: '13586889836'
				},{
					area: '中心村',
					name: '黄益峰',
					position: '治调主任',
					phone: '13738489196'
				},{
					area: '汶溪村',
					name: '姚龙',
					position: '副书记',
					phone: '15067450270'
				},{
					area: '长石村',
					name: '唐柯迪',
					position: '治调主任',
					phone: '15888588776'
				},{
					area: '长宏村',
					name: '李晓',
					position: '治调主任',
					phone: '15888093555'
				},{
					area: '田杨陈村',
					name: '陈柯杰',
					position: '治调主任',
					phone: '18857468041'
				},{
					area: '西河村',
					name: '薛挺',
					position: '治调主任',
					phone: '18067110090'
				},{
					area: '西经堂村',
					name: '汪永波',
					position: '治调主任',
					phone: '15088458378'
				}]
			}
		},
		components: {
		},
		methods: {
			getIndex(index) {
				if(index == 0) {
					this.ggflfwShow = true
					this.tjyShow = false
				} else if (index == 1) {
					this.ggflfwShow = false
					this.tjyShow = true
				} else if (index == 2) {
					this.ggflfwShow = false
					this.tjyShow = false
				}
			}
		},
		watch:{
		},
		mounted() {
			this.mapUrlList = this.mapUrl.split(",")
		}
	}
</script>

<style scoped lang="less">
	.pop-box {
		width: 612px;
		height: 255px;
		background: url(../../bgImages/fzzf/概览.png) no-repeat;
		background-size: 100% 100%;
		padding: 10px;
		padding-top: 80px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 35px;
		z-index: 1998;
		.content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30px;
			// margin-top: 30px;
			.item {
				// width: 25%;
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					width: 40px;
					height: 40px;
					margin: 20px 0;
				}
				span:last-child {
					font-size: 20px;
				}
			}
		}
	}
	.service-point {
		width: 612px;
		height: 506px;
		background: url(../../bgImages/fzzf/线上调解-公共法律服务点-列表.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		color: #fff;
		position: absolute;
		top: 469px;
		left: 35px;
		z-index: 1998;
		.title {
			width: 100%;
			padding: 10px 210px;
			text-align: center;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.list-title {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			margin-top: 20px;
			font-size: 18px;
			span {
				width: 40%;
				text-align: center;
			}
			span:first-child {
				width: 60%;
			}
		}
		.list-box {
			max-height: 370px;
			overflow-y: scroll;
			font-size: 18px;
			.branch-list-item {
				display: flex;
				align-items: center;
				span {
					width: 40%;
					text-align: center;
					margin-bottom: 20px;
				}
				span:first-child {
					width: 60%;
				}
			}
		}
	}
	.service-map {
		width: 942px;
		height: 746px;
		background: url(../../bgImages/fzzf/线上调解-公共法律服务点-地图.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 200px;
		left: 749px;
		z-index: 1998;
		.title {
			width: 100%;
			padding: 10px 360px;
			text-align: center;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.el-image {
			width: 872px;
			height: 636px;
			margin: 20px auto;
		}
	}
	.tjy-list {
		width: 616px;
		height: 506px;
		background: url(../../bgImages/fzzf/线上调解-调解员.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 787px;
		z-index: 1998;
		.title {
			width: 100%;
			padding: 10px 210px;
			text-align: center;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.list-title {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			margin-top: 20px;
			font-size: 18px;
			span {
				width: 25%;
				text-align: center;
			}
		}
		.list-box {
			max-height: 370px;
			overflow-y: scroll;
			font-size: 18px;
			.branch-list-item {
				display: flex;
				align-items: center;
				span {
					width: 25%;
					text-align: center;
					margin-bottom: 20px;
				}
			}
		}
	}
</style>
