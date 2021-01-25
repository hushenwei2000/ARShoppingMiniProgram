Page({

    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
              selected: 3
            })
          }
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
        var uniq = []
        let set1 = new Set()
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
                    that.setData({
                        nolike: true
                    })
                    return
                }
                for (; i < fl.length; i++) {
                    if(!set1.has(fl[i].id)) {
                        set1.add(fl[i].id)
                    }else {
                        continue;
                    }
                    obj = fl[i]
                    obj.grey = obj.status == 1 ? false : true
                    obj.desc = obj.status == 1 ? '有货' : obj.status == 2 ? '缺货' : '已下架'
                    uniq.push(obj)
                }
                that.setData({
                    nolike: false,
                    list: uniq
                })
            }
        })
    },

    data: {
        list: [],
        globalToken: '',
        nolike: true
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
        var pid = e.currentTarget.dataset.id;
        var globalToken = this.data.globalToken
        var list = that.data.list;
        var index = e.currentTarget.dataset.index;
        var nolike = false;
        wx.showModal({
            title: '提示',
            content: '确定要取消收藏此商品吗？',
            success: function (res) {
                if (res.confirm) {
                    list.splice(index, 1);
                    if(list.length == 0) {
                        nolike = true
                    }
                } else if (res.cancel) {
                    return false;
                }
                that.setData({
                    list,
                    nolike
                });
                wx.request({
                    url: 'http://zs3.lwydev.xyz/favor/delete',
                    method: 'POST',
                    data: {
                        token: globalToken,
                        id: pid
                    },
                    success(res) {
                        console.log(res)
                    }
                })
            }
        })
    }
})