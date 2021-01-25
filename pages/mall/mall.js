// pages/mall/mall.js
Page({
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
    },
    data: {

    },
    handleItemTap(e) {
        wx.navigateTo({
            url: '/pages/detail/detail',
            complete(res) {
                console.log(res)
            }
        })
    }
})