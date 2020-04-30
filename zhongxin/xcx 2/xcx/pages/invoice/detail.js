var t = getApp();

Page({
    data: {},
    onLoad: function() {
        var e = this, a = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/invoice/detail"),
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": a
            },
            success: function(t) {
                console.log(t.data.status_code), e.setData({
                    invoices: t.data.data.invoice,
                    invoice_id: t.data.data.invoice.id,
                    status_code: t.data.status_code
                });
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
    del: function(e) {
        var a = this, i = wx.getStorageSync("token");
        wx.request({
            url: t.apiUrl("user/invoice/delete"),
            method: "POST",
            data: {
                id: a.data.invoice_id
            },
            header: {
                "Content-Type": "application/json",
                "X-ECTouch-Authorization": i
            },
            success: function(t) {
                0 == t.data.code && (wx.showToast({
                    title: "删除成功",
                    duration: 2e3
                }), wx.redirectTo({
                    url: "../invoice/create"
                }));
            }
        });
    },
    update: function(t) {
        var e = this, a = (wx.getStorageSync("token"), e.data.invoice_id);
        wx.navigateTo({
            url: "../invoice/update?objectId=" + a
        });
    }
});