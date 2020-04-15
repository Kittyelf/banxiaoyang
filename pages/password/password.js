Page({
    data: {
    },
    onLoad() {
    },
    /**
     * 返回上一页
     */
    back() {
        wx.navigateBack({
            delta: 1, 
        })
    }
})