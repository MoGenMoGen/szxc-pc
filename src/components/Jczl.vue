<template>
	<div>
		<transition name="fade">
			<div class="pop-box" v-show="show">
				<div class="pop-common sttj">
					<div class="pop-title"><span>山塘水库</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>山塘名称</span>
						<span>总容积 <span style="font-size: 14px;">(万m³)</span></span>
						<span>积雨面积 <span style="font-size: 14px;">(km²)</span></span>
					</div>
					<div v-for="(item,index) in stList" :key='index' @click="toFns(item)" class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.capacity }}</span>
						<span>{{ item.volume }}</span>
					</div>
				</div>
				<!-- <div class="pop-common sktj">
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
				</div> -->
				<div class="pop-common sktj">
					<div class="pop-title" style="display: flex;justify-content: space-between;">
						<span>防溺水监控</span>
						<span style="margin-right: 40px;cursor: pointer;" @click="showVideoBox">示例</span>
					</div>
					<div class="pop-inner-title">
						<span style="flex: 1;">序号</span>
						<span style="flex: 2;">点位名称</span>
						<span style="flex: 2;">所属水库</span>
					</div>
					<div style="overflow-y: auto;">
						<div v-for="(item,index) in fnsList" :key='index' class="pop-inner-item" @click="toFns(item)">
							<span style="flex: 1;">{{ index + 1 }}</span>
							<span style="flex: 2;">{{ item.name }}</span>
							<span style="flex: 2;">{{ item.area }}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div class="videoClass" v-if="showVideo">
			<video :src="videoUrl" autoplay="autoplay" loop="loop"></video>
			<img src="static/images/cancel.png" class="cancelVideo" @click="closeVideo">
		</div>
		<transition name="fade">
			<div v-show="show2">
				<img src="static/images/bg.png"
					style="position: absolute;top: 0;left: 0;z-index: 1000;width: 100%;height: 100%;"
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
						<div v-for="(item,index) in ljflList" :key='index' class="pop-inner-item" @click="toMap(item)">
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
		 <transition name="fade">
      <!-- <div class="xcga" v-show="show4">
        <div class="xcga-title"><span>乡村关爱</span></div>
        <div class="content">
          <div v-for="(item,index) in xcgaList" :key="index" class="item">
            <span>{{ item.num }}</span>
            <img :src="item.url">
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div> -->
    </transition>
    <!-- <transition name="fade">
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
					<div v-for="(item,index) in qyList" :key='index' class="pop-inner-item" @click="toQiye(index,item)">
						<span>{{ index+1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition>
		<img src="static/images/zhu2.png" v-if="showXmb" style="width: 500px;position: absolute;top: 200px;right: 35px;border: 2px solid white;">
		<transition name="fade">
			<div class="pop-common pop-list" v-show="show5">
				<div class="pop-title"><span>执法设备</span></div>
				<div class="pop-inner-title">
					<span>设备名称</span>
					<span>负责区域</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in jkList" :key='index' class="pop-inner-item" @click="toZf(item)">
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
					<div v-for="(item,index) in wfList" :key='index' class="pop-wf-item" @click="toMap(item)">
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
<!--  执法仪监控-->
    <hik2  :codes="codes"  ref="videoPlayer2"  :playMode="1"></hik2>
    <!--  危房监控-->
<!--    <hik4 ref="videoPlayer4"  :playMode="1"></hik4>-->
    <!--  山塘防溺水监控-->
    <hik5  :codes="codes"  ref="videoPlayer5"  :playMode="1"></hik5>

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

		<transition name="fade">
			<div v-show="show11">
				<div class="pop-common dzxx">
					<div class="pop-title"><span>泥石流监控</span></div>
					<div class="pop-dz-title">
						<span>监控点名称</span>
						<span>具体位置</span>
					</div>
					<div class="pop-dz-box">
						<div class="pop-dz-item" v-for="(item,index) in dzList" :key="index" @click="toFns(item)">
							<span>{{item.name}}</span>
							<span>{{item.add}}</span>
						</div>
					</div>
				</div>
				<div class="pop-common dzxx" style="top: 600px;">
					<div class="pop-title"><span>位移监测点列表</span></div>
					<div class="pop-dz-title">
						<span style="flex: 2;">监测点名称</span>
						<span>位置</span>
						<span>边坡稳定性</span>
						<span>状态</span>
					</div>
					<div class="pop-dz-box">
						<div class="pop-dz-item" v-for="(item,index) in wyList" :key="index">
							<span style="flex: 2;">{{item.name}}</span>
							<span>{{item.add}}</span>
							<span>{{item.stability}}</span>
							<span>{{item.status}}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<img src="static/images/bgBtn.png" style="width: 192px;height: 122px;position: fixed;bottom: 130px;left: 1022px;" v-if="show12" @click="toMapA">
		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
  //危房监控
	import hik4 from '@/components/hik/index4.vue'
  //执法监控
	import hik2 from '@/components/hik/index2.vue'
  //山塘防溺水
  import hik5 from '@/components/hik/index5.vue'

	//import xcFive from '@/components/xc_five.json'
	export default {
		name: 'Jczl',
		props: {},
		data() {
			return {
			  e:'',
        codes:'',
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
				show11: false,
				show12: false,
				showVideo: false,
				showXmb: false,
				videoUrl: 'https://jl-dev.oss-cn-shanghai.aliyuncs.com/a47fd3d0e566102f50f3cda88ef0f8f5.mp4',
				list: [{
					num: 2,
					url: 'static/images/wfsl.png',
					title: '危房数量'
				},{
					num: 5,
					url: 'static/images/srjf.png',
					title: '私人建房'
				}],
				wgList: [{
					num: '长胜田央沈',
					url: 'static/images/house.png',
					title: '网格名'
				}, {
					num: '黄杰锋',
					url: 'static/images/zhs.png',
					title: '网格长'
				},  {
					num: '陈如良',
					url: 'static/images/zhs.png',
					title: '网格技术员'
				}, {
					num: 256,
					url: 'static/images/zrs.png',
					title: '网格人口'
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
				xcgaList: [],
				ljflList: [],
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
          X:'121.491468',
          Y:'30.052496'
				}, {
					name: '浦沙岙山塘',
					capacity: 5.41,
					volume: 0.34,
          X:'121.518145',
          Y:'30.053888'
				}, {
					name: '三八山塘',
					capacity: 1.67,
					volume: 0.53,
          X:'121.510891',
          Y:'30.056056'
				}, {
					name: '百步山塘',
					capacity: 0.795,
					volume: 0.10,
          X:'121.509537',
          Y:'30.057483'
				}, {
					name: '孟家山塘',
					capacity: 0.466,
					volume: 0.15,
          X:'121.533866',
          Y:'30.031042'
				}, {
					name: '史家岙山塘',
					capacity: 0.46,
					volume: 0.15,
          X:'121.53172',
          Y:'30.032429'
				}, {
					name: '毛岭山塘',
					capacity: 0.3,
					volume: 0.02,
          X:'121.531245',
          Y:'30.034203'
				}],
				skList: [{
					name: '劈开猪头',
					capacity: 10.84,
					volume: 1.89,
				}, {
					name: '杨家',
					capacity: 5.23,
					volume: 0.33,
          X:'',
          Y:''
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
					name: '十字路水库1',
					area: '十字路水库',
          code:'8c2b3483b5e64e3fb9e08db9f9b43c91',
          X:'121.518536',
          Y:'30.033852'
				}, {
					name: '十字路水库2',
					area: '十字路水库',
          code: '157995b2011e4af282a454fee526c143',
          X:'121.518536',
          Y:'30.033852'
				}, {
          name: '十字路水库3',
          area: '十字路水库',
          code:'a66fe6d07d884cedbac9e2a767c15419',
          X:'121.518583',
          Y:'30.030125'
        }, {
					name: '护栏点位',
					area: '九龙湖',
          X:'121.521459',
          Y:'30.040815'
				}, {
					name: '茶室',
					area: '九龙湖',
          X:'121.526551',
          Y:'30.043296'
				}, {
					name: '小木屋1',
					area:'九龙湖',
          X:'121.528029',
          Y:'30.048175'
				}, {
					name: '小木屋2',
					area:'九龙湖',
          X:'121.528029',
          Y:'30.048175'
				}, {
					name: '十字路水库4',
					area: '十字路水库',
          X:'121.518487',
          Y:'30.030235'
				}, {
					name: '十字路水库5',
					area: '十字路水库',
          X:'121.517373',
          Y:'30.02835'
				}, {
					name: '厕所点',
					area: '九龙湖',
          X:'121.504603',
          Y:'30.023054'
				}, {
					name: '文溪村三圣殿水库',
					area: '三圣殿水库',
          X:'121.506055',
          Y:'30.021086'
				}, {
					name: '文溪村小洞岙水库',
					area: '小洞岙水库',
          X:'121.517199',
          Y:'30.028391'
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
					area: '长胜',
          code:"2c3a354237f149b980f4b4d19697a35f"
				}, {
					name: '九龙湖村执法002',
					area: '横溪',
          code:"e75e11e3598c4868a0e43ae1aa88f44c"
				}],
				qyList: [{
					name: '昱如副食品店',
          X:'121.510998',
          Y:'30.052114'
				},{
					name: '鼎力紧定螺钉有限公司'
				},{
					name: '镇海互感器厂有限公司'
				},{
					name: '镇海九龙电器成套厂'
				},{
					name: '镇海叶大塑料制品厂'
				},{
					name: '龙居农家乐'
				},{
					name: '月波农家菜馆'
				},{
					name: '横溪人家'
				},{
					name: '龙源农家乐'
				},{
					name: '竹之林农家乐'
				},{
					name: '东琴农家乐'
				},{
					name: '项珍农家乐'
				},{
					name: '阿飞农家乐'
				},{
					name: '雅明农家乐'
				},{
					name: '九龙源农家乐'
				},{
					name: '食为天农家乐'
				},{
					name: '山里山农家乐'
				},{
					name: '赞来农家乐'
				},{
					name: '闻溪阁烧烤园'
				},{
					name: '青青农家菜馆'
				},{
					name: '食泉农家菜馆'
				},{
					name: '竹林人家农家菜馆'
				}],
				wfList: [{
					name: '陈雪宝',
					area: '九龙湖村',
					time: '1949年以前',
          X:'121.502239',
          Y:'30.051777',
          code:'4a9e00a6ae8b4517b4afe50d8aa34608'
				},{
					name: '沈红雷',
					area: '九龙湖村',
					time: '1960-1969年',
          X:'121.536912',
          Y:'30.035209',
          code:'f3a87f55eb144defadab4e02accaf6ad'
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
				}],
				dzList: [{
					name: '泥石流监控01',
					add: '原舍马路边',
          X:'121.505709',
          Y:'30.052134',
          code:'f7fb34bda82b4a1e90c86f381d59af73'
				},{
					name: '泥石流监控02',
					add: '横溪中间河道',
          X:'121.502218',
          Y:'30.051116',
          code:'f1bba68174b8401fa4dd5e22440ae1b6'
        },{
					name: '泥石流监控03',
					add: '竹林河道边',
          X:'121.493231',
          Y:'30.051141',
          code:'f7fb34bda82b4a1e90c86f381d59af73'
        },{
					name: '泥石流监控04',
					add: '东沟泥石流',
          X:'121.508844',
          Y:'30.051501',
          code:'22252acaaaeb47b0887cd0a294a0685b'

        },{
					name: '泥石流监控05',
					add: '西沟泥石流',
          X:'121.506749',
          Y:'30.051438',
          code:'f51d56c92b474494ad262aa67c9c13b2'
        }],
				wyList: [{
					name: '横溪地质防范点01',
					add: '东沟',
					stability: '-',
					status: '安装中'
				},{
					name: '横溪地质防范点01',
					add: '东沟',
					stability: '-',
					status: '安装中'
				}]
			}
		},
		components: {
			PopBox,
			BottomTab,
			hik2,hik4,hik5

		},
		mounted() {
			//console.log(xcFive)
			// this.fiveList = xcFive.RECORDS
			//console.log(this.fiveList)
			this.show = true

		},
		methods: {
			offHik() {
				this.$refs.videoPlayer2.off()
				// this.$refs.videoPlayer4.off()
				this.$refs.videoPlayer5.off()
			},
      //点击小图还原
      toMapA(){
			  this.show2 = true
        this.show12 = false
        this.show8 = false

        this.$parent.test("网格");
			  this.offHik()
      },
			toMap(item) {
        this.$refs.videoPlayer5.off()
        this.codes = item.code;
        this.$refs.videoPlayer5.initPlugin()
        let a = {
          X:item.X,
          Y:item.Y,
        }
        this.$parent.test(a);
        if (this.e == 1){
          this.show12 = true
        }
        this.show2 = false
			},
      //点击执法仪看监控
      toZf(item){
        this.$refs.videoPlayer2.off()
        this.codes = item.code;
        this.$refs.videoPlayer2.initPlugin()
      },
      //防溺水
      toFns(item){
        this.$refs.videoPlayer5.off()
        this.codes = item.code;
        this.$refs.videoPlayer5.initPlugin()

        let a = {
          X:item.X,
          Y:item.Y,
        }
        this.$parent.test(a);

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
			  this.e = e;
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
					this.show11 = false
					this.show12 = false
					this.showXmb = false
				} else if (e == 1) {
					// 网格管理
          this.offHik()
          // this.$parent.test("网格");
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
					this.show11 = false
					this.showXmb = false
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
					this.show11 = false
					this.show12 = false
					this.showXmb = false
				} else if (e == 3) {
					// 5+X
          this.offHik()

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
					this.show11 = false
					this.show12 = false
					this.showXmb = false
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
					this.show11 = false
					this.show12 = false
					this.showXmb = false
          // this.hikShow = true




					// let {href} = this.$router.resolve({path:'/Sgpt',params:{type: 1}})
					// window.open(href, '_blank')

				} else if (e==5) {
					// 危房管理
          if (this.$root.wf === false){
            this.$parent.test("危房");
            this.$root.wf = true
          }
          this.offHik()
          // this.$refs.videoPlayer4.initPlugin()
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
					this.show11 = false
					this.show12 = false
					this.showXmb = false
				} else if (e == 6) {
          this.offHik()
					// 地质灾害防范点
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
					this.show11 = true
					this.show12 = false
					this.showXmb = false
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
				let x = e.x,y = e.y
				console.log(e.x,e.y)
				if(510<x&&x<660 && 200<y&&y<370){
          console.log('横溪冷水井，后厢','左')
					this.show8 = true
          this.wgList[0].num = '横溪冷水井、后厢'
          this.wgList[1].num = '王佳丹'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 97
          this.ljflList = [{
          	name: '横溪垃圾投放点03',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
          }]
          this.xcgaList = [{
          	name: '傅正虎',
          	type: '低保家庭'
          },{
          	name: '王世辉',
          	type: '低保家庭'
          },{
            name: '钱佩君',
            type: '残障人员'
          },{
            name: '钱罗囡',
            type: '残障人员'
          },{
            name: '钱丙尧',
            type: '残障人员'
          },{
            name: '王世辉',
            type: '残障人员'
          },{
            name: '茅夏英',
            type: '残障人员'
          },{
            name: '王松根',
            type: '残障人员'
          },{
            name: '王龙振',
            type: '残障人员'
          },{
            name: '王纪南',
            type: '计生特殊家庭'
          },{
            name: '裘爱善',
            type: '计生特殊家庭'
          }]
				} else if (510<x&&x<760 && 140<y&&y<180) {
          console.log('横溪钱家，大同高屋，大圆地','左上')
					this.show8 = true
          this.wgList[0].num = '横溪钱家、大同高屋、大园地'
          this.wgList[1].num = '钱亮英'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 231
          this.ljflList = [{
          	name: '横溪垃圾投放点02',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
          },{
          	name: '横溪垃圾投放点04',
            code:'21b943aa87254d25b10d525c8c64c91c',
            X:'121.540393',
            Y:'30.034262'
          },{
          	name: '横溪垃圾投放点05',
            code:'',
            X:'121.541797',
            Y:'30.035759'
          }]
          this.xcgaList = [{
          	name: '王海明',
          	type: '计生特殊家庭'
          },{
          	name: '陆雪珍',
          	type: '计生特殊家庭'
          },{
          	name: '钱德',
          	type: '计生特殊家庭'
          },{
            name: '王玲娣',
            type: '残障人员'
          },{
            name: '胡君芬',
            type: '残障人员'
          },{
            name: '王琼翠',
            type: '残障人员'
          },{
            name: '方建萍',
            type: '残障人员'
          },{
            name: '姚少春',
            type: '残障人员'
          },{
            name: '周佩佩',
            type: '残障人员'
          }]
				} else if (540<x&&x<690 && 500<y&&y<750) {
          console.log('横溪坝下桥头','左中')
					this.show8 = true
          this.wgList[0].num = '横溪坝下、桥头'
          this.wgList[1].num = '徐佳妙'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 109
          this.ljflList = [{
          	name: '横溪垃圾投放点01',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
          }]
          this.xcgaList = [{
            name: '王昌根',
            type: '残障人员'
          },{
            name: '叶伟国',
            type: '残障人员'
          },{
            name: '胡甫南',
            type: '残障人员'
          },{
            name: '王国雄',
            type: '残障人员'
          },{
            name: '王云南',
            type: '残障人员'
          },{
            name: '王瑞江',
            type: '残障人员'
          },{
            name: '王惠岳',
            type: '残障人员'
          }]
				} else if (760<x&&x<1100 && 310<y&&y<740) {
          console.log('横溪田中央，墙头，长坂地','左右')
					this.show8 = true
          this.wgList[0].num = '横溪田中央、墙头、长坂地'
          this.wgList[1].num = '翁志元'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 226
          this.ljflList = [{
          	name: '',
            code:'',
            X:'',
            Y:''
          }] //没监控，占位用，防止循环报错
          this.xcgaList = [{
            name: '钱米达',
            type: '残障人员'
          },{
            name: '陈惠芬',
            type: '残障人员'
          },{
            name: '钱其囡',
            type: '残障人员'
          }]
				} else if (1280<x&&x<1420 && 690<y&&y<970) {
          console.log('长胜毛岭、孟家','右左')
					this.show8 = true
          this.wgList[0].num = '长胜毛岭、孟家'
          this.wgList[1].num = '沈裕琪'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 159
          this.ljflList = [{
          	name: '长胜垃圾投放点09',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
          },{
          	name: '长胜垃圾投放点10',
            code:'21b943aa87254d25b10d525c8c64c91c',
            X:'121.540393',
            Y:'30.034262'
          }]
          this.xcgaList = [{
            name: '沈仁平',
            type: '残障人员'
          },{
            name: '严晓芬',
            type: '残障人员'
          },{
            name: '陈根才',
            type: '残障人员'
          },{
            name: '滕学增',
            type: '残障人员'
          },{
            name: '周爱静',
            type: '残障人员'
          },{
            name: '倪道友',
            type: '残障人员'
          },{
            name: '滕学行',
            type: '残障人员'
          },{
            name: '陈慧明',
            type: '残障人员'
          },{
            name: '王品岳',
            type: '残障人员'
          },{
            name: '吴阿凤',
            type: '残障人员'
          },{
            name: '黄华棠',
            type: '残障人员'
          }]
				} else if (1450<x&&x<1580 && 740<y&&y<780) {
          console.log('长胜长桥头','右中上')
					this.show8 = true
          this.wgList[0].num = '长胜长桥头'
          this.wgList[1].num = '邱雪君'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 147
          this.ljflList = [{
          	name: '长胜垃圾投放点06',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
          }]
          this.xcgaList = [{
            name: '戴文龙',
            type: '残障人员'
          },{
            name: '严静梅',
            type: '残障人员'
          },{
            name: '沈惠祥',
            type: '残障人员'
          },{
            name: '翁东菊',
            type: '残障人员'
          },{
            name: '沈松文',
            type: '残障人员'
          }]
				} else if (1450<x&&x<1580 && 790<y&&y<950) {
          console.log('长胜周家巷','右中下')
					this.show8 = true
          this.wgList[0].num = '长胜周家巷'
          this.wgList[1].num = '朱丽红'
          this.wgList[2].num = '陈如良'
          this.wgList[3].num = 146
          this.ljflList = [{
          	name: '长胜垃圾投放点05',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
          },{
          	name: '长胜垃圾投放点07',
            code:'21b943aa87254d25b10d525c8c64c91c',
            X:'121.540393',
            Y:'30.034262'
          },{
          	name: '长胜垃圾投放点08',
            code:'',
            X:'121.541797',
            Y:'30.035759'
          }]
          this.xcgaList = [{
            name: '周裕康',
            type: '残障人员'
          },{
            name: '倪仁梅',
            type: '残障人员'
          },{
            name: '周家强',
            type: '残障人员'
          },{
            name: '胡幼丰',
            type: '残障人员'
          },{
            name: '费爱娥',
            type: '残障人员'
          },{
            name: '陈金花',
            type: '残障人员'
          },{
            name: '戎巧芬',
            type: '残障人员'
          },{
            name: '陈依芬',
            type: '残障人员'
          },{
            name: '沈爱珍',
            type: '残障人员'
          },{
            name: '余静国',
            type: '残障人员'
          },{
            name: '周家贤',
            type: '残障人员'
          }]
				} else if (1590<x&&x<1750 && 580<y&&y<900) {
          console.log('长胜田央沈','右')
					this.show8 = true
					this.wgList[0].num = '长胜田央沈'
					this.wgList[1].num = '黄杰锋'
					this.wgList[2].num = '陈如良'
					this.wgList[3].num = 256
					this.ljflList = [{
						name: '长胜垃圾投放点01',
            code:'32df7576620846e5850153e18d5731cf',
            X:'121.543364',
            Y:'30.034804'
					},{
						name: '长胜垃圾投放点02',
            code:'21b943aa87254d25b10d525c8c64c91c',
            X:'121.540393',
            Y:'30.034262'
					},{
						name: '长胜垃圾投放点03',
            code:'',
            X:'121.541797',
            Y:'30.035759'
					},{
						name: '长胜垃圾投放点04',
            code:'9e27366459024dfeb9da1d928db2860f',
            X:'121.540883',
            Y:'30.035809'
					}]
					this.xcgaList = [{
						name: '翁惠娟',
						type: '特困人员供养'
					},{
						name: '钱黎明',
						type: '特困人员供养'
					},{
            name: '倪仁梅',
            type: '低保家庭'
          },{
            name: '沈仁平',
            type: '低保家庭'
          },{
            name: '沈立琴',
            type: '低保家庭'
          },{
            name: '沈振东',
            type: '低保家庭'
          },{
            name: '沈振兴',
            type: '低保家庭'
          },{
            name: '沈振华',
            type: '低保家庭'
          },{
            name: '顾阿多',
            type: '残障人员'
          },{
            name: '钱黎明',
            type: '残障人员'
          },{
            name: '顾静娟',
            type: '残障人员'
          },{
            name: '沈国定',
            type: '残障人员'
          },{
            name: '王时芬',
            type: '残障人员'
          },{
            name: '沈振华',
            type: '残障人员'
          },{
            name: '沈立峰',
            type: '残障人员'
          },{
            name: '曾立平',
            type: '残障人员'
          },{
            name: '陈美飞',
            type: '残障人员'
          },{
            name: '沈荣飞',
            type: '残障人员'
          },{
            name: '沈立琴',
            type: '残障人员'
          },{
            name: '沈仁顺',
            type: '残障人员'
          },{
            name: '叶小芬',
            type: '残障人员'
          },{
            name: '王阿明',
            type: '残障人员'
          },{
            name: '陈翠娥',
            type: '残障人员'
          }]
				}
				// this.show8 = true
    //     this.hikShow = true
    //     this.$refs.videoPlayer.off()
    //     this.cType = "0"
    //     this.$refs.videoPlayer.initPlugin()
        // this.$refs.videoPlayer.show()
			},
			getPopIndex(e) {
				if(e == 1) {
					this.show9 = false
					this.show10 = true
				} else {
					this.show9 = true
					this.show10 = false
				}
			},
			showVideoBox() {
				this.showVideo = true
			},
			closeVideo() {
				this.showVideo = false
			},
			toQiye(e,item) {
				if(e == 0) {
					this.showXmb = true
				} else {
					this.showXmb = false
				}
        let a = {
          X:item.X,
          Y:item.Y,
          heading:230
        }
        this.$parent.test(a);

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
		// width: 520px;
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
			// width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24px;
			.pop-top-item {
				// width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-right: 20px;
				img {
					// width: 38px;
					// height: 38px;
					margin: 10px 0;
				}

				span:last-child {
					font-size: 20px;
				}
			}
			.pop-top-item:last-child {
				margin-right: 0;
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

	.dzxx {
		position: absolute;
		top: 200px;
		left: 35px;
		.pop-dz-title {
			width: 90%;
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #fff;
			margin: 10px auto;
			span {
				flex: 1;
			}
		}
		.pop-dz-box {
			max-height: 350px;
			overflow-y: auto;
			.pop-dz-item {
				width: 90%;
				display: flex;
				align-items: center;
				font-size: 16px;
				color: #fff;
				margin: 5px auto;
				span {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.videoClass {
		width: 700px;
		// height: 700px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		video {
			width: 100%;
			height: 100%;
			position: relative;
		}
		.cancelVideo {
			width: 40px;
			height: 40px;
			position: absolute;
			top: -20px;
			right: -20px;
			z-index: 100;
			cursor: pointer;
		}
	}
</style>
