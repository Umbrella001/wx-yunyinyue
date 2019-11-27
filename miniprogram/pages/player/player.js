let musiclist = [] // 歌单歌曲列表
let currentMusicIndex = 0 // 当前播放歌曲的索引

const backgroundAudioManager = wx.getBackgroundAudioManager() // 获取全局唯一的背景音频管理器
const app = getApp() // 获取全局app实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '', // 歌曲的封面图
    isPlaying: false, // 歌曲是否播放中，默认false没有播放
    isLyricShow: true, // 显示歌曲歌词，默认true不显示歌词
    lyric: '', // 歌曲歌词
    isSame: false, // 是否同一首歌 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    currentMusicIndex = options.index
    musiclist = wx.getStorageSync('musiclist') // 获取歌单歌曲
    this._loadMusicDetail(options.musicId)
  },

  // 加载歌曲的信息包括歌词 
  _loadMusicDetail(musicId) {
    if (musicId == app.getMusicId()) {
      this.setData({
        isSame: true
      })
    } else {
      this.setData({
        isSame: false
      })
    }

    let musicInfo = musiclist[currentMusicIndex]
    wx.setNavigationBarTitle({
      title: musicInfo.name
    })

    app.setMusicId(musicId)

    if (!this.data.isSame) {
      backgroundAudioManager.stop()
    }

    this.setData({
      picUrl: musicInfo.al.picUrl
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
      if (result.data[0].url == null) {
        wx.showToast({
          title: '此歌曲为VIP',
        })
        return
      }
      if (!this.data.isSame) {
        backgroundAudioManager.src = result.data[0].url
        backgroundAudioManager.title = musicInfo.name
        backgroundAudioManager.coverImgUrl = musicInfo.al.picUrl
        backgroundAudioManager.singer = musicInfo.ar[0].name
        backgroundAudioManager.epname = musicInfo.ar.name

        //  将播放的歌曲放入最近播放storage中
        this.historyMusic()
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
        let lyric = '暂无歌词'
        let lrc = JSON.parse(res.result).lrc
        lrc = lrc ? lrc.lyric : lyric
        this.setData({
          lyric: lrc
        })
      })
    })
  },

  // 将播放历史储存进对应的storage中
  historyMusic(){
    let music = musiclist[currentMusicIndex],
    openid = app.globalData.openid

    let historyList = wx.getStorageSync(openid),
    ishave = false

    console.log('1231', Object.prototype.toString.call(wx.getStorageSync(openid)), historyList.length) 

    for(let i = 0,len = historyList.length;i < len;i++){
      console.log(i);
      if(historyList[i].id == music.id){
        ishave = true
        break
      }
    }
    if (!ishave) {
      historyList.unshift(music)
      wx.setStorage({
        key: openid,
        data: historyList,
      })
    }
  },

  // 点击播放按钮切换播放和暂停 
  togglePlaying() {
    this.data.isPlaying ? backgroundAudioManager.pause() : backgroundAudioManager.play()

    this.setData({
      isPlaying: !this.data.isPlaying
    })

  },

  // 点击播放上一首和下一首歌曲
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

  // 切换歌词显示与否
  lyricShowChange() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },

  // 重新载入歌曲获取总时间 -- 修复BUG
  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.playingTime)
  },

  // 歌曲后台面板的播放与暂停
  onPlay() {
    this.setData({
      isPlaying: true
    })
  },

  onPause() {
    this.setData({
      isPlaying: false
    })
  }
})