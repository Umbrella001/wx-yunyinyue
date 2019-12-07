let userInfo = {} // 存储用户信息

let textareaContent = ''  // 用户评价内容

const db = wx.cloud.database()  // 初始化数据库

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: Object,  // 博客信息
    blogid: String,   // 评论的博客id
    blogower: String  // 评论的博客主
  },

  externalClasses: ['iconfont', 'icon-pinglun','icon-fenxiang'],

  /**
   * 组件的初始数据
   */
  data: {
    content: '',  // 评论输入框的值
    isShowPopup: false,   // 是否显示底部授权弹窗，默认false不显示
    isShowComment: false, // 是否显示底部评论框，默认false不显示
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(){
      // 点击评论时判断是否授权
      wx.getSetting({
        success:(res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success: (res) =>{
                userInfo = res.userInfo
                // 显示评论插槽
                console.log('userInfo', userInfo)
                this.setData({
                  isShowComment: true
                })
              }
            })
          }else{
            this.setData({
              isShowPopup: true
            })
          }
        }
      })
    },
    // 用户点击评论后确认授权成功
    loginSuccess(event){
      console.log('测试授权',event)
      userInfo = event.detail
      this.setData({
        isShowPopup: false
      }, () => {
          this.setData({
            isShowComment: true
      })
      })
    },

    // 用户拒绝授权
    loginFail(){
      wx.showModal({
        title: '用户授权才可以评论噢 ',
        showCancel: false,
        confirmText: '回去授权',
        confirmColor: '#d81e06'
      })
    },

    // 发布评论 -- 增加评论字段
    send(event){
      console.log(event)
      let formId = event.detail.formId  // 用于发送模板消息formId
      textareaContent = event.detail.value.content
     

      // 评论为空时提示
      if (textareaContent.trim() == ''){
        wx.showModal({
          title: '评论提醒',
          content: '评论的内容不能为空噢',
          confirmText: '我知道了',
          showCancel: false,
          confirmColor: '#d81e06'
        })
        return
      }

      // 向数据库增加对应评论所需字段
      wx.showLoading({
        title: '评论中...',
        mask: true
      })

      console.log('blogid',this.properties.blogid)

      db.collection('blog-comment').add({
        data:{
          blogid: this.properties.blogid,
          content: textareaContent,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          commentTime: db.serverDate()
        }
      }).then((res) => {
        wx.cloud.callFunction({
          name: "commentPush",
          data:{
            formId,
            blogId: this.properties.blogid,
            blogOwer: this.properties.blogower,
            content: textareaContent
          }
        }).then((res) => {
          console.log(res)
        })

        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
          mask: true,
          image: '../../images/show-success.png'
        })
        this.setData({
          content: '',
          isShowComment: false
        })

        this.triggerEvent('RefreshComment')
      }).catch((err) => {
        wx.hideLoading()
        wx.showToast({
          title:`发布失败: ${err}`,
          image: '../../images/show-fail.png'
        })
      })
    }
  }
})
