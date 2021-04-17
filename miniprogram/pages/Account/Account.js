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
        this.reservations()
      }
    }
  },
  onShow() {
    this.reservations()
  },
  reservations() {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
    if (this.data.userInfo.isReservations) {
      let temp = new Date(parseInt(this.data.userInfo.reservations.timestamp) * 1000)
      let date = {
        year: temp.getFullYear(),
        month: temp.getMonth() + 1,
        day: temp.getDate()
      }
      wx.cloud.callFunction({
        name: 'getHospitalDataById',
        data: {
          id: this.data.userInfo.reservations.hospital_id
        }
      }).then(res1 => {
        wx.cloud.callFunction({
          name: 'getDoctorDataById',
          data: {
            id: this.data.userInfo.reservations.doctor_id
          }
        }).then(res2 => {
          this.setData({
            reservations: {
              hospital_name: res1.result.data.name,
              doctor_name: res2.result.data.name,
              date: date,
              time: this.data.userInfo.reservations.time
            }
          })
          wx.hideLoading()
        })
      })
    } else {
      wx.hideLoading()
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
            getApp().globalData.hasUserInfo = this.data.hasUserInfo
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
  },
  cancel() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认取消预约？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在加载中...',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'cancelReservationsData',
            data: {
              hospital_id: that.data.userInfo.reservations.hospital_id,
              doctor_id: that.data.userInfo.reservations.doctor_id,
              user_id: that.data.userInfo._id,
              timestamp: that.data.userInfo.reservations.timestamp,
              time: that.data.userInfo.reservations.time
            }
          }).then(res1 => {
            wx.cloud.callFunction({
              name: 'getUserData',
              data: {
                openId: that.data.userInfo.openId
              }
            }).then(res2 => {
              app.globalData.userInfo = res2.result.data[0]
              that.setData({
                userInfo: res2.result.data[0]
              })
              if (!that.data.userInfo.isReservations) {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '取消失败，请重试！',
                  showCancel: false
                })
              }
            })
          })
        }
      }
    })
  }
})