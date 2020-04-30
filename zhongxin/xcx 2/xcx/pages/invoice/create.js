function i(i, e, t) {
    i.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    }), i.animation.translateY(e + "vh").step(), i.setData({
        animation: i.animation.export(),
        show: t
    });
}

function e(i) {
    for (var e, a = 0, o = 0; o < l.length; o++) 0 == (e = l[o]).city_id && 0 == e.county_id && (_[a] = e, 
    a++);
    i.setData({
        provinces: _
    }), t(0, i), n(0, 0, i);
}

function t(i, e) {
    var t;
    h = [];
    for (var n = 0, a = 0; a < l.length; a++) "00" == (t = l[a]).county_id && t.province_id == _[i].province_id && "00" != t.city_id && (h[n] = t, 
    n++);
    0 == h.length && (h[0] = {
        name: ""
    }), e.setData({
        citys: h,
        value: [ i, 0, 0 ]
    });
}

function n(i, e, t) {
    var n;
    m = [];
    for (var a = 0, o = 0; o < l.length; o++) "00" != (n = l[o]).county_id && n.province_id == _[i].province_id && n.city_id == h[e].city_id && (m[a] = n, 
    a++);
    0 == m.length && (m[0] = {
        name: ""
    }), t.setData({
        countys: m,
        value: [ i, e, 0 ]
    });
}

var a, o, s, r, d, c, u, g = getApp(), l = [], _ = [], h = [], m = [], p = [ 0, 0, 0 ], v = 0, w = !1, f = 200;

Page({
    data: {
        show: w,
        province: _,
        city: h,
        county: m,
        province_id: _,
        city_id: h,
        county_id: m,
        value: [ 0, 0, 0 ]
    },
    onLoad: function(i) {
        var t = this;
        l = wx.getStorageSync("region"), e(t), t.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        }), t.animation.translateY("200vh").step(), t.setData({
            animation: t.animation.export(),
            show: w
        }), t.loadingChange();
    },
    bindChange: function(i) {
        var e = i.detail.value;
        p[0] != e[0] ? (e[1] = 0, e[2] = 0, t(e[0], this), n(e[0], e[1], this)) : p[1] != e[1] && (e[2] = 0, 
        n(e[0], e[1], this)), p = e, a = [ e[0], e[1], e[2] ], o = _[e[0]].region_name, 
        s = h[e[1]].region_name, r = m[e[2]].region_name, d = _[e[0]].region_id, c = h[e[1]].region_id, 
        u = m[e[2]].region_id;
    },
    checkFloatView: function(e) {
        var t = this;
        v = 0, i(this, f = 200, w = !0), this.setData({
            value: a,
            province: void 0 == o ? "" : o,
            city: void 0 == s ? "" : s,
            county: void 0 == r ? "" : r,
            province_id: void 0 == d ? "0" : d,
            city_id: void 0 == c ? "0" : c,
            county_id: void 0 == u ? "0" : u,
            showViewMol: !t.data.showViewMol
        });
    },
    hiddenFloatView: function(e) {
        var t = this;
        v = 0, i(this, f = 200, w = !0), t.setData({
            showViewMol: !t.data.showViewMol
        });
    },
    translate: function(e) {
        var t = this;
        0 == v ? (f = 0, w = !1, v = 1) : (f = 200, w = !0, v = 0), i(this, f, w), a = [ 0, 0, 0 ], 
        o = "北京", s = "北京", r = "东城区", d = "2", c = "52", u = "500", t.setData({
            showViewMol: !t.data.showViewMol
        });
    },
    loadingChange: function() {
        var i = this;
        setTimeout(function() {
            i.setData({
                hidden: !0
            });
        }, 1e3);
    },
    formSubmit: function(i) {
        var e = this, t = wx.getStorageSync("token"), n = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/, a = i.detail.value;
        if ("" == a.company_name) return wx.showToast({
            title: "单位名称不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if ("" == a.tax_id) return wx.showToast({
            title: "纳税人识别码不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if (isNaN(a.tax_id)) return wx.showToast({
            title: "纳税人识别码不符合规格",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if ("" == a.company_address) return wx.showToast({
            title: "注册地址不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if (0 == a.company_telephone.length || 0 == a.consignee_mobile_phone.length) return wx.showToast({
            title: "手机号不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if (11 != a.consignee_mobile_phone.length) return wx.showToast({
            title: "手机号长度有误",
            image: "../../images/failure.png",
            duration: 1500
        }), !1;
        if (!n.test(a.consignee_mobile_phone)) return wx.showToast({
            title: "手机号不符合要求",
            image: "../../images/failure.png",
            duration: 1500
        }), !1;
        var o = {
            company_name: a.company_name,
            tax_id: a.tax_id,
            company_address: a.company_address,
            company_telephone: a.company_telephone,
            consignee_name: a.consignee_name,
            consignee_mobile_phone: a.consignee_mobile_phone,
            country: 1,
            province: e.data.province_id,
            city: e.data.city_id,
            district: e.data.county_id,
            consignee_address: a.consignee_address,
            bank_of_deposit: a.bank_of_deposit,
            bank_account: a.bank_account
        };
        wx.request({
            url: g.apiUrl("user/invoice/add"),
            method: "POST",
            data: o,
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            success: function(i) {
                500 != i.data.status_code ? (wx.showToast({
                    title: "添加成功",
                    duration: 2e3
                }), wx.redirectTo({
                    url: "../invoice/detail"
                })) : wx.showToast({
                    title: "添加失败",
                    image: "../../images/failure.png",
                    duration: 2e3
                });
            }
        });
    }
});