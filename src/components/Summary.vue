<template>
  <div class="bigBox">

    <div class="loading" v-if="isLoading<100">
      <el-progress :percentage="isLoading"></el-progress>
    </div>

    <!--   九龙湖介绍 -->
    <transition name="fade">
      <div class="box lt" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>九龙湖村介绍</span>
        </div>
        <div class="box-bottom lt-bottom">
          <video src="https://hsyxxcx.oss-cn-hangzhou.aliyuncs.com/9235c9418604435ebaec65c087c125bd.mp4"
                 autoplay="autoplay"
                 muted loop="loop"></video>
          <!--          <div class="introduction">{{ introduction }}</div>-->
          <div class="demo03">
            <div class="content">
              <div>
                <ul id="bgContent" class="cc rowup">
                  <li :key="index" v-for="(item, index) in dataLi" style="text-align: justify;">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--    人口信息-->
    <transition name="fade">
      <div class="box lm" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>人口信息</span>
        </div>
        <div class="box-bottom lm-bottom">
          <div class="info-top">
            <span>总人口数：<span class="typeBlue">2015</span>人</span>
            <span>总 户 数：<span class="typeBlue">722</span>户</span>
          </div>
          <div class="info-middle">
            <div style="display: flex;flex-direction: column;">
              <span>当地人口：<span class="typeBlue">1627</span>人</span>
              <span>外来人口：<span class="typeBlue">388</span> 人</span>
              <span>男女比率: <span class="typeBlue">
                <img src="static/images/boy.png" style="vertical-align: middle;">49%</span>
								<span class="typePink">
                  <img src="static/images/girl.png" style="vertical-align: middle;">51%</span></span>
            </div>

            <dv-active-ring-chart v-if="show" :config="config7" style="width:140px;height:140px"/>

            <!--            <my-charts :id="rk" class="rk" :data="option2"></my-charts>-->
            <!--            <dv-charts :option="option2" />-->
            <!--            <div style="display: flex;flex-direction: column;">-->
            <!--              <span style="font-size: 16px;">商户<span class="typeOrange">10%</span></span>-->
            <!--              <span style="font-size: 16px;">农户<span class="typeYellow">5%</span></span>-->
            <!--            </div>-->
          </div>
          <span>60岁老人数量：<span class="typeBlue">621</span>人 占比<span class="typeGreen">31%</span></span>
        </div>
      </div>
    </transition>
    <!--  山塘信息  -->
    <transition name="fade">
      <div class="box lb" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>山塘水库</span>
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

            <!-- <dv-active-ring-chart v-if="show" :config="config6" style="width:150px;height:150px"/> -->
			<dv-water-level-pond v-if="show" :config="config3" style="width:130px;height:150px;"/>
            <dv-scroll-board v-if="show" :config="config5" style="width:400px;height:165px"/>
          </div>
        </div>
      </div>
    </transition>
    <!--水库信息-->
<!--   <transition name="fade">-->
<!--      <div class="box ml" v-show="show">-->
<!--        <div class="box-top">-->
<!--          <img src="static/images/icon.png">-->
<!--          <span>水库信息</span>-->
<!--        </div>-->
<!--        <div class="box-bottom ml-bottom">-->
<!--          <div class="sk-top">-->
<!--            <span>总面积：<span class="typeBlue">15.7</span>(km²)</span>-->
<!--            <div class="sk-top-right">-->
<!--              <span>水库名称</span>-->
<!--              <span>积雨面积</span>-->
<!--              <span>总容积</span>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="sk-bottom">-->
<!--            水位-->
<!--            <dv-water-level-pond v-if="show" :config="config3" style="width:130px;height:150px;"/>-->

<!--            <dv-scroll-board v-if="show" :config="config2" style="width:400px;height:165px"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition>-->
    <!--基层党建-->
    <transition name="fade">
      <div class="box mm" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>基层党建</span>
        </div>
        <div class="box-bottom mm-bottom">
          <div class="party-title">
            <span>党支部名称</span>
            <span>总人数：<span class="typeSkyBlue">111人</span></span>
          </div>
          <div>
            <div v-for="(item,index) in partyList" class="party-list" :key="index">
              <span class="typeBlue">{{ item.title }}</span>
              <span>人数：<span class="typeSkyBlue">{{ item.num }}</span>人</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 村务公开 -->
     <transition name="fade">
      <div class="box mr" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>防溺水监控</span>
        </div>

