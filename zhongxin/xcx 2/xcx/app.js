App({
    onLaunch: function() {
        this.getUserInfo();
    },
    getUserInfo: function(e) {
        var t = this;
        t.globalData.userInfo ? "function" == typeof e && e(t.globalData.userInfo) : wx.login({
            success: function(o) {
                var n = o.code;
                wx.getUserInfo({
                    withCredentials: !0,
                    lang: "zh_CN",
                    success: function(o) {
                        o.userInfo.code = n, t.doLogin(n, o), t.globalData.userInfo = o.userInfo, "function" == typeof e && e(t.globalData.userInfo);
                    },
                    fail: function(res) {
                        wx.showModal({
                            title: "温馨提示",
                            content: "请点击确定，跳转到会员中心点击授权登录",
                            success: function(o) {
                                o.confirm ? wx.getSetting({
                                    success: function(o) {
                                      t.switchTab("../user/index");
                                    }
                                }) : o.cancel && t.getUserInfo();
                            }
                        });
                    }
                });
            }
        });
    },
    doLogin: function(e, t) {
        var o = this;
        e ? wx.request({
            url: o.apiUrl("user/login"),
            method: "POST",
            data: {
                userinfo: t,
                code: e
            },
            success: function(e) {
                console.log(e.data)
                wx.setStorage({
                    key: "token",
                    data: JSON.parse(e.data.split("\n")[1]).token
                }), wx.setStorage({
                    key: "openid",
                    data: JSON.parse(e.data.split("\n")[1]).openid
                });
            }
        }) : console.log("获取用户登录态失败！" + res.errMsg);
    },
    globalData: {
        userInfo: null
    },
    apiUrl: function(e) {
      return "https://chinalife.giftservices.cn/mobile/public/api/wx/" + e;
    },
    shwomessage: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "warn";
        wx.showToast({
            title: e,
            icon: o,
            duration: t
        });
    },
    redirectTo: function(e) {
        wx.navigateTo({
            url: e
        });
    },
    switchTab: function (e) {
      wx.switchTab({
        url: e
      });
    },
    payOrder: function(e, t, o, n) {
        var a = this;
        wx.request({
            url: a.apiUrl("payment/pay"),
            data: {
                id: e,
                open_id: t,
                code: "order.pay"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            method: "POST",
            success: function(t) {
                if (500 != t.data.status_code) {
                    var i = t.data.data.wxpay;
                    "" != i && wx.requestPayment({
                        timeStamp: i.timestamp,
                        nonceStr: i.nonce_str,
                        package: i.packages,
                        signType: "MD5",
                        paySign: i.sign,
                        success: function(t) {
                            "requestPayment:ok" == t.errMsg && wx.request({
                                url: a.apiUrl("payment/notify"),
                                data: {
                                    id: e,
                                    form_id: n
                                },
                                method: "post",
                                header: {
                                    "Content-Type": "application/json",
                                    "X-ECTouch-Authorization": o
                                },
                                success: function(t) {
                                    0 == t.data.data.code ? (wx.showToast({
                                        title: "支付成功",
                                        duration: 2e3
                                    }), "" == t.data.data.extension_code && a.redirectTo("../order/index?objectId=" + e), 
                                    "team_buy" == t.data.data.extension_code && a.redirectTo("../group/wait?objectId=" + t.data.data.team_id + "&user_id=" + t.data.data.user_id), 
                                    "bargain_buy" == t.data.data.extension_code && a.redirectTo("../bargain/order/index?objectId=" + e)) : wx.showToast({
                                        title: "付款失败",
                                        image: "../../images/failure.png",
                                        duration: 2e3
                                    });
                                }
                            });
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: "支付失败",
                                image: "../../images/failure.png",
                                duration: 2e3
                            }), a.redirectTo("../order/index?objectId=" + e);
                        }
                    });
                } else wx.showToast({
                    title: "支付失败",
                    image: "../../images/failure.png",
                    duration: 2e3
                });
            }
        });
    },
    region: function() {
        var e = this, t = [], o = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("region/list"),
            data: {
                id: 1
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(e) {
                for (var o = e.data.data, n = [], a = [], i = 0; i < o.length; i++) {
                    n = o[i].region_name;
                    var r = {
                        province_id: a = o[i].region_id,
                        city_id: 0,
                        county_id: 0,
                        region_name: n,
                        region_id: a
                    };
                    t.push(r);
                    for (var s, c = o[i].region, d = [], u = 0; u < c.length; u++) {
                        var g = {
                            province_id: a,
                            city_id: u + 1,
                            county_id: 0,
                            region_name: d = c[u].region_name,
                            region_id: s = c[u].region_id
                        };
                        t.push(g);
                        for (var l, f = [], p = c[u].region, h = 0; h < p.length; h++) {
                            var w = {
                                province_id: a,
                                city_id: u + 1,
                                county_id: h + 1,
                                region_name: f = p[h].region_name,
                                region_id: l = p[h].region_id
                            };
                            t.push(w);
                        }
                    }
                }
                wx.setStorageSync("region", t);
            }
        });
    }
});