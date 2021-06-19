<template>
	<div>
		<transition name="fade">
			<PopBox :list="list" v-show='show'></PopBox>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-list" v-show="show">
				<div class="pop-title"><span>农家乐统计</span></div>
				<div class="pop-inner-title">
					<span>序号</span>
					<span>农家乐名称</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in njlList" :key='index' class="pop-inner-item" @click="goto(item.name)">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<el-carousel indicator-position='none' v-if="show" class="banner" arrow='hover' :interval='4000'>
				<el-carousel-item v-for="(item,index) in imgList" :key="index">
					<img :src="item">
				</el-carousel-item>
			</el-carousel>
		</transition>
		<transition name="fade">
			<div v-if="show2">
				<!-- <div v-for="(item,index) in xingList" :key='index' :class="{'xingActive':xingIndex==index}" class="xingTab-item" @click="changeXing(index)">
					<img :src="item.url">
					<span>{{item.title}}</span>
				</div> -->
				<div class="pop-common pop-data">
					<div class="pop-title"><span>每日数据</span></div>
					<div class="rm-bottom">
						<my-charts :id="rlss1" class="rm-item" :data="option"></my-charts>
						<my-charts :id="rlgy1" class="rm-item" :data="option4"></my-charts>
						<my-charts :id="clgy1" class="rm-item" :data="option5"></my-charts>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-list" v-show="show2">
				<div class="pop-title"><span>景点列表</span></div>
				<div class="pop-inner-title">
					<span>序号</span>
					<span>景点名称</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in jdList" :key='index' class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<!-- <div class="banner-box" v-if="show3">
				<el-carousel indicator-position='none' class="banner-center" arrow='hover' :interval='2000'
					@change="changeIndex">
					<el-carousel-item v-for="(item,index) in imgList" :key="index">
						<img :src="item.url">
					</el-carousel-item>
				</el-carousel>
				<div class="banner-label">
					{{imgList[labelIndex].des}}
				</div>
			</div> -->
			<div class="banner-box-box" v-if="show3">
				<div class="banner-box banner-box-right" >
					<img :src="imgList2[1].url" class="banner-img">
					<div class="banner-label">{{imgList2[1].des}}</div>
				</div>
				<div class="banner-box banner-box-left" >
					<img :src="imgList2[2].url" class="banner-img">
					<div class="banner-label">{{imgList2[2].des}}</div>
				</div>
				<div class="banner-box banner-box-center" >
					<img :src="imgList2[0].url" class="banner-img">
					<div class="banner-label">{{imgList2[0].des}}</div>
				</div>
			</div>

		</transition>
		<transition name="fade">

		</transition>
		<transition name="fade">

		</transition>
		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	import myCharts from '@/components/MyCharts.vue'
	export default {
		name: 'Zhly',
		props: {

		},
		components: {
			PopBox,
			BottomTab,
			myCharts
		},
		data() {
			return {
				option: {
					title: {
						text: '{a|480}\n{c|剩余车位}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 20,
									color: '#29EEF3'
								},
								c: {
									fontSize: 14,
									color: '#ffffff',
									padding: [5, 0]
								}
							}
						}
					},
					series: [{
							type: 'gauge',
							radius: '100%',
							clockwise: false,
							startAngle: '-269.9999',
							endAngle: '90',
							splitNumber: 25,
							detail: {
								offsetCenter: [0, -20],
								formatter: ' '
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: [
										[0.48, '#f70102'],
										[1, 'rgba(32,187,252,0.15)']
									],
									width: 30
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								length: 32,
								lineStyle: {
									color: '#051F54',
									width: 4
								}
							},
							axisLabel: {
								show: false
							}
						},

						{
							type: 'pie',
							name: '内层环',
							radius: [0, '83%'],
							hoverAnimation: false,
							clockWise: false,
							itemStyle: {
								normal: {
									color: '#02163F'
								}
							},
							label: {
								show: false
							},
							data: [100]
						}
					]
				},
				option4: {
					title: {
						text: '{a|113}\n{c|人流检测数据}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 20,
									color: '#29EEF3'
								},
								c: {
									fontSize: 14,
									color: '#ffffff',
									padding: [5, 0]
								}
							}
						}
					},
					series: [{
							type: 'gauge',
							radius: '100%',
							clockwise: false,
							startAngle: '-269.9999',
							endAngle: '90',
							splitNumber: 25,
							detail: {
								offsetCenter: [0, -20],
								formatter: ' '
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: [
										[113/1000, '#3cd868'],
										[1, 'rgba(32,187,252,0.15)']
									],
									width: 30
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								length: 32,
								lineStyle: {
									color: '#051F54',
									width: 4
								}
							},
							axisLabel: {
								show: false
							}
						},

						{
							type: 'pie',
							name: '内层环',
							radius: [0, '83%'],
							hoverAnimation: false,
							clockWise: false,
							itemStyle: {
								normal: {
									color: '#02163F'
								}
							},
							label: {
								show: false
							},
							data: [100]
						}
					]
				},
				option5: {
					title: {
						text: '{a|187}\n{c|车流检查数据}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 20,
									color: '#29EEF3'
								},
								c: {
									fontSize: 14,
									color: '#ffffff',
									padding: [5, 0]
								}
							}
						}
					},
					series: [{
							type: 'gauge',
							radius: '100%',
							clockwise: false,
							startAngle: '-269.9999',
							endAngle: '90',
							splitNumber: 25,
							detail: {
								offsetCenter: [0, -20],
								formatter: ' '
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: [
										[187/1000, '#f7dc46'],
										[1, 'rgba(32,187,252,0.15)']
									],
									width: 30
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								length: 32,
								lineStyle: {
									color: '#051F54',
									width: 4
								}
							},
							axisLabel: {
								show: false
							}
						},

						{
							type: 'pie',
							name: '内层环',
							radius: [0, '83%'],
							hoverAnimation: false,
							clockWise: false,
							itemStyle: {
								normal: {
									color: '#02163F'
								}
							},
							label: {
								show: false
							},
							data: [100]
						}
					]
				},
				rlss1: 'rlss1',
				rlgy1: 'rlgy1',
				clgy1: 'clgy1',
				show: false,
				show2: false,
				show3: false,
				labelIndex: 0,
				xingIndex: 0,
				list: [{
					num: 34,
					url: 'static/images/house.png',
					title: '农家乐'
				}, {
					num: 9,
					url: 'static/images/mingsu.png',
					title: '民宿'
				}, {
					num: 6,
					url: 'static/images/jingdian.png',
					title: '景点'
				}],
				tabList: [{
						sUrl: 'static/images/chiS.png',
						url: 'static/images/chi.png',
						hasUrl: true,
						title: '吃'
					}, {
						sUrl: 'static/images/zhuS.png',
						url: 'static/images/zhu.png',
						hasUrl: true,
						title: '住'
					}, {
						sUrl: 'static/images/youS.png',
						url: 'static/images/you.png',
						hasUrl: true,
						title: '玩'
					},
					// {
					// 	sUrl: 'static/images/youS.png',
					// 	url: 'static/images/you.png',
					// 	hasUrl: true,
					// 	title: '游'
					// },
					{
						sUrl: 'static/images/gouS.png',
						url: 'static/images/gou.png',
						hasUrl: true,
						title: '购'
					}
				],
				njlList: [{
					name: '龙居农家乐'
				}, {
					name: '月波农家菜馆'
				}, {
					name: '横溪人家'
				}, {
					name: '龙源农家乐'
				}, {
					name: '向石头农家乐'
				}, {
					name: '东琴农家乐'
				}, {
					name: '项珍农家乐'
				}, {
					name: '阿飞农家乐'
				}, {
					name: '雅明农家乐'
				}, {
					name: '九龙源农家乐'
				}],
				jdList: [{
					name: '香山教寺'
				}, {
					name: '九龙源'
				}, {
					name: '滑草场'
				}, {
					name: '猴岛穿越时空'
				}, {
					name: '香山源'
				}, {
					name: '九龙湖景区'
				}],
				imgList: ['static/images/jdw1.JPG','static/images/jdw2.jpg','static/images/jdw3.jpg','static/images/jdw4.jpg',
					'static/images/jdw5.JPG','static/images/jdw6.jpg','static/images/jdw7.jpg','static/images/jdw8.jpg','static/images/jdw9.JPG'],
				imgList2: [{
					url: 'static/images/banner2.png',
					des: '这是一道能让宁波人产生情感共鸣、地道的乡土小吃，采用新鲜的早稻米和灰汁、黄糖混合后制作的一个个小丸子，鸡蛋大小，扁圆状，茶色，掂在手里，水水的，颤悠悠的，像颠着件工艺品品，吃到嘴里清凉爽滑，不粘牙，而且越冷越好吃。这种感觉总会勾起你回忆味道，或许这就是乡愁，你品尝到灰汁团的那一刻，总能让你想起儿时。'
				}, {
					url: 'static/images/banner3.png',
					des: '碱水粽子不单是我们的传统食物，也是历史悠久的传统习俗，是端午文化的重要组成部分，具有传承和发扬的重大意义，横溪碱水粽的独特之处，在于其粽叶用的是本地毛竹山上较大较宽的老黄箬叶，俗称“捏壳”。在每年的5月中旬左右，老板娘总是忙忙碌碌的准备糯米、碱水、和箬壳用古法包成一个个三角形的粽子后用柴火大灶文武火交替煮上四个小时左右，然后余火焖着过夜，这样第二天揭开锅盖时，才能闻到箬壳自带的竹香，混着这糯米清香的金色碱水粽，剥开金色的箬壳。'
				}, {
					url: 'static/images/banner4.png',
					des: '神仙烧鸡是在九龙湖镇一带农村流行的烧鸡方法，食材选用在山村里散养的三黄鸡。用柴火慢炖3个小时以上，起锅时用勺子舀起汤汁浇在鸡肉上，还会滋滋作响，用筷子轻轻一戳，鸡肉与骨头便可分离，整只鸡外皮酥脆，肉质香嫩，油而不腻，嫩而不柴，冰糖的甜味让鸡肉的味道更有层次感。如今的神仙烧鸡，已经退出滋补品行列，渐渐成为横溪农家乐的特色招牌菜。但藏在的心头舌尖的味道，是每个镇海人久久不会忘怀的，这道佳肴也逐渐成为镇海人不会丢失的文化传承。'
				}],
				xingList: [{
					url: 'static/images/hslx.png',
					title: '旅游路线'
				}, {
					url: 'static/images/jtsk.png',
					title: '交通实况'
				}]
			}
		},
		methods: {
			goto(name) {
        //this.$parent.test(name)
			  // if (name === "龙居农家乐" ){
        //   this.$parent.test("龙居农家乐")
        // }else {
        //   this.$parent.test(name)
        //   if (this.$root.hsxl === false){
        //     this.$parent.test("农家乐");
        //     this.$root.hsxl = true
        //   }
          let a = {
            type:'农家乐',
            name:name
          }
          this.$parent.test(a);

			},
			getIndex(e) {
				console.log(e)
				if (e == 0) {
					this.imgList = ['static/images/jdw1.JPG','static/images/jdw2.jpg','static/images/jdw3.jpg','static/images/jdw4.jpg',
					'static/images/jdw5.JPG','static/images/jdw6.jpg','static/images/jdw7.jpg','static/images/jdw8.jpg','static/images/jdw9.JPG']
					this.njlList = [{
						name: '龙居农家乐'
					}, {
						name: '月波农家菜馆'
					}, {
						name: '横溪人家'
					}, {
						name: '龙源农家乐'
					}, {
						name: '向石头农家乐'
					}, {
						name: '东琴农家乐'
					}, {
						name: '项珍农家乐'
					}, {
						name: '阿飞农家乐'
					}, {
						name: '雅明农家乐'
					}, {
						name: '九龙源农家乐'
					}]
					this.show = true
					this.show2 = false
					this.show3 = false
				} else if (e == 1) {
					this.imgList = ['static/images/zhu1.png','static/images/zhu2.jpg','static/images/zhu3.jpg']
					this.njlList = [{
						name: '龙眼泉农家乐'
					}, {
						name: '惠英农家乐'
					}, {
						name: '栋兴生态农庄'
					}, {
						name: '香石小院'
					}, {
						name: '洪阿三农家乐'
					}, {
						name: '钱门客栈'
					}, {
						name: '远足农家客栈'
					}, {
						name: '高屋人家'
					}, {
						name: '氧气生活'
					}, {
						name: '又见山'
					}]
					this.show = true
					this.show2 = false
					this.show3 = false
				} else if (e == 2) {
					this.show = false
					this.show2 = true
					this.show3 = false

          this.$parent.test("旅游景点");

				} else if (e == 3) {
					this.show = false
					this.show2 = false
					this.show3 = true
				}
				// else if (e == 4) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// }
			},
			changeIndex(e) {
				this.labelIndex = e
			},
			changeXing(e) {
				this.xingIndex = e
			},
			random(lower, upper) {
			  	return Math.floor(Math.random() * (upper - lower)) + lower;
			}
		},
		mounted() {
			this.show = true
			let that = this
			setInterval(function(){
				let option = that.random(297,512)
				let option4 = that.random(187,523)
				let option5 = that.random(113,286)
				that.option.series[0].axisLine.lineStyle.color[0][0] = Number(option/1000)
				that.option4.series[0].axisLine.lineStyle.color[0][0] = Number(option4/1000)
				that.option5.series[0].axisLine.lineStyle.color[0][0] = Number(option5/1000)
				that.option.title.text = '{a|'+option+'}\n{c|剩余车位}'
				that.option4.title.text = '{a|'+option4+'}\n{c|人流检测数据}'
				that.option5.title.text = '{a|'+option5+'}\n{c|车流检查数据}'
			},60000)
		}
	}
