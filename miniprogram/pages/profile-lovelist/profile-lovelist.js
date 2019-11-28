const app = getApp()  // 获取全局app实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loveList: []  // 喜欢的音乐列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyLovelist()
  },

  // 获取storage中的我喜爱的歌曲列表
  _getMyLovelist(){
    console.log('111')
    let openid = app.globalData.musicOpenid
    let myLovelist = wx.getStorageSync(openid)
    wx.setStorage({
      key: "musiclist",
      data: myLovelist,
    })
    this.setData({
      loveList: myLovelist
    })
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
    this._getMyLovelist()
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