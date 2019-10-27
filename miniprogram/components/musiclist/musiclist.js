// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playerId: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelect(event) {
      console.log(event)
      const eventData = event.currentTarget.dataset
      this.setData({
        playerId: eventData.musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${eventData.musicid}&index=${eventData.index}`,
      })
    }
  }
})