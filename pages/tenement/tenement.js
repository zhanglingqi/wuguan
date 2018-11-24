var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[],
    limit: 999999
  },
  getGrounpList: function () {
    var that = this;
    var https = app.globalData.url;
    wx.request({
      url: https + '/visitorMini/visitorList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        villageId: app.data.id,
        visitorUnionId: app.data.unionid,
        type: 2,
        offset: 0,
        limit: that.data.limit
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 1000) {
          that.setData({
            record: res.data.data
          })
        }
      }
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
    this.getGrounpList()
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