// components/formid_btn/formid_btn.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tempData: {
            type: Object,
            value: {}
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handleItemTap(e) {
            wx.navigateTo({
              url: '/pages/detail/detail',
              complete(res) {
                  console.log(res)
              }
            })
        }
    }
})