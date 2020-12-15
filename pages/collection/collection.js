Page({

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