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

    this.getPlaylist()  // 首次启动自动调用一次歌单爬取

    this.getOpenid()   // 获取用户openid

    this.checkUpdate() // 检测版本更新

    this.globalData = {
      playingMusicId: -1,  // 播放歌曲的搜索
      isBtnType: 0,  // 图片或者视频
      openid: '',  //  用户的openid （用户使用同一个小程序openid不变）
      musicOpenid: '' ,  // 用户喜欢歌曲列表openid
      blogOpenid: '',  // 用户喜欢的博客列表openid
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

  // 修复：启动小程序自动加载爬取小程序歌曲数据
  getPlaylist(){
    wx.cloud.callFunction({
      name: "getPlaylist"
    }).then((res) => {
      console.log("新增歌单：",res.result)
    })
  },

   // 获取用户的openid并储存在storage中
   getOpenid(){
    wx.cloud.callFunction({
      name:"login"
    }).then((res)=>{
      let openid = res.result.openid
      let musicOpenid = openid + "loveList"
      let blogOpenid = openid + "blogList"

      this.globalData.openid = openid
      this.globalData.musicOpenid = musicOpenid
      this.globalData.blogOpenid = blogOpenid

      // 将openid存储到storage中（用户最近播放列表）
      if (wx.getStorageSync(openid) == ''){
        wx.setStorageSync(openid, [])
      }

      // 用户我的喜爱歌曲列表
      if (wx.getStorageSync(musicOpenid) == ''){
        wx.setStorageSync(musicOpenid,[])
      }

      // 用户我的喜欢博客列表
      if (wx.getStorageSync(blogOpenid) == '') {
        wx.setStorageSync(blogOpenid, [])
      }

    })
   },

  // 冷启动时检查一次更新状态
 checkUpdate(){
   const updateManager = wx.getUpdateManager()

   updateManager.onCheckForUpdate((res) => {
     // 检测是否
     if(res.hasUpdate){
       updateManager.onUpdateReady(()=>{
         wx.showModal({
           title: '更新提示',
           content: '新版本已经准备好，是否重启应用？',
           confirmText: '立即体验',
           confirmColor: '#d81e06',
           cancelColor: '#a0a0a0',
           success: (res) => {
            if(res.coonfirm){
              updateManager.applyUpdate()
            }else{
              wx.showModal({
                title: '温馨提示',
                content: '建议使用新版本,体验更丰富的功能噢 ',
                confirmText: '体验一下',
                confirmColor: '#d81e06',
                cancelText: '下次再说',
                cancelColor: '#a0a0a0',
                success: (res) =>{
                  if(res.confirm){
                    updateManager.applyUpdate()
                  }
                }
              })
            }
           }
         })
       })
     }
   })
 }
})
