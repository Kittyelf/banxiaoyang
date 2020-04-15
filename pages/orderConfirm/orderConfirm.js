const app = getApp();
Page({
    data: {
        mainImg:"",
        address: [], //用户地址
        goodslist: [], //商品详情
        message: '',  //买家留言
    },
    onLoad(options) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/integral_orderdetail',
            data: {
                integral_goodsid: options.goodsid || options.integral_goodsid,
                address_userid: wx.getStorageSync('user_id'),
                address_id: options.addressid || options.address_id || ''
            },
            method: 'GET', 
            success: res=> {
                if (!res.data.address.length) {
                    wx.redirectTo({
                        url: '/pages/newAddress/newAddress',
                    })
                }else {
                  // console.log(res.data.goodslist[0])
                    this.setData({
                        goodslist: res.data.goodslist[0],
                        address: res.data.address[0],
                        mainImg: res.data.goodslist[0].integral_goodsimg.split(',')[0]
                    })
                }  
            },
        })
    },
    toAddress(e) {
        wx.redirectTo({
            url: '/pages/selectAddress/selectAddress?integral_goodsid=' + e.currentTarget.dataset.integralgoodsid
        })
    },
    bindinput(e) {
        this.setData({
            message: e.detail.value
        })
    },
    bindconfirm(e) {
        this.setData({
            message: e.detail.value
        })
    },
    sumbitOrder() {
        if(this.data.goodslist.is_3165goods === '0') {
            wx.request({
                url: 'https://rtd.laoyouta.com/index.php/home/integral/integral_order',
                data: {
                    integral_goodsid: this.data.goodslist.integral_goodsid,
                    order_userid: wx.getStorageSync('user_id'),
                    pay_way: 1,
                    order_addressid: this.data.address.address_id,
                },
                method: 'GET',
                success: res=> {
                    wx.showToast({
                        title: res.data.text,
                        icon: 'none',
                        success: v=> {
                            setTimeout(() => {
                                wx.navigateTo({
                                    url: '/pages/order/order'
                                })
                            }, 1500);
                        }
                    })
                }
            })
        }else {
            wx.request({
                url: 'https://rtd.laoyouta.com/index.php/home/integral/integral_order',
                data: {
                    integral_goodsid: this.data.goodslist.integral_goodsid,
                    order_userid: wx.getStorageSync('user_id'),
                    pay_way: 2,
                    order_addressid: this.data.address.address_id,
                    payway: 'wx',
                    remarks: this.data.message,
                    user_invitecode: wx.getStorageSync('invitecode')
                },
                method: 'GET', 
                success: res=> {
                    wx.request({
                        url: 'https://rtd.laoyouta.com/index.php/home/Wxpay/xcx_jsapi_pay',
                        data: {
                            goods_id: this.data.goodslist.integral_goodsid,
                            out_trade_no: res.data.order_serial,
                            user_id: wx.getStorageSync('user_id')
                        },
                        success: (r)=> {
                            if (res.data.code == '200') {
                                wx.requestPayment({
                                    timeStamp: String(r.data.timeStamp),
                                    nonceStr: r.data.nonceStr,
                                    package: r.data.package,
                                    signType: r.data.signType,
                                    paySign: r.data.paySign,
                                    success: v=> {
                                        wx.navigateTo({
                                            url: '/pages/order/order'
                                        })
                                    },
                                })
                            }
                        }
                    })
                },
            })
        }
    }
})