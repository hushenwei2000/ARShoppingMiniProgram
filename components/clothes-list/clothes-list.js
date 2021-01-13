// components/formid_btn/formid_btn.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tempData: {
            type: Object,
            value: {}
        },
        pts: {
            type: Array
        },
        modconut: {
            type: Number,
            value: 0
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        products: []
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handleItemTap(e) {
            var name = e.target.dataset.name || e.currentTarget.dataset.name
            console.log(name)
            wx.navigateTo({
                url: '/pages/detail/detail?name=' + name,
                complete(res) {
                    console.log(res)
                }
            })
        },
        updatepts() {
            var p = this.properties.pts
            for(var i = 0; i < p.length; i++) {
                var o = p[i]
                if(o.id == 2){
                    o.name = o.name + '1420880'
                }else if(o.id == 3) {
                    o.name = o.name + '2109729'
                }else if(o.id == 5) {
                    o.name = o.name + '5480200'
                }
            }

            this.setData({
                products: p
            })
        }
    },

    // lifetimes: {
    //     // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    //     attached() {
    //         this.setData({
    //             products: this.properties.products
    //         })
    //     }
    // },
    // observers: {
    //     'properties': function () {
    //         this.setData({
    //             products: this.properties.pts
    //         })
    //     },
    //     'modcount': function (newval) {
    //         console.log(newval)
    //         this.setData({
    //             products: this.properties.pts
    //         })
    //     }
    // }
})