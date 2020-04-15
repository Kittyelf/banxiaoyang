const qiniuUploader = require("../../utils/qiniuUploader");
Page({
    data: {
        details:'', //订单数、详情数、钱包、积分
        avatarUrl: '',  //头像  暂且这么写
        nickName: '伴小羊', //昵称  暂且这么写
        isShow: '' //未授权时显示wx登录按钮
    },
    onLoad() {
        if (wx.getStorageSync('user_id') !== '') {
            wx.request({
                url: 'https://rtd.laoyouta.com/index.php/home/integral/info_mine',
                data: {
                    user_id: wx.getStorageSync('user_id') 
                },
                method: 'GET',
                success: res => {
                    wx.setStorageSync('isShow',false)
                    this.setData({
                        details: res.data,
                        avatarUrl: wx.getStorageSync('imageURL'),
                        nickName: wx.getStorageSync('user_nick'),
                        isShow: wx.getStorageSync('isShow')
                    })
                    console.log(this.data.avatarUrl)
                    console.log(this.data.nickName)
                },
            })
        }else {
            wx.setStorageSync('isShow', true)
            this.setData({
                isShow: wx.getStorageSync('isShow')
            })
        }
    },
    onShow() {
        this.setData({
            avatarUrl: wx.getStorageSync('imageURL'),
            nickName: wx.getStorageSync('user_nick')
        })
    },
    /**
     * 跳转到个人资料页面
     */
    toPersonal() {
        wx.navigateTo({
            url: '/pages/personal/personal',
        })
    },
    /**
     * 跳转到收货地址页面
     */
    toAddress() {
        wx.navigateTo({
            url: '/pages/address/address',
        })
    },
    /**
     * 跳转到订单页面
     */
    toOrder() {
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },
    /**
     * 跳转到设置页面
     */
    toSystem() {
        wx.showToast({
            title: '该功能暂未开放'
        })
        // wx.navigateTo({
        //     url: '/pages/system/setUp', 
        // })
    },
    toWallet() {
        wx.showToast({
            title: '该功能暂未开放'
        })
    },
    toExchange() {
        wx.navigateTo({
            url: '/pages/exchange/exchange',
        })
    },
    toIntegral() {
        wx.navigateTo({
            url: '/pages/integral/integral',
        })
        // wx.showToast({
        //     title: '该功能暂未开放'
        // })
    },
    toInvite() {
        wx.navigateTo({
            url: '/pages/invite/invite',
        })
    },
    toInviteCode() {
        wx.showToast({
            title: '该功能暂未开放'
        })
    },
    toIncome() {
        wx.navigateTo({
            url: '/pages/income/income',
        })
    },
    toService() {
        wx.showToast({
            title: '该功能暂未开放'
        })
    },
    toFeedback() {
        wx.showToast({
            title: '该功能暂未开放'
        })
    },
    shouquan(e) {
        wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
        wx.downloadFile({
            url: wx.getStorageSync('avatarUrl'),
            success: res=> {
                if(res.statusCode === 200) {
                    qiniuUploader.upload(res.tempFilePath, v => {
                        wx.setStorageSync('imageURL',`http://img.laoyouta.com/${v.key}`)
                    }, error => {
                        console.log(error)
                    }, {
                        region: 'ECN',
                        uploadURL: 'https://up.qbox.me',
                        domain: 'http://img.laoyouta.com',
                        uptoken: wx.getStorageSync('uptoken')
                    })
                }
            },
            fail: res=> {
                console.log(res)
            }
        })
        wx.login({
            success: res=> {
              if(res.code) {
                  wx.setStorageSync('code', res.code)
                    wx.request({
                      url: 'https://rtd.laoyouta.com/index.php/home/bdingwx/wxxcx_index',
                      data: {
                        encryptedData: e.detail.encryptedData,
                        js_code: res.code,
                        iv: e.detail.iv
                      },
                      method: 'GET',
                      success: v=> {
                        return new Promise((resolve,reject)=> {
                          const data = JSON.parse(v.data.trim());
                          wx.setStorageSync('user_id', data.member_info.user_id)
                          wx.setStorageSync('user_nick', data.member_info.user_nick)
                          wx.setStorageSync('user_token', data.member_info.user_token)
                          wx.setStorageSync('user_telephone', data.member_info.user_telephone)
                          wx.setStorageSync('user_mmm', data.member_info.user_mmm)
                          wx.setStorageSync('isShow',false)
                          resolve()
                        }).then(()=> {
                          wx.reLaunch({
                              url: '/pages/mine/mine',
                              success: function(res) {
                                  console.log(res)
                              },
                              complete: function(res) {
                                  console.log(res)
                              }
                          })
                        })
                      },
                    })
                }
            }
        })
    }
})