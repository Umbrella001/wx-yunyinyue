import formatTime from './../../utils/format-time.js'

const app = getApp()

let blogOpenid = "" // 我喜欢的博客openid
let dataset = {} // 自定义属性值
let myLoveBloglist = [] // 定义一个临时我的喜爱博客数组列表
let tempLoveList = [] // 临时存放storage中我喜爱的博客列表
let loveBlog = {} // 临时存放当前博客信息

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: Object,
    blogid: {
      type: String,
      value: ""
    }
  },

  data: {
    playing: false, // 视频是否自动播放
    isLove: false, // 是否喜欢，默认false不喜欢
    _publishTime: '', // 格式化后的时间
    _loveNum: 0, // 博客初始化爱心数量
    loveBloglist: [], // 用户喜欢的博客列表
    blogInfo: {} // 修复Bug的博客信息（进入博客评论页时）
  },

  options: {
    styleIsolation: 'apply-shared'
  },

  lifetimes:{
    ready(){
      console.log("ready")
      this._getBlogInfo()
    }
  },

  pageLifetimes: {
    show() {
      console.log("show")
      this._getBlogInfo()
    }
  },
  /**
   * 数据监听器 observers
   */
  observers: {
    ['blog.publishTime'](val) {
      if (val) {
        this.setData({
          _publishTime: formatTime(val, 'yy-MM-dd ww | zz hh:mm')
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    onPreviewImg(event) {
      dataset = event.target.dataset
      wx.previewImage({
        urls: dataset.images,
        current: dataset.imgsrc
      })
    },

    // 播放视频
    onPlaying() {
      // 获取video实例
      let videoContext = wx.createVideoContext('blogVideo', this)

      if (!this.data.playing) {
        videoContext.play() //开始播放
        videoContext.requestFullScreen() // 进入全屏
        videoContext.seek(0)
        this.setData({
          playing: true
        })
      } else {
        videoContext.pause() //暂停播放
        videoContext.exitFullScreen() // 进入全屏
        videoContext.stop()
        this.setData({
          playing: false
        })
      }
    },

    // 通过id拿到对应的blog信息内容（修复进入评论页没有爱心数据的BUG）
    _getBlogInfo() {
      let _blogid = this.properties.blogid || this.properties.blog._id
      wx.cloud.callFunction({
        name: 'blog',
        data: {
          $url: "detail",
          blogid: _blogid
        }
      }).then((res) => {
        this.setData({
          blogInfo: res.result.blogDetail[0]
        })
        this._getLoveBloglist()

        for (let i = 0, len = this.data.loveBloglist. length; i < len; i++) {
          if (this.data.blogInfo._id == this.data.loveBloglist[i]._id) {
            this.setData({
              isLove: true
            })
            break
          } else {
            this.setData({
              isLove: false
            })
          }
        }
        this.setData({
          _loveNum: this.data.blogInfo.loveNum
        })
        // 获取展示视频的控件进行暂停视频
        if (this.data.blogInfo.publishType == 1) {
          let videoReady = wx.createVideoContext('blogVideo')
          videoReady.pause()
          videoReady.stop()
        }
      })
    },

    // 向storage拿去用户喜爱的博客列表
    _getLoveBloglist() {
      blogOpenid = app.globalData.blogOpenid
      const loveBloglist = wx.getStorageSync(blogOpenid)
      this.setData({
        loveBloglist: loveBloglist
      })
    },

    // 点击博客卡片的爱心时进行的操作逻辑
    support() {
      this._getLoveBloglist()
      tempLoveList = this.data.loveBloglist
      loveBlog = this.data.blogInfo

      if (this.data.isLove) {
        this.setData({
          _loveNum: this.data._loveNum - 1
        })

        // 设置blogOpenid的storage数据（删）
        for (let i = 0, len = tempLoveList.length; i < len; i++) {
          if (loveBlog._id == tempLoveList[i]._id) {
            tempLoveList.splice(i, 1)
            break
          }
        }
        wx.setStorageSync(blogOpenid, tempLoveList)

        // 向数据库更新数据 (减)
        wx.cloud.callFunction({
          name: "blog",
          data: {
            $url: "reduceLove",
            currentBlogid: loveBlog._id
          }
        })
      } else {
        this.setData({
          _loveNum: this.data._loveNum + 1
        })

        // 设置blogOpenid的storage数据（增）
        tempLoveList.unshift(loveBlog)
        wx.setStorageSync(blogOpenid, tempLoveList)

        // 向数据库更新数据 (增)
        wx.cloud.callFunction({
          name: "blog",
          data: {
            $url: "incLove",
            currentBlogid: loveBlog._id
          }
        })
      }
      this.setData({
        isLove: !this.data.isLove
      })
    }
  }
})