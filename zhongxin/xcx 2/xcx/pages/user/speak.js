var a, t = getApp();

Page({
    onLoad: function(e) {
        var n = this;
        a = e.objectId;
        var i = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("share"),
            data: {
                user_id: a,
                id: 0,
                path: "pages/index/index"
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": i
            },
            success: function(t) {
                a = t.data.data.id, n.setData({
                    speack_data: t.data.data
                });
            }
        }), this.loadingChange();
    },
    loadingChange: function() {
        var a = this;
        setTimeout(function() {
            a.setData({
                hidden: !0
            });
        }, 1e3);
    },
    onShareAppMessage: function() {
        return {
            title: "我的代言",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/user/speak? objectId = " + a
        };
    }
});