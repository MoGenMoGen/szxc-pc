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
					<div v-for="(item,index) in njlList" :key='index' class="pop-inner-item" @click="goto(item)">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="show" class="banner">
				<img :src="topImg" class="banner-top-img" v-if="topImg">
				<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
					<el-carousel-item v-for="(item,index) in imgList" :key="index">
						<img :src="item.url">
					</el-carousel-item>
				</el-carousel>
				<div class="banner-name">{{imgList[nameIndex].name}}</div>
				<div class="pop-common banner-tip" v-if="show4">
					<div class="pop-title"><span>透明厨房</span></div>
					<span class="banner-tip-word">正在建设中！</span>
				</div>
			</div>
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
					<div v-for="(item,index) in jdList" :key='index' class="pop-inner-item" @click="goto(item)">
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
				<div class="banner-box banner-box-right">
					<!-- <img :src="imgList2[1].url" class="banner-img">
					<div class="banner-label">{{imgList2[1].des}}</div> -->
					<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
						<el-carousel-item v-for="(item,index) in gouImgList1" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
					<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
						<el-carousel-item v-for="(item,index) in gouImgList2" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="banner-box banner-box-left">
					<!-- <img :src="imgList2[2].url" class="banner-img">
					<div class="banner-label">{{imgList2[2].des}}</div> -->
					<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
						<el-carousel-item v-for="(item,index) in gouImgList3" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
					<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
						<el-carousel-item v-for="(item,index) in gouImgList4" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="banner-box banner-box-center">
					<!-- <img :src="imgList2[0].url" class="banner-img">
					<div class="banner-label">{{imgList2[0].des}}</div> -->
					<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
						<el-carousel-item v-for="(item,index) in gouImgList5" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
					<el-carousel indicator-position='none' arrow='hover' :interval='4000' @change="changeIndex">
						<el-carousel-item v-for="(item,index) in gouImgList6" :key="index">
							<img :src="item">
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>

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
						text: '{a|480}\n{c|剩余车位数}',
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
						text: '{a|113}\n{c|人流量}',
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
										[113 / 1000, '#3cd868'],
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
						text: '{a|187}\n{c|车流量}',
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
										[187 / 1000, '#f7dc46'],
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
				show4: false,
				nameIndex: 0,
				labelIndex: 0,
				xingIndex: 0,
				topImg: '',
				list: [{
					num: 37,
					url: 'static/images/house.png',
					title: '农家乐'
				}, {
					num: 10,
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
					{
						sUrl: 'static/images/gouS.png',
						url: 'static/images/gou.png',
						hasUrl: true,
						title: '购'
					}
				],
				eatList: [],
				hotelList: [],
				njlList: [{
					name: '龙居农家乐',
					X: '121.50782',
					Y: '30.051656',
					url: 'static/images/jdw1.png'
				}, {
					name: '月波农家菜馆',
					X: '121.50818',
					Y: '30.051681',
				}, {
					name: '横溪人家',
					X: '121.508527',
					Y: '30.052313',
				}, {
					name: '龙源农家乐',
					X: '121.508072',
					Y: '30.52354',
				}, {
					name: '向石头农家乐',
					X: '121.509869',
					Y: '30.052034',
				}, {
					name: '东琴农家乐',
					X: '121.512405',
					Y: '30.052881',
				}, {
					name: '项珍农家乐',
					X: '121.506141',
					Y: '30.052687',
				}, {
					name: '阿飞农家乐',
					X: '121.506145',
					Y: '30.052687',
				}, {
					name: '雅明农家乐',
					X: '121.502719',
					Y: '30.051409',
				}, {
					name: '九龙源农家乐',
					X: '121.502887',
					Y: '30.051724',
				}, {
					name: '食为天农家乐'
				}, {
					name: '竹之林农家乐'
				}, {
					name: '山里山农家乐'
				}, {
					name: '赞来农家乐'
				}, {
					name: '闻溪阁烧烤园'
				}, {
					name: '青青农家菜馆'
				}, {
					name: '食泉农家菜馆'
				}, {
					name: '竹林人家农家菜馆'
				}, {
					name: '绿色人家农家菜馆'
				}, {
					name: '沿山苑农家菜馆'
				}, {
					name: '溢品农家菜馆'
				}, {
					name: '青山绿水农家菜馆'
				}, {
					name: '八号农家乐'
				}, {
					name: '钱家小院'
				}, {
					name: '老宅私房农家菜'
				}, {
					name: '竹雅农家乐'
				}, {
					name: '长胜人家农家菜馆'
				}, {
					name: '沈家小园'
				}, {
					name: '小荣农家乐'
				}, {
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
					name: '氧气生活'
				}, {
					name: '又见山'
				}],
				jdList: [{
					name: '香山教寺',
					X: '121.518298',
					Y: '30.055497',
				}, {
					name: '九龙源',
					X: '121.51148',
					Y: '30.054086',
				}, {
					name: '滑草场',
					X: '121.539236',
					Y: '30.04344',
				}, {
					name: '猴岛穿越时空',
					X: '121.529372',
					Y: '30.041006',
				}, {
					name: '香山源',
					X: '121.518298',
					Y: '30.055497',
				}, {
					name: '九龙湖景区',
					X: '121.527141',
					Y: '30.045825',
				}],
				imgList: [{
					url: 'static/images/jdw1.png',
					name: '暗香疏影'
				}, {
					url: 'static/images/jdw2.png',
					name: '九龙第一鲜'
				}, {
					url: 'static/images/jdw3.png',
					name: '九龙云雾'
				}, {
					url: 'static/images/jdw4.png',
					name: '浪鲫江湖'
				}, {
					url: 'static/images/jdw5.png',
					name: '蟠青丛翠'
				}, {
					url: 'static/images/jdw6.png',
					name: '秋月如镜'
				}, {
					url: 'static/images/jdw7.png',
					name: '神仙烧鸡'
				}, {
					url: 'static/images/jdw8.png',
					name: '一丛金黄'
				}, {
					url: 'static/images/jdw9.png',
					name: '珠联璧合'
				}],
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
				gouImgList1: ['static/images/banner1.png', 'static/images/banner2.png', 'static/images/banner3.png'],
				gouImgList2: ['static/images/banner4.png', 'static/images/banner5.png', 'static/images/banner6.png'],
				gouImgList3: ['static/images/banner7.png', 'static/images/banner8.png', 'static/images/banner9.png'],
				gouImgList4: ['static/images/banner10.png', 'static/images/banner11.png', 'static/images/banner12.png'],
				gouImgList5: ['static/images/banner13.png', 'static/images/banner14.png'],
				gouImgList6: ['static/images/banner15.png', 'static/images/banner16.png'],
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
			goto(item) {
				let a = {
					X: item.lng,
					Y: item.lat,
				}
				this.topImg = item.img
				this.$parent.test(a);
			},
			//打开关闭图层
			onOff(type, name) {
				let a = {
					type: type,
					name: name
				}
				this.$parent.test(a);
			},
			getIndex(e) {
				if (e == 0) {
					this.onOff("打开图层", "农家乐")
					this.onOff("关闭图层", "旅游景点")
					this.onOff("关闭图层", "旅游路线")
					this.onOff("关闭图层", "民宿")
					this.imgList = [{
						url: 'static/images/jdw1.png',
						name: '暗香疏影'
					}, {
						url: 'static/images/jdw2.png',
						name: '九龙第一鲜'
					}, {
						url: 'static/images/jdw3.png',
						name: '九龙云雾'
					}, {
						url: 'static/images/jdw4.png',
						name: '浪鲫江湖'
					}, {
						url: 'static/images/jdw5.png',
						name: '蟠青丛翠'
					}, {
						url: 'static/images/jdw6.png',
						name: '秋月如镜'
					}, {
						url: 'static/images/jdw7.png',
						name: '神仙烧鸡'
					}, {
						url: 'static/images/jdw8.png',
						name: '一丛金黄'
					}, {
						url: 'static/images/jdw9.png',
						name: '珠联璧合'
					}]
					this.topImg = ""
					this.njlList = this.eatList
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = true
				} else if (e == 1) {
					//住
					this.onOff("打开图层", "民宿")
					this.onOff("关闭图层", "旅游景点")
					this.onOff("关闭图层", "旅游路线")
					this.onOff("关闭图层", "农家乐")
					this.topImg = ""
					this.imgList = [{
						url: 'static/images/zhu5.png',
						name: '又见山'
					}, {
						url: 'static/images/zhu3.png',
						name: '龙眼泉'
					}, {
						url: 'static/images/zhu4.png',
						name: '闻溪阁'
					}, {
						url: 'static/images/zhu6.png',
						name: '竹之林'
					}, {
						url: 'static/images/zhu7.png',
						name: '远足农家客栈'
					}, {
						url: 'static/images/zhu8.png',
						name: '香石小院'
					}, {
						url: 'static/images/zhu9.png',
						name: '栋兴生态农庄'
					}]
					this.njlList = this.hotelList
					this.show = true
					this.show2 = false
					this.show3 = false
					this.show4 = false
				} else if (e == 2) {
					//玩
					this.onOff("打开图层", "旅游景点")
					this.onOff("打开图层", "旅游路线")
					this.onOff("关闭图层", "农家乐")
					this.onOff("关闭图层", "民宿")
					this.show = false
					this.show2 = true
					this.show3 = false
					this.show4 = false
				} else if (e == 3) {
					//购
					this.onOff("关闭图层", "旅游景点")
					this.onOff("关闭图层", "旅游路线")
					this.onOff("关闭图层", "农家乐")
					this.onOff("关闭图层", "民宿")
					this.show = false
					this.show2 = false
					this.show3 = true
					this.show4 = false
				}
				// else if (e == 4) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// }
			},
			changeIndex(e) {
				this.nameIndex = e
			},
			changeXing(e) {
				this.xingIndex = e
			},
			random(lower, upper) {
				return Math.floor(Math.random() * (upper - lower)) + lower;
			}
		},
		mounted() {
			this.$ajax.getEatList({size:50,current:1}).then(res => {
				res.records.forEach((item,index) => {
					if(item.type=="service_eat"||item.type=="service_all"){
						this.eatList.push(item)
					}
					if(item.type=="service_hotel"||item.type=="service_all") {
						this.hotelList.push(item)
					}
				})
				this.njlList = this.eatList
			})
			this.show = true
			this.show4 = true
			let that = this
			setInterval(function() {
				let option = that.random(297, 512)
				let option4 = that.random(187, 523)
				let option5 = that.random(113, 286)
				that.option.series[0].axisLine.lineStyle.color[0][0] = Number(option / 1000)
				that.option4.series[0].axisLine.lineStyle.color[0][0] = Number(option4 / 1000)
				that.option5.series[0].axisLine.lineStyle.color[0][0] = Number(option5 / 1000)
				that.option.title.text = '{a|' + option + '}\n{c|剩余车位数}'
				that.option4.title.text = '{a|' + option4 + '}\n{c|人流量}'
				that.option5.title.text = '{a|' + option5 + '}\n{c|车流量}'
			}, 60000)
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
		top: 150px;
		right: 35px;

		border-radius: 10px;
		box-sizing: border-box;
		
		.banner-top-img {
			width: 100%;
			height: 304px;
			margin-bottom: 20px;
			border: 2px solid #fff;
			box-sizing: border-box;
		}
		
		/deep/ .el-carousel__container {
			border: 2px solid #fff;

			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.banner-name {
			width: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			margin-top: 10px;
			font-size: 18px;
			color: #fff;
			padding: 10px 0;
			box-sizing: border-box;
			border-radius: 20px;
			text-align: center;
		}

		.banner-tip {
			width: 500px;
			padding: 10px 0;
			margin-top: 20px;

			.banner-tip-word {
				width: 100%;
				padding: 100px 0;
				font-size: 28px;
				text-align: center;
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

		/deep/ .el-carousel__container {
			border: 2px solid #fff;
			margin-bottom: 100px;

			.el-carousel__item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
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
