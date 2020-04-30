var t = getApp();

Page({
    data: {
        detail: {
            title: "800万像素超强拍照机 LG Viewty Smart再曝光800万像素超强拍照机",
            admin: "admin",
            time: "一天前",
            cont: '的用户（以下简称"商 家"），在同意本协议全部条款后'
        }
    },
    onLoad: function(n) {
        var o = this, a = n.objectId, e = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("article/detail"),
            data: {
                cat_id: a
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), o.setData({
                    detail: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});