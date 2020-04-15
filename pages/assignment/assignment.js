
Page({
    data: {
        height: 0,
        mainHeight1: 0,
        mainHeight2: 0,
    },
    onLoad() {
        wx.getSystemInfo({
            success: res=> {
                this.setData({
                    height: res.windowHeight,
                    mainHeight1: res.windowHeight*0.4,
                    mainHeight2: res.windowHeight*0.6
                })
            }
        })
        
    },
    formSubmit(e) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/integral/give_integral',
            data: {
                user_id: wx.getStorageSync('user_id'),
                friendtel: e.detail.value.phone,
                give_integarl: e.detail.value.integral,
                suretosend: 1
            },
            method: 'GET', 
            success: res=>{
                wx.showToast({
                    title: '积分已转让',
                    success() {
                        setTimeout(()=> {
                            wx.navigateBack({
                                delta: 1,
                            })
                        },1500)
                    }
                }) 
            }
        })
    },
    bindblur(e) {
        var pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        if(!pattern.test(e.detail.value)) {
            wx.showToast({
                icon: 'none',
                title: '手机号格式不正确'
            })
        }
    }
})