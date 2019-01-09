<template>
  <div class="instructor-toueist">
    <div class="multilevelReward">
      <div class="totalReward">
        <div class="assisReward">
          <img src="/static/images/assist.png" alt="" mode="widthFix">
          <div class="assisCon">
            <p class="assisName">30元代金券</p>
            <p class="assisDes">Michael音箱专用</p>
          </div>
          <div class="assisBtn">
            领奖
          </div>
        </div>
        <div class="invitReward">
          <div v-for="(item,index) in rewardList" :key="index" class="invitSingle">
            <img src="/static/images/invit.png" alt="" mode="widthFix">
            <div class="invitCon">
              <p class="invitName">{{item.rewardContent}}</p>
              <p class="invitDes">Michael音箱专用</p>
            </div>
            <div class="invitBtn">
              领奖
            </div>
          </div>
        </div>
      </div>
      <div class="addAddress" @click="addAddress" v-if="addressShow==true&&addressInfos==false">
        <span>添加地址</span>
      </div>
      <div class="addressShow"  v-if="addressShow==true&&addressInfos==true">
        <span>这是地址添加地址Michael音箱专用这是地址添加地址Michael音箱专用这是地址添加地址Michael音箱专用</span> <span class="modifyBtn" @click="modifyButton">修改地址</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .instructor-toueist {
    width: 100%;
    /*height: 100%;*/
    box-sizing: border-box;
    font-size: 14px;
    padding: 20px;
    padding-bottom: 40px;
    font-family: PingFangSC-regular;
    .multilevelReward {
      .totalReward{
        .assisReward{
          position: relative;
          margin-bottom: 20px;
          img{
            width: 100%;
          }
          .assisCon{
            height: 45px;
            position: absolute;
            left: 20px;
            top:calc(50% - 22.5px);
            .assisName{
              height: 25px;
              color: rgba(255, 255, 255, 1);
              font-size: 18px;
              text-align: left;
            }
            .assisDes{
              height: 14px;
              color: rgba(255, 255, 255, 1);
              font-size: 10px;
              text-align: left;
            }
          }
          .assisBtn{
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
            top:calc(50% - 15px);
            background-color: #fff;
          }
        }
        .invitReward{
          .invitSingle{
            position: relative;
            margin-bottom: 20px;
            img{
              width: 100%;
            }
            .invitCon{
              height: 45px;
              position: absolute;
              left: 20px;
              top:calc(50% - 22.5px);
              .invitName{
                height: 25px;
                color: rgba(255, 255, 255, 1);
                font-size: 18px;
                text-align: left;
              }
              .invitDes{
                height: 14px;
                color: rgba(255, 255, 255, 1);
                font-size: 10px;
                text-align: left;
              }
            }
            .invitBtn{
              width: 80px;
              height: 30px;
              line-height: 30px;
              border-radius: 15px;
              font-size: 14px;
              text-align: center;
              font-family: Arial;
              position: absolute;
              right: 25px;
              top:calc(50% - 15px);
              background-color: #fff;
              color: rgba(255, 128, 72, 1);
            }
          }
        }
      }
      .addAddress{
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
      .addressShow{
        text-align: left;

        span:nth-child(1){
          display: inline-block;
          width: calc(100% - 90px);
          vertical-align: middle;
        }
        .modifyBtn{
          display: inline-block;
          width: 75px;
          margin-left: 15px;
          height: 30px;
          line-height: 28px;
          box-sizing: border-box;
          border-radius: 4px;
          color: rgba(241, 85, 34, 1);
          font-size: 14px;
          text-align: center;
          font-family: Microsoft Yahei;
          border: 1px solid rgba(241, 85, 34, 1);
        }
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        rewardList:[],
        addressShow:false,
        addressInfo:{}
      }
    },
    onLoad(option) {
      console.log(option);
      var that = this;
      Object.assign(that.$data, that.$options.data());
      var initList = that.infos.initiatorReward;
      if(initList[initList.length-1]<that.headPic.length){
        that.addressShow = true;
      }
      for(var i=0;i<initList.length;i++){
        if(initList[i].partakeNum<=that.headPic.length){
          that.rewardList.push(initList[i]);
        }
      }

    },
    onShow() {
      var that = this;
      var sessionID = that.$store.state.board.sessionID;
      var myHelpId = that.$store.state.board.myHelpId;
    },
    computed: {
      infos() {
        return this.$store.state.board.infos;
      },
      headPic() {
        return this.$store.state.board.headPic;
      },
      addressInfos(){
        if(JSON.stringify(this.addressInfo) == "{}"){
          return false;
        }else{
          return true;
        }
      }
    },
    methods: {
      addAddress(){
        var url = "/pages/address/main";
        if(JSON.stringify(this.addressInfo) != "{}"){
         url = "/pages/address/main?address="+ JSON.stringify(this.addressInfo);
        }
        wx.navigateTo({
          url: url
        })
      },
      modifyButton(){

      }
    },
    created() {
    },
    mounted() {
      var navTitle = "领取奖励";
      wx.setNavigationBarTitle({
        title: navTitle
      })
    },
    components: {}
  }
</script>
