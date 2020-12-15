// pages/mall/mall.js
Page({

    /**
     * 页面的初始数据
     */
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