App({
  globalData: {
    userInfo: {},
    hasUserInfo: false
  },
  onLaunch() {
    wx.cloud.init({
      env: 'carefulrobot-6gq11fqqd8e16755',
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getUserProfile'
    }).then(res => {
      wx.cloud.callFunction({
        name: 'getUserData',
        data: {
          openId: res.result.openid
        }
      }).then(res => {
        if (res.result.data.length != 0) {
          this.globalData.userInfo = res.result.data[0]
          this.globalData.hasUserInfo = true
          if (this.checkLoginReadyCallback) {
            this.checkLoginReadyCallback(res);
          }
        }
      })
    })
  }
})