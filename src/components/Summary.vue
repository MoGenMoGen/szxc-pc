<template>
	<div style="width: 100%;height: 100%;">
		<div class="loading" v-if="isLoading<100">
			<el-progress :percentage="isLoading"></el-progress>
		</div>
		<transition name="fade">
			<div class="box lt" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>九龙湖介绍</span>
				</div>
				<div class="box-bottom lt-bottom">
					<video src="http://157.122.54.189:9088/uploads/5e0fdfa431f61363bba9bb3e.mp4" autoplay="autoplay"
						muted loop="loop"></video>
					<div class="introduction">{{introduction}}</div>
				</div>
			</div>
			<!-- <my-charts :id="lt" class="lt" v-show="show" :data="option"></my-charts> -->
		</transition>
		<transition name="fade">
			<div class="box lm" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>人口信息</span>
				</div>
				<div class="box-bottom lm-bottom">
					<div class="info-top">
						<span>总人口数：<span class="typeBlue">1627</span>人</span>
						<span>总户数：<span class="typeBlue">722</span>人</span>
					</div>
					<div class="info-middle">
						<div style="display: flex;flex-direction: column;">
							<span>总人口数：<span class="typeBlue">1627</span>人</span>
							<span>总户数：<span class="typeBlue">722</span>人</span>
							<span>男女比率:<span class="typeBlue"><img src="static/images/boy.png"
										style="vertical-align: middle;">60%</span>
								<span class="typePink"><img src="static/images/girl.png"
										style="vertical-align: middle;">40%</span></span>
						</div>
						<my-charts :id="rk" class="rk" :data="option2"></my-charts>
						<div style="display: flex;flex-direction: column;">
							<span style="font-size: 16px;">商户<span class="typeOrange">10%</span></span>
							<span style="font-size: 16px;">农户<span class="typeYellow">5%</span></span>
						</div>
					</div>
					<span>60岁老人数量：<span class="typeBlue">580</span>人 占比<span class="typeGreen">30%</span></span>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box lb" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>山塘信息</span>
				</div>
				<div class="box-bottom lb-bottom">
					<div class="st-top">
						<span>总面积：<span class="typeBlue">15.7</span>(km²)</span>
						<div class="st-top-right">
							<span>山塘名称</span>
							<span>积雨面积</span>
							<span>总容积</span>
						</div>
					</div>
					<div class="st-bottom">
						<my-charts :id="st" class="st" :data="option3"></my-charts>
						<div>
							<div v-for="(item,index) in stList" :key="index" class="st-bottom-info">
								<div class="st-bottom-inner">
									<p>{{index+1}}</p>
									<span>{{item.title}}</span>
									<span>{{item.area}}km²</span>
									<span>{{item.volume}}万m³</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box ml" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>水库信息</span>
				</div>
				<div class="box-bottom ml-bottom">
					<div class="sk-top">
						<span>总面积：<span class="typeBlue">15.7</span>(km²)</span>
						<div class="sk-top-right">
							<span>水库名称</span>
							<span>积雨面积</span>
							<span>总容积</span>
						</div>
					</div>
					<div class="sk-bottom">
						<img src="static/images/skLogo.png">
						<div>
							<div v-for="(item,index) in stList" :key="index" class="sk-bottom-info">
								<div class="sk-bottom-inner">
									<p>{{index+1}}</p>
									<span>{{item.title}}</span>
									<span>{{item.area}}km²</span>
									<span>{{item.volume}}万m³</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box mm" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>基层党建</span>
				</div>
				<div class="box-bottom mm-bottom">
					<div class="party-title">
						<span>党支部名称</span>
						<span>总人数：<span class="typeSkyBlue">109人</span></span>
					</div>
					<div>
						<div v-for="(item,index) in partyList" class="party-list" :key="index">
							<span class="typeBlue">{{item.title}}</span>
							<span>人数：<span class="typeSkyBlue">{{item.num}}</span>人</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box mr" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>村务公开</span>
				</div>
				<div class="box-bottom mr-bottom">
					<div v-for="(item,index) in cwList" :key="index" class="cw-list">
						<span style="color: #fff;">{{index+1}}</span>
						<span>{{item.content}}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box rl" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>空气质量</span>
				</div>
				<div class="rl-bottom">
					<div class="rl-inner" style="margin-bottom: 5px;">
						<span class="rl-inner-title">天气：</span>
						<span><img src="static/images/rain.png" style="vertical-align: middle;">下雨</span>
					</div>
					<div class="rl-inner" style="margin-bottom: 5px;">
						<span class="rl-inner-title">气温：</span>
						<span><img src="static/images/temperature.png" style="vertical-align: middle;">20.0℃</span>
					</div>
					<div class="rl-inner">
						<span class="rl-inner-title">PM2.5：</span>
						<span><img src="static/images/air.png" style="vertical-align: middle;">12</span>
					</div>
					<div class="rl-inner">
						<span class="rl-inner-title">负氧离子含量：</span>
						<span ><img src="static/images/NAI.png" style="vertical-align: middle;">2300</span>
					</div>
					<div class="rl-summary">
						<span class="typeGreenLight">优</span>
						<span class="typeGreenLight">空气质量</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box rm" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>每日数据</span>
				</div>
				<div class="rm-bottom">
					<my-charts :id="rlss" class="rm-item" :data="option"></my-charts>
					<my-charts :id="rlgy" class="rm-item" :data="option"></my-charts>
					<my-charts :id="clgy" class="rm-item" :data="option"></my-charts>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="box rb" v-show="show">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>三资公开</span>
				</div>
				<div class="box-bottom rb-bottom">
					<div class="cwgk">
						<div class="fontBig">财务公开<img src="static/images/cwgk.png" class="imgStyle"></div>
						<div style="display: flex;justify-content: space-between;align-items: center;">
							<div class="flex-end" style="color: #FFE347;">
								<span>总收入</span>
								<span class="fontSm"><span class="fontBig">62989</span>万元</span>
							</div>
							<div class="flex-end typeBlue">
								<span>总支出</span>
								<span class="fontSm"><span class="fontBig">47898</span>万元</span>
							</div>
							<div class="flex-end" style="color: #3DDD6A;">
								<span>剩余可支配</span>
								<span class="fontSm"><span class="fontBig">15000</span>万元</span>
							</div>
						</div>
					</div>
					<div class="ywgk">
						<div class="fontBig">业务公开<img src="static/images/ywgk.png" class="imgStyle"></div>
						<div style="height: 10px;"></div>
					</div>
					<div class="zzxx">
						<div class="fontBig">招租信息<img src="static/images/zzxx.png" class="imgStyle"></div>
						<div class="zzxx-info">
							<div v-for="(item,index) in zzList" :key="index">
								<span>{{item.time}}</span>
								<span class="typeSkyBlue">{{item.add}}</span>
								<span>{{item.info}}</span>
								<span>￥{{item.money}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<model-obj src="static/models/jlh.obj" mtl="static/models/jlh.mtl"
               :position="position" :scale="scale"
			          @on-load="onLoad" :lights="lights"
               :cameraPosition="cameraPosition" :cameraRotation="cameraRotation"
               @on-click="onClick" @on-progress="onProgress" @on-error="onError">
		</model-obj>
	</div>
</template>

<script>
	import {
		ModelObj
	} from 'vue-3d-model';
	import myCharts from '@/components/MyCharts.vue'
	export default {
		name: 'Summary',
		props: {

		},
		data() {
			return {
				isLoading: 0,
				rlss: 'rlss',
				rlgy: 'rlgy',
				clgy: 'clgy',
				st: "st",
				rk: "rk",
				option: null,
				option2: null,
				option3: null,
				show: false,
				introduction: '九龙湖村位于宁波市镇海区西北部是一个有着光荣历史的革命老区，由原来的横溪、长胜、十字路、郞家坪四个自然村合并...',
				partyList: [{
					title: '长胜田央沈、长桥头网格支部',
					num: 21
				},{
					title: '长胜田央沈、长桥头网格支部',
					num: 21
				},{
					title: '长胜田央沈、长桥头网格支部',
					num: 21
				},{
					title: '长胜田央沈、长桥头网格支部',
					num: 21
				}],
				cwList: [{
					content: '宣传健康常识和卫生知识'
				},{
					content: '宣传健康常识和卫生知识'
				},{
					content: '宣传健康常识和卫生知识'
				},{
					content: '宣传健康常识和卫生知识'
				},{
					content: '宣传健康常识和卫生知识'
				}],
				zzList: [{
					time: '2021-04-09',
					add: '九龙湖桥头街',
					info: '两室一厅一卫',
					money: 1500
				},{
					time: '2021-04-09',
					add: '九龙湖桥头街',
					info: '两室一厅一卫',
					money: 1500
				}],
				stList: [{
					title: '石英坎山塘',
					area: '0.86',
					volume: '2.21'
				}, {
					title: '石英坎山塘',
					area: '0.86',
					volume: '2.21'
				}, {
					title: '石英坎山塘',
					area: '0.86',
					volume: '2.21'
				}, {
					title: '石英坎山塘',
					area: '0.86',
					volume: '2.21'
				}, {
					title: '石英坎山塘',
					area: '0.86',
					volume: '2.21'
				}],
				cameraPosition: {
					x: 100,
					y: 3800,
					z: 5600
				},
        cameraRotation:{
          x: 0,
          y: 0,
          z: 0
        },
				position: {
					x: 1,
					y: 1,
					z: -150
				},
				scale: {
					x: 1,
					y: 1,
					z: 1
				},
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
				lights: [{
					type: "HemisphereLight",
					position: {
						x: 0,
						y: 1,
						z: 0
					},
					skyColor: 0xaaaaff,
					groundColor: 0x806060,
					intensity: 2.8
				}, {
					type: 'DirectionalLight',
					position: {
						x: 1,
						y: 1,
						z: 1
					},
					color: 0xffffff,
					intensity: 0.8,
				}]
			}
		},
		mounted() {

		},
		components: {
			ModelObj,
			myCharts
		},
		methods: {
			onLoad() {

				this.show = true
				this.option = {
					series: [{
						type: 'gauge',
						startAngle: 180,
						endAngle: -180,
						min: 0,
						max: 100000,
						itemStyle: {
							color: '#FFAB91'
						},
						progress: {
							show: true,
							width: 10
						},
						pointer: {
							show: false,
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						anchor: {
							show: false
						},
						title: {
							show: false
						},
						detail: {
							valueAnimation: true,
							width: '50%',
							lineHeight: 15,
							height: 15,
							borderRadius: 8,
							offsetCenter: [0, 0],
							fontSize: 15,
							fontWeight: 'bolder',
							formatter: '{value}\n人流检测数\n据动态干预',
							color: 'auto'
						},

						data: [{
							value: 45000
						}]
					}]
				}
				this.option2 = {
					tooltip: {
						trigger: 'item'
					},
					series: [{
						name: '人口信息',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '22',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1627,
								name: '总人口'
							},
							{
								value: 1600,
								name: '当地人口'
							},
							{
								value: 27,
								name: '外来人口'
							},
							{
								value: 580,
								name: '60岁老人'
							},
							{
								value: 722,
								name: '总户数'
							}
						]
					}]
				}
				this.option3 = {
					series: [{
						name: '面积模式',
						type: 'pie',
						radius: [10, 50],
						center: ['50%', '50%'],
						roseType: 'area',
						labelLine: false,
						data: [{
								value: 40,
								name: 'rose 1'
							},
							{
								value: 38,
								name: 'rose 2'
							},
							{
								value: 32,
								name: 'rose 3'
							},
							{
								value: 30,
								name: 'rose 4'
							},
							{
								value: 28,
								name: 'rose 5'
							},
							{
								value: 26,
								name: 'rose 6'
							},
							{
								value: 22,
								name: 'rose 7'
							},
							{
								value: 18,
								name: 'rose 8'
							}
						]
					}]
				}

			},
			onClick(e) {

			},
			onProgress(e) {
				let loaded = e.loaded / e.total * 100+""
				this.isLoading = Number(loaded.substring(0,4))
				// console.log(e.loaded / e.total * 100 + "%")
			},
			onError(e) {
				console.log(e)
			},

		}
	}
