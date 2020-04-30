var t, o, a = getApp();

Page({
    data: {
        index: 0,
        orderJtou: "../../images/icon-arrowdown.png",
        distributionJtou: "../../images/icon-arrowdown.png",
        checkList: []
    },
    onLoad: function(t) {
        o = t.objectId, this.loadingChange();
    },
    onShow: function() {
        t = wx.getStorageSync("token"), this.loadOrderDetail(o);
    },
    loadOrderDetail: function(o) {
        var e = this;
        wx.request({
            url: a.apiUrl("user/order/detail"),
            data: {
                id: o
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            success: function(t) {
                var o = "";
                for (var a in t.data.data.goods) {
                    for (var n in void 0) "" != (void 0)[n] && (o += (void 0)[n] + ",");
                    t.data.data.goods[a].goods_attr = o.substring(0, o.length - 1);
                }
                e.setData({
                    goodsList: t.data.data.goods,
                    orders: t.data.data
                });
            }
        });
    },
    confirm_order: function(o) {
        wx.showModal({
            title: "提示",
            content: "确认收到商品？",
            success: function(e) {
                e.confirm && wx.request({
                    url: a.apiUrl("user/order/confirm"),
                    data: {
                        id: o.currentTarget.dataset.id
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
                        }), that.orderStatus(that, that.data.current)) : wx.showToast({
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
        }, 2e3);
    },
    siteDetail: function(t) {
        var o = this, a = t.currentTarget.dataset.index, e = o.data.goodsList[a].goods_id;
        wx.navigateTo({
            url: "../goods/index?objectId=" + e
        });
    },
    cancel_order: function(e) {
        wx.showModal({
            title: "提示",
            content: "确认取消订单？",
            success: function(e) {
                e.confirm && wx.request({
                    url: a.apiUrl("user/order/cancel"),
                    data: {
                        id: o
                    },
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    method: "POST",
                    success: function(t) {
                        t.data.code > 0 ? a.shwomessage("取消失败", 1e3, "clear") : 0 == t.data.code && (a.shwomessage("取消成功", 1e3, "warn"), 
                        wx.navigateTo({
                            url: "../order/index"
                        }));
                    }
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    pay_order: function(o) {
        var e = o.detail.formId, n = o.currentTarget.dataset.id, r = wx.getStorageSync("openid");
        a.payOrder(n, r, t, e);
    }
});