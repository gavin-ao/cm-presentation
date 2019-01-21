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
    <!--<div class="containes" :style="{height:posterH+'px'}">-->
    <div class="containes">
      <movable-area>
        <!--<movable-view direction="vertical" class="activeRule" :class="{rulesCondition:rulesInfos===true}"-->
        <!--@click="activeRules" v-if="activityTypes===0">活动规则-->
        <!--</movable-view>-->
        <movable-view direction="vertical" class="activeRule" :class="{rulesCondition:rulesInfos===true}"
                      @click="activeRules">活动规则
        </movable-view>
      </movable-area>
      <img :src="goLink" alt="" mode="widthFix">
      <!--<div class="recordLadder" :class="{rewardCondition:rulesOfActivity===true}" v-if="activityTypes===1&&checked!=true&&myHelpId!=''" :style="{top:topsLoc+'px'}">-->
      <div class="recordLadder" :class="{rewardCondition:rulesOfActivity===true}"
           v-if="activityTypes===1&&checked!=true&&myHelpId!=''">
        <!--<p style="position: fixed;z-index: 1000;width:calc(100% - 40rpx);text-align: center;" @click="modelSetClose1">-->
        <!--<img src="/static/img/modelArrow.png" alt="" style="width: 40rpx;height: 32rpx;">-->
        <!--</p>-->
        <div class="invitation">
          <!--<div class="helpZero" v-if="headPic.length==0">-->
          <!--<img class="noneImg" src="/static/img/none.png" alt="">-->
          <!--<p>还没有人助力</p>-->

          <!--</div>-->
          <!--阶梯助力-->
          <!--<div class="ladderHelpPeo" v-else>-->
          <div class="ladderHelpPeo">
            <div class="title">
              好友助力进度
            </div>
            <div class="titleAssNum" v-if="ifAssistanceLimit == 1">
              已获得<span style="color: #F05522;">{{currentPeopleRanking.helpNum}}</span> 位好友助力
            </div>
            <div class="hongbaoImg">
              <block v-if="infos.initiatorReward[0].rewardType==5">
                <!--<block  v-for="(item,index) in infos.initiatorReward" :key="index">-->
                <!--<div :style="{left:(((item.partakeNum- infos.initiatorReward[0].partakeNum+infos.initiatorReward[0].partakeNum/2)/maxPartNum)*tempWidth-17.5/ratios)+'px',top:'-4px'}">-->
                <!--&lt;!&ndash;<img src="/static/reward/10.png" alt="" v-if="index == 0">&ndash;&gt;-->
                <!--<img src="/static/reward/10.png" alt="" v-if="index == 0" mode="widthFix">-->
                <!--<img src="/static/reward/20.png" alt=""  v-if="index == 1" mode="widthFix">-->
                <!--&lt;!&ndash;<img src="/static/reward/20_1.png" alt=""  v-if="index == 1" mode="widthFix">&ndash;&gt;-->
                <!--<img src="/static/reward/50.png" alt="" v-if="index == 2" mode="widthFix">-->
                <!--</div>-->
                <!--</block>-->
                <block v-for="(item,index) in infos.initiatorReward" :key="index">
                  <div v-if="index==0" :style="{left:'10%', marginLeft: '-60rpx'}">
                    <img src="/static/reward/10.png" alt="" mode="widthFix">
                  </div>
                  <div v-else-if="index < (infos.initiatorReward.length-1)"
                       :style="{left:(index*(80/(index +1)) +10)+'%', marginLeft: '-60rpx'}">
                    <img src="/static/reward/20.png" alt="" mode="widthFix">
                  </div>
                  <div v-else-if="index == (infos.initiatorReward.length-1)" :style="{left:'90%',marginLeft: '-60rpx'}">
                    <img src="/static/reward/50.png" alt="" mode="widthFix">
                  </div>
                </block>
              </block>
              <block v-else>
                <block v-for="(item,index) in infos.initiatorReward" :key="index">
                  <!--<div-->
                  <!--:style="{left:(((item.partakeNum- infos.initiatorReward[0].partakeNum+infos.initiatorReward[0].partakeNum/2)/maxPartNum)*tempWidth-17.5/ratios)+'px'}">-->
                  <!--<img src="/static/images/hongbao.png" alt=""  mode="widthFix">-->
                  <!--<p>-->
                  <!--<span>{{item.rewardContent}}</span>-->
                  <!--</p>-->
                  <!--</div>-->
                  <div v-if="index==0" :style="{left:'10%', marginLeft: '-60rpx'}">
                    <img src="/static/images/hongbao.png" alt="" mode="widthFix">
                    <p>
                      <span>{{item.rewardContent}}</span>
                    </p>
                  </div>
                  <div v-else-if="index < (infos.initiatorReward.length-1)"
                       :style="{left:(index*(80/(infos.initiatorReward.length-1)) +10)+'%', marginLeft: '-60rpx'}">
                    <img src="/static/images/hongbao.png" alt="" mode="widthFix">
                    <p>
                      <span>{{item.rewardContent}}</span>
                    </p>
                  </div>
                  <div v-else-if="index == (infos.initiatorReward.length-1)" :style="{left:'90%',marginLeft: '-60rpx'}">
                    <img src="/static/images/hongbao.png" alt="" mode="widthFix">
                    <p>
                      <span>{{item.rewardContent}}</span>
                    </p>
                  </div>
                </block>
              </block>

            </div>
            <div class="progressBar">
              <div class="proList" style="">
                <progress activeColor="#DE3120" border-radius="5" backgroundColor="#E6E6E6"
                          :percent="percents" stroke-width="10"></progress>
              </div>

              <block v-for="(item,index) in infos.initiatorReward" :key="index">
                <div v-if="index==0" :style="{left:'10%', marginLeft: '-18rpx'}">
                  <p class="quan"></p>
                  <p class="wen">
                    <span style="">{{item.partakeNum}}</span>位助力
                  </p>
                </div>
                <div v-else-if="index < (infos.initiatorReward.length-1)"
                     :style="{left:(index*(80/(index +1)) +10)+'%', marginLeft: '-18rpx'}">
                  <p class="quan"></p>
                  <p class="wen">
                    <span style="">{{item.partakeNum}}</span>位助力
                  </p>
                </div>
                <div v-else-if="index == (infos.initiatorReward.length-1)" :style="{left:'90%',marginLeft: '-18rpx'}">
                  <p class="quan"></p>
                  <p class="wen">
                    <span style="">{{item.partakeNum}}</span>位助力
                  </p>
                </div>
                <!--<div v-if="index==0" :style="{left:((item.partakeNum/2/maxPartNum)*tempWidth-8/ratios)+'px',top:'0px'}">-->
                <!--<p class="quan"></p>-->
                <!--<p class="wen">-->
                <!--<span style="">{{item.partakeNum}}</span>位助力-->
                <!--</p>-->
                <!--</div>-->
                <!--<div v-else-->
                <!--:style="{left:(((item.partakeNum- infos.initiatorReward[0].partakeNum+infos.initiatorReward[0].partakeNum/2)/maxPartNum)*tempWidth-8/ratios)+'px',top:'0px'}">-->
                <!--<p class="quan"></p>-->
                <!--<p class="wen">-->
                <!--<span style="">{{item.partakeNum}}</span>位助力-->
                <!--</p>-->
                <!--</div>-->
              </block>
            </div>
          </div>

          <div class="menues">
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
            <!--阶梯助力-->
            <div class="listHelp">
              <block v-if="ifRewardUnique == 0">
                <div class="receive" @click="confirmReward" :class="{rewardCondition:receiveReward=='receiveReward'}"
                     hover-class="hoverNone" hover-stay-time="800" v-if="headPic.length>=partakeNum&&userExitEnd!=1"
                     :style="{marginRight:'20px'}">
                  <span>结束，我要领奖</span>
                </div>
                <div class="receive" @click="confirmRewards" :class="{rewardCondition:receiveReward=='receiveReward'}"
                     hover-class="hoverNone" hover-stay-time="800" v-if="userExitEnd==1" :style="{marginRight:'0px'}">
                  <span>我要领奖</span>
                </div>
                <div class="menusH" v-if="headPic.length<maxPartNum&&userExitEnd!=1" @click="continueHelp"
                     :class="{rewardCondition:continueToInvite=='continueToInvite'}"
                     hover-class="hoverNone" hover-stay-time="800">
                  <span v-if="headPic.length==0">{{btnText.bxt_continue}}</span>
                  <span v-else>继续邀请好友助力</span>
                </div>
              </block>
              <block v-if="ifRewardUnique == 1">
                <div class="receive" @click="receiveAllReward" :class="{rewardCondition:receiveReward=='receiveReward'}"
                     hover-class="hoverNone" hover-stay-time="800" :style="{marginRight:'20px'}">
                  <span>查看我的奖品</span>
                </div>
                <div class="menusH" @click="continueHelp"
                     :class="{rewardCondition:continueToInvite=='continueToInvite'}"
                     hover-class="hoverNone" hover-stay-time="800">
                  <!--<span v-if="headPic.length==0">{{btnText.bxt_continue}}</span>-->
                  <span>继续邀请好友助力</span>
                </div>
              </block>
            </div>

          </div>
        </div>
      </div>
      <!--//阶梯助力   助力列表-->
      <div v-if="(activityTypes===1)&&(assistangShows==true)" style="position: relative;z-index: 1000;">
        <!--<div class="ruText">-->
        <!--<div class="ruTitle">活动说明</div>-->
        <!--<block v-for="(item,index) in ruleArr" :key="index">-->
        <!--<p>-->
        <!--<span class="first" style="">{{(index+1)}}、</span>-->
        <!--<span class="two" style="">{{item}}</span>-->
        <!--</p>-->
        <!--</block>-->
        <!--</div>-->
        <div class="luckDraw" v-if="lotteryDraw == 1">
          <div class="luckDrawText">
            锦鲤奖加载进度
          </div>
          <div class="luckDrawPro">
            <div class="progressTotal">
              <div class="progressLine">
                <div class="showProL"></div>
                <div class="showProSe" :style="{height:lotteryProgress/100*70*2+'rpx'}">

                </div>
                <div class="showProText" :style="{bottom:(lotteryProgress/100*70*2+18)+'rpx'}">
                  {{lotteryProgress}}%
                </div>
              </div>
              <!--<div class='progress_box'>-->
              <!--<canvas class="progress_bg"   canvas-id="canvasProgressbg">  </canvas>-->
              <!--<canvas class="progress_canvas"   canvas-id="canvasProgress">  </canvas>-->
              <!--<div class="progress_text">-->
              <!--&lt;!&ndash; <view class="progress_dot"></view>  &ndash;&gt;-->
              <!--<text class='progress_info'> {{lotteryProgress}}%</text>-->
              <!--</div>-->
              <!--</div>-->
            </div>
            <img src="/static/reward/S60.png" alt="" mode="widthFix">

            <!--<progress activeColor="#F15522" border-radius="5" backgroundColor="#E6E6E6"-->
            <!--:percent="lotteryProgress" stroke-width="10"></progress>-->
            <!--<span style="color: red;display: inline-block;margin-top: 5px;">{{lotteryProgress}}%</span>-->
          </div>
          <div class="luckDrawDes">
            参与人数达到{{lotteryDrawTarget}}人即可解锁抽奖
          </div>
        </div>
        <!--<div v-if="headPic.length" class="ladderHelp">-->
        <div class="ladderHelp">
          <div class="assistantLimit" v-if="ifAssistanceLimit == 0">
            <div class="titles">好友助力榜</div>
            <block v-if="headPic.length==0">
              <div class="helpZero">
                <img class="noneImg" src="/static/img/none.png" alt="">
                <p>还没有人助力</p>
              </div>
            </block>
            <block v-else>
              <div v-for="(item,index) in headPic" :key="index" class="ladderList">
                <span class="serialNum">{{index+1}}</span>
                <img :src="item.img" alt="">
                <span class="listName">{{item.name}}</span>
                <span class="listTime">{{item.time}}</span>
              </div>
            </block>
          </div>
          <div class="assistantNoLimit" v-if="ifAssistanceLimit == 1">
            <div class="rankTopNav">
              <span class="rankNavsel" data-listindex="1" @click="rankingList" :class="{selNav:rankingListNum== 1}">邀请排行榜</span>
              <span class="rankNavsel" data-listindex="2" @click="rankingList"
                    :class="{selNav:rankingListNum==2}">好友助力榜</span>
            </div>
            <div class="rankHelpList">
              <div v-if="rankingListNum == 1" class="rankListShow">
                <div class="rankNumber">您当前位于排行榜第<span style="color:#F15522;">{{currentPeopleRanking.rankNum}}</span> 名
                </div>
                <div class="rankIdentification">
                  <span>排名</span>
                  <span>昵称</span>
                  <span>助力人数</span>
                </div>
                <div v-for="(item,index) in rankingListArr" :key="index" class="ladderList">
                  <span class="serialNum">{{item.rankNum}}</span>
                  <img :src="item.avatarUrl" alt="">
                  <span class="listName">{{item.nickName}}</span>
                  <span class="listTime" style="text-align:center;">{{item.helpNum}}</span>
                </div>
                <div class="rankBottomIn">排行榜数据每小时更新一次</div>
              </div>
              <div v-if="rankingListNum == 2">
                <block v-if="headPic.length==0">
                  <div class="helpZero">
                    <img class="noneImg" src="/static/img/none.png" alt="">
                    <p>还没有人助力</p>
                  </div>
                </block>
                <block v-else>
                  <div v-for="(item,index) in headPic" :key="index" class="ladderList">
                    <span class="serialNum">{{index+1}}</span>
                    <img :src="item.img" alt="">
                    <span class="listName">{{item.name}}</span>
                    <span class="listTime">{{item.time}}</span>
                  </div>
                </block>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="record" :class="{rewardCondition:rulesOfActivity===true}" v-if="activityTypes===0">
      <p style="position: fixed;z-index: 1000;width:calc(100% - 40rpx);text-align: center;" @click="modelSetClose1">
        <img src="/static/img/modelArrow.png" alt="" style="width: 40rpx;height: 32rpx;">
      </p>
      <p class="modelTitle" v-if="headPic.length==partakeNum">助力完成</p>
      <div class="invitation">
        <div class="helpZero" v-if="headPic.length==0">
          <img class="noneImg" src="/static/img/none.png" alt="">
          <p>还没有人助力</p>

        </div>
        <!--助力-->
        <div class="helpPeo" v-else>
          <p><span class="helpNum">{{headPic.length}}</span><br/>邀请记录</p>
          <scroll-view scroll-y>
            <p class="helpUserImg">
              <img :src="item.img" v-for="(item,index) in headPic" :key="index" alt="">
            </p>
          </scroll-view>
          <p class="helpLackNum" v-if="headPic.length<partakeNum">还差（{{partakeNum - headPic.length}}）位</p>
          <p v-else-if="invitationRewardType == 3&&exitNoMyself==true">
            <!--<span style="display: inline-block;font-size: 18px;font-weight: lighter;color: red;margin-top: 10px;">在会话中回复“{{infos.actReply}}”即可领取</span>-->
            <span style="display: inline-block;font-size: 32rpx;font-weight: lighter;color: red;margin-top: 10rpx;">在会话中回复“领奖”即可领取</span>
          </p>
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
               hover-class="hoverNone" hover-stay-time="800"
               v-if="invitationRewardType==1 || invitationRewardType==2">
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
                <!--<span style="display: inline-block;width: 7%; float: left">{{(index+1)}}、</span>-->
                <span style="display: inline-block;width: 100%;">{{item}}</span>
              </p>
            </block>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="mask" :class="{menuStyle:checked == true}">
      <!--<div class="mask menuStyle">-->
      <p style="position: fixed;z-index: 1000;width:calc(100% - 40rpx);text-align: center;" @click="modelSetClose">
        <img src="/static/img/modelArrow.png" alt="" style="width: 40rpx;height: 32rpx;">
      </p>
      <div class="modelTask">
        <div style="">
          <p class="modelTitle">为好友助力成功</p>
          <block v-if="assistanceRewardType==1">
            <p class="modelContent">
              {{contentHead}}
              <block v-if="infos.assistanceReward">
                {{infos.assistanceReward[0].remark}}
              </block>
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
            <p style="text-align:center;">
              <span style="display: inline-block;font-size: 18px;font-weight: lighter;color: red;margin-top: 10px;">在会话中回复“领奖”即可领取</span>
            </p>
            <button class="btn modelMyHelp" open-type="contact"
                    hover-class="hoverNone" hover-stay-time="800" @click="assistanceRewardAct" type="default"
                    :session-from=assistanceSessionFrom>{{btnText.bxt_reward}}
            </button>
          </block>
          <block v-else-if="assistanceRewardType==5">
            <p class="modelContent">
              {{contentHead}}
              <block v-if="infos.assistanceReward">
                {{infos.assistanceReward[0].rewardContent}}
              </block>
            </p>
            <div class="assisReward">
              <img src="/static/images/assist.png" alt="" mode="widthFix">
              <div class="assisCon">
                <p class="assisName" :class="{lhName:!infos.assistanceReward[0].remark}">
                  <!--<p class="assisName">-->
                  <block v-if="infos.assistanceReward">
                    {{infos.assistanceReward[0].rewardContent}}
                  </block>
                </p>
                <p class="assisDes" v-if="infos.assistanceReward[0].remark">
                  <!--<p class="assisDes">-->
                  {{infos.assistanceReward[0].remark}}
                </p>
              </div>
              <div class="assisBtn" @click="privateMall">
                领奖
              </div>
            </div>
            <p class="copy">
              {{contentFoot}}
            </p>
          </block>
          <div class="btn modelMyHelp" @click="existDoHelps">
            <block v-if="checkMyProgressShow==false">
              {{contentBtn}}
            </block>
            <block v-if="checkMyProgressShow==true">
              查看我的进度
            </block>
          </div>
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
    config: {
      "enablePullDownRefresh": true,
    },
    data() {
      return {
        exitNoMyself:false,
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
        rulesInfos: false,
        activityTypes: "",  //活动类型  0 助力   1 阶梯助力
        maxPartNum: 0,
        tempWidth: 0,
        userExitEnd: "",
        ratios: 0,
        rankingListNum: 1,  //排行榜选择
        lotteryDraw: 0, //设置抽奖
        lotteryDrawTarget: 0, //抽奖设置助力人数
        assisTotalNum: 0,    //总参与人数
        rankingListArr: [],  //排行榜数组
        currentPeopleRanking: 0,  //当前人排名
        assistangShows: false,
        checkMyProgressShow: false,
        percentes: 0
      }
    },
    onLoad(option) {
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
            that.$store.state.board.infos = res.data;
            that.$store.state.board.actId = res.data.actId;   //活动ID
            that.$store.state.board.goLink = that.$store.state.board.urlHttp + res.data.url;   //海报图片
            that.actRule = res.data.actRule;
            that.activityTypes = res.data.actRewardType;
            that.ruleArr = that.actRule.split('\n'); //活动规则
            that.exchangeRule = res.data.exchangeRule;   //兑换流程
            that.$store.state.board.actShareTitle = res.data.actShareTitle;  //分享标题
            that.$store.state.board.actTitle = res.data.actTitle;   //活动标题
            that.maxPartNum = res.data.initiatorReward[res.data.initiatorReward.length - 1].partakeNum;
            that.$store.state.board.partakeNums = res.data.initiatorReward[0].partakeNum;  //助力人数
            that.$store.state.board.btnText = res.data.btnText;   //按钮文案
            that.$store.state.board.actShareCopywriting = res.data.actShareCopywriting;  //玩法说明
            that.$store.state.board.ifRewardUnique = res.data.rewardUnique;  //只领取最高奖励   全部奖励
            that.$store.state.board.ifAssistanceLimit = res.data.assistanceLimit; //助力是否有上限
            that.lotteryDraw = res.data.lotteryDraw; //设置抽奖
            that.lotteryDrawTarget = res.data.lotteryDrawTarget; //设置抽奖上限人数
            if (res.data.actRewardType == 0) {
              that.$store.state.board.invitationRewardType = res.data.initiatorReward[0].rewardType; //邀请奖励类型
            }
            that.$store.state.board.assistanceRewardType = res.data.assistanceReward[0].rewardType; //助力奖励类型
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
            // that.percents();
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
                                that.assistangShows = false;
                                that.checkMyProgress();
                                wx.showToast({
                                  title: "助力失败,已经助力过了",
                                  icon: 'none',
                                  duration: 2000
                                })
                              } else {
                                if (res.data.code == '102') {
                                  that.$store.state.board.existDoHelp = true;
                                  that.$store.state.board.myExistDoHelp = false;
                                  that.exithelpId = true;
                                  that.rulesOfActivity = true;
                                  that.$store.state.board.myHelpId = otherHelpId;
                                  that.exitNoMyself = true;
                                  if (that.lotteryDraw == 1) {
                                    that.getTheRankings(sessionID, actId);
                                  }
                                  that.assistangShows = true;
                                } else {
                                  that.wantActivity(that, sessionID, otherHelpId, actId);
                                }
                              }
                              // if (that.lotteryDraw == 1) {
                              //   that.getTheRankings(sessionID, actId);
                              // }
                            }
                          })
                        })
                      }
                    })
                  }
                  else {
                    utils.login(that, function (sessionID, actId) {
                      that.exitEnd(sessionID, actId);
                      wx.request({
                        url: that.$store.state.board.urlHttp + "/wechatapi/help/findHelpDetailUserList",
                        method: "POST",
                        data: {actId: actId, sessionID: sessionID},
                        header: {'content-type': 'application/x-www-form-urlencoded'},
                        success: function (res) {
                          that.$store.state.board.headPic = [];
                          that.assistangShows = true;
                          that.exitNoMyself = true;
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
                          if (that.lotteryDraw == 1) {
                            that.getTheRankings(sessionID, actId);
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
                    that.assistangShows = false;
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
        fail: function (err) {
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
      });

      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth;
          this.$store.state.board.windowHeight = res.windowHeight;
          this.ratios = (320 / res.windowWidth);
          this.tempWidth = res.windowWidth - 53 / (320 / res.windowWidth);
        }
      })
    },
    onReady(option) {

    },
    methods: {
      rankingList(e) {
        this.rankingListNum = e.currentTarget.dataset.listindex;
      },
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
                    that.assistangShows = false;
                    // if (that.lotteryDraw == 1) {
                    //   that.getTheRankings(sessionID, actId);
                    // }
                    that.checkMyProgress();
                    wx.showToast({
                      title: "助力失败,已经助力过了",
                      icon: 'none',
                      duration: 2000
                    })
                  } else {
                    if (res.data.code == '102') {
                      that.$store.state.board.existDoHelp = true;
                      that.$store.state.board.myExistDoHelp = false;
                      that.exithelpId = true;
                      that.rulesOfActivity = true;
                      that.$store.state.board.myHelpId = otherHelpId;
                      that.assistangShows = true;
                      that.exitNoMyself = true;
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
        that.continueHelp();
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
      checkMyProgress() {
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
              that.checkMyProgressShow = true;
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
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
            if (that.lotteryDraw == 1) {
              that.getTheRankings(sessionID, actId);
            }
          }
        });
      },
      wantActivity(that, sessionID, otherHelpId, actId) {
        if (that.headPic.length < that.maxPartNum) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/help/clickHelpUrl",
            method: "POST",
            data: {helpId: otherHelpId, sessionID: sessionID},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              that.assistangShows = false;
              if (res.data.success) {
                wx.showToast({
                  title: "助力成功",
                  icon: 'none',
                  duration: 2000
                })
                that.checkMyProgress();
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
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  }
                })
                if (that.$store.state.board.assistanceRewardType == 0) {
                  that.$store.state.board.existDoHelp = false;
                  that.$store.state.board.myExistDoHelp = true;
                  if (that.activityTypes === 1) {
                    that.exithelpId = false;
                  }
                } else {
                  if (that.$store.state.board.assistanceRewardType == 1) {
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
                  } else if (that.$store.state.board.assistanceRewardType == 2) {
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
                          that.contentBtn = "我也要参加活动";
                          that.$store.state.board.checked = true;
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
                  } else if (that.$store.state.board.assistanceRewardType == 3) {
                    that.contentFoot = "数量有限，先到先得哦";
                    that.contentBtn = "我也要参加活动";
                    that.$store.state.board.checked = true;
                    that.$store.state.board.existDoHelp = false;
                    that.$store.state.board.myExistDoHelp = true;
                    that.exithelpId = true;
                    that.rulesOfActivity = true;
                  } else if (that.$store.state.board.assistanceRewardType == 5) {
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
                          that.contentBtn = "我也要参加活动";
                          that.$store.state.board.checked = true;
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
                  }

                }
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
                if (that.activityTypes === 1) {
                  that.exithelpId = false;
                }
              }
            }
          })
        } else {
          if (that.ifAssistanceLimit == 1) {
            wx.request({
              url: that.$store.state.board.urlHttp + "/wechatapi/help/clickHelpUrl",
              method: "POST",
              data: {helpId: otherHelpId, sessionID: sessionID},
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                that.assistangShows = false;
                if (res.data.success) {
                  if (that.activityTypes === 1) {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  that.checkMyProgress();
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
                      } else {
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  })
                  if (that.$store.state.board.assistanceRewardType == 0) {
                    that.$store.state.board.existDoHelp = false;
                    that.$store.state.board.myExistDoHelp = true;
                    if (that.activityTypes === 1) {
                      that.exithelpId = false;
                    }
                  } else {
                    if (that.$store.state.board.assistanceRewardType == 1) {
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
                            that.contentBtn = "我也要参加活动";
                            that.$store.state.board.checked = true;
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
                    } else if (that.$store.state.board.assistanceRewardType == 2) {
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
                            that.contentBtn = "我也要参加活动";
                            that.$store.state.board.checked = true;
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
                    } else if (that.$store.state.board.assistanceRewardType == 3) {
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
                            wx.showToast({
                              title: "助力点击失败,已经助力过了",
                              icon: 'none',
                              duration: 2000
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
                    } else if (that.$store.state.board.assistanceRewardType == 5) {
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
                            that.contentBtn = "我也要参加活动";
                            that.$store.state.board.checked = true;
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
                    }

                  }
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                  if (that.activityTypes === 1) {
                    that.exithelpId = false;
                  }
                }
              }
            })
          } else {
            that.$store.state.board.existDoHelp = true;
            that.$store.state.board.myExistDoHelp = true;
          }
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
        // this.$store.state.board.checked = false;
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
            that.$store.state.board.headPic = [];
            if (res.data.success) {
              that.assistangShows = true;
              that.$store.state.board.myHelpId = res.data.helpId;
              that.headPicArr(that, res.data.data);
              that.$store.state.board.myExistDoHelp = false;
              that.$store.state.board.existDoHelp = true;
              that.exithelpId = true;
              that.rulesOfActivity = true;
              that.$store.state.board.checked = false;
              if (that.lotteryDraw == 1) {
                that.getTheRankings(sessionID, actId);
              }
            }
            else {
              that.exithelpId = false;
              that.$store.state.board.existDoHelp = true;
              that.$store.state.board.myExistDoHelp = false;
              that.$store.state.board.checked = false;
              that.rulesOfModel = true;
              that.modelSetP = true;
              that.rulesOfActivity = '';
              that.assistangShows = false;
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
          var nickName = that.cutOutSubString(headPic[i].nickName, 16, true);
          that.$store.state.board.headPic.push({
            img: headPic[i].avatarUrl,
            name: nickName,
            time: utils.formatTime(headPic[i].helpAt)
          })
        }
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
      },
      confirmReward() {  //阶梯助力  奖励确认  领取最高奖励
        wx.navigateTo({
          url: "/pages/confirmPage/main"
        })
      },
      confirmRewards() {  //阶梯助力  奖励确认  领取最高奖励
        wx.navigateTo({
          url: "/pages/rewardPage/main"
        })
      },
      receiveAllReward() {    //阶梯助力 领取所有奖励
        wx.navigateTo({
          url: "/pages/multilevelReward/main"
        })
      },
      exitEnd(sessionID, actId) {
        var that = this;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getHelpId",
          method: "POST",
          data: {sessionID: sessionID, actId: actId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              that.userExitEnd = res.data.stats;
            }
          }
        })
      },
      getTheRankings(sessionID, actId) {
        var that = this;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/totalRankAndCount",
          method: "POST",
          data: {actId: actId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            // assisTotalNum:0,    //总参与人数
            //   rankingListArr:[]  //排行榜数组
            if (res.data.success) {
              if (res.data.wechatActRankVOList) {
                that.rankingListArr = res.data.wechatActRankVOList;
                for (var i = 0; i < that.rankingListArr.length; i++) {
                  that.rankingListArr[i].nickName = that.cutOutSubString(that.rankingListArr[i].nickName, 20, true)
                }
              }
              if (res.data.currWechatActRankVO) {
                that.currentPeopleRanking = res.data.currWechatActRankVO;
              }
              that.assisTotalNum = res.data.partakeNum;
            } else {
              wx.showToast({
                title: "获取排行榜失败",
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      },
      //(串,长度,增加...)
      cutOutSubString(str, len, hasDot) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
          singleChar = str.charAt(i).toString();
          if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
          }
          else {
            newLength++;
          }
          if (newLength > len) {
            break;
          }
          newStr += singleChar;
        }

        if (hasDot && strLength > len) {
          newStr += "...";
        }
        return newStr;
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
              that.contentBtn = "我也要参加活动";
              that.$store.state.board.checked = true;
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
      topsLoc() {
        return this.$store.state.board.posterH * this.$store.state.board.windowWidth / this.$store.state.board.posterW - (280 / (320 / this.$store.state.board.windowWidth));
      },
      infos() { //活动信息
        return this.$store.state.board.infos;
      },
      invitationRewardType() { //邀请奖励类型
        return this.$store.state.board.invitationRewardType;
      },
      assistanceRewardType() {  //助力奖励类型
        return this.$store.state.board.assistanceRewardType;
        // return 3;
      },
      invitationSessionFrom() {  //邀请 客服消息传递参数
        if(this.$store.state.board.infos.initiatorReward&&this.$store.state.board.infos.initiatorReward.length){
          var initiatorrewardid = this.$store.state.board.infos.initiatorReward[0].initiatorRewardId;
          return '{"actId":"' + this.$store.state.board.actId + '","type":1,"initiatorRewardId":"' + initiatorrewardid + '"}';
        }
      },
      assistanceSessionFrom() {  //助力 客服消息传递参数
        if(this.$store.state.board.infos.assistanceReward&&this.$store.state.board.infos.assistanceReward.length){
          var initiatorrewardid = this.$store.state.board.infos.assistanceReward[0].initiatorRewardId;
          return '{"actId":"' + this.$store.state.board.actId + '","type":2,"initiatorRewardId":"' + initiatorrewardid + '"}';
        }
      },
      headPic() {  //助力人头像
        return this.$store.state.board.headPic
      },
      goLink() {
        return this.$store.state.board.goLink
      },
      myHelpId() {
        return this.$store.state.board.myHelpId
      },
      checked() {
        return this.$store.state.board.checked
      },
      checkedRule() {
        return (this.$store.state.board.checkedRule && this.activityTypes == 0)
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
        var posterW = this.$store.state.board.posterW;
        var posterH = this.$store.state.board.posterH;
        var winW = this.$store.state.board.windowWidth;
        var winH = this.$store.state.board.windowHeight;
        var temp = posterH / (posterW / (winW - 24));
        if ((winH - 70) < temp) {
          return (winH - 70);
        } else {
          return temp
        }
      },

      // leftR(data) {
      //   if (this.infos.initiatorReward) {
      //     if (this.headPic.length <= this.infos.initiatorReward[0].partakeNum) {
      //       return this.headPic.length / 2 / this.maxPartNum
      //     } else {
      //       return (this.infos.initiatorReward[0].partakeNum / 2 + (data - this.infos.initiatorReward[0].partakeNum)) / this.maxPartNum
      //     }
      //   }
      // },
      lotteryProgress() {
        if (this.assisTotalNum < this.lotteryDrawTarget) {
          // return 22
          return ((this.assisTotalNum / this.lotteryDrawTarget) * 100).toFixed(1);
        } else {
          return 100;
        }
      },
      ifRewardUnique() {    //只领取最高奖励   全部奖励
        return this.$store.state.board.ifRewardUnique;
      },
      ifAssistanceLimit() {   //助力是否有上限
        return this.$store.state.board.ifAssistanceLimit;
      },
      percents() {
        if (this.infos.initiatorReward && this.infos.initiatorReward.length) {
          if (this.headPic.length <= this.infos.initiatorReward[0].partakeNum) {
            return this.headPic.length * 10 / this.infos.initiatorReward[0].partakeNum
          } else {
            if (this.headPic.length > this.infos.initiatorReward[this.infos.initiatorReward.length - 1].partakeNum) {
              this.percentes = 100;
            } else {
              for (var i = 1; i < this.infos.initiatorReward.length; i++) {
                if (this.headPic.length <= this.infos.initiatorReward[i].partakeNum) {
                  var num = this.infos.initiatorReward[i].partakeNum - this.infos.initiatorReward[i - 1].partakeNum;
                  var nowNum = this.headPic.length - this.infos.initiatorReward[i - 1].partakeNum;
                  return 10 + ((i - 1) * 80 / (this.infos.initiatorReward.length - 1)) + nowNum * 80 / (this.infos.initiatorReward.length - 1) / num;
                  break;
                }
              }
            }
          }
        }
      }
    },
    // 下拉刷新
    onPullDownRefresh: function () {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      var that = this;
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
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      });
    },
    mounted() {
      var that = this;

    }
  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    font-size: 22px;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #FFC000;
    font-family: PingFangSC-regular;
    .haode {
      color: red;
      font-size: 30px;
    }
    .containes {
      width: calc(100% - 24px);
      /*height: calc(100% - 80px);*/
      padding: 12px;
      text-align: center;
      padding-bottom: 65px;
      background-color: #FFC000;
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
          top: 10px;
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
          z-index: 999999;
        }
        .activeRule.rulesCondition {
          display: block;
        }
      }

      img {
        width: 100%;
        /*height: 100% !important;*/
        border-radius: 8px;
      }
      div {
        .ruText {
          color: #124545;
          margin-top: 20px;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 15px;
          border: 1px solid #ccc;
          background-color: #fff;
          .ruTitle {
            color: #124545;
            font-size: 16px;
          }
          p {
            margin-top: 5px;
            font-weight: lighter;
            font-size: 14px;
          }
          span {
            display: inline-block;
          }
          .first {
            width: 7%;
            float: left
          }
          .two {
            width: 92%;
            text-align: left;
          }

        }
        .luckDraw {
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 1);
          color: rgba(16, 16, 16, 1);
          font-size: 14px;
          text-align: center;
          box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0);
          font-family: Arial;
          border: 1px solid rgba(255, 255, 255, 0);
          margin-top: 10px;
          .luckDrawText {
            height: 28px;
            color: rgba(240, 85, 34, 1);
            font-size: 20px;
            text-align: center;
            padding-top: 10px;
          }
          .luckDrawPro {
            margin-top: 20px;
            margin-bottom: 10px;
            padding: 0px 10px;
            box-sizing: border-box;
            progress {
              width: 100%;
            }
            img {
              width: calc(100% - 130px);
              vertical-align: middle;
              max-width: 200px;
            }
            .progressTotal {
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              text-align: center;
              .progress_box {
                position: relative;
                width: 90px;
                height: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
                /* background-color: #eee; */
              }
              .progress_bg {
                position: absolute;
                width: 90px;
                height: 90px;
              }
              .progress_canvas {
                width: 90px;
                height: 90px;
              }
              .progress_text {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center
              }
              .progress_info {
                font-size: 36 rpx;
                padding-left: 16 rpx;
                letter-spacing: 2 rpx
              }
              .progress_dot {
                width: 16 rpx;
                height: 16 rpx;
                border-radius: 50%;
                background-color: #fb9126;
              }
              .progressLine {
                position: relative;
                width: 50px;
                height: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
                .showProL {
                  width: 48px;
                  height: 70px;
                  background-color: #fff;
                  position: absolute;
                  bottom: 9px;
                  left: calc(50% - 24px);
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  border-top-right-radius: 5px;
                  border-top-left-radius: 5px;
                  box-sizing: border-box;
                  border: 1px solid #eee;
                  /*border-top: 0px;*/
                  background: -webkit-linear-gradient(left, #FFFFFF, #EEEEEE); /* Safari 5.1 - 6.0 */
                  background: -o-linear-gradient(right, #FFFFFF, #EEEEEE); /* Opera 11.1 - 12.0 */
                  background: -moz-linear-gradient(right, #FFFFFF, #EEEEEE); /* Firefox 3.6 - 15 */
                  background: linear-gradient(to right, #FFFFFF, #EEEEEE); /* 标准的语法 */
                }
                .showProSe {
                  width: 48px;
                  position: absolute;
                  bottom: 9px;
                  left: calc(50% - 24px);
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  /*border-top-right-radius: 5px;*/
                  /*border-top-left-radius: 5px;*/
                  box-sizing: border-box;
                  /*border: 1px solid #ddd;*/
                  /*border-top: 0px;*/
                  background: -webkit-linear-gradient(#FFC732, #FF8048); /* Safari 5.1 - 6.0 */
                  background: -o-linear-gradient(#FFC732, #FF8048); /* Opera 11.1 - 12.0 */
                  background: -moz-linear-gradient(#FFC732, #FF8048); /* Firefox 3.6 - 15 */
                  background: linear-gradient(#FFC732, #FF8048); /* 标准的语法 */
                }
                .showProText {
                  /*background-color: #F15522;*/
                  position: absolute;
                  color: #FF8048;
                }
              }

            }
          }
          .luckDrawDes {
            color: rgba(87, 87, 87, 1);
            font-size: 10px;
            text-align: center;
            padding-bottom: 8px;
          }
        }
        .ladderHelp {
          border-radius: 8px;
          margin-bottom: 20px;
          margin-top: 20px;
          /*padding: 10px;*/
          background-color: #FFF;
          .assistantLimit {
            padding: 10px;
            box-sizing: border-box;
            .titles {
              color: #124545;
              font-size: 16px;
            }
            .ladderList {
              width: 100%;
              height: 35px;
              font-size: 14px;
              line-height: 35px;
              text-align: left;
              /*padding: 0px 10px;*/
              margin: 15px 0px;
              /*box-sizing: border-box;*/
              .serialNum {
                display: inline-block;
                float: left;
                margin-right: 10px;
                width: 20px;
                height: 20px;
                border-radius: 10px;
                line-height: 20px;
                text-align: center;
                color: #F05522;
                background-color: #FFDDB6;
                margin-top: 10px;
              }
              .listName {
                display: inline-block;
                float: left;
                color: #124545;
                /*margin-right: 10px;*/
              }
              .listTime {
                display: inline-block;
                float: right;
              }
              img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: inline-block;
                vertical-align: middle;
                float: left;
                margin-right: 10px;
                border: 1px solid #F05522;
              }
            }
            margin-bottom: 10px;
            .helpZero {
              padding-top: 35px;
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
          }
          .assistantNoLimit {
            margin-bottom: 10px;
            .rankTopNav {
              background-color: #FFC000;
              .rankNavsel {
                display: inline-block;
                width: 50%;
                text-align: center;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                border-radius: 8px 8px 0px 0px;
                font-family: Arial;
                background-color: rgba(255, 217, 60, 1);
                color: rgba(255, 255, 255, 1);
              }
              .selNav {
                color: #010101;
                background-color: rgba(255, 255, 255, 1);
              }
            }
            .rankHelpList {
              padding-bottom: 10px;
              div {
                .rankNumber {
                  margin: 10px 0px;
                  text-align: center;
                  color: rgba(107, 107, 107, 1);
                  font-size: 14px;
                }
                .rankIdentification {
                  height: 30px;
                  line-height: 30px;
                  background-color: rgba(244, 244, 244, 1);
                  color: rgba(16, 16, 16, 1);
                  font-size: 14px;
                  text-align: center;
                  padding: 0px 10px;
                  font-family: Arial;
                  span {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    text-align: left;
                  }
                  span:nth-child(1) {
                    width: 25%;
                    box-sizing: border-box;
                    padding-left: 5px;
                  }
                  span:nth-child(2) {
                    width: calc(75% - 80px);
                  }
                  span:nth-child(3) {
                    width: 80px;
                    text-align: center;
                  }
                }
                .ladderList {
                  padding: 10px;
                  padding-top: 0px;
                  box-sizing: border-box;
                  width: 100%;
                  height: 35px;
                  font-size: 14px;
                  line-height: 35px;
                  text-align: left;
                  /*padding: 0px 10px;*/
                  margin: 15px 0px;
                  /*box-sizing: border-box;*/
                  .serialNum {
                    display: inline-block;
                    float: left;
                    margin-right: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 10px;
                    line-height: 20px;
                    text-align: center;
                    color: #F05522;
                    background-color: #FFDDB6;
                    margin-top: 10px;
                  }
                  .listName {
                    display: inline-block;
                    float: left;
                    color: #124545;
                  }
                  .listTime {
                    display: inline-block;
                    float: right;
                  }
                  img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: inline-block;
                    vertical-align: middle;
                    float: left;
                    margin-right: 10px;
                    border: 1px solid #F05522;
                  }
                }
                .rankBottomIn {
                  text-align: center;
                  color: rgba(0, 0, 0, 0.3);
                  font-size: 10px;
                }
                .helpZero {
                  padding-top: 35px;
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
              }
              .rankListShow {
                .ladderList {
                  .listName {
                    width: calc(75% - 80px);
                  }
                  .listTime {
                    width: 80px;
                  }
                }
              }
            }
          }
        }
      }
      .recordLadder {
        position: relative;
        /*bottom: 58px;*/
        /*left: 12px;*/
        width: 100%;
        background-color: #FFF;
        height: 310px;
        margin: 0 auto;
        margin-top: -80px;
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
          margin-top: 10px;
          .helpZero {
            padding-top: 35px;
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
          .ladderHelpPeo {
            .title {
              color: #F05522;
              font-size: 20px;
              padding-top: 10px;
            }
            .titleAssNum {
              color: rgba(108, 107, 107, 1);
              font-size: 16px;
              text-align: center;
              margin-top: 10px;
            }
            .hongbaoImg {
              position: relative;
              width: calc(100% - 20px);
              height: 80px;
              margin-top: 20px;
              left: 10px;
              div {
                display: inline-block;
                width: 60px;
                top: -4px;
                position: absolute;
                img {
                  width: 100%;
                  /*height: 100%;*/
                }
                p {
                  position: relative;
                  top: -55px;
                  text-align: top;
                  display: inline-block;
                  width: calc(100% - 20px);
                  margin: auto;
                  font-size: 9px;
                  color: #fff;
                  height: 25px;
                  overflow: hidden;
                  span {
                    display: inline-block;
                    width: 100%;
                    word-wrap: break-word
                  }
                }
              }
            }
            .progressBar {
              width: calc(100% - 20px);
              margin-left: 10px;
              height: 25px;
              text-align: left;
              position: relative;
              .proList {
                width: 100%;
                overflow: hidden;
                height: 10px;
                border-radius: 5px;
                margin-top: 5px;
                progress {
                  width: 100%;
                }
              }
              div {
                position: absolute;
                p.quan {
                  width: 18px;
                  height: 18px;
                  border-radius: 9px;
                  border: 3px solid #F05522;
                  background-color: #fff;
                  box-sizing: border-box;
                }
                p.wen {
                  font-size: 12px;
                  margin-left: -13px;
                  width: 55px;
                  span {
                    color: #F05522;
                  }
                }
              }
            }
          }
          .menues {
            width: 100%;
            /*position: fixed;*/
            /*bottom: 0px;*/
            text-align: center;
            z-index: 1000;
            margin-top: 40px;
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
            /*.menuss {*/
            /*margin: 0 auto;*/
            /*width: 270px;*/
            /*height: 40px;*/
            /*display: none;*/
            /*background: #EF6D00;*/
            /*font-size: 13px;*/
            /*color: rgba(255, 255, 255, 1);*/
            /*text-align: center;*/
            /*line-height: 40px;*/
            /*border-radius: 24px;*/
            /*border: none;*/
            /*}*/
            div.menus.rewardCondition, button.menus.rewardCondition {
              display: inline-block;
            }
            /*button.menuss.rewardCondition {*/
            /*display: block;*/
            /*}*/
            .hoverNone {
              pointer-events: none;
            }
            .listHelp {
              font-size: 14px;
              .menusH {
                width: 135px;
                background: #F05522;
                color: #fff;
                display: none;
                display: inline-block;
                border: 1px solid transparent;
                text-align: center;
                line-height: 40px;
                border-radius: 20px;
              }
              .receive {
                width: 135px;
                height: 40px;
                display: inline-block;
                line-height: 40px;
                background-color: #fff;
                border: 1px solid #F05522;
                color: #F05522;
                border-radius: 20px;
                margin-right: 20px;
              }
              div.menusH.rewardCondition {
                display: inline-block;
              }
            }
          }
        }
        .noHelp {
          text-align: center;
          color: #575757;
          font-size: 14px;
        }
      }
      div.recordLadder.rewardCondition {
        display: block;
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
          /*.menuss {*/
          /*margin: 0 auto;*/
          /*width: 270px;*/
          /*height: 40px;*/
          /*display: none;*/
          /*background: #EF6D00;*/
          /*font-size: 13px;*/
          /*color: rgba(255, 255, 255, 1);*/
          /*text-align: center;*/
          /*line-height: 40px;*/
          /*border-radius: 24px;*/
          /*border: none;*/
          /*}*/
          div.menus.rewardCondition, button.menus.rewardCondition {
            display: inline-block;
          }
          /*button.menuss.rewardCondition {*/
          /*display: block;*/
          /*}*/
          .hoverNone {
            pointer-events: none;
          }
          .listHelp {
            font-size: 14px;
            .menusH {
              width: 135px;
              background: #F05522;
              color: #fff;
              display: none;
              display: inline-block;
              border: 1px solid transparent;
              text-align: center;
              line-height: 40px;
              border-radius: 20px;
            }
            .receive {
              width: 135px;
              height: 40px;
              display: inline-block;
              line-height: 40px;
              background-color: #fff;
              border: 1px solid #F05522;
              color: #F05522;
              border-radius: 20px;
              margin-right: 20px;
            }
            div.menusH.rewardCondition {
              display: inline-block;
            }
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
      /*padding-bottom: 14px;*/
      bottom: 0px;
      padding: 7.5px 0px;
      /*.menus {*/
      /*margin: 0 auto;*/
      /*width: 195px;*/
      /*height: 40px;*/
      /*display: none;*/
      /*background: #fff;*/
      /*border: 1px solid #F05522;*/
      /*font-size: 14px;*/
      /*color: #F05522;*/
      /*text-align: center;*/
      /*line-height: 40px;*/
      /*border-radius: 20px;*/
      /*margin-top: 3px;*/
      /*}*/
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
      /*div.menus.rewardCondition, button.menus.rewardCondition {*/
      /*display: block;*/
      /*}*/
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
      left: 12px;
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
          .assisReward {
            position: relative;
            margin: 20px 0px;
            padding: 0px !important;
            img {
              width: 100%;
            }
            .assisCon {
              height: 45px;
              position: absolute;
              left: 20px;
              top: calc(50% - 22.5px);
              padding: 0px !important;
              .assisName {
                /*height: 25px;*/
                color: rgba(255, 255, 255, 1);
                font-size: 18px;
                text-align: left;
              }
              .assisDes {
                /*height: 14px;*/
                display: table-cell;
                vertical-align: middle;
                color: rgba(255, 255, 255, 1);
                font-size: 10px;
                text-align: left;
              }
              .lhName {
                line-height: 40px;
              }
            }
            .assisBtn {
              width: 80px;
              height: 30px;
              padding: 0px !important;
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
      left: 12px;
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
