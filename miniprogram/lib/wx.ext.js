/**
 * {小程序常用方法定制}
 */

const dialog = wx.showModal

// 重写showModal, 避免有些情况下, 传入的对象不是合法的结构导致
Object.defineProperty(wx, 'showModal', {
  value(params = {}) {
    if (typeof params.content !== 'string') {
      params.content = '未知错误'
    }
    dialog(params)
  },
  enumerable: false
})

/**
 * 轻提示, 固定时长3秒
 */
wx.toast = function (title = '', icon = 'none', duration = 3000) {
  wx.showToast({
    title,
    icon,
    duration
  })
}

/**
 * 普通弹窗, 不支持定制按钮, 返回promise对象
 */
wx.alert = function (content = '', title = '提示') {
  return new Promise(resolve => {
    wx.showModal({
      title,
      content,
      showCancel: false,
      confirmColor: '#1abc9c',
      success: resolve
    })
  })
}

/**
 * 普通询问弹窗, 不支持定制按钮, 返回promise对象
 */
wx.confirm = function (content = '', title = '提示') {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      confirmColor: '#1abc9c',
      cancelColor: '#ced6e0',
      success(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    })
  })
}

/**
 * 页面跳转功能, 用来解决微信那恶心的5层限制
 * 大部分场景下, 可直接替代 navigateTo
 */
wx.location = function (target) {
  let pages = getCurrentPages()
  let options, idx, has

  if (~target.url.indexOf('?')) {
    options = target.url.split('?').pop().toJson()
  }

  for (let i = 0; i < pages.length; i++) {
    let it = pages[i]
    let url = '/' + it.route

    idx = i
    has = true

    if (target.url.startsWith(url)) {
      if (options) {
        for (let k in options) {
          if (options[k] !== it.options[k]) {
            has = false
            break
          }
        }
      } else {
        has = url === target.url
      }
    } else {
      has = false
    }

    if (has) {
      break
    }
  }

  if (has) {
    // 跳转地址不等于当前页才跳
    if (pages.length - idx > 1) {
      wx.navigateBack({
        delta: pages.length - idx - 1
      })
    }
  } else {
    wx.navigateTo(target)
  }
}
