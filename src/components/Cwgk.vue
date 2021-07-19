<template>
	<!-- 村情公示 -->
	<div>
		<transition name="fade" v-if="show">
			<div class="cun-container">
				<img :src="icBj" class="bg">
				<div class="wrapper">
					<div class="cun-top">
						<div class="cun-left">
							<div class="chd">
								<p>招租信息</p>
								<img :src="icChd">
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
								<img :src="icChf">
							</div>

							<ul>
								<li v-for="item in list3" :key="item.id">
									<div class="border-out">
										<el-image class="moreImg" :src="item.img[0]" :preview-src-list="item.img">
										</el-image>
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
								<img :src="icChd">
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
										<el-image class="moreImg" :src="item.img[0]" :preview-src-list="item.img">
										</el-image>
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
		<transition name="fade">
			<iframe v-if="cShow" style="margin-top: 120px ;z-index: 9999999" width="2236" height="1104" id="iframe"
				:src="url2" frameborder="0"></iframe>
		</transition>
		<transition name="fade">
			<div class="supervise-box" v-show="superviseShow">
				<div class="pop-common cjh">
					<div class="pop-inner-title">
						<span style="width: 15%;">姓名</span>
						<span style="width: 15%;">出生年月</span>
						<span>工作单位(或住址)</span>
						<span>联系电话</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in cunjianhuiList" :key='index' class="pop-inner-item" @click="showCjhImg(item.img)">
							<span style="width: 15%;">{{ item.name }}</span>
							<span style="width: 15%;">{{ item.birthday }}</span>
							<span>{{ item.add }}</span>
							<span>{{ item.phone }}</span>
						</div>
					</div>
				</div>
				<div class="pop-common cjw">
					<div class="pop-inner-title">
						<span style="width: 15%;">姓名</span>
						<span style="width: 15%;">出生年月</span>
						<span>工作单位(或住址)</span>
						<span>联系电话</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in cunjiweiList" :key='index' class="pop-inner-item">
							<span style="width: 15%;">{{ item.name }}</span>
							<span style="width: 15%;">{{ item.birthday }}</span>
							<span>{{ item.add }}</span>
							<span>{{ item.phone }}</span>
						</div>
					</div>
				</div>
				<div class="pop-common sjh">
					<div class="pop-inner-title">
						<span style="width: 15%;">姓名</span>
						<span style="width: 15%;">出生年月</span>
						<span>工作单位(或住址)</span>
						<span>联系电话</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in shejianhuiList" :key='index' class="pop-inner-item">
							<span style="width: 15%;">{{ item.name }}</span>
							<span style="width: 15%;">{{ item.birthday }}</span>
							<span>{{ item.add }}</span>
							<span>{{ item.phone }}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="cjhImg" v-show="imgShow">
				<img :src="imgUrl">
				<img src="../../public/static/images/cancel.png" class="cancelLogo" @click="imgShow = false" v-show="imgShow">
			</div>
		</transition>
		<transition name="fade">
			<div v-show="cmssShow" class="pop-common cmss">
				<div class="pop-inner-title">
					<span style="width: 15%;">序号</span>
					<span style="width: 15%;">时间</span>
					<span>主题</span>
					<span>满意度调查</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in cmssList" :key='index' class="pop-inner-item" @click="showCjhImg(item.img)">
						<span style="width: 15%;">{{ index+1 }}</span>
						<span style="width: 15%;">{{ item.time }}</span>
						<span>{{ item.title }}</span>
						<span>{{ item.satisfaction }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="mytjShow" class="pop-common mytj">
				<div class="pop-inner-title">
					<span style="width: 10%;">序号</span>
					<span>项目名称</span>
					<span>可行性满意度调查</span>
					<span>事后满意度调查</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in mytjList" :key='index' class="pop-inner-item" @click="showCjhImg(item.img)">
						<span style="width: 10%;">{{ index+1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.feasibility }}</span>
						<span>{{ item.after }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="lzxj" v-show="lzxjShow">
				<div class="tab-bg">
					<div v-for="(item,index) in lzxjList" :key="index" @click="chooseLzxj(index)">
						<span :class="lzxjIndex == index ? 'lzxjActive': ''">· {{item.name}}</span>
					</div>
				</div>
			</div>
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
				url2: "http://visual.gzvst.top/view/1405180480017412097",
				cwList: [],
				imgShow: false,
				imgUrl: '',
				cShow: false,
				show: false,
				superviseShow:false, //监督机构
				cmssShow: false, //村民说事
				mytjShow: false, //民意体检
				lzxjShow: false, //廉政宣教
				lzxjIndex: -1,
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
				list1: [{
						id: 1,
						img: icBb
					},
					{
						id: 2,
						img: icBb
					}
				],
				list3: [],
				list4: [],
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
				}, {
					name: '沈忠财-房屋租赁-3年',
					time: '2020.1.1-2022.12.31',
					money: '每年8470.00',
				}, {
					name: '王振兴-毛竹山承包-5年',
					time: '2019.1.1-2021.12.31',
					money: '每年500.00',
				}, {
					name: '杨雷飞-毛竹山承包-5年',
					time: '2019.1.1-2021.12.31',
					money: '每年500.00',
				}, {
					name: '铁塔通讯站址租赁-郎家坪东-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				}, {
					name: '铁塔通讯站址租赁-开元公寓西-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				}, {
					name: '铁塔通讯站址租赁-开元公寓北-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				}, {
					name: '铁塔通讯站址租赁-开元公寓-5年',
					time: '2018.3.1-2023.2.28',
					money: '每年13000.00',
				}],
				cunjianhuiList: [{
					name: '朱丽红',
					birthday: '1982.04',
					add: '九龙湖村',
					phone: '13586887466/670664',
					img: 'static/images/cjh-zhl.png'
				},{
					name: '王海君',
					birthday: '1956.11',
					add: '九龙湖村横溪',
					phone: '13857479443/668443',
					img: 'static/images/cancel.png'
				},{
					name: '程岳定',
					birthday: '1956.10',
					add: '九龙家苑一期',
					phone: '640257',
					img: 'static/images/cjh-cyd.png'
				},{
					name: '姚百寅',
					birthday: '1962.10',
					add: '骆兴家园',
					phone: '663479',
					img: 'static/images/cjh-yby.png'
				},{
					name: '张振高',
					birthday: '1966.11',
					add: '九龙湖村长胜',
					phone: '13857821828/679828',
					img: 'static/images/cjh-zzg.png'
				}],
				cunjiweiList: [{
					name: '朱丽红',
					birthday: '1982.04',
					add: '九龙湖村',
					phone: '13586887466/670664'
				},{
					name: '程岳定',
					birthday: '1956.10',
					add: '九龙家苑一期',
					phone: '640257'
				},{
					name: '张振高',
					birthday: '1966.11',
					add: '九龙湖村长胜',
					phone: '13857821828/679828'
				}],
				shejianhuiList: [{
					name: '王佳丹',
					birthday: '1986.11',
					add: '九龙湖村',
					phone: '13586887466/670664'
				},{
					name: '王海君',
					birthday: '1956.11',
					add: '九龙湖村横溪',
					phone: '13857479443/668443'
				},{
					name: '程岳定',
					birthday: '1956.10',
					add: '九龙家苑一期',
					phone: '640257'
				},{
					name: '姚百寅',
					birthday: '1962.10',
					add: '骆兴家园',
					phone: '663479'
				},{
					name: '张振高',
					birthday: '1966.11',
					add: '九龙湖村长胜',
					phone: '13857821828/679828'
				}],
				cmssList: [{
					time: '2021.5.19',
					title: '垃圾分类奖罚措施',
					detail: '2021年5月19日横溪村民王国兆反映：农家乐经常出现垃圾分类不到位的情况，导致归集点垃圾检查经常出现不合格情况，希望村里对农家乐有罚款制度，未分类的要有罚款措施。九龙湖村两委召开专题会：分析垃圾未分类到位的原因，下步将加强管理，制定奖罚措施，对农家乐进行专项培训。',
					satisfaction: '98%'
				},{
					time: '2021.5.26',
					title: '施工围栏设置调整',
					detail: '2021年5月26日王海君反映：横溪高端民宿项目铁皮围栏太过超出，影响交通，出行不安全。经村班子商量后，与施工方对接，围栏已挪进。',
					satisfaction: '98%'
				},{
					time: '2021.6.2',
					title: '路灯遮挡修整',
					detail: '2021年6月2日村民胡彩娣反映：香山路旁树枝太过茂密，挡住了路灯的灯光，影响出行的安全。村干部进行实地勘察，已安排人员对树枝进行修剪。',
					satisfaction: '97%'
				},{
					time: '2021.6.16',
					title: '垃圾包巡查',
					detail: '2021年6月16日村民王品岳反映：因垃圾点位靠马路边，非投放时间段游客经过时经常出现垃圾包。各网格加强垃圾点位巡查，出现垃圾包及时收集处理。',
					satisfaction: '98%'
				}],
				mytjList: [{
					name: '横溪艺术振兴乡村',
					feasibility: '95',
					after: '99',
					detail: '为深入实施乡村振兴战略，加快推进九龙湖镇艺术振兴乡村发展，九龙湖村在横溪自然村推进艺术振兴乡村试点项目。2020年8月9日邀请宁波大学冯老师及其团队入驻九龙湖村横溪自然村对横溪几个公共节点及农家乐、民宿提升进行设计绘制并参与过程打造。该项目包括龙眼泉点位、墙头停车场点位、公交站旁“绿水青山金山银山”点位和文化礼堂旁说事长廊点位。通过开展艺术振兴乡村行动，村民主动参与的意识不断增强，横溪村容村貌已有明显改观，阶段性成效明显，受到了群众的一致好评。'
				},{
					name: '红色旅游',
					feasibility: '96',
					after: '98',
					detail: '为庆祝建党100周年，九龙湖村结合红色元素在长胜自然村打造红色长胜主题村。该项目包括红色历史陈列馆、红色九龙湖（牌坊）、创意草野、荷花池、红廉长廊、知青馆、时光邮局等十几个点位。红色线路打造完成后，村容村貌明显改善，红色主题突出，吸引了镇海区各机关单位，各企业单位党支部先后到九龙湖村参观，共同学习革命先辈的光荣事迹，重温入党誓词等，反响好，得到了大家一致好评。'
				}],
				lzxjList: [{
					name: '红廉长廊'
				},{
					name: '清廉村居十问'
				},{
					name: '小微权利漫画'
				}]
			}
		},
		components: {
			BottomTab
		},
		mounted() {
			this.getSzglData()
			this.cShow = true
		},
		methods: {
			getSzglData() {
				let data = {
					current: 1,
					size: 30
				}
				this.$ajax.getCwgk(data).then(res => {
					res.records.forEach(item => {
						item.img = item.img.split(",")
					})
					this.list3 = res.records.splice(0, 6)
					this.list4 = res.records.splice(3, 6)
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
			offShow() {
				this.cShow = false
			},
			getIndex(e) {
				if (e == 0) {
					this.show = false
					this.cShow = true
					this.superviseShow = false
					this.cmssShow = false
					this.mytjShow = false
					this.lzxjShow = false
				} else if (e == 1) {
					this.getSzglData()
					this.show = true
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = false
					this.mytjShow = false
					this.lzxjShow = false
				} else if (e == 2) {
					this.show = false
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = true
					this.mytjShow = false
					this.lzxjShow = false
				} else if (e == 3) {
					this.show = false
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = false
					this.mytjShow = true
					this.lzxjShow = false
				} else if (e == 4) {
					this.show = false
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = false
					this.mytjShow = false
					this.lzxjShow = true
				} else if (e==5) {
					this.show = false
					this.cShow = false
					this.superviseShow = true
					this.cmssShow = false
					this.mytjShow = false
					this.lzxjShow = false
				}
			},
			showCjhImg(img) {
				this.imgUrl = img
				this.imgShow = true
			},
			chooseLzxj(index) {
				this.lzxjIndex = index
			}
		}
	}
</script>

<style scoped lang="less">
	.pop-common {
		width: 580px;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
	}
	
	.supervise-box {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 200px;
		left: 40px;
		.pop-inner-title {
			display: flex;
			width: 95%;
			margin: 0 auto;
			font-size: 19px;
			span {
				width: 35%;
				text-align: center;
			}
		}
		.pop-inner-box {
			max-height: 350px;
			overflow-y: scroll;
			.pop-inner-item {
				display: flex;
				width: 95%;
				margin: 10px auto;
				font-size: 16px;
				span {
					width: 35%;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
	
	.cjh {
		background: url(../bgImages/村监会总表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		margin-bottom: 20px;
	}
	
	.cjw {
		background: url(../bgImages/村纪检委总表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		margin-bottom: 20px;
	}
	
	.sjh {
		background: url(../bgImages/社监会总表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
	}
	
	.cmss {
		position: absolute;
		top: 200px;
		left: 40px;
		background: url(../bgImages/社监会总表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		.pop-inner-title {
			display: flex;
			width: 95%;
			margin: 0 auto;
			font-size: 19px;
			span {
				width: 35%;
				text-align: center;
			}
		}
		.pop-inner-box {
			max-height: 350px;
			overflow-y: scroll;
			.pop-inner-item {
				display: flex;
				width: 95%;
				margin: 10px auto;
				font-size: 16px;
				span {
					width: 35%;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
	
	.mytj {
		position: absolute;
		top: 200px;
		left: 40px;
		background: url(../bgImages/社监会总表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
		.pop-inner-title {
			display: flex;
			width: 95%;
			margin: 0 auto;
			font-size: 19px;
			span {
				width: 30%;
				text-align: center;
			}
		}
		.pop-inner-box {
			max-height: 350px;
			overflow-y: scroll;
			.pop-inner-item {
				display: flex;
				width: 95%;
				margin: 10px auto;
				font-size: 16px;
				span {
					width: 30%;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}

	.cjhImg {
		width: 600px;
		position: absolute;
		border: 1px solid #fff;
		top: 230px;
		left: 700px;
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

	.lzxj {
		.tab-bg {
			position: absolute;
			top: 180px;
			left: 35px;
			width: 545px;
			height: 418px;
			background: url(../bgImages/lzxj-tab.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			color: #000;
			font-size: 24px;
			padding: 180px 90px 0;
			box-sizing: border-box;
			cursor: pointer;
			div {
				margin-bottom: 30px;
				.lzxjActive {
					color: #B31624;
				}
			}
		}
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

	.cun-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;

		.bg {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
		}

		.wrapper {
			position: absolute;
			left: 0;
			right: 0;
			top: 130px;
			bottom: 110px;
			width: 100%;
			height: calc(100vh - 230px);
			z-index: 11;

			.cun-top {
				height: 50%;
				display: flex;

				.cun-left {
					width: 26%;
					height: 78%;
					padding: 30px;

					/*横幅*/
					.chd {
						width: 100%;
						height: 40px;
						position: relative;

						/*margin-bottom: 20px;*/
						img {
							position: absolute;
							left: 0;
							right: 0;
							top: 0;
							bottom: 0;
							width: 100%;
							height: 100%;
							z-index: 13;
						}

						p {
							position: absolute;
							left: 0;
							right: 0;
							top: 0;
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
					.reverseArrow {
						width: 100%;
						height: 40px;
						position: relative;
						/*margin-bottom: 20px;*/
						display: flex;

						div {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;

							/*下箭头*/
							img {
								margin: 2px;
								width: 17px;
							}

							font-weight: 500;
							font-size: 15px;
						}
					}

					ul {
						width: 100%;
						height: 100%;
						display: flex;

						li {
							width: 50%;
							height: 100%;
							padding: 10px;

							.border-out {
								border-radius: 5px;
								border: 1px solid #999999;
								width: 100%;
								height: 78%;
								display: flex;
								align-items: center;
								justify-content: center;

								img,
								.moreImg {
									width: 95%;
									height: 99%;
								}
							}

							.top-label {
								height: 22%;
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;

								img {
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
