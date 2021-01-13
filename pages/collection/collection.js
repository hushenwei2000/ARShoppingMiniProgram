Page({

    onShow() {
        var t = getApp().globalData
        console.log(t)
        if (t.token) {
            this.setData({
                globalToken: t.token
            })
        }
        this.updateList()
    },

    updateList() {
        var fl = []
        var i = 0
        var globalToken = this.data.globalToken
        var obj = null
        var that = this
        console.log(globalToken)
        wx.request({
            url: 'http://zs3.lwydev.xyz/favor/list',
            method: 'POST',
            data: {
                token: globalToken,
                page: 1
            },
            success(res) {
                fl = res.data.data.favorlist
                if (!fl) {
                    return
                }
                console.log(fl)
                for (; i < fl.length; i++) {
                    obj = fl[i]
                    obj.grey = obj.status == 1 ? false : true
                    obj.desc = obj.status == 1 ? '有货' : obj.status == 2 ? '缺货' : '已下架'
                }
                console.log(fl)
                that.setData({
                    list: fl
                })
            }
        })
    },

    data: {
        list: [],
        globalToken: ''
    },
    handleItemTap(e) {
        var name = e.target.dataset.name || e.currentTarget.dataset.name
        console.log(name)
        wx.navigateTo({
            url: '/pages/detail/detail?name=' + name,
        })
    },
    deleteImage: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        var globalToken = this.data.globalToken

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
                wx.request({
                    url: 'http://zs3.lwydev.xyz/favor/delete',
                    method: 'POST',
                    data: {
                        token: globalToken,
                        id
                    },
                    success(res) {
                        console.log(res)
                    }
                })
                
            }
        })
    }
})