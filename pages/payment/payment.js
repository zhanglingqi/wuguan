
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 车牌
    carpai:'',
    // 当前订单时间
    time1:'',
    // 停车时间段
    time2:'',
    // 停车间隔
    time3:'',
    // 停车费
    hour:'',
    items: [
      { value: '2元优惠券', name: '停车2元优惠券', checked: 'false'},
      { value: '3元优惠券', name: '停车3元优惠券', checked: 'false'},
      { value: '4元优惠券', name: '停车4元优惠券', checked: 'false'},
      { value: '不使用优惠券', name: '不使用优惠券',checked: 'true' },
    ],
    //优惠券信息
    coupon:"不使用优惠券",
    // moneyStart:6,
    moneyEnd:0,
    // 订单id
    orderId:'',
    unionid: ''
  },
  onTapDayWeather() {
    const that = this;
    var https1 = app.globalData.url;
    //支付等待效果
    that.setData({
      loading: true
    })
    wx.getNetworkType({
      success(resWife) {
        if (resWife.networkType == 'none') {
          console.log(1)
          wx.showToast({
            title: '网络连接失败，请检查网络',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          // 支付
          wx.request({
            url: https1 + '/spPay/payFee',//后台给我的数据
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            data: {
              orderId: that.data.orderId,
              openId: app.data.openid,
              unionId: app.data.unionid,
              ip: '192.168.1.195',
              feeType: 'car',
            },
            method: 'POST',
            //请求发送成功后的数据
            success(resS) {
              const payargs = resS.data.data;
              wx.requestPayment({
                timeStamp: payargs.timeStamp,
                nonceStr: payargs.nonceStr,
                package: payargs.package,
                signType: payargs.signType,
                paySign: payargs.paySign
              });
              wx.request({
                url: https1 + '/spPay/orderquery',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                data: {
                  out_trade_no: that.orderId
                },
                success: function (res) {
                  if (res.code === 1000) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })

              that.setData({
                loading: false
              })
            }
          })
        }
      }
    })
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },
  //优惠券单选框的方法
  radioChange(e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    that.setData({
      coupon : e.detail.value
    });
    // 修改最后的钱
    var couponNum = that.data.coupon;
    var couponMoney = couponNum.substring(0, 1);
    that.setData({
      moneyEnd: that.data.moneyStart - couponMoney
    })
    if (e.detail.value == '不使用优惠券') {
      that.setData({
        moneyEnd: that.data.moneyStart
      })
    }
    const items = that.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    
    this.setData({
      items
    })
  },
  //显示对话框
  showModal: function () {
    //点击实现默认选中
    
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.getStorage({
      key: 'unionid',
      success: function (res) {
        that.setData({
          unionid: res.data
        })
      },
    })    
    that.setData({
      carpai: options.carNum,
      hour: options.hour,
      time1: options.serviceDay,
      time2: options.serviceTime,
      time3: options.serviceHoursAndMinute,
      moneyEnd: options.totalFee,
      orderId: options.orderId
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.setData({
    //   moneyEnd: this.data.moneyStart
    // })
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