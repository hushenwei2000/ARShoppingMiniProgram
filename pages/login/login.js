var interval = null
var app = getApp()

Page({
    data: {
        username: '',
        password: '',
        phone: '',
        codeMsg: '获取验证码',
        codeBgc: 'rgb(205,128,0)',
        loginState: true,
        time: 61
    },

    // 获取输入账号 
    usernameInput: function (e) {
        this.setData({
            username: e.detail.value
        })
    },

    // 获取输入密码 
    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    phoneInput: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },

    // 登录 
    login: function () {
        var that = this
        if (this.data.username.length == 0 || this.data.password.length == 0) {
            wx.showToast({
                title: '用户名和密码不能为空',
                icon: 'none',
                duration: 2000
            })
        }
        if (this.data.loginState) {
            // 发送登录请求
            wx.request({
                url: 'http://zs3.lwydev.xyz/user/usernamelogin',
                method: 'POST',
                data: {
                    username: this.data.username,
                    password: this.data.password
                },
                success(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 2000
                        })
                        app.globalData.username = that.data.username
                        app.globalData.token = res.data.data.token
                        wx.navigateBack({
                            delta: 0,
                        })
                    } else {
                        wx.showToast({
                            title: '用户名或密码错误！',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail(res) {
                    console.log(res)
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        } else {
            // 发送注册短信
            wx.request({
                url: 'http://zs3.lwydev.xyz/user/register',
                method: 'POST',
                data: {
                    username: this.data.username,
                    password: this.data.password,
                    phonenum: this.data.phone
                },
                success(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            duration: 2000
                        })
                        that.setData({
                            loginState: true
                        })
                    }else {
                        wx.showToast({
                            title: '注册失败，请稍后重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail(res) {
                    console.log(res)
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    },

    sendCode() {
        var that = this
        var currentTime = 60
        this.setData({
            codeBgc: '#ccc'
        })
        interval = setInterval(function () {
            currentTime--;
            that.setData({
                codeMsg: currentTime + 's',
            })
            if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                    codeMsg: '重新发送',
                    codeBgc: 'rgb(205,128,0)'
                })
            }
        }, 1000)
    },

    toggleRegister() {
        this.setData({
            loginState: false
        })
    }
})