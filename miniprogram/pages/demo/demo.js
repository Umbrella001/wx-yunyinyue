// pages/demo/demo.js
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    demoData: ['wxml', 'wxss', 'json', 'js'],
    demoDataObj: [{
        id: 1,
        name: '诸葛亮'
      }, {
        id: 2,
        name: '刘备'
      },
      {
        id: 3,
        name: '曹操'
      },
      {
        id: 4,
        name: '关羽'
      },
    ]
  },
  sort() {
    const len = this.data.demoData.length;
    const that = this.data;
    for (let i = 0; i < len; i++) {
      let x = Math.floor(Math.random() * len);
      let y = Math.floor(Math.random() * len);
      let temp;
      temp = that.demoData[x];
      that.demoData[x] = that.demoData[y];
      that.demoData[y] = temp;
    }
    this.setData({
      demoData: that.demoData
    })
  },
  sortObj() {
    const len = this.data.demoDataObj.length;
    const that = this.data;
    for (let i = 0; i < len; i++) {
      let x = Math.floor(Math.random() * len);
      let y = Math.floor(Math.random() * len);
      let temp;
      temp = that.demoDataObj[x];
      that.demoDataObj[x] = that.demoDataObj[y];
      that.demoDataObj[y] = temp;
    }
    this.setData({
      demoDataObj: that.demoDataObj
    })
  },
  getMusicInfo(){
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data:{
        $url: 'music'
      }
    }).then((res)=>{
      console.log(res)
    })
  },
  getMovieInfo(){
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then((res) => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // let a = new Object({
    //   name: 'lisi',
    //   age: 4
    // })
    // console.log(a.name);
    // let b = new Array();
    // b = [
    //   '123',
    //   "123321"
    // ]
    // console.log(b[1]);
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      this.setData({
        openid: res.result.openid
      })
    })
    // setTimeout(()=>{
    //   console.log("1")
    //   setTimeout(()=>{
    //     console.log("2")
    //     setTimeout(()=>{
    //       console.log('3')
    //     },100)
    //   },1000)
    // },2000)
    // let p1 = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log('1');
    //     reject('p1');
    //   }, 2000)
    // })
    // let p2 = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log('2');
    //     reject('p2');
    //   }, 1000)
    // })
    // let p3 = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       console.log('3');
    //       resolve('p3');
    //     }, 3000)
    //   })
    // Promise.all([p1,p2,p3]).then((res) =>{
    //   console.log('全部完成',res);
    // }).catch((err)=>{
    //   console.log('失败',err);
    // })
    // Promise.race([p1, p2, p3]).then((res) => {
    //   console.log('完成', res);
    // }).catch((err) => {
    //   console.log('失败', err);
    // })
    this.fn();
  },
  async fn() {
    let res = await this.timeout();
  },
  timeout(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('resolved')
      }, 2000)
    }).then((res)=>{
      return 123
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})