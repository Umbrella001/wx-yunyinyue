/**
 * 友好的时间格式化
 * @param {stamp} 时间戳 毫秒
 * @return 格式化后的时间
 */
export function friendlyTimeFormat(stamp = Date.now()) {
  var _now = new Date()
  var now = _now.getTime()
  var today = new Date(
    _now.getFullYear(),
    _now.getMonth(),
    _now.getDate(),
    0,
    0,
    0
  )
  var level = 60 * 1000
  var time = new Date(stamp)
  var m, d, H, i

  if (time.toString() === 'Invalid Date') {
    return ''
  }

  // 小于1分钟
  if (now - stamp < level) {
    return '刚刚'
  }

  // 1小时内
  if (now - stamp < level * 60) {
    return ~~((now - stamp) / level) + '分钟前'
  }

  m = (time.getMonth() + 1 + '').padStart(2, '0')
  d = (time.getDate() + '').padStart(2, '0')
  H = time.getHours()
  i = (time.getMinutes() + '').padStart(2, '0')

  // 今天内
  if (stamp >= today.getTime()) {
    if (H < 12) {
      return `上午 ${(H + '').padStart(2, '0')}:${i}`
    }
    return `下午 ${(H - 12 + '').padStart(2, '0')}:${i}`
  } else {
    // 昨天
    if (stamp >= today.getTime() - 24 * 3600 * 1000) {
      return `昨天 ${H}:${i}`
    }
    return `${m}月${d}日 ${H}:${i}`
  }
}

/**
 * 设置时效缓存
 * @param  {String} key    存储的key值
 * @param  {String} value  存储的value值 (不填则默认为1)
 * @return {Number} time   有效时间，（单位：秒，不填则默认一天）
 */
export const setStorageSyncSecond = (key, value, time) => {
  value = value ? value : 1
  wx.setStorageSync(key, value)
  var t = time ? +time : 24 * 3600
  if (t > 0) {
    var timestamp = new Date().getTime()
    timestamp = timestamp / 1000 + t
    wx.setStorageSync(key + 'dtime', timestamp + '')
  } else {
    wx.removeStorageSync(k + 'dtime')
  }
}

/**
 * 读取时效缓存
 * @param  {String} key  存储的key值
 */
export const getStorageSyncTime = key => {
  var deadtime = +wx.getStorageSync(key + 'dtime')
  if (deadtime) {
    if (deadtime < new Date().getTime() / 1000) {
      wx.removeStorageSync(key)
      wx.removeStorageSync(key + 'dtime')
      return true
    }
  } else {
    return true
  }
}

// 防止被清除的缓存
const cacheList = ['storeId', 'pcid']
export const clearStorage = (list = cacheList) => {
  let data = {}
  for (let i = 0; i < list.length; i++) {
    let key = list[i]
    data[key] = wx.getStorageSync(key)
  }
  wx.clearStorageSync()
  for (let key in data) {
    wx.setStorageSync(key, data[key])
  }
}