<!--        <hik cameraIndexCode="0"  ref="videoPlayer"  :playMode="1"></hik>-->
<!--        <dv-scroll-board v-if="show" :config="config" style="width:400px;height:210px"/>-->
      </div>
    </transition>
    <!-- 空气质量-->
    <transition name="fade">
      <div class="box rl" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>村区环境</span>
        </div>
        <div class="rl-bottom">
          <div class="rl-inner" style="margin-bottom: 5px;">
            <span class="rl-inner-title">天气：</span>
            <span><img :src="'static/images/'+tq.wea_img+'.png'"
                       style="vertical-align: middle; width: 37px;height: 37px"> {{ tq.wea }}</span>
          </div>
          <div class="rl-inner" style="margin-bottom: 5px;">
            <span class="rl-inner-title">气温：</span>
            <span><img src="static/images/temperature.png" style="vertical-align: middle;">{{ tq.tem }}℃</span>
          </div>
          <div class="rl-inner">
            <span class="rl-inner-title">PM2.5：</span>
            <span><img src="static/images/air.png" style="vertical-align: middle;">{{ tq.air_pm25 }}</span>
          </div>
          <div class="rl-inner">
            <span class="rl-inner-title">负氧离子含量：</span>
            <span><img src="static/images/NAI.png" style="vertical-align: middle;">12000</span>
          </div>
          <div class="rl-summary">
            <span class="typeGreenLight">{{ tq.air_level }}</span>
            <span class="typeGreenLight">空气质量</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 每日数据 -->
    <transition name="fade">
      <div class="box rm" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">
          <span>每日数据</span>
        </div>

        <div class="rm-bottom">

          <my-charts :id="rlss" class="rm-item" :data="option"></my-charts>
          <my-charts :id="rlgy" class="rm-item" :data="option4"></my-charts>
          <my-charts :id="clgy" class="rm-item" :data="option5"></my-charts>
        </div>
      </div>
    </transition>
    <!--三资公开-->
    <transition name="fade">
      <div class="box rb" v-show="show">
        <div class="box-top">
          <img src="static/images/icon.png">

          <span>三资管理</span>
        </div>
        <div class="box-bottom rb-bottom">
          <div class="cwgk">
            <div class="fontBig">上季度财务公开<img src="static/images/cwgk.png" class="imgStyle"></div>
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <div class="flex-end" style="color: #FFE347;">
                <span>总收入</span>
                <span class="fontSm"><span class="fontBig">48.88</span>万元</span>
              </div>
              <div class="flex-end typeBlue">
                <span>总支出</span>
                <span class="fontSm"><span class="fontBig">224.99</span>万元</span>
              </div>
              <div class="flex-end" style="color: #3DDD6A;">
                <span>收支结余</span>
                <span class="fontSm"><span class="fontBig">-176.11</span>万元</span>
              </div>
            </div>
          </div>
          <div class="ywgk">
            <div class="fontBig">业务公开<img src="static/images/ywgk.png" class="imgStyle"></div>
            <div style="height: 30px;"></div>
          </div>
          <div class="zzxx">
            <div class="fontBig">招租信息<img src="static/images/zzxx.png" class="imgStyle"></div>
          </div>
        </div>
      </div>
    </transition>



    <div style="height: 1004px;width: 2236px; margin-bottom: 200px;overflow: hidden;">
   <!-- <model-obj src="static/models/01.obj" mtl="static/models/01.mtl" :position="position" :scale="scale"
                 :lights="lights" :cameraPosition="cameraPosition" :cameraRotation="cameraRotation"
                 @on-click="onClick" @on-progress="onProgress" @on-error="onError" :backgroundAlpha='0'>
      </model-obj> -->

    </div>


  </div>
</template>

