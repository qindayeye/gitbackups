function t(t, o, a) {
    return o in t ? Object.defineProperty(t, o, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = a, t;
}

var o, a = require("../../wxParse/wxParse.js"), e = getApp(), s = {
    id: "",
    num: 1,
    pro: [],
    prostr: []
}, i = [], n = [], r = "", d = "";

Page((o = {
    data: {
        hidden: !1,
        hiddenOrder: !1,
        hiddenAddress: !0,
        is_collect: 0,
        currentIndex: 1,
        currentTab: 0,
        num: 1,
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
        var o = this;
        e.getUserInfo(function(t) {
            o.setData({
                userInfo: t
            });
        });
        var r = wx.getStorageSync("token"), u = t.objectId;
        s.id = u;
        var c = wx.getStorageSync("goodsid");
        "" == c ? wx.setStorageSync("goodsid", u) : wx.request({
            url: e.apiUrl("goods/save"),
            data: {
                list: "" == d ? c : d,
                goodsId: u
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": r
            },
            success: function(t) {
                d = t.data.data, wx.setStorageSync("goodshistory", d);
            }
        }), wx.request({
            url: e.apiUrl("goods/detail"),
            data: {
                id: u
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": r
            },
            success: function(t) {
                if (wx.setNavigationBarTitle({
                    title: t.data.data.goods_info.goods_name
                }), void 0 != t.data.data) {
                    a.wxParse("goods_desc", "html", t.data.data.goods_info.goods_desc, o, 5), o.setData({
                        goodsCont: t.data.data,
                        properties: t.data.data.goods_properties.pro,
                        parameteCont: t.data.data.goods_properties.spe,
                        goodsComment: t.data.data.goods_comment.slice(0, 3),
                        flowNum: t.data.data.cart_number,
                        collect_list: 1 == t.data.data.goods_info.is_collect,
                        hidden: !0
                    }), i = [], n = [];
                    for (var e in t.data.data.goods_properties.pro) o.getProper(t.data.data.goods_properties.pro[e].values[0].id);
                    o.getGoodsTotal();
                }
            }
        });
    },
    onShow: function() {
        s.num = 1, s.pro = [];
    },
    goodsCheckout: function(t) {
        var o = this, a = wx.getStorageSync("token"), n = t.currentTarget.id || "cart";
        o.data.goodsCont.goods_id;
        wx.request({
            url: e.apiUrl("cart/add"),
            data: {
                id: s.id,
                num: s.num,
                attr_id: JSON.stringify(i)
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                var s = t.data.data;
                0 == t.data.data.code ? "cart" == n ? o.setData({
                    flowNum: t.data.data.total_number
                }) : wx.request({
                    url: e.apiUrl("user/address/list"),
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": a
                    },
                    success: function(t) {
                        "" != t.data.data ? wx.navigateTo({
                            url: "../flow/checkout"
                        }) : (wx.removeStorageSync("pageOptions"), wx.navigateTo({
                            url: "../address/index"
                        }));
                    }
                }) : "商品已下架" == s && wx.showToast({
                    title: "商品已下架",
                    image: "../../images/failure.png",
                    duration: 2e3
                });
            }
        });
    },
    onChangeShowState: function() {
        var t = this;
        t.setData({
            showView: !t.data.showView
        });
    },
    up: function() {
        var t = this.data.num;
        ++t >= 99 && (t = 99), this.setData({
            num: t
        }), s.num = t, this.getGoodsTotal();
    },
    down: function() {
        var t = this.data.num;
        --t <= 1 && (t = 1), this.setData({
            num: t
        }), s.num = t, this.getGoodsTotal();
    },
    import: function(t) {
        var o = Math.floor(t.detail.value);
        o <= 1 && (o = 1), o >= 999 && (o = 999), this.setData({
            num: o
        }), s.num = o, this.getGoodsTotal();
    },
    modelTap: function(t) {
        console.log(t.currentTarget.id), this.getProper(t.currentTarget.id), this.getGoodsTotal();
    },
    getProper: function(t) {
        i = [], n = [];
        var o = this.data.properties;
        for (var a in o) for (var e in o[a].values) o[a].values[e].checked = !1, o[a].values[e].id == t && (s.pro[o[a].name] = t, 
        s.prostr[o[a].name] = o[a].values[e].label);
        for (var a in o) if (void 0 != s.pro[o[a].name] && "" != s.pro[o[a].name]) for (var e in o[a].values) o[a].values[e].id == s.pro[o[a].name] && (o[a].values[e].checked = !0);
        for (var r in s.pro) i.push(s.pro[r]);
        for (var d in s.prostr) n.push(s.prostr[d]);
        this.setData({
            properties: o,
            selectedPro: n.join(",")
        });
    },
    getGoodsTotal: function() {
        var t = this, o = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("goods/property"),
            data: {
                id: s.id,
                attr_id: i,
                num: s.num,
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
                    goods_price: o.data.data.goods_price_formated,
                    stock: o.data.data.stock,
                    attr_img: o.data.data.attr_img,
                    goods_market_price: o.data.data.market_price_formated
                });
            }
        });
    },
    addCollect: function() {
        var t = this, o = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("user/collect/add"),
            data: {
                id: s.id
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
        var o = this;
        t.detail.current > 0 ? o.setData({
            currentTab: t.detail.current
        }) : o.setData({
            currentTab: 0
        }), this.setData({
            currentIndex: t.detail.current + 1
        });
    },
    swichNav: function(t) {
        var o = this;
        o.setData({
            showViewvideo: !o.data.showViewvideo
        });
    },
    imgPreview: function() {
        var t = this.data.goodsCont.goods_img;
        console.log(this.data.goodsCont.goods_img), wx.previewImage({
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
    }
}, t(o, "onChangeShowState", function() {
    var t = this;
    t.setData({
        showView: !t.data.showView
    });
}), t(o, "storeDetail", function(t) {
    var o = this.data.goodsCont.detail.user_id;
    wx.redirectTo({
        url: "../store/index?objectId=" + o
    });
}), t(o, "onChangeShowCoupons", function() {
    var t = this;
    t.setData({
        showViewCoupons: !t.data.showViewCoupons
    });
}), t(o, "printCoupont", function(t) {
    var o = this, a = wx.getStorageSync("token");
    r = t.currentTarget.dataset.index;
    var i = o.data.goodsCont.coupont[r].cou_id;
    wx.request({
        url: e.apiUrl("goods/coupons"),
        data: {
            cou_id: i
        },
        method: "post",
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": a
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
            }), wx.request({
                url: e.apiUrl("goods/detail"),
                data: {
                    id: s.id
                },
                method: "post",
                header: {
                    "Content-Type": "application/json",
                    "X-ECTouch-Authorization": a
                },
                success: function(t) {
                    o.setData({
                        goodsCont: t.data.data
                    });
                }
            });
        }
    });
}), t(o, "flowCart", function() {
    wx.switchTab({
        url: "../flow/index"
    });
}), t(o, "goTop", function(t) {
    this.setData({
        scrollTop: 0
    });
}), t(o, "scroll", function(t) {
    t.detail.scrollTop > 300 ? this.setData({
        floorstatus: !0
    }) : this.setData({
        floorstatus: !1
    });
}), t(o, "bindSharing", function() {
    var t = this.data.goodsCont.goods_info.goods_id;
    wx.navigateTo({
        url: "../goods/speak?objectId=" + t
    });
}), t(o, "toChild", function() {
    var t = this.data.goodsCont.goods_info.goods_id;
    wx.navigateTo({
        url: "../goods/comment?objectId=" + t
    });
}), t(o, "onReady", function(t) {
    this.videoContext = wx.createVideoContext("myVideo");
}), t(o, "commonNav", function() {
    var t = this;
    t.setData({
        nav_select: !t.data.nav_select
    });
}), t(o, "nav", function(t) {
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
}), t(o, "onShareAppMessage", function() {
    return {
        title: this.data.goodsCont.goods_info.goods_name,
        desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
        path: "/pages/goods/index?objectId=" + s.id
    };
}), o));