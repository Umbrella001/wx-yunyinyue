let lyricAndTime = [],  // 每条歌词的播放时间及其歌词
  lyricHeight = 0  // 歌词的初始高度
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: {
      type: Boolean,
      value: false
    },
    lyric: String
  },

// 监听歌词的展示形式 -- 修复BUG -- 没有歌词
  observers: {
    lyric(lrc) {
      // console.log(lrc)
      if (lrc == '暂无歌词'){
        this.setData({
          lyricInfo:[
            {
              lrc,
              timeSec : 0
            }
          ],
          playingLyricIndex: -1
        })
      }else{
        this._parseLyric(lrc)
      }
      
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lyricInfo: [],  // 歌词信息
    playingLyricIndex: 0, // 歌曲高亮的索引
    scrollTop: 0, // 歌曲滚动的高度
  },

  /**
   * 组件的生命周期
   */

  lifetimes: {
    // 获取设备的攻读计算rpx -- 用于高度的移动动画
    ready() {
      wx.getSystemInfo({
        success: function(res) {
          lyricHeight = res.screenWidth / 750 * 64
        },
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 随音乐的播放改变已播放时间和歌词移动的高度
    update(playingTime) {
      let lyricTime = this.data.lyricInfo
      if (lyricTime.length == 0) {
        return
      }
      if (playingTime > lyricTime[lyricTime.length -1].timeSec){
        this.setData({
          playingLyricIndex: lyricTime.length -1,
          scrollTop: lyricTime.length * lyricHeight
        })
      }
      for (let i = 0, len = lyricTime.length; i < len; i++) {
        if (playingTime <= lyricTime[i].timeSec) {
          this.setData({
            playingLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },
    // 处理传入的歌词格式，并添加到新数组
    _parseLyric(sLyric) {
      let line = sLyric.split('\n')
      line.forEach((item) => {
        let time = item.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          let lrc = item.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          let timeSec = parseInt(timeReg[1] * 60) + parseInt(timeReg[2]) + Number(timeReg[3] / 1000)
          lyricAndTime.push({
            lrc,
            timeSec
          })
        }
      })

      this.setData({
        lyricInfo: lyricAndTime
      })
      lyricAndTime = []
    }
  }
})