<template>
  <div class="instructor-toueist">
      <div class="multilevelReward">

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
    .multilevelReward{

    }
  }
</style>

<script>

  export default {
    data() {
      return {

      }
    },
    onLoad(option) {
      console.log(option)

    },
    onShow() {
      var that = this;
      var sessionID = that.$store.state.board.sessionID;
      var myHelpId = that.$store.state.board.myHelpId;
    },
    computed: {
      infos() {
        return this.$store.state.board.infos
      },
      headPic() {
        return this.$store.state.board.headPic
      }
    },
    methods: {

    },
    created() {
    },
    mounted() {

    },
    components: {}
  }
</script>
