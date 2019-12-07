// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云数据库初始化
const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {
  const count = await playlistCollection.count()
  const total = count.total
  if (total == 0){
    let playlist = await rp(URL).then((res) => {
      return JSON.parse(res).result
    })

    for (let i = 0, len = playlist.length; i < len; i++) {
      await playlistCollection.add({
        data: {
          ...playlist[i],
          createTime: db.serverDate()
        }
      }).then((res) => {
        console.log('插入成功')
      }).catch((err) => {
        console.error('插入失败')
      })
    }
  }

  const queryTimes = Math.ceil(total / MAX_LIMIT)
  const tempArr = []
  for (let i = 0; i < queryTimes; i++) {
    const tempList = await playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
    tempArr.push(tempList)
  }
  const list = {
    data: []
  }

  for (let i = 0, len = tempArr; i < len; i++) {
    list.data.concat(tempArr[i]);
  }
  

  let playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  // 歌单列表数据去重
  let newPlaylist = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true;
    for (let j = 0, len2 = list.data.lenght; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newPlaylist.push[playlist[i]]
    }
  }

  for (let i = 0, len = newPlaylist.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newPlaylist[i],
        createTime: db.serverDate()
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }
  return newPlaylist.length
}