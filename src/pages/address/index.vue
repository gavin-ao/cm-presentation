<template>
  <div class="instructor-toueist">
    <div class="multilevelReward">
      <div class="addressCompletion">
        <div class="eachMessage">
          <span class="titleInfos">填写您的收货信息，便于收取实物奖品</span>
        </div>
        <div class="eachMessage">
          <span class="addressDes">收货人</span>
          <div class="addressInfos"><input type="text" v-model="userName"></div>
        </div>
        <div class="eachMessage">
          <span class="addressDes">手机号码</span>
          <div class="addressInfos"><input type="number" v-model="telNumber"></div>
        </div>
        <div class="eachMessage">
          <picker
            mode="region"
            @change="bindRegionChange"
            :value="region"
            :custom-item="customItem"
          >
            <div class="picker">
              <span class="addressDes">地区信息</span>
              <div class="addressInfos" style="height: 60rpx;line-height: 58rpx;"><span>{{region[0]}} {{region[1]}} {{region[2]}}</span>
              </div>
            </div>
          </picker>
        </div>
        <div class="eachMessage">
          <span class="addressDes" style="vertical-align: top;">详细地址</span>
          <div class="addressInfos"><textarea auto-height="true" maxlength="-1" v-model="detailadress"></textarea></div>
        </div>
        <!--<div class="eachMessage" style="margin-bottom: 0px">-->
          <!--<span class="submitBtns">提交</span>-->
        <!--</div>-->
      </div>
    </div>
    <div class="addressFooter">
      <div @click="wxaddress">一键导入微信地址</div>
      <div @click="submitAddress"> 提交</div>
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
      /*height: 100%;*/
      .addressCompletion {
        /*margin-top: 20px;*/
        margin-bottom: 20px;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: rgba(255, 251, 238, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: center;
        box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0);
        font-family: Arial;
        .eachMessage {
          margin-bottom: 15px;
          /*border-bottom: 1px solid #ccc;*/
          .titleInfos {
            color: rgba(107, 107, 107, 1);
            font-size: 18px;
            font-family: PingFangSC-regular;
          }
          .addressDes {
            display: inline-block;
            vertical-align: middle;
            width: 75px;
            color: rgba(158, 158, 158, 1);
            font-size: 16px;
            text-align: left;
            font-family: PingFangSC-regular;
          }
          .addressInfos {
            display: inline-block;
            width: calc(100% - 75px);
            font-size: 16px;
            border: 1px solid rgba(187, 187, 187, 1);
            background-color: #fff;
            box-sizing: border-box;
            text-align: left;
            input {
              width: 100%;
              height: 30px;
              border: none;
              padding: 0px 5px;
              box-sizing: border-box;
            }
            textarea {
              width: 100%;
              min-height: 100px;
              height: 100px;
              border: none;
              padding: 5px;
              box-sizing: border-box;
            }
            vertical-align: middle;
          }
          .submitBtns {
            display: inline-block;
            width: 80px;
            height: 30px;
            line-height: 30px;
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
    .addressFooter {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 45px;
      line-height: 45px;
      border-top: 1px solid #BBBBBB;
      div:nth-child(1) {
        width: 50%;
        float: right;
        background-color: rgba(251, 90, 25, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        text-align: center;
        font-family: Arial;
      }
      div:nth-child(2) {
        width: 50%;
        float: left;
        //background-color: rgba(251, 90, 25, 1);
        color: rgba(251, 90, 25, 1);
        font-size: 16px;
        text-align: center;
        font-family: Arial;
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        region: ['', '', ''],
        customItem: '全部',
        userName:"",
        telNumber:'',
        detailadress:''
      }
    },
    onLoad(option) {
      console.log(option);
      var that = this;
      Object.assign(that.$data, that.$options.data());
      var navTitle = "添加地址";
      if (option.address) {
        navTitle = "修改地址"
      }
      wx.setNavigationBarTitle({
        title: navTitle
      })
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
      }
    },
    methods: {
      bindRegionChange(e) {
        console.log('picker发送选择改变，携带值为', e.target.value);
        this.region = e.target.value;

      },
      wxaddress() {
        var _this = this;
        wx.chooseAddress({
          success: function (res) {
            _this.userName = res.userName;
            _this.telNumber = res.telNumber;
            _this.region =[res.provinceName, res.cityName, res.countyName];
            _this.detailadress = res.detailInfo;
          }
        });
      },
      submitAddress(){

      }
    },
    created() {
    },
    mounted() {

    },
    components: {}
  }
</script>
