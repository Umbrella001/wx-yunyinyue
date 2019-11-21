module.exports = (time,format) => {
  let data = format || 'yyyy-MM-dd hh:mm:ss'  // 需要格式化的规则

  time = typeof(time) == 'number' ? time : new Date(time)

  let fmt = {
    'y+': time.getFullYear(),   // 年份
    'M+': time.getMonth() + 1,  // 月份
    'd+': time.getDate(),  // 日
    'h+': time.getHours(),  // 小时
    'm+': time.getMinutes(),  // 分钟
    's+': time.getSeconds()  // 秒
  }

  for(let i in fmt){
    if (new RegExp('(' + i + ')').test(data)){
      data = data.replace(RegExp.$1, fmt[i].toString().length <= 1 ? '0' + fmt[i] : fmt[i] )
    }
  }
  return data
}