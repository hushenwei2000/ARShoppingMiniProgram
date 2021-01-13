var globalData = getApp().globalData

Page({
    data: {
        isLoggedIn: false,
        username: '',
        products: []
    },
    onShow() {
        var u = globalData.username
        if(u) {
            this.setData({
                isLoggedIn: true,
                username: u
            })
            this.updateHistory()
        }
    },
    login() {
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },
    updateHistory() {
        var that = this
        var r = []
        wx.request({
            url: 'http://zs3.lwydev.xyz/history/list',
            method: 'POST',
            data: {
                page: 1,
                token: globalData.token
            },
            success(res) {
                console.log(res.data.data)
                r = res.data.data.historylist
                if(!r) {
                    return
                }
                r = r.reverse()
                that.setData({
                    products: r
                })
                that.selectComponent("#component1").updatepts()
            }
          })
    }
})