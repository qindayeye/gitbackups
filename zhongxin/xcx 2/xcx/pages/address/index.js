var e, t = getApp();

Page({
    data: {
        addressList: [],
        is_first_action: !0,
        hidden: !1
    },
    onLoad: function(e) {
        this.getAddressList();
    },
    onShow: function() {
        this.getAddressList(), this.setData({
            is_first_action: !0
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getAddressList: function() {
        var s = this, a = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/address/list"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                var a = t.data.data;
                if (void 0 != t.data.data) {
                    for (var o in t.data.data) e = {
                        userName: a[o].consignee,
                        provinceName: a[o].province_name,
                        cityName: a[o].city_name,
                        countyName: a[o].district_name,
                        telNumber: a[o].mobile,
                        detailInfo: a[o].address
                    };
                    0 == t.data.code && s.setData({
                        addressList: t.data.data,
                        hidden: !0
                    });
                }
            }
        });
    },
    createAddress: function() {
        wx.navigateTo({
            url: "./create"
        });
    },
    editAddress: function(e) {
        var t = this, s = e.currentTarget.dataset.address, a = t.data.addressList[s].id;
        1 == t.data.is_first_action && (t.setData({
            is_first_action: !1
        }), wx.navigateTo({
            url: "../address/detail?objectId=" + a
        }));
    },
    removeAddress: function(e) {
        var s = this, a = wx.getStorageSync("token"), o = e.currentTarget.dataset.address;
        wx.showModal({
            title: "提示",
            content: "您确定要移除当前收货地址吗?",
            success: function(e) {
                e.confirm && wx.request({
                    url: t.apiUrl("user/address/delete"),
                    method: "POST",
                    header: {
                        "X-ECTouch-Authorization": a
                    },
                    data: {
                        id: o
                    },
                    success: function() {
                        var e = wx.getStorageSync("pageOptions");
                        s.onLoad(e);
                    }
                });
            }
        });
    },
    setDefault: function(e) {
        var s = this, a = e.detail.value, o = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/address/choice"),
            method: "POST",
            header: {
                "X-ECTouch-Authorization": o
            },
            data: {
                id: a
            },
            success: function() {
                wx.showToast({
                    title: "设置成功",
                    success: function() {
                        var e = wx.getStorageSync("flowcheckout");
                        wx.getStorageSync("address");
                        s.onLoad(e), "checkout" == e.from && wx.reLaunch({
                            url: "../flow/checkout"
                        }), "user" == e.from && wx.reLaunch({
                            url: "../user/index"
                        });
                    }
                });
            }
        });
    },
    addressChoose: function() {
        var s = wx.getStorageSync("token");
        wx.chooseAddress ? wx.chooseAddress({
            success: function(a) {
                console.log(a);
                var o = {
                    consignee: a.userName,
                    province: a.provinceName,
                    city: a.cityName,
                    district: a.countyName,
                    mobile: a.telNumber,
                    address: a.detailInfo
                };
                e.userName != o.consignee && e.provinceName != o.province && e.cityName != o.city && e.countyName != o.district && e.telNumber != o.mobile && e.detailInfo != o.address ? wx.request({
                    url: t.apiUrl("user/address/add"),
                    method: "post",
                    header: {
                        "X-ECTouch-Authorization": s
                    },
                    data: o,
                    success: function(e) {}
                }) : wx.showToast({
                    title: "此地址已添加",
                    image: "../../images/failure.png",
                    duration: 2e3
                });
            },
            fail: function(e) {
                console.log(JSON.stringify(e));
            }
        }) : console.log("当前微信版本不支持chooseAddress");
    }
});