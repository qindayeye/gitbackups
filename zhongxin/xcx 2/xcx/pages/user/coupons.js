var t = getApp(), n = 0;

Page({
    data: {
        hiddenNo: !1,
        hiddenHas: !0,
        hiddenEnd: !0
    },
    onLoad: function() {
        var t = this;
        wx.getStorageSync("token");
        t.couponsList(), this.loadingChange();
    },
    couponsList: function() {
        var e = this, a = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/conpont"),
            data: {
                type: n
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                e.setData({
                    couponsData: t.data.data
                });
            }
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
    noUse: function(t) {
        var e = this;
        this.setData({
            hiddenNo: !1,
            hiddenHas: !0,
            hiddenEnd: !0
        }), n = t.currentTarget.dataset.index, e.couponsList();
    },
    hasUse: function(t) {
        var e = this;
        this.setData({
            hiddenNo: !0,
            hiddenHas: !1,
            hiddenEnd: !0
        }), n = t.currentTarget.dataset.index, e.couponsList(), e.loadingChange();
    },
    useEnd: function(t) {
        var e = this;
        this.setData({
            hiddenNo: !0,
            hiddenHas: !0,
            hiddenEnd: !1
        }), n = t.currentTarget.dataset.index, e.couponsList(), e.loadingChange();
    }
});