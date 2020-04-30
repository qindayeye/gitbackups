var t = getApp(), a = "0";

Page({
    data: {
        hidden: !1,
        indicatorDots: !0,
        autoplay: !0,
        currentTab: 1,
        scrollLeft: 0,
        scrollTop: 0
    },
    onLoad: function(a) {
        var e = a.objectId ? a.objectId : 0, o = this, n = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("article"),
            data: {
                cat_id: e,
                page: "1",
                size: "100"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            method: "POST",
            success: function(t) {
                o.setData({
                    list: t.data
                });
            }
        });
    },
    swichNav: function(e) {
        var o = this, n = wx.getStorageSync("token"), i = e.target.dataset.current, c = e.currentTarget.dataset.index;
        if (console.log("当前选中id" + i), console.log("index" + c), a = i, wx.request({
            url: t.apiUrl("article"),
            data: {
                cat_id: a,
                page: "1",
                size: "100"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            method: "POST",
            success: function(t) {
                o.setData({
                    list: t.data
                });
            }
        }), this.data.currentTaB == i) return !1;
        this.setData({
            currentTab: i
        }), this.setData({
            scrollTop: 0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});