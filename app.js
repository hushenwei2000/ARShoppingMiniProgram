//app.js
App({
  onLaunch: function () {
    var that = this
    wx.getStorage({
      key: 'username',
      success (res) {
        console.log(res)
        that.globalData.username = res.data
      },
      fail(res) {
        console.log(res)
      }
    })
    wx.getStorage({
      key: 'token',
      success (res) {
        console.log(res)
        that.globalData.token = res.data
      }
    })
  },
  globalData: {
    username: '',
    token: '',
  }
})