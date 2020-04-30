var t, a = getApp(), e = 1;

Page({
    data: {
        current: "0",
        orders: [],
        hidden: !0,
        bottomloading: !1,
        isListData: !0,
        ListPageNum: 1,
        viewBox: !1
    },
    bindHeaderTap: function(t) {
        this.setData({
            orders: [],
            current: t.target.dataset.index,
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), e = 1, this.orderStatus(this, t.target.dataset.index), this.loadingChange();
    },
    orderStatus: function(o, i) {
        1 == (o = this).data.isListData && wx.request({
            url: a.apiUrl("user/order/list"),
            data: {
                size: 100,
                page: e,
                status: i,
                type: "0"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            method: "POST",
            success: function(t) {
                for (var a = o.data.orders, i = 0; i < t.data.data.length; i++) a.push(t.data.data[i]);
                o.setData({
                    orders: a,
                    isListData: "" != t.data.data
                }), e, o.setData({
                    hidden: !0
                });
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), t = wx.getStorageSync("token"), e.data.current = a.id || 0, e.shiftanimation = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        }), e.shiftanimation.left("7%").step(), e.setData({
            shiftanimation: e.shiftanimation.export(),
            current: e.data.current
        }), e.orderStatus(e, e.data.current), e.loadingChange();
    },
    siteDetail: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.orders[e].order_id;
        wx.navigateTo({
            url: "../order/detail?objectId=" + o
        });
    },
    cancel_order: function(e) {
        var o = this, i = "";
        wx.showModal({
            title: "提示",
            content: "确认取消订单？",
            success: function(r) {
                r.confirm && wx.request({
                    url: a.apiUrl("user/order/cancel"),
                    data: {
                        id: e.currentTarget.dataset.id
                    },
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    method: "POST",
                    success: function(t) {
                        t.data.code > 0 ? i = "取消失败" : 0 == t.data.code && (i = "取消成功", o.orderStatus(o, o.data.current)), 
                        wx.showToast({
                            title: i,
                            icon: "warn",
                            duration: 500
                        });
                    }
                });
            }
        });
    },
    pay_order: function(e) {
        var o = e.detail.formId, i = this, r = e.currentTarget.dataset.id, n = wx.getStorageSync("openid");
        a.payOrder(r, n, t, o), i.orderStatus(i, i.data.current);
    },
    confirm_order: function(e) {
        var o = this;
        wx.showModal({
            title: "提示",
            content: "确认收到商品？",
            success: function(i) {
                i.confirm && wx.request({
                    url: a.apiUrl("user/order/confirm "),
                    data: {
                        id: e.currentTarget.dataset.id
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
                        }), o.orderStatus(o, o.data.current), wx.redirectTo({
                            url: "../user/index"
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
    navMore: function() {
        var t = this;
        t.setData({
            showViewNav: !t.data.showViewNav
        });
    },
    bargainNav: function(t) {
        wx.navigateTo({
            url: "../bargain/order/index"
        });
    },
    groupNav: function(t) {
        wx.navigateTo({
            url: "../group/order/index"
        });
    },
    bindDownLoad: function() {
        var o = this;
        this.setData({
            bottomloading: "active"
        }), 1 == o.data.isListData ? wx.request({
            url: a.apiUrl("user/order/list"),
            data: {
                size: 100,
                page: e,
                status: 0,
                type: "0"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            method: "POST",
            success: function(t) {
                for (var a = o.data.orders, i = 0; i < t.data.data.length; i++) a.push(t.data.data[i]);
                o.setData({
                    orders: a,
                    isListData: "" != t.data.data,
                    bottomloading: ""
                }), e++;
            }
        }) : o.setData({
            bottomloading: ""
        });
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop,
            viewBox: !0
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