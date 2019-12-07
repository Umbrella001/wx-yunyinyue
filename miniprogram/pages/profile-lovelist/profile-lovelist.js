const app = getApp()  // 获取全局app实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAnimation: false,  // 是否展示动画
    switchLove: false,  // 切换当前喜爱的是音乐还是博客，默认false为展示喜欢的音乐
    loveList: [],  // 喜欢的音乐列表
    blogList: [],  // 喜欢的博客
    // 我喜欢的列表背景图
    loveBackground: [
      "https://hbimg.huabanimg.com/993d028ad6989b2407b01080cf54c759184b824fa5a1a-WbjOas_fw658",
      "https://hbimg.huabanimg.com/d763efdfc1d79d78c1e254a467e6d59c51e0c8ff2373e-1FAEA0_fw658"
    ],
    displayImage: [
      "https://hbimg.huabanimg.com/d221d7cca731938b1fa0cfcd244d19a473788acf2b5563-9FWi58_fw658",
      "https://hbimg.huabanimg.com/25204574b2957fb92a09879590daefd2d3266fb17bd8-b0SShe_fw658"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyLovelist()
    this._getMyBloglist()
    this.setData({
      isShowAnimation: true
    })
  },

  // 切换展示的列表
  onSwitch(){
    this.setData({
      switchLove: !this.data.switchLove
    })
  },

  // 获取storage中的我喜爱的歌曲列表
  _getMyLovelist(){
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

  // 获取storage中的我的喜爱的博客列表
  _getMyBloglist(){
    let openid = app.globalData.blogOpenid
    let myBloglist = wx.getStorageSync(openid)
    this.setData({
      blogList: myBloglist
    })
  },

  // 跳转到详情页
  goComment(event) {
    let blogid = event.target.dataset.blogid
    wx.navigateTo({
      url: `../blog-comment/blog-comment?blogId=${blogid}`,
    })
  },
})