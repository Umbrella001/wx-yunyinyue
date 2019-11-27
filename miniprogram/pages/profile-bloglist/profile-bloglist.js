const MAX_LIMIT_NUM = 10  // 博客展示数量

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloglist: []
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
      title: '界面加载中',
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
  onShareAppMessage: function () {
    const blog = event.target.dataset.blog
    return{
      title: blog.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blog._id}`
    }
  }
})