</script>

<style lang="less" scoped>
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
		z-index: 1998;
	}

	.pop-list {
		position: absolute;
		top: 500px;
		left: 35px;

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span:first-child {
				text-align: center;
				width: 35%;
			}

			span:last-child {
				text-align: center;
				width: 65%;
			}
		}

		.pop-inner-box {
			max-height: 500px;
			overflow-y: auto;

			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span:first-child {
					text-align: center;
					width: 35%;
				}

				span:last-child {
					text-align: center;
					width: 65%;
				}
			}
		}
	}

	.pop-data {
		position: absolute;
		top: 200px;
		left: 35px;
		.rm-bottom {
			display: flex;
			justify-content: space-between;

			.rm-item {
				margin-top: 30px;
				width: 130px;
				height: 130px;
			}
		}
	}

	.banner {
		width: 500px;
		// height: 333px;
		position: absolute;
		top: 200px;
		right: 35px;
		border: 2px solid #fff;
		border-radius: 10px;
		box-sizing: border-box;
		.el-carousel__item {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.banner-box-left {
		left: 35px;
	}

	.banner-box-center {
		left: 900px;
	}

	.banner-box-right {
		right: 35px;
	}

	.banner-box-box {
		width: 100%;
		position: absolute;
		top: 200px;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.banner-box {
		width: 500px;
		// position: absolute;
		// top: 200px;
		// transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;

		.banner-center {
			width: 100%;
			// height: 333px;
			margin-bottom: 10px;
			border: 2px solid #fff;
			border-radius: 10px;
			box-sizing: border-box;
			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.banner-img {
			width: 500px;
			height: 333px;
			margin-bottom: 10px;
			border: 2px solid #fff;
			border-radius: 10px;
			box-sizing: border-box;
		}
		.banner-label {
			width: 100%;
			min-height: 200px;
			background-color: rgba(0, 0, 0, 0.3);
			color: #fff;
			font-size: 16px;
			line-height: 20px;
			padding: 20px 10px;
			box-sizing: border-box;
		}
	}

	.xingTab {
		position: absolute;
		top: 200px;
		left: 35px;
		display: flex;
		flex-direction: column;

		.xingTab-item {
			width: 230px;
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
			display: flex;
			align-items: center;

			img {
				width: 46px;
				height: 46px;
				margin-right: 10px;
			}
		}

		.xingActive {
			background-color: rgba(207, 21, 8, 0.55);
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
