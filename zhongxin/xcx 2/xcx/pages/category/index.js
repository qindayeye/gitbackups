var a = getApp();

Page({
    data: {
        searchColor: "rgba(0,0,0,0.4)",
        searchSize: "16",
        searchName: "搜索商品",
        hidden: !1,
        curNav: 1,
        curIndex: 0,
        cateData: []
    },
    onLoad: function() {
        var t = this, e = wx.getStorageSync("cate_data");
        e ? t.setData({
            cateData: e,
            curNav: e[0].id
        }) : wx.request({
            url: a.apiUrl("category"),
            method: "post",
            header: {
                "Content-Type": "application/json"
            },
            success: function(a) {
                wx.setStorageSync("cate_data", a.data.data), t.setData({
                    cateData: a.data.data,
                    curNav: a.data.data[0].id
                });
            }
        });
    },
    selectNav: function(a) {
        var t = a.target.dataset.id, e = parseInt(a.target.dataset.index);
        self = this, this.setData({
            curNav: t,
            curIndex: e,
            scrollTop: 0
        });
    },
    onShareAppMessage: function() {
        return {
            title: "全部分类",
            desc: "小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App",
            path: "/pages/categroy/index"
        };
    }
});