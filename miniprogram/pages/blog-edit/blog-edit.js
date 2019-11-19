
const TEXTAREA_WORD_LENGTH  = 140,  // 输入框的字数限制
IMG_UPLOAD_NUM = 9,  // 图片上传的最大数量
VIDEO_UPLOAD_NUM = 1  // 视频上传的最大数量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum: 0,    // 输入框字数
    footerHeight: 0,   // 底部随键盘拉起的高度
    images: [],  // 存放图片集合
    videos: [],   // 存放视频集合
    isShowSelect: true, // 是否显示添加图片的按钮
    isBtnType: 0,  // 默认0为发图片，1为发视频
    play: false,  // 视频封面暂停按钮是否显示，false为显示
  },

  // 监听输入框的字数
  onInput(event){
    let len = event.detail.value.length
    if (len >= TEXTAREA_WORD_LENGTH){
      len = `字数最大为：${TEXTAREA_WORD_LENGTH}`
    }
    this.setData({
      wordsNum: len
    })
  },

  // 聚焦和失去焦点时底部的高度
  onFocus(event){
      console.log(event)
      this.setData({
        footerHeight: event.detail.height
      })     
  },

  onBlur(){
    this.setData({
      footerHeight: 0
    })
  },

  // 上传图片或者视频
  uploadImg(){
    let remainImg = IMG_UPLOAD_NUM - this.data.images.length  
    if (!this.data.isBtnType){
      console.log("pic")
      wx.chooseImage({
        count: remainImg,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
          if (IMG_UPLOAD_NUM - this.data.images.length == 0 ) {
            this.setData({
              isShowSelect: false
            })
          }
        },
      })
    }else{
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success:(res) => {
          console.log(res)
          this.setData({
            videos: this.data.videos.concat(res.tempFilePath)
          })
          if (VIDEO_UPLOAD_NUM - this.data.videos.length == 0) {
            this.setData({
              isShowSelect: false
            })
          }
        }       
      })
    }
  },

  // 删除图片或者视频
  delectImg(event){
    console.log(event.currentTarget.dataset.index)
    const idx = event.currentTarget.dataset.index
    this.data.isBtnType ? this.data.videos.splice(idx, 1) : this.data.images.splice(idx, 1) 
    if(!this.data.isBtnType){
      this.setData({
        images: this.data.images
      })
      if (this.data.images.length == IMG_UPLOAD_NUM - 1) {
        this.setData({
          isShowSelect: true
        })
      }
    }else{
      this.setData({
        videos: this.data.videos
      })
      if (this.data.videos.length == VIDEO_UPLOAD_NUM - 1) {
        this.setData({
          isShowSelect: true
        })
      }
    }
  },

  // 切换上传类型是图片还是视频 
  triggerImg(){
    this.setData({
      isBtnType: 0
    })
    if(IMG_UPLOAD_NUM - this.data.images.length != 0){
      this.setData({
        isShowSelect: true
      })
    } else {
      this.setData({
        isShowSelect: false
      })
    }
  },

  triggerVideo(){
    this.setData({
      isBtnType: 1
    })
    if (VIDEO_UPLOAD_NUM - this.data.videos.length != 0) {
      this.setData({
        isShowSelect: true
      })
    }else{
      this.setData({
        isShowSelect: false
      })
    }
  },


  // 预览图片
  onPreviewImg(event){
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imgsrc
    })
  },

  //点击暂停/开始
  videoTap() {
    console.log("videiTap")
    //获取video
    this.videoContext = wx.createVideoContext('myVideo')
    if (!this.data.play) {
      //开始播放
      console.log("videiTap1")
      this.videoContext.play()//开始播放
      this.videoContext.requestFullScreen() // 进入全屏
      this.setData({
        play: true
      })
    } else {
      //当play==false 显示图片 暂停

      this.videoContext.pause()//暂停播放
      this.videoContext.exitFullScreen() // 进入全屏
      this.setData({
        play: false
      })
    }
  }
})