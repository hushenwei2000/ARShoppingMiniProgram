Page({


  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    var that = this
    var mc = that.data.modcount
    wx.request({
      url: 'http://zs3.lwydev.xyz/product/list',
      method: 'POST',
      data: {
        page: 1,
        token: '5kGjcBKfuLD217neT63+T1fCkmk+9ZOL7O46zntd+n0lcYB+5jtdKIYmhSzKguLJ0b55aa13c659f741dab00eb9c6965ba7'
      },
      complete(res) {
        console.log(res.data.data.productlist)
        that.setData({
          products: res.data.data.productlist
        })
        that.selectComponent('#component1').updatepts()
        that.selectComponent('#component2').updatepts()
      }
    })
  },
  data: {
    products: [],
    searchResult: [],
    showSearch: false,
    searchResult: [],
    modcount: 0,
    imgs: [
      '/image/banner3.jpg',
      '/image/banner2.jpg',
    ]
  },
  //事件处理函数
  bindViewTap: function () {
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
  },

  handleSearchItemTap(e) {
    var name = e.target.dataset.name || e.currentTarget.dataset.name
    console.log(name)
    wx.navigateTo({
      url: '/pages/detail/detail?name=' + name,
      complete(res) {
        console.log(res)
      }
    })
  },

  debounce(searchKey) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      this.requestForSearch(searchKey)
    }, 500)
  },

  requestForSearch(searchKey) {
    wx.request({
      url: 'http://zs3.lwydev.xyz/product/search',
      method: 'POST',
      data: {
        name: searchKey,
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