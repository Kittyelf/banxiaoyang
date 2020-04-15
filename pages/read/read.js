Page({
    data: {
        article_url: ''
    },
    onLoad(options) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/article/article_detail',
            data: {
                article_id: options.article_id,
                record_userid: wx.getStorageSync('user_id')
            },
            method: 'GET', 
            success: res=> {
                this.setData({
                    article_url: res.data.data[0].article_url
                })
            }
        })
    }
})