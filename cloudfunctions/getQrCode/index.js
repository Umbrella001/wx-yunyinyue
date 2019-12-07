// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const result = await cloud.openapi.wxacode.getUnlimited({
    scene: wxContext.OPENID,
    lineColor: {
      "r": 216,
      "g": 30,
      "b": 6
    }
  })
   const uploadImg = await cloud.uploadFile({
      cloudPath: 'qrcode/' + Date.now() + '-' + Math.random() * 1000 + '.png',
      fileContent: result.buffer
    })

  return uploadImg.fileID
}