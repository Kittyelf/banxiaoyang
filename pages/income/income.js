Page({
    data: {
        user_id: ''
    },
    onLoad() {
        this.setData({
            user_id: wx.getStorageSync('user_id')
        })
        console.log('https://rtd.laoyouta.com/h5/mymoney/index.html?userid=' + this.data.user_id)
    }
})