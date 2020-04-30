function a(a, i, e) {
    a.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    }), a.animation.translateY(i + "vh").step(), a.setData({
        animation: a.animation.export(),
        show: e
    });
}

function i(a) {
    var i;
    l = [];
    for (var e = 0, t = 0; t < h.length; t++) 0 == (i = h[t]).city_id && 0 == i.county_id && (l[e] = i, 
    e++);
    a.setData({
        provinces: l
    });
}

function e(a, i) {
    var e;
    y = [];
    for (var t = 0, n = 0; n < h.length; n++) 0 == (e = h[n]).county_id && e.province_id == l[a].province_id && 0 != e.city_id && (y[t] = e, 
    t++);
    0 == y.length && (y[0] = {
        name: ""
    }), i.setData({
        citys: y
    });
}

function t(a, i, e) {
    var t;
    w = [];
    for (var n = 0, o = 0; o < h.length; o++) 0 != (t = h[o]).county_id && t.province_id == l[a].province_id && t.city_id == y[i].city_id && (w[n] = t, 
    n++);
    0 == w.length && (w[0] = {
        name: ""
    }), e.setData({
        countys: w
    });
}

var n, o, d, c, s, r, _, u, v, m, p, g = getApp(), h = [], l = [], y = [], w = [], f = [ 0, 0, 0 ], x = 0, b = !1, T = 200;

Page({
    data: {
        show: b,
        province: l,
        city: y,
        county: w,
        province_id: l,
        city_id: y,
        county_id: w,
        value: [ 0, 0, 0 ]
    },
    onLoad: function(a) {
        var i = this;
        wx.getStorageSync("token");
        n = a.objectId, h = wx.getStorageSync("region"), i.addressData(), i.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        }), i.animation.translateY("200vh").step(), i.setData({
            animation: i.animation.export(),
            show: b
        });
    },
    addressData: function() {
        var a = this, n = wx.getStorageSync("token");
        wx.request({
            url: g.apiUrl("user/invoice/detail"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            success: function(n) {
                i(a);
                var s = n.data.data.invoice.province, r = n.data.data.invoice.city, _ = n.data.data.invoice.district;
                o = 0, d = 0, c = 0;
                for (var u = 0; u < a.data.provinces.length; u++) a.data.provinces[u].province_id == s && (o = u);
                e(o, a);
                for (var v = 0; v < a.data.citys.length; v++) a.data.citys[v].region_id == r && (d = v);
                t(o, d, a);
                for (var m = 0; m < a.data.countys.length; m++) a.data.countys[m].region_id == _ && (c = m);
                a.setData({
                    value: [ o, d, c ]
                }), a.setData({
                    id: n.data.data.invoice.id,
                    company_name: n.data.data.invoice.company_name,
                    tax_id: n.data.data.invoice.tax_id,
                    company_address: n.data.data.invoice.company_address,
                    company_telephone: n.data.data.invoice.company_telephone,
                    consignee_name: n.data.data.invoice.consignee_name,
                    consignee_mobile_phone: n.data.data.invoice.consignee_mobile_phone,
                    consignee_address: n.data.data.invoice.consignee_address,
                    bank_of_deposit: n.data.data.invoice.bank_of_deposit,
                    bank_account: n.data.data.invoice.bank_account,
                    invoice: n.data.data.invoice,
                    province: n.data.data.invoice.province_name,
                    city: n.data.data.invoice.city_name,
                    county: n.data.data.invoice.district_name
                });
            }
        });
    },
    bindChange: function(a) {
        var i = a.detail.value;
        f[0] != i[0] ? (i[1] = 0, i[2] = 0, e(i[0], this), t(i[0], i[1], this)) : f[1] != i[1] && (i[2] = 0, 
        t(i[0], i[1], this)), f = i, s = [ i[0], i[1], i[2] ], r = l[i[0]].region_name, 
        _ = y[i[1]].region_name, u = w[i[2]].region_name, v = l[i[0]].region_id, m = y[i[1]].region_id, 
        p = w[i[2]].region_id, this.setData({
            value: [ i[0], i[1], i[2] ]
        });
    },
    checkFloatView: function(i) {
        var e = this;
        x = 0, a(this, T = 200, b = !0), this.setData({
            value: s,
            province: void 0 == r ? "" : r,
            city: void 0 == _ ? "" : _,
            county: void 0 == u ? "" : u,
            province_id: void 0 == v ? "0" : v,
            city_id: void 0 == m ? "0" : m,
            county_id: void 0 == p ? "0" : p,
            showViewMol: !e.data.showViewMol
        });
    },
    hiddenFloatView: function(i) {
        var e = this;
        x = 0, a(this, T = 200, b = !0), e.setData({
            showViewMol: !e.data.showViewMol
        });
    },
    translate: function(i) {
        var e = this;
        0 == x ? (T = 0, b = !1, x = 1) : (T = 200, b = !0, x = 0), a(this, T, b), s = [ 0, 0, 0 ], 
        r = "北京", _ = "北京", u = "东城区", v = "2", m = "52", p = "500", e.setData({
            showViewMol: !e.data.showViewMol
        });
    },
    formSubmit: function(a) {
        var i = this, e = wx.getStorageSync("token"), t = a.detail.value, n = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if ("" == t.company_name) return wx.showToast({
            title: "单位名称不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if ("" == t.tax_id) return wx.showToast({
            title: "纳税人识别码不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if ("" == t.company_address) return wx.showToast({
            title: "注册地址不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if (0 == t.company_telephone.length || 0 == t.consignee_mobile_phone.length) return wx.showToast({
            title: "手机号不能为空",
            image: "../../images/failure.png",
            duration: 2e3
        }), !1;
        if (11 != t.consignee_mobile_phone.length) return wx.showToast({
            title: "手机号长度有误",
            image: "../../images/failure.png",
            duration: 1500
        }), !1;
        if (!n.test(t.consignee_mobile_phone)) return wx.showToast({
            title: "手机号不符合要求",
            image: "../../images/failure.png",
            duration: 1500
        }), !1;
        var o = {
            id: i.data.id,
            company_name: t.company_name,
            tax_id: t.tax_id,
            company_address: t.company_address,
            company_telephone: t.company_telephone,
            consignee_name: t.consignee_name,
            consignee_mobile_phone: t.consignee_mobile_phone,
            consignee_address: t.consignee_address,
            bank_of_deposit: t.bank_of_deposit,
            bank_account: t.bank_account,
            province: i.data.province_id,
            city: i.data.city_id,
            district: i.data.county_id
        };
        wx.request({
            url: g.apiUrl("user/invoice/update"),
            method: "POST",
            data: o,
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(a) {
                wx.showToast({
                    title: "更新成功",
                    duration: 2e3
                }), wx.redirectTo({
                    url: "../invoice/detail"
                });
            }
        });
    }
});