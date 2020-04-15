Page({
    data: {
        nickName: ''
    },
    onLoad() {

    },
    formSubmit: function (e) {
        wx.setStorageSync('user_nick', e.detail.value.nickname)
        this.setData({
            nickName: e.detail.value.nickname
        })
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/info/editinfo',
            data: {
                user_token: wx.getStorageSync('user_token'),
                user_nick: e.detail.value.nickname,
                type: 'user_nick'
            },
            method: 'GET',
            success: function (res) {

            },
        })
    },
    toPersonal() {
        const uPattern = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,20}$/;
        if (!uPattern.test(this.data.nickName)) {
            wx.showToast({
                title: '昵称格式错误'
            })
        }else {
            wx.showToast({
                title: '修改成功',
                success: function () {
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 1, 
                        })
                    }, 1000);
                }
            })  
        }
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