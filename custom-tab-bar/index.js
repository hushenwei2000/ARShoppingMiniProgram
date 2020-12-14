Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "pages/index/index",
      iconPath: "/image/house.png",
      selectedIconPath: "/image/househl.png",
      text: "首页"
    }, {
      pagePath: "pages/index/index",
      iconPath: "/image/bag.png",
      selectedIconPath: "/image/baghl.png",
      text: "商城"
    }, {
      pagePath: "pages/index/index",
      iconPath: "/image/camera.png",
      selectedIconPath: "/image/camera.png",
      text: ""
    }, {
      pagePath: "pages/index/index",
      iconPath: "/image/carthl.png",
      selectedIconPath: "/image/carthl.png",
      text: "收藏"
    }, {
      pagePath: "pages/index/index",
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
      this.setData({
        selected: data.index
      })
    }
  }
})