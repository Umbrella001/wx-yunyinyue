let musiclist = [] // 歌单歌曲列表
let currentMusicIndex = 0 // 当前播放歌曲的索引
let globalMusicList = [] // 存储全局的歌单歌曲列表

const backgroundAudioManager = wx.getBackgroundAudioManager() // 获取全局唯一的背景音频管理器
const app = getApp() // 获取全局app实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '', // 歌曲的封面图
    musicName: '', // 歌曲名字
    isPlaying: false, // 歌曲是否播放中，默认false没有播放
    isLyricShow: true, // 显示歌曲歌词，默认true不显示歌词
    selected: false, // 是否喜欢当前歌曲
    lyric: '', // 歌曲歌词
    isSame: false, // 是否同一首歌 
    loveList: [] // 我喜欢的歌曲列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    currentMusicIndex = options.index
    console.log(app.globalData.isPlaying)
    this.setData({
      isPlaying: app.globalData.isPlaying
    })
    this._loadMusicDetail(options.musicId)
    this.isHaveMusic()
  },

  // 判断当前歌曲是否存在于我喜欢列表
  isHaveMusic() {
    let storageLovelist = wx.getStorageSync(app.globalData.musicOpenid) // 获取储存的歌单列表
    this.setData({
      loveList: storageLovelist
    })
    for (let i = 0, len = storageLovelist.length; i < len; i++) {
      if (storageLovelist[i].id == musiclist[currentMusicIndex].id) {
        this.setData({
          selected: true
        })
        break
      } else {
        this.setData({
          selected: false
        })
      }
    }
  },

  // 加载歌曲的信息包括歌词 
  _loadMusicDetail(musicId) {

    if (musicId == app.getMusicId()) {
      this.setData({
        isSame: true
      })
    } else {
      // 拿去全局的歌曲列表，将歌单所有歌曲信息储存在Storage
      globalMusicList = app.globalData.musicList
      wx.setStorageSync('musiclist', globalMusicList)

      // 获取歌单歌曲
      musiclist = wx.getStorageSync('musiclist') 
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
      picUrl: musicInfo.al.picUrl,
      musicName: musicInfo.name
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
          image: "../../images/music-vip.png",
          duration: 2500
        })
        setTimeout(() => {
          this.nextMusic()
        }, 2000)
        return
      }
      if (!this.data.isSame) {
        backgroundAudioManager.src = result.data[0].url
        backgroundAudioManager.title = musicInfo.name
        backgroundAudioManager.coverImgUrl = musicInfo.al.picUrl
        backgroundAudioManager.singer = musicInfo.ar[0].name
        backgroundAudioManager.epname = musicInfo.ar.name

        this.setData({
          isPlaying: true
        })

        //  将播放的歌曲放入最近播放storage中
        this.historyMusic()
        app.setMusicInfo({
          musicId: musicInfo.id,
          musicIndex: currentMusicIndex
        })
        app.setGlobalMusic(true)
        app.setMusicAnimation(true)
      }

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
  historyMusic() {
    let music = musiclist[currentMusicIndex],
      openid = app.globalData.openid

    let historyList = wx.getStorageSync(openid),
      ishave = false

    for (let i = 0, len = historyList.length; i < len; i++) {
      if (historyList[i].id == music.id) {
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
    console.log("xxx",this.data.isPlaying)

    this.data.isPlaying  ? backgroundAudioManager.pause() : backgroundAudioManager.play()

    if (this.data.isPlaying) {
      app.setMusicAnimation(true)
    } else {
      app.setMusicAnimation(false)
    }

    this.setData({
      isPlaying: !this.data.isPlaying
    })

  },

  // 点击播放上一首和下一首歌曲
  prevMusic() {
    currentMusicIndex--
    currentMusicIndex = currentMusicIndex < 0 ? musiclist.length - 1 : currentMusicIndex
    this.isHaveMusic()
    this._loadMusicDetail(musiclist[currentMusicIndex].id)
  },

  nextMusic() {
    currentMusicIndex++
    currentMusicIndex = currentMusicIndex > musiclist.length - 1 ? 0 : currentMusicIndex
    this.isHaveMusic()
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
    app.setPlaying(true)
    app.setMusicAnimation(true)
  },

  onPause() {
    this.setData({
      isPlaying: false
    })
    app.setPlaying(false)
    app.setMusicAnimation(false)
  },

  // 是否将歌曲加入我的喜爱列表
  onSelect() {
    let newLovelist = []
    if (!this.data.selected) {
      newLovelist = this.data.loveList.unshift(musiclist[currentMusicIndex])
    } else {
      let delMusicId = musiclist[currentMusicIndex].id
      for (let i = 0, len = this.data.loveList.length; i < len; i++) {
        if (this.data.loveList[i].id == delMusicId) {
          let prom = this.data.loveList.splice(i, 1)
          break
        }
      }
    }
    this.setData({
      selected: !this.data.selected
    })

    if (this.data.selected) {
      wx.showToast({
        title: '添加到我的喜爱',
        image: '../../images/show-success.png',
        duration: 2000
      })
    }

    wx.setStorageSync(app.globalData.musicOpenid, this.data.loveList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(event) {
    console.log(event)
    let music = event.target.dataset
    return {
      title: '快来听听这首 >> ' + music.musicname,
      path: `/pages/player/player?musicId=${musiclist[currentMusicIndex].id}&index=${currentMusicIndex}`,
      imageUrl: music.shareimg
    }
  }
})