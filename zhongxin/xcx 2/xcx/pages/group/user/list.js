var t, e = getApp();

Page({
    data: {
        hiddenNo: !1,
        hiddenHas: !0,
        hiddenEnd: !0
    },
    onLoad: function(e) {
        var a = this;
        t = e.objectId;
        wx.getStorageSync("token");
        a.userList(), this.loadingChange();
    },
    userList: function() {
        var a = this, n = wx.getStorageSync("token");
        wx.request({
            url: e.apiUrl("team/teamUser"),
            data: {
                size: 30,
                page: 1,
                team_id: t
            },
            method: "post",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": n
            },
            success: function(t) {
                a.setData({
                    listsData: t.data.data
                });
            }
        });
    },
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 1e3);
    }
});