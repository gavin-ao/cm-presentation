<template>
  <div class="instructor-toueist">
    <div class="multilevelReward">
      <div class="totalReward">
        <block v-if="rewardList.length==0&&assisInfos.length==0">
          <div class="noRewardInfos">
            您还没有获得奖品
          </div>
        </block>
        <block v-else>
          <div class="assisReward" v-if="assisInfos.length">
            <img src="/static/images/assist.png" alt="" mode="widthFix">
            <div class="assisCon">
              <p class="assisName">{{assisInfos[0].rewardContent}}</p>
              <block v-if="assisInfos[0].remark&&assisInfos[0].rewardType==5">
                <p class="assisDes">{{assisInfos[0].remark}}</p>
              </block>
              <block v-else>
                <p class="assisDes">全场通用</p>
              </block>
            </div>
            <block v-if="assisInfos[0].rewardType==1||assisInfos[0].rewardType==2">
              <div class="assisBtn" @click="assisReceiveAreward">
                领奖
              </div>
            </block>
            <block v-if="assisInfos[0].rewardType==3">
              <button class="assisBtn" open-type="contact" hover-class="hoverNone" hover-stay-time="800"
                      @click="assistanceRewardAct" type="default" :session-from='assistanceSessionFrom'>
                领奖
              </button>
            </block>
            <block v-if="assisInfos[0].rewardType==5">
              <div class="assisBtn" @click="privateMall">
                领奖
              </div>
            </block>
          </div>
          <div class="invitReward">
            <div v-for="(item,index) in rewardList" :key="index" class="invitSingle">
              <img src="/static/images/invit.png" alt="" mode="widthFix">
              <div class="invitCon">
                <p class="invitName">{{item.rewardContent}}</p>
                <block v-if="item.remark&&item.rewardType==5">
                  <p class="invitDes">{{item.remark}}</p>
                </block>
                <block v-else>
                  <p class="invitDes">全场通用</p>
                </block>
              </div>
              <block v-if="item.rewardType==1||item.rewardType==2">
                <div class="invitBtn" @click="receiveAreward">
                  领奖
                </div>
              </block>
              <block v-if="item.rewardType==3">
                <button class="invitBtn" open-type="contact" hover-class="hoverNone" hover-stay-time="800"
                        @click="getRewardAct" type="default" :session-from='invitationSessionFrom0' v-if="index==0">
                  领奖
                </button>

                <button class="invitBtn" open-type="contact" hover-class="hoverNone" hover-stay-time="800"
                        @click="getRewardAct" type="default" :session-from='invitationSessionFrom1'
                        v-else-if="index==1">
                  领奖
                </button>

                <button class="invitBtn" open-type="contact" hover-class="hoverNone" hover-stay-time="800"
                        @click="getRewardAct" type="default" :session-from='invitationSessionFrom2'
                        v-else-if="index==2">
                  领奖
                </button>

                <button class="invitBtn" open-type="contact" hover-class="hoverNone" hover-stay-time="800"
                        @click="getRewardAct" type="default" :session-from='invitationSessionFrom3'
                        v-else-if="index==3">
                  领奖
                </button>
              </block>
                <block v-if="item.rewardType==5">
                  <div class="invitBtn" :data-initiator="item.initiatorRewardId" @click="receiveInitiatorReward">
                    领奖
                  </div>
                </block>
            </div>
          </div>
        </block>
      </div>
      <div class="addrBottom">
        <p class="addressTi">收货地址</p>
        <div class="addressShow" @click="addAddress" v-if="addressInfos==false" style="padding-top: 40rpx;">
          <p class="infosPl">实物奖品将于活动结束后以快递形式为您寄送，如果您中奖，为便于我们为您寄送实物奖品，请完善收货地址</p>
          <p class="modifyBtn">填写地址</p>
        </div>
        <div class="addressShow" v-if="addressInfos==true">
          <p>
            <span style="color:#474747;">{{addressInfo.addressee}}</span>
            <span>{{addressInfo.phoneNumber}}</span>
            <span> {{addressInfo.addr}}</span>
          </p>
          <p class="modifyBtn" @click="addAddress">修改地址</p>
        </div>
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
    /*padding: 20px;*/
    /*padding-bottom: 40px;*/
    background-color: #F1F1F1;
    font-family: PingFangSC-regular;
    .multilevelReward {
      box-sizing: border-box;
      padding: 20px;
      background-color: #FFF;
      margin-bottom: 120px;
      .totalReward {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        .noRewardInfos {
          padding-top: 50px;
          color: #ddd;
          font-size: 20px;
          text-align: center;
        }
        .assisReward {
          position: relative;
          margin-bottom: 20px;
          img {
            width: 100%;
          }
          .assisCon {
            height: 45px;
            position: absolute;
            left: 20px;
            top: calc(50% - 22.5px);
            .assisName {
              height: 25px;
              color: rgba(255, 255, 255, 1);
              font-size: 18px;
              text-align: left;
            }
            .assisDes {
              height: 14px;
              color: rgba(255, 255, 255, 1);
              font-size: 10px;
              text-align: left;
            }
          }
          .assisBtn {
            width: 80px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            color: rgba(72, 156, 255, 1);
            font-size: 14px;
            text-align: center;
            font-family: Arial;
            position: absolute;
            right: 25px;
            top: calc(50% - 15px);
            background-color: #fff;
          }
        }
        .invitReward {
          .invitSingle {
            position: relative;
            margin-top: 20px;
            .invitSingle:nth-child(1) {
              margin-top: 0px;
            }
            img {
              width: 100%;
            }
            .invitCon {
              height: 45px;
              position: absolute;
              left: 20px;
              top: calc(50% - 22.5px);
              .invitName {
                height: 25px;
                color: rgba(255, 255, 255, 1);
                font-size: 18px;
                text-align: left;
              }
              .invitDes {
                height: 14px;
                color: rgba(255, 255, 255, 1);
                font-size: 10px;
                text-align: left;
              }
            }
            .invitBtn {
              width: 80px;
              height: 30px;
              line-height: 30px;
              border-radius: 15px;
              font-size: 14px;
              text-align: center;
              font-family: Arial;
              position: absolute;
              right: 25px;
              top: calc(50% - 15px);
              background-color: #fff;
              color: rgba(255, 128, 72, 1);
            }
          }
        }
      }
      .addrBottom {
        position: fixed;
        bottom: 0px;
        left: 0px;
        /*background-color: #fff;*/
        /*padding: 10px 20px;*/
        /*box-sizing: border-box;*/
        width: 100%;
      }
      .addressTi {
        height: 24px;
        color: rgba(159, 159, 159, 1);
        font-size: 16px;
        text-align: left;
        padding-left: 20px;
        background-color: #F1F1F1;
      }
      .addAddress {
        margin: auto;
        margin-top: 20px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        color: rgba(241, 85, 34, 1);
        font-size: 14px;
        text-align: center;
        font-family: Microsoft Yahei;
        border: 1px solid rgba(241, 85, 34, 1);
      }
      .addressShow {
        text-align: left;
        background-color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
        height: 100px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        p:nth-child(1) {
          display: inline-block;
          width: calc(100% - 70px);
          vertical-align: middle;
          height: 100%;
          span {
            display: inline-block;
            width: 100%;
            color: rgba(159, 159, 159, 1);
            font-size: 12px;
            text-align: left;
          }
        }
        .infosPl {
          color: rgba(159, 159, 159, 1);
          font-size: 12px;
          text-align: left;
        }
        .modifyBtn {
          display: inline-block;
          width: 60px;
          margin-left: 10px;
          height: 30px;
          line-height: 28px;
          box-sizing: border-box;
          border-radius: 4px;
          color: rgba(241, 85, 34, 1);
          font-size: 13px;
          font-family: Microsoft Yahei;
        }
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        rewardList: [],
        addressShow: false,
        addressInfo: {},
        assisInfos: []
      }
    },
    onLoad(option) {
      // console.log(option);
      var that = this;
      Object.assign(that.$data, that.$options.data());
      var initList = that.infos.initiatorReward;
      // if(initList[initList.length-1]<that.headPic.length){
      //   that.addressShow = true;
      // }
      for (var i = 0; i < initList.length; i++) {
        if (initList[i].partakeNum <= that.headPic.length) {
          that.rewardList.push(initList[i]);
        }
      }
      var sessionID = that.$store.state.board.sessionID;
      var actId = that.$store.state.board.actId;
      wx.request({
        url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardInfoByOther",
        method: "POST",
        data: {sessionID: sessionID, actId: actId},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if (res.data.success) {
            if (res.data.code == 200) {
              that.assisInfos.push(res.data.data);
            }
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
    onShow() {
      var that = this;
      var sessionID = that.$store.state.board.sessionID;
      wx.request({
        url: that.$store.state.board.urlHttp + "/wechatapi/help/getAddr",
        method: "POST",
        data: {sessionID: sessionID},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if (res.data.success) {
            if (res.data.addr) {
              that.addressInfo = {
                addr: res.data.addr,
                phoneNumber: res.data.phoneNumber,
                addressee: res.data.addressee
              }
            }
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
    computed: {
      actId() {
        return this.$store.state.board.actId;
      },
      infos() {
        return this.$store.state.board.infos;
      },
      headPic() {
        return this.$store.state.board.headPic;
      },
      addressInfos() {
        if (JSON.stringify(this.addressInfo) == "{}") {
          return false;
        } else {
          return true;
        }
      },
      invitationSessionFrom0() {  //邀请 客服消息传递参数
        if (this.rewardList[0] && this.rewardList[0].initiatorRewardId) {
          return '{"actId":"' + this.$store.state.board.actId + '","type":1,"initiatorRewardId":"' + this.rewardList[0].initiatorRewardId + '"}';
        }
      },
      invitationSessionFrom1() {  //邀请 客服消息传递参数
        if (this.rewardList[1] && this.rewardList[1].initiatorRewardId) {
          return '{"actId":"' + this.$store.state.board.actId + '","type":1,"initiatorRewardId":"' + this.rewardList[1].initiatorRewardId + '"}';
        }
      },
      invitationSessionFrom2() {  //邀请 客服消息传递参数
        if (this.rewardList[2] && this.rewardList[2].initiatorRewardId) {
          return '{"actId":"' + this.$store.state.board.actId + '","type":1,"initiatorRewardId":"' + this.rewardList[2].initiatorRewardId + '"}';
        }
      },
      invitationSessionFrom3() {  //邀请 客服消息传递参数
        if (this.rewardList[3] && this.rewardList[3].initiatorRewardId) {
          return '{"actId":"' + this.$store.state.board.actId + '","type":1,"initiatorRewardId":"' + this.rewardList[3].initiatorRewardId + '"}';
        }
      },
      assistanceSessionFrom() {  //助力 客服消息传递参数
        if (this.assisInfos[0] && this.assisInfos[0].initiatorRewardId) {
          return '{"actId":"' + this.$store.state.board.actId + '","type":2,"initiatorRewardId":"' + this.assisInfos[0].initiatorRewardId + '"}';
        }
      },
    },
    methods: {
      addAddress() {
        var url = "/pages/address/main";
        if (JSON.stringify(this.addressInfo) != "{}") {
          url = "/pages/address/main?address=" + JSON.stringify(this.addressInfo);
        }
        wx.navigateTo({
          url: url
        })
      },
      assistanceRewardAct(e) {
        var that = this;
        //助力 埋点
        console.log(that.assistanceSessionFrom(3333));
        that.getRewardActCommandOpenWindowByOther();
      },
      getRewardActCommandOpenWindowByOther() {  //助力 埋点
        var that = this;
        var sessionID = that.$store.state.board.sessionID;
        var actId = that.$store.state.board.actId;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandOpenWindowByOther",
          method: "POST",
          data: {sessionID: sessionID, actId: actId},
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
      privateMall() {
        var that = this;
        var actId = that.$store.state.board.actId;
        var sessionID = that.$store.state.board.sessionID;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandByOther",
          method: "POST",
          data: {sessionID: sessionID, actId: actId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              that.assistanceRewardAct();
              wx.navigateToMiniProgram({
                appId: 'wx2548fa30af482bdf',
                path: 'pages/index/index?token=' + res.data.command,
                extraData: {
                  foo: 'bar'
                },
                envVersion: 'release',
                success(res) {
                  // 打开成功
                }
              })
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
      receiveInitiatorReward(e) {
        var that = this;
        var myHelpId = that.$store.state.board.myHelpId;
        var sessionID = that.$store.state.board.sessionID;
        // console.log(e.target.dataset.initiator);
        var initiator = e.target.dataset.initiator;
        if (initiator) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommand",
            method: "POST",
            data: {sessionID: sessionID, helpId: myHelpId, initiatorRewardId: initiator},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                that.getRewardAct();
                wx.navigateToMiniProgram({
                  appId: 'wx2548fa30af482bdf',
                  path: 'pages/index/index?token=' + res.data.command,
                  extraData: {
                    foo: 'bar'
                  },
                  envVersion: 'release',
                  success(res) {
                    // 打开成功
                  }
                })
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


        // wx.navigateToMiniProgram({
        //   appId: 'wx2548fa30af482bdf',
        //   path: 'pages/index/index?token="rebel21128rem',
        //   envVersion: 'release',
        //   success(res) {
        //     // 打开成功
        //   }
        // })
      },
       receiveAreward() {
        var that = this;
        var sessionID = that.$store.state.board.sessionID;
        var myHelpId = that.$store.state.board.myHelpId;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/haveRewardActCommand",
          method: "POST",
          data: {helpId: myHelpId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            // console.log(res);
            if (res.data.success) {
              that.getRewardAct();
              for (var i = 0; i < that.infos.initiatorReward.length; i++) {
                if (that.infos.initiatorReward[i].initiatorRewardId == res.data.initiatorRewardId) {
                  wx.navigateTo({
                    url: '/pages/rewardPage/main?datas=' + JSON.stringify(that.infos.initiatorReward[i])
                  });
                }
              }
            } else {

            }
          }
        })
      },
      assisReceiveAreward() {
        that.assistanceRewardAct();
        wx.navigateTo({
          url: '/pages/rewardPage/main?type=0&datas=' + JSON.stringify(this.assisInfos[0])
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
      var navTitle = "我的奖品";
      wx.setNavigationBarTitle({
        title: navTitle
      })
    },
    components: {}
  }
</script>