</script>

<style scoped lang="less">
	.loading {
		width: 600px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.typeBlue {
		color: #3FECFF;
	}

	.typePink {
		color: #E63A6E;
	}

	.typeGreen {
		color: #23C617;
	}

	.typeOrange {
		color: #FFA11A;
	}

	.typeYellow {
		color: #FFEA00;
	}
	.typeSkyBlue {
		color: #1AC9FF;
	}
	.typeGreenLight {
		color: #4ABA5F;
	}

	.box {
		display: flex;
		flex-direction: column;
		width: 420px;
		border-radius: 10px;
		background: linear-gradient(56deg, rgba(40, 63, 138, .3) 0%, rgba(37, 81, 183, .3) 100%);
		padding: 10px;
		box-sizing: border-box;
		z-index: 10000;
		overflow: hidden;

		.box-top {
			margin-bottom: 15px;
			font-size: 24px;
			display: flex;
			align-items: center;
			color: #FEFEFE;

			img {
				width: 24px;
				height: 24px;
				margin-right: 10px;
			}
		}

		.box-bottom {
			width: 100%;
			padding: 9px;
			box-sizing: border-box;
			background-color: rgba(0, 142, 244, .1);
		}
	}

	.lt {
		height: 240px;
		position: absolute;
		top: 160px;
		left: 35px;

		.lt-bottom {
			display: flex;
			flex-direction: row;
			color: #fff;
			font-size: 18px;

			video {
				width: 230px;
				height: 150px;
			}

			.introduction {
				width: 150px;
				height: 150px;
				line-height: 30px;
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

	.lm {
		height: 273px;
		position: absolute;
		top: 420px;
		left: 35px;
		z-index: 10000;

		.lm-bottom {
			display: flex;
			flex-direction: column;
			font-size: 20px;
			color: #fff;

			.info-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.info-middle {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.rk {
					width: 120px;
					height: 120px;
				}
			}
		}
	}

	.lb {
		height: 279px;
		position: absolute;
		bottom: 40px;
		left: 35px;
		z-index: 10000;

		.lb-bottom {
			display: flex;
			flex-direction: column;
			font-size: 16px;
			color: #fff;

			.st-top {
				display: flex;
				justify-content: space-between;

				.st-top-right {
					width: 233px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					span {
						width: 33%;
						text-align: center;
					}
				}
			}

			.st-bottom {
				display: flex;

				.st {
					width: 150px;
					height: 150px;
				}

				.st-bottom-info {
					display: flex;
					flex-direction: column;
					margin-bottom: 10px;
					width: 260px;

					.st-bottom-inner {
						display: flex;
						align-items: center;

						p {
							margin-right: 14px;
						}

						span {
							width: 33%;
							text-align: center;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}

	.ml {
		height: 279px;
		position: absolute;
		bottom: 40px;
		left: 480px;
		z-index: 10000;
		.ml-bottom {
			display: flex;
			flex-direction: column;
			font-size: 16px;
			color: #fff;

			.sk-top {
				display: flex;
				justify-content: space-between;

				.sk-top-right {
					width: 233px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					span {
						width: 33%;
						text-align: center;
					}
				}
			}

			.sk-bottom {
				display: flex;
				align-items: center;
				.img {
					width: 120px;
					height: 120px;
				}

				.sk-bottom-info {
					display: flex;
					flex-direction: column;
					margin-bottom: 10px;
					width: 260px;

					.sk-bottom-inner {
						display: flex;
						align-items: center;

						p {
							margin-right: 14px;
						}

						span {
							width: 33%;
							text-align: center;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}

	.mm {
		height: 279px;
		position: absolute;
		bottom: 40px;
		left: 915px;
		z-index: 10000;
		.mm-bottom {
			display: flex;
			flex-direction: column;
			font-size: 20px;
			color: #fff;
			.party-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10px;
				span:last-child {
					font-size: 16px;
				}
			}
			.party-list {
				width: 100%;
				height: 32px;
				background: url(../../public/static/images/jcbg.png);
				background-size: 100% 100%;
				margin-bottom: 6px;
				padding: 0 15px;
				box-sizing: border-box;
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				span:last-child {
					font-size: 12px;
				}
			}
		}
	}

	.mr {
		height: 279px;
		position: absolute;
		bottom: 40px;
		right: 470px;
		z-index: 10000;
		.mr-bottom {
			display: flex;
			flex-direction: column;
			.cw-list {
				width: 100%;
				height: 36px;
				display: flex;
				align-items: center;
				background: url(../../public/static/images/cwbg.png);
				background-size: 100% 100%;
				color: #BCF0FE;
				font-size: 16px;
				span:first-child {
					margin-left: 34px;
					margin-right: 44px;
				}
			}
		}
	}

	.rl {
		height: 260px;
		position: absolute;
		top: 160px;
		right: 35px;
		z-index: 10000;
		.rl-bottom {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			position: relative;
			.rl-inner {
				width: 48%;
				background:rgba(0, 142, 244, 0.1);
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 13px 18px;
				box-sizing: border-box;
				border-radius: 5px;
				font-size: 20px;
				color: #fff;
				.rl-inner-title {
					font-size: 18px;
					align-self: flex-start;
				}
			}
			.rl-summary {
				width: 84px;
				height: 84px;
				background: url(../../public/static/images/kqzlBg.png);
				background-size: 100% 100%;
				z-index: 10;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				font-size: 22px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				span:last-child {
					font-size: 12px;
					margin-bottom: 10px;
				}
			}
		}
	}

	.rm {
		height: 213px;
		position: absolute;
		top: 440px;
		right: 35px;
		z-index: 10000;
		.rm-bottom {
			display: flex;
			justify-content: space-between;
			.rm-item {
				width: 130px;
				height: 130px;
			}
		}
	}

	.rb {
		height: 319px;
		position: absolute;
		bottom: 40px;
		right: 35px;
		z-index: 10000;
		.rb-bottom {
			display: flex;
			flex-direction: column;
			.fontBig {
				font-size: 20px;
			}
			.fontSm {
				font-size: 14px;
			}
			.imgStyle {
				vertical-align: middle;
				margin-left: 6px;
			}
			.cwgk {
				color: #fff;
				font-size: 16px;
				.flex-end {
					display: flex;
					flex-direction: column;
					text-align: right;
				}
			}
			.ywgk {
				color: #fff;
			}
			.zzxx {
				color: #fff;
				.zzxx-info {
					font-size: 14px;
					div {
						width: 100%;
						height: 32px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 15px;
						box-sizing: border-box;
						background: url(../../public/static/images/jcbg.png);
						background-size: 100% 100%;
						margin-bottom: 5px;
						span:nth-child(2),span:nth-child(3) {
							width: 30%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							text-align: center;
						}
					}
				}
			}
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 1s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	model-obj {
		width: 100%;
		height: 100%;
	}
</style>
