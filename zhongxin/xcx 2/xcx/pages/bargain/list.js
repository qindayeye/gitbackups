function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), n = e.apiUrl("bargain/list"), i = 1, o = function(t) {
    var a = wx.getStorageSync("token");
    wx.getStorageSync("user_id");
    1 == t.data.isListData && wx.request({
        url: n,
        data: {
            page: i,
            per_page: 100
        },
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": a
        },
        method: "POST",
        success: function(a) {
            for (var e = t.data.index, n = 0; n < a.data.data.length; n++) e.push(a.data.data[n]);
            t.setData({
                index: e,
                isListData: "" != a.data.data
            }), i++;
        }
    });
};

Page((a = {
    data: {
        index: [],
        iphoneView: !0,
        hidden: !0,
        indicatorDots: !0,
        autoplay: !0,
        interval: 4e3,
        duration: 1e3,
        hasLocation: !1,
        isListData: !0
    },
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight - 50
                });
            }
        });
        var a = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("bargain"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(a) {
                t.setData({
                    banner: a.data.data.banner
                });
            }
        }), i = 1, o(t), this.loadingChange();
    },
    scroll: function(t) {
        t.detail.scrollTop > 500 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    siteDetail: function(t) {
        var a = this, n = t.currentTarget.dataset.index, i = a.data.index[n].id;
        e.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        }), wx.navigateTo({
            url: "../bargain/goods?objectId=" + i
        });
    },
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 1e3);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    commonNav: function() {
        var t = this;
        t.setData({
            nav_select: !t.data.nav_select
        });
    },
    nav: function(t) {
        var a = t.currentTarget.dataset.index;
        "home" == a ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == a ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == a ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == a && wx.switchTab({
            url: "../user/index"
        });
    },
    bindDownLoad: function() {
        var t = this;
        o(this), this.setData({
            bottomloading: "active"
        }), setTimeout(function() {
            t.setData({
                bottomloading: ""
            });
        }, 500);
    }
}, t(a, "scroll", function(t) {
    this.setData({
        scrollTop: t.detail.scrollTop
    });
}), t(a, "onShareAppMessage", function() {
    return {
        title: "小程序首页",
        desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
        path: "/pages/index/index"
    };
}), a));