var a = getApp(), t = a.apiUrl("bargain/list"), e = 1, n = function(a) {
    var n = wx.getStorageSync("token");
    wx.getStorageSync("user_id");
    wx.request({
        url: t,
        data: {
            page: e,
            per_page: 10
        },
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": n
        },
        method: "POST",
        success: function(t) {
            void 0 != t.data.data && a.setData({
                index: t.data.data,
                hidden: !0
            });
        }
    });
};

Page({
    data: {
        index: [],
        iphoneView: !0,
        hidden: !1,
        indicatorDots: !0,
        autoplay: !0,
        interval: 4e3,
        duration: 1e3,
        hasLocation: !1
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
        var i = wx.getStorageSync("token");
        wx.request({
            url: a.apiUrl("bargain"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": i
            },
            success: function(a) {
                t.setData({
                    banner: a.data.data.banner
                });
            }
        }), e = 1, n(t);
    },
    siteDetail: function(t) {
        var e = this, n = t.currentTarget.dataset.index, i = e.data.index[n].id;
        a.getUserInfo(function(a) {
            e.setData({
                userInfo: a
            });
        }), wx.navigateTo({
            url: "../bargain/goods?objectId=" + i
        });
    },
    commonNav: function() {
        var a = this;
        a.setData({
            nav_select: !a.data.nav_select
        });
    },
    nav: function(a) {
        var t = a.currentTarget.dataset.index;
        "home" == t ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == t ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == t ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == t && wx.switchTab({
            url: "../user/index"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "砍价商城",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/bargain/index"
        };
    }
});