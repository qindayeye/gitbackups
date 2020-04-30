function a(a, t, i) {
    a.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    }), a.animation.translateY(t + "vh").step(), a.setData({
        animation: a.animation.export(),
        show: i
    });
}

function t(a) {
    var t;
    p = [];
    for (var i = 0, e = 0; e < _.length; e++) 0 == (t = _[e]).city_id && 0 == t.county_id && (p[i] = t, 
    i++);
    a.setData({
        provinces: p
    });
}

function i(a, t) {
    var i;
    w = [];
    for (var e = 0, d = 0; d < _.length; d++) 0 == (i = _[d]).county_id && i.province_id == p[a].province_id && 0 != i.city_id && (w[e] = i, 
    e++);
    0 == w.length && (w[0] = {
        name: ""
    }), t.setData({
        citys: w
    });
}

function e(a, t, i) {
    var e;
    f = [];
    for (var d = 0, n = 0; n < _.length; n++) 0 != (e = _[n]).county_id && e.province_id == p[a].province_id && e.city_id == w[t].city_id && (f[d] = e, 
    d++);
    0 == f.length && (f[0] = {
        name: ""
    }), i.setData({
        countys: f
    });
}

var d, n, o, s, r, c, u, v, h, l, g, y = getApp(), _ = [], p = [], w = [], f = [], m = [ 0, 0, 0 ], D = 0, x = !1, S = 200;

Page({
    data: {
        hidden: !1,
        show: x,
        province: p,
        city: w,
        county: f,
        province_id: p,
        city_id: w,
        county_id: f,
        value: [ 0, 0, 0 ]
    },
    onLoad: function(a) {
        var t = this;
        wx.getStorageSync("token");
        d = a.objectId, _ = wx.getStorageSync("region"), t.addressData(), t.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        }), t.animation.translateY("200vh").step(), t.setData({
            animation: t.animation.export(),
            show: x
        });
    },
    addressData: function() {
        var a = this, r = wx.getStorageSync("token");
        wx.request({
            url: y.apiUrl("user/address/detail"),
            data: {
                id: d
            },
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": r
            },
            success: function(d) {
                if (t(a), void 0 != d.data.data) {
                    var r = d.data.data.address.province_id, c = d.data.data.address.city_id, u = d.data.data.address.district_id;
                    n = 0, o = 0, s = 0;
                    for (var v = 0; v < a.data.provinces.length; v++) a.data.provinces[v].province_id == r && (n = v);
                    i(n, a);
                    for (var h = 0; h < a.data.citys.length; h++) a.data.citys[h].region_id == c && (o = h);
                    e(n, o, a);
                    for (var l = 0; l < a.data.countys.length; l++) a.data.countys[l].region_id == u && (s = l);
                    a.setData({
                        value: [ n, o, s ]
                    }), a.setData({
                        addressDeatil: d.data.data,
                        consignee: d.data.data.consignee,
                        mobile: d.data.data.mobile,
                        address: d.data.data.address,
                        province: d.data.data.address.province,
                        city: d.data.data.address.city,
                        county: d.data.data.address.district,
                        province_id: d.data.data.address.province_id,
                        city_id: d.data.data.address.city_id,
                        county_id: d.data.data.address.district_id,
                        hidden: !0
                    });
                }
            }
        });
    },
    bindChange: function(a) {
        var t = a.detail.value;
        m[0] != t[0] ? (t[1] = 0, t[2] = 0, i(t[0], this), e(t[0], t[1], this)) : m[1] != t[1] && (t[2] = 0, 
        e(t[0], t[1], this)), m = t, r = [ t[0], t[1], t[2] ], c = p[t[0]].region_name, 
        u = w[t[1]].region_name, v = f[t[2]].region_name, h = p[t[0]].region_id, l = w[t[1]].region_id, 
        g = f[t[2]].region_id, this.setData({
            value: [ t[0], t[1], t[2] ]
        });
    },
    checkFloatView: function(t) {
        var i = this;
        D = 0, a(this, S = 200, x = !0), this.setData({
            value: r,
            province: void 0 == c ? "" : c,
            city: void 0 == u ? "" : u,
            county: void 0 == v ? "" : v,
            province_id: void 0 == h ? "0" : h,
            city_id: void 0 == l ? "0" : l,
            county_id: void 0 == g ? "0" : g,
            showViewMol: !i.data.showViewMol
        });
    },
    hiddenFloatView: function(t) {
        var i = this;
        D = 0, a(this, S = 200, x = !0), i.setData({
            showViewMol: !i.data.showViewMol
        });
    },
    translate: function(t) {
        var i = this;
        0 == D ? (S = 0, x = !1, D = 1) : (S = 200, x = !0, D = 0), a(this, S, x), r = [ 0, 0, 0 ], 
        c = "北京", u = "北京", v = "东城区", h = "2", l = "52", g = "500", i.setData({
            showViewMol: !i.data.showViewMol
        });
    },
    saveData: function(a) {
        var t = this, i = wx.getStorageSync("token"), e = a.detail.value, n = {
            consignee: e.consignee,
            province: t.data.province_id,
            city: t.data.city_id,
            district: t.data.county_id,
            mobile: e.mobile,
            address: e.address,
            id: d
        };
        wx.request({
            url: y.apiUrl("user/address/update"),
            method: "post",
            header: {
                "X-ECTouch-Authorization": i
            },
            data: n,
            success: function(a) {
                a.data;
                0 != a.data.code ? wx.showToast({
                    title: "更新失败",
                    image: "../../images/failure.png",
                    duration: 2e3
                }) : wx.showToast({
                    title: "保存成功",
                    duration: 2e3,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        }), wx.redirectTo({
                            url: "./index"
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});