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


    validateLogin() {
        var username = this.data.username
        var password = this.data.password
        var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){2,19}$/;   
        if (!patrn.exec(username)) {
            wx.showToast({
                icon: 'none',
                title: '用户名必须以字母开头的3-20个、可带数字和下划线字符串'
            })
            return false
        }
        if(password.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '密码不能为空'
            })
            return false
        }
        return true
    },

    validateRegister() {
        var username = this.data.username
        var password = this.data.password
        var phone = this.data.phone
        console.log(username, password, phone)
        var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){2,19}$/;   
        if (!patrn.exec(username)) {
            wx.showToast({
                icon: 'none',
                title: '用户名必须以字母开头的3-20个、可带数字和下划线字符串'
            })
            return false
        }
        if(password.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '密码不能为空'
            })
            return false
        }
        if((/^1[3456789]d{9}$/.test(phone))) {
            wx.showToast({
                icon: 'none',
                title: '手机号格式不正确'
            })
            return false
        }
        return true
    },

    // 登录 
    login: function () {
        var that = this
        if (this.data.loginState) {
            // 发送登录请求
            if (!this.validateLogin()) {
                return;
            }
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
                        wx.setStorage({
                          data: that.data.username,
                          key: 'username',
                          success(res) {
                              console.log(res)
                          }
                        })
                        wx.setStorage({
                            data: res.data.data.token,
                            key: 'token',
                            success(res) {
                                console.log(res)
                            }
                          })
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
            if(!this.validateRegister()) {
                return false;
            }
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
                    wx.showToast({
                        title: '注册成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.setData({
                        loginState: true
                    })
                    // if (res.data.code == 0) {
                    //     wx.showToast({
                    //         title: '注册成功',
                    //         icon: 'success',
                    //         duration: 2000
                    //     })
                    //     that.setData({
                    //         loginState: true
                    //     })
                    // }else {
                    //     wx.showToast({
                    //         title: '注册失败，请稍后重试',
                    //         icon: 'none',
                    //         duration: 2000
                    //     })
                    // }
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
        if(!this.validateRegister()) {
            return false;
        }
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