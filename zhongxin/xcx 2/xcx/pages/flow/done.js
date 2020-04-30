var e, a = getApp();

Page({
    data: {
        defaultSize: "default",
        primarySize: "default",
        warnSize: "default",
        disabled: !1,
        plain: !1,
        loading: !1,
        order_id: "",
        done: {
            name: "付款金额",
            price: "7520.00"
        },
        doneList: [ {
            order_sn: "订单号"
        }, {
            order_sn: "配送方式"
        } ],
        flowMoney: {
            checkoutUrl: "../user/index"
        }
    },
    onLoad: function(t) {
        e = wx.getStorageSync("token");
        var d = this;
        this.loadingChange();
        var i = t.id;
        wx.request({
            url: a.apiUrl("user/order/detail"),
            method: "post",
            data: {
                id: i
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(e) {
                d.setData({
                    doneList: e.data.data,
                    donePrice: e.data.data,
                    order_id: e.data.data.order_id
                });
            }
        });
    },
    loadingChange: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                hidden: !0
            });
        }, 2e3);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    formSubmit: function(t) {
        var d = t.detail.formId, i = this.data.order_id, o = wx.getStorageSync("openid");
        a.payOrder(i, o, e, d);
    },
    orderDetail: function(e) {
        wx.switchTab({
            url: "../user/index"
        });
    }
});