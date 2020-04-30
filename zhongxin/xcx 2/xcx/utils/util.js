function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

module.exports = {
    formatTime: function(n) {
        var i = n.getFullYear(), t = n.getMonth() + 1, o = n.getDate(), g = n.getHours(), a = n.getMinutes(), r = n.getSeconds();
        return [ i, t, o ].map(e).join("/") + " " + [ g, a, r ].map(e).join(":");
    }
}, module.exports.getIndexNav = function(e) {
    e([ {
        icon: "../../images/01.gif",
        name: "砍价商城",
        link: "../bargain/index"
    }, {
        icon: "../../images/02.gif",
        name: "拼团频道",
        link: "../group/index"
    }, {
        icon: "../../images/04.gif",
        name: "店铺街",
        link: "../store/list"
    } ]);
};