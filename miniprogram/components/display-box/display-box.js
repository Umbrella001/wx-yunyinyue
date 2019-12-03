// components/display-box/display-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 展示盒子对应的名称
    firstBoxName: {
      type: String,
      value: "暂无名称"
    },
    secondBoxName: {
      type: String,
      value: "暂无名称"
    },
    // 展示盒子对应的数据
    firstBoxData: {
      type: Number,
      value: "***"
    },
    secondBoxData: {
      type: Number,
      value: "***"
    },
    // 展示盒子对应的Icon图标
    firstBoxIcon: String,
    secondBoxIcon: String,

    // 展示盒子的背景图
    displayImg: {
      type: String,
      value: "https://hbimg.huabanimg.com/462de3a4c4dc51dd106a6338b7bc2b2df07654076ed1d-atu8rZ_fw658"
    }
  },

  options: {
    styleIsolation: 'apply-shared',
  },
  
  lifetimes:{
    ready(){
      this.setData({
        isShowAnimation: true
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowAnimation: false,  // 是否展示动画
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
