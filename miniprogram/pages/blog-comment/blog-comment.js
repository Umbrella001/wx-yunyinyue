import formatTime from '../../utils/format-time.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: {}, // 博文
    blogid: '', // 博客id
    blogComment: [], // 博伦
    isSupport: false, // 评论是否支持
    isOppose: false, //  评论是否反对
    supportNum: 665,  // 虚拟点赞量
    opposeNum: 43  // 虚拟踩量
  },

  onLoad: function(options) {
    
    this.setData({
      blogid: options.blogId
    })
    this._loadBlogComment()
  },

//  获取博客内容 + 博客评论列表
  _loadBlogComment() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "blog",
      data: {
        blogid: this.data.blogid,
        $url: "detail"
      }
    }).then((res) => {
      console.log(res)
      wx.hideLoading()
      let blogComment = res.result.commentList.data
      for (let i = 0, len = blogComment.length; i < len; i++) {
        blogComment[i].commentTime = formatTime(blogComment[i].commentTime)
      }
      this.setData({
        blog: res.result.blogDetail[0],
        blogComment
      })
    }).catch((err)=>{
      console.log(err)
    })
  },

  // 博客评论的点赞和踩逻辑
  support() {
    wx.showToast({
      title: '点赞和踩模式即将上线',
      duration: 2000,
      image: '../../images/show-tip.png',
      complete(){
        wx.hideToast()
      }
    })
    if (this.data.isOppose) {
      this.setData({
        opposeNum: this.data.opposeNum - 1
      })
    }
    this.setData({
      isSupport: !this.data.isSupport,
      isOppose: false,
      supportNum: this.data.isSupport ? this.data.supportNum - 1 : this.data.supportNum + 1,
    })
  },
  oppose() {
    if (this.data.isSupport){
      this.setData({
        supportNum: this.data.supportNum - 1
      })
    }
    this.setData({
      isOppose: !this.data.isOppose,
      isSupport: false,
      opposeNum: this.data.isOppose ? this.data.opposeNum - 1 : this.data.opposeNum + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(event) {
    let blogObj = this.data.blog
    return {
      title: blogObj.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`
    }
  }
})