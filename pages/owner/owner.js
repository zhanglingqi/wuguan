var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[],
    // 访问业主姓名
    limit:99999
  },
  getGrounpList:function() {
    wx.showLoading({
      title: 'loading...',
    });
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
        type: 1,
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
        wx.hideLoading()
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
    var that = this;
    var https = app.globalData.url;
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (resquest) {
              wx.request({
                url: https + '/carparkMini/getWxUserInfo',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                data: {
                  code: res.code,
                  encryptedData: resquest.encryptedData,
                  iv: resquest.iv
                },
                success: function (res) {
                  console.log(res)
                  if (res.data.code === 1000) {
                    app.data.openid = res.data.data.openid;
                    app.data.unionid = res.data.data.unionid;
                  }
                  that.getGrounpList()
                }
              })
            }
          })
        }
      })
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
    console.log(1)
    var that = this;
    this.setData({
      limit: that.data.limit += 5
    })
    wx.showLoading({
      title: 'loading...',
    });
    setTimeout(function () {
      that.getGrounpList()
      wx.hideLoading()
    }, 500)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})