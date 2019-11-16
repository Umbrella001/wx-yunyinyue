// components/author/author.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowPopup: Boolean
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
    onUserInfo(event){
      const userInfo = event.detail.userInfo
      if(userInfo){
        this.triggerEvent('loginsuccess',userInfo)
      }else{
        this.triggerEvent('loginfail')
      }
    }
  }
})
