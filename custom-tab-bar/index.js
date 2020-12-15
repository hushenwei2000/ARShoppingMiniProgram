Component({
  data: {
    selected: 0,
    "color": "rgb(155,155,155)",
    "selectedColor": "#CD8000",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/house.png",
      selectedIconPath: "/image/househl.png",
      text: "首页"
    }, {
      pagePath: "/pages/mall/mall",
      iconPath: "/image/bag.png",
      selectedIconPath: "/image/baghl.png",
      text: "商城"
    }, {
      pagePath: "/pages/index/index",
      iconPath: "/image/camera.png",
      selectedIconPath: "/image/camera.png",
      text: ""
    }, {
      pagePath: "/pages/collection/collection",
      iconPath: "/image/cart.png",
      selectedIconPath: "/image/carthl.png",
      text: "收藏"
    }, {
      pagePath: "/pages/home/home",
      iconPath: "/image/person.png",
      selectedIconPath: "/image/personhl.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      
      wx.switchTab({url})
      var that = this
      // setTimeout(() => {
        that.setData({
          selected: data.index
        })
      // }, 1000);
      
    }
  }
})