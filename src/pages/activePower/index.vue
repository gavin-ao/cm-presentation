<template>
  <div class="vist-userInfo">
    <div class="helpInfos" :class="{rewardCondition:helpInfos===false}">
      <div>
        <p class="tit">提示</p>
        <p class="con">需要允许微信授权才能继续操作</p>
        <button class="menus" @getuserinfo="helpInfoss" open-type="getUserInfo" hover-class="hoverNone"
                hover-stay-time="800"> 确定
        </button>
      </div>
    </div>
    <div class="containes" :style="{height:posterH+'px'}">
      <movable-area style="">
        <movable-view direction="vertical" class="activeRule" :class="{rulesCondition:rulesInfos===true}" @click="activeRules">活动规则</movable-view>
      </movable-area>
      <img :src="goLink" alt="" mode="aspectFit"> <span></span>
    </div>
    <div class="record" :class="{rewardCondition:rulesOfActivity===true}">
      <p style="position: fixed;z-index: 1000;width:calc(100% - 40rpx);text-align: center;" @click="modelSetClose1">
        <img src="/static/img/modelArrow.png" alt="" style="width: 40rpx;height: 32rpx;">
      </p>
      <p class="modelTitle" v-if="headPic.length==partakeNum">助力完成</p>
      <div class="invitation">
        <div class="helpZero" v-if="headPic.length==0">
          <img class="noneImg" src="/static/img/none.png" alt="">
          <p>还没有人助力</p>

        </div>
        <div class="helpPeo" v-else-if="headPic.length<=partakeNum">
          <p><span class="helpNum"> {{headPic.length}}</span><br/>邀请记录</p>
          <scroll-view scroll-y>
            <p class="helpUserImg">
              <img :src="item.img" v-for="(item,index) in headPic" :key="index" alt="">
            </p>
          </scroll-view>
          <p class="helpLackNum" v-if="headPic.length<partakeNum">还差（{{partakeNum - headPic.length}}）位</p>
          <!--<p v-else-if="invitationRewardType == 3">-->
          <!--<span style="display: inline-block;font-size: 14px;font-weight: lighter;margin-top: 10px;">数量有限，先到先得哦</span>-->
          <!--</p>-->
        </div>
        <div class="menu">
          <div class="menus" @click="existDoHelps" :class="{rewardCondition:manIsFull=='manIsFull'}"
               hover-class="hoverNone"
               hover-stay-time="800">
            {{btnText.bxt_full}}
          </div>
          <button class="menus" @getuserinfo="bindGetUserInfo" :class="{rewardCondition:giveHelp=='giveHelp'}"
                  open-type="getUserInfo" hover-class="hoverNone" hover-stay-time="800"> {{btnText.bxt_help}}
          </button>
          <div class="menus" @click="existDoHelps" :class="{rewardCondition:alreadyHelp=='alreadyHelp'}"
               hover-class="hoverNone" hover-stay-time="800">
            {{btnText.bxt_alhelp}}
          </div>
          <div class="menus" @click="continueHelp" :class="{rewardCondition:continueToInvite=='continueToInvite'}"
               hover-class="hoverNone" hover-stay-time="800">
            <span v-if="headPic.length==0">{{btnText.bxt_continue}}</span>
            <span v-else>{{btnText.bxt_continue1}}</span>
          </div>
          <div class="menus" @click="receiveAreward" :class="{rewardCondition:receiveReward=='receiveReward'}"
               hover-class="hoverNone" hover-stay-time="800" v-if="invitationRewardType==1 || invitationRewardType==2">
            {{btnText.bxt_reward}}
          </div>
          <button class="menus" :class="{rewardCondition:receiveReward=='receiveReward'}" open-type="contact"
                  hover-class="hoverNone" hover-stay-time="800" @click="getRewardAct" type="default"
                  :session-from=invitationSessionFrom v-else-if="invitationRewardType==3" style="margin-top: 10px;">
            {{btnText.bxt_reward}}
          </button>
        </div>
      </div>
    </div>
    <div class="menu">
      <button class="menuss" open-type="getUserInfo" @getuserinfo="getUserInfoInvite"
              :class="{rewardCondition:getInfoInvite=='getInfoInvite'}" hover-class="hoverNone" hover-stay-time="800">
        {{btnText.bxt_invite}}
      </button>
    </div>
    <p class="modelSetP" :class="{rewardCondition:rulesOfModel===false}" @click="modelSetExpand1">
      <img src="/static/img/modelArrow.png"
           style="transform: rotate(180deg);-webkit-transform: rotate(180deg);width: 40rpx;height: 32rpx;" alt="">
    </p>
    <p class="modelSetP" :class="{rewardCondition:modelSetP===false}" @click="modelSetExpand">
      <img src="/static/img/modelArrow.png"
           style="transform: rotate(180deg);-webkit-transform: rotate(180deg);width: 40rpx;height: 32rpx;" alt="">
    </p>
    <div class="maskRules" :class="{menuStyle:checkedRules == true}">
      <!--<div class="maskRules menuStyle" >-->
      <div class="modelTask">
        <div style="">
          <p class="maskClose" @click="closeMash">
            <img src="/static/img/close.png" class="closeMask"/>
          </p>

          <p class="modelTitle">活动规则</p>
          <img src="/static/img/line.png" class="lines" alt="" style="">
          <scroll-view scroll-y>
            <block v-for="(item,index) in ruleArr" :key="index">
              <p style="font-size: 13px; line-height: 17px; color: #4A4A4A; margin-top: 5px; font-weight: lighter;">
                <span style="display: inline-block;width: 7%; float: left">{{(index+1)}}、</span>
                <span style="display: inline-block;width: 92%;">{{item}}</span>
              </p>
            </block>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="mask" :class="{menuStyle:checked == true}">
      <p style="position: fixed;z-index: 1000;width:calc(100% - 40rpx);text-align: center;" @click="modelSetClose">
        <img src="/static/img/modelArrow.png" alt="" style="width: 40rpx;height: 32rpx;">
      </p>
      <div class="modelTask">
        <div style="">
          <p class="modelTitle">为好友助力成功</p>
          <block v-if="assistanceRewardType==1">
            <p class="modelContent">
              {{contentHead}}
            </p>
            <p class="codes">
              <img :src="rewardImg" alt="" mode="aspectFit">
            </p>
            <p class="copy">
              {{contentFoot}}
            </p>
          </block>
          <block v-else-if="assistanceRewardType==2">
            <p class="modelContent">
              恭喜您获得 助力奖励
            </p>
            <p class="codess" @longtap="copyTBL">
              {{contentMid}}
            </p>
            <p class="copy" @longtap="copyTBL"> （长按复制）</p>
            <p class="copy">
              {{contentFoot}}
            </p>
          </block>
          <block v-else-if="assistanceRewardType==3">
            <p class="modelContent" style="font-size: 14px;color: #F05522;margin-bottom: 50px;margin-top: 10px;">
              恭喜您获得 助力奖励
            </p>
            <p class="copy">
              {{contentFoot}}
            </p>
            <button class="btn modelMyHelp" open-type="contact"
                    hover-class="hoverNone" hover-stay-time="800" @click="assistanceRewardAct" type="default"
                    :session-from=assistanceSessionFrom>{{btnText.bxt_reward}}
            </button>
          </block>
          <div class="btn modelMyHelp" @click="existDoHelps">{{contentBtn}}</div>
        </div>
      </div>
    </div>
    <div class="maskRule" :class="{menuStyle:checkedRule == true}">
      <!--<div class="maskRule menuStyle">-->
      <div class="modelTask">
        <div style="">
          <p class="maskClose" @click="closeMash">
            <img src="/static/img/close.png" class="closeMask"/>
          </p>
          <p class="modelTitle">任务达成</p>

          <block v-if="invitationRewardType==1">
            <p class="modelContent">
              {{contentHead}}
            </p>
            <p class="codes">
              <img :src="rewardImg" alt="" mode="aspectFit">
            </p>
            <p class="copy">
              {{contentFoot}}
            </p>
          </block>
          <block v-else-if="invitationRewardType==2">
            <p class="modelContent">
              恭喜您获得 奖励
            </p>
            <p class="codess" @longtap="copyTBL">
              {{contentMid}}
            </p>
            <p class="copy" @longtap="copyTBL"> （长按复制）</p>
            <p class="copy">
              {{contentFoot}}
            </p>
          </block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "../../utils/utils.js";

  export default {
    data() {
      return {
        actRule: '',  //活动规则
        exchangeRule: '', //兑换流程
        arrImage: [],
        rulesOfActivity: '',
        exithelpId: '',
        contactsCondition: '',
        commandText: '',
        contentTitle: '', //领取奖励标题
        contentHead: '', //领取奖励头部
        contentMid: '', //领取奖励中部
        contentFoot: '', //领取奖励脚部
        contentBtn: '', //领取奖励按钮
        ruleArr: [],
        rewardImg: '',
        modelSet: '',
        modelSetP: true,
        rulesOfModel: true,
        helpInfos: true,
        rulesInfos:false
      }
    },
    onLoad(option) {
      // console.log(option);
      var that = this
    },
    onShow(option) {
      var that = this;
      Object.assign(that.$data, that.$options.data());
      var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/activity/getCurrentActivityInfo';
      wx.request({
        url: sysUrl,
        method: "POST",
        data: {storeId: that.$store.state.board.storeId},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if (res.data.success) {
            that.rulesInfos = true;
            that.$store.state.board.actId = res.data.actId;   //活动ID
            that.$store.state.board.goLink = that.$store.state.board.urlHttp + res.data.url;   //海报图片
            that.actRule = res.data.actRule;
            that.ruleArr = that.actRule.split('\n'); //活动规则
            that.exchangeRule = res.data.exchangeRule;   //兑换流程
            that.$store.state.board.actShareTitle = res.data.actShareTitle;  //分享标题
            that.$store.state.board.actTitle = res.data.actTitle;   //活动标题
            that.$store.state.board.partakeNums = res.data.partakeNum;  //助力人数
            that.$store.state.board.btnText = res.data.btnText;   //按钮文案
            that.$store.state.board.actShareCopywriting = res.data.actShareCopywriting;  //玩法说明
            that.$store.state.board.invitationRewardType = res.data.initiatorRewardType; //邀请奖励类型
            that.$store.state.board.assistanceRewardType = res.data.assistanceRewardType; //助力奖励类型
            wx.setNavigationBarTitle({
              title: res.data.actTitle
            })
            if (res.data.url) {
              wx.getImageInfo({
                src: that.$store.state.board.goLink,
                success: (res) => {
                  that.$store.state.board.posterH = res.height;
                  that.$store.state.board.posterW = res.width;
                  that.$store.state.board.drawPoster = res.path;
                }
              })
            }
            // 查看是否授权
            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  var otherHelpId = that.$store.state.board.otherHelpId;
                  if (otherHelpId) {
                    var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/help/findHelpDetailUserList';
                    wx.request({
                      url: sysUrl,
                      method: "POST",
                      data: {helpId: otherHelpId},
                      header: {'content-type': 'application/x-www-form-urlencoded'},
                      success: function (res) {
                        that.$store.state.board.headPic = [];
                        if (res.data.success) {
                          that.headPicArr(that, res.data.data)
                        }
                        that.modelSet = true;
                        utils.login(that, function (sessionID, actId, otherHelpId) {
                          wx.request({
                            url: that.$store.state.board.urlHttp + "/wechatapi/help/existDoHelpByActId",
                            method: "POST",
                            data: {actId: actId, sessionID: sessionID, helpId: otherHelpId, type: 1},
                            header: {'content-type': 'application/x-www-form-urlencoded'},
                            success: function (res) {
                              that.$store.state.board.checked = false;
                              if (res.data.success) {
                                that.assistanceModel(res.data);
                                that.$store.state.board.existDoHelp = false;
                                that.$store.state.board.myExistDoHelp = true;
                                that.exithelpId = true;
                                that.rulesOfActivity = true;
                              } else {
                                if (res.data.code == '102') {
                                  that.$store.state.board.existDoHelp = true;
                                  that.$store.state.board.myExistDoHelp = false;
                                  that.exithelpId = true;
                                  that.rulesOfActivity = true;
                                  that.$store.state.board.myHelpId = otherHelpId;
                                  // console.log(that.$store.state.board.myHelpId)
                                } else {
                                  that.wantActivity(that, sessionID, otherHelpId, actId);
                                }
                              }
                            }
                          })
                        })
                      }
                    })
                  }
                  else {
                    utils.login(that, function (sessionID, actId) {
                      wx.request({
                        url: that.$store.state.board.urlHttp + "/wechatapi/help/findHelpDetailUserList",
                        method: "POST",
                        data: {actId: actId, sessionID: sessionID},
                        header: {'content-type': 'application/x-www-form-urlencoded'},
                        success: function (res) {
                          that.$store.state.board.headPic = [];
                          if (res.data.success) {
                            that.$store.state.board.myHelpId = res.data.helpId;
                            if (res.data.data) {
                              that.headPicArr(that, res.data.data)
                            }
                            that.modelSet = true;
                            that.$store.state.board.myExistDoHelp = false;
                            that.$store.state.board.existDoHelp = true;
                            that.exithelpId = true;
                            that.rulesOfActivity = true;
                          }
                          else {
                            that.exithelpId = false;
                            that.$store.state.board.existDoHelp = true;
                            that.$store.state.board.myExistDoHelp = false
                          }
                        }
                      })
                    })
                  }
                }
                else {
                  var otherHelpId = that.$store.state.board.otherHelpId;
                  if (otherHelpId) {
                    that.helpInfos = false;
                  } else {
                    that.exithelpId = false;
                    that.$store.state.board.existDoHelp = true;
                    that.$store.state.board.myExistDoHelp = false;
                  }
                }
              }
            })
          } else {
            wx.setStorageSync("storeId", "");
            wx.showToast({
              title: "该门店暂无进行中的活动",
              icon: 'none',
              duration: 2000
            })
            wx.redirectTo({
              url: '/pages/instrustor/main'
            })
          }
        },
        fail:function (err) {
          wx.setStorageSync("storeId", "");
          wx.showToast({
            title: "接口请求失败",
            icon: 'none',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/instrustor/main'
          })
        }
      })
    },
    onReady(option) {

    },
    methods: {
      helpInfoss() {
        var that = this;
        utils.login(that, function (sessionID, actId, otherHelpId) {
          var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/help/findHelpDetailUserList';
          wx.request({
            url: sysUrl,
            method: "POST",
            data: {helpId: otherHelpId},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              that.helpInfos = true;
              that.$store.state.board.headPic = [];
              if (res.data.success) {
                that.headPicArr(that, res.data.data)
              }
              that.modelSet = true;
              wx.request({
                url: that.$store.state.board.urlHttp + "/wechatapi/help/existDoHelpByActId",
                method: "POST",
                data: {actId: actId, sessionID: sessionID, helpId: otherHelpId, type: 1},
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success: function (res) {
                  that.$store.state.board.checked = false;
                  if (res.data.success) {
                    that.assistanceModel(res.data);
                    that.$store.state.board.existDoHelp = false;
                    that.$store.state.board.myExistDoHelp = true;
                    that.exithelpId = true;
                    that.rulesOfActivity = true;
                  } else {
                    if (res.data.code == '102') {
                      that.$store.state.board.existDoHelp = true;
                      that.$store.state.board.myExistDoHelp = false;
                      that.exithelpId = true;
                      that.rulesOfActivity = true;
                      that.$store.state.board.myHelpId = otherHelpId;
                    } else {
                      that.wantActivity(that, sessionID, otherHelpId, actId);
                    }
                  }
                }
              })
            }
          })
        });
      },
      getUserInfoInvite() {
        this.myToHelp()
      },
      bindGetUserInfo() {
        this.continueToHelp()
      },

      continueToHelp() {
        var that = this;
        that.helpInfoss();
      },
      continueHelp() {
        var actId = this.$store.state.board.actId;
        var sessionID = this.$store.state.board.sessionID;
        var that = this;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getHelpId",
          method: "POST",
          data: {sessionID: sessionID, actId: actId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              that.$store.state.board.myHelpId = res.data.helpId;
              wx.redirectTo({
                url: '/pages/showPages/main?actId=' + actId + "&helpId=" + res.data.helpId
              })
            }else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      },
      myToHelp() {
        var that = this;
        utils.login(that, function (sessionID, actId) {
          if (actId) {
            wx.request({
              url: that.$store.state.board.urlHttp + "/wechatapi/help/execuHelp",
              method: "POST",
              data: {sessionID: sessionID, actId: actId},
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  that.$store.state.board.myHelpId = res.data.helpId;
                  wx.redirectTo({
                    url: '/pages/showPages/main?actId=' + actId + "&helpId=" + res.data.helpId
                  })
                }else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }
        });
      },
      wantActivity(that, sessionID, otherHelpId, actId) {
        if (that.headPic.length < that.partakeNum) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/help/clickHelpUrl",
            method: "POST",
            data: {helpId: otherHelpId, sessionID: sessionID},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/help/findHelpDetailUserList';
                //邀请列表
                wx.request({
                  url: sysUrl,
                  method: "POST",
                  data: {helpId: otherHelpId},
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    that.$store.state.board.headPic = [];
                    if (res.data.success) {
                      that.headPicArr(that, res.data.data)
                    }else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  }
                })
                if (that.$store.state.board.assistanceRewardType == 2) {
                  that.$store.state.board.existDoHelp = false;
                  that.$store.state.board.myExistDoHelp = true;
                } else {
                  if (that.assistanceRewardType == 1) {
                    wx.request({
                      url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandQrcodeByOther",
                      // url: "http://192.168.50.52:8099/wechatapi/help/getRewardActCommandQrcodeByOther",
                      method: "POST",
                      data: {sessionID: sessionID, actId: actId},
                      header: {'content-type': 'application/x-www-form-urlencoded'},
                      success: function (res) {
                        that.$store.state.board.checked = false;
                        if (res.data.success) {
                          that.assistanceModel(res.data);
                        } else {
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                          })
                        }
                        that.$store.state.board.existDoHelp = false;
                        that.$store.state.board.myExistDoHelp = true;
                        //助力 埋点
                        that.getRewardActCommandOpenWindowByOther();
                      }
                    })
                  } else if (that.assistanceRewardType == 2) {
                    wx.request({
                      url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandByOther",
                      method: "POST",
                      data: {sessionID: sessionID, actId: actId},
                      header: {'content-type': 'application/x-www-form-urlencoded'},
                      success: function (res) {
                        if (res.data.success) {
                          // contentTitle:'', //领取奖励标题
                          //   contentHead:'', //领取奖励头部
                          //   contentMid:'', //领取奖励中部
                          //   contentFoot:'', //领取奖励脚部
                          //   contentBtn:'', //领取奖励按钮
                          that.assistanceModel(res.data);
                        } else {
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                          })
                        }
                        that.$store.state.board.existDoHelp = false;
                        that.$store.state.board.myExistDoHelp = true;
                        //助力 埋点
                        that.getRewardActCommandOpenWindowByOther();
                      }
                    })
                  } else if (that.assistanceRewardType == 3) {
                    wx.request({
                      url: that.$store.state.board.urlHttp + "/wechatapi/help/existDoHelpByActId",
                      method: "POST",
                      data: {actId: actId, sessionID: sessionID, helpId: otherHelpId, type: 1},
                      header: {'content-type': 'application/x-www-form-urlencoded'},
                      success: function (res) {
                        that.$store.state.board.checked = false;
                        if (res.data.success) {
                          that.assistanceModel(res.data);
                          that.$store.state.board.existDoHelp = false;
                          that.$store.state.board.myExistDoHelp = true;
                          that.exithelpId = true;
                          that.rulesOfActivity = true;
                        }else {
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                          })
                        }
                      }
                    })
                  }

                }
              }else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          that.$store.state.board.existDoHelp = true;
          that.$store.state.board.myExistDoHelp = true;
        }
        that.exithelpId = true;
        that.rulesOfActivity = true;
      },
      receiveAreward() {
        var that = this;
        var myHelpId = that.$store.state.board.myHelpId;
        var sessionID = that.$store.state.board.sessionID;
        if (that.invitationRewardType == 1) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandQrcode",
            method: "POST",
            data: {sessionID: sessionID, helpId: myHelpId},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                if (res.data.rewardActContent) {
                  that.contentTitle = res.data.rewardActContent.contentTitle;
                  that.contentHead = res.data.rewardActContent.contentHead;
                  that.contentMid = res.data.rewardActContent.contentMid;
                  that.contentFoot = res.data.rewardActContent.contentFoot;
                  that.contentBtn = res.data.rewardActContent.contentBtn;
                  that.$store.state.board.checkedRule = true
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
        } else if (that.invitationRewardType == 2) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommand",
            method: "POST",
            data: {sessionID: sessionID, helpId: myHelpId},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                if (res.data.rewardActContent) {
                  that.contentTitle = res.data.rewardActContent.contentTitle;
                  that.contentHead = res.data.rewardActContent.contentHead;
                  that.contentMid = res.data.rewardActContent.contentMid;
                  that.contentFoot = res.data.rewardActContent.contentFoot;
                  that.contentBtn = res.data.rewardActContent.contentBtn;
                  that.$store.state.board.checkedRule = true
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
      assistanceModel(data) {
        var that = this;
        // console.log(that.assistanceRewardType);
        if (that.assistanceRewardType != 0) {
          if (data.rewardActContent) {
            // contentTitle:'', //领取奖励标题
            //   contentHead:'', //领取奖励头部
            //   contentMid:'', //领取奖励中部
            //   contentFoot:'', //领取奖励脚部
            //   contentBtn:'', //领取奖励按钮
            that.contentTitle = data.rewardActContent.contentTitle;
            that.contentHead = data.rewardActContent.contentHead;
            that.contentMid = data.rewardActContent.contentMid;
            that.contentFoot = data.rewardActContent.contentFoot;
            that.contentBtn = data.rewardActContent.contentBtn;
            that.$store.state.board.checked = true
          }
          if (data.filePath) {
            that.rewardImg = that.$store.state.board.urlHttp + data.filePath;
          } else {
            that.rewardImg = "";
          }
        }
      },
      closeMash() {
        this.$store.state.board.checkedRule = false;
        this.$store.state.board.checked = false;
        this.$store.state.board.checkedRules = false;
      },
      existDoHelps() {   //我也要领奖励
        var that = this;
        that.$store.state.board.existDoHelp = '';
        that.$store.state.board.myExistDoHelp = '';
        this.$store.state.board.otherHelpId = '';
        var actId = that.$store.state.board.actId;
        var sessionID = that.$store.state.board.sessionID;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/findHelpDetailUserList",
          method: "POST",
          data: {actId: actId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            // console.log(new Date().getTime());
            that.$store.state.board.headPic = [];
            if (res.data.success) {
              that.$store.state.board.myHelpId = res.data.helpId;
              that.headPicArr(that, res.data.data);
              that.$store.state.board.myExistDoHelp = false;
              that.$store.state.board.existDoHelp = true;
              that.exithelpId = true;
              that.rulesOfActivity = true;
              that.$store.state.board.checked = false;
            }
            else {
              that.exithelpId = false;
              that.$store.state.board.existDoHelp = true;
              that.$store.state.board.myExistDoHelp = false;
              that.$store.state.board.checked = false;
              that.rulesOfModel = true;
              that.modelSetP = true;
              that.rulesOfActivity = '';
            }
          }
        })
      },
      activeRules() {
        var that = this;
        that.$store.state.board.checkedRules = true
      },
      headPicArr(that, headPic) {
        for (var i = 0; i < headPic.length; i++) {
          that.$store.state.board.headPic.push({
            img: headPic[i].avatarUrl,
            name: headPic[i].nickName.length > 10 ? headPic[i].nickName.slice(0, 9) + '...' : headPic[i].nickName
          })
        }
        // console.log(that.$store.state.board.headPic)
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

      },
      getRewardAct() {
        var that = this;
        //邀请 埋点
        that.getRewardActCommandOpenWindow();
      },
      assistanceRewardAct() {
        var that = this;
        //助力 埋点
        that.getRewardActCommandOpenWindowByOther();
      },
      modelSetClose1() {
        this.rulesOfActivity = false;
        this.rulesOfModel = false;
      },
      modelSetExpand1() {
        this.rulesOfActivity = true;
        this.rulesOfModel = true;
      },
      modelSetClose() {
        this.modelSetP = false;
        this.$store.state.board.checked = false;
        this.rulesOfActivity = false;
      },
      modelSetExpand() {
        this.modelSetP = true;
        this.$store.state.board.checked = true;
        this.rulesOfActivity = true;
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
      }

    },
    created() {
    },
    computed: {
      invitationRewardType() { //邀请奖励类型
        return this.$store.state.board.invitationRewardType;
      },
      assistanceRewardType() {  //助力奖励类型
        return this.$store.state.board.assistanceRewardType;
        // return 3;
      },
      invitationSessionFrom() {  //邀请 客服消息传递参数
        return '{"actId":"' + this.$store.state.board.actId + '","type":1}';
      },
      assistanceSessionFrom() {  //助力 客服消息传递参数
        return '{"actId":"' + this.$store.state.board.actId + '","type":2}';
      },
      headPic() {  //助力人头像
        return this.$store.state.board.headPic
      },
      goLink() {
        return this.$store.state.board.goLink
      }
      ,
      checked() {
        return this.$store.state.board.checked
      },
      checkedRule() {
        return this.$store.state.board.checkedRule
      },
      checkedRules() {
        return this.$store.state.board.checkedRules
      },
      myExistDoHelp() {
        return this.$store.state.board.myExistDoHelp
      }
      ,
      existDoHelp() {
        return this.$store.state.board.existDoHelp
      },
      partakeNum() {
        return this.$store.state.board.partakeNums
      }
      ,
      btnText() {
        return this.$store.state.board.btnText
      }
      ,
      getInfoInvite() {
        if (this.exithelpId === false) {
          return 'getInfoInvite';
        } else {
          return ""
        }
      }
      ,
      manIsFull() {
        if (this.headPic.length >= this.partakeNum && this.myExistDoHelp === true && this.existDoHelp === true && this.exithelpId) {
          return 'manIsFull';
        } else {
          return ""
        }
      },
      giveHelp() {
        if (this.headPic.length < this.partakeNum && this.myExistDoHelp === true && this.existDoHelp === true && this.exithelpId) {
          return 'giveHelp';
        } else {
          return ""
        }
      },
      alreadyHelp() {
        if (this.myExistDoHelp === true && this.existDoHelp === false && this.exithelpId) {
          return 'alreadyHelp';
        } else {
          return ""
        }
      },
      continueToInvite() {
        if (this.headPic.length < this.partakeNum && this.myExistDoHelp === false && this.exithelpId) {
          return 'continueToInvite';
        } else {
          return ""
        }
      },
      receiveReward() {
        if (this.headPic.length >= this.partakeNum && this.myExistDoHelp === false && this.exithelpId) {
          return 'receiveReward';
        } else {
          return ""
        }
      },
      posterH() {
        var posterW = this.$store.state.board.posterW
        var posterH = this.$store.state.board.posterH
        var winW = this.$store.state.board.windowWidth
        var winH = this.$store.state.board.windowHeight
        var temp = posterH / (posterW / (winW - 24));
        if ((winH - 70) < temp) {
          return (winH - 70);
        } else {
          return temp
        }
      }
    },
    mounted() {
      var that = this;
      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth;
          this.$store.state.board.windowHeight = res.windowHeight
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    font-size: 22px;
    width: 100%;
    height: 100%;
    position: relative;
    .haode {
      color: red;
      font-size: 30px;
    }
    .containes {
      width: calc(100% - 24px);
      height: calc(100% - 80px);
      padding: 12px;
      text-align: center;
      .contacts {
        position: fixed;
        top: 10px;
        right: 10px;
        display: none;
        width: 65px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        background-color: rgba(16, 16, 16, 0.5);
        color: #fff;
        border-radius: 15px;
      }
      button.contactsCondition {
        display: block;
      }
      movable-area {
        width: calc(100% - 25px);
        height: 260px;
        position: fixed;
        .activeRule {
          position: absolute;
          top: 44px;
          right: 0px;
          left: auto;
          display: none;
          width: 75px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          font-size: 13px;
          background-color: rgba(0, 0, 0, 0.44);
          color: #fff;
          border-radius: 13px;
        }
        .activeRule.rulesCondition {
          display: block;
        }
      }

      img {
        width: 100%;
        height: 100% !important;
        border-radius: 8px;
      }
    }
    .record {
      position: fixed;
      bottom: 0px;
      left: 12px;
      width: calc(100% - 24px);
      height: 310px;
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
      display: none;
      .recordTitle {
        color: #9397A4;
        font-size: 14px;
        text-align: center;
        margin-bottom: 15px;
        margin-top: 10px;
        padding: 0 10px;
        .verLine {
          display: inline-block;
          position: relative;
          top: 5px;
          width: 1px;
          height: 19px;
          margin: 0 20px;
          border-left: 1px solid #CED0D5;
        }
      }
      .modelTitle {
        text-align: center;
        font-size: 18px;
        color: #F05522;
        margin-top: 20px;
      }
      .invitation {
        text-align: center;
        padding: 0 10px;
        margin-top: 30px;
        .helpZero {
          margin-top: 45px;
          img {
            display: block;
            margin: 0 auto;
          }
          .noneImg {
            width: 182px;
            height: 121px;
          }
          .noneTextImg {
            margin-top: 8px;
            width: 134px;
            height: 12px;
          }
          p {
            margin-top: 5px;
            font-size: 14px;
            color: #A5A5A5;
          }
        }
        .helpPeo {
          text-align: center;
          color: #F05522;
          font-size: 14px;
          .helpNum {
            font-size: 28px;
          }
          scroll-view {
            height: 80px;
            .helpUserImg {
              margin-top: 15px;
              img {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                display: inline-block;
                margin: 0 4px;
                border: 1px solid #F05522;
              }
            }
          }
          .helpLackNum {
            font-size: 12px;
            font-weight: lighter;
            color: #4A4A4A;
            margin-top: 15px;
          }
        }
        .menu {
          width: calc(100% - 40px);
          position: fixed;
          bottom: 0px;
          text-align: center;
          z-index: 1000;
          padding-bottom: 14px;
          .menus {
            margin: 0 auto;
            width: 195px;
            height: 40px;
            display: none;
            background: #fff;
            border: 1px solid #F05522;
            font-size: 14px;
            color: #F05522;
            text-align: center;
            line-height: 40px;
            border-radius: 20px;
          }
          .menuss {
            margin: 0 auto;
            width: 270px;
            height: 40px;
            display: none;
            background: #EF6D00;
            font-size: 13px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 40px;
            border-radius: 24px;
            border: none;
          }
          div.menus.rewardCondition, button.menus.rewardCondition {
            display: block;
          }
          button.menuss.rewardCondition {
            display: block;
          }
          .hoverNone {
            pointer-events: none;
          }
        }
      }
      .noHelp {
        text-align: center;
        color: #575757;
        font-size: 14px;
      }
    }
    div.record.rewardCondition {
      display: block;
    }
    .modelSetP {
      position: fixed;
      z-index: 1000;
      bottom: 0px;
      width: calc(100% - 10px);
      text-align: center;
      display: none;
    }
    .helpInfos {
      position: fixed;
      z-index: 1100;
      height: 100%;
      width: 100%;
      background-color: rgba(144, 144, 144, 0.6);
      display: none;
      div {
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 140px;
        width: 240px;
        margin: auto;
        text-align: center;
        .tit {
          font-size: 18px;
          margin-top: 10px;
        }
        .con {
          font-size: 12px;
          color: #aaa;
          margin-top: 15px;
        }
        button {
          margin: 0 auto;
          margin-top: 20px;
          width: 120px;
          height: 40px;
          background: #F05522;
          border: none;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          border-radius: 20px;
        }
      }
    }
    p.rewardCondition {
      display: block;
    }
    div.rewardCondition {
      display: block;
    }
    .menu {
      width: 100%;
      position: fixed;
      text-align: center;
      z-index: 1000;
      padding-bottom: 14px;
      .menus {
        margin: 0 auto;
        width: 195px;
        height: 40px;
        display: none;
        background: #fff;
        border: 1px solid #F05522;
        font-size: 14px;
        color: #F05522;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
      }
      .menuss {
        margin: 0 auto;
        width: 270px;
        height: 40px;
        display: none;
        background: #EF6D00;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 40px;
        border-radius: 24px;
        border: none;
      }
      div.menus.rewardCondition, button.menus.rewardCondition {
        display: block;
      }
      button.menuss.rewardCondition {
        display: block;
      }
      .hoverNone {
        pointer-events: none;
      }
    }
    .mask {
      display: none;
      width: calc(100% - 24px);
      height: 320px;
      position: fixed;
      bottom: -10px;
      left: 12.5px;
      z-index: 1000;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
      .modelTask {
        margin: 0 auto;
        width: calc(100% - 50px);
        height: 100%;
        background: #fff;
        div {
          padding: 0 10px;
          padding-top: 20px;
          position: relative;
          color: #4A4A4A;
          font-size: 12px;
          .modelTitle {
            text-align: center;
            font-size: 18px;
            color: #F05522;
            margin-bottom: 10px;
            margin-top: 10px;
          }
          .modelContent {
            line-height: 24px;
            margin-top: 20px;
            font-weight: lighter;
            text-align: center;
            line-height: 17px;

          }
          .closeMask {
            position: absolute;
            top: 15px;
            right: 0px;
            width: 14px;
            height: 14px;
          }
          .codes {
            font-size: 15px;
            display: block;
            text-align: center;
            line-height: 20px;
            font-weight: normal;
            img {
              width: 120px;
              height: 120px;
            }
          }
          .codess {
            font-size: 15px;
            display: block;
            text-align: center;
            margin-top: 25px;
            line-height: 20px;
            font-weight: normal;
            border: 1px solid #ccc;
            padding: 8px 0px;
          }
          .copy {
            text-align: center;
            font-weight: lighter;
            line-height: 17px;
            margin-top: 10px;
          }
          .btn {
            padding: 0px;
            width: 150px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            text-align: center;
            color: #F05522;
            background: #FFF;
            border: 1px solid #F05522;
            border-radius: 20px;
            margin: 0 auto;
            margin-top: 15px;
          }
          .modelMyHelp {
            color: #EF6D00;
            background: #fff;
            border: 1px solid #EF6D00;
          }
        }
      }
    }
    .maskRule {
      display: none;
      width: calc(100% - 24px);
      height: 320px;
      position: fixed;
      bottom: -10px;
      left: 12.5px;
      z-index: 1000;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
      .modelTask {
        margin: 0 auto;
        width: calc(100% - 50px);
        height: 100%;
        background: #fff;
        div {
          padding: 0 10px;
          padding-top: 25px;
          position: relative;
          line-height: 17px;
          color: #4A4A4A;
          font-size: 12px;
          text-align: center;
          .modelTitle {

            font-size: 18px;
            color: #F05522;
            margin-bottom: 15px;
          }
          .modelContent {
            margin-top: 25px;
          }
          .maskClose {
            position: absolute;
            top: 12px;
            right: -9px;
            width: 30px;
            height: 30px;
            .closeMask {
              display: block;
              width: 14px;
              height: 14px;
              margin: 0 auto;
              margin-top: 8px;
            }
          }
          .codes {
            font-size: 15px;
            display: block;
            text-align: center;
            line-height: 20px;
            font-weight: normal;
            img {
              width: 140px;
              height: 140px;
            }
          }
          .codess {
            font-size: 15px;
            display: block;
            text-align: center;
            margin-top: 25px;
            line-height: 20px;
            font-weight: normal;
            border: 1px solid #ccc;
            padding: 8px 0px;
          }
          .copy {
            margin-top: 15px;
          }
        }
      }
    }
    .maskRules {
      display: none;
      width: 100%;
      height: 343px;
      position: fixed;
      bottom: -20px;
      left: 0px;
      z-index: 2000;
      background: url("../../../static/img/ruler.png");
      background-size: 100% 100%;
      .modelTask {
        width: calc(100% - 30px);
        height: calc(100% - 15px);
        margin: 0 auto;
        div {
          padding: 30px;
          position: relative;
          .modelTitle {
            text-align: center;
            font-size: 17px;
            color: #F05522;
            margin-top: 0px;
          }
          .lines {
            width: 100%;
            height: 1px;
            display: block;
            margin: 10px 0px;
          }
          scroll-view {
            height: 232px;
          }
          .modelContent {
            font-size: 14px;
            line-height: 18px;
            color: #4A4A4A;
            margin-top: 5px;
            font-weight: lighter;
            span {
              display: inline-block;
            }
            .modelNum {
              width: 7%;
              float: left
            }
            .modelTe {
              width: 92%;
            }
          }
          .maskClose {
            position: absolute;
            top: 18px;
            right: 5px;
            width: 30px;
            height: 30px;
            .closeMask {
              display: block;
              width: 14px;
              height: 14px;
              margin: 0 auto;
              margin-top: 8px;
            }
          }
        }
      }
    }
    div.mask.menuStyle {
      display: block;
    }
    div.maskRule.menuStyle {
      display: block;
    }
    div.maskRules.menuStyle {
      display: block;
    }

  }
</style>
