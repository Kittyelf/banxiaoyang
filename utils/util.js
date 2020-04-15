const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @method 用于下拉刷新
 * 
 * @param {Object}
 */
const onReachBottom = ({that,data,url}) =>{
  wx.showToast({
    title: '加载更多数据',
    icon: 'loading',
  }),
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      success: res => {
        if (res.data.data.length > 0) {
          that.setData({
            specialList: that.data.specialList.concat(res.data.data)
          }, () => {
            wx.hideLoading()
          })
        } else {
          wx.showToast({
            title: '已经到底了'
          })
          setTimeout(() => {
            wx.hideLoading()
          }, 1500)
        }
      }
    })
}

/**
 * @method 用于修改个人资料(除了头像)
 * 
 * @param {data} 传给后台的数据 
 */
const modify = ({ data }) => {
  wx.request({
    url: 'https://rtd.laoyouta.com/index.php/home/info/editinfo',
    data: data ,
    method: 'GET',
    success: function (res) {
      wx.showToast({
        title: res.data.text
      })
    },
  })
}
module.exports = {
  formatTime: formatTime,
  modify,
  onReachBottom
}
