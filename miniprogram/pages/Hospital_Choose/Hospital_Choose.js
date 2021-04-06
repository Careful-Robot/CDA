// miniprogram/pages/Hospital/Hospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level_id: 0,
    level: ["三甲", "三乙", "三级", "二甲", "二乙", "其他"]
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHospitalDataByLevel()
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