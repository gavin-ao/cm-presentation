<template>
  <div class="instructor-toueist">
    <div class="confirmTotal">
      <div class="title">
        <img class="img1" src="/static/images/tishi.png" alt="">
        <img class="img2" src="/static/images/tishi.png" alt="">
        <img class="img3" src="/static/images/tishi.png" alt="">
        <span> {{datas.rewardContent}}</span>
      </div>
      <div class="contentText">
        恭喜您获得{{datas.rewardContent}}
      </div>
      <p class="lines"></p>
      <div class="rewardText">
        <div v-if="datas.rewardType == 2" class="taobaoPassword" @longtap="copyTBL">
        {{contentMid}}
        </div>
        <div v-if="datas.rewardType == 1" class="perYard">
          <img :src="rewardImg" alt="">
          <span>请您截图保存</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <img class="beijing" src="/static/images/beijing.png" alt="">
      <img class="biaoshi" src="/static/images/biaoshi.png" alt="">
    </div>
  </div>
</template>

<style lang="scss">
  .instructor-toueist {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background-color: #EF1436;
    background-color: #fff;
    .confirmTotal{
      background-color: #FFFBEE;
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 15px;
      border-radius: 12px;
      box-sizing: border-box;
      .title{
        width: 200px;
        height: 95px;
        line-height: 95px;
        font-size: 24px;
        color: #F6120A;
        word-wrap:break-word;
        margin: auto;
        margin-top: 94px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
          top:0px;
          left: 0px;
        }
        .img1{
          transform: rotate(15deg);
        }
        .img2{
          transform: rotate(165deg);
        }
        span{
          display: inline-block;
          position: relative;
        }
      }
      .contentText{
        margin: auto;
        margin-top: 35px;
        color: #B6724E;
        font-size: 20px;
      }
      .lines{
        width: 100%;
        padding: 0px 40px;
        box-sizing: border-box;
        background-color: #B6724E;
        height: 1px;
        margin: auto;
        margin-top: 12px;
      }
      .rewardText{
        margin: auto;
        width: 100%;
        text-align: center;
        margin-top: 35px;
        .taobaoPassword{
          width: 185px;
          height: 70px;
          color: #5F5F5F;
          font-size: 14px;
          word-wrap:break-word
        }
        .perYard{
          margin: auto;
          width: 120px;
          height: 120px;
          img{
            width: 100%;
            height: 100%;
          }
          span{
            font-size: 10px;
            color: #5F5F5F;
          }
        }
      }
    }
    .footer{
      width: 100%;
      height: 134px;
      position: fixed;
      bottom: 0px;
      text-align: center;
      img.beijing{
        width: 100%;
        height: 100%;
      }
      img.biaoshi{
        width: 80px;
        height: 80px;
        position: relative;
        top: -128px;
      }
    }

  }
</style>

<script>

  export default {
    data() {
      return {
        datas:{},
        contentMid:'',
        rewardImg:'',

      }
    },
    onLoad(option) {
      this.datas = JSON.parse(option.datas);
      console.log(option.datas)
      var that = this;
      var myHelpId = that.$store.state.board.myHelpId;
      var sessionID = that.$store.state.board.sessionID;
      if (that.datas.rewardType == 1) {
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandQrcode",
          method: "POST",
          data: {sessionID: sessionID, helpId: myHelpId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              if (res.data.rewardActContent) {
                that.contentMid = res.data.rewardActContent.contentMid;
              }
              that.rewardImg = that.$store.state.board.urlHttp + res.data.filePath;
              //邀请 埋点
              that.getRewardActCommandOpenWindow();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      } else if (that.datas.rewardType == 2) {
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommand",
          method: "POST",
          data: {sessionID: sessionID, helpId: myHelpId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              if (res.data.rewardActContent) {
                that.contentMid = res.data.rewardActContent.contentMid;
              }
              //邀请 埋点
              that.getRewardActCommandOpenWindow();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }

    },
    onShow(){
      var that = this;

    },
    computed: {

    },
    methods: {
      invitationSessionFrom() {  //邀请 客服消息传递参数
        return '{"actId":"' + this.$store.state.board.actId + '","type":1}';
      },
      getRewardActCommandOpenWindow() {   //邀请 埋点
        var that = this;
        var sessionID = that.$store.state.board.sessionID;
        var myHelpId = that.$store.state.board.myHelpId;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandOpenWindow",
          method: "POST",
          data: {helpId: myHelpId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {

            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      },
      copyTBL(e) {
        var self = this;
        var dataSet = self.contentMid;
        wx.setClipboardData({
          data: dataSet,
          success: function (res) {
            if (res.errMsg == 'setClipboardData:ok') {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 1500
              })
            } else {
              wx.showToast({
                title: '复制失败，请重新复制',
                icon: 'success',
                duration: 1500
              })
            }
          }
        });

      }

    },
    created() {
    },
    mounted() {

    },
    components: {}
  }
</script>
