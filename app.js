//app.js

App({
  onLaunch: function(e) {
    wx.request({
      url: 'https://rtd.laoyouta.com/index.php/admin/common/gettoken',
      data: {},
      method: 'GET', 
      success: function(res){
        wx.setStorageSync('uptoken', res.data.uptoken)
      }
    })
    if(e.scene == 1007 || e.scene == 1008) {
      if(e.query.invitationcode) {
        wx.setStorageSync('invitecode', e.query.invitationcode)
      }
    }
  },
  onShow: function(e) {
    console.log(e)
    if(e.scene == 1007 || e.scene == 1008) {
      if(e.query.invitationcode) {
        wx.setStorageSync('invitecode', e.query.invitationcode)
     }
    }
  },
  globalData: {
  }
})
