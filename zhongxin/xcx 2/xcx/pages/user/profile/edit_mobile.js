getApp();

Page({
    data: {},
    onLoad: function() {},
    sendmessg: function(t) {
        if (1 == timer) {
            timer = 0;
            var e = this, s = 60;
            e.setData({
                sendmsg: "sendmsgafter"
            });
            var a = setInterval(function() {
                e.setData({
                    getmsg: s + "s后重新发送"
                }), --s < 0 && (timer = 1, clearInterval(a), e.setData({
                    sendmsg: "sendmsg",
                    getmsg: "获取短信验证码"
                }));
            }, 1e3);
        }
    },
    formSubmit: function(t) {
        t.detail.value;
    }
});