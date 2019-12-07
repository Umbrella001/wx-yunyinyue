let movableAreaWidth = 0, // 歌曲播放进度条宽度
  movableViewWidth = 0, // 歌曲圆点宽度
  playingTime = 0, // 当前播放的进度时间
  signTime = '-1',  // 当前歌曲播放的分（分钟）
  playingSec, // 获取歌曲播放的分（分钟）
  duration = 0,  // 储存歌曲总时长
  isMoving = false // 判断用户是否正在拖动进度条，是则不设置值（此时音视频不播放），否时则说明没有拖动
const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSame: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    }, // 歌曲播放时间和总时间初始值
    movableDis: 0, // 进度条上圆点的移动距离
    progress: 0, // 歌曲播放的进程
    isMoving: false // 用户是否拖拽进度条圆点
  },

  lifetimes: {
    ready() {
      if (this.properties.isSame && this.data.showTime['totalTime'] == '00:00') {
        this._durationTime()
        this._setProgress()
      }
      this._getMovableDis()
      this._bindBGMEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 用户拖拽圆点
    onChange(event) {
      if (event.detail.source == 'touch') {
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.movableDis = event.detail.x
        console.log('touching')
        this.setData({
          progress: this.data.progress,
          movableDis: this.data.movableDis,
          isMoving: true
        })
      }
    },

    // 用户停止拖拽（松开进度条圆点）
    onTouchEnd() {
      let currentTimeTem = this._formatTime(backgroundAudioManager.currentTime)
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        isMoving: false,
        ['showTime.currentTime']: currentTimeTem.min + ":" + currentTimeTem.sec
      })
      backgroundAudioManager.seek(this.data.progress * duration / 100)
    },

    // 获取当前设备最后得到的进度条及其进度条圆点的尺寸
    _getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
        console.log(movableAreaWidth, movableViewWidth)
      })
    },

    // 监听背景音频播放事件
    _bindBGMEvent() {
      backgroundAudioManager.onPlay(() => {      
        console.log('onPlay')

        this.setData({
          isMoving: false
        })
        this.triggerEvent('musicPlay')
      })

      // 监听背景音频停止事件
      backgroundAudioManager.onStop(() => {
        console.log('onStop')
      })

      // 监听背景音频暂停事件
      backgroundAudioManager.onPause(() => {
        console.log('onPause')

        app.setPlaying(false)
        this.triggerEvent('musicPause')
      })

      // 监听背景音频加载中事件
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      })

      // 监听背景音频进入可播放状态事件
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay')
        if (typeof backgroundAudioManager.duration !== 'undefined') {
          this._durationTime()
        } else {
          setTimeout(() => {
            this._durationTime()
          }, 1000)
        }
      })

      // 监听背景音频播放进度更新事件
      backgroundAudioManager.onTimeUpdate(() => {
        if (!this.data.isMoving) {
          console.log('onTimeUpdate')
          playingTime = backgroundAudioManager.currentTime

          this._formatTime(playingTime)
          playingSec = playingTime.toString().split('.')[0]

          if (playingSec !== signTime) {
            this._setProgress()

            // 联动歌词
            this.triggerEvent('timeUpdate', {
              playingTime
            })
          }
        }
      })

      // 监听背景音频自然播放结束事件
      backgroundAudioManager.onEnded(() => {
        console.log('onEnded')
        this.triggerEvent('musicEnd')
      })

      // 监听背景音频播放错误事件
      backgroundAudioManager.onError((res) => {
        console.error('onError', res.errMag)
        console.error('onError', res.errCode)
        wx.showToast({
          title: '错误：' + res.errCode,
          icon: 'loading'
        })
      })
    },

  //  设置进度条播放进度
    _setProgress() {
      this.setData({
        movableDis: (movableAreaWidth - movableViewWidth) * playingTime / duration,
        progress: playingTime / duration * 100,
        ['showTime.currentTime']: `${this._formatTime(playingTime).min}:${this._formatTime(playingTime).sec}`
      })
      signTime = playingSec
    },

    // 重新载入歌曲时获取总时间
    _durationTime() {
      duration = backgroundAudioManager.duration
      this.setData({
        ['showTime.totalTime']: `${this._formatTime(duration).min}:${this._formatTime(duration).sec}`
      })
    },

    // 格式化时间
    _formatTime(times) {
      let min = Math.floor(times / 60)
      let sec = Math.floor(times % 60)

      return {
        min: this._parseZero(min),
        sec: this._parseZero(sec)
      }
    },

    // 歌词时间（分）补零
    _parseZero(time) {
      return time = time < 10 ? '0' + time : time
    }
  }
})