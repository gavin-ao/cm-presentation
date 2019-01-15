<script>
  import utils from "./utils/utils.js";

  export default {
    onLaunch(option) {
    },
    onShow(option) {
      // console.log(option)
      var that = this;
      // var url = "http://activitycounter.easy7share.com/hello/statis/1";
      // var dd = encodeURIComponent(url);
      if (option.path && option.path != "pages/address/main") {
        var setGloableData = {
          goLink: '',
          address: '',
          actShareTitle: '', //分享标题
          actTitle: '', //活动标题
          rewardType: '',//奖励类型
          invitationRewardType: 1,//邀请奖励类型
          assistanceRewardType: 1,//助力奖励类型
          windowWidth: 0,
          windowHeight: 0,
          posterH: 0,
          posterW: 0,
          location: "",
          nickName: '',
          avatarUrl: '',
          qrcodeUrl: '',
          otherHelpId: '',
          myHelpId: '',
          checked: false,
          checkedRule: false,
          checkedRules: false,
          existDoHelp: '',
          myExistDoHelp: '',
          drawAvatarUrl: '',
          partakeNums: 0,
          drawPoster: '',
          btnText: {},
          actShareCopywriting: '',
          headPic: [],
          infos:{},
          ifRewardUnique: '',   //只领取最高奖励   全部奖励
          ifAssistanceLimit: '',  //助力是否有上限
        };
        // console.log(that);
        Object.assign(that.$store.state.board, setGloableData);
        if (option.query.q || option.query.storeId) {
          if (option.query.storeId) {
            wx.setStorageSync("storeId", option.query.storeId);
            that.$store.state.board.storeId = option.query.storeId;
            if (option.query.helpId) {
              that.$store.state.board.otherHelpId = option.query.helpId;
            }
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/activePower/main'
              })
            }, 500)
          }
          if (option.query.q) {
            var q = decodeURIComponent(option.query.q);
            var urlArr = q.split("/");
            var storeId = urlArr[urlArr.length - 1];
            // console.log(storeId)
            if (storeId) {
              wx.setStorageSync("storeId", storeId);
              that.$store.state.board.storeId = storeId;
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/activePower/main'
                })
              }, 500)
            } else {
              wx.redirectTo({
                url: '/pages/instrustor/main'
              })
            }
          }

        } else {
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                if (wx.getStorageSync("storeId")) {
                  that.$store.state.board.storeId = wx.getStorageSync("storeId")
                }
                utils.login(that, function (sessionID, actId) {
                  // console.log(  that.$store.state.board.storeId)
                  if (that.$store.state.board.storeId) {
                    wx.redirectTo({
                      url: '/pages/activePower/main'
                    })
                  } else {
                    wx.redirectTo({
                      url: '/pages/instrustor/main'
                    })
                  }
                })
              } else {
                wx.redirectTo({
                  url: '/pages/instrustor/main'
                })
              }
            }
          })
        }
      }


    },
    created() {

    }
  }
</script>

<style>
  page {
    height: 100%;
    width: 100%;
    /*background-color: #FFF;*/
  }

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100px 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
