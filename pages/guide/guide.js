Page({

  data: {
    guideList: [{
      img: "/image/guide1.png",
      title: "在家即可一键试衣",
      desc: "方便快捷，社恐福音"
    }, {
      img: "/image/guide2.png",
      title: "美妆魔镜一键试妆",
      desc: "色号搭配，一网打尽"
    }, {
      img: "/image/guide3.png",
      title: "心愿清单，时刻跟踪",
      desc: "实时更新官网库存"
    }],
    img: "http://img.kaiyanapp.com/7ff70fb62f596267ea863e1acb4fa484.jpeg",
    currentSwiper: 0,
    index: 1,
    buttonBgc: "#D78906"
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },

  handleTouchStart() {
    this.setData({
      buttonBgc: "#dd9519"
    })
  },
  handleTouchEnd() {
    this.setData({
      buttonBgc: "#D78906"
    })
  },
  handleSkip() {
    wx.switchTab({
      url: '/pages/index/index',
    })

  }

})