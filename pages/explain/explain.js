Page({
    data: {
        height: 0
    },
    onLoad() {
        wx.getSystemInfo({
            success: res=> {
                this.setData({
                    height: res.windowHeight -22
                })
            }
        })
    },
})