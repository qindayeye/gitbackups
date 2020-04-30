var t = getApp(), e = t.apiUrl("store/detail"), o = function(t) {
    var o = wx.getStorageSync("token"), a = wx.getStorageSync("user_id");
    wx.request({
        url: e,
        data: {
            id: a,
            page: 1,
            per_page: 40,
            cate_key: "is_on_sale",
            sort: "sort_order",
            order: "ASC",
            cat_id: "0"
        },
        header: {
            "Content-Type": "application/json",
            "X-ECTouch-Authorization": o
        },
        method: "POST",
        success: function(e) {
            t.setData({
                store_data: e.data,
                store_num: e.data.collnum,
                store_cont: e.data.detail.sellershopinfo
            });
        }
    });
};

Page({
    data: {
        store_goods: []
    },
    onLoad: function(t) {
        var e = this, a = t.objectId;
        wx.setStorageSync("user_id", a), o(e), e.loadingChange();
    },
    onUnload: function() {
        var t = wx.getStorageSync("user_id");
        wx.navigateTo({
            url: "../store/index?objectId=" + t
        });
    },
    loadingChange: function() {
        var t = this;
        this.setData({
            hidden: !1
        }), setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 2e3);
    },
    onChangeShowAttention: function() {
        var e = this, o = wx.getStorageSync("token"), a = wx.getStorageSync("user_id");
        wx.request({
            url: t.apiUrl("store/attention"),
            data: {
                id: a
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": o
            },
            method: "POST",
            success: function(t) {
                e.setData({
                    collect: t.data.collect,
                    store_num: t.data.collnum
                });
            }
        });
    },
    openLocation: function(t) {
        console.log(t);
        var e = t.detail.value;
        console.log(e), wx.openLocation({
            longitude: Number(e.longitude),
            latitude: Number(e.latitude),
            name: e.name,
            address: e.address
        });
    }
});