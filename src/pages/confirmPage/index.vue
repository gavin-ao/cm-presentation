<template>
  <div class="instructor-toueist">
    <div class="confirmTotal">
      <p class="title">
        这是标题
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
        <div class="trys menus"  v-if="diffNum" @click="continueHelp">再试试</div>
        <div class="menu menus" v-if="datas.rewardType==1||datas.rewardType==2" @click="receiveAreward">领取奖励</div>
        <button class="menu menus" open-type="contact"
                hover-class="hoverNone" hover-stay-time="800" @click="getRewardAct" type="default"
                :session-from=invitationSessionFrom v-else-if="datas.rewardType==3">
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
    .confirmTotal{
      background-color: #FFFBEE;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 15px;
      .title{
        color: #525E71;
        font-size: 20px;
        padding-top: 25px;
      }
      .contentMid{
        div{
          width: 254px;
          height: 300px;
          margin: auto;
          img{
            width: 100%;
            height: 100%;
          }
          span{
            position: relative;
            top: -225px;
            color: #fff;
            font-size: 20px;
            display: inline-block;
            width: 150px;
            box-sizing: border-box;
            word-wrap:break-word

          }
        }
        p{
          color: #5F5F5F;
          font-size: 10px;
          margin-top: -10px;
        }

      }
      .footer{
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
        margin-top: 30px;
        p{
          color: #F05522;
          font-size: 20px;
        }
      }
      .menuT{
        margin-top: 50px;
        font-size: 14px;
        div{
          display: inline-block;
        }
        .menus{
          width: 135px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
        }
        .trys{
          border: 1px solid #F05522;
          color: #F05522;
          margin-right: 28px;
        }
        .menu{
          border: 1px solid transparent;
          background-color: #F05522;
          color: #fff;
        }
      }
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        datas:{},
        diffNum:0
      }
    },
    onLoad(option) {
      console.log(option)

    },
    onShow(){
      var that = this;
      var sessionID = that.$store.state.board.sessionID;
      var myHelpId = that.$store.state.board.myHelpId;
      that.diffNum = that.infos.initiatorReward[that.infos.initiatorReward.length-1].partakeNum - that.headPic.length;
      wx.request({
        url: that.$store.state.board.urlHttp + "/wechatapi/help/haveRewardActCommand",
        method: "POST",
        data: {helpId:myHelpId,sessionID:sessionID},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res);
          if (res.data.success) {
            for(var i=0;i<that.infos.initiatorReward.length;i++){
              if(that.infos.initiatorReward[i].initiatorRewardId == res.data.initiatorRewardId){
                that.datas = that.infos.initiatorReward[i];
              }
            }

          } else {

          }

        }
      })
    },
    computed: {
      infos(){
        return  this.$store.state.board.infos
      },
      headPic(){
        return this.$store.state.board.headPic
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
      }

    },
    created() {
    },
    mounted() {

    },
    components: {}
  }
</script>
