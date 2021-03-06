import Vue from "vue";
import store from "./store";
import App from "./App";
import './iconfont/iconfont.css';

// import 'mp-weui/lib/style.css'
var Fly = require("flyio/dist/npm/wx");


var fly = new Fly();

Vue.prototype.$ajax = fly; //将fly实例挂在vue原型上
Vue.prototype.$store = store;

Vue.config.productionTip = false;
App.mpType = "app";


const app = new Vue({
  store,
  ...App
});
app.$mount();



export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ["^pages/logs/main",   "pages/activePower/main","pages/multilevelReward/main", "pages/address/main", "pages/instrustor/main",   "pages/showPages/main", "pages/confirmPage/main","pages/rewardPage/main"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "",
      navigationBarTextStyle: "black",
      backgroundColor:"#ffffff"
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
    "navigateToMiniProgramAppIdList": ["wx2548fa30af482bdf"]
  }
};
