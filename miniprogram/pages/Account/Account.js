const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad() {
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
  },
  getUserProfile() {
    if (wx.getUserProfile) {
      wx.getUserProfile({
        desc: '用于完善个人资料',
        success: (res) => {
          wx.cloud.callFunction({
            name: 'getUserProfile',
            data: {
              weRunData: wx.cloud.CloudID(res.cloudID),
              obj: {
                shareInfo: wx.cloud.CloudID(res.cloudID),
              }
            }
          }).then(res1 => {
            this.setData({
              userInfo: res.userInfo,
              'userInfo.openId': res1.result.event.userInfo.openId,
              hasUserInfo: true
            })
            getApp().globalData.userInfo = this.data.userInfo
            getApp().globalData.hasUserInfo = true
            this.setUserData(this.data.userInfo)
          })
        }
      })
    } else {
      wx.showToast({
        title: '微信版本过低，无法登陆！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  setUserData(userInfo) {
    Object.assign(userInfo, {
      isReservations: false,
      reservations: {
        hospital_id: '',
        doctor_id: '',
        timestamp: '',
        time: ''
      }
    })
    wx.cloud.callFunction({
      name: 'setUserData',
      data: {
        userInfo
      }
    })
  }
})