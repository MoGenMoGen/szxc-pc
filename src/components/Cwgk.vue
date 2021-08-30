<template>
	<!-- 村情公示 -->
	<div>
		<transition name="fade" v-if="show">
			<div class="cun-container">
				<img :src="icBj" class="bg">
				<div class="wrapper">
					<div class="cun-top">
						<div class="cun-left" style="width: 100%">
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
						<div class="cun-left" style="width: 100%">
							<div class="reverseArrow">
								<div v-for="item in list4" :key="item.id">
									<img :src="icJtx">
									<p>{{item.name}}</p>

								</div>
							</div>

							<ul>
								<li v-for="item in list4" :key="item.id">
									<div class="border-out">
										<el-image class="moreImg" :src="item.img[0]" :preview-src-list="item.img">
										</el-image>
									</div>
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
					<div class="duties" @click="showDuties(1)">
						<span>机构职能</span>
					</div>
					<div class="pop-inner-title">
						<span style="width: 15%;">姓名</span>
						<span style="width: 15%;">出生年月</span>
						<span>工作单位(或住址)</span>
						<span>联系电话</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in cunjianhuiList" :key='index' class="pop-inner-item"
							@click="showCjhImg(item.img)">
							<span style="width: 15%;">{{ item.name }}</span>
							<span style="width: 15%;">{{ item.birthday }}</span>
							<span>{{ item.add }}</span>
							<span>{{ item.phone }}</span>
						</div>
					</div>
				</div>
				<div class="pop-common cjw">
					<div class="duties" @click="showDuties(2)">
						<span>机构职能</span>
					</div>
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
					<div class="duties" @click="showDuties(3)">
						<span>机构职能</span>
					</div>
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
				<img src="../../public/static/images/cancel.png" class="cancelLogo" @click="imgShow = false"
					v-show="imgShow">
			</div>
		</transition>
		<transition name="fade">
			<div class="cjhImg2" v-show="imgShow2">
				<img :src="imgUrl2">
				<img src="../../public/static/images/cancel.png" class="cancelLogo" @click="imgShow2 = false"
					v-show="imgShow2">
			</div>
		</transition>
		<transition name="fade">
			<div v-show="cmssShow" class="pop-common cmss">
				<div class="pop-inner-title">
					<span style="width: 10%;">序号</span>
					<span style="width: 20%;">时间</span>
					<span>主题</span>
					<span>满意度调查</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in cmssList" :key='index' class="pop-inner-item"
						@click="showCmssDetail(item)">
						<span style="width: 10%;">{{ index+1 }}</span>
						<span style="width: 20%;">{{ item.handleTime }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.satisfaction }}%</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="cmss-detail" v-show="cmssDetailShow">
				<!-- <img :src="cmssDetail.img"/> -->
				<div class="cmss-info">
					<div class="cmss-title">{{cmssDetail.name}}</div>
					<div class="cmss-infoDetail">
						<div class="cmss-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="cmss-infoDetail-item-right">
								<span>群众点题（说）:</span>
								<span v-html="cmssDetail.theme"></span>
							</div>
						</div>
						<!-- <div class="cmss-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="cmss-infoDetail-item-right">
								<span>村名议事（议）:</span>
								<span v-html="cmssDetail.discussion"></span>
							</div>
						</div> -->
						<div class="cmss-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="cmss-infoDetail-item-right">
								<span>村委会回复（办）:</span>
								<span>{{cmssDetail.eventHandle}}</span>
							</div>
						</div>
						<div class="cmss-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="cmss-infoDetail-item-right">
								<span>群众评价（评）:</span>
								<div style="width: 400px">
								  <span style="float: left" class="cmss-infoDetail-item-right-inline">满意&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style="width: 120px;"><img src="../bgImages/agree.png" :style="{width: cmssDetail.satisfaction + '%'}"></div>人数{{cmssDetail.satisfiedNum}}人 </span><div style="float: right">{{cmssDetail.satisfaction}}%</div>
								</div>
								<div style="width: 400px">
								  <span style="float: left" class="cmss-infoDetail-item-right-inline">基本满意<div style="width: 120px;"><img src="../bgImages/disagree.png" :style="{width: cmssDetail.commonSatisfaction + '%'}"></div>人数{{cmssDetail.commonNum}}人</span><div style="float: right">{{cmssDetail.commonSatisfaction}}%</div>
								</div>
								<div style="width: 400px">
								  <span style="float: left" class="cmss-infoDetail-item-right-inline">不满意&nbsp;&nbsp;&nbsp;<div style="width: 120px;"><img src="../bgImages/disagree.png" :style="{width: cmssDetail.disSatisfaction + '%'}"></div>人数{{cmssDetail.dissatisfiedNum}}人</span><div style="float: right">{{cmssDetail.disSatisfaction}}%</div>
								</div>
							</div>
						</div>
						<div class="cmss-message">
							<div class="cmss-message-top">
								<img src="../bgImages/message.png">
								<span>村民留言（议）:</span>
							</div>
							<div class="cmss-message-info">
								<div class="cmss-message-comment" v-for="(item,index) in cmssCommentList" :key="index">
									<div><img :src="item.avatar">{{item.nickName||item.realName}}</div>
									<span>{{item.cont}}</span>
									<span>{{item.createTime}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<img src="../../public/static/images/cancel.png" class="cancelLogo" @click="cmssDetailShow = false"
					v-show="cmssDetailShow">
			</div>
		</transition>
		<transition name="fade">
			<div class="mytj-detail" v-show="mytjDetailShow">
				<!-- <img :src="mytjDetail.img"/> -->
				<div class="mytj-info">
					<div class="mytj-title">{{mytjDetail.name}}</div>
					<div class="mytj-infoDetail">
						<div class="mytj-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="mytj-infoDetail-item-right">
								<span>项目实施方案：<span style="font-size: 18px;">{{mytjDetail.eventHandle}}</span></span>
								<img :src="item" v-for="(item,index) in mytjDetail.img3" :key="index">
							</div>
						</div>
						<div class="mytj-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="mytj-infoDetail-item-right">
								<span>征求意见:</span>
								<div style="width: 400px">
								  <span style="float: left" class="mytj-infoDetail-item-right-inline">赞成<div style="width: 120px;"><img src="../bgImages/agree.png" :style="{width: mytjDetail.agree + '%'}"></div>人数{{mytjDetail.agreeNum}}  </span><div style="float:right;"> {{mytjDetail.agree}}%</div>
								</div>
								<div style="width: 400px">
									<span style="float: left" class="mytj-infoDetail-item-right-inline">反对<div style="width: 120px;"><img src="../bgImages/disagree.png" :style="{width: mytjDetail.disAgree + '%'}"></div>人数{{mytjDetail.disagreeNum}}  </span><div style="float:right;">{{mytjDetail.disAgree}}%</div>
								</div>
							</div>
						</div>
						<div class="mytj-message">
							<div class="mytj-message-top">
								<img src="../bgImages/logo.png">
								<span>其他意见建议:</span>
							</div>
							<div class="mytj-message-box">
								<div class="mytj-message-comment" v-for="(item,index) in mytjCommentList" :key="index">
									<div><img :src="item.avatar">{{item.nickName||item.realName}}</div>
									<span>{{item.cont}}</span>
									<span>{{item.createTime}}</span>
								</div>
							</div>
						</div>
						<!-- <div class="mytj-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="mytj-infoDetail-item-right">
								<span>结果评估：<span style="font-size: 18px;">{{mytjDetail.result}}</span></span>
							</div>
						</div> -->
						<div class="mytj-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="mytj-infoDetail-item-right">
								<span>项目实施过程：</span>
								<img :src="item" v-for="(item,index) in mytjDetail.img2" :key="index">
							</div>
						</div>
						<div class="mytj-infoDetail-item">
							<img src="../bgImages/logo.png">
							<div class="mytj-infoDetail-item-right">
								<span>结果评估:</span>
								<div style="width: 400px">
								  <span style="float: left" class="mytj-infoDetail-item-right-inline">满意&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style="width: 120px;"><img src="../bgImages/agree.png" :style="{width: mytjDetail.satisfaction +'%'}"></div>人数{{mytjDetail.satisfiedNum}}  </span><div style="float: right">{{mytjDetail.satisfaction}}%</div>
								</div>
								<div style="width: 400px">
								  <span style="float: left"  class="mytj-infoDetail-item-right-inline">基本满意<div style="width: 120px;"><img src="../bgImages/disagree.png" :style="{width: mytjDetail.commonSatisfaction +'%'}"></div>人数{{mytjDetail.commonNum}}  </span><div style="float: right">{{mytjDetail.commonSatisfaction}}%</div>
								</div>
								<div style="width: 400px">
								  <span style="float: left"  class="mytj-infoDetail-item-right-inline">不满意&nbsp;&nbsp;&nbsp;<div style="width: 120px;"><img src="../bgImages/disagree.png" :style="{width: mytjDetail.disSatisfaction +'%'}"></div>人数{{mytjDetail.dissatisfiedNum}} </span><div style="float: right">{{mytjDetail.disSatisfaction}}%</div>
								</div>
							</div>
						</div>
						<!-- <div class="mytj-message">
							<div class="mytj-message-top">
								<img src="../bgImages/logo.png">
								<span>村民留言:</span>
							</div>
							<div class="mytj-message-box">
								<div style="overflow-y: scroll;">
									<div v-html="mytjDetail.message"></div>
								</div>
							</div>
						</div> -->
					</div>
				</div>
				<img src="../../public/static/images/cancel.png" class="cancelLogo" @click="mytjDetailShow = false"
					v-show="mytjDetailShow">
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
					<div v-for="(item,index) in mytjList" :key='index' class="pop-inner-item"
						@click="showMytjDetail(item)">
						<span style="width: 10%;">{{ index+1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.agree }}%</span>
						<span>{{ item.satisfaction }}%</span>
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
				<div :style="{'background-image': 'url('+ hlcj +')'}" v-if="lzxjCont&&lzxjIndex==0" class="lzxg-imgBg">
					<div v-for="(item,index) in lzxjCont" :key="index" class="lzxg-item">
						<el-image :src="item" :preview-src-list="lzxjCont" style="width: 273px;height: 215px;">
						</el-image>
					</div>
				</div>
				<div :style="{'background-image': 'url('+ qlcjsw +')'}" v-if="lzxjCont&&lzxjIndex==1"
					class="lzxg-imgBg2">
					<div v-for="(item,index) in lzxjCont" :key="index" class="lzxg-item">
						<el-image :src="item" :preview-src-list="lzxjCont" style="width: 184px;height: 205px;">
						</el-image>
					</div>
				</div>
				<div :style="{'background-image': 'url('+ xwqlmh +')'}" v-if="lzxjCont&&lzxjIndex==2"
					class="lzxg-imgBg">
					<div v-for="(item,index) in lzxjCont" :key="index" class="lzxg-item">
						<el-image :src="item" :preview-src-list="lzxjCont" style="width: 273px;height: 215px;">
						</el-image>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="fxyj" v-show="fxyjShow">
				<div class="pop-common cbzlht">
					<div class="pop-inner-title">
						<span style="width: 5%;">序号</span>
						<span style="width: 45%;">承租方</span>
						<span>租期</span>
						<span style="width: 20%;">租金支付</span>
						<span style="width: 5%;">预警</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in yewuList" :key='index' class="pop-inner-item"
							@click="showCjhImg(item.img)">
							<span style="width: 5%;">{{ index+1 }}</span>
							<span style="width: 45%;">{{ item.name }}</span>
							<span>{{ item.time }}</span>
							<span style="width: 20%;">{{ item.money }}</span>
							<span style="width: 5%;"><img src="../bgImages/绿.png"/></span>
						</div>
					</div>
				</div>
				<div class="pop-common cgcjsqk">
					<div class="pop-inner-title">
						<span style="width: 50%;">项目</span>
						<span style="width: 10%;">资金来源</span>
						<span style="width: 10%;">金额</span>
						<span style="width: 20%;">承包单位</span>
						<span style="width: 5%;">预警</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in cgcjsqkList" :key='index' class="pop-inner-item"
							@click="showCjhImg(item.img)">
							<span style="width: 50%;">{{ item.name }}</span>
							<span style="width: 10%;">{{ item.moneyFrom }}</span>
							<span style="width: 10%;">{{ item.money }}</span>
							<span style="width: 25%;">{{ item.build }}</span>
							<span style="width: 5%;"><img src="../bgImages/绿.png"/></span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="qflyShow">
				<div class="pop-common qfly">
					<div v-for="(item,index) in qflyList" :key='index' class="pop-inner-item" @click="chooseQfly(index,item)">
						<span :class="qflyIndex == index ? 'qflyActive': ''">{{ item.dictValue}}</span>
					</div>
				</div>
				<div class="pop-common qfly-child" v-show="qflyChildShow">
					<div class="qfly-title">{{qflyTitle}}</div>
					<div v-for="(item,index) in qflyList2" :key='index' class="pop-inner-item" @click="chooseQfly2(index,item)">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="qflyImgShow">
				<div class="qfly-img" v-if="qflyImgShow1">
					<div class="qfly-bg">
						<div class="qfly-title">{{qflyIList.name}}</div>
						<div class="qfly-cont">
							<img :src="item.img" v-for="(item,index) in qflyIList.records" :key="index" v-if="!qflyIList.video">
							<video width="100%" height="100%" :src="qflyIList.records[0].cont" v-if="qflyIList.video" autoplay="autoplay" loop="loop"></video>
						</div>
					</div>
				</div>
				<div class="qfly-imgOrWord" v-if="qflyImgShow2">
					<div class="qfly-bg">
						<div class="qfly-title">{{qflyIWList.name}}</div>
						<div class="qfly-cont" v-html="qflyIWList.cont"></div>
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
	import cjh from '../../public/static/images/cjh.png'
	import cjw from '../../public/static/images/cjw.png'
	import sjh from '../../public/static/images/sjh.png'
	import hlcj from '../bgImages/hlcl.png'
	import qlcjsw from '../bgImages/qlcjsw.png'
	import xwqlmh from '../bgImages/xwqlmh.png'

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
				hlcj,
				qlcjsw,
				xwqlmh,
				cjh,
				cjw,
				sjh,
				// url2: "http://visual.gzvst.top/view/1405180480017412097",
				url2: 'http://visual.gzvst.top/view/1419558441860476930',
				cwList: [],
				imgShow: false,
				imgShow2: false,
				imgUrl: '',
				imgUrl2: '',
				cShow: false,
				show: false,
				superviseShow: false, //监督机构
				cmssShow: false, //村民说事
				cmssDetailShow: false, //村民说事详情显示
				mytjShow: false, //民意体检
				mytjDetailShow: false, //村民说事详情显示
				lzxjShow: false, //廉政宣教
				lzxjCont: false, //廉政宣教图片墙
				fxyjShow: false, //风险预警
				qflyShow: false, //清风廉韵
				qflyChildShow: false, //清风廉韵二级菜单
				qflyImgShow: false, // 清风廉韵图片展示
				qflyImgShow1: false, //两列纯图显示
				qflyImgShow2: false, //3列文字图显示
				qflyIList: {}, //纯图
				qflyIWList: {}, //文字图
				qflyIndex: -1,
				lzxjIndex: -1,
				cmssDetail: {}, //村民说事详情
				mytjDetail: {}, //民意体检详情
				jjData: {},
				cgcData: {},
				cmData: {},
				cbData: {},
				tdData: {},
				bzData: {},
				bxData: {},
				jfData: {},
				qflyList: ['清廉阵地', '家风民俗', '忽微积患'],
				cmssCommentList: [],
				mytjCommentList: [],
				qflyTitle: '', //清风廉韵二级标题
				qflyList2: [],
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
				cgcjsqkList: [{
					name: '九龙湖村横溪钱家东侧至高屋段林区道路建设项目边坡勘查工程',
					moneyFrom: '村里',
					money: 225000,
					build: '省工程勘察设计院集团有限公司'
				},{
					name: '红色长胜主题村公共景观工程',
					moneyFrom: '上级补助加村级自筹',
					money: 235677,
					build: '市镇海区悦丰建设工程有限公司'
				}],
				cunjianhuiList: [{
					name: '朱丽红',
					birthday: '1982.04',
					add: '九龙湖村',
					phone: '13586887466/670664',
					img: 'static/images/cjh-zhl.png'
				}, {
					name: '王海君',
					birthday: '1956.11',
					add: '九龙湖村横溪',
					phone: '13857479443/668443',
					img: 'static/images/cjh-whj.png'
				}, {
					name: '程岳定',
					birthday: '1956.10',
					add: '九龙家苑一期',
					phone: '640257',
					img: 'static/images/cjh-cyd.png'
				}, {
					name: '姚百寅',
					birthday: '1962.10',
					add: '骆兴家园',
					phone: '663479',
					img: 'static/images/cjh-yby.png'
				}, {
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
				}, {
					name: '程岳定',
					birthday: '1956.10',
					add: '九龙家苑一期',
					phone: '640257'
				}, {
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
				}, {
					name: '王海君',
					birthday: '1956.11',
					add: '九龙湖村横溪',
					phone: '13857479443/668443'
				}, {
					name: '程岳定',
					birthday: '1956.10',
					add: '九龙家苑一期',
					phone: '640257'
				}, {
					name: '姚百寅',
					birthday: '1962.10',
					add: '骆兴家园',
					phone: '663479'
				}, {
					name: '张振高',
					birthday: '1966.11',
					add: '九龙湖村长胜',
					phone: '13857821828/679828'
				}],
				cmssList: [],
				mytjList: [],
				lzxjList: []
			}
		},
		components: {
			BottomTab
		},
		mounted() {
			this.getSzglData()
			this.cShow = true
			this.$ajax.getSayList({size:10,current:1,status:2}).then(res => {
				res.records.forEach(item => {
					item.handleTime = item.handleTime.substring(0,10)
					let all = Number(item.satisfiedNum)+Number(item.commonNum)+Number(item.dissatisfiedNum)
					if(all==0) {
						item.satisfaction = 0
						item.commonSatisfaction = 0
						item.disSatisfaction = 0
					} else {
						item.satisfaction = parseFloat(item.satisfiedNum / all * 100).toFixed(1)
						item.commonSatisfaction = parseFloat(item.commonNum / all * 100).toFixed(1)
						item.disSatisfaction = parseFloat(item.dissatisfiedNum / all * 100).toFixed(1)
					}
				})
				this.cmssList = res.records
			})
			this.$ajax.getOpinionList({size:10,current:1}).then(res => {
				res.records.forEach(item => {
					item.handleTime = item.handleTime.substring(0,10)
					let all = Number(item.satisfiedNum)+Number(item.commonNum)+Number(item.dissatisfiedNum)
					if(all==0) {
						item.satisfaction = 0
						item.commonSatisfaction = 0
						item.disSatisfaction = 0
					} else {
						item.satisfaction = parseFloat(item.satisfiedNum / all * 100).toFixed(1)
						item.commonSatisfaction = parseFloat(item.commonNum / all * 100).toFixed(1)
						item.disSatisfaction = parseFloat(item.dissatisfiedNum / all * 100).toFixed(1)
					}
					let agreeAll = Number(item.agreeNum)+Number(item.disagreeNum)
					if(agreeAll == 0) {
						item.agree = 0
						item.disAgree = 0
					} else {
						item.agree = parseFloat(item.agreeNum / agreeAll * 100).toFixed(1)
						item.disAgree = parseFloat(item.disagreeNum / agreeAll * 100).toFixed(1)
					}
					item.img2 = item.img2.split(",")
					item.img3 = item.img3.split(",")
				})
				this.mytjList = res.records
			})
			this.$ajax.getDictionary('honestType').then(res => {
			  this.qflyList = res
			})
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
					this.list4 = res.records.splice(7, 12)
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
					this.imgShow = false
					this.cmssDetailShow = false
					this.mytjDetailShow = false
					this.fxyjShow = false
					this.imgShow2 = false
					this.qflyShow = false
					this.qflyChildShow = false
					this.qflyImgShow = false
					this.qflyImgShow1 = false
					this.qflyImgShow2 = false
				} else if (e == 1) {
					// this.getSzglData()
					this.show = false
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = true
					this.mytjShow = false
					this.lzxjShow = false
					this.imgShow = false
					this.cmssDetailShow = false
					this.mytjDetailShow = false
					this.fxyjShow = false
					this.imgShow2 = false
					this.qflyShow = false
					this.qflyChildShow = false
					this.qflyImgShow = false
					this.qflyImgShow1 = false
					this.qflyImgShow2 = false
				} else if (e == 2) {
					this.show = false
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = false
					this.mytjShow = true
					this.lzxjShow = false
					this.imgShow = false
					this.cmssDetailShow = false
					this.mytjDetailShow = false
					this.fxyjShow = false
					this.imgShow2 = false
					this.qflyShow = false
					this.qflyChildShow = false
					this.qflyImgShow = false
					this.qflyImgShow1 = false
					this.qflyImgShow2 = false
				} else if (e == 3) {
					this.show = false
					this.cShow = false
					this.superviseShow = false
					this.cmssShow = false
					this.mytjShow = false
					this.lzxjShow = false
					this.imgShow = false
					this.cmssDetailShow = false
					this.mytjDetailShow = false
					this.fxyjShow = false
					this.imgShow2 = false
					this.qflyShow = true
					this.qflyChildShow = false
					this.qflyImgShow = false
					this.qflyImgShow1 = false
					this.qflyImgShow2 = false
					this.qflyIndex = -1
				}
			},
			showCjhImg(img) {
				this.imgUrl = img
				this.imgShow = true
				this.imgShow2 = false
			},
			showDuties(e) {
				this.imgShow2 = false
				this.imgShow2 = true
				this.imgShow = false
				if(e==1) {
					this.imgUrl2 = cjh
				} else if(e==2) {
					this.imgUrl2 = cjw
				} else if(e==3) {
					this.imgUrl2 = sjh
				}
			},
			chooseLzxj(index) {
				this.lzxjIndex = index
				this.lzxjCont = true
				this.lzxjCont = this.lzxjList[index].imgWall
			},
			chooseQfly(index,item) {
				this.qflyTitle = item.dictValue
				this.qflyChildShow = true
				this.qflyIndex = index
				this.$ajax.getUprightList({size:10,current:1,type:item.dictKey}).then(res => {
					this.qflyList2 = res.records
				})
			},
			chooseQfly2(index,item) {
				this.qflyImgShow = true
				if(this.qflyIndex==1) {
					this.qflyImgShow1 = false
					this.qflyImgShow2 = true
					this.qflyIWList = item
				} else if(this.qflyIndex==2&&index==2) {
					this.qflyImgShow1 = true
					this.qflyImgShow2 = false
					this.$ajax.getAdvert({size:10,current:1,travelId:item.id}).then(res => {
						this.qflyIList = res
						this.qflyIList.name = item.name
						this.qflyIList.video = true
					})
				} else {
					this.qflyImgShow1 = true
					this.qflyImgShow2 = false
					this.$ajax.getAdvert({size:10,current:1,travelId:item.id}).then(res => {
						this.qflyIList = res
						this.qflyIList.name = item.name
					})
				}
				
				console.log(this.qflyIList)
			},
			showCmssDetail(item) {
				this.cmssDetailShow = true
				this.cmssDetail = item
				this.$ajax.getCommentList({size:10,current:1,articleId:item.id,status:2}).then(res => {
					res.records.forEach(item => {
						item.createTime = item.createTime.substring(0,10)
					})
					this.cmssCommentList = res.records
				})
			},
			showMytjDetail(item) {
				this.mytjDetailShow = true
				this.mytjDetail = item
				this.$ajax.getCommentList({size:10,current:1,articleId:item.id,status:2}).then(res => {
					res.records.forEach(item => {
						item.createTime = item.createTime.substring(0,10)
					})
					this.mytjCommentList = res.records
				})
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

	.duties {
		width: 95%;
		display: flex;
		justify-content: flex-end;
		font-size: 19px;
		margin-bottom: 10px;
		cursor: pointer;

		span {
			padding: 5px;
			border-bottom: 1px solid #fff;
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
		background: url(../bgImages/村民说事-列表.png) no-repeat;
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

	.cmss-detail {
		// background: url(../bgImages/村民说事-详情.png) no-repeat;
		position: absolute;
		top: 200px;
		left: 700px;
		.cmss-info {
			background: url(../bgImages/border-back.png) no-repeat;
			width: 800px;
			height: 886px;
			background-size: 100% 100%;
			font-size: 22px;
			color: #8BEBFF;
			.cmss-title {
				width: 100%;
				padding: 15px 240px;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: center;
			}
			.cmss-infoDetail {
				display: flex;
				flex-direction: column;
				width: 670px;
				max-height: 770px;
				margin: 0 auto;
				overflow-y: scroll;
				.cmss-infoDetail-item {
					display: flex;
					width: 620px;
					margin-bottom: 40px;
					img {
						width: 22px;
						height: 22px;
						margin-right: 10px;
						margin-top: 5px;
					}
					.cmss-infoDetail-item-right {
						display: flex;
						flex-direction: column;
						font-size: 18px;
						span:first-child {
							font-size: 20px;
						}
						.cmss-infoDetail-item-right-inline {
							display: flex;
							div {
								margin: 0 5px;
								img {
									height: 12px;
								}
							}
						}
					}
				}
				.cmss-message {
					display: flex;
					flex-direction: column;
					.cmss-message-top {
						display: flex;
						img {
							width: 22px;
							height: 22px;
							margin-right: 10px;
							margin-top: 5px;
						}
						span {
							font-size: 20px;
						}
					}
					.cmss-message-info {
						background: url(../bgImages/message-bg.png) no-repeat;
						background-size: 100% 100%;
						width: 660px;
						height: 325px;
						padding: 20px 30px;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						.cmss-message-comment {
							display: flex;
							flex-direction: column;
							font-size: 14px;
							div {
								display: flex;
								align-items: center;
								img {
									width: 32px;
									height: 32px;
									border-radius: 50%;
									margin-right: 10px;
								}
							}
							span {
								padding-left: 42px;
								box-sizing: border-box;
							}
							span:last-child {
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}

	.mytj-detail {
		position: absolute;
		top: 200px;
		left: 700px;
		.mytj-info {
			background: url(../bgImages/border-back.png) no-repeat;
			width: 800px;
			height: 886px;
			background-size: 100% 100%;
			font-size: 22px;
			color: #8BEBFF;
			.mytj-title {
				width: 100%;
				padding: 15px 240px;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: center;
			}
			.mytj-infoDetail {
				display: flex;
				flex-direction: column;
				width: 670px;
				max-height: 770px;
				margin: 0 auto;
				overflow-y: scroll;
				.mytj-infoDetail-item {
					display: flex;
					width: 620px;
					margin-bottom: 40px;
					img {
						width: 22px;
						height: 22px;
						margin-right: 10px;
						margin-top: 5px;
					}
					.mytj-infoDetail-item-right {
						display: flex;
						flex-direction: column;
						font-size: 18px;
						span:first-child {
							font-size: 20px;
						}
						img {
							width: 620px;
							height: 236px;
							object-fit: cover;
						}
						.mytj-infoDetail-item-right-inline {
							display: flex;
							div {
								margin: 0 5px;
								img {
									height: 12px;
								}
							}
						}
					}
				}
				.mytj-message {
					display: flex;
					flex-direction: column;
					.mytj-message-top {
						display: flex;
						img {
							width: 22px;
							height: 22px;
							margin-right: 10px;
							margin-top: 5px;
						}
						span {
							font-size: 20px;
						}
					}
					.mytj-message-box {
						background: url(../bgImages/message-bg.png) no-repeat;
						background-size: 100% 100%;
						width: 660px;
						height: 325px;
						padding: 20px 30px;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						.mytj-message-comment {
							display: flex;
							flex-direction: column;
							font-size: 14px;
							div {
								display: flex;
								align-items: center;
								img {
									width: 32px;
									height: 32px;
									border-radius: 50%;
									margin-right: 10px;
								}
							}
							span {
								padding-left: 42px;
								box-sizing: border-box;
							}
							span:last-child {
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}

	.mytj {
		position: absolute;
		top: 200px;
		left: 40px;
		background: url(../bgImages/民意体检-列表.png) no-repeat;
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

	.cjhImg2 {
		width: 1000px;
		position: absolute;
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

	.cancelLogo {
		width: 40px;
		height: 40px;
		position: absolute;
		top: -20px;
		right: -20px;
	}

	.lzxj {
		position: absolute;
		top: 180px;
		left: 35px;
		display: flex;

		.tab-bg {
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

		.lzxg-imgBg {
			margin-left: 190px;
			width: 1174px;
			height: 925px;
			background-size: 100% 100%;
			padding: 206px 113px 177px 132px;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;

			.lzxg-item {
				width: 273px;
				height: 215px;
				margin-right: 55px;
			}

			.lzxg-item:nth-child(3n) {
				margin-right: 0;
			}
		}

		.lzxg-imgBg2 {
			margin-left: 190px;
			width: 1174px;
			height: 925px;
			background-size: 100% 100%;
			padding: 229px 61px 164px 82px;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;

			.lzxg-item {
				width: 190px;
				height: 214px;
				margin-right: 19px;
				margin-bottom: 104px;
				border: 3px solid #7d411f;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.lzxg-item:nth-child(5n) {
				margin-right: 0;
			}
		}
	}

	.fxyj {
		position: absolute;
		top: 200px;
		left: 40px;
		display: flex;
		flex-direction: column;
		.cbzlht {
			width: 832px;
			background: url(../bgImages/承包租赁合同.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 60px;
			margin-bottom: 30px;
			.pop-inner-title {
				display: flex;
				width: 95%;
				margin: 0 auto;
				font-size: 19px;

				span {
					width: 25%;
					text-align: center;
				}
			}

			.pop-inner-box {
				max-height: 350px;
				overflow-y: scroll;

				.pop-inner-item {
					display: flex;
					align-items: center;
					width: 95%;
					margin: 10px auto;
					font-size: 16px;

					span {
						width: 25%;
						text-align: center;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					img {
						width: 5px;
						height: 5px;
					}
				}
			}
		}
		.cgcjsqk {
			width: 1112px;
			background: url(../bgImages/村工程建设情况.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 60px;
			.pop-inner-title {
				display: flex;
				width: 95%;
				margin: 0 auto;
				font-size: 19px;

				span {
					width: 25%;
					text-align: center;
				}
			}

			.pop-inner-box {
				max-height: 350px;
				overflow-y: scroll;

				.pop-inner-item {
					display: flex;
					align-items: center;
					width: 95%;
					margin: 10px auto;
					font-size: 16px;

					span {
						width: 25%;
						text-align: center;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					img {
						width: 5px;
						height: 5px;
					}
				}
			}
		}
	}

	.qfly {
		width: 520px;
		height: 298px;
		background: url(../bgImages/清风廉韵.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 200px;
		left: 35px;
		padding-top: 100px;
		font-size: 22px;
		letter-spacing: 4px;
		.pop-inner-item {
			width: 100%;
			margin-bottom: 30px;
			text-align: center;
			cursor: pointer;
			.qflyActive {
				color: #ffd800;
				font-weight: bold;
			}
		}
	}
	
	.qfly-child {
		width: 520px;
		height: 298px;
		background: url(../bgImages/二级菜单.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 528px;
		left: 35px;
		font-size: 22px;
		letter-spacing: 4px;
		.qfly-title {
			width: 100%;
			padding: 1px 158px 30px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #8CACF9;
		}
		.pop-inner-item {
			width: 100%;
			margin-bottom: 30px;
			text-align: center;
			cursor: pointer;
		}
	}

	.qfly-img {
		position: absolute;
		top: 200px;
		left: 650px;
		display: flex;
		.qfly-bg {
			background: url(../bgImages/border-back4.png) no-repeat;
			background-size: 100% 100%;
			width: 1224px;
			height: 886px;
			margin-right: 150px;
			font-size: 22px;
			color: #8CACF9;
			.qfly-title {
				width: 100%;
				padding: 15px 490px;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: center;
			}
			.qfly-cont {
				width: 95%;
				height: 790px;
				padding: 15px 20px;
				box-sizing: border-box;
				overflow-y: scroll;
				margin: 0 auto;
				display: flex;
				flex-wrap: wrap;
				img {
					width: 542px;
					// height: 284px;
					margin: 5px auto;
				}
			}
		}
	}

	.qfly-imgOrWord {
		position: absolute;
		top: 200px;
		left: 600px;
		display: flex;
		.qfly-bg {
			background: url(../bgImages/border-back4.png) no-repeat;
			background-size: 100% 100%;
			width: 1224px;
			height: 886px;
			margin-right: 40px;
			font-size: 22px;
			color: #8CACF9;
			.qfly-title {
				width: 100%;
				padding: 15px 490px;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: center;
			}
			.qfly-cont {
				color: white;
				width: 95%;
				height: 790px;
				padding: 15px 40px;
				box-sizing: border-box;
				overflow-y: scroll;
				margin: 0 auto;
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
			height: calc(100vh - 100px);
			z-index: 11;

			.cun-top {
				height: 50%;
				display: flex;

				.cun-left {
					width: 26%;
					height: 90%;
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
								height: 60px;
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
