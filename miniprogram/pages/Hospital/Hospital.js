// pages/Hospital/Hospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hospital: [{
      "id": 1,
      "name": "珠海市香洲区第二人民医院",
      "image": "/images/hospital1.jpg",
      "level": "二级",
      "type": "综合医院",
      "address": "珠海市香洲区南屏镇南泉路21号",
      "emergencyRoom_phone": "0756-8288720",
      "informationDesk_phone": "0756-8288770",
      "fax": "0756-8288700",
      "trafficRoutes": "乘坐K9、16、25、34、45、83、201、204、207路到“南泉路口”站",
      "information": "医院信息"
    }, {
      "id": 2,
      "name": "珠海市香洲区第三人民医院",
      "image": "/images/hospital1.jpg",
      "level": "三级",
      "type": "社区医院",
      "address": "珠海市香洲区南屏镇南泉路22号",
      "emergencyRoom_phone": "0756-8288721",
      "informationDesk_phone": "0756-8288771",
      "fax": "0756-8288701",
      "trafficRoutes": "乘坐K9、16、25、34、45、83、201、204、207路到“南泉路口北”站",
      "information": "医院信息"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hospital_id: options.id,
    })
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