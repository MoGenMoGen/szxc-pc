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
function get(url,params){
  let promise = new Promise((resolve,reject)=>{
    axios.get('/api'+url,params).then(res=>{
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
