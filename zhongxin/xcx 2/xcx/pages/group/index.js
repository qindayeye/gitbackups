var t = getApp(), a = "0";

Page({
    data: {
        hidden: !1,
        indicatorDots: !0,
        autoplay: !0,
        currentTab: 0,
        scrollLeft: 0,
        scrollTop: 0
    },
    onLoad: function() {
        var a = this;
        t.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
        var e = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("team/virtualOrder"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(t) {
                a.setData({
                    index_user: t.data.data
                });
            }
        }), a.homeCont(), a.groupList();
    },
    homeCont: function() {
        var a = this, e = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("team"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(t) {
                void 0 != t.data.data && a.setData({
                    index: t.data.data,
                    hidden: !0
                });
            }
        });
    },
    swichNav: function(e) {
        var o = this, n = wx.getStorageSync("token"), i = e.target.dataset.current;
        if ("home" != e.currentTarget.dataset.index ? (i > 3 ? o.setData({
            scrollLeft: 300
        }) : o.setData({
            scrollLeft: 0
        }), a = i, o.groupList(), wx.request({
            url: t.apiUrl("team/categoriesIndex"),
            method: "POST",
            data: {
                tc_id: i
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.data.title
                }), o.setData({
                    index: t.data.data
                });
            }
        })) : (a = 0, o.groupList(), o.homeCont(), wx.setNavigationBarTitle({
            title: "拼购"
        })), this.data.currentTaB == i) return !1;
        this.setData({
            currentTab: i
        }), this.setData({
            scrollTop: 0
        });
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        t.detail.scrollTop > 300 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
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
    groupChannel: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.index.team_categories_child[e].tc_id;
        wx.navigateTo({
            url: "../group/channel?objectId=" + o
        });
    },
    groupList: function() {
        var e = this, o = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("team/teamList"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            data: {
                page: "1",
                size: "40",
                tc_id: a
            },
            success: function(t) {
                e.setData({
                    list: t.data.data
                });
            }
        });
    },
    siteDetail: function(a) {
        var e = this, o = a.currentTarget.dataset.index, n = e.data.list[o].goods_id;
        t.getUserInfo(function(t) {
            e.setData({
                userInfo: t
            });
        }), wx.navigateTo({
            url: "../group/goods?objectId=" + n
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return {
            title: "小程序拼购",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/group/index"
        };
    }
});