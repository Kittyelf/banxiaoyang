const utils = require("../../utils/util")
Page({
    data: {
        specialList: [],
        page: 1
    },
    onLoad() {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/index/getintegral',
            data: {},
            method: 'GET', 
            success: res=> {
               this.setData({
                   specialList: res.data.data
               })
            },
        })
    },
    toGoodsDetails(e) {
        wx.navigateTo({
            url: '/pages/goodsDetails/goodsDetails?id=' + e.currentTarget.dataset.id,
        })
    },
        /**
     * 上拉刷新
     */
    onReachBottom() {
        this.setData({
            page: this.data.page + 1
        })
        utils.onReachBottom({
            that: this,
            data: {
                page: this.data.page,
            },
            url: 'https://rtd.laoyouta.com/index.php/home/index/getintegral',
        })
    }
})