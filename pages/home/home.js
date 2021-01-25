var globalData = getApp().globalData

Page({
    data: {
        isLoggedIn: false,
        username: '',
        products: [],
        hotproducts: [],
        nohistory: true
    },
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
              selected: 4
            })
          }
        var u = globalData.username
        var that = this
        if(u) {
            this.setData({
                isLoggedIn: true,
                username: u
            })
            this.updateHistory()
        }
        wx.request({
            url: 'http://zs3.lwydev.xyz/product/list',
            method: 'POST',
            data: {
              page: 1,
              token: '5kGjcBKfuLD217neT63+T1fCkmk+9ZOL7O46zntd+n0lcYB+5jtdKIYmhSzKguLJ0b55aa13c659f741dab00eb9c6965ba7'
            },
            complete(res) {
              that.setData({
                hotproducts: res.data.data.productlist
              })
              that.selectComponent('#component2').updatepts()
            }
          })
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
                    that.setData({
                        nohistory: true
                    })
                    return
                }
                r = r.reverse()
                that.setData({
                    nohistory: false,
                    products: r
                })
                that.selectComponent("#component1").updatepts()
            }
          })
    },

    logout() {
        var that = this
        wx.showModal({
            title: '提示',
            content: '要退出登录吗？',
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        isLoggedIn: false
                    })
                } else if (res.cancel) {
                    return false;
                }
            }
        })
        
    }
})