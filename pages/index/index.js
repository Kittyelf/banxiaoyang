const utils = require("../../utils/util")
Page({
    data: {
        Route: '',
        person_class: [], //热门分类
        tofu: [],  //专题
        carousel: [], //轮播图
        specialList: [], //热门推荐
        page: 1,
        isShow: false
    },
    onLoad(options) {
        /**
         * 点击分享卡片跳转到指定页面
         */
        if(options.id) {
            wx.navigateTo({
                url: '/pages/goodsDetails/goodsDetails?id=' + options.id,
            })
        }
        /**
         * 每日签到
         */
        if(wx.getStorageSync('user_id')) {
            wx.request({
                url: 'https://rtd.laoyouta.com/index.php/home/integral/sign_user',
                data: {
                    sign_userid: wx.getStorageSync('user_id'),
                    detail_taskid: 4
                },
                method: 'GET', 
                success: res=> {
                    if(res.data.code == '200') {
                        this.setData({
                            isShow: true
                        })
                    }else {
                        console.log(res.data.text)
                    }
                }
            })
        }
        /**
         * 获取首页导航专题分类等数据
         */
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/index/index_getCate',
            data: {},
            method: 'GET',
            success: res=> {
                this.setData({
                    person_class: res.data.data.person_class,
                    tofu: res.data.data.tofu,
                    carousel: res.data.data.carousel
                })
            }
        })
        /**
         * 获取热门推荐数据
         */
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/index/getIntelist',
            data: {
                page: '1'
            },
            method: 'GET',
            success: res=> {

                this.setData({
                    specialList: res.data.data
                })
            }
        })
    },
    toSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
    /**
     * 跳转到各种专题
     */
    toSpecial(e) {
        wx.navigateTo({
            url: '/pages/special/special?id=' + e.currentTarget.dataset.id,
        })
    },
    /**
     * 跳转到分类
     */
    toClassification(e) {
        wx.navigateTo({
            url: '/pages/classification/classification?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title,
        })
    },
    /**
     * 跳转到商品详情
     */
    toGoodsDetails(e) {
        wx.navigateTo({
            url: '/pages/goodsDetails/goodsDetails?id=' + e.currentTarget.dataset.id,
        })
    },
    /**
     * 轮播图 
     */
    carousel(e) {
        if (e.currentTarget.dataset.acquisitiontype == '3') {
            wx.navigateTo({
                url: '/pages/special/special?id=' + e.currentTarget.dataset.id,
            })
        } else if (e.currentTarget.dataset.acquisitiontype == '7') {
            wx.navigateTo({
                url: '/pages/goodsDetails/goodsDetails?id=' + e.currentTarget.dataset.id,
            })
        }
    },
    signIn() {
        this.setData({
            isShow: false
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
            url: 'https://rtd.laoyouta.com/index.php/home/index/getIntelist',
        })
    }
})