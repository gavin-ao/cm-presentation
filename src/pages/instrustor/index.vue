<template>

  <div class="instructor-toueist">
    <img src="/static/img/19.jpg" alt="" style="width: 100%;height: 100%;">
    <div class="containes">
      <div class="search">
        <input type="text" placeholder="输入店名" @input="selStore()" v-model="input">
      </div>
      <div class="expand">
        <scroll-view style="height: 100%;width: 100%;">
          <div v-for="(item,index) in datas" :key="index" v-if="datas.length>0">
            <div @click="insertMp(item.storeId)">
              <p> {{item.storeName}}（店名）</p>
              <p>{{item.storeAddr}}（地址）</p>
            </div>
          </div>
          <div v-if="datas.length==0">
            <div v-if="datas==[]" style="height: 60px;text-align: center;line-height: 60px;">
              请输入店名搜索相关的门店
            </div>
            <div v-else style="height: 60px;text-align: center;line-height: 60px;">
              无相应的门店
            </div>
          </div>
        </scroll-view>
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

    /*background-image: url("/static/img/19.jpg");*/
    /*margin-bottom: 30px;*/
    .containes {
      width: calc(100% - 40px);
      height: 100%;
      margin-top: 10px;
      position: fixed;
      top: 0px;
      left: 20px;
      z-index: 1000;
      .search {
        input {
          border: 1px solid #ccc;
          height: 30px;
          border-radius: 5px;
          padding-left: 5px;
          background-color: #fff;
        }
        input:focus {
          border: 1px solid blue;
        }
      }
      .expand {
        width: 100%;
        height: calc(100% - 70px);
        /*background-color: rgba(144,144,144,.2);*/
        margin-top: 5px;
        border-radius: 10px;
        div {
          padding-left: 10px;
          background-color: #fff;
          margin-top: 5px;
          border-radius: 10px;
          p {
            line-height: 20px;
            color: rgba(83, 82, 82, 1);
            font-size: 13px;
            text-align: left;
            font-family: PingFangSC-regular;

          }
        }
      }
    }
  }
</style>

<script>

  export default {
    name: '',
    props: [],
    data() {
      return {
        input: '',
        datas: '',
        point: {}
      }
    },
    onLoad(option) {
      console.log(option)

    },
    computed: {},
    methods: {
      selStore(res) {
        var that = this;
        console.log(this.input);
        var parmas = {};
        parmas.keyword = that.input.trim();
        parmas.appid = that.$store.state.board.appid;

        parmas.longitude = that.point.longitude ? that.point.longitude : "";
        parmas.latitude = that.point.latitude ? that.point.latitude : "";
        console.log(parmas);
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/nologin/store/findStoreTopList",
          method: "POST",
          data: parmas,
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              that.datas = res.data.storeList;
              console.log(that.datas)
            } else {
              that.datas = [];
            }

          }
        })

      },
      insertMp(storeId) {
        console.log(storeId);
        if (storeId) {
          this.$store.state.board.storeId = storeId;
          wx.setStorageSync("storeId", storeId);
          wx.redirectTo({
            url: '/pages/activePower/main'
          })
        }
      },
      sortBy(filed, rev, primer) {
        rev = (rev) ? -1 : 1;
        return function (a, b) {
          a = a[filed];
          b = b[filed];
          if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
          }
          if (a < b) {
            return rev * -1;
          }
          if (a > b) {
            return rev * 1;
          }
          return 1;
        }
      },


    },
    created() {
    },
    mounted() {
      var that = this;
      that.checked = false;
      that.checkedRule = false;
      wx.setNavigationBarTitle({
        title: "门店搜索"
      })

      var QQMapWX = require('../../../static/qqmap-wx-jssdk.min.js');
      var qqmapsdk = new QQMapWX({
        key: 'OISBZ-SUKW6-LJ7SS-MXQHI-GC5FF-CQBGM'
      });
      wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: (res) => {
          console.log(res);
          that.point = res;
          that.selStore();
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: (addressRes) => {
              console.log(addressRes);
              this.$store.state.board.address = addressRes.result.address_component.province + '' + addressRes.result.address_component.district;
              this.$store.state.board.location = addressRes.result.address_component.province;
            }
          })
        }
      })
    },
    components: {}
  }
</script>
