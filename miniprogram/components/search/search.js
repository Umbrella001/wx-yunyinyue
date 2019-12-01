let keyword = ''  // 搜索栏输入字

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
* 关闭组件样式隔离
*/
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    placeHolderText: "请输入关键字"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event){
      keyword = event.detail.value
    },
    onSearch(){
      this.triggerEvent('search',{ keyword })
    },
    onConfirm(){
      this.triggerEvent('confirmSearch', { keyword })
    }
  }
})