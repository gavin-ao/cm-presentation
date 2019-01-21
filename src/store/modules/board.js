const state = {
  goLink: '',
  address: '',
  actShareTitle:'', //分享标题
  actTitle:'', //活动标题
  invitationRewardType:1,//邀请奖励类型 1兑换码 2淘口令 3进群和落地页
  assistanceRewardType:1,//助力奖励类型 0没奖  1兑换码 2淘口令 3进群和落地页
  windowWidth: 0,
  windowHeight: 0,
  posterH:0,
  posterW:0,
  location: "",
  nickName: '',
  avatarUrl: '',
  qrcodeUrl:'',
  otherHelpId:'',
  myHelpId:'',
  actId:'',
  storeId:'',
  sessionID:'',
  checked: false,
  checkedRule: false,
  checkedRules: false,
  existDoHelp: '',
  myExistDoHelp:'',
  drawAvatarUrl:'',
  partakeNums: 0,
  drawPoster:'',
  btnText:{},
  infos:{},
  actShareCopywriting:'',
  ifRewardUnique:'',   //只领取最高奖励   全部奖励
  ifAssistanceLimit:'',  //助力是否有上限
  //门店e助手  茅台
  // appid:'wx032f66ebe0dcce8f',
  // secret:'64a61af911d59a37a6fe86a8087a1bfa',
  //传播e  健身房
  appid:'wxe579ca2db6c13ef6',
  secret:'54cc07746b347458ab8b448029d66762',
  //场景e营销  散户
  // appid:'wxe64836977059c5b7',
  // secret:'218d0ece07bceb2348b2868728df1bd7',
  //司马e  音磅
  // appid:'wx7ce4b9ce272d1817',
  // secret:'d946a8de0df55661af48b97fa6de4d9b',
  //获客e演示  demo演示
  // appid:'wxc42753bb1bb93ec4',
  // secret:'97f834b7b94293851b6848be3e97a0c4',
  //疯狂小狗领福利  小狗
  // appid:'wx6ab624189a12acfc',
  // secret:'9dc38c8bc08bdcd3e7215faaaee52790',
  //公益播  空置 测试
  // appid:'wx2c560cde533807da',
  // secret:'f3a0460c07461349d0b80cd618eade77',
  headPic:[],
  // urlHttp:'https://cm-service.easy7share.com'
  urlHttp:'https://dataanalysis-cs.easy7share.com'
}

export default {
  state,
}
