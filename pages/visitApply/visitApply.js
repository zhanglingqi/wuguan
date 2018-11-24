var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择 ▼',
    time: '00:00',
    time1: '24:00',
    value: '请选择 ▼',
    array1: [],
    array1Id: [],
    // 暂存单元
    ary : [],
    array2: [],
    array2Id: [],
    // 暂存房间
    romm:[],
    array3: [],
    array3Id: [],
    index:'',
    index1:'',
    index2:'',
    // 访客姓名
    username:'',
    // 访客电话
    userphone:0,
    // 车牌号
    car:'',
    // 业主名字
    ownername:'',
    // 业主手机号
    ownerphone:''
  },
  bindUser: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      username: val
    });
  },
  bindphone: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      userphone: val
    });
  },
  carNumber: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      car: val
    });
  },
  ownerName: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      ownername: val
    });
  },
  ownerPhone: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      ownerphone: val
    });
  },
  login:function() {
    var https = app.globalData.url;
    var that = this;
    wx.request({
      url: https + '/visitorMini/applyVisitOwner',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        villageId: app.data.id,
        roomId:that.data.array3Id[that.data.index2],
        ghsUserName: that.data.ownername,
        ghsUserMobile: that.data.ownerphone,
        visitorUnionId: app.data.unionid,
        visitorName: that.data.username,
        visitorMobile: that.data.userphone,
        visitDay: that.data.date,
        startTime: that.data.time,
        endTime: that.data.time1,
        carNum: that.data.car
      },
      success:function(res) {
        if(res.data.code === 1000) {
          wx.showToast({
            title: '申请成功',
            icon: 'none',
            duration: 1400,
            mask: true
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1400)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
    })
      // console.log(this.data.username)
  },
  // 年月日
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //  时间
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  //楼号
  bindPickerChange(e) {
    var https = app.globalData.url;
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.request({
      url: https + '/visitorMini/getCellList',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        villageId: app.data.id,
        towerId:that.data.array1Id[that.data.index]
      },
      success:function (res) {
        that.setData({
          ary: []
        })
        that.setData({
          array2Id: []
        })
        if (res.data.code === 1000) {
          var arr = res.data.data;
          for(var i = 0; i < arr.length; i++) {
            that.data.ary.push(arr[i].cellName);
            that.data.array2Id.push(arr[i].id);
          }
          that.setData({
            array2:that.data.ary
          })
        }
      }
    })
  },
  bindPickerChange1(e) {
    var https = app.globalData.url;
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    wx.request({
      url: https + '/visitorMini/getRoomList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        villageId: app.data.id,
        cellId: that.data.array2Id[that.data.index1],

      },
      success:function(res) {
        that.setData({
          romm: []
        })
        that.setData({
          array3Id: []
        })
        if(res.data.code === 1000) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            that.data.romm.push(arr[i].roomNumber);
            that.data.array3Id.push(arr[i].id);
          }
          that.setData({
            array3: that.data.romm
          })
        }
      }
    })
    
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var https = app.globalData.url;
    var that = this;
    wx.request({
      url: https + '/visitorMini/getTowerList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        villageId: app.data.id
      },
      success: function (res) {
        if (res.data.code === 1000) {
          var arr = res.data.data;
          for(var i = 0; i < arr.length; i++) {
            that.data.array1.push(arr[i].towerNumber);
            that.data.array1Id.push(arr[i].id);
          }
          that.setData({
            array1: that.data.array1
            })
          that.setData({
            array1Id: that.data.array1Id
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