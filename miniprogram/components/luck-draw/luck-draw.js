let loopTimer;
let timer;
let onDrawing = false;  // 是否可进行抽奖标识，默认为false可进行抽奖
let drawIndex = 0; //抽奖过程KEY

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
    // 奖品参数信息
    prizeList: [
      { id: '001', index: 1, imgsrc: 'https://hbimg.huabanimg.com/18b925338313c77ee90c6a0a2f052a7988e10ce515ca7-T4bMZ0_fw658', prizeName: '谢谢参与' },
      { id: '002', index: 2, imgsrc: 'https://hbimg.huabanimg.com/2acfd641286f1a7e4050ca13e207c1d2fc2cbf5f12ca2-W5O1vm_fw658', prizeName: '金币 x20' },
      { id: '003', index: 3, imgsrc: 'https://hbimg.huabanimg.com/72138f8f82134a9099eaa02d5d81fa738519716021e4c-idXlQk_fw658', prizeName: '火箭 x1' },
      { id: '004', index: 4, imgsrc: 'https://hbimg.huabanimg.com/96e0a27d3a6b25dacd7157db6879b63be9e1addd126ac-sMVvOt_fw658', prizeName: '神秘礼盒 x1' },
      { id: '005', index: 5, imgsrc: 'https://hbimg.huabanimg.com/aa694a1e151f2cb8d8583eee9d1cbf0342b5577b953c-O0MFoR_fw658', prizeName: '水晶血瓶 x1' },
      { id: '006', index: 6, imgsrc: 'https://hbimg.huabanimg.com/2fe60709c9479b41ec3eef7fff1101f683b4ad89254af-HNdtDR_fw658', prizeName: '金币 x10' },
      { id: '007', index: 7, imgsrc: 'https://hbimg.huabanimg.com/407d1f6d9aa47e757994d9474dba7257c4c73bd11123a-5juBN1_fw658', prizeName: '水晶钻石 x5' },
      { id: '008', index: 8, imgsrc: 'https://hbimg.huabanimg.com/513f6f7d9f323e7cc3e252444237a84b52a98890c375-LGfXRi_fw658', prizeName: '水晶盒 x1' },
    ],

    drawIndex: null, //抽奖过程KEY
    prizeResult: null, //抽奖结果KEY
    prizeName: null, //抽奖结果KEY对应的奖品名称
    isShowLuck: false,  // 是否显示奖品弹窗，默认false不显示
    showAgain: false, //是否抽奖后显示再抽一次按钮
    awardImage: '',  // 弹窗展示的奖品照片
    awardName:'',  // 弹窗展示的奖品名字
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //抽奖操作
    startDraw() {
      if (onDrawing) {
        return;
      } else {
        onDrawing = true;
      }

      clearInterval(loopTimer);
      clearTimeout(timer)
      loopTimer = setInterval(()=>{
        this.changePrize()
      }, 100);

      // 随机将品池
      let random = Math.floor(Math.random() * this.data.prizeList.length)

      let res = {
        stutus: 1,
        prizeResult: this.data.prizeList[random].index,
        prizeName: this.data.prizeList[random].prizeName,
      }

      if (res.stutus == 1) {
        timer = setTimeout( ()=> {
          clearInterval(loopTimer);
          loopTimer = setInterval(()=>{
            this.changePrize()
          }, 200);

          timer = setTimeout( ()=> {
            clearInterval(loopTimer);
            loopTimer = setInterval(()=>{
              this.changePrize()
            }, 280);

            timer = setTimeout(() => {
              clearInterval(loopTimer)
              loopTimer = setInterval(() => {
                this.changePrize()
              },380);

              timer = setTimeout(() => {
                this.setData({
                  prizeResult: res.prizeResult,
                  prizeName: res.prizeName,
                });
             }, 1300)
            }, 1400)
          }, 1500)
        }, 1600)
      }
    },

    //抽奖过程奖品切换
    changePrize() {
      drawIndex++;
      drawIndex = drawIndex > 8 ? 1 : drawIndex;

      this.setData({
        drawIndex: drawIndex
      });

      if (this.data.prizeResult == drawIndex) {
        clearInterval(loopTimer)
        clearTimeout(timer)
        let currentAward = this.data.prizeList[this.data.prizeResult - 1]
        this.setData({
          showAgain: true,
          isShowLuck: true,
          awardImage: currentAward.imgsrc,
          awardName: currentAward.prizeName
        });
      }
    },

    //点击再抽一次按钮
    againBtn() {
      onDrawing = false;
      drawIndex = 0; //抽奖过程KEY

      this.setData({
        drawIndex: null, // 清空抽奖过程KEY
        prizeResult: null, // 清空抽奖结果KEY
        prizeName: null, // 清空抽奖结果KEY对应的奖品名称
        showAgain: false, // 是否抽奖后显示再抽一次按钮
        awardImage: '',  // 清空奖品展示的图片
        awardName: '' // 清空奖品的展示名称
      });
    },

    // 关闭奖品弹簧
    closePopup(){
      this.setData({
        isShowLuck: false
      })
    }
  }
})
