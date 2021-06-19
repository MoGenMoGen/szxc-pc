<template>
	<div>
		<transition name="fade">
			<div class="pop-box" v-show="show">
				<div class="pop-common sttj">
					<div class="pop-title"><span>山塘统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>山塘名称</span>
						<span>总容积 <span style="font-size: 14px;">(万m³)</span></span>
						<span>积雨面积 <span style="font-size: 14px;">(km²)</span></span>
					</div>
					<div v-for="(item,index) in stList" :key='index' class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.capacity }}</span>
						<span>{{ item.volume }}</span>
					</div>
				</div>
				<div class="pop-common sktj">
					<div class="pop-title"><span>水库统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>水库名称</span>
						<span>库容 <span style="font-size: 14px;">(万m³)</span></span>
						<span>积雨面积 <span style="font-size: 14px;">(km²)</span></span>
					</div>
					<div v-for="(item,index) in skList" :key='index' class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.capacity }}</span>
						<span>{{ item.volume }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="show2">
				<img src="static/images/bg.png"
					style="position: absolute;top: 400px;left: 640px;z-index: 1000;width: 903px;height: 349px;"
					@click="showWg">
			</div>
		</transition>
		<transition name="fade">
			<div v-show="show8">
				<div class="pop-common pop-list">
					<div class="pop-title"><span>垃圾分类</span></div>
					<div class="pop-inner-title">
						<span style="width: 100%;text-align: left;">点位名称</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in ljflList" :key='index' class="pop-inner-item">
							<span style="width: 100%;text-align: left;">{{ item.name }}</span>
						</div>
					</div>
				</div>
				<div class="pop-common pop-list" style="top: 620px;">
					<div class="pop-title"><span>乡村关爱</span></div>
					<div class="pop-inner-title">
						<span>姓名</span>
						<span>类别</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in xcgaList" :key='index' class="pop-inner-item">
							<span>{{ item.name }}</span>
							<span>{{ item.type }}</span>
						</div>
					</div>
				</div>
				<div class="pop-top">
					<div class="pop-top-content">
						<div v-for="(item,index) in wgList" :key="index" class="pop-top-item">
							<span>{{item.num}}</span>
							<img :src="item.url">
							<span>{{item.title}}</span>
						</div>
					</div>
				</div>
<!--				<div class="monitorBox"></div>-->
			</div>
		</transition>
		<!-- <transition name="fade">
      <div class="xcga" v-show="show4">
        <div class="xcga-title"><span>乡村关爱</span></div>
        <div class="content">
          <div v-for="(item,index) in xcgaList" :key="index" class="item">
            <span>{{ item.num }}</span>
            <img :src="item.url">
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="xcga-tab" v-show="show4">
        <div v-for="(item,index) in xcgaList" :key="index" class="item" @click="toMap(item)">
          <img :src="item.url">
        </div>
      </div>
    </transition> -->
		<!-- <transition name="fade">
			<div class="pop-box" v-show="show5"> -->
				<!-- <div class="pop-common fns">
					<div class="pop-title"><span>报警统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>水库名称</span>
						<span>报警次数</span>
					</div>
					<div v-for="(item,index) in fnsList" :key='index' class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span :style="{color:item.capacity>=15?'#D00E00':''}">{{ item.capacity }}</span>
					</div>
				</div> -->
				<!--        <hik v-if="hikShow" ref="videoPlayer"  :playMode="1"></hik>-->
			<!-- </div> -->
		<!-- </transition> -->
		<transition name="fade">
			<div class="pop-common pop-list" v-show="show4">
				<div class="pop-title"><span>商家统计</span></div>
				<div class="pop-inner-title">
					<span>序号</span>
					<span>商家名称</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in qyList" :key='index' class="pop-inner-item">
						<span>{{ index+1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-list" v-show="show5">
				<div class="pop-title"><span>执法设备</span></div>
				<div class="pop-inner-title">
					<span>设备名称</span>
					<span>负责区域</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in jkList" :key='index' class="pop-inner-item">
						<span>{{ item.name }}</span>
						<span>{{ item.area }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<PopBox :list="list" v-show='show7' @updata="getPopIndex"></PopBox>
		</transition>
		<transition name="fade">
			<div class="pop-common pop-wf" v-show="show9">
				<div class="pop-title"><span>危房统计</span></div>
				<div class="pop-wf-title">
					<span>序号</span>
					<span>行政村</span>
					<span>户主姓名</span>
					<span>建造年代</span>
				</div>
				<div class="pop-wf-box">
					<div v-for="(item,index) in wfList" :key='index' class="pop-wf-item">
						<span>{{ index+1 }}</span>
						<span>{{ item.area }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.time }}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="pop-common srjf" v-show="show10">
				<div class="pop-title"><span>私人建房统计</span></div>
				<div class="srjf-title">
					<span>序号</span>
					<span>户主姓名</span>
					<span>户内人口</span>
					<span>原有宅基地房屋处置方式</span>
					<span>新申请用地面积</span>
					<span>预选建房地址</span>
					<span>办理进展情况</span>
					<span>优先排序</span>
				</div>
				<div class="srjf-item" v-for="(item, index) in srjfList" :key="index">
					<span>{{index+1}}</span>
					<span>{{item.name}}</span>
					<span>{{item.num}}</span>
					<span>{{item.solve}}</span>
					<span>{{item.newArea}}</span>
					<span>{{item.newArea}}</span>
					<span>{{item.schedule}}</span>
					<span>{{item.sort}}</span>
				</div>
			</div>
		</transition>
    <hik :cameraIndexCode="cType"  ref="videoPlayer"  :playMode="1"></hik>

		<transition name="fade">
			<img src="static/images/sgptBg.png" @click="onShowP" style="height: 1124px;width: 2236px;margin-top: 100px"
				v-show="show6">
		</transition>
		<div class="sj-pop" v-if="showP">
			<img src="static/images/cancel.png" class="cancelLogo" @click="showP=false">
			<div class="sj-pop-title"><span>{{ title }}</span></div>
			<div class="sj-pop-info">
				<span style="width: 10%;">事件编号</span>
				<span style="width: 20%;">内容</span>
				<span style="width: 10%;">地址</span>
				<span style="width: 10%;">问题类型</span>
				<span style="width: 10%;">时间分类</span>
				<span style="width: 10%;">上报时间</span>
				<span style="width: 10%;">职能科室/部门</span>
				<span style="width: 10%;">办结时间</span>
				<span style="width: 10%;">是否超时关闭</span>
			</div>
			<div v-for="(item,index) in sjs" :key="index" class="sj-pop-item">
				<span style="width: 10%;">{{ item.id }}</span>
				<span style="width: 20%;">{{ item.content }}</span>
				<span style="width: 10%;">{{ item.add }}</span>
				<span style="width: 10%;">{{ item.type }}</span>
				<span style="width: 10%;">{{ item.timeType }}</span>
				<span style="width: 10%;">{{ item.reportTime }}</span>
				<span style="width: 10%;">{{ item.department }}</span>
				<span style="width: 10%;">{{ item.overTime }}</span>
				<span style="width: 10%;">{{ item.timeOut }}</span>
			</div>
		</div>

		<!--    <el-button style="margin-top: 600px;margin-left: 100px" type="primary" @click="hikShow = true">主要按钮</el-button>
    <el-button style="margin-top: 600px;margin-left: 100px"  @click="offHik">主要按钮</el-button> -->



		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	import hik from '@/components/hik'
	//import xcFive from '@/components/xc_five.json'
	export default {
		name: 'Jczl',
		props: {},
		data() {
			return {
			  cType:"3",
				hikShow: false,
				fiveList: [],
				title: '',
				imgIndex: 0,
				imgShow: false,
				showP: false,
				show: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,
				show7: false,
				show8: false,
				show9: false,
				show10: false,
				list: [{
					num: 5,
					url: 'static/images/srjf.png',
					title: '私人建房'
				}, {
					num: 2,
					url: 'static/images/wfsl.png',
					title: '危房数量'
				}],
				wgList: [{
					num: '张某某',
					url: 'static/images/zhs.png',
					title: '网格长'
				}, {
					num: 60,
					url: 'static/images/house.png',
					title: '户数'
				}, {
					num: 120,
					url: 'static/images/zrs.png',
					title: '人数'
				}, {
					num: 20,
					url: 'static/images/dys.png',
					title: '党员数'
				}],
				// xcgaList: [{
				//   num: 200,
				//   url: 'static/images/jzry.png',
				//   title: '矫正人员'
				// }, {
				//   num: 200,
				//   url: 'static/images/dbh.png',
				//   title: '低保家庭'
				// }, {
				//   num: 200,
				//   url: 'static/images/lnr.png',
				//   title: '老年人'
				// }, {
				//   num: 200,
				//   url: 'static/images/czr.png',
				//   title: '残障人员'
				// }, {
				//   num: 200,
				//   url: 'static/images/jstsjt.png',
				//   title: '计生特殊家庭'
				// }, {
				//   num: 200,
				//   url: 'static/images/wbh.png',
				//   title: '五保户'
				// }],
				xcgaList: [{
					name: '应瑞根',
					type: '普通',
				}, {
					name: '傅正虎',
					type: '普通',
				}, {
					name: '沈振兴',
					type: '普通',
				}, {
					name: '何巧儿',
					type: '普通',
				}, {
					name: '沈立琴',
					type: '单人户低保',
				}, {
					name: '王世辉',
					type: '单人户低保',
				}],
				ljflList: [{
					name: '横溪垃圾桶1'
				}, {
					name: '横溪垃圾桶2'
				}, {
					name: '横溪垃圾桶3'
				}, {
					name: '横溪垃圾桶4'
				}, {
					name: '横溪垃圾桶5'
				}, {
					name: '长胜垃圾桶1'
				}, {
					name: '长胜垃圾桶2'
				}, {
					name: '长胜垃圾桶3'
				}],
				tabList: [{
						hasUrl: false,
						title: '山塘水库'
					}, {
						hasUrl: false,
						title: '网格管理'
					}, {
						hasUrl: false,
						title: '四个平台'
					}, {
						hasUrl: false,
						title: '综合监管'
					}, {
						hasUrl: false,
						title: '线上监管'
					}, {
						hasUrl: false,
						title: '房屋管理'
					}, {
						hasUrl: false,
						title: '地质灾害防范点'
					}
					// , {
					//      hasUrl: false,
					//      title: '四个平台'
					//    }, {
					//      hasUrl: false,
					//      title: '防溺水'
					//    }, {
					//      hasUrl: false,
					//      title: '线上执法'
					//    },
				],
				stList: [{
					name: '石英坎山塘',
					capacity: 2.21,
					volume: 0.86,
				}, {
					name: '浦沙岙山塘',
					capacity: 5.41,
					volume: 0.34,
				}, {
					name: '三八山塘',
					capacity: 1.67,
					volume: 0.53,
				}, {
					name: '百步山塘',
					capacity: 0.795,
					volume: 0.10,
				}, {
					name: '孟家山塘',
					capacity: 0.466,
					volume: 0.15,
				}, {
					name: '史家岙山塘',
					capacity: 0.46,
					volume: 0.15,
				}, {
					name: '毛岭山塘',
					capacity: 0.3,
					volume: 0.02,
				}],
				skList: [{
					name: '劈开猪头',
					capacity: 10.84,
					volume: 1.89,
				}, {
					name: '杨家',
					capacity: 5.23,
					volume: 0.33,
				}, {
					name: '蔡家岙',
					capacity: 2.21,
					volume: 0.09,
				}, {
					name: '安基墩',
					capacity: 6.61,
					volume: 0.4,
				}, {
					name: '石英坎',
					capacity: 2.21,
					volume: 0.86,
				}, {
					name: '三八',
					capacity: 1.67,
					volume: 0.53,
				}, {
					name: '应家',
					capacity: 1.14,
					volume: 0.13,
				}],
				fnsList: [{
					name: '劈开猪头',
					capacity: 0
				}, {
					name: '杨家',
					capacity: 0
				}, {
					name: '蔡家岙',
					capacity: 0
				}, {
					name: '石英坎',
					capacity: 0
				}, {
					name: '三八',
					capacity: 0
				}, {
					name: '应家',
					capacity: 0
				}],
				sjs: [],
				sjList: [{
					id: 'JLW202106110301',
					content: '走访低保户姚国庆家庭，了解日常生活情况',
					add: '杜郭',
					type: '困难救助',
					timeType: '网格关闭',
					reportTime: '2021/6/11 9:19:59',
					department: '杜郭',
					overTime: '2021/6/11 9:19:59',
					timeOut: '否'
				}, {
					id: 'JLW202106110005',
					content: '在端午节到来之际，计生协走访慰问特殊家庭，为他们送去粽子和水杯。',
					add: '长宏村',
					type: '困难救助',
					timeType: '网格关闭',
					reportTime: '2021/6/11 9:00:28',
					department: '长宏村',
					overTime: '2021/6/11 9:00:28',
					timeOut: '否'
				}, {
					id: 'JLW202106110004',
					content: '思源社区东西北街网格内看望困难独居老人，聊天谈心，送上端午慰问品。',
					add: '思源社区北街29号景宝玉家中。',
					type: '困难救助',
					timeType: '网格关闭',
					reportTime: '2021/6/11 8:55:35',
					department: '思源社区',
					overTime: '2021/6/11 08:55:35',
					timeOut: '否'
				}, {
					id: 'JLW202106110003',
					content: '西经堂村汪家网格汪家小燕子幼儿园（甬惠批发）检查食品安全。',
					add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/11 8:28:04',
					department: '西经堂村',
					overTime: '2021/6/11 8:28:04',
					timeOut: '否'
				}, {
					id: 'JLW202106110201',
					content: '西经堂村汪家网格走访农贸市场陈义民店检查食品安全。',
					add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/11 8:24:56',
					department: '西经堂村',
					overTime: '2021/6/11 8:24:56',
					timeOut: '否'
				}, {
					id: 'JLW202106110101',
					content: '西严老年活动中心北面两根雨水管道破裂，导致路面积水',
					add: '浙江省宁波市镇海区九龙湖镇西严中漕头',
					type: '城市管理',
					timeType: '网格关闭',
					reportTime: '2021/6/11 8:24:39',
					department: '西严村',
					overTime: '2021/6/11 8:24:39',
					timeOut: '否'
				}, {
					id: 'JLW202106110002',
					content: '西经堂村汪家网格网格长走访农贸市场店铺检查食品安全。',
					add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/11 8:15:41',
					department: '西经堂村',
					overTime: '2021/6/11 8:15:41',
					timeOut: '否'
				}, {
					id: 'JLW202106110001',
					content: '西经堂村汪家网格网格长走访加贝（兆辉）超市检查超市食品安全。',
					add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/11 8:12:19',
					department: '西经堂村',
					overTime: '2021/6/11 8:12:19',
					timeOut: '否'
				}, {
					id: 'JLW202106100106',
					content: '黄杨网格对宁波市镇海区九龙湖四珍副食店内进行食品安全巡查走访。',
					add: '浙江省宁波市镇海区九龙湖镇长石村社区卫生服务工作室长石小学',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/10 20:48:17',
					department: '长石村',
					overTime: '2021/6/10 20:48:17',
					timeOut: '否'
				}, {
					id: 'JLW202106100105',
					content: '九龙家苑四期南垃圾点位有垃圾包乱堆放现象',
					add: '浙江省宁波市镇海区九龙湖镇九龙家苑四期南',
					type: '其他',
					timeType: '网格关闭',
					reportTime: '2021/6/10 16:23:37',
					department: '龙源社区',
					overTime: '2021/6/10 16:23:37',
					timeOut: '否'
				}, {
					id: 'JLW202106100210',
					content: '西严网格老年活动中心墙面掉落维修',
					add: '浙江省宁波市镇海区九龙湖镇西严村中漕头',
					type: '城市管理',
					timeType: '网格关闭',
					reportTime: '2021/6/10 16:15:40',
					department: '西严村',
					overTime: '2021/6/10 16:15:40',
					timeOut: '否'
				}, {
					id: 'JLW202106100209',
					content: '西严网格前漕头小店食品安全检查',
					add: '浙江省宁波市镇海区九龙湖镇西严村前漕头',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/10 16:12:17',
					department: '西严村',
					overTime: '2021/6/10 16:12:17',
					timeOut: '否'
				}, {
					id: 'JLW202106100007',
					content: '西严网格中漕头小店食品安全检查',
					add: '浙江省宁波市镇海区九龙湖镇西严村中漕头',
					type: '食药安全',
					timeType: '网格关闭',
					reportTime: '2021/6/10 16:10:53',
					department: '西严村',
					overTime: '2021/6/10 16:10:53',
					timeOut: '否'
				}, {
					id: 'JLW202106100208',
					content: '长邱路路口徐王段绿化阻挡视线修剪',
					add: '浙江省宁波市镇海区九龙湖镇徐王徐家库',
					type: '交通安全',
					timeType: '网格关闭',
					reportTime: '2021/6/10 16:08:10',
					department: '徐王',
					overTime: '2021/6/10 16:08:10',
					timeOut: '否'
				}, {
					id: 'JLW202106100305',
					content: '14：30左右，西河工业区网格合鑫公司攻丝车间因风扇引起小火灾',
					add: '浙江省宁波市镇海区九龙湖镇西河村村民委员会',
					type: '消防安全',
					timeType: '网格关闭',
					reportTime: '2021/6/10 15:27:48',
					department: '西河村',
					overTime: '2021/6/10 15:27:48',
					timeOut: '否'
				}, {
					id: 'JLW202106100006',
					content: '组织调解重复上访户周小毛有关拆迁相关事宜',
					add: '浙江省宁波市镇海区九龙湖镇王岙巷九龙家苑',
					type: '信访维稳',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:44:40',
					department: '王岙巷',
					overTime: '2021/6/10 14:44:40',
					timeOut: '否'
				}, {
					id: 'JLW202106100207',
					content: '对网格内村民进行防诈骗入户宣传',
					add: '河头村',
					type: '文教体育',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:41:59',
					department: '河头村',
					overTime: '2021/6/10 14:41:59',
					timeOut: '否'
				}, {
					id: 'JLW202106100104',
					content: '河头村党总支建党百年祝福视频拍摄',
					add: '河头村',
					type: '党群工作',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:38:27',
					department: '河头村',
					overTime: '2021/6/10 14:38:27',
					timeOut: '否'
				}, {
					id: 'JLW202106100206',
					content: '反电信网络诈骗宣传，恒大西苑8号楼入户宣传防范电信网络诈骗，让居民做好家庭成员的宣传承诺签字',
					add: '浙江省宁波市镇海区九龙湖镇恒大西苑8幢',
					type: '专项拉练',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:31:49',
					department: '恒大西苑',
					overTime: '2021/6/10 14:31:49',
					timeOut: '否'
				}, {
					id: 'JLW202106100005',
					content: '走访看望王家网格瘫痪在床老人',
					add: '九龙湖镇杜夹岙村',
					type: '城市管理',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:26:10',
					department: '杜夹岙村',
					overTime: '2021/6/10 14:26:10',
					timeOut: '否'
				}, {
					id: 'JLW202106100205',
					content: '镇海区九龙湖谷峰副食品店食品安全检查',
					add: '浙江省宁波市镇海区九龙湖镇',
					type: '城市管理',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:26:10',
					department: '九龙湖镇',
					overTime: '2021/6/10 14:26:10',
					timeOut: '否'
				}, {
					id: 'JLW202106100601',
					content: '公司要搬到宁波去，即使有厂车接送，工人也不肯前往，要求赔偿金。',
					add: '镇矛调大厅',
					type: '矛调来访',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:26:10',
					department: '九龙湖镇',
					overTime: '2021/6/10 14:26:10',
					timeOut: '否'
				}, {
					id: 'JLW202106100501',
					content: '2019年3月张承怀受包工头所雇到恒大明苑5号楼201室做装饰工，共欠工资1500元，已付400元，还欠工资1100元，至今未付，申请调解。',
					add: '镇矛调大厅',
					type: '矛调来访',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:10:02',
					department: '九龙湖镇',
					overTime: '2021/6/10 14:10:02',
					timeOut: '否'
				}, {
					id: 'JLW202106100004',
					content: '小陈店网格村民沈露家旁边有大堆树枝',
					add: '浙江省宁波市镇海区九龙湖镇',
					type: '城市管理',
					timeType: '网格关闭',
					reportTime: '2021/6/10 14:09:05',
					department: '九龙湖镇',
					overTime: '2021/6/10 14:09:05',
					timeOut: '否'
				}],
				sjList3: [{
					id: 'JLW202106090202',
					content: '姚江东排南支线西河村段河面有油污水草',
					add: '大严',
					type: '农林水利',
					timeType: '网格关闭',
					reportTime: '2021/6/9 8:28:56',
					department: '镇海区九龙湖镇农业服务中心',
					overTime: '2021/6/10 10:27:26',
					timeOut: '否'
				}, {
					id: 'JLW202106090301',
					content: '孙陆工业区内（宁波永新光学有限公司）门口马路一侧成排大型货车日夜停放，对来往的机动车与非机动车行人出行，造成一定的交通隐患，请上级部门及时处理。',
					add: '浙江省宁波市镇海区九龙湖镇长石村社区卫生服务工作室',
					type: '交通安全',
					timeType: '镇街科室办结',
					reportTime: '2021/6/9 8:27:39',
					department: '镇海区九龙湖镇交警',
					overTime: '2021/6/9 15:18:24',
					timeOut: '否'
				}, {
					id: 'JLW202106080102',
					content: '长石村孙陆工业区（垃圾中转站旁边），马路上窨井盖严重破损，造成机动车与行人出行存在一定的安全隐患，请上级部门及时处理。',
					add: '浙江省宁波市镇海区九龙湖镇长石村长石小学',
					type: '城市管理',
					timeType: '网格关闭',
					reportTime: '2021/6/8 8:23:52',
					department: '镇海区九龙湖镇城建管理服务中心',
					overTime: '2021/6/8 15:18:48',
					timeOut: '否'
				}, {
					id: 'JLW202106070104',
					content: '明苑一期居民由于物业迟迟不解决楼道瓷砖问题，而物业在没有解决问题的情况下催缴物业费，导致部分居民不满，可能有信访倾向。',
					add: '明苑一期1栋居民',
					type: '信访维稳',
					timeType: '网格关闭',
					reportTime: '2021/6/7 16:02:41',
					department: '镇海区九龙湖镇综治办',
					overTime: '2021/6/8 8:40:19',
					timeOut: '否'
				}, {
					id: 'JLW202106070404',
					content: '因两业主车位的停车问题引起纠纷。',
					add: '九龙湖镇恒大明苑地下停车场',
					type: '矛盾纠纷',
					timeType: '网格关闭',
					reportTime: '2021/6/7 14:41:00',
					department: '镇海区九龙湖镇综治办',
					overTime: '2021/6/8 8:40:14',
					timeOut: '否'
				}],
				sjList2: [{
					id: 'JLW202106110202',
					content: '思源社区东街59-6号，居民家门口路面污水井盖破损，需要更换。',
					add: '镇海区九龙湖镇思源社区东街59-6号居民家门口路面。',
					type: '城市管理',
					timeType: '网格上报',
					reportTime: '2021/6/11 8:51:23',
					department: '思源社区',
					overTime: '2021/6/11 8:51:23',
					timeOut: '否'
				}],
				jkList: [{
					name: '九龙湖村执法001',
					area: '长胜'
				}, {
					name: '九龙湖村执法002',
					area: '横溪'
				}],
				qyList: [{
					name: '龙居农家乐'
				},{
					name: '月波农家菜馆'
				},{
					name: '横溪人家'
				},{
					name: '龙源农家乐'
				},{
					name: '向石头农家乐'
				}],
				wfList: [{
					name: '陈雪宝',
					area: '九龙湖村',
					time: '1949年以前'
				},{
					name: '沈红雷',
					area: '九龙湖村',
					time: '1960-1969年'
				}],
				srjfList: [{
					name: '周国栋',
					num: 3,
					solve: '拆除',
					newArea: 100,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '困难户'
				},{
					name: '邱世云',
					num: 3,
					solve: '无',
					newArea: 80,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '无房户'
				},{
					name: '叶敏华',
					num: 4,
					solve: '无',
					newArea: 120,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '无房户'
				},{
					name: '项舜',
					num: 1,
					solve: '无',
					newArea: 80,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '无房户'
				},{
					name: '陈雪宝',
					num: 2,
					solve: '村集体回购',
					newArea: 48,
					newAdd: '村庄集镇规划区',
					schedule: '计划申请',
					sort: '危房户'
				}]
			}
		},
		components: {
			PopBox,
			BottomTab,
			hik

		},
		mounted() {
			//console.log(xcFive)
			// this.fiveList = xcFive.RECORDS
			//console.log(this.fiveList)
			this.show = true

		},
		methods: {
			offHik() {
				this.$refs.videoPlayer.off()
			},
			toMap(item) {
				this.$parent.test();
				console.log(item)
			},

			onShowP(e) {
				//一级
				if (e.x < 700) {
					this.sjs = this.sjList;
					this.title = '一级事件'
				}
				//二级
				if (e.x > 700 && e.x < 1000) {
					this.sjs = this.sjList2;
					this.title = '二级事件'
				}
				//三级
				if (e.x > 1000) {
					this.sjs = this.sjList3;
					this.title = '三级事件'
				}
				this.showP = true
			},
			getIndex(e) {
				// if (e == 0) {
				//   // 三资管理
				//   this.show2 = true
				//   this.show = false
				//   this.show3 = false
				//   this.show4 = false
				//   this.show5 = false
				//   this.show6 = false
				//   this.show7 = false
				//   this.getSzglData()
				// } else
				if (e == 0) {
					// 水库管理
          this.offHik()
					this.show2 = false
					this.show3 = false
					this.show = true
					this.show4 = false
					this.show5 = false
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
				} else if (e == 1) {
					// 网格管理
          this.offHik()
          this.$parent.test("网格");
					this.show2 = true
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
				} else if (e == 2) {
					// 4个平台
          this.offHik()

					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.show6 = true
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
				} else if (e == 3) {
					// 5+X
          this.$refs.videoPlayer.off()
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = true
					this.show5 = false
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
				} else if (e == 4) {
					// 线上执法
					this.offHik()
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = true
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
          // this.hikShow = true
          this.cType = "1"
          this.$refs.videoPlayer.initPlugin()


					// let {href} = this.$router.resolve({path:'/Sgpt',params:{type: 1}})
					// window.open(href, '_blank')

				} else if (e==5) {
					// 危房管理
          this.offHik()
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.show6 = false
					this.show7 = true
					this.show8 = false
					this.show9 = true
					this.show10 = false
				} else if (e == 6) {
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
				}
				// else if (e == 6) {
				//      // 防溺水
				//      this.show6 = false
				//      // this.show2 = false
				//      this.show = false
				//      this.show3 = false
				//      this.show4 = false
				//      this.show5 = true
				//    }
			},
			showImg(e) {
				this.imgShow = true
				this.imgIndex = e
			},
			close() {
				this.imgShow = false
			},
			showWg(e) {
				this.show8 = true
        this.hikShow = true
        this.$refs.videoPlayer.off()
        this.cType = "0"
        this.$refs.videoPlayer.initPlugin()
        // this.$refs.videoPlayer.show()
			},
			getPopIndex(e) {
				if(e == 0) {
					this.show9 = false
					this.show10 = true
				} else {
					this.show9 = true
					this.show10 = false
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.pop-box {
		.content {
			.item {
				width: 50%;
			}
		}
	}
	
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
		max-height: 380px;
	}

	.pop-list {
		position: absolute;
		top: 200px;
		left: 35px;

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span {
				text-align: center;
				width: 50%;
			}

			span:last-child {
				text-align: center;
				width: 50%;
			}
		}

		.pop-inner-box {
			max-height: 350px;
			overflow-y: auto;

			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span {
					text-align: center;
					width: 50%;
				}

				span:last-child {
					font-size: 18px;
				}
			}
		}
	}

	.pop-box {
		position: absolute;
		top: 200px;
		left: 35px;
	}
	
	

	.sttj, .sktj {
		margin-bottom: 60px;
		.pop-inner-title {
			width: 90%;
			margin: 5px auto;
			display: flex;
			align-items: center;
		
			span {
				width: 30%;
				text-align: center;
				font-size: 19px;
			}
			
			span:first-child {
				width: 10%;
			}
		}
		.pop-inner-item {
			width: 90%;
			margin: 5px auto;
			display: flex;
			align-items: center;
		
			span {
				width: 30%;
				text-align: center;
				font-size: 18px;
			}
			span:first-child {
				width: 10%;
			}
		
			span:nth-child(2) {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		
			span:nth-child(3) {
				font-size: 22px;
			}
			
			span:last-child {
				font-size: 22px;
			}
		}
	}

	.sktj {
		margin-bottom: 0;
	}

	.pop-inner-title {
		width: 90%;
		margin: 5px auto;
		display: flex;
		align-items: center;

		span {
			width: 30%;
			text-align: center;
			font-size: 19px;
		}
	}

	.pop-inner-item {
		width: 90%;
		margin: 5px auto;
		display: flex;
		align-items: center;

		span {
			width: 30%;
			text-align: center;
			font-size: 18px;
		}

		span:nth-child(2) {
			width: 40%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		
		span:last-child {
			font-size: 22px;
		}
	}

	.pop-wf {
		position: absolute;
		top: 500px;
		left: 35px;
		.pop-wf-title {
			width: 90%;
			margin: 5px auto;
			display: flex;
			align-items: center;
			font-size: 19px;
			span {
				width: 27%;
				text-align: center;
			}
			span:first-child {
				width: 19%;
			}
		}
		.pop-wf-box {
			.pop-wf-item {
				width: 90%;
				margin: 5px auto;
				display: flex;
				align-items: center;
				font-size: 18px;
				span {
					width: 27%;
					text-align: center;
				}
				span:first-child {
					width: 19%;
				}
			}
		}
	}

	.xcga {
		width: 680px;
		// height: 270px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 35px;
		z-index: 1998;

		.xcga-title {
			width: 620px;
			height: 30px;
			background: url(../../public/static/images/lineL.png) no-repeat;
			font-size: 20px;
			padding: 0 20px;
			margin: 0 auto;
			box-sizing: border-box;

			span {
				margin-left: 20px;
			}
		}

		.content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32px;
			margin-top: 30px;

			.item {
				width: 16.7%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				img {
					// width: 38px;
					// height: 38px;
					margin: 20px 0;
				}

				span:last-child {
					font-size: 18px;
				}
			}
		}
	}

	.xcga-tab {
		position: absolute;
		bottom: 60px;
		left: 35px;
		display: flex;
		flex-direction: column;

		.item {
			width: 80px;
			height: 80px;
			cursor: pointer;
			margin-bottom: 10px;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.fns {
		position: absolute;

		.pop-inner-item {
			span:last-child {
				font-size: 24px;
			}
		}
	}

	.pop-top {
		width: 520px;
		// height: 270px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
		position: absolute;
		top: 150px;
		left: 860px;

		.pop-top-content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30px;

			.pop-top-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				img {
					// width: 38px;
					// height: 38px;
					margin: 10px 0;
				}

				span:last-child {
					font-size: 20px;
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

	.sj-pop {

		width: 1200px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
		max-height: 700px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.sj-pop-title {
			width: 1160px;
			//background: url(../public/static/images/line.png) no-repeat;
			background-size: 100% 100%;
			font-size: 20px;
			padding: 0 20px;
			margin: 0 auto;
			box-sizing: border-box;

			span {
				margin-left: 60px;
			}
		}

		.sj-pop-info {
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: center;
		}

		.sj-pop-item {
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			// align-items: center;
			text-align: center;
		}

		.cancelLogo {
			position: absolute;
			top: -20px;
			right: -20px;
		}

	}

	.monitorBox {
		width: 550px;
		height: 420px;
		position: absolute;
		top: 200px;
		right: 35px;
		border-radius: 10px;
		border: 2px solid #fff;
		z-index: 1000;
	}
	
	.srjf {
		position: absolute;
		width: 1450px;
		top: 200px;
		left: 630px;
		.pop-title {
			width: 1420px;
			background: url(../../public/static/images/lineBL.png);
		}
		.srjf-title {
			display: flex;
			align-items: center;
			span {
				margin: 5px 0;
				text-align: center;
				flex: 1;
				font-size: 18px;
			}
			span:nth-child(4) {
				flex: 2;
			}
		}
		.srjf-item {
			display: flex;
			align-items: center;
			span {
				margin: 5px 0;
				text-align: center;
				flex: 1;
				font-size: 18px;
			}
			span:nth-child(4) {
				flex: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
