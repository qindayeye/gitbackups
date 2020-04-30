var a, t, o = require("../../wxParse/wxParse.js"), e = getApp(), i = {
    id: "",
    num: 1,
    pro: [],
    prostr: []
}, n = [], s = [], d = "";

Page({
    data: {
        hidden: !1,
        hiddenOrder: !1,
        hiddenAddress: !0,
        hiddenFriends: !1,
        hiddenRank: !0,
        is_collect: 0,
        currentIndex: 1,
        num: 1,
        goodsComment: [],
        properties: [],
        showView: !0,
        scrollTop: 0,
        floorstatus: !1,
        parameteCont: [],
        countDownDay: 0,
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0
    },
    onLoad: function(d) {
        var r = this;
        e.getUserInfo(function(a) {
            r.setData({
                userInfo: a
            });
        });
        var u = wx.getStorageSync("token");
        a = d.objectId, i.id = a, t = d.bs_id ? d.bs_id : "0", wx.request({
            url: e.apiUrl("bargain/goodsDetail"),
            data: {
                id: a,
                bs_id: t
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": u
            },
            success: function(a) {
                if (void 0 != a.data.data) {
                    o.wxParse("goods_desc", "html", a.data.data.goods_info.goods_desc, r, 5), r.setData({
                        goodsCont: a.data.data,
                        addCont: a.data.data.goods_info,
                        bargain_list: a.data.data.bargain_list.slice(0, 2),
                        bargain_ranking: a.data.data.bargain_ranking.slice(0, 2),
                        bargainInfo: a.data.data.bargain_info,
                        properties: a.data.data.goods_properties.pro
                    }), n = [], s = [];
                    for (var t in a.data.data.goods_properties.pro) r.getProper(a.data.data.goods_properties.pro[t].values[0].id);
                    r.getGoodsTotal(), r.timer();
                }
            }
        });
    },
    onShow: function() {
        i.num = 1, i.pro = [];
    },
    addBargain: function() {
        var a = this;
        a.setData({
            showViewProperty: !a.data.showViewProperty,
            showViewMol: !a.data.showViewMol
        });
    },
    onChangeShowState: function() {
        var a = this;
        "0" != a.data.addCont.bs_id && wx.showToast({
            image: "../../images/failure.png",
            title: "已参与砍价",
            duration: 2e3
        }), a.setData({
            showViewProperty: !a.data.showViewProperty,
            showViewMol: !a.data.showViewMol
        });
    },
    addCheckout: function() {
        var a = this, t = wx.getStorageSync("token");
        a.setData({
            showViewProperty: !a.data.showViewProperty,
            showViewMol: !a.data.showViewMol
        }), wx.request({
            url: e.apiUrl("bargain/addBargain"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            data: {
                id: i.id,
                attr_id: JSON.stringify(n)
            },
            success: function(o) {
                2 == o.data.data.error && wx.showToast({
                    title: "参与成功",
                    duration: 2e3
                }), a.setData({
                    addCont: o.data.data
                }), wx.request({
                    url: e.apiUrl("bargain/goodsDetail"),
                    data: {
                        id: i.id,
                        bs_id: o.data.data.bs_id
                    },
                    method: "post",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    success: function(t) {
                        a.setData({
                            goodsCont: t.data.data,
                            addCont: t.data.data.goods_info,
                            bargain_list: t.data.data.bargain_list.slice(0, 2),
                            bargain_ranking: t.data.data.bargain_ranking.slice(0, 2)
                        });
                    }
                });
            }
        });
    },
    formSubmit: function(a) {
        var t = a.detail.formId, o = this, n = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("bargain/goBargain"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            data: {
                id: i.id,
                bs_id: o.data.addCont.bs_id,
                form_id: t
            },
            success: function(a) {
                2 == a.data.data.error ? o.setData({
                    addCont: a.data.data,
                    bargainInfo: a.data.data,
                    showViewGo: !o.data.showViewGo,
                    showViewMol: !o.data.showViewMol,
                    checkViewMol: !o.data.checkViewMol
                }) : wx.showToast({
                    image: "../../images/failure.png",
                    title: a.data.data.message,
                    duration: 2e3
                }), wx.request({
                    url: e.apiUrl("bargain/goodsDetail"),
                    data: {
                        id: i.id,
                        bs_id: o.data.addCont.bs_id
                    },
                    method: "post",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": n
                    },
                    success: function(a) {
                        o.setData({
                            goodsCont: a.data.data,
                            addCont: a.data.data.goods_info,
                            bargainInfo: a.data.data.bargain_info,
                            bargain_list: a.data.data.bargain_list.slice(0, 2),
                            bargain_ranking: a.data.data.bargain_ranking.slice(0, 2)
                        });
                    }
                });
            }
        });
    },
    goBargainClose: function() {
        var a = this;
        a.setData({
            showViewGo: !a.data.showViewGo,
            showViewMol: !a.data.showViewMol
        });
    },
    bargainFriends: function() {
        var a = this;
        a.setData({
            showViewCom: !a.data.showViewCom,
            showViewMol: !a.data.showViewMol
        });
    },
    bargainPlay: function() {
        var a = this;
        a.setData({
            showViewPlay: !a.data.showViewPlay,
            showViewMol: !a.data.showViewMol
        });
    },
    bargainFriendsMore: function() {
        var a = this;
        a.setData({
            showViewFriendsMore: !a.data.showViewFriendsMore,
            showViewMol: !a.data.showViewMol
        });
    },
    bargainRanksMore: function() {
        var a = this;
        a.setData({
            showViewRankMore: !a.data.showViewRankMore,
            showViewMol: !a.data.showViewMol
        });
    },
    bargainCheckout: function(a) {
        var t = this, o = wx.getStorageSync("token");
        a.currentTarget.id, t.data.goodsCont.goods_id;
        wx.request({
            url: e.apiUrl("bargain/Bargainbuy"),
            data: {
                id: i.id,
                bs_id: t.data.goodsCont.goods_info.bs_id,
                num: 1,
                goods_id: t.data.goodsCont.goods_info.goods_id
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(a) {
                var t = a.data.data.bs_id, i = a.data.data.flow_type;
                wx.request({
                    url: e.apiUrl("user/address/list"),
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": o
                    },
                    success: function(a) {
                        "" != a.data.data ? wx.navigateTo({
                            url: "../flow/checkout?objectId=" + t + "&flow_type=" + i
                        }) : (wx.removeStorageSync("pageOptions"), wx.navigateTo({
                            url: "../address/index"
                        }));
                    }
                });
            }
        });
    },
    up: function() {
        var a = this.data.num;
        this.setData({
            num: a
        }), i.num = a, this.getGoodsTotal();
    },
    down: function() {
        var a = this.data.num;
        --a <= 1 && (a = 1), this.setData({
            num: a
        }), i.num = a, this.getGoodsTotal();
    },
    import: function(a) {
        var t = Math.floor(a.detail.value);
        t <= 1 && (t = 1), t >= 999 && (t = 999), this.setData({
            num: t
        }), i.num = t, this.getGoodsTotal();
    },
    modelTap: function(a) {
        this.getProper(a.currentTarget.id), this.getGoodsTotal();
    },
    getProper: function(a) {
        n = [], s = [];
        var t = this.data.properties;
        for (var o in t) for (var e in t[o].values) t[o].values[e].checked = !1, t[o].values[e].id == a && (i.pro[t[o].name] = a, 
        i.prostr[t[o].name] = t[o].values[e].label);
        for (var o in t) if (void 0 != i.pro[t[o].name] && "" != i.pro[t[o].name]) for (var e in t[o].values) t[o].values[e].id == i.pro[t[o].name] && (t[o].values[e].checked = !0);
        for (var d in i.pro) n.push(i.pro[d]);
        for (var r in i.prostr) s.push(i.prostr[r]);
        this.setData({
            properties: t,
            selectedPro: s.join(",")
        });
    },
    getGoodsTotal: function() {
        var a = this, t = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("bargain/property"),
            data: {
                id: i.id,
                attr_id: n,
                num: i.num,
                warehouse_id: "1",
                area_id: "1"
            },
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            success: function(t) {
                a.setData({
                    goods_price: t.data.data.goods_price_formated,
                    property_price: t.data.data,
                    stock: t.data.data.stock,
                    attr_img: t.data.data.attr_img,
                    goods_market_price: t.data.data.market_price_formated
                });
            }
        });
    },
    addCollect: function() {
        var a = this, t = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("user/collect/add"),
            data: {
                id: i.id
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            success: function(t) {
                a.setData({
                    collect_list: t.data.data
                });
            }
        });
    },
    setCurrent: function(a) {
        this.setData({
            currentIndex: a.detail.current + 1
        });
    },
    imgPreview: function() {
        var a = this.data.goodsCont.goods_img;
        wx.previewImage({
            current: a[this.data.currentIndex - 1],
            urls: a
        });
    },
    toFriends: function(a) {
        this.setData({
            hiddenFriends: !1,
            hiddenRank: !0
        });
    },
    toRank: function(a) {
        this.setData({
            hiddenFriends: !0,
            hiddenRank: !1
        });
    },
    toOrder: function(a) {
        this.setData({
            hiddenOrder: !1,
            hiddenAddress: !0
        });
    },
    toAddress: function(a) {
        this.setData({
            hiddenOrder: !0,
            hiddenAddress: !1
        });
    },
    storeDetail: function(a) {
        var t = this.data.goodsCont.detail.user_id;
        wx.redirectTo({
            url: "../store/index?objectId=" + t
        });
    },
    onChangeShowCoupons: function() {
        var a = this;
        a.setData({
            showViewCoupons: !a.data.showViewCoupons
        });
    },
    printCoupont: function(a) {
        var t = this, o = wx.getStorageSync("token");
        d = a.currentTarget.dataset.index;
        var i = t.data.goodsCont.coupont[d].cou_id;
        wx.request({
            url: e.apiUrl("goods/coupons"),
            data: {
                cou_id: i
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(a) {
                500 != a.status_code ? 2 == a.data.data.error ? wx.showToast({
                    title: "领取成功!",
                    duration: 2e3
                }) : wx.showToast({
                    image: "../../images/failure.png",
                    title: "已领取!",
                    duration: 2e3
                }) : wx.showToast({
                    title: "已领取!",
                    duration: 2e3
                }), t.setData({
                    couponsData: a.data.data.error
                });
            }
        });
    },
    flowCart: function() {
        wx.switchTab({
            url: "../flow/index"
        });
    },
    commonNav: function() {
        var a = this;
        a.setData({
            nav_select: !a.data.nav_select
        });
    },
    bargainHome: function() {
        wx.navigateTo({
            url: "../bargain/index"
        });
    },
    goTop: function(a) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(a) {
        a.detail.scrollTop > 300 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    bindSharing: function() {
        var a = this.data.goodsCont.goods_info.goods_id;
        wx.navigateTo({
            url: "../goods/speak?objectId=" + a
        });
    },
    timer: function() {
        var a = this.data.goodsCont.goods_info.end_time - Date.parse(new Date()) / 1e3, t = setInterval(function() {
            var o = a, e = Math.floor(o / 3600 / 24), i = e.toString();
            1 == i.length && (i = "0" + i);
            var n = Math.floor((o - 3600 * e * 24) / 3600), s = n.toString();
            1 == s.length && (s = "0" + s);
            var d = Math.floor((o - 3600 * e * 24 - 3600 * n) / 60), r = d.toString();
            1 == r.length && (r = "0" + r);
            var u = (o - 3600 * e * 24 - 3600 * n - 60 * d).toString();
            1 == u.length && (u = "0" + u), this.setData({
                countDownDay: i,
                countDownHour: s,
                countDownMinute: r,
                countDownSecond: u
            }), --a < 0 && (clearInterval(t), wx.showToast({
                title: "活动已结束"
            }), this.setData({
                countDownDay: "00",
                countDownHour: "00",
                countDownMinute: "00",
                countDownSecond: "00"
            }));
        }.bind(this), 1e3);
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
    onShareAppMessage: function() {
        var t = this, o = this.data.addCont.bs_id;
        return {
            title: t.data.bargainInfo.user_name + "邀请您帮忙砍价[砍价详情]",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/bargain/goods?objectId=" + a + "&bs_id=" + o
        };
    }
});