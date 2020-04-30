var t, a = getApp();

Page({
    data: {
        items: [],
        startX: 0,
        startY: 0,
        toView: "blue",
        zujiIcon: "../../res/images/icon-zuji.png",
        zijiName: "推荐商品",
        selectedMenuId: 1,
        is_first_action: !0,
        total: {
            count: 0,
            money: 0
        }
    },
    getCartGoods: function(t) {
        var o = wx.getStorageSync("token");
        wx.request({
            url: a.apiUrl("cart"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(a) {
                var o, e = "";
                for (var n in a.data.cart_list) {
                    o = a.data.data.cart_list[n].goods_attr.split("\n"), e = "";
                    for (var i in o) "" != o[i] && (e += o[i] + ",");
                    a.data.cart_list[n].goods_attr = e.substring(0, e.length - 1);
                }
                "" == a.data.data.cart_list || void 0 == a.data.data.cart_list ? t.setData({
                    shopLists: "",
                    indexGoods: a.data.data.best_goods,
                    cartData: a.data.data
                }) : t.setData({
                    shopLists: a.data.data.cart_list,
                    total: a.data.data.total,
                    indexGoods: a.data.data.best_goods,
                    cartData: a.data.data
                });
            }
        });
    },
    onLoad: function() {
        t = wx.getStorageSync("token");
        var a = this;
        this.getCartGoods(a), this.loadingChange();
    },
    onShow: function() {
        var t = this;
        this.getCartGoods(t), this.loadingChange(), t.setData({
            is_first_action: !0
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
    addCount: function(o) {
        var e, n, i = this, s = o.currentTarget.dataset, r = i.data.total, d = i.data.shopLists, c = [];
        for (var u in d) c.push(d[u]);
        for (n in c) if (void 0 != (e = c[n].find(function(t) {
            return t.rec_id == s.id;
        }))) break;
        e.goods_number = parseInt(e.goods_number) + 1, r.count += 1, d.total_price += parseInt(e.goods_price), 
        wx.request({
            url: a.apiUrl("cart/update"),
            data: {
                id: s.id,
                amount: e.goods_number
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            method: "POST",
            success: function() {
                i.onLoad();
            }
        });
    },
    minusCount: function(o) {
        var e, n, i = this, s = o.currentTarget.dataset, r = (this.data.total, this.data.shopLists), d = [];
        for (var c in r) d.push(r[c]);
        for (n in d) if (void 0 != (e = d[n].find(function(t) {
            return t.rec_id == s.id;
        }))) break;
        if (r.total_price -= parseInt(e.goods_price), parseInt(r.total_price) < 0) r.total_price += parseInt(r.goods_price); else {
            if (e.goods_number = parseInt(e.goods_number) - 1, parseInt(e.goods_number) < 1) return e.goods_number = parseInt(e.goods_number) + 1, 
            void (r.total_price += parseInt(e.goods_price));
            wx.request({
                url: a.apiUrl("cart/update"),
                data: {
                    id: s.id,
                    amount: e.goods_number
                },
                header: {
                    "Content-Type": "application/json",
                    "X-ECTouch-Authorization": t
                },
                method: "POST",
                success: function() {
                    i.onLoad();
                }
            });
        }
    },
    del: function(o) {
        var e = this, n = o.currentTarget.dataset;
        wx.showModal({
            title: "提示",
            content: "您确定要移除当前商品吗?",
            success: function(o) {
                o.confirm && wx.request({
                    url: a.apiUrl("cart/delete"),
                    data: {
                        id: n.id
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    success: function(t) {
                        e.onShow();
                    }
                });
            }
        });
    },
    flowcartBtn: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    flowCheckoutBtn: function(t) {
        var o = this, e = wx.getStorageSync("token");
        wx.setStorageSync("flowcheckout", {
            from: "checkout"
        }), 1 == o.data.is_first_action && (o.setData({
            is_first_action: !1
        }), wx.request({
            url: a.apiUrl("user/address/list"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(t) {
                "" != t.data.data ? wx.navigateTo({
                    url: "../flow/checkout"
                }) : wx.navigateTo({
                    url: "../address/create"
                });
            }
        }));
    }
});