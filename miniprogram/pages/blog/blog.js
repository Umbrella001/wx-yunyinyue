let keyword = '' // 搜索的关键字

const LOAD_LIST_NUM = 10 // 每次请求的博客数量

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowPopup: false, // 是否显示授权底部弹窗，默认false不显示
    blogList: [], // 存放博客页面的博客列表数据
    isAuthorize: false // 是否授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._loadBlogList()
  },

  // 从数据库中载入数据
  _loadBlogList(start = 0) {
    wx.showLoading({
      title: '拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        start,
        keyword,
        count: LOAD_LIST_NUM
      }
    }).then((res) => {
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  // 点击发布按钮时，获取授权信息，如没有授权则弹窗
  onPublish() {
    if (!this.data.isAuthorize) {
      wx.showToast({
        title: '检测是否授权',
        mask: true,
        image: '../../images/music-author.png'
      })
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                isAuthorize: true
              })
              wx.hideToast()
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          wx.hideToast()
          this.setData({
            isShowPopup: true,
            isAuthorize: false
          })
        }
      }
    })
  },

  // 同意授权成功时，进行页面跳转 → 发布编辑页
  onLoginSuccess(event) {
    console.log(event)
    this.setData({
      isShowPopup: false
    })
    const detail = event.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?userName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },

  // 拒绝授权
  onLoginFail() {
    wx.showModal({
      title: '用户授权才可以发布博客噢 ',
      showCancel: false,
      confirmText: '回去授权',
      confirmColor: '#d81e06'
    })
  },

  // 点击博客卡片内容进入详情评论页
  goComment(event) {
    wx.navigateTo({
      url: '../blog-comment/blog-comment?blogId=' + event.target.dataset.blogid,
    })

  },
  // 执行数据库关键字查询
  goSearch(options) {
    keyword = options.detail.keyword
    this.setData({
      blogList: []
    })

    this._loadBlogList(0)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      blogList: []
    })
    this._loadBlogList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._loadBlogList(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(event) {
    let blogObj = event.target.dataset.blog
    console.log('laji', event, blogObj)
    return {
      title: blogObj.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`
    }
  }
})