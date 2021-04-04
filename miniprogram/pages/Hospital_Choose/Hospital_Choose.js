// miniprogram/pages/Hospital/Hospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_id: 0,
    type: [{
      "name": "三甲",
      "contain": [{
        "id": 1,
        "name": "珠海市香洲区第二人民医院"
      }, {
        "id": 2,
        "name": "医院2"
      }, {
        "id": 3,
        "name": "医院3"
      }, {
        "id": 4,
        "name": "医院4"
      }, {
        "id": 5,
        "name": "医院5"
      }]
    }, {
      "name": "三乙",
      "contain": [{
        "id": 6,
        "name": "医院6"
      }, {
        "id": 7,
        "name": "医院7"
      }, {
        "id": 8,
        "name": "医院8"
      }, {
        "id": 9,
        "name": "医院9"
      }, {
        "id": 10,
        "name": "医院10"
      }]
    }, {
      "name": "三级",
      "contain": [{
        "id": 11,
        "name": "医院11"
      }, {
        "id": 12,
        "name": "医院12"
      }, {
        "id": 13,
        "name": "医院13"
      }, {
        "id": 14,
        "name": "医院14"
      }, {
        "id": 15,
        "name": "医院15"
      }]
    }, {
      "name": "二甲",
      "contain": [{
        "id": 16,
        "name": "医院16"
      }, {
        "id": 17,
        "name": "医院17"
      }, {
        "id": 18,
        "name": "医院18"
      }, {
        "id": 19,
        "name": "医院19"
      }, {
        "id": 20,
        "name": "医院20"
      }]
    }, {
      "name": "二乙",
      "contain": [{
        "id": 21,
        "name": "医院21"
      }, {
        "id": 22,
        "name": "医院22"
      }, {
        "id": 23,
        "name": "医院23"
      }, {
        "id": 24,
        "name": "医院24"
      }, {
        "id": 25,
        "name": "医院25"
      }]
    }, {
      "name": "其他",
      "contain": [{
        "id": 26,
        "name": "医院26"
      }, {
        "id": 27,
        "name": "医院27"
      }, {
        "id": 28,
        "name": "医院28"
      }, {
        "id": 29,
        "name": "医院29"
      }, {
        "id": 30,
        "name": "医院30"
      }]
    }]
  },

  switchRightTab(id) {
    this.setData({
      type_id: id.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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