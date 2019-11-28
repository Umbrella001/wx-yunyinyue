//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: '',
        traceUser: true,
      })
    }

    this.getOpenid()

    this.globalData = {
      playingMusicId: -1,  // 播放歌曲的搜索
      isBtnType: 0,  // 图片或者视频
      openid: '',  //  用户的openid （用户使用同一个小程序openid不变）
      musicOpenid: '' ,  // 用户喜欢歌曲列表openid
    }
  },
  
  //  获取和设置音乐id
  setMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },

  getMusicId(){
    return this.globalData.playingMusicId
  },

  // 获取和设置发布或者展示的资源类型（图片和视频）
  getResourceType(){
    return this.globalData.isBtnType
  },

  setResourceType(sign){
    this.globalData.isBtnType = sign
  },

   // 获取用户的openid并储存在storage中
   getOpenid(){
    wx.cloud.callFunction({
      name:"login"
    }).then((res)=>{
      let openid = res.result.openid
      let musicOpenid = openid + "loveList"
      this.globalData.openid = openid
      this.globalData.musicOpenid = musicOpenid

      // 将openid存储到storage中（用户最近播放列表）
      if (wx.getStorageSync(openid) == ''){
        wx.setStorageSync(openid, [])
      }

      // 用户我的喜爱歌曲列表
      if (wx.getStorageSync(musicOpenid) == ''){
        wx.setStorageSync(musicOpenid,[])
      }
    })
   }
})
