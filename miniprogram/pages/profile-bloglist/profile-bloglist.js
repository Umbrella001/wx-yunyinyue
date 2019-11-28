const MAX_LIMIT_NUM = 10  // 博客展示数量

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloglist: [],
    shareImage: [
      "https://hbimg.huabanimg.com/14566753b582c22b5f91aba9dbe01f96752478c681fb7-vxd392_fw658",
      "https://hbimg.huabanimg.com/cec54a69e0d0a9b584462a5de1b05958169a81b59a6df-Kq0XDM_fw658",
      "https://hbimg.huabanimg.com/0a172cfb1e004412ed300af65a330da2d001f043ea653-RvO3or_fw658",
      "https://hbimg.huabanimg.com/2cbadce412029b8fb0bce887a0d7d35f958f2d7eb8d38-6sJIyx_fw658",
      "https://hbimg.huabanimg.com/2e33d3985ff04c24039a96e858377d1a945f23b0bcb4a-KsIJEa_fw658",
      "https://hbimg.huabanimg.com/bbaf1dab3139c58fd5b6c2985e2e3e8f9b876d588b4b4-cxA9GI_fw658"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyBloglist()
  },
  // 调用云函数获取我发布的博客
  getMyBloglist() {
    wx.showLoading({
      title: '博客加载中',
    })
    wx.cloud.callFunction({
      name: "blog",
      data: {
        $url: "getMyBloglist",
        start: this.data.bloglist.length,
        count: MAX_LIMIT_NUM
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        bloglist: this.data.bloglist.concat(res.result.data)
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
  },

  goComment(event){
    let blogid = event.target.dataset.blogid
    wx.navigateTo({
      url: `../blog-comment/blog-comment?blogId=${blogid}`,
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
    this.getMyBloglist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    const blog = event.target.dataset.blog
    const len = this.data.shareImage.length
    let random = Math.floor(Math.random()*len)
    return{
      title: blog.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blog._id}`,
      imageUrl: this.data.shareImage[random]
    }
  }
})