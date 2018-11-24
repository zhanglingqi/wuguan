var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hoem:'',
  },
  // 业主
  bindGetUserInfo(e) {
    var that = this;
    var https = app.globalData.url;
    if (e.detail.userInfo) {
      console.log(1)
      if (app.data.flag) {
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
                  }
                })
              }
            })
            app.data.flag = false
          }
        })
      }
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/owner/owner',
        })
      },500)

    }
  },
  // 物业
  bindGetUserInfo1(e) {
    var that = this;
    var https = app.globalData.url;
    if (e.detail.userInfo) {
      if (app.data.flag) {
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
                      console.log(1)
                      app.data.unionid = res.data.data.unionid;
                      console.log(2)
                    }
                  }
                })
              }
            })
            app.data.flag = false
          }
        })
      }
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/tenement/tenement',
        },500)
      })
    }
  },
  // 停车场
  bindGetUserInfo2(e) {
    // console.log(e.detail.userInfo)
    var that = this;
    if (e.detail.userInfo) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var https = app.globalData.url;
    var that = this;
    var scene = decodeURIComponent(options.scene);
    // var query = options.query.propertyId
   wx.request({
     url: https +'/carparkMini/getVillageMsg',
     method:'POST',
     header:{
       'content-type': 'application/x-www-form-urlencoded',
     },
     data:{
       propertyId: scene
     },
     success:function(res) {
       if(res.data.code === 1000) {
         app.data.id = res.data.data.id;
         app.data.propertyId = res.data.data.propertyId;
         app.data.propertyName = res.data.data.propertyName;
         app.data.villageName = res.data.data.villageName;
         that.setData({
           hoem: res.data.data.propertyName
         })
       }
     }
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