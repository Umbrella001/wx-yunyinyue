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
      const musicid = event.currentTarget.dataset.musicid
      this.setData({
        playerId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${musicid}`,
      })
    }
  }
})