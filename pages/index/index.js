
Page({
  data: {
    imgs: [
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522069454.jpg",
      "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2522778567.jpg",
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2523516430.jpg",
    ],
    searchResult: [{name: 'aaaaaaa'},{name: 'aaaaaaa'},{name: 'aaaaaaa'},{name: 'aaaaaaa'}],
    showSearch: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShowInput() {
    this.setData({
      showSearch: true
    })
  },
  onHideInput() {
    this.setData({
      showSearch: false
    })
  },
  onInputTyping(e) {
    var that = this
    wx.request({
      url: 'http://zs3.lwydev.xyz/product/search',
      method: 'POST',
      data: {
        name: e.detail.inputVal,
        page: 1
      },
      success(res) {
        console.log(res)
        that.setData({
          searchResult: res.data.data.productlist
        })
      }
    })
  }
})
