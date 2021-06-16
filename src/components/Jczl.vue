<template>
  <div>
    <transition name="fade">
      <PopBox :list="list" v-show='show'></PopBox>
    </transition>
    <transition name="fade">
      <div class="pop-box" v-show="show3">
        <div class="pop-common sttj">
          <div class="pop-title"><span>山塘统计</span></div>
          <div class="pop-inner-title">
            <span>序号</span>
            <span>山塘名称</span>
            <span>总容积 <span style="font-size: 14px;">(万m³)</span></span>
          </div>
          <div v-for="(item,index) in stList" :key='index' class="pop-inner-item">
            <span>{{ index + 1 }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.capacity }}</span>
          </div>
        </div>
        <div class="pop-common sktj">
          <div class="pop-title"><span>水库统计</span></div>
          <div class="pop-inner-title">
            <span>序号</span>
            <span>水库名称</span>
            <span>库容 <span style="font-size: 14px;">(万m³)</span></span>
          </div>
          <div v-for="(item,index) in skList" :key='index' class="pop-inner-item">
            <span>{{ index + 1 }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.capacity }}</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
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
    </transition>
    <transition name="fade">
      <div class="pop-box" v-show="show5">
        <div class="pop-common fns">
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
        </div>
      </div>
    </transition>
    <hik  v-if="hikShow"  ref="videoPlayer"  :playMode="1"></hik>
