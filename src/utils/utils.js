function login(that, func) {
  console.log(new Date().getTime())
  var otherHelpId = that.$store.state.board.otherHelpId;
  var actId = that.$store.state.board.actId;
  var sessionID = that.$store.state.board.sessionID;
  if(sessionID){
    if (otherHelpId) {
      func(sessionID, actId, otherHelpId)
    } else {
      func(sessionID, actId);
    }
  }else{
    wx.login({
      success: function (res) {
        var code = res.code;
        // wx.setStorageSync('code', res.code)
        wx.getUserInfo({
          lang: "zh_CN",
          success: function (res) {
            console.log(new Date().getTime())
            var key = {};
            key.encryptedData = res.encryptedData
            key.iv = res.iv
            that.$store.state.board.nickName = res.userInfo.nickName;
            that.$store.state.board.avatarUrl = res.userInfo.avatarUrl;
            console.log(res.userInfo.avatarUrl)
            if(res.userInfo.avatarUrl){
              wx.getImageInfo({
                src: res.userInfo.avatarUrl,
                success: (res) => {
                  that.$store.state.board.drawAvatarUrl = res.path;
                }
              })
            }
            var url = that.$store.state.board.urlHttp + '/wechatapi/service/newLogin';
            wx.request({
              url: url,
              method: "POST",
              data: {
                appid: that.$store.state.board.appid,
                secret: that.$store.state.board.secret,
                storeId:that.$store.state.board.storeId,
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  console.log(new Date().getTime())
                  that.$store.state.board.sessionID = res.data.sessionID
                  // var currentPages = wx.getStorageSync('currentPages')
                  // that.$store.state.board.headPic=[]
                  var otherHelpId = that.$store.state.board.otherHelpId;
                  var actId = that.$store.state.board.actId;
                  var sessionID = that.$store.state.board.sessionID;
                  if (otherHelpId) {
                      func(sessionID, actId, otherHelpId)
                  } else {
                      func(sessionID, actId);
                  }
                }
              }
            })
          }
        })
      }
    })
  }

}
function formatTime(dates) {
  var date = new Date(dates);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  // var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}
module.exports = {
  login: login,
  formatTime:formatTime
}
