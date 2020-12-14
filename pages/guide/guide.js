// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522069454.jpg",
      "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2522778567.jpg",
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2523516430.jpg",
    ],
    img: "http://img.kaiyanapp.com/7ff70fb62f596267ea863e1acb4fa484.jpeg",
    currentSwiper: 0,
  },
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  handleNextPage() {
    this.setData({
      index: this.data.index + 1
    })
  },
  handleStart() {

  },
  handleSkip() {
    wx.navigateTo({
      url: 'pages/index/index',
      events: events,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }

})