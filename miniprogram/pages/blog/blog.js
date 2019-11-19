Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowPopup: false, // 是否显示授权底部弹窗，默认false不显示
  },

  // 点击发布按钮时，获取授权信息，如没有授权则弹窗
  onPublish() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:(res) =>  {
              console.log(res)
              this.onLoginSuccess({
                detail: res.userInfo 
              })
            }
          })
        } else {
          this.setData({
            isShowPopup: true
          })
        }
      }
    })
  },

  // 同意授权成功时，进行页面跳转 → 发布编辑页
  onLoginSuccess(event){
    console.log(event)
    const detail = event.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?userName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },

  // 拒绝授权
  onLoginFail(){
    wx.showModal({
      title: '用户授权才可以发布博客噢 ',
      showCancel: false,
      confirmText: '回去授权',
      confirmColor: '#d81e06'
    })
  }
})