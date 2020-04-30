var t = getApp();

Page({
    data: {
        storeList: []
    },
    collectstore: function(e) {
        var o = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/collectstore"),
            method: "post",
            data: {
                id: "1"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(t) {
                e.setData({
                    storeList: t.data
                });
            }
        });
    },
    onLoad: function(t) {
        var e = this;
        e.collectstore(e), e.loadingChange();
    },
    onChangeShowAttention: function(e) {
        var o = this, n = wx.getStorageSync("token"), a = e.currentTarget.dataset.index, i = o.data.storeList[a].store_id;
        wx.request({
            url: t.apiUrl("store/attention"),
            data: {
                id: i
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            method: "POST",
            success: function(t) {
                0 == t.data && wx.showToast({
                    title: "关注已取消",
                    icon: "warn",
                    duration: 200
                }), o.collectstore(o);
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
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});