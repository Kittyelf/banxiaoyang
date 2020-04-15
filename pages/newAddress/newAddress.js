const app = getApp();
Page({
    data: {
        city: '请选择城市',
        address_state: '2',
        integral_goodsid: ''
    },
    onLoad(options) {
        this.setData({
            integral_goodsid: options.integral_goodsid || ''
        })
    },
    setDefault() {
        if(this.data.address_state == '2') {
            wx.setStorageSync('address_state', '1')
            this.setData({
                address_state: '1'
            })
        } else if (this.data.address_state == '1') {
            wx.setStorageSync('address_state', '2')
            this.setData({
                address_state: '2'
            })
        }
    },
    /**
     * 表单提交
     */
    formSubmit: function(e) {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/address/add_address',
            data: {
                address_userid: wx.getStorageSync('user_id'),
                address_state: wx.getStorageSync('address_state') || '1',
                address_province: e.detail.value.city[0],
                address_city: e.detail.value.city[1],
                address_area: e.detail.value.city[2],
                address_detail: e.detail.value.address,
                address_telephone: e.detail.value.phone,
                address_name: e.detail.value.name,
            },
            method: 'GET', 
            success:res=> {
                if (this.data.integral_goodsid) {
                    wx.redirectTo({
                        url: '/pages/selectAddress/selectAddress?integral_goodsid=' + this.data.integral_goodsid
                    })
                } else {
                    wx.redirectTo({
                        url: '/pages/address/address',
                    })
                }
            },
        })
    },
    choiceCity(e) {
        this.setData({
            city: e.detail.value
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