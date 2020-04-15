const app = getApp();
const utils = require('../../utils/util')
Page({
    data: {
        count: [], //待发货和待收货的数量
        orderList: [],  //全部订单
        goods_state: 0, //初始状态
        isShow: true, //显示全部
        mainImg:[]
    },
    onLoad() {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/order_list',
            data: {
                order_userid: wx.getStorageSync('user_id')
            },
            method: 'GET', 
            success: res=> {
              console.log(res.data.data)
              var imgs = []
                this.setData({
                    count: res.data.count,
                    orderList: res.data.data
                })
              for (var index in res.data.data) {
                // console.log(this.data.orderList[index].integral_goodsimg)
                imgs.push(this.data.orderList[index].integral_goodsimg.split(',')[0])
              }
              this.setData({
                mainImg: imgs
              })
            },
        })
    },
    /**
     * 跳转到订单详情页面
     */
    toOrderDetails(e) {
        wx.navigateTo({
            url: '/pages/orderDetails/orderDetails?orderid=' + e.currentTarget.dataset.orderid,
        })
    },
    toCompleted(e) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/order_confirm',
            data: {
                order_userid: wx.getStorageSync('user_id'),
                order_id: e.currentTarget.dataset.orderid
            },
            method: 'GET', 
            success: function(res){
                wx.showModal({
                    content: '确认收货吗？',
                    success: function () {
                        wx.redirectTo({
                            url: '/pages/order/order',
                        })
                    }
                })
            },
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
            success: res => {
                console.log(res)
                if(res.data.code == '1') {
                    wx.showToast({
                        title: res.data.text,
                        success: ()=> {
                            setTimeout(() => {
                                wx.redirectTo({
                                    url: '/pages/order/order'
                                })
                            }, 1000);
                        }
                    })
                }
            },
        })
    },
    /**
     * 全部
     */
    whole() {
        this.setData({
            isShow: true
        })
    },
    /**
     * 待发货
     */
    delivery() {
        this.setData({
            goods_state: '1',
            isShow: false
        })
    },
    /**
     * 待收货
     */
    received() {
        this.setData({
            goods_state: '2',
            isShow: false
        })
    },
    /**
     * 已完成
     */
    complete() {
        this.setData({
            goods_state: '3',
            isShow: false
        })
    },
    /**
     * 已取消
     */
    cancel() {
        this.setData({
            goods_state: '4',
            isShow: false
        })
    }
})