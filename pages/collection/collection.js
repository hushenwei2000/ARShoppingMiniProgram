Page({

    data: {
        list: [{
            img: "/image/cloth1.jpg",
            title: "女装 2020巴黎世家高级轻型羽绒茧形连帽外套 429458",
            price: 12340,
            desc: "缺货",
            grey: true
        }, {
            img: "/image/cloth2.jpg",
            title: "女装 2020巴黎世家高级轻型羽绒茧形连帽外套 429458",
            price: 12340,
            desc: "已下架",
            grey: true

        }, {
            img: "/image/cloth3.jpg",
            title: "女装 2020巴黎世家高级轻型羽绒茧形连帽外套 429458",
            price: 12340,
            desc: "购买",
            grey: false
        }],
    },
    handleItemTap(e) {
        wx.navigateTo({
            url: '/pages/detail/detail',
            complete(res) {
                console.log(res)
            }
        })
    },
    deleteImage: function (e) {
        var that = this;
        var list = that.data.list;
        var index = e.currentTarget.dataset.index;
        wx.showModal({
            title: '提示',
            content: '确定要取消收藏此商品吗？',
            success: function (res) {
                if (res.confirm) {
                    list.splice(index, 1);
                } else if (res.cancel) {
                    return false;
                }
                that.setData({
                    list
                });
            }
        })
    }
})