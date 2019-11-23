// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router') // 导入小程序路由

const db = cloud.database() // 初始化数据库
const blogData = db.collection('blog') // 连接blog数据库

// 云函数入口函数
exports.main = async(event, context) => {

  const app = new TcbRouter({
    event
  })

  app.router('list', async(ctx, next) => {

    let keyword = event.keyword

    let w = {}

    if (keyword.trim() != '') {
      w = {
        content: new db.RegExp({
          regexp: keyword.toString(),
          options: 'i'
        })
      }
    }

    ctx.body = await blogData.where(w).skip(event.start)
      .limit(event.count)
      .orderBy('publishTime', 'desc')
      .get()
      .then((res) => {
        return res.data
      })
  })

  return app.serve()
}