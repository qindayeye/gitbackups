var t, a = getApp();

Page({
    data: {},
    onLoad: function() {
        var e = this;
        t = wx.getStorageSync("goodshistory");
        var o = wx.getStorageSync("token");
        wx.request({
            url: a.apiUrl("goods/history"),
            data: {
                size: "100",
                page: "1",
                list: t
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            method: "POST",
            success: function(t) {
                e.setData({
                    list: t.data.data
                });
            }
        }), this.loadingChange();
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