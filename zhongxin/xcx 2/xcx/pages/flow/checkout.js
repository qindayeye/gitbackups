var a, t, i, e, n, s, d, o, r, p, c, h, u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, _ = (require("../../wxParse/wxParse.js"), getApp()), l = {
    consignee: 1,
    shipping_id: [],
    msg: ""
}, f = new Array();

Page({
    data: {
        index: 0,
        addresss_link: "../address/index?from=flow",
        checkList: [],
        shipping_id: 0,
        shopLists: "",
        resShipingId: [],
        payfee: [],
        addresss: "",
        maskVisual: "hidden",
        current: 1,
        hiddenOrder: !0,
        hiddenAddress: !0,
        hiddenUser: !0,
        hiddenUnit: !0,
        is_first_action: !0
    },
    onLoad: function(a) {
        r = a.objectId, p = a.flow_type, c = a.team_id, h = a.t_id;
    },
    onShow: function(i) {
        var e = this;
        a = wx.getStorageSync("token"), e.setData({
            is_first_action: !0,
            flow_type: p || 0
        }), wx.request({
            url: _.apiUrl("flow"),
            method: "post",
            data: {
                flow_type: p || 0,
                bs_id: r || 0,
                team_id: c || 0,
                t_id: h || "0"
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(a) {
                setTimeout(function() {
                    "" == e.data.addresss && wx.navigateTo({
                        url: "../address/index"
                    });
                }, 1e3), l.consignee = a.data.data.default_address.address_id, t = a.data.data.cart_goods_list.list;
                for (var i in t) a.data.data.cart_goods_list[i];
                var n, s = "";
                for (var i in a.data.cart_goods_list) {
                    n = a.data.cart_goods_list.list[0][i].goods_attr.split("\n");
                    for (var d in n) "" != n[d] && (s += n[d] + ",");
                    a.data.cart_goods_list.list[0][i].goods_attr = s.substring(0, s.length - 1);
                }
                e.setData({
                    addresss: a.data.data.default_address,
                    shopLists: a.data.data.cart_goods_list,
                    userInvoice: a.data.data.invoice_content,
                    can_invoice: a.data.data.can_invoice,
                    vat_invoice: a.data.data.vat_invoice,
                    invoice_id: a.data.data.vat_invoice.id,
                    coupons_list: a.data.data.coupons_list,
                    cont_data: a.data.data
                }), e.getShopName();
                for (var i in e.data.shippingName) e.shippingChange(new Array(i, e.data.shippingName[i].id));
            }
        }), this.loadingChange();
    },
    loadingChange: function() {
        var a = this;
        setTimeout(function() {
            a.setData({
                hidden: !0
            });
        }, 2e3);
    },
    getShopName: function(a) {
        var t = this, i = [], e = [];
        for (var n in this.data.shopLists.list) !function(a) {
            var n = [], s = [], d = {
                option: [],
                id: 0
            }, o = t.data.shopLists.list[a];
            "" != o.shop_info && (o.shop_info.forEach(function(a) {
                n.push(a.shipping_name), s.push(a.shipping_id);
            }), d.option = n, i.push(d), e.push(s), l.shipping_id = s[0], t.data.resShipingId.push({
                ru_id: o.shop_info[0].ru_id,
                shipping_id: o.shop_info[0].shipping_id
            }));
        }(n);
        this.setData({
            shippingName: i,
            shpppingId: e
        });
    },
    onChangeShowCoupons: function(a) {
        var t = this;
        t.setData({
            showViewCoupons: !t.data.showViewCoupons
        });
    },
    radioChangeCoupons: function(a) {
        var t = this;
        d = a.detail.value;
        var i = wx.getStorageSync("token");
        wx.request({
            url: _.apiUrl("flow/changecou"),
            data: {
                uc_id: a.detail.value,
                flow_type: t.data.cont_data.flow_type
            },
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": i
            },
            success: function(a) {
                t.setData({
                    cou_money: a.data.data.cou_money,
                    cou_id: a.data.data.cou_id,
                    total: a.data.data.order_total + t.data.payfee_total
                });
            }
        });
    },
    shippingChange: function(t) {
        var i = this;
        if ("object" == (void 0 === t ? "undefined" : u(t)) && 2 == t.length) var e = t[0], n = t[1]; else var e = t.currentTarget.dataset.index, n = t.detail.value;
        i.data.shippingName[e].id = n, l.shipping_id = this.data.shpppingId[e][n];
        this.data.shopLists.list[e].shop_list[0].ru_id;
        var s = 0;
        this.data.resShipingId[e].shipping_id = this.data.shopLists.list[e].shop_info[n].shipping_id, 
        this.setData({
            shippingName: this.data.shippingName,
            resShipingId: this.data.resShipingId
        }), wx.request({
            url: _.apiUrl("flow/shipping"),
            data: {
                address: l.consignee,
                id: this.data.resShipingId[e].shipping_id,
                ru_id: this.data.resShipingId[e].ru_id,
                flow_type: p || "0",
                uc_id: i.data.cou_id ? i.data.cou_id : 0
            },
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(a) {
                f[i.data.resShipingId[e].ru_id] = {
                    shipping_id: i.data.resShipingId[e].shipping_id,
                    shipping_fee: parseFloat(a.data.data.fee)
                }, i.data.payfee.hasOwnProperty(e), a.data.data.fee ? i.data.payfee.splice(e, 1, a.data.data.fee) : i.data.payfee.splice(e, 1, a.data.data.massage), 
                1 == a.data.data.error && wx.showToast({
                    title: a.data.data.massage,
                    image: "../../images/failure.png",
                    duration: 2e3
                }), i.data.payfee.forEach(function(a) {
                    isNaN(a) || (s += parseFloat(a));
                }), i.setData({
                    payfee: i.data.payfee,
                    payfee_total: s,
                    total: parseFloat(i.data.shopLists.order_total) + s - parseFloat(i.data.cou_money ? i.data.cou_money : 0),
                    payfee_error: a.data.data.error
                });
            }
        });
    },
    submitOrder: function() {
        var t = this;
        if (1 == t.data.is_first_action) {
            if (t.setData({
                is_first_action: !1
            }), 1 == t.data.payfee_error) return void wx.showToast({
                title: "地区不支持配送，无法提交",
                image: "../../images/failure.png",
                duration: 2e3
            });
            if ("" == l.consignee || void 0 == l.consignee) return void _.shwomessage("没有收货地址");
            r = {
                inv_payee: "",
                inv_content: ""
            };
            if (0 == i) {
                if ("单位" == e) r = {
                    invoice_type: i,
                    inv_payee: o,
                    tax_id: n,
                    inv_content: s
                };
                if ("个人" == e) r = {
                    invoice_type: i,
                    inv_payee: e,
                    inv_content: s
                };
            }
            if (1 == i) var r = {
                invoice_type: i,
                vat_id: t.data.invoice_id,
                inv_payee: "",
                inv_content: "",
                tax_id: ""
            };
            wx.request({
                url: _.apiUrl("flow/down"),
                method: "post",
                data: {
                    consignee: l.consignee,
                    shipping: this.data.resShipingId,
                    postdata: r,
                    uc_id: d || "0",
                    bs_id: t.data.cont_data.bs_id,
                    flow_type: t.data.cont_data.flow_type,
                    team_id: t.data.cont_data.team_id,
                    t_id: t.data.cont_data.t_id
                },
                header: {
                    "Content-Type": "application/json",
                    "X-ECTouch-Authorization": a
                },
                success: function(a) {
                    var t = a.data.data;
                    a.data.code > 0 ? wx.showToast({
                        title: a.data.data,
                        image: "../../images/failure.png",
                        duration: 2e3
                    }) : "" != t && wx.redirectTo({
                        url: "../flow/done?id=" + t
                    });
                }
            });
        }
    },
    cascadePopup: function() {
        var a = wx.createAnimation({
            duration: 100,
            timingFunction: "ease-in-out"
        });
        this.animation = a, a.translateX(-1e3).step(), this.setData({
            animationData: this.animation.export(),
            maskVisual: "show"
        });
    },
    cascadeDismiss: function() {
        this.animation.translateX(1e3).step(), this.setData({
            animationData: this.animation.export(),
            maskVisual: "hidden"
        });
    },
    bindHeaderTap: function(a) {
        this.setData({
            current: a.target.dataset.index
        }), page = 1, sort_key = a.target.dataset.index;
    },
    toOrder: function(a) {
        i = a.currentTarget.id, this.setData({
            hiddenOrder: !1,
            hiddenAddress: !0,
            invoiceType: a.currentTarget.id
        });
    },
    toAddress: function(a) {
        i = a.currentTarget.id, this.setData({
            hiddenOrder: !0,
            hiddenAddress: !1,
            invoiceType: a.currentTarget.id
        });
    },
    userList: function(a) {
        e = a.currentTarget.id, this.setData({
            hiddenUser: !1,
            hiddenUnit: !0,
            inv_payee: a.currentTarget.id
        });
    },
    unitList: function(a) {
        e = a.currentTarget.id, this.setData({
            hiddenUser: !0,
            hiddenUnit: !1,
            inv_payee: a.currentTarget.id
        });
    },
    unitNameInput: function(a) {
        o = a.detail.value, this.setData({
            unitName: a.detail.value
        });
    },
    unitNumInput: function(a) {
        n = a.detail.value, this.setData({
            headingCode: a.detail.value
        });
    },
    radioChange: function(a) {
        s = a.detail.value;
    },
    toAddressTs: function(a) {
        wx.showModal({
            title: "提示",
            content: "你还没有增值发票，去添加吗？",
            success: function(a) {
                a.confirm ? wx.navigateTo({
                    url: "../invoice/create"
                }) : a.cancel;
            }
        });
    },
    commonNav: function() {
        var a = this;
        a.setData({
            nav_select: !a.data.nav_select
        });
    },
    nav: function(a) {
        var t = a.currentTarget.dataset.index;
        "home" == t ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == t ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == t ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == t && wx.switchTab({
            url: "../user/index"
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});