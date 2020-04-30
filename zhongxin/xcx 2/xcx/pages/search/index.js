var e = getApp(), t = "";

Page({
    data: {
        searchSize: "18",
        searchColor: "rgba(180,180,180,1)",
        hotrecent: []
    },
    onLoad: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight - 40
                });
            }
        });
    },
    onShow: function() {
        this.getRecentSearch();
    },
    getRecentSearch: function() {
        for (var e, t = wx.getStorageSync("recentKeyword").split(","), n = [], c = 0; c < t.length; c++) if ("" != t[c]) {
            e = !1;
            for (var r = 0; r < n.length; r++) t[c] == n[r] && (e = !0);
            0 == e && n.push(t[c]);
        }
        wx.setStorageSync("recentKeyword", n.join(",")), this.setData({
            hotrecent: n
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getSearchContent: function(e) {
        t = e.detail.value;
    },
    search: function() {
        var n = wx.getStorageSync("recentKeyword");
        n = "" == n ? t : n + "," + t, wx.setStorageSync("recentKeyword", n), e.redirectTo("../category/product_list?content=" + t);
    },
    gosearch: function(t) {
        e.redirectTo("../category/product_list?content=" + t.target.dataset.text);
    },
    clearSearch: function() {
        wx.clearStorageSync(), this.getRecentSearch();
    },
    closeSearch: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});