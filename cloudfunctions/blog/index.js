// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router') // 导入小程序路由

const db = cloud.database() // 初始化数据库
const blogData = db.collection('blog') // 连接blog数据库
const blogComment = db.collection('blog-comment')  // 连接blog-comment数据库
const MAX_LIMIT = 100  // 查询的次数限制

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

  app.router('detail', async(ctx,next) =>{
    let blogid = event.blogid

    // 博客详情查询
    let blogDetail = await blogData.where({
      _id: blogid
    }).get().then((res)=>{
      return res.data
    })

    // 博客评论查询

    let commentCount = await blogComment.count()
    let total = commentCount.total
    console.log('total',total)
    let queryTimes = Math.ceil(total / MAX_LIMIT)
    let commentList = {
      data: []
    }

    let promiseArr = []

    if (total > 0){
      for(let i = 0; i < queryTimes; i++){
        let promise = blogComment.skip(i * MAX_LIMIT)
          .limit(MAX_LIMIT).where({
          blogid
        })
        .orderBy('commentTime','desc')
        .get()
        promiseArr.push(promise)
      }
      if(promiseArr.length > 0){
        commentList = (await Promise.all(promiseArr)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }
    }
    ctx.body = {
      blogDetail,
      commentList
    }
  })

  return app.serve()
}