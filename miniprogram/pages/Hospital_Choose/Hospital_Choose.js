// miniprogram/pages/Hospital/Hospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_id: 0,
    type: ["三甲", "三乙", "三级", "二甲", "二乙", "其他"]
  },

  getHospitalData(level = '三甲') {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getHospitalData',
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
    this.getHospitalData(data.currentTarget.dataset.level)
    this.setData({
      type_id: data.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHospitalData()
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