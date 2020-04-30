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
    for (var t, n = 0, o = 0; o < w.length; o++) 0 == (t = w[o]).city_id && 0 == t.county_id && (_[n] = t, 
    n++);
    a.setData({
        provinces: _
    }), i(0, a), e(0, 0, a);
}

function i(a, t) {
    var i;
    m = [];
    for (var e = 0, n = 0; n < w.length; n++) "00" == (i = w[n]).county_id && i.province_id == _[a].province_id && "00" != i.city_id && (m[e] = i, 
    e++);
    0 == m.length && (m[0] = {
        name: ""
    }), t.setData({
        citys: m,
        value: [ a, 0, 0 ]
    });
}

function e(a, t, i) {
    var e;
    y = [];
    for (var n = 0, o = 0; o < w.length; o++) "00" != (e = w[o]).county_id && e.province_id == _[a].province_id && e.city_id == m[t].city_id && (y[n] = e, 
    n++);
    0 == y.length && (y[0] = {
        name: ""
    }), i.setData({
        countys: y,
        value: [ a, t, 0 ]
    });
}

var n, o, r, d, c, s, h, l, u, f, v, g = getApp(), w = [], _ = [], m = [], y = [], p = [ 0, 0, 0 ], D = 0, S = !1, b = 200, x = [];

Page({
    data: {
        show: S,
        province: _,
        city: m,
        county: y,
        province_id: _,
        city_id: m,
        county_id: y,
        value: [ 0, 0, 0 ],
        showView: !0,
        proprietary: 0,
        brandName: "",
        numHide: 0
    },
    onLoad: function(a) {
        var i = this;
        v = wx.getStorageSync("region"), u = a.objectId, w = wx.getStorageSync("region"), 
        t(i);
    },
    onShow: function(a) {
        var t = this, i = wx.getStorageSync("token");
        (l = wx.getStorageSync("brand")) && t.setData({
            brandsCate: l
        }), wx.request({
            url: g.apiUrl("goods/filtercondition"),
            data: {
                cat_id: u
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": i
            },
            success: function(a) {
                if (a.data.data.filter) for (var i = 0; i < a.data.data.filter.length; i++) a.data.data.filter[i].id = i + 1, 
                a.data.data.filter[i].radio_name = "";
                wx.setStorageSync("brand", a.data.data.brand), t.setData({
                    brandsCate: a.data.data.brand,
                    filterData: a.data.data.filter
                });
            }
        }), t.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        }), t.animation.translateY("200vh").step(), t.setData({
            animation: t.animation.export(),
            show: S
        }), t.loadingChange();
    },
    bindChange: function(a) {
        var t = a.detail.value;
        p[0] != t[0] ? (t[1] = 0, t[2] = 0, i(t[0], this), e(t[0], t[1], this)) : p[1] != t[1] && (t[2] = 0, 
        e(t[0], t[1], this)), p = t, n = [ t[0], t[1], t[2] ], o = _[t[0]].region_name, 
        r = m[t[1]].region_name, d = y[t[2]].region_name, c = _[t[0]].region_id, s = m[t[1]].region_id, 
        h = y[t[2]].region_id;
    },
    checkFloatView: function(t) {
        var i = this;
        D = 0, a(this, b = 200, S = !0), this.setData({
            value: n,
            province: void 0 == o ? "" : o,
            city: void 0 == r ? "" : r,
            county: void 0 == d ? "" : d,
            province_id: void 0 == c ? "0" : c,
            city_id: void 0 == s ? "0" : s,
            county_id: void 0 == h ? "0" : h,
            showViewMol: !i.data.showViewMol
        });
    },
    hiddenFloatView: function(t) {
        var i = this;
        D = 0, a(this, b = 200, S = !0), i.setData({
            showViewMol: !i.data.showViewMol
        });
    },
    translate: function(t) {
        var i = this;
        0 == D ? (b = 0, S = !1, D = 1) : (b = 200, S = !0, D = 0), a(this, b, S), n = [ 0, 0, 0 ], 
        o = "北京", r = "北京", d = "东城区", c = 2, s = 52, h = 500, i.setData({
            showViewMol: !i.data.showViewMol
        });
    },
    loadingChange: function() {
        var a = this;
        setTimeout(function() {
            a.setData({
                hidden: !0
            });
        }, 2e3);
    },
    onChangeShowState: function() {
        var a = this;
        a.setData({
            showView: !a.data.showView
        });
    },
    onChangeSize: function(a) {
        var t = this;
        (t = this).data.numHide == (f = a.currentTarget.id) ? t.setData({
            numHide: 0
        }) : t.setData({
            numHide: f
        });
    },
    radioChangeSize: function(a) {
        for (var t = this, i = 0; i < t.data.filterData.length; i++) t.data.filterData[i].id == f ? t.data.filterData[i].radio_name = a.detail.value : t.data.filterData[i].radio_name = "";
        t.setData({
            filterData: t.data.filterData,
            showSize: !t.data.showSize
        });
    },
    radioChange: function(a) {
        var t = this;
        t.setData({
            brandName: a.detail.value,
            showView: !t.data.showView
        });
    },
    onChangeShowPrice: function() {
        var a = this;
        a.setData({
            showPrice: !a.data.showPrice
        });
    },
    priceChange: function(a) {
        this.setData({
            pricenName: a.detail.value
        });
    },
    tagPrice: function(a) {
        var t = this, i = a.currentTarget.dataset.id;
        t.setData({
            currentPrice: i
        });
    },
    switch2Change: function(a) {
        var t = this;
        1 == a.detail.value ? t.setData({
            proprietary: 1
        }) : t.setData({
            proprietary: 2
        });
    },
    formSubmit: function(a) {
        var t = this, i = (a.detail.value, wx.getStorageSync("token"), t.data.proprietary), e = a.detail.value.price_min, n = a.detail.value.price_max, o = t.data.brandName, r = t.data.province_id, d = t.data.city_id, c = t.data.county_id;
        if (t.data.filterData) for (var s = 0; s < t.data.filterData.length; s++) x[s] = t.data.filterData[s].radio_name; else x = "";
        wx.navigateTo({
            url: "../category/product_list?objectId=" + i + "&price_min=" + e + "&price_max=" + n + "&brand=" + o + "&province_id=" + r + "&city_id=" + d + "&county_id=" + c + "&id=" + u + "&fil_key=" + x
        });
    },
    formReset: function() {
        var a = this;
        if (a.data.filterData) for (var t = 0; t < a.data.filterData.length; t++) a.data.filterData[t].radio_name = "";
        this.setData({
            value: "",
            province: "",
            city: "",
            county: "",
            province_id: "",
            city_id: "",
            county_id: "",
            brandName: "",
            fil_key: "",
            filterData: a.data.filterData
        });
    }
});