let keyword = '' // 搜索的关键字
let isAuthorize = false // 是否授权

const LOAD_LIST_NUM = 10 // 每次请求的博客数量

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowPopup: false, // 是否显示授权底部弹窗，默认false不显示
    blogList: [], // 存放博客页面的博客列表数据
    loveBloglist: [],   // 我喜欢的博客

    blogShareImg: [    "https://hbimg.huabanimg.com/0f2e924f9f24b483a6d31ee780208a20306f2a3a11750-rFPrzG_fw658",
    "https://hbimg.huabanimg.com/0b95640080a36c0990a811f0f74efb98cb9b512652fc4-6gkC2J_fw658",
    "https://hbimg.huabanimg.com/05f503e79e197232ac0675f4639cd7459ab4b327bdf37-3HoX31_fw658",
    "https://hbimg.huabanimg.com/00ae5f42556f724d5a13aa235d106ed4bf509ced4c75e-xSp6Wk_fw658",
    "https://hbimg.huabanimg.com/1e0006a7fe87dd2a5bc229b791c1578a56976c98e4f8c-yPYjCH_fw658",
    "https://hbimg.huabanimg.com/50e9edef431897c9326f852c4ace4be02c2011a815ecd7-3y7BhI_fw658"
    ]
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
      mask: true
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
    if (!isAuthorize) {
      wx.showToast({
        title: '检测是否授权',
        mask: true,
        image: '../../images/music-author.png',
        complete() {
          wx.hideToast()
        }
      })
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              isAuthorize = true
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
          })
          isAuthorize =  false
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
    const len = this.data.blogShareImg.length;
    let random = Math.floor(Math.random()*len)
    return {
      title: blogObj.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
      imageUrl: this.data.blogShareImg[random]
    }
  }
})