<script>
import {
  ModelObj
} from 'vue-3d-model';
import myCharts from '@/components/MyCharts.vue'
import hik from '@/components/hik'
export default {
  name: 'Summary',
  props: {},
  data() {
    return {
      cType:"4",
      dataLi: [
        "九龙湖村位于宁波市镇海区西北部，是一个有着光荣历史的革命老区，由原来的横溪、长胜、十字路、郞家坪四个自然村合并而成，是一个典型的山区村。全村地域面积15.7平方公里，有山林面积11008亩，耕地面积400亩。现有住户722户，人口1627人，外来人口388人，村党委下设四个党支部和一个农家乐支部，共有党员109人，有十二个村民小组，村民代表52人。2020年村集体收入约120万元。国家AAAA级风景区“九龙湖旅游度假区”就位于九龙湖村内。近年来，我村相继获得了省级旅游特色村、省级卫生村、省百佳美丽乡村、省农村信息化管理示范村省级廉政文化进农村示范点；市级小康村、市级文明村、市级生态村、市级“五好党组织”；区级民主法治村、巾帼示范村、兴林富民示范村、三星级文化礼堂、先进基层党组织、信访工作先进集体等多个省、市、区级荣誉称号。2005年，为了适应乡村旅游发展的需要，九龙湖农家乐协会成立,现有农家乐37家。近两年，随着九龙湖村农家乐乡村旅游发展的不断深入，游客量越来越大，需求也呈多样化趋势发展。为充分发挥党员在经营农家乐方面的先锋模范作用，九龙湖村于2018年1月成立了农家乐联盟党支部，现有农家乐党员经营户9户，正式党员10名。通过党员经营户文明诚信经营的示范，不断引领全镇农家乐产业的健康发展。村民主要以茶叶、笋干、毛竹等为主要经济来源,依托农家乐联盟党支部，提升农家乐整体品质，振兴乡村旅游开发，倾力打造九龙湖村的旅游品牌特色，拓展农业与旅游业的结合点，实现了全村经济的和谐发展，保持村民人均收入每年持续增长。"
      ],
      tq: {},
      config3: {
        data: [66, 55, 50],
        shape: 'roundRect',
        waveHeight: '10',
        formatter: '15.7',
      },
      config2: {
        data: [
          ['劈开猪头', '1.89km²', '10.84万m³'],
          ['杨家', '0.33km²', '5.23万m³'],
          ['蔡家岙', '0.09km²', '1.84万m³'],
          ['安基墩', '0.4km²', '6.61万m³'],
          ['石英坎', '0.86km²', '2.21万m³'],
          ['三八', '0.53km²', '1.67万m³'],
          ['应家', '0.13km²', '1.14万m³'],
        ],
        index: true,
        columnWidth: [35, 80, 80, 90],
        evenRowBGC: "rgba(206,218,222,0)",
        oddRowBGC: "rgba(206,218,222,0)",
        align: ['center']

      },
      //山塘信息
      config5: {
        data: [
          ['石英坎山塘', '0.86km²', '2.21万m³'],
          ['浦沙岙山塘', '0.34km²', '5.41万m³'],
          ['三八山塘', '0.53km²', '1.67万m³'],
          ['百步山塘', '0.10km²', '0.795万m³'],
          ['孟家山塘', '0.15km²', '0.466万m³'],
          ['史家岙山塘', '0.15km²', '0.46万m³'],
          ['毛岭山塘', '0.02km²', '0.3万m³'],
        ],
        index: true,
        columnWidth: [35, 80, 80, 90],
        evenRowBGC: "rgba(206,218,222,0)",
        oddRowBGC: "rgba(206,218,222,0)",
        align: ['center']

      },
      config6: {
        showOriginValue: true,
        digitalFlopToFixed: 3,
        data: [
          {
            name: '石英坎山塘',
            value: 2.21
          },
          {
            name: '浦沙岙山塘',
            value: 5.41
          },
          {
            name: '三八山塘',
            value: 1.67
          },
          {
            name: '百步山塘',
            value: 0.795
          },
          {
            name: '孟家山塘',
            value: 0.466
          }, {
            name: '史夹岙山塘',
            value: 0.46
          }, {
            name: '毛岭山塘',
            value: 0.3
          },
        ],
        lineWidth: 10,
        radius: 40,
        activeRadius: 45,
        digitalFlopStyle: {
          fontSize: 12,
          fill: '#fff'
        }
      },
      config7: {
        radius: '60%',
        activeRadius: '65%',
        data: [
          {
            name: '当地人口',
            value: 81
          },
          {
            name: '外来人口',
            value: 19
          }
        ],
        color: ['#00de37', '#f7e301'],
        digitalFlopStyle: {
          fontSize: 13
        },
        // showOriginValue: true
      },
      config: {
        data: [
          ['宣传健康常识和卫生知识'],
          ['免费提供电源接通，声控灯维修等'],
          ['农村部分计划生育家庭奖励扶助对象确认'],
          ['家电下乡补助申报办理'],
          ['农作物病虫害辨别和防治技术提供'],
          ['新型农村合作医疗保险'],
        ],
        index: true,
        columnWidth: [50],
        evenRowBGC: "rgba(206,218,222,0)",
        oddRowBGC: "rgba(206,218,222,0)"
        // align: ['center']

      },
      isLoading: 0,
      rlss: 'rlss',
      rlgy: 'rlgy',
      clgy: 'clgy',
      st: "st",
      rk: "rk",
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
        series: [
          {
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
          text: '{a|113}\n{c|人流量检测数据}',
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
        series: [
          {
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
          text: '{a|187}\n{c|车流量检查数据}',
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
        series: [
          {
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
      show: false,
      introduction: '九龙湖村位于宁波市镇海区西北部是一个有着光荣历史的革命老区，由原来的横溪、长胜、十字路、郞家坪四个自然村合并...',
      partyList: [{
        title: '横溪网格支部',
        num: 28
      }, {
        title: '周家港、孟家、毛岭网格支部',
        num: 16
      }, {
        title: '田央沈、长桥头网格支部',
        num: 21
      }, {
        title: '朗家坪、十字路网格支部',
        num: 36
      }, {
        title: '农家乐联盟支部',
        num: 10
      }],
      zzList: [{
        time: '2021-04-09',
        add: '九龙湖桥头街',
        info: '两室一厅一卫',
        money: 1500
      }, {
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
      cameraRotation: {
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
    this.onLoad()
	let that = this
	setInterval(function(){
		let option = that.random(297,512)
		let option4 = that.random(187,523)
		let option5 = that.random(113,286)
		that.option.series[0].axisLine.lineStyle.color[0][0] = Number(option/1000)
		that.option4.series[0].axisLine.lineStyle.color[0][0] = Number(option4/1000)
		that.option5.series[0].axisLine.lineStyle.color[0][0] = Number(option5/1000)
		that.option.title.text = '{a|'+option+'}\n{c|剩余车位}'
		that.option4.title.text = '{a|'+option4+'}\n{c|人流量检测数据}'
		that.option5.title.text = '{a|'+option5+'}\n{c|车流量检查数据}'
	},60000)
  },
  components: {
    ModelObj,
    myCharts
  },
  methods: {
	random(lower, upper) {
	  return Math.floor(Math.random() * (upper - lower)) + lower;
	},
    onLoad() {
      //获取天气
      this.$ajax.getWeather().then(res => {
        this.tq = res;
      })
      this.show = true

    },
    onClick(e) {

    },
    onProgress(e) {
      let loaded = e.loaded / e.total * 100 + ""
      this.isLoading = Number(loaded.substring(0, 4))

      // console.log(e.loaded / e.total * 100 + "%")
    },

    onError(e) {
      console.log(e)
    },

  }
}
</script>

<style scoped lang="less">
.bigBox {
  width: 100%;
  height: 100%;
  background: url(../../public/static/images/dbg.png) no-repeat;
  background-size: 100% 100%;
}

.loading {
  width: 600px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.typeBlue {
  color: #64beef;
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
  z-index: 1998;
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

//介绍
.lt {
  height: 300px;
  position: absolute;
  top: 180px;
  left: 35px;

  .lt-bottom {
    display: flex;
    flex-direction: row;
    color: #fff;
    font-size: 18px;

    video {
      width: 220px;
      height: 180px;
    }

    .introduction {
      margin-left: 10px;
      width: 150px;
      height: 220px;
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
  height: 300px;
  position: absolute;
  top: 520px;
  left: 35px;
  z-index: 1998;

  .lm-bottom {
    display: flex;
    flex-direction: column;
    font-size: 17px;
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
      line-height: 2.2;

      .rk {
        margin-left: 20px;
        width: 120px;
        height: 120px;
      }
    }
  }
}

.lb {
  height: 300px;
  position: absolute;
  bottom: 40px;
  left: 35px;
  z-index: 1998;

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
  height: 300px;
  position: absolute;
  bottom: 40px;
  left: 472px;
  z-index: 1998;

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

// 基层党建，移到左边
.mm {
  height: 300px;
  position: absolute;
  bottom: 40px;
  // left: 910px;
  left: 472px;
  z-index: 1998;

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
      height: 24px;
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
  height: 300px;
  position: absolute;
  bottom: 40px;
  right: 470px;
  z-index: 1998;

  .mr-bottom {
    display: flex;
    flex-direction: column;

    //.cw-list {
    //  width: 100%;
    //  height: 36px;
    //  display: flex;
    //  align-items: center;
    //  background: url(../../public/static/images/cwbg.png);
    //  background-size: 100% 100%;
    //  color: #BCF0FE;
    //  font-size: 16px;
    //
    //  span:first-child {
    //    margin-left: 34px;
    //    margin-right: 44px;
    //  }
    //}
  }
}


.rl {
  height: 300px;
  position: absolute;
  top: 180px;
  right: 35px;
  z-index: 1998;

  .rl-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .rl-inner {
      width: 48%;
      background: rgba(0, 142, 244, 0.1);
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
      transform: translate(-50%, -50%);
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
  height: 300px;
  position: absolute;
  top: 520px;
  right: 35px;
  z-index: 1998;

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

.rb {
  height: 300px;
  position: absolute;
  bottom: 40px;
  right: 35px;
  z-index: 1998;

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

          span:nth-child(2),
          span:nth-child(3) {
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

.fade-enter-active {
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

.demo03 {
  width: 100%;
  height: 200px;
  //background-color: orange;
  overflow: hidden;
  margin-left: 10px;
}

.demo03 ul {
  list-style: none;
  position: relative;
}

.demo03 ul li {
  line-height: 30px;
  color: #fffefe;
}

.demo03 .content {
  display: flex;

}

//.demo03 .content span {
//  margin-left: 20px;
//  line-height: 40px;
//}

@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -900px, 0);
    transform: translate3d(0, -900px, 0);
  }
}

.demo03 ul.rowup {
  -webkit-animation: 70s rowup linear infinite normal;
  animation: 70s rowup linear infinite normal;
  position: relative;
}
</style>
