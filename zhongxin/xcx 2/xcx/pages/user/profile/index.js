var t = getApp();

Page({
    data: {},
    onLoad: function() {
        var a = this;
        t.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
    },
    formSubmit: function(t) {
        t.detail.value;
    }
});