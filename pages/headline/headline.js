const utils = require("../../utils/util")
let touchDot = 0;
let index = 0;
Page({
    data: {
        classify: [], //文章分类
        id: '', //默认显示
        specialList: [], //文章列表
        selectedId: '', //被选中分类id,
        isShow: '', //判断是不是防骗
        page: 1,
    }, 
    onLoad() {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/Api/Category/getArticleCate',
            data: {
                user_id: wx.getStorageSync('user_id')
            },
            method: 'GET', 
            success: res=> {
                return new Promise((resolve,reject)=> {
                    this.setData({
                        classify: res.data.data,
                        id: res.data.data[0].type_id,
                        selectedId: res.data.data[0].type_id,
                    })
                    resolve()
                }).then(()=> {
                    wx.request({
                        url: 'https://rtd.laoyouta.com/index.php/home/Category/getArticlelist',
                        data: {
                            id: this.data.id,
                            user_id: wx.getStorageSync('user_id')
                        },
                        method: 'GET', 
                        success: re=>{
                            this.setData({
                                specialList: re.data.data
                            })
                        }
                    })
                })
            },
        })
    },
    change(e) {
        index = e.currentTarget.dataset.index;
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/Category/getArticlelist',
            data: {
                id: e.currentTarget.dataset.id,
                user_id: wx.getStorageSync('user_id')
            },
            method: 'GET', 
            success: re=>{
                if(e.currentTarget.dataset.id == 21) {
                    this.setData({
                        isShow: true,
                        specialList: re.data.data,
                        selectedId: e.currentTarget.dataset.id,
                        page: 1,
                    })
                }else {
                    this.setData({
                        specialList: re.data.data,
                        selectedId: e.currentTarget.dataset.id,
                        page: 1,
                        isShow: false
                    })
                }
            }
        })
    },
    shield(e) {
        wx.showModal({
            title: '您确认要屏蔽此文章吗',
            success: re=> {
                if(re.confirm) {
                    wx.request({
                        url: 'https://rtd.laoyouta.com/index.php/home/article/shield_article',
                        data: {
                            user_id: wx.getStorageSync('user_id'),
                            article_id: e.currentTarget.dataset.articleid
                        },
                        method: 'GET', 
                        success: res=> {
                           if(res.data.code == 200) {
                                let xxx = e.currentTarget.dataset.index;
                                let arr = this.data.specialList
                                arr.splice(xxx, 1)
                                this.setData({
                                    specialList: arr
                                })
                                wx.showToast({
                                   title: res.data.text,
                                   icon: 'none'
                                })
                           }
                        }
                    })
                }else if(re.cancle) {

                }
            }
        })
        
    },
    toRead(e) {
        wx.navigateTo({
            url: '/pages/read/read?article_id=' + e.currentTarget.dataset.articleid,
        })
    },
    toOther() {
        wx.navigateToMiniProgram({
            appId: "wx75407bb42ff23b48",
            complete: res=> {
                console.log(res)
            }
        })
    },
    touchstart(e) {
        touchDot = e.changedTouches[0].pageX;
    },
    touchend(e) {
        if(touchDot-e.changedTouches[0].pageX > 50 && index < 4) {
            index ++;
            this.request()
        }
        if(e.changedTouches[0].pageX - touchDot > 50 && index >0){
            index --;
            this.request()
        }
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
                id: this.data.selectedId,
                user_id: wx.getStorageSync('user_id')
            },
            url: 'https://rtd.laoyouta.com/index.php/home/Category/getArticlelist',
        })
    },
    /**
     * 滑动切换分类
     */
    request() {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/Category/getArticlelist',
            data: {
                id: this.data.classify[index].type_id
            },
            method: 'GET', 
            success: re=>{
                if(this.data.classify[index].type_id == 21) {
                    this.setData({
                        isShow: true,
                        specialList: re.data.data,
                        selectedId: this.data.classify[index].type_id,
                        page: 1,
                    })
                }else {
                    this.setData({
                        specialList: re.data.data,
                        selectedId: this.data.classify[index].type_id,
                        page: 1,
                        isShow: false
                    })
                }
            }
        })
    }
})