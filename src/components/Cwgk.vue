<template>
	<!-- 村情公示 -->
	<div>
		<transition name="fade" v-if="show">

			<!-- <div class="pop-common szgl" v-show='show'>
				<img :src="cwList[imgIndex].img" class="cwImg" v-if="imgShow">
				<img src="static/images/cancel-B.png" class="cwImg-cancel" v-if="imgShow" @click="close">
				<div class="pop-title"><span>三资管理</span></div>
				<span class="pop-item-title"><img src="static/images/szcwgk.png">财务公开</span>
				<div class="cwList">
					<span class="cwList-item" v-for="(item,index) in cwList" :key="index" @click="showImg(index)">
						{{ item.name }}
					</span>
				</div>
				<span class="pop-item-title"><img src="static/images/szzzxx.png">招租信息</span>
				<span class="pop-item-title"><img src="static/images/szywgk.png">业务公开</span>
			</div> -->
			<!-- <div v-show="show" class="szgl-box">
				<div class="szgl-left">
					<div class="" style="margin-bottom: 80px;">
						<img src="" alt="">
						<div>
							<el-image
							    style="width: 240px; height: 330px"
							    :src="url"
							    :preview-src-list="imgList">
							  </el-image>
						</div>
					</div>
					<div class="">
						<img src="" alt="">
						<div>
							<el-image
							    style="width: 240px; height: 330px"
							    :src="url"
							    :preview-src-list="imgList">
							  </el-image>
						</div>
					</div>
				</div>
				<div class="szgl-right">

				</div>
			</div> -->

