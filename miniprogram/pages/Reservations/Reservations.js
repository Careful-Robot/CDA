const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    reservationsResult: false
  },
  onLoad(options) {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    if (app.globalData.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo
      })
    } else {
      app.checkLoginReadyCallback = res => {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: app.globalData.hasUserInfo
        })
      }
    }
    if (!this.data.hasUserInfo) {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '你还没有登陆，请点击登陆！',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/Account/Account'
            })
          } else if (res.cancel) {
            wx.navigateBack()
          }
        }
      })
    } else {
      if (this.data.userInfo.isReservations) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '你已经预约过，请不要重复预约！',
          success(res) {
            if (res.confirm) {
              wx.navigateBack()
            } else if (res.cancel) {
              wx.navigateBack()
            }
          }
        })
      } else {
        wx.cloud.callFunction({
          name: 'setReservationsData',
          data: {
            hospital_id: options.hospital_id,
            doctor_id: options.doctor_id,
            user_id: this.data.userInfo._id,
            timestamp: options.timestamp,
            time: options.time
          }
        }).then(res => {
          wx.cloud.callFunction({
            name: 'getUserData',
            data: {
              openId: this.data.userInfo.openId
            }
          }).then(res1 => {
            app.globalData.userInfo = res1.result.data[0]
            this.setData({
              userInfo: res1.result.data[0]
            })
            if (this.data.userInfo.isReservations) {
              wx.hideLoading()
              this.setData({
                reservationsResult: true
              })
            } else {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '预约失败，请重试！',
                success(res2) {
                  if (res2.confirm) {
                    wx.navigateBack()
                  } else if (res2.cancel) {
                    wx.navigateBack()
                  }
                }
              })
            }
          })
        })
      }
    }
  },
  button() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})