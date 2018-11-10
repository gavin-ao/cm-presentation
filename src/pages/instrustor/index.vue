<template>
  <div class="instructor-toueist">
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
    /*margin-bottom: 30px;*/
    .containes {
      width: calc(100% - 40px);
      margin: 0 auto;
      height: 100%;
      margin-top: 10px;
      .search{
        input {
          border: 1px solid #ccc;
          height: 30px;
          border-radius: 5px;
          padding-left: 5px;
        }
        input:focus {
          border: 1px solid blue;
        }
      }
      .expand{
        width: 100%;
        height: calc(100% - 70px);
        background-color: rgba(144,144,144,.2);
        margin-top: 5px;
        border-radius: 10px;
        div{
          padding-left: 10px;
          background-color: #fff;
          margin-top: 5px;
          border-radius: 10px;
          p{
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
        datas:''
      }
    },
    onLoad(option) {
      console.log(option)

    },
    computed: {},
    methods: {
      selStore() {
        var that = this;
        console.log(this.input)
        if(that.input.trim()){
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/nologin/store/findStoreTopList",
            method: "POST",
            data: {
              keyword: that.input.trim(),
              appid:that.$store.state.board.appid
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              console.log(res)
              if(res.data.success){
                that.datas = res.data.storeList;
                console.log(that.datas)
              }

            }
          })
        }else{
          that.datas = [];
        }
      },
      insertMp(storeId){
        if(storeId){
          this.$store.state.board.storeId = storeId;
          wx.setStorageSync("storeId", storeId);
          wx.redirectTo({
            url: '/pages/activePower/main'
          })
        }
      }

    },
    created() {
    },
    mounted() {
      var that = this;
      that.checked = false
      that.checkedRule = false
      wx.setNavigationBarTitle({
        title: "门店搜索"
      })

      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth;
          this.$store.state.board.windowHeight = res.windowHeight
        }
      })

    },
    components: {}
  }
</script>
