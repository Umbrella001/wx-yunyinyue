// components/author-popup/author-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowPopup: Boolean
  },

  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup(){
      this.setData({
        isShowPopup: false
      })
    }
  }
})
