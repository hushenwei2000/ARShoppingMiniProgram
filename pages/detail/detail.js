// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var name = options.name
        name = name.substr(0, 22)
        console.log(name)
        var that = this
        wx.request({
            url: 'http://zs3.lwydev.xyz/product/search',
            method: 'POST',
            data: {
                name,
                page: 1
            },
            success(res) {
                console.log(res)
                that.setData({
                    product: res.data.data.productlist[0]
                })
                that.addHistory()
            }
        })
    },

    handleLike() {
        wx.request({
            url: 'http://zs3.lwydev.xyz/favor/add',
            method: 'POST',
            data: {
                id: this.data.product.id,
                token: getApp().globalData.token
            },
            success(res) {
                console.log(res.data)
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success'
                })
            }
        })
    }, 

    addHistory() {
        wx.request({
            url: 'http://zs3.lwydev.xyz/history/add',
            method: 'POST',
            data: {
                id: this.data.product.id,
                token: getApp().globalData.token
            },
            success(res) {
                console.log(res)
            }
        })
    }
})