var t = getApp(), e = new (require("../../utils/qqmap-wx-jssdk.min.js"))({
    key: "XSYBZ-P2G34-3K7UB-XPFZS-TBGHT-CXB4U"
}), o = require("../../utils/util.js");

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 4e3,
        duration: 1e3,
        scrollTop: 0,
        hasLocation: !1,
        hidden: !1
    },
    onLoad: function() {
        var e = this;
        o.getIndexNav(function(t) {
            e.setData({
                navList: t
            });
        }), e.index(), setTimeout(function() {
            e.category(), "" == wx.getStorageSync("region") && t.region();
        }, 2e3), e.getLocation();
    },
    index: function() {
        var e = this, o = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("index"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            success: function(t) {
                void 0 != t.data.data && e.setData({
                    index: t.data.data,
                    hidden: !0
                });
            }
        });
    },
    category: function() {
        wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("category"),
            method: "post",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                wx.setStorageSync("cate_data", t.data.data);
            }
        });
    },
    chooseLocation: function() {
        var o = this, n = wx.getStorageSync("token");
        wx.chooseLocation({
            success: function(a) {
                wx.setStorageSync("currentPosition", a);
                var s = a.latitude, i = a.longitude;
                e.reverseGeocoder({
                    location: {
                        latitude: s,
                        longitude: i
                    },
                    success: function(e) {
                        wx.request({
                            url: t.apiUrl("location/specific"),
                            data: {
                                address: e.result.address_component.city
                            },
                            method: "POST",
                            header: {
                                "Content-Type": "application/json",
                                "X-ECTouch-Authorization": n
                            },
                            success: function(t) {
                                o.setData({
                                    address: t.address
                                });
                            }
                        });
                        var a;
                        a = (e.result.address_component.province, e.result.address_component.city, e.result.address_component.city), 
                        o.setData({
                            hasLocation: !0,
                            address: a
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            success: function(e) {
                var o = wx.getStorageSync("currentPosition");
                o ? t.transformRegion(o) : (wx.setStorageSync("currentPosition", e), t.transformRegion(e));
            },
            fail: function(e) {
                wx.showModal({
                    title: "温馨提示",
                    content: "不允许定位,会对地区商品价格有影响，请确认，去重新允许！",
                    success: function(e) {
                        e.confirm ? wx.getSetting({
                            success: function(e) {
                                wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.userLocation"] ? wx.getLocation({
                                            success: function(e) {
                                                var o = wx.getStorageSync("currentPosition");
                                                o ? t.transformRegion(o) : (wx.setStorageSync("currentPosition", e), t.transformRegion(e));
                                            }
                                        }) : t.getLocation();
                                    }
                                });
                            }
                        }) : e.cancel && t.getLocation();
                    }
                });
            }
        });
    },
    transformRegion: function(t) {
        var o = this, n = t.latitude, a = t.longitude;
        e.reverseGeocoder({
            location: {
                latitude: n,
                longitude: a
            },
            success: function(t) {
                var e;
                e = (t.result.address_component.province, t.result.address_component.city, t.result.address_component.city), 
                o.setData({
                    hasLocation: !0,
                    address: e
                });
            },
            fail: function(t) {}
        });
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        this.setData({
            indexSearch: t.detail.scrollTop
        }), t.detail.scrollTop > 300 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    onShareAppMessage: function() {
        return {
            title: "小程序首页",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/index/index"
        };
    }
});