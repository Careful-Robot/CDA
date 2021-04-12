Page({
  data: {
    date: []
  },
  onLoad(options) {
    this.getData(options)
    this.getDate()
  },
  getData(info) {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getDoctorData',
      data: {
        info
      }
    }).then(res => {
      this.setData({
        doctor: res.result.list
      })
      wx.hideLoading()
    })
  },
  getDate() {
    let datee = new Date()
    var today = (datee.getTime() - datee.getHours() * 3600000 - datee.getMinutes() * 60000 - datee.getSeconds() * 1000).toString().slice(0, -3)
    let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    let weekArrEng = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    for (let index = 0; index < 7; index++) {
      let date = new Date(new Date().getTime() + index * 86400000)
      let month = date.getMonth() + 1
      let day = date.getDate().toString()
      let time = month + '.' + day
      let weekNum = date.getDay()
      let week = weekArr[weekNum]
      let weekEng = weekArrEng[weekNum]
      let timee = (parseInt(today) + index * 86400).toString()
      this.setData({
        date: this.data.date.concat([
          [week, time, weekEng, timee]
        ])
      })
    }
  }
})