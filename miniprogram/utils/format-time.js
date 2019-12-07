module.exports = (time, format) => {
  let data = format || 'yyyy-MM-dd hh:mm:ss' // 需要格式化的规则

  time = typeof(time) == 'number' ? time : new Date(time)

  let fmt = {
    'y+': time.getFullYear(), // 年份
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分钟
    's+': time.getSeconds(), // 秒
    'w+': time.getDay(), // 星期（0为星期日）
    'z+': time.getHours(), // 上午/下午/凌晨
  }

  function tranWeek(week) {
    switch (week) {
      case 0:
        return "星期日";
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
        break;
    }
  }

  function timeSlot(hours) {
    let h;
    if (hours >= 6 && hours <= 12) {
      h = 0
    } else if (hours > 12 && hours <= 23) {
      h = 1
    } else {
      h = 2
    }
    switch (h) {
      case 0:
        return "上午";
      case 1:
        return "下午";
      case 2:
        return "凌晨";
        break;
    }
  }

  function transform(i) {
    if (i == 'w+') {
      return tranWeek(fmt[i])
    } else if (i == 'z+') {
      return timeSlot(fmt[i])
    } else {
      return fmt[i].toString().length <= 1 ? '0' + fmt[i] : fmt[i]
    }
  }

  for (let i in fmt) {
    if (new RegExp('(' + i + ')').test(data)) {
      data = data.replace(RegExp.$1, transform(i))
    }
  }
  return data
}