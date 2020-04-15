Page({
    data: {
        list: [],
        sum: 0
    },
    onLoad() {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/mine_integral',
            data: {
                detail_userid: wx.getStorageSync('user_id')
            },
            method: 'GET', 
            success: res=> {
                this.setData({
                    sum: res.data.sum
                })
            },
        })
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/integral_task',
            data: {
                detail_userid: wx.getStorageSync('user_id')
            },
            method: 'GET', 
            success: res=>{
                this.setData({
                    list: res.data.data
                })
            }
        })
    },
    toIntegralDetail() {
        wx.navigateTo({
            url: '/pages/IntegralDetail/IntegralDetail',
        })
    },
    toExplain() {
        wx.navigateTo({
            url: '/pages/explain/explain',
        })
    },
    toAssignment() {
        wx.navigateTo({
            url: '/pages/assignment/assignment',
        })
    },
    toSignIn() {
        wx.navigateTo({
            url: '/pages/signIn/signIn',
        })
    }
})