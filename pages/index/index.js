
Page({
  data: {
    imgs: [
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522069454.jpg",
      "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2522778567.jpg",
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2523516430.jpg",
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
})
