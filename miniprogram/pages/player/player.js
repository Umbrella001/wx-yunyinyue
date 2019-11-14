// pages/player/player.js

let musiclist = []
let currentMusicIndex = 0
// 获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false,
    isLyricShow: true,
    lyric: '',
    isSame: false,  // 是否同一首歌 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    currentMusicIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },

  _loadMusicDetail(musicId) {
    if(musicId == app.getMusicId()){
      this.setData({
        isSame: true
      })
    }else{
      this.setData({
        isSame: false
      })
    }
    if(!this.data.isSame){
      backgroundAudioManager.stop()
    } 
    let musicInfo = musiclist[currentMusicIndex]
    wx.setNavigationBarTitle({
      title: musicInfo.name
    })

    app.setMusicId(musicId)

    this.setData({
      picUrl: musicInfo.al.picUrl,
      isPlaying: false
    })

    wx.showLoading({
      title: '歌曲载入中',
    })

    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl'
      }
    }).then((res) => {
      let result = JSON.parse(res.result)
      if (!this.data.isSame) {
        backgroundAudioManager.src = result.data[0].url
        backgroundAudioManager.title = musicInfo.name
        backgroundAudioManager.coverImgUrl = musicInfo.al.picUrl
        backgroundAudioManager.singer = musicInfo.ar[0].name
        backgroundAudioManager.epname = musicInfo.ar.name
      } 
     
      this.setData({
        isPlaying: true
      })

      wx.hideLoading()

      // 加载歌词
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric'
        }
      }).then((res) => {
        console.log(res)
        let lyric = '暂无歌词'
        let lrc = JSON.parse(res.result).lrc
        lrc = lrc ? lrc.lyric : lyric
          this.setData({
            lyric: lrc
          })
      })
    })
  },

  togglePlaying() {
    this.data.isPlaying ? backgroundAudioManager.pause() : backgroundAudioManager.play()

    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  prevMusic() {
    currentMusicIndex--
    currentMusicIndex = currentMusicIndex < 0 ? musiclist.length - 1 : currentMusicIndex
    this._loadMusicDetail(musiclist[currentMusicIndex].id)
  },

  nextMusic() {
    currentMusicIndex++
    currentMusicIndex = currentMusicIndex > musiclist.length - 1 ? 0 : currentMusicIndex
    this._loadMusicDetail(musiclist[currentMusicIndex].id)
  },

  lyricShowChange() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },

  timeUpdate(event){
    this.selectComponent('.lyric').update(event.detail.playingTime)
  },

  onPlay(){
    this.setData({
      isPlaying: true
    })
  },

  onPause(){
    this.setData({
      isPlaying: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})