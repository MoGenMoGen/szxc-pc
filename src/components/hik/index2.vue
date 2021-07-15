<!--执法监控-->
<template>
  <div class="video-player">
    <div id="divPlugin" ref="divPlugin" v-if="plugin"></div>
  </div>
</template>
<script>
export default {
  name: "videoPlayer",
  props: {
    cameraIndexCode: {
      type: String, default: '3'
    },
    codes: {
      type: String,
    },
    layout: {
      type: String, default: '1x1'
    },
    videoDialog: {
      type: Boolean, default: true
    },
  },
  data() {
    return {
      plugin: true,
      oWebControl: null,   //插件对象
      initCount: 0,
      pubKey: '',         //公钥加密
    };
  },
  mounted() {

  },

  methods: {

    //关闭插件
    off() {
      let _this = this;
      if (_this.oWebControl != null) {
        _this.oWebControl.JS_HideWnd();
        _this.oWebControl.JS_Disconnect();
      }
    },

    //   插件初始化
    initPlugin() {
      let _this = this;
      this.oWebControl = new WebControl({
        szPluginContainer: "divPlugin",
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
        cbConnectSuccess: (e) => {
          this.plugin = true;
          // _this.setCallbacks();
          if (_this.oWebControl) {
            _this.oWebControl.JS_StartService("window", {
              dllPath: "./VideoPluginConnect.dll"
            }).then((res) => {
              _this.oWebControl.JS_CreateWnd("divPlugin", 800, 800).then(() => {
                this.initVideo();
              });
            }, function () {
            });
          } else {
          }
        },
        cbConnectError: () => {
          _this.oWebControl = null;
          WebControl.JS_WakeUp("VideoWebPlugin://");
          _this.initCount++;
          if (_this.initCount < 3) {
            setTimeout(() => {
              _this.initPlugin();
            }, 3000)
          } else {
            this.plugin = false;
          }
        },
        cbConnectClose: () => {
          this.oWebControl.JS_Disconnect().then(function () {
          }, function () {
          });
          this.oWebControl = null;
        }
      });
      _this.oWebControl.oDocOffset.top = 155;
      _this.oWebControl.oDocOffset.left = 1792;
    },
    // 设置窗口控制回调
    setCallbacks() {
      this.oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: this.cbIntegrationCallBack
      });
    },
    // 推送消息
    cbIntegrationCallBack(oData) {
      this.$message.warning((JSON.stringify(oData.responseMsg)));
    },
    // 初始化参数
    initVideo() {
      let that = this;
      this.getPubKey(() => {
        let appkey = "22976517";                                  //综合安防管理平台提供的appkey，必填
        let secret = this.setEncrypt("kQhUuOaiehTT3vyUkJCt");   //综合安防管理平台提供的secret，必填
        let ip = "183.249.64.89";                           //综合安防管理平台IP地址，必填
        let playMode = 0;                                  //初始播放模式：0-预览，1-回放
        let port = 444;                                     //综合安防管理平台端口，若启用HTTPS协议，默认443
        let snapDir = "D:\\SnapDir";                       //抓图存储路径
        let videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
        let layout = this.layout;                           //playMode指定模式的布局
        let enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
        let encryptedFields = 'secret';					            //加密字段，默认加密领域为secret
        let showToolbar = 1;                               //是否显示工具栏，0-不显示，非0-显示
        let showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        let buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
        this.oWebControl.JS_RequestInterface({
          funcName: "init",
          argument: JSON.stringify({
            appkey: appkey,                            //API网关提供的appkey
            secret: secret,                            //API网关提供的secret
            ip: ip,                                    //API网关IP地址
            playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
            port: port,                                //端口
            snapDir: snapDir,                          //抓图存储路径
            videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
            layout: layout,                            //布局
            enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
            encryptedFields: encryptedFields,          //加密字段
            showToolbar: showToolbar,                  //是否显示工具栏
            showSmart: showSmart,                      //是否显示智能信息
            buttonIDs: buttonIDs                       //自定义工具条按钮
          })
        }).then((oData) => {
              that.oWebControl.JS_Resize(410,250);
              this.startRealPlay()
            }
        );
      })
    },
    // 获取公钥
    getPubKey(callback) {
      this.oWebControl.JS_RequestInterface({
        funcName: "getRSAPubKey",
        argument: JSON.stringify({
          keyLength: 1024
        })
      }).then((oData) => {
        //获取公钥
        if (oData.responseMsg.data) {
          this.pubKey = oData.responseMsg.data;
          callback()
        }
      })
    },
    // RSA加密
    setEncrypt(value) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },

    toPlay() {
      let arr;
      // if (this.cameraIndexCode === "0") {
      //   arr = ["9e27366459024dfeb9da1d928db2860f", "32df7576620846e5850153e18d5731cf", "21b943aa87254d25b10d525c8c64c91c", "0fb157b75338412d854145f534eae3ff", "4c4fec8c33f14b05b1220410ff6083b3", "f8e9a9d033d54da6a514284a1e1c73ec", "400f8cd2631146ae86b6836b726e735d", "f5d82fc4b28a4b39b06c08ac64b81063", "2a19f151bffc4a368564879f4bc42803"];
      //
      //   for (let i = 0; i < arr.length; i++) {
      //     this.startRealPlay2(arr[i], i + 1)
      //   }
      // }
      //执法
      // if (this.cameraIndexCode === "1") {
      //   arr = ["2c3a354237f149b980f4b4d19697a35f", "e75e11e3598c4868a0e43ae1aa88f44c",];
      //   for (let i = 0; i < arr.length; i++) {
      //     this.startRealPlay2(arr[i], i + 1)
      //   }
      // }

      // console.log(this.codes)

      // if (this.cameraIndexCode === "4"){
      //   arr = ["f7fb34bda82b4a1e90c86f381d59af73", "f1bba68174b8401fa4dd5e22440ae1b6","22252acaaaeb47b0887cd0a294a0685b","f51d56c92b474494ad262aa67c9c13b2"];
      //   for (let i = 0; i < arr.length; i++) {
      //     this.startRealPlay2(arr[i], i + 1)
      //   }
      // }


    },
    // 视频预览
    startRealPlay() {
      // console.log('------开始播放-------');
      let cameraIndexCode = this.codes;            //"ef7431a9b47c43d0a6c26c2037dcb18b";
      // console.log(cameraIndexCode)
      // let cameraIndexCode  =  '17396d5f47a34e288b3c7edfb19e5535'            //"ef7431a9b47c43d0a6c26c2037dcb18b";
      let streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
      let transMode = 1;                                      //传输协议：0-UDP，1-TCP
      let gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
      let wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）
      // cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      // cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
      this.oWebControl.JS_RequestInterface({
        funcName: "startPreview",
        argument: JSON.stringify({
          cameraIndexCode: cameraIndexCode,
          streamMode: streamMode,
          transMode: transMode,
          gpuMode: gpuMode,
          wndId: wndId
        })
      });
    },
    startRealPlay2(code, i) {
      let cameraIndexCode = code;            //"ef7431a9b47c43d0a6c26c2037dcb18b";
      let streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
      let transMode = 1;                                      //传输协议：0-UDP，1-TCP
      let gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
      let wndId = i;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
      this.oWebControl.JS_RequestInterface({
        funcName: "startPreview",
        argument: JSON.stringify({
          cameraIndexCode: cameraIndexCode,
          streamMode: streamMode,
          transMode: transMode,
          gpuMode: gpuMode,
          wndId: wndId
        })
      });
    },


    //根据窗口变化设置视频插件大小
    resizewindow(w, h) {
      w = (w < 1423) ? 1423 : w;
      h = (h < 754) ? 754 : h;
      window.resizeTo(w, h);
    },
  },
  watch: {
    // width() {
    //   let _this = this
    //   window.console.log("宽度监听")
    //   // window.console.log(this.width)
    //   _this.oWebControl.JS_CreateWnd("divPlugin", 600, 600).then(() => {
    //     _this.initVideo();
    //   });
    // },

    // videoDialog(n) {
    //   if (n) {
    //     this.initPlugin();
    //   }
    // }
  }
};
</script>


