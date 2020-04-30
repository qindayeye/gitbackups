function i(i, t, e) {
    i.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    }), i.animation.translateY(t + "vh").step(), i.setData({
        animation: i.animation.export(),
        show: e
    });
}

function t(i) {
    for (var t, n = 0, o = 0; o < h.length; o++) 0 == (t = h[o]).city_id && 0 == t.county_id && (v[n] = t, 
    n++);
    i.setData({
        provinces: v
    }), e(0, i), a(0, 0, i);
}

function e(i, t) {
    var e;
    w = [];
    for (var a = 0, n = 0; n < h.length; n++) "00" == (e = h[n]).county_id && e.province_id == v[i].province_id && "00" != e.city_id && (w[a] = e, 
    a++);
    0 == w.length && (w[0] = {
        name: ""
    }), t.setData({
        citys: w,
        value: [ i, 0, 0 ]
    });
}

function a(i, t, e) {
    var a;
    f = [];
    for (var n = 0, o = 0; o < h.length; o++) "00" != (a = h[o]).county_id && a.province_id == v[i].province_id && a.city_id == w[t].city_id && (f[n] = a, 
    n++);
    0 == f.length && (f[0] = {
        name: ""
    }), e.setData({
        countys: f,
        value: [ i, t, 0 ]
    });
}

var n, o, r, s, d, c, u, l, g = getApp(), h = [], v = [], w = [], f = [], m = [ 0, 0, 0 ], y = 0, _ = !1, p = 200;

Page({
    data: {
        show: _,
        province: v,
        city: w,
        county: f,
        province_id: v,
        city_id: w,
        county_id: f,
        value: [ 0, 0, 0 ]
    },
    onLoad: function(i) {
        var e = this;
        l = wx.getStorageSync("flowcheckout"), h = wx.getStorageSync("region"), t(e), e.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        }), e.animation.translateY("200vh").step(), e.setData({
            animation: e.animation.export(),
            show: _
        });
    },
    bindChange: function(i) {
        var t = i.detail.value;
        m[0] != t[0] ? (t[1] = 0, t[2] = 0, e(t[0], this), a(t[0], t[1], this)) : m[1] != t[1] && (t[2] = 0, 
        a(t[0], t[1], this)), m = t, n = [ t[0], t[1], t[2] ], o = v[t[0]].region_name, 
        r = w[t[1]].region_name, s = f[t[2]].region_name, d = v[t[0]].region_id, c = w[t[1]].region_id, 
        u = f[t[2]].region_id;
    },
    checkFloatView: function(t) {
        var e = this;
        y = 0, i(this, p = 200, _ = !0), this.setData({
            value: n,
            province: void 0 == o ? "" : o,
            city: void 0 == r ? "" : r,
            county: void 0 == s ? "" : s,
            province_id: void 0 == d ? "0" : d,
            city_id: void 0 == c ? "0" : c,
            county_id: void 0 == u ? "0" : u,
            showViewMol: !e.data.showViewMol
        });
    },
    hiddenFloatView: function(t) {
        var e = this;
        y = 0, i(this, p = 200, _ = !0), e.setData({
            showViewMol: !e.data.showViewMol
        });
    },
    translate: function(t) {
        var e = this;
        0 == y ? (p = 0, _ = !1, y = 1) : (p = 200, _ = !0, y = 0), i(this, p, _), n = [ 0, 0, 0 ], 
        o = "北京", r = "北京", s = "东城区", d = "2", c = "52", u = "500", e.setData({
            showViewMol: !e.data.showViewMol
        });
    },
    saveData: function(i) {
        var t = this, e = i.detail.value, a = wx.getStorageSync("token"), n = {
            consignee: e.consignee,
            province: t.data.province_id,
            city: t.data.city_id,
            district: t.data.county_id,
            mobile: e.mobile,
            address: e.address
        };
        wx.request({
            url: g.apiUrl("user/address/add"),
            method: "post",
            header: {
                "X-ECTouch-Authorization": a
            },
            data: n,
            success: function(i) {
                var a = i.data.status_code, n = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/, o = e.mobile;
                if (500 == a) {
                    if ("" == e.consignee) return wx.showToast({
                        title: "收件人不能为空",
                        image: "../../images/failure.png",
                        duration: 2e3
                    }), !1;
                    if (0 == o.length) return wx.showToast({
                        title: "手机号不能为空",
                        image: "../../images/failure.png",
                        duration: 2e3
                    }), !1;
                    if (11 != o.length) return wx.showToast({
                        title: "手机号长度有误",
                        image: "../../images/failure.png",
                        duration: 1500
                    }), !1;
                    if (!n.test(o)) return wx.showToast({
                        title: "手机号不符合要求",
                        image: "../../images/failure.png",
                        duration: 1500
                    }), !1;
                    if ("" == t.data.province && "" == t.data.city && "" == t.data.county) return wx.showToast({
                        title: "省市区不能空",
                        image: "../../images/failure.png",
                        duration: 2e3
                    }), !1;
                    if ("" == e.address) return wx.showToast({
                        title: "详细地址不能为空",
                        image: "../../images/failure.png",
                        duration: 2e3
                    }), !1;
                } else wx.showToast({
                    title: "保存成功",
                    duration: 2e3,
                    success: function() {
                        "checkout" == l.from && wx.redirectTo({
                            url: "../address/index"
                        }), "user" == l.from && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    formReset: function() {
        this.setData({
            value: "",
            province: "",
            city: "",
            county: "",
            province_id: "",
            city_id: "",
            county_id: ""
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});