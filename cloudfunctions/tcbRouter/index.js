// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const app = new TcbRouter({
    event
  })

  app.use(async(ctx, next) => {
    console.log('全局中间件开始')
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
    console.log('全局中间件结束')
  })

  app.router('music', async(ctx, next) => {
    console.log('音乐中间件开始')
    ctx.data.musicName = '星子'
    await next()
    console.log('音乐中间件结束')
  }, async(ctx) => {
    console.log('音乐类型中间件开始')
    ctx.data.musicType = '伤感',
      ctx.body = {
        data: ctx.data
      }
    console.log('音乐类型中间件结束')
  })

  app.router('movie', async(ctx, next) => {
    console.log('电影中间件开始')
    ctx.data.movieName = 'X战警-黑凤凰'
    await next()
    console.log('电影中间件结束')
  }, async(ctx) => {
    console.log('电影类型中间件开始')
    ctx.data.movieType = '科幻'
    ctx.body = {
      data: ctx.data
    }
    console.log('电影类型中间件开始')
  })

  return app.serve()
}