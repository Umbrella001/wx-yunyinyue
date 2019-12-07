// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeImg: '', // 云储存的二维码地址
    showQrcode: false,  // 是否显示二维码的弹窗，默认false不显示
    shareImage: [  "https://hbimg.huabanimg.com/88a771fff284bc037eb709c3902747f9bd20fc22e6d4-cbbzJu_fw658",
      "https://hbimg.huabanimg.com/ae0c42acc468194648df5bba2234358615b7fe641d467-x3IjRC_fw658",
      "https://hbimg.huabanimg.com/f104639dd5039e60280210c20d9d03dfdaa882376ab76-fr8dTt_fw658",
      "https://hbimg.huabanimg.com/e4c13767d45734890cd6620c33f9750279f5350f11df38-Nh6CoB_fw658",
      "https://hbimg.huabanimg.com/b40d0e46b97346c48415090e65a1335457cc99e117ae99-SffjYE_fw658"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 生成小程序码
  getQrCode(){
    wx.showLoading({
      title: '生成中...',
    })
    wx.cloud.callFunction({
      name: "getQrCode"
    }).then((res) => {
      console.log(res)
      this.setData({
        qrcodeImg: res.result,
        showQrcode: true
      })
      wx.hideLoading()
    })
  },

  // 关闭二维码弹窗
  closePopup(){
    this.setData({
      showQrcode: false
    })
  },

  // 预览二维码图片
  previewImage(){
    wx.previewImage({
      urls: [this.data.qrcodeImg]
    })
  },

  // 触发图片预览，并且长按可保存
  onLoadImage(){
    this.previewImage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const len = this.data.shareImage.length;
    let random = Math.floor(Math.random() * len)
    return{
      title: "快来体验音乐的世界 >>",
      path: "/pages/music/music",
      imageUrl: this.data.shareImage[random]
    }
  }
})