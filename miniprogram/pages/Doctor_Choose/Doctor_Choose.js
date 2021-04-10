// pages/Doctor_Choose/Doctor_Choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: []
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
      wx.cloud.callFunction({
        name: 'getTimeData'
      }).then(res1 => {
        this.setData({
          time: res1.result.data
        })
        wx.hideLoading()
      })
    })
  },

  getDate() {
    let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    for (let index = 0; index < 7; index++) {
      let date = new Date(new Date().getTime() + index * 86400000)
      let month = date.getMonth() + 1
      let day = date.getDate().toString()
      let time = month + '.' + day
      let week = weekArr[date.getDay()]
      this.setData({
        date: this.data.date.concat([
          [week, time]
        ])
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options)
    this.getDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})