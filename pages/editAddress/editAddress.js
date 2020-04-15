const app = getApp();
Page({
    data: {
        city: '',
        address_state: '2',
        editAddress: [], //编辑地址初始值
        isShow: true,
        integral_goodsid: ''
    },
    onLoad(options) {
        this.setData({
            integral_goodsid: options.integral_goodsid || ''
        })
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/address/address_detail',
            data: {
                address_userid: wx.getStorageSync('user_id'),
                address_id: options.address_id
            },
            method: 'GET', 
            success: res=> {
                wx.setStorageSync('address_id', options.address_id)
                this.setData({
                    editAddress: res.data.data[0],
                    city: res.data.data[0].address_city,
                })
                wx.setStorageSync('address_province', res.data.data[0].address_province)
                wx.setStorageSync('address_city', res.data.data[0].address_city)
                wx.setStorageSync('address_area', res.data.data[0].address_area)
            },
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
            url: 'https://rtd.laoyouta.com/index.php/home/address/update_address',
            data: {
                address_userid: wx.getStorageSync('user_id'),
                address_id: wx.getStorageSync('address_id'),
                address_province: e.detail.value.city[0] || wx.getStorageSync('address_province'),
                address_city: e.detail.value.city[1] || wx.getStorageSync('address_city'),
                address_area: e.detail.value.city[2] || wx.getStorageSync('address_area'),
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
            city: e.detail.value,
            isShow: false
        })
    }
})