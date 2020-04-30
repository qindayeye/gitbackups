var t, a = getApp().apiUrl("team/categoryList "), e = "1", i = "0", n = "ASC", o = function(o) {
    o.setData({
        hidden: !1
    }), n = "ASC" == n ? "DESC" : "ASC";
    var s = wx.getStorageSync("token");
    wx.request({
        url: a,
        data: {
            tc_id: t,
            page: e,
            size: "30",
            keyword: "1",
            sort_key: i,
            sort_value: n
        },
        method: "post",
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": s
        },
        success: function(t) {
            o.setData({
                list: t.data.data,
                hidden: !0
            });
        }
    });
};

Page({
    data: {
        loadingSize: "20",
        loadingColor: "#444444",
        current: "0",
        hidden: !0,
        list: [],
        scrollTop: 0,
        scrollHeight: 0,
        maskVisual: "hidden",
        currentItem: 0,
        currentPrice: 0,
        showView: !0,
        showPrice: !0,
        brandsCate: [ {
            data_id: "0",
            id: "0",
            name: "全部",
            checked: !0
        }, {
            data_id: "1",
            id: "1",
            name: "苹果"
        }, {
            data_id: "2",
            id: "2",
            name: "三星"
        } ],
        hotrecent: [ {
            id: "0",
            name: "0-500",
            checked: !0
        }, {
            id: "1",
            name: "501-1000"
        }, {
            id: "2",
            name: "1001-10000"
        } ]
    },
    onLoad: function(a) {
        e = 1, t = a.objectId;
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), this.loadingChange(), o(i);
    },
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 2e3);
    },
    bindHeaderTap: function(t) {
        this.setData({
            current: t.target.dataset.index
        }), e = 1, i = t.target.dataset.index, o(this);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onShow: function() {},
    bindDownLoad: function() {
        o(this);
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    goToTop: function() {
        this.setData({
            scrollTop: 0
        });
    },
    topLoad: function(t) {
        e = 1, this.setData({
            scrollTop: 0
        }), o(this);
    },
    onChangeShowState: function() {
        var t = this;
        t.setData({
            showView: !t.data.showView
        });
    },
    onChangeShowPrice: function() {
        var t = this;
        t.setData({
            showPrice: !t.data.showPrice
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
    cascadeDismiss: function() {
        this.animation.translateX(1e3).step(), this.setData({
            animationData: this.animation.export(),
            maskVisual: "hidden"
        });
    },
    tagChoose: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        a.setData({
            currentItem: e
        });
    },
    tagPrice: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        a.setData({
            currentPrice: e
        });
    },
    radioChange: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    priceChange: function(t) {
        this.setData({
            pricenName: t.detail.value
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