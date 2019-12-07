const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 关闭组件样式隔离
   */
  options: {
    styleIsolation: 'apply-shared'
  },

  pageLifetimes:{
    show(){
      this.setData({
        isShow: app.globalData.showGlobalMusic,
        isShowAnimation: app.globalData.showAnimation,
        musicInfo: app.globalData.globalMusicInfo
      })
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isShowAnimation: false,
    musicInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPlayer(){
      let musicId = this.data.musicInfo.musicId,
        musicIndex = this.data.musicInfo.musicIndex
        console.log("测试14",musicId,musicIndex)
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicId}&index=${musicIndex}`,
      })
    }
  }
})
