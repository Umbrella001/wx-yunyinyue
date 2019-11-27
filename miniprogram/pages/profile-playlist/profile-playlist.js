
const app = getApp()  //  获取全局app实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTip: false, // 是否展示提示
    musicList: []  // 最近播放的歌曲列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = app.globalData.openid
    let historyMusic = wx.getStorageSync(openid)
    if(historyMusic.length == 0){
      this.setData({
        isShowTip: true
      })
    }else{
      // 让歌曲列表循环于最近的播放列表historyMusic
      wx.setStorage({
        key: "musiclist" ,
        data: historyMusic,
      })
      this.setData({
        musicList: historyMusic
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})