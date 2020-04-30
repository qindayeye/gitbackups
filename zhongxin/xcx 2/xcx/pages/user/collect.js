var t = getApp();

Page({
    data: {
        list: [],
        delBtnWidth: 180
    },
    getCartGoods: function(e) {
        var a = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/collectgoods"),
            method: "POST",
            data: {
                page: 1,
                size: 10
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                e.setData({
                    list: t.data.data
                });
            }
        });
    },
    onLoad: function() {
        var t = this;
        t.getCartGoods(t), t.initEleWidth(), t.loadingChange();
    },
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 1e3);
    },
    delCollect: function(e) {
        var a = this, i = e.currentTarget.dataset.index, o = a.data.list[i].goods_id, n = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/collect/add"),
            data: {
                id: o
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            success: function(t) {
                1 == t.data.data && wx.showToast({
                    title: "收藏已取消",
                    icon: "warn",
                    duration: 200
                }), a.getCartGoods(a);
            }
        });
    },
    siteDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.index, i = e.data.list[a].goods_id;
        wx.navigateTo({
            url: "../goods/index?objectId=" + i
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.getCartGoods(t), wx.stopPullDownRefresh(), t.onLoad();
    },
    touchS: function(t) {
        1 == t.touches.length && this.setData({
            startX: t.touches[0].clientX
        });
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var e = t.touches[0].clientX, a = this.data.startX - e, i = this.data.delBtnWidth, o = "";
            0 == a || a < 0 ? o = "left:0px" : a > 0 && (o = "left:-" + a + "px", a >= i && (o = "left:-" + i + "px"));
            var n = t.target.dataset.index, s = this.data.list;
            console.log(s), s[n].txtStyle = o, console.log(s[n].txtStyle), this.setData({
                list: s
            });
        }
    },
    touchE: function(t) {
        if (1 == t.changedTouches.length) {
            var e = t.changedTouches[0].clientX, a = this.data.startX - e, i = this.data.delBtnWidth, o = a > i / 2 ? "left:-" + i + "px" : "left:0px", n = t.target.dataset.index, s = this.data.list;
            s[n].txtStyle = o, this.setData({
                list: s
            });
        }
    },
    getEleWidth: function(t) {
        try {
            var e = wx.getSystemInfoSync().windowWidth, a = 375 / (t / 2);
            return Math.floor(e / a);
        } catch (t) {
            return !1;
        }
    },
    initEleWidth: function() {
        var t = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: t
        });
    }
});