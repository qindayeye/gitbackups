var t, e = getApp(), a = e.apiUrl("team/teamRanking"), r = "0";

Page({
    data: {
        current: "0",
        orders: [],
        countDownDay: 0,
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0
    },
    orderStatus: function(e, n) {
        wx.request({
            url: a,
            data: {
                size: 30,
                page: 1,
                type: r
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            method: "POST",
            success: function(t) {
                e.setData({
                    orders: t.data.data
                });
            }
        });
    },
    onLoad: function(e) {
        var a = this;
        t = wx.getStorageSync("token"), a.data.current = e.id || 0, this.setData({
            current: a.data.current
        }), this.orderStatus(this, a.data.current), this.loadingChange();
    },
    bindHeaderTap: function(t) {
        r = t.target.dataset.index, this.orderStatus(this, t.target.dataset.index), this.setData({
            current: t.target.dataset.index
        }), this.loadingChange();
    },
    siteDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.index, r = e.data.orders[a].goods_id;
        wx.navigateTo({
            url: "../group/goods?objectId=" + r
        });
    },
    teamWait: function(e) {
        var a = this;
        t = wx.getStorageSync("token");
        var r = e.currentTarget.dataset.index, n = a.data.orders[r].team_id, o = a.data.orders[r].user_id;
        wx.navigateTo({
            url: "../../group/wait?objectId=" + n + "&user_id=" + o
        });
    },
    cancel_order: function(a) {
        var r = this, n = "";
        wx.showModal({
            title: "提示",
            content: "确认取消订单？",
            success: function(o) {
                o.confirm && wx.request({
                    url: e.apiUrl("user/order/cancel"),
                    data: {
                        id: a.currentTarget.dataset.id
                    },
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    method: "POST",
                    success: function(t) {
                        t.data.code > 0 ? n = "取消失败" : 0 == t.data.code && (n = "取消成功", r.orderStatus(r, r.data.current)), 
                        wx.showToast({
                            title: n,
                            icon: "warn",
                            duration: 500
                        });
                    }
                });
            }
        });
    },
    confirm_order: function(a) {
        var r = this;
        wx.showModal({
            title: "提示",
            content: "确认收到商品？",
            success: function(n) {
                n.confirm && wx.request({
                    url: e.apiUrl("user/order/confirm "),
                    data: {
                        id: a.currentTarget.dataset.id
                    },
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    method: "POST",
                    success: function(t) {
                        0 == t.data.code ? (wx.showToast({
                            title: t.data.msg,
                            duration: 2e3
                        }), r.orderStatus(r, r.data.current), wx.redirectTo({
                            url: "order/index"
                        })) : wx.showToast({
                            title: t.data.msg,
                            image: "../../images/failure.png",
                            duration: 2e3
                        });
                    }
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
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});