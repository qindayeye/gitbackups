var t, e, a = getApp(), i = a.apiUrl("store/detail"), o = 1, n = "is_on_sale", s = "sort_order", d = "ASC", r = "0", c = function(a) {
    t = wx.getStorageSync("token"), e = wx.getStorageSync("user_id"), 1 == a.data.isListData && wx.request({
        url: i,
        data: {
            id: e,
            page: o,
            per_page: 100,
            cate_key: n,
            sort: s,
            order: d,
            cat_id: r
        },
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": t
        },
        method: "POST",
        success: function(t) {
            if (void 0 != t.data) {
                t.data.category.unshift({
                    cat_name: "全部商品",
                    cat_id: 0
                });
                for (var e = a.data.store_goods, i = 0; i < t.data.goods.length; i++) e.push(t.data.goods[i]);
                a.setData({
                    store_goods: e,
                    isListData: "" != t.data.goods
                }), o++, a.setData({
                    store_data: t.data,
                    store_num: t.data.collnum,
                    store_cont: t.data.detail.sellershopinfo,
                    brandsCate: t.data.category,
                    collect: 1 == t.data.collect.ect && "true",
                    hidden: !0
                });
            }
        }
    });
};

Page({
    data: {
        loadingSize: "20",
        loadingColor: "#444444",
        store_goods: [],
        showAttention: !0,
        showPrice: !0,
        showTop: !1,
        showBot: !0,
        hiddenAll: !1,
        hiddenNew: !0,
        hiddenSale: !0,
        hiddenCateAll: !0,
        hiddenSynthesize: !1,
        hiddenNum: !0,
        hiddenPrice: !0,
        cateName: "分类",
        hidden: !1,
        currentItem: 0,
        scrollHeight: 0,
        isListData: !0
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight - 50
                });
            }
        });
        var a = t.objectId;
        wx.setStorageSync("user_id", a), o = 1, c(e);
    },
    onChangeShowAttention: function() {
        var t = this, e = wx.getStorageSync("token"), i = wx.getStorageSync("user_id");
        wx.request({
            url: a.apiUrl("store/attention"),
            data: {
                id: i
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            method: "POST",
            success: function(e) {
                t.setData({
                    collect: e.data.collect,
                    store_num: e.data.collnum
                });
            }
        });
    },
    toAll: function(t) {
        var e = this;
        this.setData({
            hiddenAll: !1,
            hiddenNew: !0,
            hiddenSale: !0,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), n = t.currentTarget.dataset.index, o = 1, c(e), e.loadingChange();
    },
    toNew: function(t) {
        var e = this;
        e.setData({
            hiddenAll: !0,
            hiddenNew: !1,
            hiddenSale: !0,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), n = t.currentTarget.dataset.index, o = 1, c(e), e.loadingChange();
    },
    toSale: function(t) {
        var e = this;
        e.setData({
            hiddenAll: !0,
            hiddenNew: !0,
            hiddenSale: !1,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), n = t.currentTarget.dataset.index, o = 1, c(e), e.loadingChange();
    },
    toCateAll: function(t) {
        var e = this;
        o = 1, this.setData({
            hiddenCateAll: !1,
            hiddenSynthesize: !0,
            hiddenNum: !0,
            hiddenPrice: !0,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, c(e), e.loadingChange();
    },
    toSynthesize: function(t) {
        var e = this;
        this.setData({
            hiddenCateAll: !0,
            hiddenSynthesize: !1,
            hiddenNum: !0,
            hiddenPrice: !0,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, o = 1, c(e), e.loadingChange();
    },
    toNum: function(t) {
        var e = this;
        this.setData({
            hiddenCateAll: !0,
            hiddenSynthesize: !0,
            hiddenNum: !1,
            hiddenPrice: !0,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, o = 1, c(e), e.loadingChange();
    },
    toPrice: function(t) {
        var e = this;
        d = "DESC" == d ? "ASC" : "DESC", e.setData({
            hiddenCateAll: !0,
            hiddenSynthesize: !0,
            hiddenNum: !0,
            hiddenPrice: !1,
            showPrice: !e.data.showPrice,
            showTop: !e.data.showTop,
            showBot: !e.data.showBot,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), s = t.currentTarget.dataset.index, o = 1, c(e), e.loadingChange();
    },
    siteDetail: function(t) {
        var e = this, i = t.currentTarget.dataset.index, o = e.data.store_goods[i].goods_id;
        a.getUserInfo(function(t) {
            e.setData({
                userInfo: t
            });
        }), wx.navigateTo({
            url: "../goods/index?objectId=" + o
        });
    },
    storeDetail: function() {
        var t = this.data.store_data.detail.user_id;
        wx.redirectTo({
            url: "../store/detail?objectId=" + t
        });
    },
    cascadePopup: function() {
        var t = wx.createAnimation({
            duration: 100,
            timingFunction: "ease-in-out"
        });
        this.animation = t, t.translateX(-1e3).step(), this.setData({
            animationData: this.animation.export(),
            maskVisual: "show"
        });
    },
    cascadeDismiss: function(t) {
        var e = t.currentTarget.dataset.id;
        this.animation.translateX(1e3).step(), this.setData({
            animationData: this.animation.export(),
            maskVisual: "hidden",
            currentItem: e
        }), r = e;
    },
    radioChange: function(t) {
        var e = this;
        "全部商品" == t.detail.value ? e.setData({
            cateName: "分类",
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }) : e.setData({
            cateName: t.detail.value,
            store_goods: [],
            isListData: !0,
            scrollTop: 0,
            viewBox: !1
        }), o = 1, c(e), e.loadingChange();
    },
    bindDownLoad: function() {
        var t = this, e = this;
        this.setData({
            bottomloading: "active"
        }), setTimeout(function() {
            t.setData({
                bottomloading: ""
            });
        }, 500), c(e);
    },
    commonNav: function() {
        var t = this;
        t.setData({
            nav_select: !t.data.nav_select
        });
    },
    nav: function(t) {
        var e = t.currentTarget.dataset.index;
        "home" == e ? wx.switchTab({
            url: "../index/index"
        }) : "fenlei" == e ? wx.switchTab({
            url: "../category/index"
        }) : "cart" == e ? wx.switchTab({
            url: "../flow/index"
        }) : "profile" == e && wx.switchTab({
            url: "../user/index"
        });
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    onShareAppMessage: function () {
    return {
      title: "小程序首页",
      desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
      path: "/pages/store/index?objectId=" + s.id
    };
  }
});