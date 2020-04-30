var a, t = getApp(), e = {
    id: ""
};

Page({
    data: {
        hidden: !1,
        code_img: ""
    },
    onLoad: function(o) {
        var d = this, s = o.objectId;
        e.id = s, a = o.userId;
        var i = wx.getStorageSync("token"), s = o.objectId;
        e.id = s, wx.request({
            url: t.apiUrl("goods/share"),
            data: {
                user_id: a,
                id: s,
                path: "pages/goods/index?objectId=" + e.id
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": i
            },
            success: function(t) {
                a = t.data.data.user.id, wx.setNavigationBarTitle({
                    title: "[分享]" + t.data.data.goods_cont.name
                }), void 0 != t.data.data && d.setData({
                    goods: t.data.data,
                    hidden: !0
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        t.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: [ t.data.goods.user.name ] + "给您分享" + t.data.goods.goods_cont.name,
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/goods/speak?objectId=" + e.id + "&userId=" + a
        };
    }
});