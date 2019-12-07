const MAX_LIMIT = 15  // 歌单每次请求的最大量

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: [{
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      }
    ],   // 轮播图
    playlist: [],  // 歌单列表
  },

  /**
   * 生命周期函数--监听页面加载--首次加载获取第一页歌单列表
   */
  onLoad: function(options) {
    this._getplaylist();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作--下拉重新请求
   */
  onPullDownRefresh: function() {
    this.setData({
      playlist: []
    })
    this._getplaylist();
  },

  /**
   * 页面上拉触底事件的处理函数--加载更多歌单
   */
  onReachBottom: function() {
    this._getplaylist();
  },

  // 向云服务请求获取歌单列表
  _getplaylist(){
    wx.showLoading({
      title: '歌单加载中...',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url:'playlist'
      }
    }).then((res) => {
      console.log(res.result)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  }
})