const app = getApp()
Page({
    data: {
        orderDetails: [],  //商品详情
    },
    onLoad(options) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/order_detail',
            data: {
                order_userid: wx.getStorageSync('user_id'),
                order_id: options.orderid
            },
            method: 'GET',
            success: res=> {
                this.setData({
                    orderDetails: res.data.data[0]
                })
            }
        })
    },
    /**
     * 取消订单 即退款
     */
    refund(e) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/wxpay/refund',
            data: {
                user_id: wx.getStorageSync('user_id'),
                order_serial: e.currentTarget.dataset.orderserial
            },
            method: 'GET', 
            success: res=> {
                if (res.data.code == '1') {
                    wx.showToast({
                        title: res.data.text,
                        success: () => {
                            setTimeout(() => {
                                wx.redirectTo({
                                    url: '/pages/order/order'
                                })
                            }, 1500);
                        }
                    })
                }
            },
        })
    }
})