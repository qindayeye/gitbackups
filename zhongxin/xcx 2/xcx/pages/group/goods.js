var t, o = require("../../wxParse/wxParse.js"), a = getApp(), e = {
    id: "",
    num: 1,
    groupNum: 1,
    pro: [],
    prostr: []
}, r = [], i = [], s = "";

Page({
    data: {
        hidden: !1,
        hiddenOrder: !1,
        hiddenAddress: !0,
        is_collect: 0,
        isScroll: !0,
        currentIndex: 1,
        num: 1,
        groupNum: 1,
        goodsComment: [],
        properties: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 4e3,
        duration: 1e3,
        showView: !0,
        scrollTop: 0,
        floorstatus: !1,
        parameteCont: []
    },
    onLoad: function(t) {
        var s = this;
        a.getUserInfo(function(t) {
            s.setData({
                userInfo: t
            });
        });
        var n = wx.getStorageSync("token"), d = t.objectId;
        e.id = d;
        var u = (u = t.team_id) || "0";
        wx.request({
            url: a.apiUrl("team/goodsDetail"),
            data: {
                goods_id: d,
                team_id: u
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            success: function(t) {
                if (void 0 != t.data.data) {
                    o.wxParse("goods_desc", "html", t.data.data.goods_info.goods_desc, s, 5), s.setData({
                        goodsCont: t.data.data,
                        properties: t.data.data.goods_properties.pro,
                        parameteCont: t.data.data.goods_properties.spe,
                        flowNum: t.data.data.cart_number
                    }), r = [], i = [];
                    for (var a in t.data.data.goods_properties.pro) s.getProper(t.data.data.goods_properties.pro[a].values[0].id);
                    s.getGoodsTotal(), s.teamProperty(), s.timeEnd();
                }
            }
        }), this.loadingChange();
    },
    onShow: function() {
        e.num = 1, e.groupNum = 1, e.pro = [];
    },
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 1e3);
    },
    groupPlay: function() {
        var t = this;
        t.setData({
            showViewPlay: !t.data.showViewPlay,
            showViewMol: !t.data.showViewMol,
            isScroll: !1
        });
    },
    bargainPlayclose: function() {
        var t = this;
        t.setData({
            showViewPlay: !t.data.showViewPlay,
            showViewMol: !t.data.showViewMol,
            isScroll: !0
        });
    },
    onChangeShowState: function() {
        var t = this;
        t.setData({
            showViewProperty: !t.data.showViewProperty,
            showViewMol: !t.data.showViewMol
        });
    },
    groupProperty: function() {
        var t = this;
        t.setData({
            showViewGroupProperty: !t.data.showViewGroupProperty,
            showViewMol: !t.data.showViewMol,
            id: "groupcheckout"
        });
    },
    goodsWait: function(o) {
        var a = this, e = o.currentTarget.dataset.index;
        t = a.data.goodsCont.team_log[e].team_id, a.setData({
            showViewGroupProperty: !a.data.showViewGroupProperty,
            showViewMol: !a.data.showViewMol,
            id: "addcheckout"
        });
    },
    goodsWaitId: function(t) {
        var o = this, a = t.currentTarget.dataset.index, e = o.data.goodsCont.team_log[a].team_id, r = o.data.goodsCont.user_id;
        wx.navigateTo({
            url: "../group/wait?objectId=" + e + "&user_id=" + r
        });
    },
    goodsCheckout: function(o) {
        var i = this, s = wx.getStorageSync("token"), n = (i.data.goodsCont.goods_id, o.currentTarget.id || "cart");
        if ("cart" == n || "checkout" == n) wx.request({
            url: a.apiUrl("cart/add"),
            data: {
                id: e.id,
                num: e.num,
                attr_id: JSON.stringify(r)
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": s
            },
            success: function(t) {
                var o = t.data.data;
                0 == t.data.code ? ("cart" == n && i.setData({
                    flowNum: t.data.data.total_number
                }), "checkout" == n && wx.request({
                    url: a.apiUrl("user/address/list"),
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": s
                    },
                    success: function(t) {
                        "" != t.data.data ? wx.navigateTo({
                            url: "../flow/checkout"
                        }) : (wx.removeStorageSync("pageOptions"), wx.navigateTo({
                            url: "../address/index"
                        }));
                    }
                })) : "商品已下架" == o && wx.showToast({
                    title: "商品已下架",
                    image: "../../images/failure.png",
                    duration: 2e3
                });
            }
        }), i.setData({
            showViewProperty: !i.data.showViewProperty,
            showViewMol: !i.data.showViewMol
        }); else {
            if ("addcheckout" == n) d = t; else var d = i.data.goodsCont.goods_info.team_id;
            wx.request({
                url: a.apiUrl("team/teamBuy"),
                data: {
                    goods_id: i.data.goodsCont.goods_info.goods_id,
                    t_id: i.data.goodsCont.goods_info.id,
                    team_id: d,
                    num: e.groupNum,
                    attr_id: JSON.stringify(r)
                },
                method: "post",
                header: {
                    "Content-Type": "application/json",
                    "X-ECTouch-Authorization": s
                },
                success: function(t) {
                    var o = t.data.data.t_id, e = t.data.data.flow_type, r = t.data.data.team_id;
                    wx.request({
                        url: a.apiUrl("user/address/list"),
                        method: "POST",
                        header: {
                            "Content-Type": "application/json",
                            "X-ECTouch-Authorization": s
                        },
                        success: function(t) {
                            "" != t.data.data ? wx.navigateTo({
                                url: "../flow/checkout?objectId=0&flow_type=" + e + "&team_id=" + r + "&t_id=" + o
                            }) : (wx.removeStorageSync("pageOptions"), wx.navigateTo({
                                url: "../address/index"
                            }));
                        }
                    });
                }
            }), i.setData({
                showViewGroupProperty: !i.data.showViewGroupProperty,
                showViewMol: !i.data.showViewMol
            });
        }
    },
    groupUp: function() {
        var t = this.data.groupNum, o = this.data.goodsCont.goods_info.astrict_num;
        ++t >= o && (t = o), this.setData({
            groupNum: t
        }), e.groupNum = t, t == o && wx.showToast({
            title: "已到限购量",
            image: "../../images/failure.png",
            duration: 2e3
        }), this.teamProperty();
    },
    groupImport: function(t) {
        var o = Math.floor(t.detail.value), a = this.data.goodsCont.goods_info.astrict_num;
        o <= 1 && (o = 1), o >= a && (o = a), this.setData({
            groupNum: o
        }), e.groupNum = o, this.teamProperty();
    },
    groupDown: function() {
        var t = this.data.groupNum;
        --t <= 1 && (t = 1), this.setData({
            groupNum: t
        }), e.groupNum = t, this.teamProperty();
    },
    up: function() {
        var t = this.data.num;
        ++t >= 99 && (t = 99), this.setData({
            num: t
        }), e.num = t, this.getGoodsTotal();
    },
    down: function() {
        var t = this.data.num;
        --t <= 1 && (t = 1), this.setData({
            num: t
        }), e.num = t, this.getGoodsTotal();
    },
    import: function(t) {
        var o = Math.floor(t.detail.value);
        o <= 1 && (o = 1), o >= 999 && (o = 999), this.setData({
            num: o
        }), e.num = o, this.getGoodsTotal();
    },
    modelTap: function(t) {
        this.getProper(t.currentTarget.id), this.getGoodsTotal();
    },
    groupModelTap: function(t) {
        this.getProper(t.currentTarget.id), this.teamProperty();
    },
    getProper: function(t) {
        r = [], i = [];
        var o = this.data.properties;
        for (var a in o) for (var s in o[a].values) o[a].values[s].checked = !1, o[a].values[s].id == t && (e.pro[o[a].name] = t, 
        e.prostr[o[a].name] = o[a].values[s].label);
        for (var a in o) if (void 0 != e.pro[o[a].name] && "" != e.pro[o[a].name]) for (var s in o[a].values) o[a].values[s].id == e.pro[o[a].name] && (o[a].values[s].checked = !0);
        for (var n in e.pro) r.push(e.pro[n]);
        for (var d in e.prostr) i.push(e.prostr[d]);
        this.setData({
            properties: o,
            selectedPro: i.join(",")
        });
    },
    getGoodsTotal: function() {
        var t = this, o = wx.getStorageSync("token");
        wx.request({
            url: a.apiUrl("goods/property"),
            data: {
                id: e.id,
                attr_id: r,
                num: e.num,
                groupNum: e.num,
                warehouse_id: "1",
                area_id: "1"
            },
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(o) {
                t.setData({
                    property: o.data.data
                });
            }
        });
    },
    teamProperty: function() {
        var t = this, o = wx.getStorageSync("token");
        wx.request({
            url: a.apiUrl("team/teamProperty"),
            data: {
                goods_id: e.id,
                attr_id: r,
                num: e.num,
                warehouse_id: "1",
                area_id: "1"
            },
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(o) {
                t.setData({
                    group_property: o.data.data
                });
            }
        });
    },
    addCollect: function() {
        var t = this, o = wx.getStorageSync("token");
        wx.request({
            url: a.apiUrl("user/collect/add"),
            data: {
                id: e.id
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(o) {
                t.setData({
                    collect_list: o.data.data
                });
            }
        });
    },
    setCurrent: function(t) {
        this.setData({
            currentIndex: t.detail.current + 1
        });
    },
    imgPreview: function() {
        var t = this.data.goodsCont.goods_img;
        wx.previewImage({
            current: t[this.data.currentIndex - 1],
            urls: t
        });
    },
    toOrder: function(t) {
        this.setData({
            hiddenOrder: !1,
            hiddenAddress: !0
        });
    },
    toAddress: function(t) {
        this.setData({
            hiddenOrder: !0,
            hiddenAddress: !1
        });
    },
    storeDetail: function(t) {
        var o = this.data.goodsCont.detail.user_id;
        wx.redirectTo({
            url: "../store/index?objectId=" + o
        });
    },
    onChangeShowCoupons: function() {
        var t = this;
        t.setData({
            showViewCoupons: !t.data.showViewCoupons
        });
    },
    printCoupont: function(t) {
        var o = this, e = wx.getStorageSync("token");
        s = t.currentTarget.dataset.index;
        var r = o.data.goodsCont.coupont[s].cou_id;
        wx.request({
            url: a.apiUrl("goods/coupons"),
            data: {
                cou_id: r
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(t) {
                500 != t.status_code ? 2 == t.data.data.error ? wx.showToast({
                    title: "领取成功!",
                    duration: 2e3
                }) : wx.showToast({
                    image: "../../images/failure.png",
                    title: "已领取!",
                    duration: 2e3
                }) : wx.showToast({
                    title: "已领取!",
                    duration: 2e3
                }), o.setData({
                    couponsData: t.data.data.error
                });
            }
        });
    },
    groupHome: function() {
        wx.navigateTo({
            url: "../group/index"
        });
    },
    commonNav: function() {
        var t = this;
        t.setData({
            nav_select: !t.data.nav_select
        });
    },
    nav: function(t) {
        var o = t.currentTarget.dataset.index;
        "home" == o ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == o ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == o ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == o && wx.switchTab({
            url: "../user/index"
        });
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        t.detail.scrollTop > 300 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    bindSharing: function() {
        var t = this.data.goodsCont.goods_info.goods_id;
        wx.navigateTo({
            url: "../goods/speak?objectId=" + t
        });
    },
    toChild: function() {
        var t = this.data.goodsCont.goods_info.goods_id;
        wx.navigateTo({
            url: "../goods/comment?objectId=" + t
        });
    },
    timeEnd: function() {
        function t() {
            for (var t = 0; t < a; t++) {
                var r = o.data.goodsCont.team_log[t].end_time - Date.parse(new Date()) / 1e3, i = 0, s = 0, n = 0, d = 0;
                if (r > 0) {
                    i = Math.floor(r / 86400), s = Math.floor(r / 3600) - 24 * i, n = Math.floor(r / 60) - 24 * i * 60 - 60 * s, 
                    d = Math.floor(r) - 24 * i * 60 * 60 - 60 * s * 60 - 60 * n, s <= 9 && (s = "0" + s), 
                    n <= 9 && (n = "0" + n), d <= 9 && (d = "0" + d), o.data.goodsCont.team_log[t].end_time--;
                    u = s + ":" + n + ":" + d;
                } else {
                    var u = "已结束！";
                    clearInterval(e);
                }
                o.data.goodsCont.team_log[t].difftime = u;
            }
            o.setData({
                goodsCont: o.data.goodsCont
            });
        }
        var o = this, a = o.data.goodsCont.team_log.length;
        t();
        var e = setInterval(t, 1e3);
    },
    onShareAppMessage: function() {
        return {
            title: "商品详情",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/goods/index?objectId=" + e.id
        };
    }
});