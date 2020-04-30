var e, t = getApp(), a = require("../../utils/av-weapp.js");

Page({
    data: {
        tempFilePaths: "",
        stars: [ 0, 1, 2, 3, 4 ],
        normalSrc: "../../images/normal.png",
        selectedSrc: "../../images/selected.png",
        key: 0
    },
    onLoad: function(a) {
        var o = this, n = a.objectId, s = a.oid;
        e = wx.getStorageSync("token"), wx.request({
            url: t.apiUrl("user/order/appraise/detail"),
            method: "POST",
            data: {
                gid: n,
                oid: s
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": e
            },
            success: function(e) {
                o.setData({
                    goods_thumb: e.data.data.goods_thumb,
                    goods_name: e.data.data.goods_name,
                    goods_price: e.data.data.goods_price,
                    goods_id: e.data.data.goods_id,
                    order_id: e.data.data.order_id
                });
            }
        }), this.loadingChange();
    },
    loadingChange: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                hidden: !0
            });
        }, 1e3);
    },
    chooseimage: function() {
        var e = this;
        wx.chooseImage({
            count: 2,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                console.log(t.tempFilePaths), e.setData({
                    tempFilePaths: t.tempFilePaths
                });
                var o = t.tempFilePaths[0];
                new a.File("file-name", {
                    blob: {
                        uri: o
                    }
                }).save().then(function(e) {
                    return console.log(e.url());
                }).catch(console.error);
            }
        });
    },
    selectBtn: function(e) {
        var t = e.currentTarget.dataset.key;
        this.setData({
            rank: t
        });
    },
    formSubmit: function(e) {
        var a = this, o = e.detail.value;
        console.log(o);
        var n = {
            gid: a.data.goods_id,
            oid: a.data.order_id,
            content: o.content,
            rank: a.data.rank
        }, s = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/order/appraise/add"),
            method: "POST",
            data: n,
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": s
            },
            success: function(e) {
                a.setData({
                    commentList: e.data.data
                }), 0 == e.data.code && (wx.showToast({
                    title: "评论成功",
                    duration: 2e3
                }), wx.request({
                    url: t.apiUrl("user/order/appraise"),
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": s
                    },
                    success: function(e) {
                        a.setData({
                            commentList: e.data.data
                        });
                    }
                }), console.log(111), wx.navigateTo({
                    url: "../order/comment_list"
                }));
            }
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        wx.stopPullDownRefresh(), e.onLoad();
    },
    commentBtn: function() {
        wx.navigateTo({
            url: "../order/comment_detail"
        });
    }
});