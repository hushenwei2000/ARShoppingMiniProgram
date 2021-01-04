Page({
    data: {
        isLoggedIn: false
    },
    onShow() {
        var u = getApp().globalData.username
        console.log(u)
        if(u) {
            this.setData({
                isLoggedIn: true
            })
        }
    },
    login() {
        wx.navigateTo({
          url: '/pages/login/login',
        })
    }
})