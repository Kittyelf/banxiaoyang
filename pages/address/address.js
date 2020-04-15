
Page({
    data: {
        addressDetails: [], //收货地址
    },
    onLoad() {
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/address/index',
            data: {
                address_userid: wx.getStorageSync('user_id')
            },
            method: 'GET',
            success: res=> {
                this.setData({
                    addressDetails: res.data.data
                })
            }
        })
    },
    /**
     * 跳转到新建地址页面
     */
    toNewAddress() {
        wx.redirectTo({
            url: '/pages/newAddress/newAddress',
        })
    },
    /**
     * 跳转到编辑地址页面
     */
    toEditAddress(e) {
        wx.redirectTo({
            url: '/pages/editAddress/editAddress?address_id=' + e.currentTarget.dataset.addressid,
        })
    },
    /**
     * 删除收货地址
     */
    clearAddress(e) {
        wx.showModal({
            title: '确认要删除该地址吗？',
            confirmColor: '#E94718',
            success: res=> {
                if(res.confirm) {
                    wx.request({
                        url: 'https://rtd.laoyouta.com/index.php/home/address/del_address',
                        data: {
                            address_userid: wx.getStorageSync('user_id'),
                            address_id: e.currentTarget.dataset.addressid
                        },
                        method: 'GET',
                        success: function (res) {
                            if (res.data.code == '200') {
                                wx.redirectTo({
                                    url: '/pages/address/address'
                                })
                            }
                        },
                    })
                }
            }
        })
    },
})