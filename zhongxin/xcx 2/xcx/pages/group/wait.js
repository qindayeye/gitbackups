var t, a, e, o = getApp();

Page({
    onLoad: function(n) {
        var i = this;
        o.getUserInfo(function(t) {
            i.setData({
                userInfo: t
            });
        }), t = wx.getStorageSync("token"), a = n.objectId, e = n.user_id, wx.request({
            url: o.apiUrl("team/teamWait"),
            method: "POST",
            data: {
                team_id: a,
                user_id: e
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": t
            },
            success: function(a) {
                "1" == a.data.data.team_info.status && wx.setNavigationBarTitle({
                    title: "拼团完成"
                }), i.setData({
                    wait: a.data.data,
                    user_picture: a.data.data.teamUser
                }), wx.request({
                    url: o.apiUrl("team/teamRanking"),
                    data: {
                        size: 30,
                        page: 1,
                        type: 3
                    },
                    header: {
                        "Content-Type": "application/json",
                        "X-ECTouch-Authorization": t
                    },
                    method: "POST",
                    success: function(t) {
                        i.setData({
                            orders: t.data.data
                        });
                    }
                });
                var e = a.data.data.team_info.end_time - Date.parse(new Date()) / 1e3, n = setInterval(function() {
                    var t = e, a = Math.floor(t / 3600 / 24), o = a.toString();
                    1 == o.length && (o = "0" + o);
                    var r = Math.floor((t - 3600 * a * 24) / 3600), s = r.toString();
                    1 == s.length && (s = "0" + s);
                    var u = Math.floor((t - 3600 * a * 24 - 3600 * r) / 60), d = u.toString();
                    1 == d.length && (d = "0" + d);
                    var c = (t - 3600 * a * 24 - 3600 * r - 60 * u).toString();
                    1 == c.length && (c = "0" + c), i.setData({
                        countDownDay: o,
                        countDownHour: s,
                        countDownMinute: d,
                        countDownSecond: c
                    }), --e < 0 && (clearInterval(n), wx.showToast({
                        title: "活动已结束"
                    }), i.setData({
                        countDownDay: "00",
                        countDownHour: "00",
                        countDownMinute: "00",
                        countDownSecond: "00"
                    }));
                }.bind(this), 1e3);
            }
        }), this.loadingChange();
    },
    loadingChange: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                hidden: !0
            });
        }, 1e3);
    },
    groupPlay: function() {
        var t = this;
        t.setData({
            showViewPlay: !t.data.showViewPlay,
            showViewMol: !t.data.showViewMol
        });
    },
    addgroupProperty: function() {
        var t = this, a = t.data.wait.team_info.goods_id, e = t.data.wait.team_info.team_id;
        wx.navigateTo({
            url: "../group/goods?objectId=" + a + "&team_id=" + e
        });
    },
    siteDetail: function() {
        var t = this.data.wait.team_info.goods_id;
        wx.navigateTo({
            url: "../group/goods?objectId=" + t
        });
    },
    groupMore: function() {
        wx.navigateTo({
            url: "../group/rank"
        });
    },
    userList: function() {
        var t = this;
        wx.navigateTo({
            url: "../group/user/list?objectId=" + t.data.wait.team_info.team_id
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        wx.stopPullDownRefresh(), t.onLoad();
    },
    onShareAppMessage: function() {
        return {
            title: this.data.wait.team_info.user_name + "邀请您帮忙拼团[等待成团]",
            desc: "您的朋友正在拼团,时间有限，赶快去参与吧！",
            path: "/pages/group/wait?objectId=" + a + "&user_id=" + e
        };
    }
});