<!--			-->
			<div  class="cun-container" >
				<img :src="icBj" class="bg">
				<div class="wrapper">
					<div class="cun-top">
						<div class="cun-left">
							<div class="chd">
								<p>招租信息</p>
								<img :src="icChd" >
							</div>
							<div class="zhaozu-info">
								<div class="zhaozu-title">
									<!-- <span>序号</span> -->
									<span>承租方</span>
									<span>面积</span>
									<span>租期</span>
									<span>租金支付</span>
									<span>联系人</span>
								</div>
								<div style="max-height: 400px;overflow-y: auto;">
									<div v-for="(item,index) in zhaozuList" :key="index" class="zhaozu-item">
										<!-- <span>{{index+1}}</span> -->
										<span>{{item.name}}</span>
										<span>{{item.area}}</span>
										<span>{{item.time}}</span>
										<span>{{item.money}}</span>
										<span>{{item.phone}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="cun-left" style="width: 74%">
							<div class="chd">
								<p>财务公开</p>
								<img :src="icChf" >
							</div>

							<ul>
								<li v-for="item in list3" :key="item.id">
									<div class="border-out">
										<el-image class="moreImg" :src="item.img[0]" :preview-src-list="item.img"></el-image>
									</div>
									<div class="top-label">
										<img :src="icJts">
										<p>{{item.name}}</p>
									</div>

								</li>
							</ul>
						</div>
					</div>
					<div class="cun-top">
						<div class="cun-left">
							<div class="chd">
								<p>业务公开</p>
								<img :src="icChd" >
							</div>
							<div class="yewu-info">
								<div class="yewu-title">
									<!-- <span>序号</span> -->
									<span>承租方</span>
									<span>租期</span>
									<span>租金支付</span>
								</div>
								<div style="max-height: 400px;overflow-y: auto;">
									<div class="yewu-item" v-for="(item,index) in yewuList" :key="index">
										<!-- <span>{{index+1}}</span> -->
										<span>{{item.name}}</span>
										<span>{{item.time}}</span>
										<span>{{item.money}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="cun-left" style="width: 74%">
<!--							<div class="chd">-->
<!--								<p>招租信息</p>-->
<!--								<img :src="icChf" >-->
<!--							</div>-->

							<div class="reverseArrow">
								<div v-for="item in list3" :key="item.id">
									<img :src="icJtx">
									<p>{{item.name}}</p>

								</div>
							</div>

							<ul>
								<li v-for="item in list3" :key="item.id">
									<div class="border-out">
										<el-image class="moreImg" :src="item.img[0]" :preview-src-list="item.img"></el-image>
									</div>
<!--									<div class="top-label">-->
<!--										<img :src="icJts">-->
<!--										<p>{{item.name}}</p>-->
<!--									</div>-->

								</li>
							</ul>
						</div>

					</div>
				</div>
			</div>
		</transition>
		<transition name="fade" >
<!--			<div class="pop-box" v-show="show2">-->
<!--				<div class="pop-common pop-gl">-->
<!--					<div class="pop-title"><span>{{jjData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="jjData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-cm">-->
<!--					<div class="pop-title"><span>{{cmData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="cmData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-cgc">-->
<!--					<div class="pop-titleL"><span>{{cgcData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="cgcData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-cb">-->
<!--					<div class="pop-titleL"><span>{{cbData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="cbData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-td">-->
<!--					<div class="pop-title"><span>{{tdData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="tdData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-bz">-->
<!--					<div class="pop-title"><span>{{bzData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="bzData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-bx">-->
<!--					<div class="pop-title"><span>{{bxData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="bxData.content"></div>-->
<!--				</div>-->
<!--				<div class="pop-common pop-jf">-->
<!--					<div class="pop-title"><span>{{jfData.title}}</span></div>-->
<!--					<div class="pop-html" v-html="jfData.content"></div>-->
<!--				</div>-->
<!--			</div>-->

      <iframe v-if="cShow" style="margin-top: 120px ;z-index: 9999999" width="2236" height="1104" id="iframe" :src="url2" frameborder="0"></iframe>
		</transition>

		<!-- <BottomTab :list="tabList" @updata="getIndex"></BottomTab> -->
	</div>
</template>

<script>
	import BottomTab from '@/components/BottomTab.vue'
	import icBj from '../images/村务管理背景图.png'
	import icJts from '../images/上箭头.png'
	import icJtx from '../images/下箭头.png'
	import icChf from '../images/长横幅.png'
	import icChd from '../images/短横幅.png'
	import icBb from '../images/报表.png'


	export default {
		name: 'Cwgk',
		props: {},
		data() {
			return {
				icBj,
				icJts,
				icJtx,
				icChf,
				icChd,
				icBb,
			  url2:"http://visual.gzvst.top/view/1405180480017412097",
				cwList: [],
				imgIndex: 0,
				imgShow: false,
        cShow:false,
				show: false,
				show2: false,
				jjData: {},
				cgcData: {},
				cmData: {},
				cbData: {},
				tdData: {},
				bzData: {},
				bxData: {},
				jfData: {},
				// title: '',
				// data: '',
				tabList: [{
					hasUrl: false,
					title: '三资管理'
				}, {
					hasUrl: false,
					title: '清廉村居'
				}],
				imgList: ['static/images/banner2.png', 'static/images/banner3.png','static/images/banner4.png'],
				list1:[
					{
						id:1,
						img:icBb
					},
					{
						id:2,
						img:icBb
					}
				],

				list3:[],
				list4:[],
				zhaozuList: [{
					name: '长胜毛竹山',
					area: '229亩',
					time: '5年以内',
					money: '租金面议',
					phone: '86534080(黄)'
				}],
				yewuList: [{
					name: '叶大塑料厂房屋租赁-3年',
					time: '2019.1.1-2021.12.31',
					money: '每年11000.00',
				},{
					name: '沈忠财-房屋租赁-3年',
					time: '2020.1.1-2022.12.31',
					money: '每年8470.00',
				},{
					name: '王振兴-毛竹山承包-5年',
					time: '2019.1.1-2021.12.31',
					money: '每年500.00',
				},{
					name: '杨雷飞-毛竹山承包-5年',
					time: '2019.1.1-2021.12.31',
					money: '每年500.00',
				},{
					name: '铁塔通讯站址租赁-郎家坪东-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				},{
					name: '铁塔通讯站址租赁-开元公寓西-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				},{
					name: '铁塔通讯站址租赁-开元公寓北-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				},{
					name: '铁塔通讯站址租赁-开元公寓-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				}]
			}
		},
		components: {
			BottomTab
		},
		mounted() {
			this.getSzglData()
			this.show = true
		},
		methods: {
			showImg(e) {
				this.imgShow = true
				this.imgIndex = e
			},
			close() {
				this.imgShow = false
			},
			getSzglData() {
				let data = {
					current: 1,
					size: 30
				}
				this.$ajax.getCwgk(data).then(res => {
					res.records.forEach(item => {
						item.img = item.img.split(",")
					})
					this.list3=res.records.splice(0,6)
					this.list4=res.records.splice(3,6)
				})
			},
			getGlData() {
				this.$ajax.getJjfz().then(res => {
					this.jjData = res
				})
				this.$ajax.getCmdb().then(res => {
					this.cmData = res
				})
				this.$ajax.getCgcjs().then(res => {
					this.cgcData = res
				})
				this.$ajax.getZccb().then(res => {
					this.cbData = res
				})
				this.$ajax.getTdfy().then(res => {
					this.tdData = res
				})
				this.$ajax.getBzff().then(res => {
					this.bzData = res
				})
				this.$ajax.getBxqk().then(res => {
					this.bxData = res
				})
				this.$ajax.getCmjf().then(res => {
					this.jfData = res
				})
			},
      offShow(){
        this.cShow = false
      },
			getIndex(e) {
				if (e == 0) {
					this.show = true
					// this.show2 = false
          this.cShow = false
					this.getSzglData()
				} else if (e == 1) {
					this.show = false
          this.cShow = true

				}
				//  else if (e == 2) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getTdfy().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 3) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getBzff().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 4) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getBxqk().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 5) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getCmjf().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 6) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = false
				// 	// this.$ajax.getBzff().then(res => {
				// 	// 	this.title = res.title
				// 	// 	this.data = res.content
				// 	// })
				// }
			}
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

	.pop-titleL {
		width: 620px;
		height: 32px;
		background: url(../../public/static/images/lineL.png) no-repeat;
		font-size: 20px;
		padding: 0 20px;
		margin: 0 auto;
		box-sizing: border-box;

		span {
			margin-left: 20px;
		}
	}

	.pop-common {
		// width: 520px;
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

	.szgl-box {
		width: 100%;
		height: 100%;
		padding: 180px 50px 110px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		.szgl-left {
			width: 520px;
			display: flex;
			flex-direction: column;
		}
	}

	.szgl {
		position: absolute;
		top: 200px;
		left: 500px;
		max-height: none;

		.cwImg {
			width: 400px;
			position: absolute;
			right: -420px;
			top: 0;
		}

		.cwImg-cancel {
			position: absolute;
			right: -440px;
			top: -20px;
			cursor: pointer;
		}

		.pop-item-title {
			font-size: 20px;
			margin: 10px 0;

			img {
				margin-right: 10px;
				vertical-align: middle;
			}
		}

		.cwList {
			width: 90%;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;

			.cwList-item {
				cursor: pointer;
				width: 33%;
				text-decoration: underline;
				font-size: 16px;
				margin-bottom: 10px;
			}
		}
	}

	.pop-html {
		width: 100%;
		padding: 10px;
	}

	.pop-gl {
		top: 200px;
		left: 35px;
	}

	.pop-cm {
		top: 200px;
		left: 600px;
	}

	.pop-cgc {
		top: 200px;
		left: 1200px;
	}

	.pop-cb {
		top: 400px;
		left: 1200px;
	}

	.pop-other {
		top: 400px;
		left: 35px;
	}

	.pop-td {
		top: 400px;
		left: 35px;
	}

	.pop-bz {
		top: 400px;
		left: 600px;
	}

	.pop-bx {
		top: 600px;
		left: 35px;
	}

	.pop-jf {
		top: 600px;
		left: 600px;
	}

	.fade-enter-active {
		transition: opacity 1s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	.cun-container{
		width: 100%;height: 100%;position: absolute;top: 0;left: 0;
		.bg{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top:0;
			width: 100%;
			height: 100%;
			z-index: 10;
		}

		.wrapper{
			position: absolute;
			left: 0;
			right: 0;
			top:130px;
			bottom: 110px;
			width: 100%;
			height: calc(100vh - 230px);
			z-index: 11;
			.cun-top{
				height: 50%;
				display: flex;
				.cun-left{
					width: 26%;
					height: 78%;
					padding: 30px;
					/*横幅*/
					.chd{
						width: 100%;
						height: 40px;
						position: relative;
						/*margin-bottom: 20px;*/
						img{
							position: absolute;
							left: 0;
							right: 0;
							top:0;
							bottom: 0;
							width: 100%;
							height: 100%;
							z-index: 13;
						}
						p{
							position: absolute;
							left: 0;
							right: 0;
							top:0;
							bottom: 0;
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							z-index: 14;
							color: white;
							font-size: 19px;
							font-weight: 500;

						}
					}
					.zhaozu-info {
						width: 100%;
						display: flex;
						flex-direction: column;
						margin-top: 20px;
						.zhaozu-title {
							display: flex;
							align-items: center;
							span {
								font-size: 16px;
								color: #333;
								flex: 1;
								text-align: center;
							}
						}
						.zhaozu-item {
							display: flex;
							align-items: center;
							span {
								font-size: 16px;
								color: #333;
								flex: 1;
								text-align: center;
							}
						}
					}
					.yewu-info {
						width: 100%;
						display: flex;
						flex-direction: column;
						margin-top: 20px;
						.yewu-title {
							display: flex;
							align-items: center;
							margin: 5px 0;
							span {
								font-size: 16px;
								color: #333;
								flex: 2;
								text-align: center;
							}
							span:first-child {
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							span:last-child {
								flex: 1;
							}
						}
						.yewu-item {
							display: flex;
							align-items: center;
							margin: 5px 0;
							span {
								font-size: 16px;
								color: #333;
								flex: 2;
								text-align: center;
							}
							span:first-child {
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							span:last-child {
								flex: 1;
							}
						}
					}
					/*反向箭头*/
					.reverseArrow{
						width: 100%;
						height: 40px;
						position: relative;
						/*margin-bottom: 20px;*/
						display: flex;

						div{
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							/*下箭头*/
							img{
								margin: 2px;
								width: 17px;
							}
							font-weight: 500;
							font-size: 15px;
						}
					}
					ul{
						width: 100%;
						height: 100%;
						display: flex;

						li{
							width: 50%;
							height: 100%;
							padding: 10px;
							.border-out{
								border-radius: 5px;
								border:1px solid #999999;
								width: 100%;
								height: 78%;
								display: flex;
								align-items: center;
								justify-content: center;
								img,.moreImg{
									width: 95%;
									height: 99%;
								}
							}
							.top-label{
								height: 22%;
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;
								img{
									margin: 2px;
									width: 17px;
								}
								font-size: 15px;
								font-weight: 500px;
							}

						}
					}
				}

			}

		}

	}

</style>
