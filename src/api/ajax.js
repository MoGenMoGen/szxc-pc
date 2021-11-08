import axios from 'axios';
import qs from 'qs';
import { MessageBox } from 'element-ui';
let url = 'http://szxc.jinkworld.com/api';

// 获取指定名称的cookie
function getCookie(name){
  var strcookie = document.cookie;//获取cookie字符串
  var arrcookie = strcookie.split("; ");//分割
  //遍历匹配
  for ( var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name){
      return arr[1];
    }
  }
  return "";
}

//ajax请求
function get(url,data){
  let promise = new Promise((resolve,reject)=>{
    axios.get('/api'+url,{params:data}).then(res=>{
		resolve(res.data)
      // if(!res.data.code || res.data.code==200){ //退出成功没有状态码
      //   resolve(res.data)
      // }else if(res.data.code==401){
      //   resolve(res.data)
      // }else {
      //   if(res.data.code==402 && res.data.msg.indexOf("请重新登陆")>-1 && window.location.href.indexOf('home/login')<=-1){
      //     console.log('被强制退出')
      //     setTimeout(()=>{
      //       window.location.href = '../home/login.html?login=true';
      //     },1500)
      //   }
      // }
    }).catch(error=>{
      console.log(error.response.data)
      if(error.response.data.message){
        MessageBox.alert(error.response.data.message, '提示', {
          confirmButtonText: '确定',
          callback: action => {

          }
        });
        // Toast.fail( error.response.data.message);
      }
    })
  });
  return promise;
}
function post(url,params) {
  let promise = new Promise((resolve, reject) => {
    axios.post('/api'+url, params).then(function (res) {
		  resolve(res.data)
        // if(!res.data.code || res.data.code===200){ //登录成功没有状态码
        //   resolve(res.data)
        // }else if(res.data.code===401){
        //   // Dialog.confirm({
        //   //   title: '提示',
        //   //   message: '您未登录，立即登录?',
        //   // })
        //   //   .then(() => {
        //   //     window.location.href = '../home/login.html'
        //   //   })
        //   //   .catch(() => {
        //   //
        //   //   });
        // }else if(url.indexOf('/blade-pay/ali/app')>-1){ //获取支付宝预支付订单信息接口
        //   resolve(res.data)
        // }else {
        // }
      })
      .catch(function (error) {
        if(error.response.data.message){
          MessageBox.alert(error.response.data.message, '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          // Toast.fail( error.response.data.message);
        }
      });
  });
  return promise;
}
class api {
  get(url,params){
    let promise = new Promise((resolve,reject)=>{
      axios.get('/api'+url,params).then(res=>{
		resolve(res.data.data)
        // if(res.data.code==200){
        //   resolve(res.data.data)
        // }else {
        // }
      }).catch(err=>{
        console.log(err.response)

      })
    });
    return promise;
  }
  getV2(url,params){
    let promise = new Promise((resolve,reject)=>{
      axios.get(url,params).then(res=>{
        resolve(res.data.data)
        // if(res.data.code==200){
        //   resolve(res.data.data)
        // }else {
        // }
      }).catch(err=>{
        console.log(err.response)

      })
    });
    return promise;
  }

  post(url,params){
    let promise = new Promise((resolve,reject)=> {
      axios.post('/api'+url, params).then(res=>{
			resolve(res.data)
          // if(response.data.code==200){
          //   resolve(response.data);
          // }else if(response.data.code==410){
          //   resolve(response.data);
          // }else {
          //   resolve(response.data);
          //   Toast(response.data.msg)
          // }
        })
        .catch(err=>{
			console.log(err.response)
        });
    });
    return promise;
  }
  //上传文件
  upload(formData){
    let header={
      'Content-Type': 'multipart/form-data',
    }
    // console.log(formData)
    let formImg = null
      formImg = new FormData()
      formImg.append( 'file',formData)
    let promise = new Promise((resolve,reject)=> {
      post('/blade-resource/oss/endpoint/put-file', formImg,header)
        .then(function (response) {
          if(response.data.code==200){
            resolve(response.data.data);
          }else if(response.data.code==410){
            resolve(response.data);
          }else {
            resolve(response.data);
            Toast(response.data.msg)
          }
        })
        .catch(function (error) {
        });
    });
    return promise;
  }
  // 获取天气
  getWeather() {
	return new Promise(resolve => {
	  get("/blade-xc/hik/getWeather",{}).then(res=>{
	    resolve(res)
	  })
	})
  }
  // 财务公开
  getCwgk(data) {
	return new Promise(resolve => {
	  get("/blade-xc/financeopen/list",data).then(res=>{
	    resolve(res.data)
	  })
	})
  }
  //经济发展情况
  getJjfz(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403239236205334530",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  //村名代表会议
  getCmdb(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403242241755574273",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  //村工程建设情况
  getCgcjs(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403243562617401346",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  //村土地（山林，山塘，鱼塘）资产等承包情况
  getZccb(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403253632247918593",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  //土地征用费发放情况
  getTdfy(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403255568414142466",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  //各种补助，补贴和优待抚恤金发放情况
  getBzff(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403256672682110978",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  // 低保，医疗保险，养老保险情况
  getBxqk(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403257598931234817",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  // 村民建房情况
  getCmjf(){
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=1403257926934196226",{}).then(res=>{
        resolve(res.data)
      })
    })
  }
  //素材分类新增
  imgClassifyAdd(data){
    return new Promise(resolve => {
      post("/blade-mall/api/materialcat/submit",data).then(res=>{
        resolve(res.data)
      })
    })
  }
  //财务公开
  caiwuList(data){
    return new Promise(resolve => {
      post("/blade-xc/financeopen/list",data).then(res=>{
        resolve(res.data)
      })
    })
  }
  // 紧急事件列表
  getEventList(data){
    return new Promise(resolve => {
      get("/blade-govern/event/list",data).then(res=>{
        resolve(res.data)
      })
    })
  }
  // 紧急事件详情
  getEventDetail(data) {
	return new Promise(resolve => {
	  get("/blade-govern/event/detail",data).then(res=>{
	    resolve(res.data)
	  })
	})
  }
  // 农家乐吃列表
  getEatList(data) {
  	return new Promise(resolve => {
  	  get("/blade-travel/eat/list",data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 农家乐住列表
  getHotelList(data) {
  	return new Promise(resolve => {
  	  get("/blade-travel/hotel/list",data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 事件追踪列表
  getTrackList(data) {
	return new Promise(resolve => {
	  get("/blade-govern/track/list",data).then(res=>{
	    resolve(res.data)
	  })
	})
  }
  // 事件追踪详情
  getTrackDetail(data) {
  	return new Promise(resolve => {
  	  get("/blade-govern/track/detail",data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 网格列表
  getGridList(data) {
	return new Promise(resolve => {
	  get("/blade-govern/grid/list",data).then(res=>{
	    resolve(res.data)
	  })
	})
  }
  // 网格详情
  getGridDetail(data) {
  	return new Promise(resolve => {
  	  get("/blade-govern/grid/detail",data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 网格总数
  getGridTotal() {
	return new Promise(resolve => {
	  get("/blade-govern/grid/total").then(res=>{
	    resolve(res.data)
	  })
	})
  }
  // 数据字典
  getDictionary(data) {
  	return new Promise(resolve => {
  	  get("/blade-system/dict-biz/dictionary?code="+data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 监控列表
  getCamera(data) {
  	return new Promise(resolve => {
  	  get("/blade-xc/camera/listByType?type="+data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 监控列表（排序）
  getCamera2(data) {
  	return new Promise(resolve => {
  	  get("/blade-xc/camera/listByType2",data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 住轮播
  getAdvert(data) {
  	return new Promise(resolve => {
  	  get("/blade-travel/advert/list",data).then(res=>{
  	    resolve(res.data)
  	  })
  	})
  }
  // 网格人员
  getPeopleList(data) {
	return new Promise(resolve => {
		get("/blade-xc/household/list",data).then(res=>{
		  resolve(res.data)
		})
	})
  }
  // 证明指南
  getGuideList(data) {
  	return new Promise(resolve => {
  		get("/blade-service/guide/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 垃圾分类
  getRubbishData() {
  	return new Promise(resolve => {
  		get("/blade-govern/rubbish/listByTm").then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 购列表
  getShopList(data) {
	return new Promise(resolve => {
		get("/blade-travel/shop/list",data).then(res=>{
		  resolve(res.data)
		})
	})
  }
  // 十大碗列表
  getTenList(data) {
  	return new Promise(resolve => {
  		get("/blade-travel/bowl/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 乡村西餐列表
  getWestList(data) {
  	return new Promise(resolve => {
  		get("/blade-travel/west/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 代驾联盟列表
  getDriveList(data) {
  	return new Promise(resolve => {
  		get("/blade-travel/driver/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 村民说事列表
  getSayList(data) {
  	return new Promise(resolve => {
  		get("/blade-honest/say/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 民意体检列表
  getOpinionList(data) {
  	return new Promise(resolve => {
  		get("/blade-honest/opinion/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 获取回复列表
  getCommentList(data) {
	return new Promise(resolve => {
		get("/blade-honest/comment/list",data).then(res=>{
		  resolve(res.data)
		})
	})
  }
  // 清风廉韵列表
  getUprightList(data) {
  	return new Promise(resolve => {
  		get("/blade-honest/upright/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 景点列表
  getSiteList(data) {
  	return new Promise(resolve => {
  		get("/blade-travel/site/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 巡查列表
  getPatrolList(data) {
  	return new Promise(resolve => {
  		get("/blade-govern/patrol/list",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 巡查详情
  getPatrolDetail(data) {
  	return new Promise(resolve => {
  		get("/blade-govern/patrol/detail",data).then(res=>{
  		  resolve(res.data)
  		})
  	})
  }
  // 红色课堂视频列表
  getRedClassVideo(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclassvideo/home",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色课堂视频详情
  getRedClassVideoDetail(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclassvideo/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色历史列表
  getRedHistoryList(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasshistory/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色历史详情
  getRedHistoryDetail(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasshistory/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色百宝箱列表
  getRedCaseList(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasscase/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色百宝箱详情
  getRedCaseDetail(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasscase/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 精品课程
  getRedCourse() {
    return new Promise(resolve => {
      get("/blade-xc/redclasscourse/home",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 先锋榜列表
  getTopList(data) {
    return new Promise(resolve => {
      get("/blade-part/partvan/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取户居分离列表
  getSeparateList(data){
    return new Promise(resolve => {
      get("/blade-part/mbr/separateList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 微心愿
  getWishList(data) {
    return new Promise(resolve => {
      get("/blade-part/wish/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党费缴纳
  getPartCost(data){
    return new Promise(resolve => {
      get("/blade-part/partcost/costLog",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取荣誉列表
  getHonorList(data) {
    return new Promise(resolve => {
      get("/blade-part/parthonor/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村委两班子
  getLeaderList(data) {
    return new Promise(resolve => {
      get("/blade-part/open/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 发展党员列表
  getDevelopList(data) {
    return new Promise(resolve => {
      get("/blade-part/partgrow/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党支部人员
  // getPartyList(data) {
  //   return new Promise(resolve => {
  //     get("/blade-part/mbr/list",data).then(res => {
  //       resolve(res.data)
  //     })
  //   })
  // }
  // 党员详情
  getPartyMemberDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/mbr/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 先锋榜详情
  getTopDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/partvan/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党员活动
  getActiveList(data) {
    return new Promise(resolve => {
      get("/blade-part/activity/list22",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党员活动详情
  partyActiveDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/activity/infoPc",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 网格党支部
  getPartyList(data) {
    return new Promise(resolve => {
      get("/blade-part/mbr/pcData",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 客流量
  getPassengerFlow() {
    return new Promise(resolve => {
      get("/blade-xc/hik/passengerFlow",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 警报列表
  getAlarmList() {
	return new Promise(resolve => {
	  get("/blade-xc/alarminfo/listData",{}).then(res => {
	    resolve(res)
	  })
	})
  }
  // 公共场所
  getPub(data){
	return new Promise(resolve => {
	  get("/blade-govern/pub/list",data).then(res => {
	    resolve(res.data)
	  })
	})
  }
  // 车流量
  getCarNum(){
  	return new Promise(resolve => {
  	  get("/blade-xc/hik/carNum?type=0",{}).then(res => {
  	    resolve(res.data)
  	  })
  	})
  }
  // 边坡位移量
  getDistance(){
  	return new Promise(resolve => {
  	  get("/tb-records/records/list",{}).then(res => {
  	    resolve(res)
  	  })
  	})
  }
  // 宅基地申请列表
  perApplyAllList(data) {
    return new Promise(resolve => {
      get("/blade-base/open/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
}
// 创建实例默认设置
var instance = axios.create({
    baseURL: url,
    timeout: 5000,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }
});

instance.interceptors.request.use(config=> {
  // console.log(config)
  // return
   //  if (config.method === 'post') {
   //    config.params = {
   //      token:localStorage.getItem('token'),
   //      //   token:'13FF7ABE13B23843',
   //      ...config.params
   //    }
   //  }else if(config.method === 'get'){
   //      config.params = {
   //          token:localStorage.getItem('token'),
			// //   token:'13FF7ABE13B23843',
   //          ...config.params
   //      }
   //  }
    return config;
}, (error) => {
    return Promise.reject(error);
})

instance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    //404等问题可以在这里处理
    auth(error.response.data.code, error.response.data.message);
    return Promise.reject(error);
});
export {api}

