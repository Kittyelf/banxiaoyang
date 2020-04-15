const qiniuUploader = require("../../utils/qiniuUploader");
const utils = require("../../utils/util")
Page({
    data: {
        date: '',   //生日
        city: '',
        sculpture: '', //头像
        isShow: false,
        sex: '',  //男或女
        nickname: '',  //昵称
        phone: '',  //手机号
    },
    onLoad() {
        this.setData({
            sculpture: wx.getStorageSync('imageURL'),
        })
        wx.request({
            url: 'https://rtd.laoyouta.com/index.php/home/info/index',
            data: {
                user_token: wx.getStorageSync('user_token') 
            },
            method: 'GET', 
            success: res=> {
                const reg = /^wx_/;
                wx.setStorageSync('user_invitecode',res.data.member_info.user_invitecode)
                this.setData({
                    date: res.data.member_info.user_birthday || '',
                    city: res.data.member_info.user_area,
                    nickname: res.data.member_info.user_nick,
                    phone: reg.test(res.data.member_info.user_telephone) ? '' : res.data.member_info.user_telephone,
                    sex: res.data.member_info.user_gendle
                })
            },
        })
    },
    onShow() {
        this.setData({
            nickname: wx.getStorageSync('user_nick')
        })
    },
    /**
     * 选择头像
     */
    chooseImage() {
        wx.chooseImage({
            count: 1,
            sourceType: ['album', 'camera'],
            success: res=> {
                var tempFilePath = res.tempFilePaths[0];
                console.log(tempFilePath)
                qiniuUploader.upload(tempFilePath,v=>{
                    wx.setStorageSync('imageURL', `http://img.laoyouta.com/${v.key}`)
                    wx.request({
                        url: 'https://rtd.laoyouta.com/index.php/home/info/upimage',
                        data: {
                            filename: wx.getStorageSync('imageURL'),
                            user_token: wx.getStorageSync('user_token')
                        },
                        method: 'GET', 
                        success: (i)=>{
                            this.setData({
                                sculpture: wx.getStorageSync('imageURL')
                            })
                        },
                    })
                },error=> {
                    console.log(error)
                },{
                    region: 'ECN',
                    uploadURL: 'https://up.qbox.me',
                    domain: 'img.laoyouta.com',
                    uptoken: wx.getStorageSync('uptoken')
                })
            }
        })
    },
    /**
     * 跳转到修改昵称页面
     */
    toNickname() {
        wx.navigateTo({
            url: '/pages/nickname/nickname',
        })
    },
    /**
     * 修改性别
     */
    changeSex() {
        this.setData({
            isShow: true
        })
    },
    cancel() {
        this.setData({
            isShow: false
        })
    },
    choiceMan() {
        utils.modify({
            data: {
                user_token: wx.getStorageSync('user_token'),
                user_gendle: '1',
                type: 'user_gendle'
            }
        })
        wx.setStorageSync('sex', '1');
        this.setData({
            sex: '1',
            isShow: false
        })
    },
    choiceWoman() {
        utils.modify({
            data: {
                user_token: wx.getStorageSync('user_token'),
                user_gendle: '0',
                type: 'user_gendle'
            }
        }) 
        wx.setStorageSync('sex', '0');
        this.setData({
            sex: '0',
            isShow: false
        })
    },
    /**
     * 修改生日
     */
    changedate(e) {
        utils.modify({
            data: {
                user_token: wx.getStorageSync('user_token'),
                user_birthday: e.detail.value,
                type: 'user_birthday'
            }
        }) 
        wx.setStorageSync('date', e.detail.value)
        this.setData({
            date: wx.getStorageSync('date')
        })
    },
    /**
     * 修改所在地
     */
    changecity(e) {
        utils.modify({
            data: {
                user_token: wx.getStorageSync('user_token'),
                user_area: `${e.detail.value[0]},${e.detail.value[1]},${e.detail.value[2]}`,
                type: 'user_area'
            }
        }) 
        this.setData({
            city: e.detail.value
        })
    }
})