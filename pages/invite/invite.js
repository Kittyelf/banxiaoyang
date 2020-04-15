Page({
    data: {
        height: 0,
        value: ''
    },
    onLoad() {
        wx.getSystemInfo({
            success: res=> {
                this.setData({
                    height: res.windowHeight,
                })
            }
        })
    },
    bindinput(e) {
        this.setData({
            value: e.detail.value
        })
    },
    bindconfirm(e) {
        this.setData({
            value: e.detail.value
        })
    },
    toMine() {
        if(this.data.value == wx.getStorageSync('invitecode')) {
            wx.request({
                url: 'https://rtd.laoyouta.com/index.php/home/Invitation/fullInvitation',
                data: {
                    other_invitation: this.data.value,
                    user_id: wx.getStorageSync('user_id')
                },
                method: 'GET',
                success: res=> {
                    wx.showToast({
                        title: res.text,
                        icon: 'none',
                        success: res=> {
                            setTimeout(() => {
                                wx.switchTab({
                                    url: '/pages/mine/mine',
                                })
                            }, 1500);
                        }
                    })
                },
            })
        }else {
            wx.showToast({
                title: '验证码输入错误',
                icon: 'none'
            })
        }
    }
})