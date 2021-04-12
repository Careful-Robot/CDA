Page({
  data: {
    level_id: 0,
    level: ["三甲", "三乙", "三级", "二甲", "二乙", "其他"]
  },
  onLoad() {
    this.getHospitalDataByLevel()
  },
  getHospitalDataByLevel(level = '三甲') {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getHospitalDataByLevel',
      data: {
        level
      }
    }).then(res => {
      this.setData({
        hospital: res.result.data
      })
      wx.hideLoading()
    })
  },
  switchRightTab(data) {
    var level_id = data.currentTarget.dataset.id
    if (this.data.level_id !== level_id) {
      this.getHospitalDataByLevel(data.currentTarget.dataset.level)
      this.setData({
        level_id
      })
    }
  }
})