<!--    5+x -->
<!--    <transition name="fade">-->
<!--      <div class="sj-pop" v-show="show7">-->
<!--        <img src="static/images/cancel.png" class="cancelLogo" @click="show7=false">-->
<!--        <u-table :max-height="550"-->
<!--            :data="fiveList"-->
<!--            :border="false"-->
<!--            style="width: 100%">-->
<!--          <u-table-column-->
<!--              prop="number"-->
<!--              label="number"-->
<!--              width="140">-->
<!--          </u-table-column>-->
<!--          <u-table-column-->
<!--              prop="shop_name"-->
<!--              label="shop_name">-->
<!--          </u-table-column>-->
<!--          <u-table-column-->
<!--              prop="check_man"-->
<!--              label="check_man"-->
<!--              width="140">-->
<!--          </u-table-column>-->
<!--          <u-table-column-->
<!--              prop="partner"-->
<!--              label="partner"-->
<!--              width="140">-->
<!--          </u-table-column>-->
<!--          <u-table-column-->
<!--              prop="expire_date"-->
<!--              label="expire_date"-->
<!--              width="160">-->
<!--          </u-table-column>-->
<!--        </u-table>-->
<!--      </div>-->
<!--    </transition>-->


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
    <el-button style="margin-top: 600px;margin-left: 100px" type="primary" @click="hikShow = true">主要按钮</el-button>
    <el-button style="margin-top: 600px;margin-left: 100px"  @click="offHik">主要按钮</el-button>




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
      hikShow:false,
      fiveList:[],
      title:'',
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
      list: [{
        num: 200,
        url: 'static/images/house.png',
        title: '农家乐'
      }, {
        num: 200,
        url: 'static/images/qy.png',
        title: '企业'
      }, {
        num: 200,
        url: 'static/images/stsk.png',
        title: '山塘水库'
      }, {
        num: 200,
        url: 'static/images/ljfl.png',
        title: '垃圾分类'
      }],
      xcgaList: [{
        num: 200,
        url: 'static/images/jzry.png',
        title: '矫正人员'
      }, {
        num: 200,
        url: 'static/images/dbh.png',
        title: '低保家庭'
      }, {
        num: 200,
        url: 'static/images/lnr.png',
        title: '老年人'
      }, {
        num: 200,
        url: 'static/images/czr.png',
        title: '残障人员'
      }, {
        num: 200,
        url: 'static/images/jstsjt.png',
        title: '计生特殊家庭'
      }, {
        num: 200,
        url: 'static/images/wbh.png',
        title: '五保户'
      }],
      tabList: [ {
        hasUrl: false,
        title: '山塘水库'
      }, {
        hasUrl: false,
        title: '企业'
      }, {
        hasUrl: false,
        title: '5+X平台'
      }, {
        hasUrl: false,
        title: '垃圾分类'
      }, {
        hasUrl: false,
        title: '乡村关爱'
      }, {
        hasUrl: false,
        title: '四个平台'
      }, {
        hasUrl: false,
        title: '防溺水'
      }, {
        hasUrl: false,
        title: '线上执法'
      }],
      stList: [{
        name: '石英坎山塘',
        capacity: 2.21
      }, {
        name: '浦沙岙山塘',
        capacity: 5.41
      }, {
        name: '三八山塘',
        capacity: 1.67
      }, {
        name: '百步山塘',
        capacity: 0.795
      }, {
        name: '孟家山塘',
        capacity: 0.466
      }, {
        name: '史家岙山塘',
        capacity: 0.46
      }, {
        name: '毛岭山塘',
        capacity: 0.3
      }],
      skList: [{
        name: '劈开猪头',
        capacity: 10.84
      }, {
        name: '杨家',
        capacity: 5.23
      }, {
        name: '蔡家岙',
        capacity: 2.21
      }, {
        name: '石英坎',
        capacity: 2.21
      }, {
        name: '三八',
        capacity: 1.67
      }, {
        name: '应家',
        capacity: 1.14
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
      sjList: [
          {
        id: 'JLW202106110301',
        content: '走访低保户姚国庆家庭，了解日常生活情况',
        add: '杜郭',
        type: '困难救助',
        timeType: '网格关闭',
        reportTime: '2021/6/11 9:19:59',
        department: '杜郭',
        overTime: '2021/6/11 9:19:59',
        timeOut: '否'
      },{
        id: 'JLW202106110005',
        content: '在端午节到来之际，计生协走访慰问特殊家庭，为他们送去粽子和水杯。',
        add: '长宏村',
        type: '困难救助',
        timeType: '网格关闭',
        reportTime: '2021/6/11 9:00:28',
        department: '长宏村',
        overTime: '2021/6/11 9:00:28',
        timeOut: '否'
      },{
        id: 'JLW202106110004',
        content: '思源社区东西北街网格内看望困难独居老人，聊天谈心，送上端午慰问品。',
        add: '思源社区北街29号景宝玉家中。',
        type: '困难救助',
        timeType: '网格关闭',
        reportTime: '2021/6/11 8:55:35',
        department: '思源社区',
        overTime: '2021/6/11 08:55:35',
        timeOut: '否'
      },{
        id: 'JLW202106110003',
        content: '西经堂村汪家网格汪家小燕子幼儿园（甬惠批发）检查食品安全。',
        add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/11 8:28:04',
        department: '西经堂村',
        overTime: '2021/6/11 8:28:04',
        timeOut: '否'
      },{
        id: 'JLW202106110201',
        content: '西经堂村汪家网格走访农贸市场陈义民店检查食品安全。',
        add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/11 8:24:56',
        department: '西经堂村',
        overTime: '2021/6/11 8:24:56',
        timeOut: '否'
      },{
        id: 'JLW202106110101',
        content: '西严老年活动中心北面两根雨水管道破裂，导致路面积水',
        add: '浙江省宁波市镇海区九龙湖镇西严中漕头',
        type: '城市管理',
        timeType: '网格关闭',
        reportTime: '2021/6/11 8:24:39',
        department: '西严村',
        overTime: '2021/6/11 8:24:39',
        timeOut: '否'
      },{
        id: 'JLW202106110002',
        content: '西经堂村汪家网格网格长走访农贸市场店铺检查食品安全。',
        add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/11 8:15:41',
        department: '西经堂村',
        overTime: '2021/6/11 8:15:41',
        timeOut: '否'
      },{
        id: 'JLW202106110001',
        content: '西经堂村汪家网格网格长走访加贝（兆辉）超市检查超市食品安全。',
        add: '浙江省宁波市镇海区九龙湖镇西经堂路118号',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/11 8:12:19',
        department: '西经堂村',
        overTime: '2021/6/11 8:12:19',
        timeOut: '否'
      },{
        id: 'JLW202106100106',
        content: '黄杨网格对宁波市镇海区九龙湖四珍副食店内进行食品安全巡查走访。',
        add: '浙江省宁波市镇海区九龙湖镇长石村社区卫生服务工作室长石小学',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/10 20:48:17',
        department: '长石村',
        overTime: '2021/6/10 20:48:17',
        timeOut: '否'
      },{
        id: 'JLW202106100105',
        content: '九龙家苑四期南垃圾点位有垃圾包乱堆放现象',
        add: '浙江省宁波市镇海区九龙湖镇九龙家苑四期南',
        type: '其他',
        timeType: '网格关闭',
        reportTime: '2021/6/10 16:23:37',
        department: '龙源社区',
        overTime: '2021/6/10 16:23:37',
        timeOut: '否'
      },{
        id: 'JLW202106100210',
        content: '西严网格老年活动中心墙面掉落维修',
        add: '浙江省宁波市镇海区九龙湖镇西严村中漕头',
        type: '城市管理',
        timeType: '网格关闭',
        reportTime: '2021/6/10 16:15:40',
        department: '西严村',
        overTime: '2021/6/10 16:15:40',
        timeOut: '否'
      },{
        id: 'JLW202106100209',
        content: '西严网格前漕头小店食品安全检查',
        add: '浙江省宁波市镇海区九龙湖镇西严村前漕头',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/10 16:12:17',
        department: '西严村',
        overTime: '2021/6/10 16:12:17',
        timeOut: '否'
      },{
        id: 'JLW202106100007',
        content: '西严网格中漕头小店食品安全检查',
        add: '浙江省宁波市镇海区九龙湖镇西严村中漕头',
        type: '食药安全',
        timeType: '网格关闭',
        reportTime: '2021/6/10 16:10:53',
        department: '西严村',
        overTime: '2021/6/10 16:10:53',
        timeOut: '否'
      },{
        id: 'JLW202106100208',
        content: '长邱路路口徐王段绿化阻挡视线修剪',
        add: '浙江省宁波市镇海区九龙湖镇徐王徐家库',
        type: '交通安全',
        timeType: '网格关闭',
        reportTime: '2021/6/10 16:08:10',
        department: '徐王',
        overTime: '2021/6/10 16:08:10',
        timeOut: '否'
      },{
        id: 'JLW202106100305',
        content: '14：30左右，西河工业区网格合鑫公司攻丝车间因风扇引起小火灾',
        add: '浙江省宁波市镇海区九龙湖镇西河村村民委员会',
        type: '消防安全',
        timeType: '网格关闭',
        reportTime: '2021/6/10 15:27:48',
        department: '西河村',
        overTime: '2021/6/10 15:27:48',
        timeOut: '否'
      },{
        id: 'JLW202106100006',
        content: '组织调解重复上访户周小毛有关拆迁相关事宜',
        add: '浙江省宁波市镇海区九龙湖镇王岙巷九龙家苑',
        type: '信访维稳',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:44:40',
        department: '王岙巷',
        overTime: '2021/6/10 14:44:40',
        timeOut: '否'
      },{
        id: 'JLW202106100207',
        content: '对网格内村民进行防诈骗入户宣传',
        add: '河头村',
        type: '文教体育',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:41:59',
        department: '河头村',
        overTime: '2021/6/10 14:41:59',
        timeOut: '否'
      },{
        id: 'JLW202106100104',
        content: '河头村党总支建党百年祝福视频拍摄',
        add: '河头村',
        type: '党群工作',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:38:27',
        department: '河头村',
        overTime: '2021/6/10 14:38:27',
        timeOut: '否'
      },{
        id: 'JLW202106100206',
        content: '反电信网络诈骗宣传，恒大西苑8号楼入户宣传防范电信网络诈骗，让居民做好家庭成员的宣传承诺签字',
        add: '浙江省宁波市镇海区九龙湖镇恒大西苑8幢',
        type: '专项拉练',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:31:49',
        department: '恒大西苑',
        overTime: '2021/6/10 14:31:49',
        timeOut: '否'
      },{
        id: 'JLW202106100005',
        content: '走访看望王家网格瘫痪在床老人',
        add: '九龙湖镇杜夹岙村',
        type: '城市管理',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:26:10',
        department: '杜夹岙村',
        overTime: '2021/6/10 14:26:10',
        timeOut: '否'
      },{
        id: 'JLW202106100205',
        content: '镇海区九龙湖谷峰副食品店食品安全检查',
        add: '浙江省宁波市镇海区九龙湖镇',
        type: '城市管理',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:26:10',
        department: '九龙湖镇',
        overTime: '2021/6/10 14:26:10',
        timeOut: '否'
      },{
        id: 'JLW202106100601',
        content: '公司要搬到宁波去，即使有厂车接送，工人也不肯前往，要求赔偿金。',
        add: '镇矛调大厅',
        type: '矛调来访',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:26:10',
        department: '九龙湖镇',
        overTime: '2021/6/10 14:26:10',
        timeOut: '否'
      },{
        id: 'JLW202106100501',
        content: '2019年3月张承怀受包工头所雇到恒大明苑5号楼201室做装饰工，共欠工资1500元，已付400元，还欠工资1100元，至今未付，申请调解。',
        add: '镇矛调大厅',
        type: '矛调来访',
        timeType: '网格关闭',
        reportTime: '2021/6/10 14:10:02',
        department: '九龙湖镇',
        overTime: '2021/6/10 14:10:02',
        timeOut: '否'
      },{
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
      sjList3: [
        {
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
      sjList2: [
        {
          id: 'JLW202106110202',
          content: '思源社区东街59-6号，居民家门口路面污水井盖破损，需要更换。',
          add: '镇海区九龙湖镇思源社区东街59-6号居民家门口路面。',
          type: '城市管理',
          timeType: '网格上报',
          reportTime: '2021/6/11 8:51:23',
          department: '思源社区',
          overTime: '2021/6/11 8:51:23',
          timeOut: '否'
        }]

    }
  },
  components: {
    PopBox,
    BottomTab,hik

  },
  mounted() {
    //console.log(xcFive)
    // this.fiveList = xcFive.RECORDS
    //console.log(this.fiveList)
    this.show3 = true

  },
  methods: {
    offHik(){
      this.$refs.videoPlayer.off()
    },
    toMap(item){
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
        // 山塘统计
        // this.show2 = false
        this.show = false
        this.show3 = true
        this.show4 = false
        this.show5 = false
        this.show6 = false
        this.show7 = false
      } else if (e == 1 || e == 3) {
        // 企业，垃圾分类
        // this.show2 = false
        this.show = true
        this.show3 = false
        this.show4 = false
        this.show5 = false
        this.show6 = false
        this.show7 = false
      } else if (e == 2 || e == 7) {
        // 5+x平台，线上执法
        // this.show2 = false
        this.show = false
        this.show3 = false
        this.show4 = false
        this.show5 = false
        this.show6 = false
        this.show7 = true


      } else if (e == 4) {
        // 乡村关爱
        // this.show2 = false
        this.show = false
        this.show3 = false
        this.show4 = true
        this.show5 = false
        this.show6 = false
        this.show7 = false
      } else if (e == 5) {
        //四个平台 打开新页面
        // this.show2 = false
        this.show = false
        this.show3 = false
        this.show4 = false
        this.show5 = false
        this.show6 = true
        this.show7 = false
        // let {href} = this.$router.resolve({path:'/Sgpt',params:{type: 1}})
        // window.open(href, '_blank')

      } else if (e == 6) {
        // 防溺水
        this.show6 = false
        // this.show2 = false
        this.show = false
        this.show3 = false
        this.show4 = false
        this.show5 = true
      }
    },
    showImg(e) {
      this.imgShow = true
      this.imgIndex = e
    },
    close() {
      this.imgShow = false
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
  z-index: 10000;
  max-height: 380px;
}

.pop-box {
  position: absolute;
  top: 200px;
  left: 35px;
}

.sttj {
  margin-bottom: 60px;
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

  span:nth-child(2) {
    width: 40%;
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
  z-index: 10000;

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
  z-index: 20000;
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
</style>
