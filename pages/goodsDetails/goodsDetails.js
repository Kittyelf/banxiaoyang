Page({
    data: {
        goodslist: [], //商品列表
        integral_detail: [],  //图文详情
        integral_goodsimg: [],
        mainHeight: ''
    },
    onLoad(options) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/integral_goodsdetail',
            data: {
                integral_goodsid: options.id,
            },
            success: res=> {
                this.setData({
                    goodslist: res.data.goodslist[0],
                    integral_detail: res.data.goodslist[0].integral_detail.split(','),
                    integral_goodsimg: res.data.goodslist[0].integral_goodsimg.split(',')
                })
            }
        })
    },
    /**
     * 跳转到订单确认页面
     */
    toOrderConfirm(e) {
        if(wx.getStorageSync('user_id')) {
            wx.navigateTo({
                url: '/pages/orderConfirm/orderConfirm?goodsid=' + e.currentTarget.dataset.goodsid,
            })
        }
        else {
           Promise.resolve(wx.showLoading({
                title: '请先登录账号',
            })).then(()=>{
                setTimeout(()=>{
                    wx.switchTab({
                        url: '/pages/mine/mine'
                    })
                },1500)
            })
        }
    },
    onShareAppMessage: function(res) {
        return {
            title: this.data.goodslist.integral_goodsname,
            path: '/pages/index/index?id=' + this.data.goodslist.integral_goodsid + '&invitationcode=' +wx.getStorageSync('user_invitecode'),
            success: re=> {
                console.log(re)
            },
            fail: re=> {
                console.log(re)
            }
        }
    }
})