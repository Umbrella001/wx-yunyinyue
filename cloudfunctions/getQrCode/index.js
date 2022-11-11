// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let __stamp__ = 0
let __inc__ = 0

//用于生成唯一的uuid种子
function uuid(prefix = '') {
  var rand =
    Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  var now = (~~(Date.now() / 1000)).toString(16)

  if (__stamp__ === now) {
    __inc__++
  } else {
    __stamp__ = now
    __inc__ = 0
  }
  rand = prefix + __stamp__ + __inc__.toString(16) + rand
  return rand.slice(0, 24)
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const result = await cloud.openapi.wxacode.getUnlimited({
    scene: wxContext.OPENID,
    lineColor: {
      r: 216,
      g: 30,
      b: 6
    }
  })
  // 修正长度问题
  const uploadImg = await cloud.uploadFile({
    cloudPath: 'qrcode/' + uuid() + '.png',
    fileContent: result.buffer
  })

  return uploadImg.fileID
}
