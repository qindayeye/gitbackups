require("../../wxParse/wxParse.js");

var t, a = getApp();

Page({
    data: {
        current: "0",
        orders: [],
        orderJtou: "../../res/images/icon-arrowdown.png"
    },
    orderStatus: function(e, n) {
        wx.request({
            url: a.apiUrl("bargain/myBargain"),
            data: {
                per_page: 30,
                page: 1
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            method: "POST",
            success: function(t) {
                e.setData({
                    list: t.data.data
                });
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        t = wx.getStorageSync("token"), this.orderStatus(this, e.data.current), this.loadingChange();
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
    }
});