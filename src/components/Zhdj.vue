<template>
	<div>
		<transition name="fade">
			<div v-show="redClass">
				<div class="red-class-left">
					<div class="red-class-top">
						<div v-for="(item,index) in redClassTab" :key="index" @click="redClassClick(index)">
							<!-- <span>{{item.num}}</span> -->
							<img :src="item.url">
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="red-class-bottom" v-show="showRedClassList">
						<div class="red-class-title">{{redClassTitle}}</div>
						<div class="red-class-list" v-show="redClassTabIndex!=1&&redClassTabIndex!=2">
							<span v-for="(item,index) in redClassList" :key="index" @click="redClassListClick(item.id,index)">· {{item.title}}</span>
						</div>
						<div class="red-class-list2" v-show="redClassTabIndex==1">
							<span v-for="(item,index) in redClassList" :key="index" @click="redClassListClick(item.id,index)">{{item.title}}</span>
						</div>
						<div class="red-class-list3" v-show="redClassTabIndex==2">
							<div v-for="(item,index) in redClassList" :key="index" @click="redClassListClick(item.id,index)">
								<span>{{item.title}}</span>
								<span>{{item.synopsis}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="red-class-center" v-if="showRedClassInfo">
					<img src="static/images/cancel-2.png" @click="showRedClassInfo = false" style="position: absolute;top: 8px;right: -8px;">
					<div class="red-class-title">{{redClassInfoTitle}}</div>
					<div class="red-class-detail" v-if="redClassTabIndex==0||redClassTabIndex==4">
						<video :src="redClassInfoDetail.url" autoplay></video>
						<div class="red-class-detail-title"><div></div>详情介绍</div>
						<div class="red-class-detail-cont" v-html="redClassInfoDetail.content"></div>
					</div>
					<div class="red-class-detail" v-if="redClassTabIndex==3">
						<el-image class="red-class-detail-img" fit="cover" :src="redClassInfoDetail.img"  :preview-src-list="redClassInfoDetail.imgList"></el-image>
					</div>
					<div class="red-class-detail" v-if="redClassTabIndex==2">
						<div class="red-class-detail-cont" v-html="redClassInfoDetail.content"></div>
					</div>
				</div>
				<div class="red-class-center2" v-show="showRedClassHistory">
					<img src="static/images/cancel-2.png" @click="showRedClassHistory = false" 
					style="position: absolute;top: 8px;right: -8px;width: 38px;height: 38px;border: none;margin-top: 0;">
					<img :src="redClassInfoDetail.img">
					<span>{{redClassInfoDetail.title}}</span>
					<div v-html="redClassInfoDetail.content"></div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="mission">
				<div class="mission-left">
					<div class="mission-top">
						<div v-for="(item,index) in missionTab" :key="index" @click="missionClick(index)">
							<!-- <span>{{item.num}}</span> -->
							<img :src="item.url">
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="mission-bottom" v-show="showMissionList">
						<div class="mission-title">{{missionTitle}}</div>
						<div class="mission-list" v-show="missionTabIndex==3">
							<div class="mission-list-title" style="margin-bottom: 10px;">
								<span>姓名</span>
								<span>网格支部</span>
							</div>
							<div class="mission-list-item" v-for="(item,index) in missionList" :key="index" @click="missionListClick(item,index)">
								<span>{{item.name}}</span>
								<span>{{item.deptNm}}</span>
							</div>
						</div>
						<div class="mission-list2" v-show="missionTabIndex==5">
							<div class="mission-list-item" v-for="(item,index) in missionList" :key="index" @click="missionListClick(item,index)">
								<span>{{item.name}}</span>
							</div>
						</div>
						<div class="mission-list-wish" v-show="missionTabIndex==2">
							<div v-for="(item,index) in missionList" :key="index" class="mission-list-item">
								<div>
									<span>· {{item.title}}</span>
									<span style="margin: 10px 0 5px;"><img src="static/images/wish-name.png">{{item.wishName}}</span>
									<span><img src="static/images/wish-phone.png">{{item.wishMob}}</span>
								</div>
								<img :src="item.status==1?'static/images/receive.png':'static/images/receive-u.png'" style="width: 24px;height: 26px;">
							</div>
						</div>
						<div class="mission-list-active" v-show="missionTabIndex==0">
							<div class="mission-list-active-tab">
								<span v-for="(item,index) in missionActiveList" :key="index" :class="{'active':activeIndex==index}" @click="chooseActive(index)">{{item}}</span>
							</div>
							<div class="mission-list-box">
								<div class="mission-list-item" v-for="(item,index) in missionList" :key="index" @click="missionListClick(item,index)">
									<span style="display: flex;"><p style="margin-right: 5px;">· </p><p>{{item.name}}</p></span>
									<span>{{item.startTime}}</span>
								</div>
							</div>
						</div>
						<div class="mission-list-active" v-show="missionTabIndex==1">
							<div class="mission-list-box" style="max-height: 250px;">
								<div class="mission-list-item" v-for="(item,index) in missionList" :key="index" @click="missionListClick(item,index)">
									<span style="display: flex;"><p style="margin-right: 5px;">· </p><p>{{item.name}}</p></span>
									<span>{{item.startTime}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mission-center-money" v-show="showMissionMoney">
					<img src="static/images/cancel-2.png" @click="showMissionMoney = false" style="position: absolute;top: 8px;right: -8px;">
					<div class="mission-title">{{missionInfoTitle}}</div>
					<el-select v-model="partyKey" placeholder="请选择">
					    <el-option
					      v-for="item in partyList"
					      :key="item.dictKey"
					      :label="item.dictValue"
					      :value="item.dictKey">
					    </el-option>
					</el-select>
					<div class="mission-money-bottom">
						<div class="mission-money-bottom-item">
							<div class="mission-money-common">
								<span>{{partyNum}}</span>
								<span>人</span>
							</div>
							<span>上月缴费人数</span>
						</div>
						<div class="mission-money-bottom-item">
							<div class="mission-money-common" style="border: 20px solid #5087EC;">
								<span>{{partyCost}}</span>
								<span>元</span>
							</div>
							<span>上月缴费金额</span>
						</div>
					</div>
				</div>
				<div class="mission-center" v-show="showMissionInfo" :class="{'mission-hujufenli':missionTabIndex==3}">
					<img src="static/images/cancel-2.png" @click="showMissionInfo = false" style="position: absolute;top: 8px;right: -8px;">
					<div class="mission-title">{{missionInfoTitle}}</div>
					<div class="mission-info-two" v-show="missionTabIndex==3">
						<div class="mission-info-two-top">
							<div class="mission-avatar">
								<img :src="missionInfo.img" class="mission-avatar-img">
								<img src="static/images/partyLogo.png" class="mission-avatar-logo">
							</div>
							<div class="mission-detail">
								<div>姓名： {{missionInfo.name}}</div>
								<div>性别： {{missionInfo.sex}}</div>
								<div>年龄： {{missionInfo.age}}</div>
								<div>文化程度： {{missionInfo.education}}</div>
								<div>工作单位： {{missionInfo.unit}}</div>
								<div>联系方式： {{missionInfo.mob}}</div>
								<div>入党时间： {{missionInfo.joinTime}}</div>
								<div>党内职务： {{missionInfo.post}}</div>
								<div>所属党支部： {{missionInfo.deptNm}}</div>
								<!-- <div>党员评级： {{missionInfo.grade}}</div> -->
							</div>
						</div>
						<!-- <div class="mission-info-two-bottom">
							<div class="mission-info-two-bottom-title"><div></div>个人简介</div>
							<div v-html="missionInfo.introduce" class="mission-info-two-bottom-cont"></div>
						</div> -->
					</div>
					<div class="mission-info" v-show="missionTabIndex==5">
						<div class="mission-avatar">
							<img :src="missionInfo.img" class="mission-avatar-img">
							<img src="static/images/partyLogo.png" class="mission-avatar-logo">
						</div>
						<div class="mission-detail">
							<div style="margin: 20px 0;">姓名： {{missionInfo.name}}</div>
							<div v-html="missionInfo.content"></div>
						</div>
					</div>
					<div class="mission-info-active" v-show="missionTabIndex==0||missionTabIndex==1">
						<div>{{missionInfo.name}}</div>
						<div>{{missionInfo.signTotal}}人参加</div>
						<div v-html="missionInfo.cont"></div>
						<div>活动时间：{{missionInfo.startTime}}</div>
						<div>活动地点：{{missionInfo.address}}</div>
						<div>活动状态：{{missionInfo.state}}</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="branch">
				<div class="branch-left">
					<div class="branch-top">
						<div v-for="(item,index) in branchTab" :key="index" @click="branchClick(index)" >
							<img :src="item.url">
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="branch-bottom" v-show="showBranchList">
						<div class="branch-title">{{branchTitle}}</div>
						<div class="branch-honor" v-show="branchTabIndex==3">
							<span class="branch-honor-item" v-for="(item,index) in branchList" :key="index" @click="branchListClick(item,index)">{{item.name}}</span>
						</div>
						<div class="branch-list" v-show="branchTabIndex!=4">
							<el-select v-model="partyKey2" placeholder="请选择" v-show="branchTabIndex==2">
							    <el-option
							      v-for="item in partyList"
							      :key="item.dictKey"
							      :label="item.dictValue"
							      :value="item.dictKey">
							    </el-option>
							</el-select>
							<div class="branch-list-info" v-show="branchTabIndex==2">
								<div v-for="(item,index) in branchLeaderList" :key="index">
									<span>{{item.name}}</span>
									<img :src="item.url">
									<span>{{item.post}}</span>
								</div>
							</div>
							<div v-show="branchTabIndex==0" class="branch-list-develop">发展党员<div></div>计划{{branchList.length}}人</div>
							<div class="branch-list-title" v-show="branchTabIndex==0">
								<span>姓名</span>
								<span>培养联系人</span>
								<span>状态</span>
							</div>
							<div class="branch-list-box" v-show="branchTabIndex==0">
								<div class="branch-list-item" v-for="(item,index) in branchList" :key="index" @click="branchListClick(item,index)">
									<span>{{item.name}}</span>
									<span>{{item.contacts1}}</span>
									<span>{{item.state}}</span>
								</div>
							</div>
							<div class="branch-list-title"  v-show="branchTabIndex==1">
								<span style="width: 15%;">姓名</span>
								<span style="width: 60%;">职位</span>
								<span style="width: 25%;">电话</span>
							</div>
							<div class="branch-list-box" v-show="branchTabIndex==1">
								<div class="branch-list-item" v-for="(item,index) in branchList" :key="index" @click="branchListClick(item,index)">
									<span style="width: 15%;">{{item.name}}</span>
									<span style="width: 60%;">{{item.post}}</span>
									<span style="width: 25%;">{{item.mob}}</span>
								</div>
							</div>
							<div class="branch-list-title" style="margin-top: 10px;" v-show="branchTabIndex==2">
								<span>姓名</span>
								<span>出生年月</span>
								<span>入党时间</span>
							</div>
							<div class="branch-list-box" style="max-height: 220px;" v-show="branchTabIndex==2">
								<div class="branch-list-item" v-for="(item,index) in branchList" :key="index" @click="branchListClick(item,index)">
									<span>{{item.name}}</span>
									<span>{{item.birthday}}</span>
									<span>{{item.joinTime}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="branch-center" v-show="showBranchHonor">
					<img src="static/images/cancel-2.png" @click="showBranchHonor = false" style="position: absolute;top: 8px;right: -8px;">
					<div class="branch-title">{{branchInfoTitle}}</div>
					<div class="branch-info">
						<el-image class="branch-detail-img" fit="cover" :src="branchHonor.img"  :preview-src-list="branchHonor.imgList"></el-image>
					</div>
				</div>
				<div class="branch-center2" v-show="showBranchInfo">
					<img src="static/images/cancel-2.png" @click="showBranchInfo = false" style="position: absolute;top: 8px;right: -8px;">
					<div class="branch-title">{{branchInfoTitle}}</div>
					<div class="branch-info">
						<div class="branch-avatar">
							<img :src="branchInfo.img" class="branch-avatar-img">
							<img v-show="branchTabIndex!=0" src="static/images/partyLogo.png" class="branch-avatar-logo">
						</div>
						<div class="branch-detail">
							<span>姓名：{{branchInfo.name}}</span>
							<span v-show="branchTabIndex==2">出生年月：{{branchInfo.birthday}}</span>
							<span v-show="branchTabIndex==2">入党时间：{{branchInfo.joinTime}}</span>
							<span v-show="branchTabIndex==1">职位：{{branchInfo.post}}</span>
							<span v-show="branchTabIndex==1">电话：{{branchInfo.mob}}</span>
							<span v-show="branchTabIndex==1">干事承诺：{{branchInfo.promise}}</span>
							<span v-show="branchTabIndex==0">培养联系人：{{branchInfo.contacts1}}</span>
							<span v-show="branchTabIndex==0">培养联系人：{{branchInfo.contacts2}}</span>
							<span v-show="branchTabIndex==0">状态：{{branchInfo.state}}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<BottomTab :list="tabList" @updata="getIndex" ref="botTab"></BottomTab>
	</div>
</template>

<script>
	import BottomTab from '@/components/BottomTab.vue'
	export default {
		name: 'Zhdj',
		props: {

		},
		data() {
			return {
				partyList: [],
				partyKey: '',
				partyKey2: '',
				partyCost: 0, //党费缴纳
				partyNum: 0, //党费缴纳人数
				isActive: 0,
				tabList: [{
					hasUrl: false,
					title: '红色课堂'
				}, {
					hasUrl: false,
					title: '牢记使命'
				}, {
					hasUrl: false,
					title: '支部力量'
				}, {
					hasUrl: false,
					title: '红色足迹'
				}],
				redClass: false, // 红色课堂
				showRedClassList: false, //红色课堂坐下列表
				showRedClassInfo: false, //红色课堂详情
				showRedClassHistory: false, //红色历史
				redClassTitle: '', //红色课堂左下角标题
				redClassInfoTitle: '', //红色课堂中间标题
				redClassInfoDetail: '', //红色课堂详情
				redClassTabIndex: 0, //红色课堂概览下标
				redClassList: [], //红色课堂列表
				redClassTab: [{
					num: 2,
					name: '红色宣讲',
					detailTitle: '红色宣讲视频',
					url: 'static/images/red-talk.png'
				},{
					num: 20,
					name: '红色历史',
					detailTitle: '',
					url: 'static/images/red-history.png'
				},{
					num: 18,
					name: '红色百宝箱',
					detailTitle: '详情',
					url: 'static/images/red-case.png'
				},{
					num: 1,
					name: '精选课程',
					detailTitle: '精选课程',
					url: 'static/images/red-course.png'
				},{
					num: 2,
					name: '微视频',
					detailTitle: '微视频详情',
					url: 'static/images/red-video.png'
				}],
				mission: false, //牢记使命
				showMissionList: false, //牢记使命左下列表
				showMissionMoney: false, //牢记使命党费缴纳
				showMissionInfo: false, //牢记使命详情
				missionTitle: '' , //牢记使命左下标题
				missionInfoTitle: '', //牢记使命详情标题
				missionTabIndex: 0, //牢记使命概览下标
				missionList: [], //牢记使命左下列表
				missionInfo: {}, //牢记使命详情
				missionActiveList: ['未开始','进行中'],
				activeIndex: 0,
				missionTab: [{
					num: 25,
					name: '活动预告',
					detailTitle: '活动详情',
					url: 'static/images/mission-active.png'
				},{
					num: 3,
					name: '三会一课主题党建活动',
					detailTitle: '详情',
					url: 'static/images/mission-three.png'
				},{
					num: 18,
					name: '点亮微心愿',
					detailTitle: '',
					url: 'static/images/mission-wish.png'
				},{
					num: 15,
					name: '户居分离党员',
					detailTitle: '党员详情',
					url: 'static/images/mission-separate.png'
				},{
					num: 2,
					name: '党费缴纳',
					detailTitle: '党费缴纳',
					url: 'static/images/mission-money.png'
				},{
					num: 2,
					name: '先锋榜',
					detailTitle: '党员详情',
					url: 'static/images/mission-pioneer.png'
				}],
				branch: false, //支部力量
				showBranchList: false, //支部力量左下列表
				showBranchHonor: false, //支部力量荣誉
				showBranchInfo: false, // 支部力量详情
				branchTitle: '', //支部力量左下标题
				branchInfoTitle: '', //支部力量中间标题
				branchInfo: {}, //支部力量党员详情
				branchTabIndex: 0, //支部力量概览下标
				branchList: [], //支部力量列表
				branchHonor: {}, //支部力量荣誉详情
				branchTab: [
				// 	{
				// 	num: 0,
				// 	name: '党员总数',
				// 	detailTitle: '',
				// 	url: 'static/images/branch-all.png'
				// },
				{
					num: 0,
					name: '发展党员',
					detailTitle: '发展党员详情',
					url: 'static/images/branch-develop.png'
				},{
					num: 0,
					name: '村委两班子',
					detailTitle: '党员详情',
					url: 'static/images/branch-leader.png'
				},{
					num: 0,
					name: '网格党支部',
					detailTitle: '党员详情',
					url: 'static/images/branch-party.png'
				},{
					num: 2,
					name: '荣誉',
					detailTitle: '荣誉详情',
					url: 'static/images/branch-honor.png'
				}],
				branchLeaderList: [{
					name: '王佳丹',
					url: 'static/images/zhs.png',
					post: '支部书记'
				},{
					name: '王佳丹',
					url: 'static/images/zhs.png',
					post: '支部委员'
				},{
					name: '112',
					url: 'static/images/zrs.png',
					post: '党员人数'
				}]
			}
		},
		components: {
			BottomTab
		},
		methods: {
			formatTen(num) {
			  return num > 9 ? (num + "") : ("0" + num);
			},
			formatTime(date) {
			  var date = new Date(date)
			  var year = date.getFullYear();
			  var month = date.getMonth() + 1;
			  var day = date.getDate();
			  var hour = date.getHours();
			  var minute = date.getMinutes();
			  var second = date.getSeconds();
			  return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " " + this.formatTen(hour) + ":" + this.formatTen(minute) +
			    ":" + this.formatTen(second);
			},
			//打开关闭图层
			onOff(type, name) {
				let a = {
					type: type,
					name: name
				}
				this.$parent.test(a);
			},
			offP() {
				this.onOff("关闭图层", "横溪党员")
				this.onOff("关闭图层", "长胜周家港孟家毛岭党员")
				this.onOff("关闭图层", "长胜田央沈长桥头党员")
				this.onOff("关闭图层", "农家乐支部党员")
			},
			getIndex(e) {
				//红色课堂
				if (e == 0) {
					this.offP()
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.redClass = true
					this.mission = false
					this.branch = false
				} else if (e == 1) {
					//牢记使命
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.redClass = false
					this.mission = true
					this.branch = false
				} else if (e == 2) {
					this.offP()
					this.onOff("关闭图层", "红色景点")
					this.onOff("关闭图层", "红色路线")
					this.redClass = false
					this.mission = false
					this.branch = true
				} else if (e == 3) {
					this.offP()
					this.onOff("打开图层", "红色景点")
					this.onOff("打开图层", "红色路线")
					this.redClass = false
					this.mission = false
					this.branch = false
				}
			},
			redClassClick(index) {
				let data = {
					current: 1,
					size: 100
				}
				this.redClassTabIndex = index
				if(index != 3 ) {
					this.showRedClassList = true
					this.showRedClassInfo = false
					this.showRedClassHistory = false
					this.redClassTitle = this.redClassTab[index].name
					this.redClassInfoTitle = this.redClassTab[index].detailTitle
				} else if (index==3){
					this.showRedClassList = false
					this.showRedClassInfo = true
					this.showRedClassHistory = false
					this.redClassInfoTitle = this.redClassTab[index].detailTitle
					this.$ajax.getRedCourse(data).then(res => {
						res.imgList=res.img.split(",")
						this.redClassInfoDetail = res
					})
				}
				if(index==0) {
					data.type = 1
					this.$ajax.getRedClassVideo(data).then(res => {
						this.redClassList = res
					})
				} else if(index==1) {
					this.$ajax.getRedHistoryList(data).then(res => {
						this.redClassList = res.records
					})
				} else if(index==2) {
					this.$ajax.getRedCaseList(data).then(res => {
						this.redClassList = res.records
					})
				} else if(index==4) {
					data.type = 2
					this.$ajax.getRedClassVideo(data).then(res => {
						this.redClassList = res
					})
				}
			},
			redClassListClick(id,index) {
				if(this.redClassTabIndex!=1) {
					this.showRedClassInfo = true
					this.showRedClassHistory = false
				} else if (this.redClassTabIndex==1) {
					this.showRedClassInfo = false
					this.showRedClassHistory = true
					this.$ajax.getRedHistoryDetail({id:id}).then(res => {
						this.redClassInfoDetail = res
					})
				}
				if(this.redClassTabIndex==0||this.redClassTabIndex==4) {
					this.$ajax.getRedClassVideoDetail({id:id}).then(res => {
						this.redClassInfoDetail = res
					})
				} else if (this.redClassTabIndex==2) {
					this.$ajax.getRedCaseDetail({id:id}).then(res => {
						this.redClassInfoDetail = res
					})
				}
			},
			missionClick(index) {
				let data = {
					current: 1,
					size: 100
				}
				this.missionTabIndex = index
				if(index!=4) {
					this.showMissionInfo = false
					this.showMissionMoney = false
					this.showMissionList = true
					this.missionInfoTitle = this.missionTab[index].detailTitle
					if(index==1) {
						this.missionTitle = '三会一课'
					} else {
						this.missionTitle = this.missionTab[index].name
					}
				} else {
					this.getPartyMoney()
					this.missionInfoTitle = this.missionTab[index].detailTitle
					this.showMissionInfo = false
					this.showMissionMoney = true
					this.showMissionList = false
				}
				if(index==0) {
					if(this.activeIndex==0) {
						data.type = 0
						this.$ajax.getActiveList(data).then(res => {
							res.records.forEach(item => {
								item.startTime = item.startTime.substring(0,10)
							})
							this.missionList = res.records
						})
					} else {
						data.type=1
						this.$ajax.getActiveList(data).then(res => {
							res.records.forEach(item => {
								item.startTime = item.startTime.substring(0,10)
							})
							this.missionList = res.records
						})
					}
				} else if (index==1) {
					data.type=2
					this.$ajax.getActiveList(data).then(res => {
						res.records.forEach(item => {
							item.startTime = item.startTime.substring(0,10)
						})
						this.missionList = res.records
					})
				} else if(index==2) {
					this.$ajax.getWishList(data).then(res => {
						this.missionList = res.records
					})
				} else if(index==3) {
					this.$ajax.getSeparateList(data).then(res => {
						this.missionList = res.records
					})
				} else if (index==5) {
					this.$ajax.getTopList(data).then(res => {
						this.missionList = res.records
					})
				}
			},
			chooseActive(index) {
				let data = {
					current: 1,
					size: 100
				}
				this.activeIndex = index
				if(this.activeIndex==0) {
					data.type = 0
					this.$ajax.getActiveList(data).then(res => {
						res.records.forEach(item => {
							item.startTime = item.startTime.substring(0,10)
						})
						this.missionList = res.records
					})
				} else {
					data.type=1
					this.$ajax.getActiveList(data).then(res => {
						res.records.forEach(item => {
							item.startTime = item.startTime.substring(0,10)
						})
						this.missionList = res.records
					})
				}
			},
			missionListClick(item,index) {
				this.showMissionInfo = true
				if(this.missionTabIndex==0||this.missionTabIndex==1) {
					this.$ajax.partyActiveDetail({id:item.id}).then(res => {
						this.missionInfo = res
					})
				} else if (this.missionTabIndex==3) {
					this.$ajax.getPartyMemberDetail({id:item.id}).then(res => {
						this.missionInfo = res
					})
				} else if (this.missionTabIndex==5) {
					this.$ajax.getTopDetail({id:item.id}).then(res => {
						this.missionInfo = res
					})
				}
			},
			branchClick(index) {
				let data = {
					current: 1,
					size: 200
				}
				this.branchTabIndex = index
				this.branchInfoTitle = this.branchTab[index].detailTitle
				// if(index!=0) {
					this.showBranchList = true
					this.showBranchInfo = false
					this.showBranchHonor = false
					this.branchTitle = this.branchTab[index].name
				// } else {
				// 	this.showBranchList = false
				// 	this.showBranchInfo = false
				// 	this.showBranchHonor = false
				// }
				if(index==0) {
					this.$ajax.getDevelopList(data).then(res => {
						this.branchList = res.records
					})
				} else if(index==1) {
					this.$ajax.getLeaderList(data).then(res => {
						this.branchList = res.records
					})
				} else if(index==2) {
					this.$ajax.getPartyList({type:this.partyKey2}).then(res => {
						res.list.forEach(item => {
							item.birthday = item.birthday.substring(0,10)
							item.joinTime = item.joinTime.substring(0,10)
						})
						this.branchLeaderList[0].name=res.boss || '无'
						this.branchLeaderList[1].name=res.wy || '无'
						this.branchLeaderList[2].name=res.num
						this.branchList = res.list
					})
				} else if(index==3) {
					this.$ajax.getHonorList(data).then(res => {
						this.branchList = res.records
					})
				}
			},
			branchListClick(item,index) {
				if(this.branchTabIndex!=3) {
					this.branchInfo = item
					this.showBranchInfo = true
					this.showBranchHonor = false
				} else if(this.branchTabIndex==3) {
					this.showBranchInfo = false
					this.showBranchHonor = true
					this.branchHonor = item
					this.branchHonor.imgList = item.img.split(",")
				}
			},
			getPartyMoney(dept) {
				let data = {
					dept: dept||this.partyKey
				}
				this.$ajax.getPartCost(data).then(res=>{
					this.partyCost = res.cost
					this.partyNum = res.num
				})
			},
			getPartyMember(dept) {
				this.offP()
				if(this.partyKey2==1) {
					this.onOff("打开图层", "横溪党员")
				} else if (this.partyKey2==2) {
					this.onOff("打开图层", "长胜周家港孟家毛岭党员")
				} else if (this.partyKey2==3) {
					this.onOff("打开图层", "长胜田央沈长桥头党员")
				} else if (this.partyKey2==5) {
					this.onOff("打开图层", "农家乐支部党员")
				}
				this.$ajax.getPartyList({type:this.partyKey2}).then(res => {
					res.list.forEach(item => {
						item.birthday = item.birthday.substring(0,10)
						item.joinTime = item.joinTime.substring(0,10)
					})
					this.branchLeaderList[0].name=res.boss || '无'
					this.branchLeaderList[1].name=res.wy || '无'
					this.branchLeaderList[2].name=res.num
					this.branchList = res.list
				})
			}
		},
		mounted() {
			this.redClass = true
			this.$ajax.getDictionary('party').then(res => {
				this.partyList = res
			})
		},
		watch:{
			isActive(val,oVal) {
				this.$refs.botTab.isActive = val
			},
			partyKey(val,oVal) {
				this.getPartyMoney(val)
			},
			partyKey2(val,oVal) {
				this.getPartyMember(val)
			}
		}
	}
</script>

<style scoped lang="less">
	.red-class-left {
		width: 616px;
		position: absolute;
		top: 180px;
		left: 40px;
		.red-class-top {
			width: 616px;
			height: 276px;
			background: url(../bgImages/红色课堂-概览.png) no-repeat;
			background-size: 100% 100%;
			padding: 66px 35px 44px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			div {
				width: 20%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				// justify-content: space-between;
				align-items: center;
				font-size: 20px;
				color: #fff;
				img {
					width: 46px;
					height: 46px;
					margin-bottom: 20px;
				}
				span:first-child {
					font-size: 30px;
				}
			}
		}
		.red-class-bottom {
			width: 516px;
			height: 506px;
			background: url(../bgImages/红色课堂-左下框.png) no-repeat;
			background-size: 100% 100%;
			margin-top: 60px;
			.red-class-title {
				width: 100%;
				padding: 13px 158px;
				box-sizing: border-box;
				text-align: center;
				font-size: 22px;
				color: #F38E93;
			}
			.red-class-list {
				width: 100%;
				max-height: 390px;
				overflow-y: scroll;
				padding: 0 30px;
				margin-top: 30px;
				box-sizing: border-box;
				font-size: 18px;
				color: #fff;
				display: flex;
				flex-direction: column;
				span {
					margin-bottom: 10px;
				}
			}
			.red-class-list2 {
				width: 100%;
				max-height: 390px;
				overflow-y: scroll;
				padding: 0 30px;
				margin-top: 30px;
				box-sizing: border-box;
				font-size: 18px;
				color: #fff;
				display: flex;
				flex-wrap: wrap;
				span {
					width: 25%;
					margin-bottom: 40px;
					text-align: center;
				}
			}
			.red-class-list3 {
				width: 100%;
				max-height: 390px;
				overflow-y: scroll;
				padding: 0 30px;
				margin-top: 30px;
				box-sizing: border-box;
				font-size: 24px;
				color: #fff;
				div {
					width: 416px;
					margin: 0 auto;
					padding: 10px 0;
					display: flex;
					flex-direction: column;
					border-bottom: 1px solid rgba(184,184,184,0.2);
					span:last-child {
						font-size: 20px;
						opacity: .5;
						margin-top: 10px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						word-wrap: break-word;
						/*! autoprefixer: ignore next */
						-webkit-box-orient: vertical;
					}
				}
			}
		}
	}
	
	.red-class-center {
		width: 752px;
		height: 746px;
		background: url(../bgImages/红色课堂-大背景.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		.red-class-title {
			width: 100%;
			padding: 13px 280px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #F38E93;
		}
		.red-class-detail {
			width: 100%;
			max-height: 610px;
			padding: 0 50px;
			box-sizing: border-box;
			margin-top: 50px;
			overflow-y: scroll;
			video {
				width: 650px;
				height: 380px;
				margin: 0 auto;
			}
			.red-class-detail-title {
				display: flex;
				align-items: center;
				font-size: 24px;
				color: #fff;
				margin: 20px 0 10px;
				div {
					width: 6px;
					height: 30px;
					background-color: #EC2C17;
					margin-right: 16px;
				}
			}
			.red-class-detail-cont {
				width: 100%;
				color: #fff !important;
			}
			.red-class-detail-img {
				width: 650px;
			}
		}
	}
	
	.red-class-center2 {
		width: 575px;
		height: 844px;
		background: url(../bgImages/redBg.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 134px;
			height: 134px;
			border: 1px solid #fff;
			border-radius: 50%;
			margin-top: 215px;
		}
		span {
			font-size: 30px;
			color: #fff;
			margin: 20px 0 30px;
		}
		div {
			width: 428px;
			max-height: 370px;
			overflow-y: scroll;
			margin: 0 auto;
			color: #fff;
		}
	}
	
	.mission-left {
		width: 552px;
		position: absolute;
		top: 180px;
		left: 40px;
		.mission-top {
			width: 552px;
			height: 462px;
			background: url(../bgImages/牢记使命-概览.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 66px 35px 44px;
			box-sizing: border-box;
			div {
				width: 33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 20px;
				color: #fff;
				span {
					text-align: center;
				}
				img {
					width: 46px;
					height: 46px;
					margin: 20px 0 10px;
				}
				span:first-child {
					font-size: 30px;
				}
			}
		}
		.mission-bottom {
			width: 502px;
			height: 380px;
			background: url(../bgImages/牢记使命-左下.png) no-repeat;
			background-size: 100% 100%;
			margin-top: 60px;
			.mission-title {
				width: 100%;
				padding: 13px 183px;
				box-sizing: border-box;
				text-align: center;
				font-size: 22px;
				color: #F38E93;
			}
			.mission-list {
				width: 90%;
				max-height: 270px;
				overflow-y: scroll;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				font-size: 18px;
				color: #fff;
				margin-top: 30px;
				.mission-list-title {
					display: flex;
					align-items: center;
					span {
						width: 75%;
						text-align: center;
					}
					span:first-child {
						width: 25%;
					}
				}
				.mission-list-item {
					display: flex;
					align-items: center;
					span {
						width: 25%;
						text-align: center;
						margin-bottom: 10px;
					}
					span:last-child {
						width: 75%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.mission-list2 {
				width: 90%;
				margin: 0 auto;
				overflow-y: scroll;
				font-size: 18px;
				color: #fff;
				margin-top: 30px;
				.mission-list-item {
					display: flex;
					flex-wrap: wrap;
					span {
						width: 25%;
						text-align: center;
						margin-bottom: 10px;
					}
				}
			}
			.mission-list-wish {
				width: 90%;
				margin: 0 auto;
				max-height: 270px;
				overflow-y: scroll;
				display: flex;
				flex-direction: column;
				margin-top: 30px;
				padding-right: 40px;
				box-sizing: border-box;
				.mission-list-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30px;
					div {
						display: flex;
						flex-direction: column;
						font-size: 14px;
						color: #fff;
						span {
							display: flex;
							align-items: center;
						}
						span:first-child {
							font-size: 18px;
						}
						img {
							width: 16px;
							height: 16px;
							margin-right: 4px;
						}
					}
				}
			}
			.mission-list-active {
				display: flex;
				flex-direction: column;
				width: 90%;
				margin: 0 auto;
				margin-top: 30px;
				.mission-list-active-tab {
					display: flex;
					span {
						width: 102px;
						height: 34px;
						border: 1px solid rgba(255,255,255,0.3);
						border-radius: 17px;
						color: #fff;
						font-size: 18px;
						margin-right: 20px;
						line-height: 34px;
						text-align: center;
					}
					.active {
						background-color: #FF0920;
						border: none;
					}
				}
				.mission-list-box {
					display: flex;
					flex-direction: column;
					max-height: 220px;
					margin-top: 10px;
					.mission-list-item {
						font-size: 18px;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: space-between;
						span {
							// overflow: hidden;
							// text-overflow: ellipsis;
							// white-space: nowrap;
							margin-bottom: 10px;
						}
						span:first-child {
							width: 70%;
						}
						span:last-child {
							width: 25%;
						}
					}
				}
			}
		}
	}
	
	
	.mission-center {
		width: 752px;
		height: 746px;
		background: url(../bgImages/牢记使命-大背景.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		.mission-title {
			width: 100%;
			padding: 13px 280px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #F38E93;
		}
		.mission-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 50px;
			.mission-avatar {
				position: relative;
				margin-right: 59px;
				.mission-avatar-img {
					width: 140px;
					height: 140px;
					border-radius: 50%;
					object-fit: cover;
				}
				.mission-avatar-logo {
					width: 41px;
					height: 41px;
					position: absolute;
					bottom: 3px;
					right: 3px;
				}
			}
			.mission-detail {
				width: 70%;
				margin: 0 auto;
				font-size: 18px;
				color: #fff;
			}
		}
		.mission-info-two {
			display: flex;
			flex-direction: column;
			width: 640px;
			margin: 0 auto;
			margin-top: 50px;
			color: #fff;
			font-size: 18px;
			.mission-info-two-top {
				display: flex;
				align-items: flex-start;
				padding-bottom: 20px;
				.mission-avatar {
					position: relative;
					margin-right: 59px;
					.mission-avatar-img {
						width: 140px;
						height: 140px;
						border-radius: 50%;
						object-fit: cover;
					}
					.mission-avatar-logo {
						width: 41px;
						height: 41px;
						position: absolute;
						bottom: 3px;
						right: 3px;
					}
					.mission-detail {
						display: flex;
						flex-direction: column;
						div {
							margin: 10px 0;
						}
					}
				}
			}
			.mission-info-two-bottom {
				padding-top: 20px;
				display: flex;
				flex-direction: column;
				.mission-info-two-bottom-title {
					display: flex;
					align-items: center;
					font-size: 24px;
					div {
						width: 5px;
						height: 21px;
						background-color: #fff;
						margin-right: 10px;
					}
				}
				.mission-info-two-bottom-cont {
					max-height: 260px;
					margin-top: 10px;
				}
			}
		}
		.mission-info-active {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #fff;
			font-size: 18px;
			width: 90%;
			max-height: 660px;
			overflow: scroll;
			margin: 0 auto;
			div {
				width: 100%;
			}
			div:first-child {
				font-size: 26px;
				margin-bottom: 15px;
				text-align: center;
			}
			div:nth-child(2) {
				text-align: center;
			}
		}
	}
	
	.mission-hujufenli {
		height: 543px;
		background: url(../bgImages/户居分离党员.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.mission-center-money {
		width: 752px;
		height: 482px;
		background: url(../bgImages/缴纳党费-背景.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.mission-title {
			width: 100%;
			padding: 13px 280px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #F38E93;
		}
		/deep/ .el-select {
			width: 326px;
			margin-top: 20px;
		}
		/deep/ .el-input__inner {
			color: #fff;
			background-color: transparent;
		}
		.mission-money-bottom {
			display: flex;
			align-items: center;
			margin-top: 50px;
			width: 100%;
			.mission-money-bottom-item {
				width: 50%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 24px;
				color: #fff;
				.mission-money-common {
					width: 167px;
					height: 167px;
					border-radius: 50%;
					border: 20px solid #F39423;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 15px;
					span:first-child {
						font-size: 36px;
						margin-bottom: 10px;
					}
				}
			}
		}
	}
	
	.branch-left {
		width: 616px;
		position: absolute;
		top: 180px;
		left: 40px;
		.branch-top {
			width: 616px;
			height: 226px;
			background: url(../bgImages/支部力量-概览.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 66px 35px 44px;
			box-sizing: border-box;
			div {
				width: 25%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 20px;
				color: #fff;
				img {
					width: 46px;
					height: 46px;
					margin-bottom: 20px;
				}
			}
		}
		.branch-bottom {
			width: 516px;
			height: 557px;
			background: url(../bgImages/支部力量-左下.png) no-repeat;
			background-size: 100% 100%;
			margin-top: 60px;
			.branch-title {
				width: 100%;
				padding: 13px 158px;
				box-sizing: border-box;
				text-align: center;
				font-size: 22px;
				color: #F38E93;
			}
			.branch-honor {
				width: 90%;
				margin: 30px auto;
				display: flex;
				flex-direction: column;
				max-height: 430px;
				overflow-y: scroll;
				padding: 0 30px;
				box-sizing: border-box;
				span {
					font-size: 18px;
					color: #fff;
					margin-bottom: 20px;
				}
			}
			.branch-list {
				width: 90%;
				margin: 20px auto;
				display: flex;
				flex-direction: column;
				color: #fff;
				font-size: 18px;
				/deep/ .el-select {
					width: 326px;
					margin: 0 auto;
				}
				/deep/ .el-input__inner {
					color: #fff;
					background-color: transparent;
				}
				.branch-list-develop {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 22px;
					margin-bottom: 20px;
					div {
						width: 2px;
						height: 24px;
						background-color: rgba(255,255,255,0.2);
						margin: 0 30px;
					}
				}
				.branch-list-info {
					display: flex;
					align-items: center;
					padding: 10px 0;
					border-bottom: 1px solid rgba(179,179,179,0.2);
					div {
						width: 33%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 18px;
						color: #fff;
						img {
							width: 38px;
							height: 38px;
							margin: 10px 0;
						}
						span:first-child {
							font-size: 20px;
						}
					}
				}
				.branch-list-title {
					display: flex;
					align-items: center;
					margin-bottom: 20px;
					span {
						width: 40%;
						text-align: center;
					}
					span:first-child {
						width: 20%;
					}
				}
				.branch-list-box {
					max-height: 380px;
					overflow-y: scroll;
					.branch-list-item {
						display: flex;
						align-items: center;
						span {
							width: 40%;
							text-align: center;
							margin-bottom: 20px;
						}
						span:first-child {
							width: 20%;
						}
					}
				}
			}
		}
	}
	
	.branch-center {
		width: 752px;
		height: 625px;
		background: url(../bgImages/荣誉-背景.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		.branch-title {
			width: 100%;
			padding: 19px 280px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #F38E93;
		}
		.branch-info {
			width: 90%;
			margin: 40px auto;
			display: flex;
			justify-content: center;
			align-items: center;
			.branch-detail-img {
				width: 639px;
				height: 437px;
			}
		}
	}
	
	.branch-center2 {
		width: 752px;
		height: 347px;
		background: url(../bgImages/支部力量-背景.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 220px;
		left: 840px;
		.branch-title {
			width: 100%;
			padding: 13px 280px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #F38E93;
		}
		.branch-info {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50px;
			.branch-avatar {
				position: relative;
				margin-right: 59px;
				.branch-avatar-img {
					width: 140px;
					height: 140px;
					border-radius: 50%;
					object-fit: cover;
				}
				.branch-avatar-logo {
					width: 41px;
					height: 41px;
					position: absolute;
					bottom: 3px;
					right: 3px;
				}
			}
			.branch-detail {
				display: flex;
				flex-direction: column;
				font-size: 18px;
				color: #fff;
				span {
					margin-bottom: 15px;
				}
			}
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
