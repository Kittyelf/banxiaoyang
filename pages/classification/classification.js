const utils = require("../../utils/util")
Page({
    data: {
        specialList: [], //分类列表
        id: '', //分类id
        page: 1
    },
    onLoad(options) {
        this.setData({
            id: options.id
        })
        wx.setNavigationBarTitle({
            title: options.title,
        })
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/index/getInteclasslist',
            data: {
                id: options.id,
                page: '1',
                user_id: wx.getStorageSync('user_id')
            },
            method: 'GET',
            success: (res) => {
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
                id: this.data.id,
                user_id: wx.getStorageSync('user_id')
            },
            url: 'https://rtd.laoyouta.com/index.php/home/index/getInteclasslist',
        })
    }
})