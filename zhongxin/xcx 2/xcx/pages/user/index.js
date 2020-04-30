var e, a, t = getApp();

Page({
    data: {
        userInfo: {},
        is_first_action: !0,
        userService: [ {
            name: "我的砍价",
            icon: "daojianfu",
            link: "../bargain/order/index",
            color: "#FF0C4B"
        }, {
            name: "我的拼团",
            icon: "shehuituanti",
            link: "../group/order/index",
            color: "#FFB80C"
        }, {
            name: "我的代言",
            icon: "tableshare",
            link: "../user/speak",
            color: "#00B9FD"
        }, {
            name: "增值发票",
            icon: "fapiaoguanli",
            link: "../invoice/create",
            color: "#FD4100"
        }, {
            name: "收货地址",
            icon: "dizhi",
            link: "../address/index",
            color: "#7ACF00"
        } ]
    },
    onShow: function() {
        var e = this;
        wx.setStorageSync("flowcheckout", {
            from: "user"
        }), a = wx.getStorageSync("goodshistory");
        var o = wx.getStorageSync("goodsNum");
        e.setData({
            goodsNum: o
        }), t.getUserInfo(function(a) {
            e.setData({
                userInfo: a
            });
        }), e.setData({
            is_first_action: !0
        }), this.setData({
            recommend: "",
            orderNum: ""
        }), e.user();
    },
    user: function() {
        var e = this, o = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user"),
            data: {
                per_page: "10",
                page: "1",
                list: a
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            method: "POST",
            success: function(a) {
                e.setData({
                    recommend: a.data.data.best_goods,
                    orderNum: a.data.data.order,
                    user: a.data.data,
                    hidden: !0
                });
            }
        });
    },
    invoiceNav: function(a) {
        var o = this;
        e = wx.getStorageSync("token"), 1 == o.data.is_first_action && (o.setData({
            is_first_action: !1
        }), wx.request({
            url: t.apiUrl("user/invoice/detail"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(e) {
                0 != e.data.data ? wx.navigateTo({
                    url: "../invoice/detail"
                }) : wx.navigateTo({
                    url: "../invoice/create"
                }), o.setData({
                    invoices: e.data.data
                });
            }
        }));
    },
    userAddress: function(e) {
        wx.navigateTo({
            url: "../address/index"
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        wx.showNavigationBarLoading(), e.user(), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500);
    },
    onShareAppMessage: function() {
        return {
            title: "小程序首页",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/user/user"
        };
    }
});