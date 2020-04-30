var t = getApp();

Page({
    data: {
        commentList: ""
    },
    onLoad: function() {
        var e = this, a = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/order/appraise"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                e.setData({
                    commentList: t.data.data
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
    commentBtn: function(t) {
        var e = this, a = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, o = e.data.commentList[n].id;
        wx.navigateTo({
            url: "../order/comment_detail?objectId=" + o + "&oid=" + a
        });
    },
    siteDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.index, n = e.data.commentList[a].id;
        wx.navigateTo({
            url: "../goods/index?objectId=" + n
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.getCartGoods(t), wx.stopPullDownRefresh(), t.onLoad();
    }
});