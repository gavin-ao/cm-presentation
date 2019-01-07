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
  appid:'wx032f66ebe0dcce8f',
  secret:'64a61af911d59a37a6fe86a8087a1bfa',
  headPic:[],
  // urlHttp:'https://cm-service.easy7share.com'
  urlHttp:'https://dataanalysis-cs.easy7share.com'
}

export default {
  state,
}
