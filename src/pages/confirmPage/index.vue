<template>
  <div class="instructor-toueist">
    <div class="confirmTotal">
      <p class="title">
        恭喜您获得{{datas.rewardContent}}
      </p>
      <div class="contentMid">
        <div>
          <img src="/static/images/hongbao.png" alt="">
          <span>{{datas.rewardContent}}</span>
        </div>
        <p>确认领奖后助力活动终止，无法再次发起活动</p>
      </div>
      <div class="footer">
        <p v-if="diffNum">还差{{diffNum}}人助力即可获得终极大奖，不再努力下吗？</p>
        <p v-else>达到最大奖励，获得终极大奖。</p>
      </div>
      <div class="menuT">

        <button class="trys menus" v-if="diffNum" @click="continueHelp">再试试</button>

        <button class="menu menus" @click="receiveAreward" v-if="datas.rewardType==1||datas.rewardType==2">领取奖励</button>
        <button class="menu menus" open-type="contact" hover-class="hoverNone" hover-stay-time="800"
                @click="getRewardAct" type="default" :session-from="invitationSessionFrom"
                v-else-if="datas.rewardType==3">
          领取奖励
        </button>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .instructor-toueist {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    padding: 10px;
    background-color: #fff;
    .confirmTotal {
      background-color: #FFFBEE;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 15px;
      .title {
        color: #525E71;
        font-size: 20px;
        padding-top: 25px;
      }
      .contentMid {
        div {
          width: 254px;
          height: 300px;
          margin: auto;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            position: relative;
            top: -225px;
            color: #fff;
            font-size: 20px;
            display: inline-block;
            width: 150px;
            box-sizing: border-box;
            word-wrap: break-word

          }
        }
        p {
          color: #5F5F5F;
          font-size: 10px;
          margin-top: -10px;
        }

      }
      .footer {
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
        margin-top: 30px;
        p {
          color: #F05522;
          font-size: 20px;
        }
      }
      .menuT {
        margin-top: 50px;
        font-size: 14px;
        height: 30px;
        .menus {
          width: 35%;
          height: 30px;
          line-height: 28px;
          text-align: center;
          border-radius: 15px;
          border: none;
          display: inline-block;
        }

        .trys {
          border: 1px solid #F05522;
          color: #F05522;
          box-sizing: border-box;
          margin-right: 20px;
          background-color: #fff;
        }
        .menu {
          border: 1px solid transparent;
          background-color: #F05522;
          color: #fff;
        }
        button {
          padding: 0px;
          font-size: 14px;
        }
        button::after {
          border: none;
        }
        div {
          display: inline-block;


        }

      }
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        datas: {},
        diffNum: 0
      }
    },
    onLoad(option) {


    },
    onShow() {
      var that = this;
      var sessionID = that.$store.state.board.sessionID;
      var myHelpId = that.$store.state.board.myHelpId;
      that.diffNum = that.infos.initiatorReward[that.infos.initiatorReward.length - 1].partakeNum - that.headPic.length;
      wx.request({
        url: that.$store.state.board.urlHttp + "/wechatapi/help/haveRewardActCommand",
        method: "POST",
        data: {helpId: myHelpId, sessionID: sessionID},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if (res.data.success) {
            for (var i = 0; i < that.infos.initiatorReward.length; i++) {
              if (that.infos.initiatorReward[i].initiatorRewardId == res.data.initiatorRewardId) {
                that.datas = that.infos.initiatorReward[i];
              }
            }

          } else {

          }

        }
      })
    },
    computed: {
      infos() {
        return this.$store.state.board.infos
      },
      headPic() {
        return this.$store.state.board.headPic
      },
      invitationSessionFrom() {  //邀请 客服消息传递参数
        return '{"actId":"' + this.$store.state.board.actId + '","type":1}';
      }
    },
    methods: {
      receiveAreward() {
        wx.navigateTo({
          url: '/pages/rewardPage/main?datas=' + JSON.stringify(this.datas)
        });
      },
      continueHelp() {
        var actId = this.$store.state.board.actId;
        var myHelpId = this.$store.state.board.myHelpId;
        wx.navigateTo({
          url: '/pages/showPages/main?actId=' + actId + "&helpId=" + myHelpId
        });
      },
      getRewardAct() {
        var that = this;
        var sessionID = that.$store.state.board.sessionID;
        var myHelpId = that.$store.state.board.myHelpId;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandOpenWindow",
          method: "POST",
          data: {helpId: myHelpId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
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

    },
    created() {
    },
    mounted() {
      var navTitle = "奖励确认";
      wx.setNavigationBarTitle({
        title: navTitle
      })
    },
    components: {}
  }
</script>
