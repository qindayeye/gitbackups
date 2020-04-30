var t, a, e, i, n, o, r = getApp().apiUrl("goods/list"), d = 1, s = "0", c = "0", h = 1, l = "", u = "", p = "", w = "", g = function(o) {
    var g = wx.getStorageSync("token");
    1 == o.data.isListData && wx.request({
        url: r,
        data: {
            page: d,
            per_page: 100,
            keyword: l,
            shop: 1,
            id: h,
            sort_key: s,
            sort_value: c,
            warehouse_id: "1",
            area_id: "1",
            proprietary: u,
            price_min: t,
            price_max: a,
            brand: p,
            fil_key: w,
            province_id: e,
            city_id: i,
            county_id: n
        },
        method: "post",
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": g
        },
        success: function(t) {
            if ("" == t.data.data && o.setData({
                list: t.data.data
            }), void 0 != t.data.data) {
                for (var a = o.data.list, e = 0; e < t.data.data.length; e++) a.push(t.data.data[e]);
                o.setData({
                    list: a,
                    isListData: "" != t.data.data,
                    hidden: !0
                }), d++;
            }
        }
    });
};

Page({
    data: {
        hidden: !1,
        current: "0",
        list: [],
        scrollTop: 0,
        showView: !0,
        arrange: "arrange",
        isListData: !0,
        hiddenCateAll: !1,
        hiddenNum: !0,
        hiddenPrice: !0,
        hiddenSynthesize: !0,
        showTop: !1,
        showBot: !0
    },
    onLoad: function(r) {
        var s = this;
        u = r.objectId, t = r.price_min, a = r.price_max, p = r.brand, e = r.province_id, 
        i = r.city_id, n = r.county_id, w = r.fil_key, h = r.id ? r.id : "", o = r.name && r.content ? r.content : r.name ? r.name : r.content ? r.content : "搜索商品", 
        l = r.content ? r.content : "", s.setData({
            cateName: o,
            keyword: l
        }), wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    scrollHeight: t.windowHeight - 90
                });
            }
        }), d = 1, g(s);
    },
    toSynthesize: function(t) {
        wx.redirectTo({
            url: "../category/screen?objectId=" + h
        });
    },
    toCateAll: function(t) {
        var a = this;
        "list-0" == t.currentTarget.id && (d = 1, a.setData({
            hiddenCateAll: !1,
            hiddenSynthesize: !0,
            hiddenNum: !0,
            hiddenPrice: !0,
            list: [],
            current: t.currentTarget.dataset.index,
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, g(a));
    },
    toNum: function(t) {
        var a = this;
        "list-0" == t.currentTarget.id && (d = 1, a.setData({
            hiddenCateAll: !0,
            hiddenSynthesize: !0,
            hiddenNum: !1,
            hiddenPrice: !0,
            list: [],
            current: t.currentTarget.dataset.index,
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, g(a));
    },
    toPrice: function(t) {
        var a = this;
        c = 1 == c ? 0 : 1, a.setData({
            hiddenCateAll: !0,
            hiddenSynthesize: !0,
            hiddenNum: !0,
            hiddenPrice: !1,
            showPrice: !a.data.showPrice,
            showTop: !a.data.showTop,
            showBot: !a.data.showBot,
            list: [],
            current: t.currentTarget.dataset.index,
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, d = 1, g(a);
    },
    bindDownLoad: function() {
        var t = this;
        this.setData({
            bottomloading: "active"
        });
        var a = wx.getStorageSync("token");
        1 == t.data.isListData ? wx.request({
            url: r,
            data: {
                page: d,
                per_page: 100,
                keyword: l,
                shop: 1,
                id: h,
                sort_key: s,
                sort_value: c,
                warehouse_id: "1",
                area_id: "1"
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(a) {
                for (var e = t.data.list, i = 0; i < a.data.data.length; i++) e.push(a.data.data[i]);
                t.setData({
                    list: e,
                    isListData: "" != a.data.data,
                    bottomloading: ""
                }), d++;
            }
        }) : t.setData({
            bottomloading: ""
        });
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop,
            viewBox: !0
        });
    },
    goToTop: function() {
        this.setData({
            scrollTop: 0
        });
    },
    onChangeShowState: function() {
        var t = this;
        t.setData({
            showView: !t.data.showView,
            arrange: t.data.arrange ? "" : "arrange"
        });
    },
    commonNav: function() {
        var t = this;
        t.setData({
            nav_select: !t.data.nav_select
        });
    },
    nav: function(t) {
        var a = t.currentTarget.dataset.index;
        "home" == a ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == a ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == a ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == a && wx.switchTab({
            url: "../user/index"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "商品列表",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/product_list/product_list"
        };
    }
});