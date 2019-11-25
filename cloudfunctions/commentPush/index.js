// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
      page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
      data: {
        keyword1: {
          value: '评价成功'
        },
        keyword2: {
          value: event.blogOwer
        },
        keyword3: {
          value: event.content
        }
      },
      templateId: 'V1lGF_YoFGVNuAKUytkEuQbsnM6uTRB8q7IaWKfiG4Y',
      formId: event.formId,
      emphasisKeyword: ""
    })
    return result
  } catch (err) {
    // 错误处理
    throw err
  }
}