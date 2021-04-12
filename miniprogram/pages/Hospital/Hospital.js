Page({
  data: {},
  onLoad(options) {
    this.getHospitalDataById(options.id)
  },
  getHospitalDataById(id) {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getHospitalDataById',
      data: {
        id
      }
    }).then(res => {
      this.setData({
        hospital: res.result.data
      })
      wx.hideLoading()
    })
  }
})