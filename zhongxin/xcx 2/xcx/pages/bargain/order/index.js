var t, e = getApp();

Page({
    data: {
        current: "0",
        orders: []
    },
    orderStatus: function(a, r) {
        wx.request({
            url: e.apiUrl("user/order/list"),
            data: {
                size: 30,
                page: 1,
                status: r,
                type: "bargain"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            method: "POST",
            success: function(t) {
                a.setData({
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
        this.setData({
            current: t.target.dataset.index
        }), this.loadingChange(), this.orderStatus(this, t.target.dataset.index);
    },
    siteDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.index, r = e.data.orders[a].order_id;
        wx.navigateTo({
            url: "../order/detail?objectId=" + r
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
    pay_order: function(a) {
        var r = a.detail.formId, n = this, o = a.currentTarget.dataset.id, i = wx.getStorageSync("openid");
        e.payOrder(o, i, t, r), n.orderStatus(n, n.data.current);
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