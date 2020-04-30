var t = getApp();

Page({
    data: {
        hidden: !1
    },
    onShow: function() {
        var t = this;
        wx.getStorageSync("token");
        t.storeList();
    },
    storeList: function() {
        var e = this, a = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("store"),
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                void 0 != t.data && e.setData({
                    list: t.data,
                    hidden: !0
                });
            }
        });
    },
    onChangeShowAttention: function() {
        var e = this, a = wx.getStorageSync("token"), n = wx.getStorageSync("user_id");
        wx.request({
            url: t.apiUrl("store/attention"),
            data: {
                id: n
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            method: "POST",
            success: function(t) {
                e.setData({
                    collect: t.data.collect,
                    store_num: t.data.collnum
                });
            }
        });
    },
    siteDetail: function(e) {
        var a = this, n = e.currentTarget.dataset.index, o = a.data.index.goods_list[n].goods_id;
        t.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        }), wx.navigateTo({
            url: "../goods/index?objectId=" + o
        });
    },
    commonNav: function() {
        var t = this;
        t.setData({
            nav_select: !t.data.nav_select
        });
    },
    nav: function(t) {
        var e = t.currentTarget.dataset.index;
        "home" == e ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == e ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == e ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == e && wx.switchTab({
            url: "../user/index"
        });
    }
});