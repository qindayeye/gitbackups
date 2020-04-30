var t = getApp(), a = 0;

Page({
    data: {},
    onLoad: function(e) {
        var n = this, o = wx.getStorageSync("token");
        a = e.objectId, wx.request({
            url: t.apiUrl("goods/detail"),
            data: {
                id: a
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(t) {
                n.setData({
                    goodsComment: t.data.data.goods_comment
                });
            }
        }), this.loadingChange();
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
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 1e3);
    }
});