function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : i(t)) && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : i(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), s = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : i(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : i(e);
};

!function(e) {
    if ("object" === ("undefined" == typeof exports ? "undefined" : s(exports)) && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).AV = e();
    }
}(function() {
    return function e(t, n, r) {
        function i(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var u = "function" == typeof require && require;
                    if (!a && u) return u(s, !0);
                    if (o) return o(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND", c;
                }
                var l = n[s] = {
                    exports: {}
                };
                t[s][0].call(l.exports, function(e) {
                    var n = t[s][1][e];
                    return i(n || e);
                }, l, l.exports, e, t, n, r);
            }
            return n[s].exports;
        }
        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
        return i;
    }({
        1: [ function(e, t, n) {}, {} ],
        2: [ function(e, t, n) {
            var r = {
                utf8: {
                    stringToBytes: function(e) {
                        return r.bin.stringToBytes(unescape(encodeURIComponent(e)));
                    },
                    bytesToString: function(e) {
                        return decodeURIComponent(escape(r.bin.bytesToString(e)));
                    }
                },
                bin: {
                    stringToBytes: function(e) {
                        for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
                        return t;
                    },
                    bytesToString: function(e) {
                        for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
                        return t.join("");
                    }
                }
            };
            t.exports = r;
        }, {} ],
        3: [ function(e, t, n) {
            function r(e) {
                if (e) return i(e);
            }
            function i(e) {
                for (var t in r.prototype) e[t] = r.prototype[t];
                return e;
            }
            void 0 !== t && (t.exports = r), r.prototype.on = r.prototype.addEventListener = function(e, t) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), 
                this;
            }, r.prototype.once = function(e, t) {
                function n() {
                    this.off(e, n), t.apply(this, arguments);
                }
                return n.fn = t, this.on(e, n), this;
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
                this;
                var n = this._callbacks["$" + e];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + e], this;
                for (var r, i = 0; i < n.length; i++) if ((r = n[i]) === t || r.fn === t) {
                    n.splice(i, 1);
                    break;
                }
                return this;
            }, r.prototype.emit = function(e) {
                this._callbacks = this._callbacks || {};
                var t = [].slice.call(arguments, 1), n = this._callbacks["$" + e];
                if (n) for (var r = 0, i = (n = n.slice(0)).length; r < i; ++r) n[r].apply(this, t);
                return this;
            }, r.prototype.listeners = function(e) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
            }, r.prototype.hasListeners = function(e) {
                return !!this.listeners(e).length;
            };
        }, {} ],
        4: [ function(e, t, n) {
            !function() {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {
                    rotl: function(e, t) {
                        return e << t | e >>> 32 - t;
                    },
                    rotr: function(e, t) {
                        return e << 32 - t | e >>> t;
                    },
                    endian: function(e) {
                        if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
                        for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
                        return e;
                    },
                    randomBytes: function(e) {
                        for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
                        return t;
                    },
                    bytesToWords: function(e) {
                        for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) t[r >>> 5] |= e[n] << 24 - r % 32;
                        return t;
                    },
                    wordsToBytes: function(e) {
                        for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
                        return t;
                    },
                    bytesToHex: function(e) {
                        for (var t = [], n = 0; n < e.length; n++) t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16));
                        return t.join("");
                    },
                    hexToBytes: function(e) {
                        for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                        return t;
                    },
                    bytesToBase64: function(t) {
                        for (var n = [], r = 0; r < t.length; r += 3) for (var i = t[r] << 16 | t[r + 1] << 8 | t[r + 2], o = 0; o < 4; o++) 8 * r + 6 * o <= 8 * t.length ? n.push(e.charAt(i >>> 6 * (3 - o) & 63)) : n.push("=");
                        return n.join("");
                    },
                    base64ToBytes: function(t) {
                        t = t.replace(/[^A-Z0-9+\/]/gi, "");
                        for (var n = [], r = 0, i = 0; r < t.length; i = ++r % 4) 0 != i && n.push((e.indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | e.indexOf(t.charAt(r)) >>> 6 - 2 * i);
                        return n;
                    }
                };
                t.exports = n;
            }();
        }, {} ],
        5: [ function(e, t, n) {
            (function(r) {
                function i() {
                    var e;
                    try {
                        e = n.storage.debug;
                    } catch (e) {}
                    return "env" in (void 0 === r ? {} : r) && (e = r.env.DEBUG), e;
                }
                (n = t.exports = e("./debug")).log = function() {
                    return "object" === ("undefined" == typeof console ? "undefined" : s(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
                }, n.formatArgs = function() {
                    var e = arguments, t = this.useColors;
                    if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), 
                    !t) return e;
                    var r = "color: " + this.color, i = 0, o = 0;
                    return (e = [ e[0], r, "color: inherit" ].concat(Array.prototype.slice.call(e, 1)))[0].replace(/%[a-z%]/g, function(e) {
                        "%%" !== e && (i++, "%c" === e && (o = i));
                    }), e.splice(o, 0, r), e;
                }, n.save = function(e) {
                    try {
                        null == e ? n.storage.removeItem("debug") : n.storage.debug = e;
                    } catch (e) {}
                }, n.load = i, n.useColors = function() {
                    return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
                }, n.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
                    try {
                        return window.localStorage;
                    } catch (e) {}
                }(), n.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ], 
                n.formatters.j = function(e) {
                    return JSON.stringify(e);
                }, n.enable(i());
            }).call(this, e("_process"));
        }, {
            "./debug": 6,
            _process: 15
        } ],
        6: [ function(e, t, n) {
            function r() {
                return n.colors[s++ % n.colors.length];
            }
            function i(e) {
                function t() {}
                function i() {
                    var e = i, t = +new Date(), s = t - (o || t);
                    e.diff = s, e.prev = o, e.curr = t, o = t, null == e.useColors && (e.useColors = n.useColors()), 
                    null == e.color && e.useColors && (e.color = r());
                    for (var a = new Array(arguments.length), u = 0; u < a.length; u++) a[u] = arguments[u];
                    a[0] = n.coerce(a[0]), "string" != typeof a[0] && (a = [ "%o" ].concat(a));
                    var c = 0;
                    a[0] = a[0].replace(/%([a-z%])/g, function(t, r) {
                        if ("%%" === t) return t;
                        c++;
                        var i = n.formatters[r];
                        if ("function" == typeof i) {
                            var o = a[c];
                            t = i.call(e, o), a.splice(c, 1), c--;
                        }
                        return t;
                    }), a = n.formatArgs.apply(e, a), (i.log || n.log || console.log.bind(console)).apply(e, a);
                }
                t.enabled = !1, i.enabled = !0;
                var s = n.enabled(e) ? i : t;
                return s.namespace = e, s;
            }
            (n = t.exports = i.debug = i).coerce = function(e) {
                return e instanceof Error ? e.stack || e.message : e;
            }, n.disable = function() {
                n.enable("");
            }, n.enable = function(e) {
                n.save(e);
                for (var t = (e || "").split(/[\s,]+/), r = t.length, i = 0; i < r; i++) t[i] && ("-" === (e = t[i].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"))[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")));
            }, n.enabled = function(e) {
                var t, r;
                for (t = 0, r = n.skips.length; t < r; t++) if (n.skips[t].test(e)) return !1;
                for (t = 0, r = n.names.length; t < r; t++) if (n.names[t].test(e)) return !0;
                return !1;
            }, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};
            var o, s = 0;
        }, {
            ms: 14
        } ],
        7: [ function(e, t, n) {
            var r = n.createUniqueKey = "undefined" != typeof Symbol ? Symbol : function(e) {
                return "[[" + e + "_" + Math.random().toFixed(8).slice(2) + "]]";
            };
            n.LISTENERS = r("listeners"), n.CAPTURE = 1, n.BUBBLE = 2, n.ATTRIBUTE = 3, n.newNode = function(e, t) {
                return {
                    listener: e,
                    kind: t,
                    next: null
                };
            };
        }, {} ],
        8: [ function(e, t, n) {
            function r(e, t) {
                for (var n = e[a][t]; null != n; ) {
                    if (n.kind === u) return n.listener;
                    n = n.next;
                }
                return null;
            }
            function i(e, t, n) {
                "function" != typeof n && "object" !== (void 0 === n ? "undefined" : s(n)) && (n = null);
                for (var r = null, i = e[a][t]; null != i; ) i.kind === u ? null == r ? e[a][t] = i.next : r.next = i.next : r = i, 
                i = i.next;
                null != n && (null == r ? e[a][t] = c(n, u) : r.next = c(n, u));
            }
            var o = e("./commons"), a = o.LISTENERS, u = o.ATTRIBUTE, c = o.newNode;
            n.defineCustomEventTarget = function(e, t) {
                function n() {
                    e.call(this);
                }
                var o = {
                    constructor: {
                        value: n,
                        configurable: !0,
                        writable: !0
                    }
                };
                return t.forEach(function(e) {
                    o["on" + e] = {
                        get: function() {
                            return r(this, e);
                        },
                        set: function(t) {
                            i(this, e, t);
                        },
                        configurable: !0,
                        enumerable: !0
                    };
                }), n.prototype = Object.create(e.prototype, o), n;
            };
        }, {
            "./commons": 7
        } ],
        9: [ function(e, t, n) {
            var r = e("./commons"), i = e("./custom-event-target"), o = e("./event-wrapper"), a = r.LISTENERS, u = r.CAPTURE, c = r.BUBBLE, l = r.ATTRIBUTE, f = r.newNode, h = i.defineCustomEventTarget, d = o.createEventWrapper, p = o.STOP_IMMEDIATE_PROPAGATION_FLAG, _ = "undefined" != typeof window && void 0 !== window.EventTarget, v = t.exports = function e() {
                if (!(this instanceof e)) {
                    if (1 === arguments.length && Array.isArray(arguments[0])) return h(e, arguments[0]);
                    if (arguments.length > 0) {
                        for (var t = Array(arguments.length), n = 0; n < arguments.length; ++n) t[n] = arguments[n];
                        return h(e, t);
                    }
                    throw new TypeError("Cannot call a class as a function");
                }
                Object.defineProperty(this, a, {
                    value: Object.create(null)
                });
            };
            v.prototype = Object.create((_ ? window.EventTarget : Object).prototype, {
                constructor: {
                    value: v,
                    writable: !0,
                    configurable: !0
                },
                addEventListener: {
                    value: function(e, t, n) {
                        if (null == t) return !1;
                        if ("function" != typeof t && "object" !== (void 0 === t ? "undefined" : s(t))) throw new TypeError('"listener" is not an object.');
                        var r = n ? u : c, i = this[a][e];
                        if (null == i) return this[a][e] = f(t, r), !0;
                        for (var o = null; null != i; ) {
                            if (i.listener === t && i.kind === r) return !1;
                            o = i, i = i.next;
                        }
                        return o.next = f(t, r), !0;
                    },
                    configurable: !0,
                    writable: !0
                },
                removeEventListener: {
                    value: function(e, t, n) {
                        if (null == t) return !1;
                        for (var r = n ? u : c, i = null, o = this[a][e]; null != o; ) {
                            if (o.listener === t && o.kind === r) return null == i ? this[a][e] = o.next : i.next = o.next, 
                            !0;
                            i = o, o = o.next;
                        }
                        return !1;
                    },
                    configurable: !0,
                    writable: !0
                },
                dispatchEvent: {
                    value: function(e) {
                        var t = this[a][e.type];
                        if (null == t) return !0;
                        for (var n = d(e, this); null != t && ("function" == typeof t.listener ? t.listener.call(this, n) : t.kind !== l && "function" == typeof t.listener.handleEvent && t.listener.handleEvent(n), 
                        !n[p]); ) t = t.next;
                        return !n.defaultPrevented;
                    },
                    configurable: !0,
                    writable: !0
                }
            });
        }, {
            "./commons": 7,
            "./custom-event-target": 8,
            "./event-wrapper": 10
        } ],
        10: [ function(e, t, n) {
            var r = e("./commons").createUniqueKey, i = r("stop_immediate_propagation_flag"), o = r("canceled_flag"), s = r("original_event"), a = Object.freeze({
                stopPropagation: Object.freeze({
                    value: function() {
                        var e = this[s];
                        "function" == typeof e.stopPropagation && e.stopPropagation();
                    },
                    writable: !0,
                    configurable: !0
                }),
                stopImmediatePropagation: Object.freeze({
                    value: function() {
                        this[i] = !0;
                        var e = this[s];
                        "function" == typeof e.stopImmediatePropagation && e.stopImmediatePropagation();
                    },
                    writable: !0,
                    configurable: !0
                }),
                preventDefault: Object.freeze({
                    value: function() {
                        !0 === this.cancelable && (this[o] = !0);
                        var e = this[s];
                        "function" == typeof e.preventDefault && e.preventDefault();
                    },
                    writable: !0,
                    configurable: !0
                }),
                defaultPrevented: Object.freeze({
                    get: function() {
                        return this[o];
                    },
                    enumerable: !0,
                    configurable: !0
                })
            });
            n.STOP_IMMEDIATE_PROPAGATION_FLAG = i, n.createEventWrapper = function(e, t) {
                var n = "number" == typeof e.timeStamp ? e.timeStamp : Date.now(), r = {
                    type: {
                        value: e.type,
                        enumerable: !0
                    },
                    target: {
                        value: t,
                        enumerable: !0
                    },
                    currentTarget: {
                        value: t,
                        enumerable: !0
                    },
                    eventPhase: {
                        value: 2,
                        enumerable: !0
                    },
                    bubbles: {
                        value: Boolean(e.bubbles),
                        enumerable: !0
                    },
                    cancelable: {
                        value: Boolean(e.cancelable),
                        enumerable: !0
                    },
                    timeStamp: {
                        value: n,
                        enumerable: !0
                    },
                    isTrusted: {
                        value: !1,
                        enumerable: !0
                    }
                };
                return r[i] = {
                    value: !1,
                    writable: !0
                }, r[o] = {
                    value: !1,
                    writable: !0
                }, r[s] = {
                    value: e
                }, void 0 !== e.detail && (r.detail = {
                    value: e.detail,
                    enumerable: !0
                }), Object.create(Object.create(e, a), r);
            };
        }, {
            "./commons": 7
        } ],
        11: [ function(e, t, n) {
            function r(e) {
                return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
            }
            function i(e) {
                return "function" == typeof e.readFloatLE && "function" == typeof e.slice && r(e.slice(0, 0));
            }
            t.exports = function(e) {
                return null != e && (r(e) || i(e) || !!e._isBuffer);
            };
        }, {} ],
        12: [ function(e, t, n) {
            !function(e) {
                var r = {}, i = {};
                r.length = 0, r.getItem = function(e) {
                    return i[e] || null;
                }, r.setItem = function(e, t) {
                    void 0 === t ? r.removeItem(e) : (i.hasOwnProperty(e) || r.length++, i[e] = "" + t);
                }, r.removeItem = function(e) {
                    i.hasOwnProperty(e) && (delete i[e], r.length--);
                }, r.key = function(e) {
                    return Object.keys(i)[e] || null;
                }, r.clear = function() {
                    i = {}, r.length = 0;
                }, "object" === (void 0 === n ? "undefined" : s(n)) ? t.exports = r : e.localStorageMemory = r;
            }(this);
        }, {} ],
        13: [ function(e, t, n) {
            !function() {
                var n = e("crypt"), r = e("charenc").utf8, i = e("is-buffer"), o = e("charenc").bin, s = function e(t, s) {
                    t.constructor == String ? t = s && "binary" === s.encoding ? o.stringToBytes(t) : r.stringToBytes(t) : i(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());
                    for (var a = n.bytesToWords(t), u = 8 * t.length, c = 1732584193, l = -271733879, f = -1732584194, h = 271733878, d = 0; d < a.length; d++) a[d] = 16711935 & (a[d] << 8 | a[d] >>> 24) | 4278255360 & (a[d] << 24 | a[d] >>> 8);
                    a[u >>> 5] |= 128 << u % 32, a[14 + (u + 64 >>> 9 << 4)] = u;
                    for (var p = e._ff, _ = e._gg, v = e._hh, m = e._ii, d = 0; d < a.length; d += 16) {
                        var g = c, y = l, b = f, w = h;
                        l = m(l = m(l = m(l = m(l = v(l = v(l = v(l = v(l = _(l = _(l = _(l = _(l = p(l = p(l = p(l = p(l, f = p(f, h = p(h, c = p(c, l, f, h, a[d + 0], 7, -680876936), l, f, a[d + 1], 12, -389564586), c, l, a[d + 2], 17, 606105819), h, c, a[d + 3], 22, -1044525330), f = p(f, h = p(h, c = p(c, l, f, h, a[d + 4], 7, -176418897), l, f, a[d + 5], 12, 1200080426), c, l, a[d + 6], 17, -1473231341), h, c, a[d + 7], 22, -45705983), f = p(f, h = p(h, c = p(c, l, f, h, a[d + 8], 7, 1770035416), l, f, a[d + 9], 12, -1958414417), c, l, a[d + 10], 17, -42063), h, c, a[d + 11], 22, -1990404162), f = p(f, h = p(h, c = p(c, l, f, h, a[d + 12], 7, 1804603682), l, f, a[d + 13], 12, -40341101), c, l, a[d + 14], 17, -1502002290), h, c, a[d + 15], 22, 1236535329), f = _(f, h = _(h, c = _(c, l, f, h, a[d + 1], 5, -165796510), l, f, a[d + 6], 9, -1069501632), c, l, a[d + 11], 14, 643717713), h, c, a[d + 0], 20, -373897302), f = _(f, h = _(h, c = _(c, l, f, h, a[d + 5], 5, -701558691), l, f, a[d + 10], 9, 38016083), c, l, a[d + 15], 14, -660478335), h, c, a[d + 4], 20, -405537848), f = _(f, h = _(h, c = _(c, l, f, h, a[d + 9], 5, 568446438), l, f, a[d + 14], 9, -1019803690), c, l, a[d + 3], 14, -187363961), h, c, a[d + 8], 20, 1163531501), f = _(f, h = _(h, c = _(c, l, f, h, a[d + 13], 5, -1444681467), l, f, a[d + 2], 9, -51403784), c, l, a[d + 7], 14, 1735328473), h, c, a[d + 12], 20, -1926607734), f = v(f, h = v(h, c = v(c, l, f, h, a[d + 5], 4, -378558), l, f, a[d + 8], 11, -2022574463), c, l, a[d + 11], 16, 1839030562), h, c, a[d + 14], 23, -35309556), f = v(f, h = v(h, c = v(c, l, f, h, a[d + 1], 4, -1530992060), l, f, a[d + 4], 11, 1272893353), c, l, a[d + 7], 16, -155497632), h, c, a[d + 10], 23, -1094730640), f = v(f, h = v(h, c = v(c, l, f, h, a[d + 13], 4, 681279174), l, f, a[d + 0], 11, -358537222), c, l, a[d + 3], 16, -722521979), h, c, a[d + 6], 23, 76029189), f = v(f, h = v(h, c = v(c, l, f, h, a[d + 9], 4, -640364487), l, f, a[d + 12], 11, -421815835), c, l, a[d + 15], 16, 530742520), h, c, a[d + 2], 23, -995338651), f = m(f, h = m(h, c = m(c, l, f, h, a[d + 0], 6, -198630844), l, f, a[d + 7], 10, 1126891415), c, l, a[d + 14], 15, -1416354905), h, c, a[d + 5], 21, -57434055), f = m(f, h = m(h, c = m(c, l, f, h, a[d + 12], 6, 1700485571), l, f, a[d + 3], 10, -1894986606), c, l, a[d + 10], 15, -1051523), h, c, a[d + 1], 21, -2054922799), f = m(f, h = m(h, c = m(c, l, f, h, a[d + 8], 6, 1873313359), l, f, a[d + 15], 10, -30611744), c, l, a[d + 6], 15, -1560198380), h, c, a[d + 13], 21, 1309151649), f = m(f, h = m(h, c = m(c, l, f, h, a[d + 4], 6, -145523070), l, f, a[d + 11], 10, -1120210379), c, l, a[d + 2], 15, 718787259), h, c, a[d + 9], 21, -343485551), 
                        c = c + g >>> 0, l = l + y >>> 0, f = f + b >>> 0, h = h + w >>> 0;
                    }
                    return n.endian([ c, l, f, h ]);
                };
                s._ff = function(e, t, n, r, i, o, s) {
                    var a = e + (t & n | ~t & r) + (i >>> 0) + s;
                    return (a << o | a >>> 32 - o) + t;
                }, s._gg = function(e, t, n, r, i, o, s) {
                    var a = e + (t & r | n & ~r) + (i >>> 0) + s;
                    return (a << o | a >>> 32 - o) + t;
                }, s._hh = function(e, t, n, r, i, o, s) {
                    var a = e + (t ^ n ^ r) + (i >>> 0) + s;
                    return (a << o | a >>> 32 - o) + t;
                }, s._ii = function(e, t, n, r, i, o, s) {
                    var a = e + (n ^ (t | ~r)) + (i >>> 0) + s;
                    return (a << o | a >>> 32 - o) + t;
                }, s._blocksize = 16, s._digestsize = 16, t.exports = function(e, t) {
                    if (void 0 === e || null === e) throw new Error("Illegal argument " + e);
                    var r = n.wordsToBytes(s(e, t));
                    return t && t.asBytes ? r : t && t.asString ? o.bytesToString(r) : n.bytesToHex(r);
                };
            }();
        }, {
            charenc: 2,
            crypt: 4,
            "is-buffer": 11
        } ],
        14: [ function(e, t, n) {
            function r(e) {
                if (!((e = String(e)).length > 1e4)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var n = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                          case "years":
                          case "year":
                          case "yrs":
                          case "yr":
                          case "y":
                            return n * h;

                          case "days":
                          case "day":
                          case "d":
                            return n * f;

                          case "hours":
                          case "hour":
                          case "hrs":
                          case "hr":
                          case "h":
                            return n * l;

                          case "minutes":
                          case "minute":
                          case "mins":
                          case "min":
                          case "m":
                            return n * c;

                          case "seconds":
                          case "second":
                          case "secs":
                          case "sec":
                          case "s":
                            return n * u;

                          case "milliseconds":
                          case "millisecond":
                          case "msecs":
                          case "msec":
                          case "ms":
                            return n;

                          default:
                            return;
                        }
                    }
                }
            }
            function i(e) {
                return e >= f ? Math.round(e / f) + "d" : e >= l ? Math.round(e / l) + "h" : e >= c ? Math.round(e / c) + "m" : e >= u ? Math.round(e / u) + "s" : e + "ms";
            }
            function o(e) {
                return a(e, f, "day") || a(e, l, "hour") || a(e, c, "minute") || a(e, u, "second") || e + " ms";
            }
            function a(e, t, n) {
                if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";
            }
            var u = 1e3, c = 60 * u, l = 60 * c, f = 24 * l, h = 365.25 * f;
            t.exports = function(e, t) {
                t = t || {};
                var n = void 0 === e ? "undefined" : s(e);
                if ("string" === n && e.length > 0) return r(e);
                if ("number" === n && !1 === isNaN(e)) return t.long ? o(e) : i(e);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
            };
        }, {} ],
        15: [ function(e, t, n) {
            function r() {
                throw new Error("setTimeout has not been defined");
            }
            function i() {
                throw new Error("clearTimeout has not been defined");
            }
            function o(e) {
                if (f === setTimeout) return setTimeout(e, 0);
                if ((f === r || !f) && setTimeout) return f = setTimeout, setTimeout(e, 0);
                try {
                    return f(e, 0);
                } catch (t) {
                    try {
                        return f.call(null, e, 0);
                    } catch (t) {
                        return f.call(this, e, 0);
                    }
                }
            }
            function s(e) {
                if (h === clearTimeout) return clearTimeout(e);
                if ((h === i || !h) && clearTimeout) return h = clearTimeout, clearTimeout(e);
                try {
                    return h(e);
                } catch (t) {
                    try {
                        return h.call(null, e);
                    } catch (t) {
                        return h.call(this, e);
                    }
                }
            }
            function a() {
                v && p && (v = !1, p.length ? _ = p.concat(_) : m = -1, _.length && u());
            }
            function u() {
                if (!v) {
                    var e = o(a);
                    v = !0;
                    for (var t = _.length; t; ) {
                        for (p = _, _ = []; ++m < t; ) p && p[m].run();
                        m = -1, t = _.length;
                    }
                    p = null, v = !1, s(e);
                }
            }
            function c(e, t) {
                this.fun = e, this.array = t;
            }
            function l() {}
            var f, h, d = t.exports = {};
            !function() {
                try {
                    f = "function" == typeof setTimeout ? setTimeout : r;
                } catch (e) {
                    f = r;
                }
                try {
                    h = "function" == typeof clearTimeout ? clearTimeout : i;
                } catch (e) {
                    h = i;
                }
            }();
            var p, _ = [], v = !1, m = -1;
            d.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                _.push(new c(e, t)), 1 !== _.length || v || o(u);
            }, c.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", 
            d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, 
            d.removeAllListeners = l, d.emit = l, d.binding = function(e) {
                throw new Error("process.binding is not supported");
            }, d.cwd = function() {
                return "/";
            }, d.chdir = function(e) {
                throw new Error("process.chdir is not supported");
            }, d.umask = function() {
                return 0;
            };
        }, {} ],
        16: [ function(e, t, n) {
            (function(r, i) {
                !function(e, r) {
                    r("object" === (void 0 === n ? "undefined" : s(n)) && void 0 !== t ? n : e.RSVP = e.RSVP || {});
                }(this, function(t) {
                    function n(e, t) {
                        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                        return -1;
                    }
                    function o(e) {
                        var t = e._promiseCallbacks;
                        return t || (t = e._promiseCallbacks = {}), t;
                    }
                    function a(e, t) {
                        if ("onerror" !== e) return 2 !== arguments.length ? me[e] : void (me[e] = t);
                        me.on("error", t);
                    }
                    function u(e) {
                        return "function" == typeof e || "object" === (void 0 === e ? "undefined" : s(e)) && null !== e;
                    }
                    function c(e) {
                        return "function" == typeof e;
                    }
                    function l(e) {
                        return "object" === (void 0 === e ? "undefined" : s(e)) && null !== e;
                    }
                    function f() {}
                    function h() {
                        setTimeout(function() {
                            for (var e = 0; e < Se.length; e++) {
                                var t = Se[e], n = t.payload;
                                n.guid = n.key + n.id, n.childGuid = n.key + n.childId, n.error && (n.stack = n.error.stack), 
                                me.trigger(t.name, t.payload);
                            }
                            Se.length = 0;
                        }, 50);
                    }
                    function d(e, t, n) {
                        1 === Se.push({
                            name: e,
                            payload: {
                                key: t._guidKey,
                                id: t._id,
                                eventName: e,
                                detail: t._result,
                                childId: n && n._id,
                                label: t._label,
                                timeStamp: be(),
                                error: me["instrument-with-stack"] ? new Error(t._label) : null
                            }
                        }) && h();
                    }
                    function p(e, t) {
                        var n = this;
                        if (e && "object" === (void 0 === e ? "undefined" : s(e)) && e.constructor === n) return e;
                        var r = new n(v, t);
                        return S(r, e), r;
                    }
                    function _() {
                        return new TypeError("A promises callback cannot return that same promise.");
                    }
                    function v() {}
                    function m(e) {
                        try {
                            return e.then;
                        } catch (e) {
                            return Ee.error = e, Ee;
                        }
                    }
                    function g(e, t, n, r) {
                        try {
                            e.call(t, n, r);
                        } catch (e) {
                            return e;
                        }
                    }
                    function y(e, t, n) {
                        me.async(function(e) {
                            var r = !1, i = g(n, t, function(n) {
                                r || (r = !0, t !== n ? S(e, n, void 0) : O(e, n));
                            }, function(t) {
                                r || (r = !0, x(e, t));
                            }, "Settle: " + (e._label || " unknown promise"));
                            !r && i && (r = !0, x(e, i));
                        }, e);
                    }
                    function b(e, t) {
                        t._state === Oe ? O(e, t._result) : t._state === xe ? (t._onError = null, x(e, t._result)) : E(t, void 0, function(n) {
                            t !== n ? S(e, n, void 0) : O(e, n);
                        }, function(t) {
                            return x(e, t);
                        });
                    }
                    function w(e, t, n) {
                        t.constructor === e.constructor && n === U && e.constructor.resolve === p ? b(e, t) : n === Ee ? x(e, Ee.error) : void 0 === n ? O(e, t) : c(n) ? y(e, t, n) : O(e, t);
                    }
                    function S(e, t) {
                        e === t ? O(e, t) : u(t) ? w(e, t, m(t)) : O(e, t);
                    }
                    function A(e) {
                        e._onError && e._onError(e._result), j(e);
                    }
                    function O(e, t) {
                        e._state === Ae && (e._result = t, e._state = Oe, 0 === e._subscribers.length ? me.instrument && d("fulfilled", e) : me.async(j, e));
                    }
                    function x(e, t) {
                        e._state === Ae && (e._state = xe, e._result = t, me.async(A, e));
                    }
                    function E(e, t, n, r) {
                        var i = e._subscribers, o = i.length;
                        e._onError = null, i[o] = t, i[o + Oe] = n, i[o + xe] = r, 0 === o && e._state && me.async(j, e);
                    }
                    function j(e) {
                        var t = e._subscribers, n = e._state;
                        if (me.instrument && d(n === Oe ? "fulfilled" : "rejected", e), 0 !== t.length) {
                            for (var r = void 0, i = void 0, o = e._result, s = 0; s < t.length; s += 3) r = t[s], 
                            i = t[s + n], r ? C(n, r, i, o) : i(o);
                            e._subscribers.length = 0;
                        }
                    }
                    function T() {
                        this.error = null;
                    }
                    function N(e, t) {
                        try {
                            return e(t);
                        } catch (e) {
                            return je.error = e, je;
                        }
                    }
                    function C(e, t, n, r) {
                        var i = c(n), o = void 0, s = void 0, a = void 0, u = void 0;
                        if (i) {
                            if ((o = N(n, r)) === je ? (u = !0, s = o.error, o = null) : a = !0, t === o) return void x(t, _());
                        } else o = r, a = !0;
                        t._state !== Ae || (i && a ? S(t, o) : u ? x(t, s) : e === Oe ? O(t, o) : e === xe && x(t, o));
                    }
                    function I(e, t) {
                        var n = !1;
                        try {
                            t(function(t) {
                                n || (n = !0, S(e, t));
                            }, function(t) {
                                n || (n = !0, x(e, t));
                            });
                        } catch (t) {
                            x(e, t);
                        }
                    }
                    function U(e, t, n) {
                        var r = arguments, i = this, o = i._state;
                        if (o === Oe && !e || o === xe && !t) return me.instrument && d("chained", i, i), 
                        i;
                        i._onError = null;
                        var s = new i.constructor(v, n), a = i._result;
                        return me.instrument && d("chained", i, s), o ? function() {
                            var e = r[o - 1];
                            me.async(function() {
                                return C(o, s, e, a);
                            });
                        }() : E(i, s, e, t), s;
                    }
                    function k(e, t, n) {
                        return e === Oe ? {
                            state: "fulfilled",
                            value: n
                        } : {
                            state: "rejected",
                            reason: n
                        };
                    }
                    function P(e, t, n, r) {
                        this._instanceConstructor = e, this.promise = new e(v, r), this._abortOnReject = n, 
                        this._validateInput(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, 
                        this._init(), 0 === this.length ? O(this.promise, this._result) : (this.length = this.length || 0, 
                        this._enumerate(), 0 === this._remaining && O(this.promise, this._result))) : x(this.promise, this._validationError());
                    }
                    function R() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                    }
                    function D() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    }
                    function q(e, t) {
                        this._id = Ne++, this._label = t, this._state = void 0, this._result = void 0, this._subscribers = [], 
                        me.instrument && d("created", this), v !== e && ("function" != typeof e && R(), 
                        this instanceof q ? I(this, e) : D());
                    }
                    function L() {
                        this.value = void 0;
                    }
                    function M(e) {
                        try {
                            return e.then;
                        } catch (e) {
                            return Ce.value = e, Ce;
                        }
                    }
                    function F(e, t, n) {
                        try {
                            e.apply(t, n);
                        } catch (e) {
                            return Ce.value = e, Ce;
                        }
                    }
                    function B(e, t) {
                        for (var n = {}, r = e.length, i = new Array(r), o = 0; o < r; o++) i[o] = e[o];
                        for (var s = 0; s < t.length; s++) n[t[s]] = i[s + 1];
                        return n;
                    }
                    function V(e) {
                        for (var t = e.length, n = new Array(t - 1), r = 1; r < t; r++) n[r - 1] = e[r];
                        return n;
                    }
                    function J(e, t) {
                        return {
                            then: function(n, r) {
                                return e.call(t, n, r);
                            }
                        };
                    }
                    function W(e, t) {
                        var n = function() {
                            for (var n = this, r = arguments.length, i = new Array(r + 1), o = !1, s = 0; s < r; ++s) {
                                var a = arguments[s];
                                if (!o) {
                                    if ((o = G(a)) === Ie) {
                                        var u = new q(v);
                                        return x(u, Ie.value), u;
                                    }
                                    o && !0 !== o && (a = J(o, a));
                                }
                                i[s] = a;
                            }
                            var c = new q(v);
                            return i[r] = function(e, n) {
                                e ? x(c, e) : void 0 === t ? S(c, n) : !0 === t ? S(c, V(arguments)) : ye(t) ? S(c, B(arguments, t)) : S(c, n);
                            }, o ? Q(c, i, e, n) : z(c, i, e, n);
                        };
                        return n.__proto__ = e, n;
                    }
                    function z(e, t, n, r) {
                        var i = F(n, r, t);
                        return i === Ce && x(e, i.value), e;
                    }
                    function Q(e, t, n, r) {
                        return q.all(t).then(function(t) {
                            var i = F(n, r, t);
                            return i === Ce && x(e, i.value), e;
                        });
                    }
                    function G(e) {
                        return !(!e || "object" !== (void 0 === e ? "undefined" : s(e))) && (e.constructor === q || M(e));
                    }
                    function K(e, t) {
                        return q.all(e, t);
                    }
                    function H(e, t, n) {
                        this._superConstructor(e, t, !1, n);
                    }
                    function $(e, t) {
                        return new H(q, e, t).promise;
                    }
                    function X(e, t) {
                        return q.race(e, t);
                    }
                    function Y(e, t, n) {
                        this._superConstructor(e, t, !0, n);
                    }
                    function Z(e, t) {
                        return new Y(q, e, t).promise;
                    }
                    function ee(e, t, n) {
                        this._superConstructor(e, t, !1, n);
                    }
                    function te(e, t) {
                        return new ee(q, e, t).promise;
                    }
                    function ne(e) {
                        throw setTimeout(function() {
                            throw e;
                        }), e;
                    }
                    function re(e) {
                        var t = {
                            resolve: void 0,
                            reject: void 0
                        };
                        return t.promise = new q(function(e, n) {
                            t.resolve = e, t.reject = n;
                        }, e), t;
                    }
                    function ie(e, t, n) {
                        return q.all(e, n).then(function(e) {
                            if (!c(t)) throw new TypeError("You must pass a function as map's second argument.");
                            for (var r = e.length, i = new Array(r), o = 0; o < r; o++) i[o] = t(e[o]);
                            return q.all(i, n);
                        });
                    }
                    function oe(e, t) {
                        return q.resolve(e, t);
                    }
                    function se(e, t) {
                        return q.reject(e, t);
                    }
                    function ae(e, t) {
                        return q.all(e, t);
                    }
                    function ue(e, t) {
                        return q.resolve(e, t).then(function(e) {
                            return ae(e, t);
                        });
                    }
                    function ce(e, t, n) {
                        return (ye(e) ? ae(e, n) : ue(e, n)).then(function(e) {
                            if (!c(t)) throw new TypeError("You must pass a function as filter's second argument.");
                            for (var r = e.length, i = new Array(r), o = 0; o < r; o++) i[o] = t(e[o]);
                            return ae(i, n).then(function(t) {
                                for (var n = new Array(r), i = 0, o = 0; o < r; o++) t[o] && (n[i] = e[o], i++);
                                return n.length = i, n;
                            });
                        });
                    }
                    function le() {
                        return void 0 !== ke ? function() {
                            ke(he);
                        } : fe();
                    }
                    function fe() {
                        return function() {
                            return setTimeout(he, 1);
                        };
                    }
                    function he() {
                        for (var e = 0; e < Ue; e += 2) (0, Me[e])(Me[e + 1]), Me[e] = void 0, Me[e + 1] = void 0;
                        Ue = 0;
                    }
                    function de(e, t, n) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n, e;
                    }
                    function pe() {
                        me.on.apply(me, arguments);
                    }
                    function _e() {
                        me.off.apply(me, arguments);
                    }
                    var ve = {
                        mixin: function(e) {
                            return e.on = this.on, e.off = this.off, e.trigger = this.trigger, e._promiseCallbacks = void 0, 
                            e;
                        },
                        on: function(e, t) {
                            if ("function" != typeof t) throw new TypeError("Callback must be a function");
                            var r = o(this), i = void 0;
                            (i = r[e]) || (i = r[e] = []), -1 === n(i, t) && i.push(t);
                        },
                        off: function(e, t) {
                            var r = o(this), i = void 0, s = void 0;
                            t ? -1 !== (s = n(i = r[e], t)) && i.splice(s, 1) : r[e] = [];
                        },
                        trigger: function(e, t, n) {
                            var r = void 0;
                            if (r = o(this)[e]) for (var i = 0; i < r.length; i++) (0, r[i])(t, n);
                        }
                    }, me = {
                        instrument: !1
                    };
                    ve.mixin(me);
                    var ge = void 0, ye = ge = Array.isArray ? Array.isArray : function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e);
                    }, be = Date.now || function() {
                        return new Date().getTime();
                    }, we = Object.create || function(e) {
                        if (arguments.length > 1) throw new Error("Second argument not supported");
                        if ("object" !== (void 0 === e ? "undefined" : s(e))) throw new TypeError("Argument must be an object");
                        return f.prototype = e, new f();
                    }, Se = [], Ae = void 0, Oe = 1, xe = 2, Ee = new T(), je = new T();
                    P.prototype._validateInput = function(e) {
                        return ye(e);
                    }, P.prototype._validationError = function() {
                        return new Error("Array Methods must be provided an Array");
                    }, P.prototype._init = function() {
                        this._result = new Array(this.length);
                    }, P.prototype._enumerate = function() {
                        for (var e = this.length, t = this.promise, n = this._input, r = 0; t._state === Ae && r < e; r++) this._eachEntry(n[r], r);
                    }, P.prototype._settleMaybeThenable = function(e, t) {
                        var n = this._instanceConstructor, r = n.resolve;
                        if (r === p) {
                            var i = m(e);
                            if (i === U && e._state !== Ae) e._onError = null, this._settledAt(e._state, t, e._result); else if ("function" != typeof i) this._remaining--, 
                            this._result[t] = this._makeResult(Oe, t, e); else if (n === q) {
                                var o = new n(v);
                                w(o, e, i), this._willSettleAt(o, t);
                            } else this._willSettleAt(new n(function(t) {
                                return t(e);
                            }), t);
                        } else this._willSettleAt(r(e), t);
                    }, P.prototype._eachEntry = function(e, t) {
                        l(e) ? this._settleMaybeThenable(e, t) : (this._remaining--, this._result[t] = this._makeResult(Oe, t, e));
                    }, P.prototype._settledAt = function(e, t, n) {
                        var r = this.promise;
                        r._state === Ae && (this._remaining--, this._abortOnReject && e === xe ? x(r, n) : this._result[t] = this._makeResult(e, t, n)), 
                        0 === this._remaining && O(r, this._result);
                    }, P.prototype._makeResult = function(e, t, n) {
                        return n;
                    }, P.prototype._willSettleAt = function(e, t) {
                        var n = this;
                        E(e, void 0, function(e) {
                            return n._settledAt(Oe, t, e);
                        }, function(e) {
                            return n._settledAt(xe, t, e);
                        });
                    };
                    var Te = "rsvp_" + be() + "-", Ne = 0;
                    q.cast = p, q.all = function(e, t) {
                        return new P(this, e, !0, t).promise;
                    }, q.race = function(e, t) {
                        var n = this, r = new n(v, t);
                        if (!ye(e)) return x(r, new TypeError("You must pass an array to race.")), r;
                        for (var i = 0; r._state === Ae && i < e.length; i++) E(n.resolve(e[i]), void 0, function(e) {
                            return S(r, e);
                        }, function(e) {
                            return x(r, e);
                        });
                        return r;
                    }, q.resolve = p, q.reject = function(e, t) {
                        var n = new this(v, t);
                        return x(n, e), n;
                    }, q.prototype = {
                        constructor: q,
                        _guidKey: Te,
                        _onError: function(e) {
                            var t = this;
                            me.after(function() {
                                t._onError && me.trigger("error", e, t._label);
                            });
                        },
                        then: U,
                        catch: function(e, t) {
                            return this.then(void 0, e, t);
                        },
                        finally: function(e, t) {
                            var n = this, r = n.constructor;
                            return n.then(function(t) {
                                return r.resolve(e()).then(function() {
                                    return t;
                                });
                            }, function(t) {
                                return r.resolve(e()).then(function() {
                                    throw t;
                                });
                            }, t);
                        }
                    };
                    var Ce = new L(), Ie = new L();
                    H.prototype = we(P.prototype), H.prototype._superConstructor = P, H.prototype._makeResult = k, 
                    H.prototype._validationError = function() {
                        return new Error("allSettled must be called with an array");
                    }, Y.prototype = we(P.prototype), Y.prototype._superConstructor = P, Y.prototype._init = function() {
                        this._result = {};
                    }, Y.prototype._validateInput = function(e) {
                        return e && "object" === (void 0 === e ? "undefined" : s(e));
                    }, Y.prototype._validationError = function() {
                        return new Error("Promise.hash must be called with an object");
                    }, Y.prototype._enumerate = function() {
                        var e = this, t = e.promise, n = e._input, r = [];
                        for (var i in n) t._state === Ae && Object.prototype.hasOwnProperty.call(n, i) && r.push({
                            position: i,
                            entry: n[i]
                        });
                        var o = r.length;
                        e._remaining = o;
                        for (var s = void 0, a = 0; t._state === Ae && a < o; a++) s = r[a], e._eachEntry(s.entry, s.position);
                    }, ee.prototype = we(Y.prototype), ee.prototype._superConstructor = P, ee.prototype._makeResult = k, 
                    ee.prototype._validationError = function() {
                        return new Error("hashSettled must be called with an object");
                    };
                    var Ue = 0, ke = void 0, Pe = "undefined" != typeof window ? window : void 0, Re = Pe || {}, De = Re.MutationObserver || Re.WebKitMutationObserver, qe = "undefined" == typeof self && void 0 !== r && "[object process]" === {}.toString.call(r), Le = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, Me = new Array(1e3), Fe = void 0;
                    Fe = qe ? function() {
                        var e = r.nextTick, t = r.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
                        return Array.isArray(t) && "0" === t[1] && "10" === t[2] && (e = setImmediate), 
                        function() {
                            return e(he);
                        };
                    }() : De ? function() {
                        var e = 0, t = new De(he), n = document.createTextNode("");
                        return t.observe(n, {
                            characterData: !0
                        }), function() {
                            return n.data = e = ++e % 2;
                        };
                    }() : Le ? function() {
                        var e = new MessageChannel();
                        return e.port1.onmessage = he, function() {
                            return e.port2.postMessage(0);
                        };
                    }() : void 0 === Pe && "function" == typeof e ? function() {
                        try {
                            var t = e("vertx");
                            return ke = t.runOnLoop || t.runOnContext, le();
                        } catch (e) {
                            return fe();
                        }
                    }() : fe();
                    if ("object" === ("undefined" == typeof self ? "undefined" : s(self))) self; else {
                        if ("object" !== (void 0 === i ? "undefined" : s(i))) throw new Error("no global: `self` or `global` found");
                        i;
                    }
                    var Be;
                    me.async = function(e, t) {
                        Me[Ue] = e, Me[Ue + 1] = t, 2 === (Ue += 2) && Fe();
                    }, me.after = function(e) {
                        return setTimeout(e, 0);
                    };
                    var Ve = oe, Je = function(e, t) {
                        return me.async(e, t);
                    };
                    if ("undefined" != typeof window && "object" === s(window.__PROMISE_INSTRUMENTATION__)) {
                        var We = window.__PROMISE_INSTRUMENTATION__;
                        a("instrument", !0);
                        for (var ze in We) We.hasOwnProperty(ze) && pe(ze, We[ze]);
                    }
                    var Qe = (Be = {
                        cast: Ve,
                        Promise: q,
                        EventTarget: ve,
                        all: K,
                        allSettled: $,
                        race: X,
                        hash: Z,
                        hashSettled: te,
                        rethrow: ne,
                        defer: re,
                        denodeify: W,
                        configure: a,
                        on: pe,
                        off: _e,
                        resolve: oe,
                        reject: se,
                        map: ie
                    }, de(Be, "async", Je), de(Be, "filter", ce), Be);
                    t.default = Qe, t.cast = Ve, t.Promise = q, t.EventTarget = ve, t.all = K, t.allSettled = $, 
                    t.race = X, t.hash = Z, t.hashSettled = te, t.rethrow = ne, t.defer = re, t.denodeify = W, 
                    t.configure = a, t.on = pe, t.off = _e, t.resolve = oe, t.reject = se, t.map = ie, 
                    t.async = Je, t.filter = ce, Object.defineProperty(t, "__esModule", {
                        value: !0
                    });
                });
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            _process: 15
        } ],
        17: [ function(e, t, n) {
            function r() {}
            function i(e) {
                if (!m(e)) return e;
                var t = [];
                for (var n in e) o(t, n, e[n]);
                return t.join("&");
            }
            function o(e, t, n) {
                if (null != n) if (Array.isArray(n)) n.forEach(function(n) {
                    o(e, t, n);
                }); else if (m(n)) for (var r in n) o(e, t + "[" + r + "]", n[r]); else e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n)); else null === n && e.push(encodeURIComponent(t));
            }
            function s(e) {
                for (var t, n, r = {}, i = e.split("&"), o = 0, s = i.length; o < s; ++o) -1 == (n = (t = i[o]).indexOf("=")) ? r[decodeURIComponent(t)] = "" : r[decodeURIComponent(t.slice(0, n))] = decodeURIComponent(t.slice(n + 1));
                return r;
            }
            function a(e) {
                var t, n, r, i, o = e.split(/\r?\n/), s = {};
                o.pop();
                for (var a = 0, u = o.length; a < u; ++a) t = (n = o[a]).indexOf(":"), r = n.slice(0, t).toLowerCase(), 
                i = y(n.slice(t + 1)), s[r] = i;
                return s;
            }
            function u(e) {
                return /[\/+]json\b/.test(e);
            }
            function c(e) {
                return e.split(/ *; */).shift();
            }
            function l(e) {
                return e.split(/ *; */).reduce(function(e, t) {
                    var n = t.split(/ *= */), r = n.shift(), i = n.shift();
                    return r && i && (e[r] = i), e;
                }, {});
            }
            function f(e, t) {
                t = t || {}, this.req = e, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, 
                this.statusText = this.req.xhr.statusText, this._setStatusProperties(this.xhr.status), 
                this.header = this.headers = a(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), 
                this._setHeaderProperties(this.header), this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
            }
            function h(e, t) {
                var n = this;
                this._query = this._query || [], this.method = e, this.url = t, this.header = {}, 
                this._header = {}, this.on("end", function() {
                    var e = null, t = null;
                    try {
                        t = new f(n);
                    } catch (t) {
                        return e = new Error("Parser is unable to parse the response"), e.parse = !0, e.original = t, 
                        e.rawResponse = n.xhr && n.xhr.responseText ? n.xhr.responseText : null, e.statusCode = n.xhr && n.xhr.status ? n.xhr.status : null, 
                        n.callback(e);
                    }
                    n.emit("response", t);
                    var r;
                    try {
                        (t.status < 200 || t.status >= 300) && ((r = new Error(t.statusText || "Unsuccessful HTTP response")).original = e, 
                        r.response = t, r.status = t.status);
                    } catch (e) {
                        r = e;
                    }
                    r ? n.callback(r, t) : n.callback(null, t);
                });
            }
            function d(e, t) {
                var n = g("DELETE", e);
                return t && n.end(t), n;
            }
            var p;
            "undefined" != typeof window ? p = window : "undefined" != typeof self ? p = self : (console.warn("Using browser-only version of superagent in non-browser environment"), 
            p = this);
            var _ = e("emitter"), v = e("./request-base"), m = e("./is-object"), g = t.exports = e("./request").bind(null, h);
            g.getXHR = function() {
                if (!(!p.XMLHttpRequest || p.location && "file:" == p.location.protocol && p.ActiveXObject)) return new XMLHttpRequest();
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {}
                throw Error("Browser-only verison of superagent could not find XHR");
            };
            var y = "".trim ? function(e) {
                return e.trim();
            } : function(e) {
                return e.replace(/(^\s*|\s*$)/g, "");
            };
            g.serializeObject = i, g.parseString = s, g.types = {
                html: "text/html",
                json: "application/json",
                xml: "application/xml",
                urlencoded: "application/x-www-form-urlencoded",
                form: "application/x-www-form-urlencoded",
                "form-data": "application/x-www-form-urlencoded"
            }, g.serialize = {
                "application/x-www-form-urlencoded": i,
                "application/json": JSON.stringify
            }, g.parse = {
                "application/x-www-form-urlencoded": s,
                "application/json": JSON.parse
            }, f.prototype.get = function(e) {
                return this.header[e.toLowerCase()];
            }, f.prototype._setHeaderProperties = function(e) {
                var t = this.header["content-type"] || "";
                this.type = c(t);
                var n = l(t);
                for (var r in n) this[r] = n[r];
            }, f.prototype._parseBody = function(e) {
                var t = g.parse[this.type];
                return !t && u(this.type) && (t = g.parse["application/json"]), t && e && (e.length || e instanceof Object) ? t(e) : null;
            }, f.prototype._setStatusProperties = function(e) {
                1223 === e && (e = 204);
                var t = e / 100 | 0;
                this.status = this.statusCode = e, this.statusType = t, this.info = 1 == t, this.ok = 2 == t, 
                this.clientError = 4 == t, this.serverError = 5 == t, this.error = (4 == t || 5 == t) && this.toError(), 
                this.accepted = 202 == e, this.noContent = 204 == e, this.badRequest = 400 == e, 
                this.unauthorized = 401 == e, this.notAcceptable = 406 == e, this.notFound = 404 == e, 
                this.forbidden = 403 == e;
            }, f.prototype.toError = function() {
                var e = this.req, t = e.method, n = e.url, r = "cannot " + t + " " + n + " (" + this.status + ")", i = new Error(r);
                return i.status = this.status, i.method = t, i.url = n, i;
            }, g.Response = f, _(h.prototype);
            for (var b in v) h.prototype[b] = v[b];
            h.prototype.type = function(e) {
                return this.set("Content-Type", g.types[e] || e), this;
            }, h.prototype.responseType = function(e) {
                return this._responseType = e, this;
            }, h.prototype.accept = function(e) {
                return this.set("Accept", g.types[e] || e), this;
            }, h.prototype.auth = function(e, t, n) {
                switch (n || (n = {
                    type: "basic"
                }), n.type) {
                  case "basic":
                    var r = btoa(e + ":" + t);
                    this.set("Authorization", "Basic " + r);
                    break;

                  case "auto":
                    this.username = e, this.password = t;
                }
                return this;
            }, h.prototype.query = function(e) {
                return "string" != typeof e && (e = i(e)), e && this._query.push(e), this;
            }, h.prototype.attach = function(e, t, n) {
                return this._getFormData().append(e, t, n || t.name), this;
            }, h.prototype._getFormData = function() {
                return this._formData || (this._formData = new p.FormData()), this._formData;
            }, h.prototype.callback = function(e, t) {
                var n = this._callback;
                this.clearTimeout(), n(e, t);
            }, h.prototype.crossDomainError = function() {
                var e = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
                e.crossDomain = !0, e.status = this.status, e.method = this.method, e.url = this.url, 
                this.callback(e);
            }, h.prototype._timeoutError = function() {
                var e = this._timeout, t = new Error("timeout of " + e + "ms exceeded");
                t.timeout = e, this.callback(t);
            }, h.prototype._appendQueryString = function() {
                var e = this._query.join("&");
                e && (this.url += ~this.url.indexOf("?") ? "&" + e : "?" + e);
            }, h.prototype.end = function(e) {
                var t = this, n = this.xhr = g.getXHR(), i = this._timeout, o = this._formData || this._data;
                this._callback = e || r, n.onreadystatechange = function() {
                    if (4 == n.readyState) {
                        var e;
                        try {
                            e = n.status;
                        } catch (t) {
                            e = 0;
                        }
                        if (0 == e) {
                            if (t.timedout) return t._timeoutError();
                            if (t._aborted) return;
                            return t.crossDomainError();
                        }
                        t.emit("end");
                    }
                };
                var s = function(e, n) {
                    n.total > 0 && (n.percent = n.loaded / n.total * 100), n.direction = e, t.emit("progress", n);
                };
                if (this.hasListeners("progress")) try {
                    n.onprogress = s.bind(null, "download"), n.upload && (n.upload.onprogress = s.bind(null, "upload"));
                } catch (e) {}
                if (i && !this._timer && (this._timer = setTimeout(function() {
                    t.timedout = !0, t.abort();
                }, i)), this._appendQueryString(), this.username && this.password ? n.open(this.method, this.url, !0, this.username, this.password) : n.open(this.method, this.url, !0), 
                this._withCredentials && (n.withCredentials = !0), "GET" != this.method && "HEAD" != this.method && "string" != typeof o && !this._isHost(o)) {
                    var a = this._header["content-type"], c = this._serializer || g.serialize[a ? a.split(";")[0] : ""];
                    !c && u(a) && (c = g.serialize["application/json"]), c && (o = c(o));
                }
                for (var l in this.header) null != this.header[l] && n.setRequestHeader(l, this.header[l]);
                return this._responseType && (n.responseType = this._responseType), this.emit("request", this), 
                n.send(void 0 !== o ? o : null), this;
            }, g.Request = h, g.get = function(e, t, n) {
                var r = g("GET", e);
                return "function" == typeof t && (n = t, t = null), t && r.query(t), n && r.end(n), 
                r;
            }, g.head = function(e, t, n) {
                var r = g("HEAD", e);
                return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), 
                r;
            }, g.options = function(e, t, n) {
                var r = g("OPTIONS", e);
                return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), 
                r;
            }, g.del = d, g.delete = d, g.patch = function(e, t, n) {
                var r = g("PATCH", e);
                return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), 
                r;
            }, g.post = function(e, t, n) {
                var r = g("POST", e);
                return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), 
                r;
            }, g.put = function(e, t, n) {
                var r = g("PUT", e);
                return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), 
                r;
            };
        }, {
            "./is-object": 18,
            "./request": 20,
            "./request-base": 19,
            emitter: 3
        } ],
        18: [ function(e, t, n) {
            t.exports = function(e) {
                return null !== e && "object" === (void 0 === e ? "undefined" : s(e));
            };
        }, {} ],
        19: [ function(e, t, n) {
            var r = e("./is-object");
            n.clearTimeout = function() {
                return this._timeout = 0, clearTimeout(this._timer), this;
            }, n.parse = function(e) {
                return this._parser = e, this;
            }, n.serialize = function(e) {
                return this._serializer = e, this;
            }, n.timeout = function(e) {
                return this._timeout = e, this;
            }, n.then = function(e, t) {
                if (!this._fullfilledPromise) {
                    var n = this;
                    this._fullfilledPromise = new Promise(function(e, t) {
                        n.end(function(n, r) {
                            n ? t(n) : e(r);
                        });
                    });
                }
                return this._fullfilledPromise.then(e, t);
            }, n.catch = function(e) {
                return this.then(void 0, e);
            }, n.use = function(e) {
                return e(this), this;
            }, n.get = function(e) {
                return this._header[e.toLowerCase()];
            }, n.getHeader = n.get, n.set = function(e, t) {
                if (r(e)) {
                    for (var n in e) this.set(n, e[n]);
                    return this;
                }
                return this._header[e.toLowerCase()] = t, this.header[e] = t, this;
            }, n.unset = function(e) {
                return delete this._header[e.toLowerCase()], delete this.header[e], this;
            }, n.field = function(e, t) {
                if (null === e || void 0 === e) throw new Error(".field(name, val) name can not be empty");
                if (r(e)) {
                    for (var n in e) this.field(n, e[n]);
                    return this;
                }
                if (null === t || void 0 === t) throw new Error(".field(name, val) val can not be empty");
                return this._getFormData().append(e, t), this;
            }, n.abort = function() {
                return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), 
                this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this);
            }, n.withCredentials = function() {
                return this._withCredentials = !0, this;
            }, n.redirects = function(e) {
                return this._maxRedirects = e, this;
            }, n.toJSON = function() {
                return {
                    method: this.method,
                    url: this.url,
                    data: this._data,
                    headers: this._header
                };
            }, n._isHost = function(e) {
                switch ({}.toString.call(e)) {
                  case "[object File]":
                  case "[object Blob]":
                  case "[object FormData]":
                    return !0;

                  default:
                    return !1;
                }
            }, n.send = function(e) {
                var t = r(e), n = this._header["content-type"];
                if (t && r(this._data)) for (var i in e) this._data[i] = e[i]; else "string" == typeof e ? (n || this.type("form"), 
                n = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == n ? this._data ? this._data + "&" + e : e : (this._data || "") + e) : this._data = e;
                return !t || this._isHost(e) ? this : (n || this.type("json"), this);
            };
        }, {
            "./is-object": 18
        } ],
        20: [ function(e, t, n) {
            t.exports = function(e, t, n) {
                return "function" == typeof n ? new e("GET", t).end(n) : 2 == arguments.length ? new e("GET", t) : new e(t, n);
            };
        }, {} ],
        21: [ function(e, t, n) {
            (function() {
                function e(e) {
                    function t(t, n, r, i, o, s) {
                        for (;o >= 0 && o < s; o += e) {
                            var a = i ? i[o] : o;
                            r = n(r, t[a], a, t);
                        }
                        return r;
                    }
                    return function(n, r, i, o) {
                        r = S(r, o, 4);
                        var s = !N(n) && w.keys(n), a = (s || n).length, u = e > 0 ? 0 : a - 1;
                        return arguments.length < 3 && (i = n[s ? s[u] : u], u += e), t(n, r, i, s, u, a);
                    };
                }
                function r(e) {
                    return function(t, n, r) {
                        n = A(n, r);
                        for (var i = T(t), o = e > 0 ? 0 : i - 1; o >= 0 && o < i; o += e) if (n(t[o], o, t)) return o;
                        return -1;
                    };
                }
                function i(e, t, n) {
                    return function(r, i, o) {
                        var s = 0, a = T(r);
                        if ("number" == typeof o) e > 0 ? s = o >= 0 ? o : Math.max(o + a, s) : a = o >= 0 ? Math.min(o + 1, a) : o + a + 1; else if (n && o && a) return o = n(r, i), 
                        r[o] === i ? o : -1;
                        if (i !== i) return (o = t(d.call(r, s, a), w.isNaN)) >= 0 ? o + s : -1;
                        for (o = e > 0 ? s : a - 1; o >= 0 && o < a; o += e) if (r[o] === i) return o;
                        return -1;
                    };
                }
                function o(e, t) {
                    var n = P.length, r = e.constructor, i = w.isFunction(r) && r.prototype || l, o = "constructor";
                    for (w.has(e, o) && !w.contains(t, o) && t.push(o); n--; ) (o = P[n]) in e && e[o] !== i[o] && !w.contains(t, o) && t.push(o);
                }
                var a = this, u = a._, c = Array.prototype, l = Object.prototype, f = Function.prototype, h = c.push, d = c.slice, p = l.toString, _ = l.hasOwnProperty, v = Array.isArray, m = Object.keys, g = f.bind, y = Object.create, b = function() {}, w = function e(t) {
                    return t instanceof e ? t : this instanceof e ? void (this._wrapped = t) : new e(t);
                };
                void 0 !== n ? (void 0 !== t && t.exports && (n = t.exports = w), n._ = w) : a._ = w, 
                w.VERSION = "1.8.3";
                var S = function(e, t, n) {
                    if (void 0 === t) return e;
                    switch (null == n ? 3 : n) {
                      case 1:
                        return function(n) {
                            return e.call(t, n);
                        };

                      case 2:
                        return function(n, r) {
                            return e.call(t, n, r);
                        };

                      case 3:
                        return function(n, r, i) {
                            return e.call(t, n, r, i);
                        };

                      case 4:
                        return function(n, r, i, o) {
                            return e.call(t, n, r, i, o);
                        };
                    }
                    return function() {
                        return e.apply(t, arguments);
                    };
                }, A = function(e, t, n) {
                    return null == e ? w.identity : w.isFunction(e) ? S(e, t, n) : w.isObject(e) ? w.matcher(e) : w.property(e);
                };
                w.iteratee = function(e, t) {
                    return A(e, t, 1 / 0);
                };
                var O = function(e, t) {
                    return function(n) {
                        var r = arguments.length;
                        if (r < 2 || null == n) return n;
                        for (var i = 1; i < r; i++) for (var o = arguments[i], s = e(o), a = s.length, u = 0; u < a; u++) {
                            var c = s[u];
                            t && void 0 !== n[c] || (n[c] = o[c]);
                        }
                        return n;
                    };
                }, x = function(e) {
                    if (!w.isObject(e)) return {};
                    if (y) return y(e);
                    b.prototype = e;
                    var t = new b();
                    return b.prototype = null, t;
                }, E = function(e) {
                    return function(t) {
                        return null == t ? void 0 : t[e];
                    };
                }, j = Math.pow(2, 53) - 1, T = E("length"), N = function(e) {
                    var t = T(e);
                    return "number" == typeof t && t >= 0 && t <= j;
                };
                w.each = w.forEach = function(e, t, n) {
                    t = S(t, n);
                    var r, i;
                    if (N(e)) for (r = 0, i = e.length; r < i; r++) t(e[r], r, e); else {
                        var o = w.keys(e);
                        for (r = 0, i = o.length; r < i; r++) t(e[o[r]], o[r], e);
                    }
                    return e;
                }, w.map = w.collect = function(e, t, n) {
                    t = A(t, n);
                    for (var r = !N(e) && w.keys(e), i = (r || e).length, o = Array(i), s = 0; s < i; s++) {
                        var a = r ? r[s] : s;
                        o[s] = t(e[a], a, e);
                    }
                    return o;
                }, w.reduce = w.foldl = w.inject = e(1), w.reduceRight = w.foldr = e(-1), w.find = w.detect = function(e, t, n) {
                    var r;
                    if (void 0 !== (r = N(e) ? w.findIndex(e, t, n) : w.findKey(e, t, n)) && -1 !== r) return e[r];
                }, w.filter = w.select = function(e, t, n) {
                    var r = [];
                    return t = A(t, n), w.each(e, function(e, n, i) {
                        t(e, n, i) && r.push(e);
                    }), r;
                }, w.reject = function(e, t, n) {
                    return w.filter(e, w.negate(A(t)), n);
                }, w.every = w.all = function(e, t, n) {
                    t = A(t, n);
                    for (var r = !N(e) && w.keys(e), i = (r || e).length, o = 0; o < i; o++) {
                        var s = r ? r[o] : o;
                        if (!t(e[s], s, e)) return !1;
                    }
                    return !0;
                }, w.some = w.any = function(e, t, n) {
                    t = A(t, n);
                    for (var r = !N(e) && w.keys(e), i = (r || e).length, o = 0; o < i; o++) {
                        var s = r ? r[o] : o;
                        if (t(e[s], s, e)) return !0;
                    }
                    return !1;
                }, w.contains = w.includes = w.include = function(e, t, n, r) {
                    return N(e) || (e = w.values(e)), ("number" != typeof n || r) && (n = 0), w.indexOf(e, t, n) >= 0;
                }, w.invoke = function(e, t) {
                    var n = d.call(arguments, 2), r = w.isFunction(t);
                    return w.map(e, function(e) {
                        var i = r ? t : e[t];
                        return null == i ? i : i.apply(e, n);
                    });
                }, w.pluck = function(e, t) {
                    return w.map(e, w.property(t));
                }, w.where = function(e, t) {
                    return w.filter(e, w.matcher(t));
                }, w.findWhere = function(e, t) {
                    return w.find(e, w.matcher(t));
                }, w.max = function(e, t, n) {
                    var r, i, o = -1 / 0, s = -1 / 0;
                    if (null == t && null != e) for (var a = 0, u = (e = N(e) ? e : w.values(e)).length; a < u; a++) (r = e[a]) > o && (o = r); else t = A(t, n), 
                    w.each(e, function(e, n, r) {
                        ((i = t(e, n, r)) > s || i === -1 / 0 && o === -1 / 0) && (o = e, s = i);
                    });
                    return o;
                }, w.min = function(e, t, n) {
                    var r, i, o = 1 / 0, s = 1 / 0;
                    if (null == t && null != e) for (var a = 0, u = (e = N(e) ? e : w.values(e)).length; a < u; a++) (r = e[a]) < o && (o = r); else t = A(t, n), 
                    w.each(e, function(e, n, r) {
                        ((i = t(e, n, r)) < s || i === 1 / 0 && o === 1 / 0) && (o = e, s = i);
                    });
                    return o;
                }, w.shuffle = function(e) {
                    for (var t, n = N(e) ? e : w.values(e), r = n.length, i = Array(r), o = 0; o < r; o++) (t = w.random(0, o)) !== o && (i[o] = i[t]), 
                    i[t] = n[o];
                    return i;
                }, w.sample = function(e, t, n) {
                    return null == t || n ? (N(e) || (e = w.values(e)), e[w.random(e.length - 1)]) : w.shuffle(e).slice(0, Math.max(0, t));
                }, w.sortBy = function(e, t, n) {
                    return t = A(t, n), w.pluck(w.map(e, function(e, n, r) {
                        return {
                            value: e,
                            index: n,
                            criteria: t(e, n, r)
                        };
                    }).sort(function(e, t) {
                        var n = e.criteria, r = t.criteria;
                        if (n !== r) {
                            if (n > r || void 0 === n) return 1;
                            if (n < r || void 0 === r) return -1;
                        }
                        return e.index - t.index;
                    }), "value");
                };
                var C = function(e) {
                    return function(t, n, r) {
                        var i = {};
                        return n = A(n, r), w.each(t, function(r, o) {
                            var s = n(r, o, t);
                            e(i, r, s);
                        }), i;
                    };
                };
                w.groupBy = C(function(e, t, n) {
                    w.has(e, n) ? e[n].push(t) : e[n] = [ t ];
                }), w.indexBy = C(function(e, t, n) {
                    e[n] = t;
                }), w.countBy = C(function(e, t, n) {
                    w.has(e, n) ? e[n]++ : e[n] = 1;
                }), w.toArray = function(e) {
                    return e ? w.isArray(e) ? d.call(e) : N(e) ? w.map(e, w.identity) : w.values(e) : [];
                }, w.size = function(e) {
                    return null == e ? 0 : N(e) ? e.length : w.keys(e).length;
                }, w.partition = function(e, t, n) {
                    t = A(t, n);
                    var r = [], i = [];
                    return w.each(e, function(e, n, o) {
                        (t(e, n, o) ? r : i).push(e);
                    }), [ r, i ];
                }, w.first = w.head = w.take = function(e, t, n) {
                    if (null != e) return null == t || n ? e[0] : w.initial(e, e.length - t);
                }, w.initial = function(e, t, n) {
                    return d.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)));
                }, w.last = function(e, t, n) {
                    if (null != e) return null == t || n ? e[e.length - 1] : w.rest(e, Math.max(0, e.length - t));
                }, w.rest = w.tail = w.drop = function(e, t, n) {
                    return d.call(e, null == t || n ? 1 : t);
                }, w.compact = function(e) {
                    return w.filter(e, w.identity);
                };
                var I = function e(t, n, r, i) {
                    for (var o = [], s = 0, a = i || 0, u = T(t); a < u; a++) {
                        var c = t[a];
                        if (N(c) && (w.isArray(c) || w.isArguments(c))) {
                            n || (c = e(c, n, r));
                            var l = 0, f = c.length;
                            for (o.length += f; l < f; ) o[s++] = c[l++];
                        } else r || (o[s++] = c);
                    }
                    return o;
                };
                w.flatten = function(e, t) {
                    return I(e, t, !1);
                }, w.without = function(e) {
                    return w.difference(e, d.call(arguments, 1));
                }, w.uniq = w.unique = function(e, t, n, r) {
                    w.isBoolean(t) || (r = n, n = t, t = !1), null != n && (n = A(n, r));
                    for (var i = [], o = [], s = 0, a = T(e); s < a; s++) {
                        var u = e[s], c = n ? n(u, s, e) : u;
                        t ? (s && o === c || i.push(u), o = c) : n ? w.contains(o, c) || (o.push(c), i.push(u)) : w.contains(i, u) || i.push(u);
                    }
                    return i;
                }, w.union = function() {
                    return w.uniq(I(arguments, !0, !0));
                }, w.intersection = function(e) {
                    for (var t = [], n = arguments.length, r = 0, i = T(e); r < i; r++) {
                        var o = e[r];
                        if (!w.contains(t, o)) {
                            for (var s = 1; s < n && w.contains(arguments[s], o); s++) ;
                            s === n && t.push(o);
                        }
                    }
                    return t;
                }, w.difference = function(e) {
                    var t = I(arguments, !0, !0, 1);
                    return w.filter(e, function(e) {
                        return !w.contains(t, e);
                    });
                }, w.zip = function() {
                    return w.unzip(arguments);
                }, w.unzip = function(e) {
                    for (var t = e && w.max(e, T).length || 0, n = Array(t), r = 0; r < t; r++) n[r] = w.pluck(e, r);
                    return n;
                }, w.object = function(e, t) {
                    for (var n = {}, r = 0, i = T(e); r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
                    return n;
                }, w.findIndex = r(1), w.findLastIndex = r(-1), w.sortedIndex = function(e, t, n, r) {
                    for (var i = (n = A(n, r, 1))(t), o = 0, s = T(e); o < s; ) {
                        var a = Math.floor((o + s) / 2);
                        n(e[a]) < i ? o = a + 1 : s = a;
                    }
                    return o;
                }, w.indexOf = i(1, w.findIndex, w.sortedIndex), w.lastIndexOf = i(-1, w.findLastIndex), 
                w.range = function(e, t, n) {
                    null == t && (t = e || 0, e = 0), n = n || 1;
                    for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), o = 0; o < r; o++, 
                    e += n) i[o] = e;
                    return i;
                };
                var U = function(e, t, n, r, i) {
                    if (!(r instanceof t)) return e.apply(n, i);
                    var o = x(e.prototype), s = e.apply(o, i);
                    return w.isObject(s) ? s : o;
                };
                w.bind = function(e, t) {
                    if (g && e.bind === g) return g.apply(e, d.call(arguments, 1));
                    if (!w.isFunction(e)) throw new TypeError("Bind must be called on a function");
                    var n = d.call(arguments, 2);
                    return function r() {
                        return U(e, r, t, this, n.concat(d.call(arguments)));
                    };
                }, w.partial = function(e) {
                    var t = d.call(arguments, 1);
                    return function n() {
                        for (var r = 0, i = t.length, o = Array(i), s = 0; s < i; s++) o[s] = t[s] === w ? arguments[r++] : t[s];
                        for (;r < arguments.length; ) o.push(arguments[r++]);
                        return U(e, n, this, this, o);
                    };
                }, w.bindAll = function(e) {
                    var t, n, r = arguments.length;
                    if (r <= 1) throw new Error("bindAll must be passed function names");
                    for (t = 1; t < r; t++) e[n = arguments[t]] = w.bind(e[n], e);
                    return e;
                }, w.memoize = function(e, t) {
                    var n = function n(r) {
                        var i = n.cache, o = "" + (t ? t.apply(this, arguments) : r);
                        return w.has(i, o) || (i[o] = e.apply(this, arguments)), i[o];
                    };
                    return n.cache = {}, n;
                }, w.delay = function(e, t) {
                    var n = d.call(arguments, 2);
                    return setTimeout(function() {
                        return e.apply(null, n);
                    }, t);
                }, w.defer = w.partial(w.delay, w, 1), w.throttle = function(e, t, n) {
                    var r, i, o, s = null, a = 0;
                    n || (n = {});
                    var u = function() {
                        a = !1 === n.leading ? 0 : w.now(), s = null, o = e.apply(r, i), s || (r = i = null);
                    };
                    return function() {
                        var c = w.now();
                        a || !1 !== n.leading || (a = c);
                        var l = t - (c - a);
                        return r = this, i = arguments, l <= 0 || l > t ? (s && (clearTimeout(s), s = null), 
                        a = c, o = e.apply(r, i), s || (r = i = null)) : s || !1 === n.trailing || (s = setTimeout(u, l)), 
                        o;
                    };
                }, w.debounce = function(e, t, n) {
                    var r, i, o, s, a, u = function u() {
                        var c = w.now() - s;
                        c < t && c >= 0 ? r = setTimeout(u, t - c) : (r = null, n || (a = e.apply(o, i), 
                        r || (o = i = null)));
                    };
                    return function() {
                        o = this, i = arguments, s = w.now();
                        var c = n && !r;
                        return r || (r = setTimeout(u, t)), c && (a = e.apply(o, i), o = i = null), a;
                    };
                }, w.wrap = function(e, t) {
                    return w.partial(t, e);
                }, w.negate = function(e) {
                    return function() {
                        return !e.apply(this, arguments);
                    };
                }, w.compose = function() {
                    var e = arguments, t = e.length - 1;
                    return function() {
                        for (var n = t, r = e[t].apply(this, arguments); n--; ) r = e[n].call(this, r);
                        return r;
                    };
                }, w.after = function(e, t) {
                    return function() {
                        if (--e < 1) return t.apply(this, arguments);
                    };
                }, w.before = function(e, t) {
                    var n;
                    return function() {
                        return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
                    };
                }, w.once = w.partial(w.before, 2);
                var k = !{
                    toString: null
                }.propertyIsEnumerable("toString"), P = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
                w.keys = function(e) {
                    if (!w.isObject(e)) return [];
                    if (m) return m(e);
                    var t = [];
                    for (var n in e) w.has(e, n) && t.push(n);
                    return k && o(e, t), t;
                }, w.allKeys = function(e) {
                    if (!w.isObject(e)) return [];
                    var t = [];
                    for (var n in e) t.push(n);
                    return k && o(e, t), t;
                }, w.values = function(e) {
                    for (var t = w.keys(e), n = t.length, r = Array(n), i = 0; i < n; i++) r[i] = e[t[i]];
                    return r;
                }, w.mapObject = function(e, t, n) {
                    t = A(t, n);
                    for (var r, i = w.keys(e), o = i.length, s = {}, a = 0; a < o; a++) s[r = i[a]] = t(e[r], r, e);
                    return s;
                }, w.pairs = function(e) {
                    for (var t = w.keys(e), n = t.length, r = Array(n), i = 0; i < n; i++) r[i] = [ t[i], e[t[i]] ];
                    return r;
                }, w.invert = function(e) {
                    for (var t = {}, n = w.keys(e), r = 0, i = n.length; r < i; r++) t[e[n[r]]] = n[r];
                    return t;
                }, w.functions = w.methods = function(e) {
                    var t = [];
                    for (var n in e) w.isFunction(e[n]) && t.push(n);
                    return t.sort();
                }, w.extend = O(w.allKeys), w.extendOwn = w.assign = O(w.keys), w.findKey = function(e, t, n) {
                    t = A(t, n);
                    for (var r, i = w.keys(e), o = 0, s = i.length; o < s; o++) if (r = i[o], t(e[r], r, e)) return r;
                }, w.pick = function(e, t, n) {
                    var r, i, o = {}, s = e;
                    if (null == s) return o;
                    w.isFunction(t) ? (i = w.allKeys(s), r = S(t, n)) : (i = I(arguments, !1, !1, 1), 
                    r = function(e, t, n) {
                        return t in n;
                    }, s = Object(s));
                    for (var a = 0, u = i.length; a < u; a++) {
                        var c = i[a], l = s[c];
                        r(l, c, s) && (o[c] = l);
                    }
                    return o;
                }, w.omit = function(e, t, n) {
                    if (w.isFunction(t)) t = w.negate(t); else {
                        var r = w.map(I(arguments, !1, !1, 1), String);
                        t = function(e, t) {
                            return !w.contains(r, t);
                        };
                    }
                    return w.pick(e, t, n);
                }, w.defaults = O(w.allKeys, !0), w.create = function(e, t) {
                    var n = x(e);
                    return t && w.extendOwn(n, t), n;
                }, w.clone = function(e) {
                    return w.isObject(e) ? w.isArray(e) ? e.slice() : w.extend({}, e) : e;
                }, w.tap = function(e, t) {
                    return t(e), e;
                }, w.isMatch = function(e, t) {
                    var n = w.keys(t), r = n.length;
                    if (null == e) return !r;
                    for (var i = Object(e), o = 0; o < r; o++) {
                        var s = n[o];
                        if (t[s] !== i[s] || !(s in i)) return !1;
                    }
                    return !0;
                };
                var R = function e(t, n, r, i) {
                    if (t === n) return 0 !== t || 1 / t == 1 / n;
                    if (null == t || null == n) return t === n;
                    t instanceof w && (t = t._wrapped), n instanceof w && (n = n._wrapped);
                    var o = p.call(t);
                    if (o !== p.call(n)) return !1;
                    switch (o) {
                      case "[object RegExp]":
                      case "[object String]":
                        return "" + t == "" + n;

                      case "[object Number]":
                        return +t != +t ? +n != +n : 0 == +t ? 1 / +t == 1 / n : +t == +n;

                      case "[object Date]":
                      case "[object Boolean]":
                        return +t == +n;
                    }
                    var a = "[object Array]" === o;
                    if (!a) {
                        if ("object" != (void 0 === t ? "undefined" : s(t)) || "object" != (void 0 === n ? "undefined" : s(n))) return !1;
                        var u = t.constructor, c = n.constructor;
                        if (u !== c && !(w.isFunction(u) && u instanceof u && w.isFunction(c) && c instanceof c) && "constructor" in t && "constructor" in n) return !1;
                    }
                    r = r || [], i = i || [];
                    for (var l = r.length; l--; ) if (r[l] === t) return i[l] === n;
                    if (r.push(t), i.push(n), a) {
                        if ((l = t.length) !== n.length) return !1;
                        for (;l--; ) if (!e(t[l], n[l], r, i)) return !1;
                    } else {
                        var f, h = w.keys(t);
                        if (l = h.length, w.keys(n).length !== l) return !1;
                        for (;l--; ) if (f = h[l], !w.has(n, f) || !e(t[f], n[f], r, i)) return !1;
                    }
                    return r.pop(), i.pop(), !0;
                };
                w.isEqual = function(e, t) {
                    return R(e, t);
                }, w.isEmpty = function(e) {
                    return null == e || (N(e) && (w.isArray(e) || w.isString(e) || w.isArguments(e)) ? 0 === e.length : 0 === w.keys(e).length);
                }, w.isElement = function(e) {
                    return !(!e || 1 !== e.nodeType);
                }, w.isArray = v || function(e) {
                    return "[object Array]" === p.call(e);
                }, w.isObject = function(e) {
                    var t = void 0 === e ? "undefined" : s(e);
                    return "function" === t || "object" === t && !!e;
                }, w.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(e) {
                    w["is" + e] = function(t) {
                        return p.call(t) === "[object " + e + "]";
                    };
                }), w.isArguments(arguments) || (w.isArguments = function(e) {
                    return w.has(e, "callee");
                }), "function" != typeof /./ && "object" != ("undefined" == typeof Int8Array ? "undefined" : s(Int8Array)) && (w.isFunction = function(e) {
                    return "function" == typeof e || !1;
                }), w.isFinite = function(e) {
                    return isFinite(e) && !isNaN(parseFloat(e));
                }, w.isNaN = function(e) {
                    return w.isNumber(e) && e !== +e;
                }, w.isBoolean = function(e) {
                    return !0 === e || !1 === e || "[object Boolean]" === p.call(e);
                }, w.isNull = function(e) {
                    return null === e;
                }, w.isUndefined = function(e) {
                    return void 0 === e;
                }, w.has = function(e, t) {
                    return null != e && _.call(e, t);
                }, w.noConflict = function() {
                    return a._ = u, this;
                }, w.identity = function(e) {
                    return e;
                }, w.constant = function(e) {
                    return function() {
                        return e;
                    };
                }, w.noop = function() {}, w.property = E, w.propertyOf = function(e) {
                    return null == e ? function() {} : function(t) {
                        return e[t];
                    };
                }, w.matcher = w.matches = function(e) {
                    return e = w.extendOwn({}, e), function(t) {
                        return w.isMatch(t, e);
                    };
                }, w.times = function(e, t, n) {
                    var r = Array(Math.max(0, e));
                    t = S(t, n, 1);
                    for (var i = 0; i < e; i++) r[i] = t(i);
                    return r;
                }, w.random = function(e, t) {
                    return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
                }, w.now = Date.now || function() {
                    return new Date().getTime();
                };
                var D = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                }, q = w.invert(D), L = function(e) {
                    var t = function(t) {
                        return e[t];
                    }, n = "(?:" + w.keys(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
                    return function(e) {
                        return e = null == e ? "" : "" + e, r.test(e) ? e.replace(i, t) : e;
                    };
                };
                w.escape = L(D), w.unescape = L(q), w.result = function(e, t, n) {
                    var r = null == e ? void 0 : e[t];
                    return void 0 === r && (r = n), w.isFunction(r) ? r.call(e) : r;
                };
                var M = 0;
                w.uniqueId = function(e) {
                    var t = ++M + "";
                    return e ? e + t : t;
                }, w.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                };
                var F = /(.)^/, B = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }, V = /\\|'|\r|\n|\u2028|\u2029/g, J = function(e) {
                    return "\\" + B[e];
                };
                w.template = function(e, t, n) {
                    !t && n && (t = n), t = w.defaults({}, t, w.templateSettings);
                    var r = RegExp([ (t.escape || F).source, (t.interpolate || F).source, (t.evaluate || F).source ].join("|") + "|$", "g"), i = 0, o = "__p+='";
                    e.replace(r, function(t, n, r, s, a) {
                        return o += e.slice(i, a).replace(V, J), i = a + t.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : s && (o += "';\n" + s + "\n__p+='"), 
                        t;
                    }), o += "';\n", t.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
                    try {
                        var s = new Function(t.variable || "obj", "_", o);
                    } catch (e) {
                        throw e.source = o, e;
                    }
                    var a = function(e) {
                        return s.call(this, e, w);
                    }, u = t.variable || "obj";
                    return a.source = "function(" + u + "){\n" + o + "}", a;
                }, w.chain = function(e) {
                    var t = w(e);
                    return t._chain = !0, t;
                };
                var W = function(e, t) {
                    return e._chain ? w(t).chain() : t;
                };
                w.mixin = function(e) {
                    w.each(w.functions(e), function(t) {
                        var n = w[t] = e[t];
                        w.prototype[t] = function() {
                            var e = [ this._wrapped ];
                            return h.apply(e, arguments), W(this, n.apply(w, e));
                        };
                    });
                }, w.mixin(w), w.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
                    var t = c[e];
                    w.prototype[e] = function() {
                        var n = this._wrapped;
                        return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], 
                        W(this, n);
                    };
                }), w.each([ "concat", "join", "slice" ], function(e) {
                    var t = c[e];
                    w.prototype[e] = function() {
                        return W(this, t.apply(this._wrapped, arguments));
                    };
                }), w.prototype.value = function() {
                    return this._wrapped;
                }, w.prototype.valueOf = w.prototype.toJSON = w.prototype.value, w.prototype.toString = function() {
                    return "" + this._wrapped;
                };
            }).call(this);
        }, {} ],
        22: [ function(e, t, n) {
            var r = e("./index.js").polyfill;
            window = window || {}, r(), r(window);
            try {
                localStorage = localStorage || e("./localstorage.js");
            } catch (e) {}
            try {
                XMLHttpRequest = XMLHttpRequest || e("./xmlhttprequest.js");
            } catch (e) {}
            try {
                FormData = FormData || e("./formdata.js");
            } catch (e) {}
            try {
                WebSocket = WebSocket || e("./websocket.js");
            } catch (e) {}
        }, {
            "./formdata.js": 23,
            "./index.js": 24,
            "./localstorage.js": 25,
            "./websocket.js": 26,
            "./xmlhttprequest.js": 27
        } ],
        23: [ function(e, t, n) {
            var i = function() {
                function e() {
                    r(this, e), this._entries = [];
                }
                return o(e, [ {
                    key: "append",
                    value: function(e, t) {
                        if ("string" != typeof e) throw new TypeError("FormData name must be a string");
                        if ("string" != typeof t && ("object" !== (void 0 === t ? "undefined" : s(t)) || "string" != typeof t.uri)) throw new TypeError("FormData value must be a string or { uri: tempFilePath }");
                        this._entries.push([ e, t ]);
                    }
                }, {
                    key: "set",
                    value: function(e, t) {
                        var n = this.get(e);
                        n ? n[1] = t : this.append(e, t);
                    }
                }, {
                    key: "delete",
                    value: function(e) {
                        this._entries = this._entries.filter(function(t) {
                            return t[0] !== e;
                        });
                    }
                }, {
                    key: "entries",
                    value: function() {
                        return this._entries;
                    }
                }, {
                    key: "get",
                    value: function(e) {
                        return this._entries.find(function(t) {
                            return t[0] === e;
                        });
                    }
                }, {
                    key: "getAll",
                    value: function(e) {
                        return this._entries.filter(function(t) {
                            return t[0] === e;
                        });
                    }
                }, {
                    key: "has",
                    value: function(e) {
                        return this._entries.some(function(t) {
                            return t[0] === e;
                        });
                    }
                }, {
                    key: "keys",
                    value: function() {
                        return this._entries.map(function(e) {
                            return e[0];
                        });
                    }
                }, {
                    key: "values",
                    value: function() {
                        return this._entries.map(function(e) {
                            return e[1];
                        });
                    }
                } ]), e;
            }();
            t.exports = i;
        }, {} ],
        24: [ function(e, t, n) {
            (function(n) {
                var r = e("./localstorage.js"), i = e("./xmlhttprequest.js"), o = e("./formdata.js"), a = e("./websocket.js");
                t.exports = {
                    polyfill: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n || window;
                        if ("object" !== (void 0 === e ? "undefined" : s(e))) throw new Error("polyfill target is not an Object");
                        Object.assign(e, {
                            localStorage: r,
                            XMLHttpRequest: i,
                            FormData: o,
                            WebSocket: a,
                            Object: Object
                        }), e.localStorage !== r && (e.wxStorage = r);
                    },
                    localStorage: r,
                    XMLHttpRequest: i,
                    FormData: o,
                    WebSocket: a
                };
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./formdata.js": 23,
            "./localstorage.js": 25,
            "./websocket.js": 26,
            "./xmlhttprequest.js": 27
        } ],
        25: [ function(e, t, n) {
            var i = function() {
                function e() {
                    r(this, e);
                }
                return o(e, [ {
                    key: "getItem",
                    value: function(e) {
                        return wx.getStorageSync(e);
                    }
                }, {
                    key: "setItem",
                    value: function(e, t) {
                        return wx.setStorageSync(e, t);
                    }
                }, {
                    key: "removeItem",
                    value: function(e) {
                        return this.setItem(e, "");
                    }
                }, {
                    key: "clear",
                    value: function() {
                        return wx.clearStorageSync();
                    }
                } ]), e;
            }();
            t.exports = new i();
        }, {} ],
        26: [ function(e, i, s) {
            var a = e("event-target-shim"), u = 0, c = [ "open", "error", "message", "close" ], l = void 0;
            wx.onSocketOpen(function(e) {
                l && (l._readyState = 1, l.dispatchEvent({
                    type: "open"
                }));
            }), wx.onSocketError(function(e) {
                l && (l._readyState = 3, l.dispatchEvent(e));
            }), wx.onSocketMessage(function(e) {
                if (l) {
                    var t = e.data, n = e.origin, r = e.ports, i = e.source;
                    l.dispatchEvent({
                        data: t,
                        origin: n,
                        ports: r,
                        source: i,
                        type: "message"
                    });
                }
            }), wx.onSocketClose(function(e) {
                if (l) {
                    l._readyState = 3;
                    var t = e.code, n = e.reason, r = e.wasClean;
                    l.dispatchEvent({
                        code: t,
                        reason: n,
                        wasClean: r,
                        type: "close"
                    }), l = null;
                }
            });
            var f = function(e) {
                function i(e, n) {
                    if (r(this, i), !e) throw new TypeError("Failed to construct 'WebSocket': url required");
                    if (n) throw new Error("subprotocal not supported in weapp");
                    var o = t(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
                    return o._url = e, o._protocal = "", o._readyState = u, l && l.dispatchEvent({
                        type: "close"
                    }), l = o, wx.connectSocket({
                        url: e
                    }), o;
                }
                return n(i, a(c)), o(i, [ {
                    key: "close",
                    value: function() {
                        this.readyState === u && console.warn("close WebSocket which is connecting might not work"), 
                        wx.closeSocket();
                    }
                }, {
                    key: "send",
                    value: function(e) {
                        if (1 !== this.readyState) throw new Error("INVALID_STATE_ERR");
                        if ("string" != typeof e) throw new TypeError("only string typed data are supported");
                        wx.sendSocketMessage({
                            data: e
                        });
                    }
                }, {
                    key: "url",
                    get: function() {
                        return this._url;
                    }
                }, {
                    key: "protocal",
                    get: function() {
                        return this._protocal;
                    }
                }, {
                    key: "readyState",
                    get: function() {
                        return this._readyState;
                    }
                } ]), i;
            }();
            Object.assign(f, {
                CONNECTING: u,
                OPEN: 1,
                CLOSING: 2,
                CLOSED: 3
            }), i.exports = f;
        }, {
            "event-target-shim": 9
        } ],
        27: [ function(i, s, a) {
            function u(e) {
                this.status = e.statusCode, this.statusText = e.statusCode;
                var t = e.data;
                "string" != typeof t && (t = JSON.stringify(t)), this.responseText = this.response = t, 
                this.readyState = h, this.dispatchEvent({
                    type: "readystatechange"
                });
            }
            var c = i("event-target-shim"), l = i("./formdata.js"), f = 0, h = 4, d = [ "abort", "error", "load", "loadstart", "progress", "timeout", "loadend", "readystatechange" ], p = function(i) {
                function s() {
                    r(this, s);
                    var e = t(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this));
                    return e.readyState = f, e._headers = {}, e;
                }
                return n(s, c(d)), o(s, [ {
                    key: "abort",
                    value: function() {
                        throw new Error("not supported in weapp");
                    }
                }, {
                    key: "getAllResponseHeaders",
                    value: function() {
                        return console.warn("getAllResponseHeaders always returns ''"), "";
                    }
                }, {
                    key: "getResponseHeader",
                    value: function(e) {
                        return "content-type" === e ? (console.warn("get content-type always returns 'application/json'"), 
                        "application/json") : (console.warn("getResponseHeader always returns ''"), "");
                    }
                }, {
                    key: "overrideMimeType",
                    value: function() {
                        throw new Error("not supported in weapp");
                    }
                }, {
                    key: "open",
                    value: function(e, t) {
                        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        if (this.readyState !== f) throw new Error("request is already opened");
                        if (!n) throw new Error("sync request is not supported");
                        this._method = e, this._url = t, this.readyState = 1, this.dispatchEvent({
                            type: "readystatechange"
                        });
                    }
                }, {
                    key: "setRequestHeader",
                    value: function(e, t) {
                        if (1 !== this.readyState) throw new Error("request is not opened");
                        this._headers[e.toLowerCase()] = t;
                    }
                }, {
                    key: "send",
                    value: function(t) {
                        var n = this;
                        if (1 !== this.readyState) throw new Error("request is not opened");
                        if (t instanceof l) {
                            var r = t.entries(), i = r.filter(function(e) {
                                return "string" != typeof e[1];
                            });
                            if (0 === i.length) throw new Error("Must specify a Blob field in FormData");
                            i.length > 1 && console.warn("Only the first Blob will be send in Weapp");
                            var o = r.filter(function(e) {
                                return "string" == typeof e[1];
                            }).reduce(function(t, n) {
                                return Object.assign(t, e({}, n[0], n[1]));
                            }, {});
                            wx.uploadFile({
                                url: this._url,
                                name: i[0][0],
                                filePath: i[0][1].uri,
                                formData: o,
                                header: this._headers,
                                success: u.bind(this),
                                fail: function(e) {
                                    n.dispatchEvent({
                                        type: "error"
                                    });
                                }
                            });
                        } else wx.request({
                            url: this._url,
                            data: t || "",
                            method: this._method,
                            header: this._headers,
                            success: u.bind(this),
                            fail: function(e) {
                                n.dispatchEvent({
                                    type: "error"
                                });
                            }
                        });
                    }
                } ]), s;
            }();
            Object.assign(p, {
                UNSENT: f,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: h
            }), s.exports = p;
        }, {
            "./formdata.js": 23,
            "event-target-shim": 9
        } ],
        28: [ function(e, t, n) {
            var r = e("underscore");
            t.exports = function(e) {
                e.ACL = function(t) {
                    var n = this;
                    if (n.permissionsById = {}, r.isObject(t)) if (t instanceof e.User) n.setReadAccess(t, !0), 
                    n.setWriteAccess(t, !0); else {
                        if (r.isFunction(t)) throw "AV.ACL() called with a function.  Did you forget ()?";
                        e._objectEach(t, function(t, i) {
                            if (!r.isString(i)) throw "Tried to create an ACL with an invalid userId.";
                            n.permissionsById[i] = {}, e._objectEach(t, function(e, t) {
                                if ("read" !== t && "write" !== t) throw "Tried to create an ACL with an invalid permission type.";
                                if (!r.isBoolean(e)) throw "Tried to create an ACL with an invalid permission value.";
                                n.permissionsById[i][t] = e;
                            });
                        });
                    }
                }, e.ACL.prototype.toJSON = function() {
                    return r.clone(this.permissionsById);
                }, e.ACL.prototype._setAccess = function(t, n, i) {
                    if (n instanceof e.User ? n = n.id : n instanceof e.Role && (n = "role:" + n.getName()), 
                    !r.isString(n)) throw "userId must be a string.";
                    if (!r.isBoolean(i)) throw "allowed must be either true or false.";
                    var o = this.permissionsById[n];
                    if (!o) {
                        if (!i) return;
                        o = {}, this.permissionsById[n] = o;
                    }
                    i ? this.permissionsById[n][t] = !0 : (delete o[t], r.isEmpty(o) && delete o[n]);
                }, e.ACL.prototype._getAccess = function(t, n) {
                    n instanceof e.User ? n = n.id : n instanceof e.Role && (n = "role:" + n.getName());
                    var r = this.permissionsById[n];
                    return !!r && !!r[t];
                }, e.ACL.prototype.setReadAccess = function(e, t) {
                    this._setAccess("read", e, t);
                }, e.ACL.prototype.getReadAccess = function(e) {
                    return this._getAccess("read", e);
                }, e.ACL.prototype.setWriteAccess = function(e, t) {
                    this._setAccess("write", e, t);
                }, e.ACL.prototype.getWriteAccess = function(e) {
                    return this._getAccess("write", e);
                }, e.ACL.prototype.setPublicReadAccess = function(e) {
                    this.setReadAccess("*", e);
                }, e.ACL.prototype.getPublicReadAccess = function() {
                    return this.getReadAccess("*");
                }, e.ACL.prototype.setPublicWriteAccess = function(e) {
                    this.setWriteAccess("*", e);
                }, e.ACL.prototype.getPublicWriteAccess = function() {
                    return this.getWriteAccess("*");
                }, e.ACL.prototype.getRoleReadAccess = function(t) {
                    if (t instanceof e.Role && (t = t.getName()), r.isString(t)) return this.getReadAccess("role:" + t);
                    throw "role must be a AV.Role or a String";
                }, e.ACL.prototype.getRoleWriteAccess = function(t) {
                    if (t instanceof e.Role && (t = t.getName()), r.isString(t)) return this.getWriteAccess("role:" + t);
                    throw "role must be a AV.Role or a String";
                }, e.ACL.prototype.setRoleReadAccess = function(t, n) {
                    t instanceof e.Role && (t = t.getName());
                    {
                        if (!r.isString(t)) throw "role must be a AV.Role or a String";
                        this.setReadAccess("role:" + t, n);
                    }
                }, e.ACL.prototype.setRoleWriteAccess = function(t, n) {
                    t instanceof e.Role && (t = t.getName());
                    {
                        if (!r.isString(t)) throw "role must be a AV.Role or a String";
                        this.setWriteAccess("role:" + t, n);
                    }
                };
            };
        }, {
            underscore: 21
        } ],
        29: [ function(e, t, n) {
            (function(n, r) {
                var i = e("underscore"), o = e("./utils").isNullOrUndefined, s = r.AV || {};
                s._config = s._config || {};
                var a = s._config;
                i.extend(a, {
                    region: "cn",
                    APIServerURL: a.APIServerURL || "",
                    isNode: !1,
                    disableCurrentUser: !1,
                    userAgent: null,
                    applicationProduction: null
                }), void 0 !== n && n.versions && n.versions.node && (a.isNode = !0);
                var u = function() {}, c = function(e, t, n) {
                    var r;
                    return r = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                        e.apply(this, arguments);
                    }, i.extend(r, e), u.prototype = e.prototype, r.prototype = new u(), t && i.extend(r.prototype, t), 
                    n && i.extend(r, n), r.prototype.constructor = r, r.__super__ = e.prototype, r;
                };
                s.setProduction = function(e) {
                    o(e) ? a.applicationProduction = null : a.applicationProduction = e ? 1 : 0;
                }, s._getAVPath = function(e) {
                    if (!s.applicationId) throw "You need to call AV.initialize before using AV.";
                    if (e || (e = ""), !i.isString(e)) throw "Tried to get a localStorage path that wasn't a String.";
                    return "/" === e[0] && (e = e.substring(1)), "AV/" + s.applicationId + "/" + e;
                }, s._installationId = null, s._getInstallationId = function() {
                    if (s._installationId) return s.Promise.resolve(s._installationId);
                    var e = s._getAVPath("installationId");
                    return s.localStorage.getItemAsync(e).then(function(t) {
                        if (s._installationId = t, s._installationId) return t;
                        var n = function() {
                            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                        };
                        return s._installationId = n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n(), 
                        s.localStorage.setItemAsync(e, s._installationId);
                    });
                }, s._parseDate = function(e) {
                    var t = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$").exec(e);
                    if (!t) return null;
                    var n = t[1] || 0, r = (t[2] || 1) - 1, i = t[3] || 0, o = t[4] || 0, s = t[5] || 0, a = t[6] || 0, u = t[8] || 0;
                    return new Date(Date.UTC(n, r, i, o, s, a, u));
                }, s._extend = function(e, t) {
                    var n = c(this, e, t);
                    return n.extend = this.extend, n;
                }, s._getValue = function(e, t) {
                    return e && e[t] ? i.isFunction(e[t]) ? e[t]() : e[t] : null;
                }, s._encode = function(e, t, n) {
                    if (e instanceof s.Object) {
                        if (n) throw "AV.Objects not allowed here";
                        if (!t || i.include(t, e) || !e._hasData) return e._toPointer();
                        if (!e.dirty()) return t = t.concat(e), s._encode(e._toFullJSON(t), t, n);
                        throw "Tried to save an object with a pointer to a new, unsaved object.";
                    }
                    if (e instanceof s.ACL) return e.toJSON();
                    if (i.isDate(e)) return {
                        __type: "Date",
                        iso: e.toJSON()
                    };
                    if (e instanceof s.GeoPoint) return e.toJSON();
                    if (i.isArray(e)) return i.map(e, function(e) {
                        return s._encode(e, t, n);
                    });
                    if (i.isRegExp(e)) return e.source;
                    if (e instanceof s.Relation) return e.toJSON();
                    if (e instanceof s.Op) return e.toJSON();
                    if (e instanceof s.File) {
                        if (!e.url() && !e.id) throw "Tried to save an object containing an unsaved file.";
                        return {
                            __type: "File",
                            id: e.id,
                            name: e.name(),
                            url: e.url()
                        };
                    }
                    if (i.isObject(e)) {
                        var r = {};
                        return s._objectEach(e, function(e, i) {
                            r[i] = s._encode(e, t, n);
                        }), r;
                    }
                    return e;
                }, s._decode = function(e, t) {
                    if (!i.isObject(t)) return t;
                    if (i.isArray(t)) return s._arrayEach(t, function(e, n) {
                        t[n] = s._decode(n, e);
                    }), t;
                    if (t instanceof s.Object) return t;
                    if (t instanceof s.File) return t;
                    if (t instanceof s.Op) return t;
                    if (t.__op) return s.Op._decode(t);
                    var n;
                    if ("Pointer" === t.__type) {
                        n = t.className;
                        var r = s.Object._create(n);
                        return Object.keys(t).length > 3 ? (delete t.__type, delete t.className, r._finishFetch(t, !0)) : r._finishFetch({
                            objectId: t.objectId
                        }, !1), r;
                    }
                    if ("Object" === t.__type) {
                        n = t.className, delete t.__type, delete t.className;
                        var o = s.Object._create(n);
                        return o._finishFetch(t, !0), o;
                    }
                    if ("Date" === t.__type) return s._parseDate(t.iso);
                    if ("GeoPoint" === t.__type) return new s.GeoPoint({
                        latitude: t.latitude,
                        longitude: t.longitude
                    });
                    if ("ACL" === e) return t instanceof s.ACL ? t : new s.ACL(t);
                    if ("Relation" === t.__type) {
                        var a = new s.Relation(null, e);
                        return a.targetClassName = t.className, a;
                    }
                    if ("File" === t.__type) {
                        var u = new s.File(t.name);
                        return u.attributes.metaData = t.metaData || {}, u.attributes.url = t.url, u.id = t.objectId, 
                        u;
                    }
                    return s._objectEach(t, function(e, n) {
                        t[n] = s._decode(n, e);
                    }), t;
                }, s._encodeObjectOrArray = function(e) {
                    var t = function(e) {
                        return e && e._toFullJSON && (e = e._toFullJSON([])), i.mapObject(e, function(e) {
                            return s._encode(e, []);
                        });
                    };
                    return i.isArray(e) ? e.map(function(e) {
                        return t(e);
                    }) : t(e);
                }, s._arrayEach = i.each, s._traverse = function(e, t, n) {
                    if (e instanceof s.Object) {
                        if (n = n || [], i.indexOf(n, e) >= 0) return;
                        return n.push(e), s._traverse(e.attributes, t, n), t(e);
                    }
                    return e instanceof s.Relation || e instanceof s.File ? t(e) : i.isArray(e) ? (i.each(e, function(r, i) {
                        var o = s._traverse(r, t, n);
                        o && (e[i] = o);
                    }), t(e)) : i.isObject(e) ? (s._each(e, function(r, i) {
                        var o = s._traverse(r, t, n);
                        o && (e[i] = o);
                    }), t(e)) : t(e);
                }, s._objectEach = s._each = function(e, t) {
                    i.isObject(e) ? i.each(i.keys(e), function(n) {
                        t(e[n], n);
                    }) : i.each(e, t);
                }, t.exports = s;
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./utils": 57,
            _process: 15,
            underscore: 21
        } ],
        30: [ function(e, t, n) {
            (function(n) {
                var r = e("underscore"), i = e("../promise"), o = {}, s = [ "getItem", "setItem", "removeItem", "clear" ];
                if (n.localStorage) {
                    var a = n.localStorage;
                    try {
                        var u = "__storejs__";
                        if (a.setItem(u, u), a.getItem(u) != u) throw new Error();
                        a.removeItem(u);
                    } catch (t) {
                        a = e("localstorage-memory");
                    }
                    r(s).each(function(e) {
                        o[e] = function() {
                            return n.localStorage[e].apply(n.localStorage, arguments);
                        };
                    }), o.async = !1;
                } else {
                    var c = e("react-native").AsyncStorage;
                    r(s).each(function(e) {
                        o[e + "Async"] = function() {
                            return i.resolve(c[e].apply(c, arguments));
                        };
                    }), o.async = !0;
                }
                t.exports = o;
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "../promise": 45,
            "localstorage-memory": 12,
            "react-native": 1,
            underscore: 21
        } ],
        31: [ function(e, t, n) {
            t.exports = function(e, t) {
                var n;
                n = e.indexOf("base64") < 0 ? atob(e) : e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]);
                for (var r = t || e.split(",")[0].split(":")[1].split(";")[0], i = new Uint8Array(n.length), o = 0; o < n.length; o++) i[o] = n.charCodeAt(o);
                return new Blob([ i ], {
                    type: r
                });
            };
        }, {} ],
        32: [ function(e, t, n) {
            var r = e("./localstorage"), i = e("./av"), o = n.removeAsync = r.removeItemAsync.bind(r), s = function(e, t) {
                try {
                    e = JSON.parse(e);
                } catch (e) {
                    return null;
                }
                return e ? e.expiredAt && e.expiredAt < Date.now() ? o(t).then(function() {
                    return null;
                }) : e.value : null;
            };
            n.getAsync = function(e) {
                return e = i.applicationId + "/" + e, r.getItemAsync(e).then(function(t) {
                    return s(t, e);
                });
            }, n.setAsync = function(e, t, n) {
                var o = {
                    value: t
                };
                return "number" == typeof n && (o.expiredAt = Date.now() + n), r.setItemAsync(i.applicationId + "/" + e, JSON.stringify(o));
            };
        }, {
            "./av": 29,
            "./localstorage": 42
        } ],
        33: [ function(e, t, n) {
            var r = e("underscore"), i = e("./request").request;
            t.exports = function(e) {
                e.Cloud = e.Cloud || {}, r.extend(e.Cloud, {
                    run: function(t, n, r) {
                        return i("functions", t, null, "POST", e._encode(n, null, !0), r).then(function(t) {
                            return e._decode(null, t).result;
                        });
                    },
                    rpc: function(t, n, o) {
                        return r.isArray(n) ? Promise.reject(new Error("Can't pass Array as the param of rpc function in JavaScript SDK.")) : i("call", t, null, "POST", e._encodeObjectOrArray(n), o).then(function(t) {
                            return e._decode("", t).result;
                        });
                    },
                    getServerDate: function() {
                        return i("date", null, null, "GET").then(function(t) {
                            return e._decode(null, t);
                        });
                    },
                    requestSmsCode: function(e) {
                        if (r.isString(e) && (e = {
                            mobilePhoneNumber: e
                        }), !e.mobilePhoneNumber) throw "Missing mobilePhoneNumber.";
                        return i("requestSmsCode", null, null, "POST", e);
                    },
                    verifySmsCode: function(e, t) {
                        if (!e) throw "Missing sms code.";
                        var n = {};
                        return r.isString(t) && (n.mobilePhoneNumber = t), i("verifySmsCode", e, null, "POST", n);
                    }
                });
            };
        }, {
            "./request": 49,
            underscore: 21
        } ],
        34: [ function(e, t, n) {
            function r(e, t) {
                var n = new Error(t);
                return n.code = e, n;
            }
            e("underscore").extend(r, {
                OTHER_CAUSE: -1,
                INTERNAL_SERVER_ERROR: 1,
                CONNECTION_FAILED: 100,
                OBJECT_NOT_FOUND: 101,
                INVALID_QUERY: 102,
                INVALID_CLASS_NAME: 103,
                MISSING_OBJECT_ID: 104,
                INVALID_KEY_NAME: 105,
                INVALID_POINTER: 106,
                INVALID_JSON: 107,
                COMMAND_UNAVAILABLE: 108,
                NOT_INITIALIZED: 109,
                INCORRECT_TYPE: 111,
                INVALID_CHANNEL_NAME: 112,
                PUSH_MISCONFIGURED: 115,
                OBJECT_TOO_LARGE: 116,
                OPERATION_FORBIDDEN: 119,
                CACHE_MISS: 120,
                INVALID_NESTED_KEY: 121,
                INVALID_FILE_NAME: 122,
                INVALID_ACL: 123,
                TIMEOUT: 124,
                INVALID_EMAIL_ADDRESS: 125,
                MISSING_CONTENT_TYPE: 126,
                MISSING_CONTENT_LENGTH: 127,
                INVALID_CONTENT_LENGTH: 128,
                FILE_TOO_LARGE: 129,
                FILE_SAVE_ERROR: 130,
                FILE_DELETE_ERROR: 153,
                DUPLICATE_VALUE: 137,
                INVALID_ROLE_NAME: 139,
                EXCEEDED_QUOTA: 140,
                SCRIPT_FAILED: 141,
                VALIDATION_ERROR: 142,
                INVALID_IMAGE_DATA: 150,
                UNSAVED_FILE_ERROR: 151,
                INVALID_PUSH_TIME_ERROR: 152,
                USERNAME_MISSING: 200,
                PASSWORD_MISSING: 201,
                USERNAME_TAKEN: 202,
                EMAIL_TAKEN: 203,
                EMAIL_MISSING: 204,
                EMAIL_NOT_FOUND: 205,
                SESSION_MISSING: 206,
                MUST_CREATE_USER_THROUGH_SIGNUP: 207,
                ACCOUNT_ALREADY_LINKED: 208,
                LINKED_ID_MISSING: 250,
                INVALID_LINKED_SESSION: 251,
                UNSUPPORTED_SERVICE: 252,
                X_DOMAIN_REQUEST: 602
            }), t.exports = r;
        }, {
            underscore: 21
        } ],
        35: [ function(e, t, n) {
            var r = e("underscore");
            t.exports = function(e) {
                var t = /\s+/, n = Array.prototype.slice;
                e.Events = {
                    on: function(e, n, r) {
                        var i, o, s, a, u;
                        if (!n) return this;
                        for (e = e.split(t), i = this._callbacks || (this._callbacks = {}), o = e.shift(); o; ) (s = (u = i[o]) ? u.tail : {}).next = a = {}, 
                        s.context = r, s.callback = n, i[o] = {
                            tail: a,
                            next: u ? u.next : s
                        }, o = e.shift();
                        return this;
                    },
                    off: function(e, n, i) {
                        var o, s, a, u, c, l;
                        if (s = this._callbacks) {
                            if (!(e || n || i)) return delete this._callbacks, this;
                            for (o = (e = e ? e.split(t) : r.keys(s)).shift(); o; ) if (a = s[o], delete s[o], 
                            a && (n || i)) {
                                for (u = a.tail, a = a.next; a !== u; ) c = a.callback, l = a.context, (n && c !== n || i && l !== i) && this.on(o, c, l), 
                                a = a.next;
                                o = e.shift();
                            }
                            return this;
                        }
                    },
                    trigger: function(e) {
                        var r, i, o, s, a, u, c;
                        if (!(o = this._callbacks)) return this;
                        for (u = o.all, e = e.split(t), c = n.call(arguments, 1), r = e.shift(); r; ) {
                            if (i = o[r]) for (s = i.tail; (i = i.next) !== s; ) i.callback.apply(i.context || this, c);
                            if (i = u) for (s = i.tail, a = [ r ].concat(c); (i = i.next) !== s; ) i.callback.apply(i.context || this, a);
                            r = e.shift();
                        }
                        return this;
                    }
                }, e.Events.bind = e.Events.on, e.Events.unbind = e.Events.off;
            };
        }, {
            underscore: 21
        } ],
        36: [ function(e, t, n) {
            (function(n) {
                var r = e("underscore"), i = e("./uploader/cos"), o = e("./uploader/qiniu"), s = e("./uploader/s3"), a = e("./error"), u = e("./request").request, c = e("./promise");
                t.exports = function(t) {
                    t._config;
                    var l = function(e) {
                        return e.match(/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/)[4];
                    }, f = function(e) {
                        if (e < 26) return String.fromCharCode(65 + e);
                        if (e < 52) return String.fromCharCode(e - 26 + 97);
                        if (e < 62) return String.fromCharCode(e - 52 + 48);
                        if (62 === e) return "+";
                        if (63 === e) return "/";
                        throw new Error("Tried to encode large digit " + e + " in base64.");
                    }, h = function(e) {
                        var t = [];
                        return t.length = Math.ceil(e.length / 3), r.times(t.length, function(n) {
                            var r = e[3 * n], i = e[3 * n + 1] || 0, o = e[3 * n + 2] || 0, s = 3 * n + 1 < e.length, a = 3 * n + 2 < e.length;
                            t[n] = [ f(r >> 2 & 63), f(r << 4 & 48 | i >> 4 & 15), s ? f(i << 2 & 60 | o >> 6 & 3) : "=", a ? f(63 & o) : "=" ].join("");
                        }), t.join("");
                    }, d = function(e) {
                        return e.split(",")[0] && e.split(",")[0].indexOf("base64") >= 0 && (e = e.split(",")[1]), 
                        e;
                    }, p = {
                        ai: "application/postscript",
                        aif: "audio/x-aiff",
                        aifc: "audio/x-aiff",
                        aiff: "audio/x-aiff",
                        asc: "text/plain",
                        atom: "application/atom+xml",
                        au: "audio/basic",
                        avi: "video/x-msvideo",
                        bcpio: "application/x-bcpio",
                        bin: "application/octet-stream",
                        bmp: "image/bmp",
                        cdf: "application/x-netcdf",
                        cgm: "image/cgm",
                        class: "application/octet-stream",
                        cpio: "application/x-cpio",
                        cpt: "application/mac-compactpro",
                        csh: "application/x-csh",
                        css: "text/css",
                        dcr: "application/x-director",
                        dif: "video/x-dv",
                        dir: "application/x-director",
                        djv: "image/vnd.djvu",
                        djvu: "image/vnd.djvu",
                        dll: "application/octet-stream",
                        dmg: "application/octet-stream",
                        dms: "application/octet-stream",
                        doc: "application/msword",
                        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                        docm: "application/vnd.ms-word.document.macroEnabled.12",
                        dotm: "application/vnd.ms-word.template.macroEnabled.12",
                        dtd: "application/xml-dtd",
                        dv: "video/x-dv",
                        dvi: "application/x-dvi",
                        dxr: "application/x-director",
                        eps: "application/postscript",
                        etx: "text/x-setext",
                        exe: "application/octet-stream",
                        ez: "application/andrew-inset",
                        gif: "image/gif",
                        gram: "application/srgs",
                        grxml: "application/srgs+xml",
                        gtar: "application/x-gtar",
                        hdf: "application/x-hdf",
                        hqx: "application/mac-binhex40",
                        htm: "text/html",
                        html: "text/html",
                        ice: "x-conference/x-cooltalk",
                        ico: "image/x-icon",
                        ics: "text/calendar",
                        ief: "image/ief",
                        ifb: "text/calendar",
                        iges: "model/iges",
                        igs: "model/iges",
                        jnlp: "application/x-java-jnlp-file",
                        jp2: "image/jp2",
                        jpe: "image/jpeg",
                        jpeg: "image/jpeg",
                        jpg: "image/jpeg",
                        js: "application/x-javascript",
                        kar: "audio/midi",
                        latex: "application/x-latex",
                        lha: "application/octet-stream",
                        lzh: "application/octet-stream",
                        m3u: "audio/x-mpegurl",
                        m4a: "audio/mp4a-latm",
                        m4b: "audio/mp4a-latm",
                        m4p: "audio/mp4a-latm",
                        m4u: "video/vnd.mpegurl",
                        m4v: "video/x-m4v",
                        mac: "image/x-macpaint",
                        man: "application/x-troff-man",
                        mathml: "application/mathml+xml",
                        me: "application/x-troff-me",
                        mesh: "model/mesh",
                        mid: "audio/midi",
                        midi: "audio/midi",
                        mif: "application/vnd.mif",
                        mov: "video/quicktime",
                        movie: "video/x-sgi-movie",
                        mp2: "audio/mpeg",
                        mp3: "audio/mpeg",
                        mp4: "video/mp4",
                        mpe: "video/mpeg",
                        mpeg: "video/mpeg",
                        mpg: "video/mpeg",
                        mpga: "audio/mpeg",
                        ms: "application/x-troff-ms",
                        msh: "model/mesh",
                        mxu: "video/vnd.mpegurl",
                        nc: "application/x-netcdf",
                        oda: "application/oda",
                        ogg: "application/ogg",
                        pbm: "image/x-portable-bitmap",
                        pct: "image/pict",
                        pdb: "chemical/x-pdb",
                        pdf: "application/pdf",
                        pgm: "image/x-portable-graymap",
                        pgn: "application/x-chess-pgn",
                        pic: "image/pict",
                        pict: "image/pict",
                        png: "image/png",
                        pnm: "image/x-portable-anymap",
                        pnt: "image/x-macpaint",
                        pntg: "image/x-macpaint",
                        ppm: "image/x-portable-pixmap",
                        ppt: "application/vnd.ms-powerpoint",
                        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
                        ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
                        ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
                        pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
                        potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
                        ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
                        ps: "application/postscript",
                        qt: "video/quicktime",
                        qti: "image/x-quicktime",
                        qtif: "image/x-quicktime",
                        ra: "audio/x-pn-realaudio",
                        ram: "audio/x-pn-realaudio",
                        ras: "image/x-cmu-raster",
                        rdf: "application/rdf+xml",
                        rgb: "image/x-rgb",
                        rm: "application/vnd.rn-realmedia",
                        roff: "application/x-troff",
                        rtf: "text/rtf",
                        rtx: "text/richtext",
                        sgm: "text/sgml",
                        sgml: "text/sgml",
                        sh: "application/x-sh",
                        shar: "application/x-shar",
                        silo: "model/mesh",
                        sit: "application/x-stuffit",
                        skd: "application/x-koan",
                        skm: "application/x-koan",
                        skp: "application/x-koan",
                        skt: "application/x-koan",
                        smi: "application/smil",
                        smil: "application/smil",
                        snd: "audio/basic",
                        so: "application/octet-stream",
                        spl: "application/x-futuresplash",
                        src: "application/x-wais-source",
                        sv4cpio: "application/x-sv4cpio",
                        sv4crc: "application/x-sv4crc",
                        svg: "image/svg+xml",
                        swf: "application/x-shockwave-flash",
                        t: "application/x-troff",
                        tar: "application/x-tar",
                        tcl: "application/x-tcl",
                        tex: "application/x-tex",
                        texi: "application/x-texinfo",
                        texinfo: "application/x-texinfo",
                        tif: "image/tiff",
                        tiff: "image/tiff",
                        tr: "application/x-troff",
                        tsv: "text/tab-separated-values",
                        txt: "text/plain",
                        ustar: "application/x-ustar",
                        vcd: "application/x-cdlink",
                        vrml: "model/vrml",
                        vxml: "application/voicexml+xml",
                        wav: "audio/x-wav",
                        wbmp: "image/vnd.wap.wbmp",
                        wbmxl: "application/vnd.wap.wbxml",
                        wml: "text/vnd.wap.wml",
                        wmlc: "application/vnd.wap.wmlc",
                        wmls: "text/vnd.wap.wmlscript",
                        wmlsc: "application/vnd.wap.wmlscriptc",
                        wrl: "model/vrml",
                        xbm: "image/x-xbitmap",
                        xht: "application/xhtml+xml",
                        xhtml: "application/xhtml+xml",
                        xls: "application/vnd.ms-excel",
                        xml: "application/xml",
                        xpm: "image/x-xpixmap",
                        xsl: "application/xml",
                        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
                        xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
                        xltm: "application/vnd.ms-excel.template.macroEnabled.12",
                        xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
                        xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
                        xslt: "application/xslt+xml",
                        xul: "application/vnd.mozilla.xul+xml",
                        xwd: "image/x-xwindowdump",
                        xyz: "chemical/x-xyz",
                        zip: "application/zip"
                    };
                    t.File = function(i, o, s) {
                        this.attributes = {
                            name: i,
                            url: "",
                            metaData: {},
                            base64: ""
                        };
                        var a = void 0;
                        if (o && o.owner) a = o.owner; else if (!t._config.disableCurrentUser) try {
                            a = t.User.current();
                        } catch (e) {
                            if ("SYNC_API_NOT_AVAILABLE" !== e.code) throw e;
                            console.warn("Get current user failed. It seems this runtime use an async storage system, please create AV.File in the callback of AV.User.currentAsync().");
                        }
                        this.attributes.metaData = {
                            owner: a ? a.id : "unknown"
                        };
                        var u = /\.([^.]*)$/.exec(i);
                        u && (u = u[1].toLowerCase());
                        var l = s || p[u] || "text/plain";
                        if (this._guessedType = l, r.isArray(o) && (this.attributes.metaData.size = o.length, 
                        o = {
                            base64: h(o)
                        }), o && o.base64) {
                            var f = e("./browserify-wrapper/parse-base64")(o.base64, l);
                            this.attributes.base64 = d(o.base64), this._source = c.resolve({
                                data: f,
                                type: l
                            });
                        } else if (o && o.blob) o.blob.type || (o.blob.type = l), this._source = c.resolve({
                            data: o.blob,
                            type: l
                        }); else if ("undefined" != typeof File && o instanceof n.File) o.size && (this.attributes.metaData.size = o.size), 
                        this._source = c.resolve({
                            data: o,
                            type: l
                        }); else if (void 0 !== n.Buffer && n.Buffer.isBuffer(o)) this.attributes.metaData.size = o.length, 
                        this._source = c.resolve({
                            data: o,
                            type: l
                        }); else if (r.isString(o)) throw new Error("Creating a AV.File from a String is not yet supported.");
                    }, t.File.withURL = function(e, n, r, i) {
                        if (!e || !n) throw "Please provide file name and url";
                        var o = new t.File(e, null, i);
                        if (r) for (var s in r) o.attributes.metaData[s] || (o.attributes.metaData[s] = r[s]);
                        return o.attributes.url = n, o.attributes.metaData.__source = "external", o;
                    }, t.File.createWithoutData = function(e) {
                        var n = new t.File();
                        return n.id = e, n;
                    }, t.File.prototype = {
                        className: "_File",
                        toJSON: function() {
                            return t._encode(this);
                        },
                        getACL: function() {
                            return this._acl;
                        },
                        setACL: function(e) {
                            if (!(e instanceof t.ACL)) return new a(a.OTHER_CAUSE, "ACL must be a AV.ACL.");
                            this._acl = e;
                        },
                        name: function() {
                            return this.get("name");
                        },
                        url: function() {
                            return this.get("url");
                        },
                        get: function(e) {
                            switch (e) {
                              case "objectId":
                                return this.id;

                              case "url":
                              case "name":
                              case "metaData":
                              case "createdAt":
                              case "updatedAt":
                                return this.attributes[e];

                              default:
                                return this.attributes.metaData[e];
                            }
                        },
                        set: function() {
                            for (var e = this, t = function(t, n) {
                                switch (t) {
                                  case "name":
                                  case "url":
                                  case "base64":
                                  case "metaData":
                                    e.attributes[t] = n;
                                    break;

                                  default:
                                    e.attributes.metaData[t] = n;
                                }
                            }, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                            switch (r.length) {
                              case 1:
                                for (var o in r[0]) t(o, r[0][o]);
                                break;

                              case 2:
                                t(r[0], r[1]);
                            }
                        },
                        metaData: function(e, t) {
                            return e && t ? (this.attributes.metaData[e] = t, this) : e && !t ? this.attributes.metaData[e] : this.attributes.metaData;
                        },
                        thumbnailURL: function(e, t, n, r, i) {
                            var o = this.attributes.url;
                            if (!o) throw new Error("Invalid url.");
                            if (!e || !t || e <= 0 || t <= 0) throw new Error("Invalid width or height value.");
                            if (n = n || 100, r = r || !0, n <= 0 || n > 100) throw new Error("Invalid quality value.");
                            return i = i || "png", o + "?imageView/" + (r ? 2 : 1) + "/w/" + e + "/h/" + t + "/q/" + n + "/format/" + i;
                        },
                        size: function() {
                            return this.metaData().size;
                        },
                        ownerId: function() {
                            return this.metaData().owner;
                        },
                        destroy: function(e) {
                            return this.id ? u("files", null, this.id, "DELETE", null, e) : c.reject(new Error("The file id is not eixsts."));
                        },
                        _fileToken: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "fileTokens", n = this.attributes.name, r = l(n), i = function() {
                                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                            }, o = i() + i() + i() + i() + i() + r, s = {
                                key: o,
                                name: n,
                                ACL: this._acl,
                                mime_type: e,
                                metaData: this.attributes.metaData
                            };
                            return e && !this.attributes.metaData.mime_type && (this.attributes.metaData.mime_type = e), 
                            this._qiniu_key = o, u(t, null, null, "POST", s);
                        },
                        save: function(e) {
                            var t = this;
                            if (this.id) throw new Error("File already saved. If you want to manipulate a file, use AV.Query to get it.");
                            if (!this._previousSave) if (this._source) this._previousSave = this._source.then(function(n) {
                                var r = n.data, a = n.type;
                                return t._fileToken(a).then(function(n) {
                                    var a = void 0;
                                    switch (n.provider) {
                                      case "s3":
                                        a = s(n, r, t, e);
                                        break;

                                      case "qcloud":
                                        a = i(n, r, t, e);
                                        break;

                                      case "qiniu":
                                      default:
                                        a = o(n, r, t, e);
                                    }
                                    return a.catch(function(e) {
                                        throw t.destroy(), e;
                                    });
                                });
                            }); else if (this.attributes.url && "external" === this.attributes.metaData.__source) {
                                var n = {
                                    name: this.attributes.name,
                                    ACL: this._acl,
                                    metaData: this.attributes.metaData,
                                    mime_type: this._guessedType,
                                    url: this.attributes.url
                                };
                                this._previousSave = u("files", this.attributes.name, null, "post", n).then(function(e) {
                                    return t.attributes.name = e.name, t.attributes.url = e.url, t.id = e.objectId, 
                                    e.size && (t.attributes.metaData.size = e.size), t;
                                });
                            }
                            return this._previousSave;
                        },
                        fetch: function(e) {
                            var n = this;
                            return u("files", null, this.id, "GET", null).then(function(e) {
                                var i = t.Object.prototype.parse(e);
                                return i.attributes = {
                                    name: i.name,
                                    url: i.url
                                }, i.attributes.metaData = i.metaData || {}, delete i.objectId, delete i.metaData, 
                                delete i.url, delete i.name, r.extend(n, i), n;
                            });
                        }
                    };
                };
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./browserify-wrapper/parse-base64": 31,
            "./error": 34,
            "./promise": 45,
            "./request": 49,
            "./uploader/cos": 53,
            "./uploader/qiniu": 54,
            "./uploader/s3": 55,
            underscore: 21
        } ],
        37: [ function(e, t, n) {
            var r = e("underscore");
            t.exports = function(e) {
                e.GeoPoint = function(t, n) {
                    r.isArray(t) ? (e.GeoPoint._validate(t[0], t[1]), this.latitude = t[0], this.longitude = t[1]) : r.isObject(t) ? (e.GeoPoint._validate(t.latitude, t.longitude), 
                    this.latitude = t.latitude, this.longitude = t.longitude) : r.isNumber(t) && r.isNumber(n) ? (e.GeoPoint._validate(t, n), 
                    this.latitude = t, this.longitude = n) : (this.latitude = 0, this.longitude = 0);
                    var i = this;
                    this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, 
                    this._longitude = this.longitude, this.__defineGetter__("latitude", function() {
                        return i._latitude;
                    }), this.__defineGetter__("longitude", function() {
                        return i._longitude;
                    }), this.__defineSetter__("latitude", function(t) {
                        e.GeoPoint._validate(t, i.longitude), i._latitude = t;
                    }), this.__defineSetter__("longitude", function(t) {
                        e.GeoPoint._validate(i.latitude, t), i._longitude = t;
                    }));
                }, e.GeoPoint._validate = function(e, t) {
                    if (e < -90) throw new Error("AV.GeoPoint latitude " + e + " < -90.0.");
                    if (e > 90) throw new Error("AV.GeoPoint latitude " + e + " > 90.0.");
                    if (t < -180) throw new Error("AV.GeoPoint longitude " + t + " < -180.0.");
                    if (t > 180) throw new Error("AV.GeoPoint longitude " + t + " > 180.0.");
                }, e.GeoPoint.current = function() {
                    return new e.Promise(function(t, n) {
                        navigator.geolocation.getCurrentPosition(function(n) {
                            t(new e.GeoPoint({
                                latitude: n.coords.latitude,
                                longitude: n.coords.longitude
                            }));
                        }, n);
                    });
                }, e.GeoPoint.prototype = {
                    toJSON: function() {
                        return e.GeoPoint._validate(this.latitude, this.longitude), {
                            __type: "GeoPoint",
                            latitude: this.latitude,
                            longitude: this.longitude
                        };
                    },
                    radiansTo: function(e) {
                        var t = Math.PI / 180, n = this.latitude * t, r = this.longitude * t, i = e.latitude * t, o = n - i, s = r - e.longitude * t, a = Math.sin(o / 2), u = Math.sin(s / 2), c = a * a + Math.cos(n) * Math.cos(i) * u * u;
                        return c = Math.min(1, c), 2 * Math.asin(Math.sqrt(c));
                    },
                    kilometersTo: function(e) {
                        return 6371 * this.radiansTo(e);
                    },
                    milesTo: function(e) {
                        return 3958.8 * this.radiansTo(e);
                    }
                };
            };
        }, {
            underscore: 21
        } ],
        38: [ function(e, t, n) {
            e("weapp-polyfill/auto-polyfill"), t.exports = e("./index");
        }, {
            "./index": 39,
            "weapp-polyfill/auto-polyfill": 22
        } ],
        39: [ function(e, t, n) {
            var r = e("./av");
            r._ = e("underscore"), r.version = e("./version"), r.Promise = e("./promise"), r.localStorage = e("./localstorage"), 
            r.Cache = e("./cache"), r.Error = e("./error"), e("./init"), e("./event")(r), e("./geopoint")(r), 
            e("./acl")(r), e("./op")(r), e("./relation")(r), e("./file")(r), e("./object")(r), 
            e("./role")(r), e("./user")(r), e("./query")(r), e("./cloudfunction")(r), e("./push")(r), 
            e("./status")(r), e("./search")(r), e("./insight")(r), t.exports = r;
        }, {
            "./acl": 28,
            "./av": 29,
            "./cache": 32,
            "./cloudfunction": 33,
            "./error": 34,
            "./event": 35,
            "./file": 36,
            "./geopoint": 37,
            "./init": 40,
            "./insight": 41,
            "./localstorage": 42,
            "./object": 43,
            "./op": 44,
            "./promise": 45,
            "./push": 46,
            "./query": 47,
            "./relation": 48,
            "./role": 50,
            "./search": 51,
            "./status": 52,
            "./user": 56,
            "./version": 58,
            underscore: 21
        } ],
        40: [ function(e, t, n) {
            var r = e("./av"), i = e("./request"), o = function(e, t, n) {
                r.applicationId && e !== r.applicationId && t !== r.applicationKey && n !== r.masterKey && console.warn("LeanCloud SDK is already initialized, please do not reinitialize it."), 
                r.applicationId = e, r.applicationKey = t, r.masterKey = n, r._useMasterKey = !1;
            }, a = function() {
                console.warn("MasterKey is not supposed to be used in browser.");
            };
            r.init = function() {
                switch (arguments.length) {
                  case 1:
                    var e = arguments.length <= 0 ? void 0 : arguments[0];
                    if ("object" !== (void 0 === e ? "undefined" : s(e))) throw new Error("AV.init(): Parameter is not correct.");
                    !r._config.isNode && e.masterKey && a(), o(e.appId, e.appKey, e.masterKey), i.setServerUrlByRegion(e.region), 
                    r._config.disableCurrentUser = e.disableCurrentUser;
                    break;

                  case 2:
                  case 3:
                    console.warn("Please use AV.init() to replace AV.initialize(), AV.init() need an Object param, like { appId: 'YOUR_APP_ID', appKey: 'YOUR_APP_KEY' } . Docs: https://leancloud.cn/docs/sdk_setup-js.html"), 
                    r._config.isNode || 3 !== arguments.length || a(), o.apply(void 0, arguments), i.setServerUrlByRegion("cn");
                }
            }, r._config.isNode && (r.Cloud = r.Cloud || {}, r.Cloud.useMasterKey = function() {
                r._useMasterKey = !0;
            }), r.initialize = r.init;
        }, {
            "./av": 29,
            "./request": 49
        } ],
        41: [ function(e, t, n) {
            var r = e("underscore"), i = e("./error"), o = e("./request").request;
            t.exports = function(e) {
                e.Insight = e.Insight || {}, r.extend(e.Insight, {
                    startJob: function(t, n) {
                        if (!t || !t.sql) throw new Error("Please provide the sql to run the job.");
                        var r = {
                            jobConfig: t,
                            appId: e.applicationId
                        };
                        return o("bigquery", "jobs", null, "POST", e._encode(r, null, !0), n).then(function(t) {
                            return e._decode(null, t).id;
                        });
                    },
                    on: function(e, t) {}
                }), e.Insight.JobQuery = function(e, t) {
                    if (!e) throw new Error("Please provide the job id.");
                    this.id = e, this.className = t, this._skip = 0, this._limit = 100;
                }, e.Insight.JobQuery.prototype = {
                    skip: function(e) {
                        return this._skip = e, this;
                    },
                    limit: function(e) {
                        return this._limit = e, this;
                    },
                    find: function(t) {
                        var n = {
                            skip: this._skip,
                            limit: this._limit
                        };
                        return o("bigquery", "jobs", this.id, "GET", n, t).then(function(t) {
                            return t.error ? e.Promise.reject(new i(t.code, t.error)) : e.Promise.resolve(t);
                        });
                    }
                };
            };
        }, {
            "./error": 34,
            "./request": 49,
            underscore: 21
        } ],
        42: [ function(e, t, n) {
            var r = e("underscore"), i = e("./promise"), o = e("./browserify-wrapper/localStorage"), s = [ "getItem", "setItem", "removeItem", "clear" ];
            o.async ? r(s).each(function(e) {
                "function" != typeof o[e] && (o[e] = function() {
                    var t = new Error("Synchronous API [" + e + "] is not available in this runtime.");
                    throw t.code = "SYNC_API_NOT_AVAILABLE", t;
                });
            }) : r(s).each(function(e) {
                "function" == typeof o[e] && (o[e + "Async"] = function() {
                    return i.resolve(o[e].apply(o, arguments));
                });
            }), t.exports = o;
        }, {
            "./browserify-wrapper/localStorage": 30,
            "./promise": 45,
            underscore: 21
        } ],
        43: [ function(e, t, n) {
            var r = e("underscore"), i = e("./error"), o = e("./request").request, s = e("./utils"), a = [ "objectId", "createdAt", "updatedAt" ], u = function(e) {
                if (-1 !== a.indexOf(e)) throw new Error("key[" + e + "] is reserved");
            };
            t.exports = function(e) {
                e.Object = function(t, n) {
                    if (r.isString(t)) return e.Object._create.apply(this, arguments);
                    t = t || {}, n && n.parse && (t = this.parse(t), t = this._mergeMagicFields(t));
                    var i = e._getValue(this, "defaults");
                    i && (t = r.extend({}, i, t)), n && n.collection && (this.collection = n.collection), 
                    this._serverData = {}, this._opSetQueue = [ {} ], this.attributes = {}, this._hashedJSON = {}, 
                    this._escapedAttributes = {}, this.cid = r.uniqueId("c"), this.changed = {}, this._silent = {}, 
                    this._pending = {}, this.set(t, {
                        silent: !0
                    }), this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, 
                    this._previousAttributes = r.clone(this.attributes), this.initialize.apply(this, arguments);
                }, e.Object.saveAll = function(t, n) {
                    return e.Object._deepSaveAsync(t, null, n);
                }, e.Object.fetchAll = function(t, n) {
                    return e.Promise.resolve().then(function() {
                        return o("batch", null, null, "POST", {
                            requests: r.map(t, function(e) {
                                if (!e.className) throw new Error("object must have className to fetch");
                                if (!e.id) throw new Error("object must have id to fetch");
                                if (e.dirty()) throw new Error("object is modified but not saved");
                                return {
                                    method: "GET",
                                    path: "/1.1/classes/" + e.className + "/" + e.id
                                };
                            })
                        }, n);
                    }).then(function(e) {
                        return r.forEach(t, function(t, n) {
                            if (!e[n].success) {
                                var r = new Error(e[n].error.error);
                                throw r.code = e[n].error.code, r;
                            }
                            t._finishFetch(t.parse(e[n].success));
                        }), t;
                    });
                }, r.extend(e.Object.prototype, e.Events, {
                    _fetchWhenSave: !1,
                    initialize: function() {},
                    fetchWhenSave: function(e) {
                        if (console.warn("AV.Object#fetchWhenSave is deprecated, use AV.Object#save with options.fetchWhenSave instead."), 
                        !r.isBoolean(e)) throw "Expect boolean value for fetchWhenSave";
                        this._fetchWhenSave = e;
                    },
                    getObjectId: function() {
                        return this.id;
                    },
                    getCreatedAt: function() {
                        return this.createdAt || this.get("createdAt");
                    },
                    getUpdatedAt: function() {
                        return this.updatedAt || this.get("updatedAt");
                    },
                    toJSON: function() {
                        var t = this._toFullJSON();
                        return e._arrayEach([ "__type", "className" ], function(e) {
                            delete t[e];
                        }), t;
                    },
                    _toFullJSON: function(t) {
                        var n = r.clone(this.attributes);
                        return e._objectEach(n, function(r, i) {
                            n[i] = e._encode(r, t);
                        }), e._objectEach(this._operations, function(e, t) {
                            n[t] = e;
                        }), r.has(this, "id") && (n.objectId = this.id), r.has(this, "createdAt") && (r.isDate(this.createdAt) ? n.createdAt = this.createdAt.toJSON() : n.createdAt = this.createdAt), 
                        r.has(this, "updatedAt") && (r.isDate(this.updatedAt) ? n.updatedAt = this.updatedAt.toJSON() : n.updatedAt = this.updatedAt), 
                        n.__type = "Object", n.className = this.className, n;
                    },
                    _refreshCache: function() {
                        var t = this;
                        t._refreshingCache || (t._refreshingCache = !0, e._objectEach(this.attributes, function(n, i) {
                            n instanceof e.Object ? n._refreshCache() : r.isObject(n) && t._resetCacheForKey(i) && t.set(i, new e.Op.Set(n), {
                                silent: !0
                            });
                        }), delete t._refreshingCache);
                    },
                    dirty: function(e) {
                        this._refreshCache();
                        var t = r.last(this._opSetQueue);
                        return e ? !!t[e] : !this.id || r.keys(t).length > 0;
                    },
                    _toPointer: function() {
                        return {
                            __type: "Pointer",
                            className: this.className,
                            objectId: this.id
                        };
                    },
                    get: function(e) {
                        switch (e) {
                          case "objectId":
                            return this.id;

                          case "createdAt":
                          case "updatedAt":
                            return this[e];

                          default:
                            return this.attributes[e];
                        }
                    },
                    relation: function(t) {
                        var n = this.get(t);
                        if (n) {
                            if (!(n instanceof e.Relation)) throw "Called relation() on non-relation field " + t;
                            return n._ensureParentAndKey(this, t), n;
                        }
                        return new e.Relation(this, t);
                    },
                    escape: function(e) {
                        var t = this._escapedAttributes[e];
                        if (t) return t;
                        var n, i = this.attributes[e];
                        return n = s.isNullOrUndefined(i) ? "" : r.escape(i.toString()), this._escapedAttributes[e] = n, 
                        n;
                    },
                    has: function(e) {
                        return !s.isNullOrUndefined(this.attributes[e]);
                    },
                    _mergeMagicFields: function(t) {
                        var n = this, i = [ "objectId", "createdAt", "updatedAt" ];
                        return e._arrayEach(i, function(i) {
                            t[i] && ("objectId" === i ? n.id = t[i] : "createdAt" !== i && "updatedAt" !== i || r.isDate(t[i]) ? n[i] = t[i] : n[i] = e._parseDate(t[i]), 
                            delete t[i]);
                        }), t;
                    },
                    _startSave: function() {
                        this._opSetQueue.push({});
                    },
                    _cancelSave: function() {
                        var t = r.first(this._opSetQueue);
                        this._opSetQueue = r.rest(this._opSetQueue);
                        var n = r.first(this._opSetQueue);
                        e._objectEach(t, function(e, r) {
                            var i = t[r], o = n[r];
                            i && o ? n[r] = o._mergeWithPrevious(i) : i && (n[r] = i);
                        }), this._saving = this._saving - 1;
                    },
                    _finishSave: function(t) {
                        var n = {};
                        e._traverse(this.attributes, function(t) {
                            t instanceof e.Object && t.id && t._hasData && (n[t.id] = t);
                        });
                        var i = r.first(this._opSetQueue);
                        this._opSetQueue = r.rest(this._opSetQueue), this._applyOpSet(i, this._serverData), 
                        this._mergeMagicFields(t);
                        var o = this;
                        e._objectEach(t, function(t, r) {
                            o._serverData[r] = e._decode(r, t);
                            var i = e._traverse(o._serverData[r], function(t) {
                                if (t instanceof e.Object && n[t.id]) return n[t.id];
                            });
                            i && (o._serverData[r] = i);
                        }), this._rebuildAllEstimatedData(), this._saving = this._saving - 1;
                    },
                    _finishFetch: function(t, n) {
                        this._opSetQueue = [ {} ], this._mergeMagicFields(t);
                        var r = this;
                        e._objectEach(t, function(t, n) {
                            r._serverData[n] = e._decode(n, t);
                        }), this._rebuildAllEstimatedData(), this._refreshCache(), this._opSetQueue = [ {} ], 
                        this._hasData = n;
                    },
                    _applyOpSet: function(t, n) {
                        var r = this;
                        e._objectEach(t, function(t, i) {
                            n[i] = t._estimate(n[i], r, i), n[i] === e.Op._UNSET && delete n[i];
                        });
                    },
                    _resetCacheForKey: function(t) {
                        var n = this.attributes[t];
                        if (r.isObject(n) && !(n instanceof e.Object) && !(n instanceof e.File)) {
                            n = n.toJSON ? n.toJSON() : n;
                            var i = JSON.stringify(n);
                            if (this._hashedJSON[t] !== i) {
                                var o = !!this._hashedJSON[t];
                                return this._hashedJSON[t] = i, o;
                            }
                        }
                        return !1;
                    },
                    _rebuildEstimatedDataForKey: function(t) {
                        var n = this;
                        delete this.attributes[t], this._serverData[t] && (this.attributes[t] = this._serverData[t]), 
                        e._arrayEach(this._opSetQueue, function(r) {
                            var i = r[t];
                            i && (n.attributes[t] = i._estimate(n.attributes[t], n, t), n.attributes[t] === e.Op._UNSET ? delete n.attributes[t] : n._resetCacheForKey(t));
                        });
                    },
                    _rebuildAllEstimatedData: function() {
                        var t = this, n = r.clone(this.attributes);
                        this.attributes = r.clone(this._serverData), e._arrayEach(this._opSetQueue, function(n) {
                            t._applyOpSet(n, t.attributes), e._objectEach(n, function(e, n) {
                                t._resetCacheForKey(n);
                            });
                        }), e._objectEach(n, function(e, n) {
                            t.attributes[n] !== e && t.trigger("change:" + n, t, t.attributes[n], {});
                        }), e._objectEach(this.attributes, function(e, i) {
                            r.has(n, i) || t.trigger("change:" + i, t, e, {});
                        });
                    },
                    set: function(t, n, i) {
                        var o;
                        if (r.isObject(t) || s.isNullOrUndefined(t) ? (o = t, e._objectEach(o, function(t, n) {
                            u(n), o[n] = e._decode(n, t);
                        }), i = n) : (o = {}, u(t), o[t] = e._decode(t, n)), i = i || {}, !o) return this;
                        o instanceof e.Object && (o = o.attributes), i.unset && e._objectEach(o, function(t, n) {
                            o[n] = new e.Op.Unset();
                        });
                        var a = r.clone(o), c = this;
                        e._objectEach(a, function(t, n) {
                            t instanceof e.Op && (a[n] = t._estimate(c.attributes[n], c, n), a[n] === e.Op._UNSET && delete a[n]);
                        }), this._validate(o, i), i.changes = {};
                        var l = this._escapedAttributes;
                        this._previousAttributes;
                        return e._arrayEach(r.keys(o), function(t) {
                            var n = o[t];
                            n instanceof e.Relation && (n.parent = c), n instanceof e.Op || (n = new e.Op.Set(n));
                            var s = !0;
                            n instanceof e.Op.Set && r.isEqual(c.attributes[t], n.value) && (s = !1), s && (delete l[t], 
                            i.silent ? c._silent[t] = !0 : i.changes[t] = !0);
                            var a = r.last(c._opSetQueue);
                            a[t] = n._mergeWithPrevious(a[t]), c._rebuildEstimatedDataForKey(t), s ? (c.changed[t] = c.attributes[t], 
                            i.silent || (c._pending[t] = !0)) : (delete c.changed[t], delete c._pending[t]);
                        }), i.silent || this.change(i), this;
                    },
                    unset: function(e, t) {
                        return t = t || {}, t.unset = !0, this.set(e, null, t);
                    },
                    increment: function(t, n) {
                        return (r.isUndefined(n) || r.isNull(n)) && (n = 1), this.set(t, new e.Op.Increment(n));
                    },
                    add: function(t, n) {
                        return this.set(t, new e.Op.Add(s.ensureArray(n)));
                    },
                    addUnique: function(t, n) {
                        return this.set(t, new e.Op.AddUnique(s.ensureArray(n)));
                    },
                    remove: function(t, n) {
                        return this.set(t, new e.Op.Remove(s.ensureArray(n)));
                    },
                    op: function(e) {
                        return r.last(this._opSetQueue)[e];
                    },
                    clear: function(e) {
                        (e = e || {}).unset = !0;
                        var t = r.extend(this.attributes, this._operations);
                        return this.set(t, e);
                    },
                    _getSaveJSON: function() {
                        var t = r.clone(r.first(this._opSetQueue));
                        return e._objectEach(t, function(e, n) {
                            t[n] = e.toJSON();
                        }), t;
                    },
                    _canBeSerialized: function() {
                        return e.Object._canBeSerializedAsValue(this.attributes);
                    },
                    fetch: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
                        r.isArray(e.keys) && (e.keys = e.keys.join(",")), r.isArray(e.include) && (e.include = e.include.join(","));
                        var n = this;
                        return o("classes", this.className, this.id, "GET", e, t).then(function(e) {
                            return n._finishFetch(n.parse(e), !0), n;
                        });
                    },
                    save: function(t, n, i) {
                        var a, u, c;
                        r.isObject(t) || s.isNullOrUndefined(t) ? (a = t, c = n) : ((a = {})[t] = n, c = i), 
                        (c = r.clone(c) || {}).wait && (u = r.clone(this.attributes));
                        var l = r.clone(c) || {};
                        l.wait && (l.silent = !0), a && this.set(a, l);
                        var f = this;
                        f._refreshCache();
                        var h = [], d = [];
                        return e.Object._findUnsavedChildren(f.attributes, h, d), h.length + d.length > 0 ? e.Object._deepSaveAsync(this.attributes, f, c).then(function() {
                            return f.save(null, c);
                        }) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || e.Promise.resolve(), 
                        this._allPreviousSaves = this._allPreviousSaves.catch(function(e) {}).then(function() {
                            var e = f.id ? "PUT" : "POST", t = f._getSaveJSON();
                            if (f._fetchWhenSave && (t._fetchWhenSave = !0), c.fetchWhenSave && (t._fetchWhenSave = !0), 
                            c.query) {
                                var n;
                                if ("function" == typeof c.query.toJSON && (n = c.query.toJSON()) && (t._where = n.where), 
                                !t._where) throw new Error("options.query is not an AV.Query");
                            }
                            var i = "classes", s = f.className;
                            "_User" !== f.className || f.id || (i = "users", s = null);
                            var h = (c._makeRequest || o)(i, s, f.id, e, t, c);
                            return h = h.then(function(e) {
                                var t = f.parse(e);
                                return c.wait && (t = r.extend(a || {}, t)), f._finishSave(t), c.wait && f.set(u, l), 
                                f;
                            }, function(e) {
                                throw f._cancelSave(), e;
                            });
                        }), this._allPreviousSaves);
                    },
                    destroy: function(e) {
                        e = e || {};
                        var t = this, n = function() {
                            t.trigger("destroy", t, t.collection, e);
                        };
                        return this.id ? (e.wait || n(), o("classes", this.className, this.id, "DELETE", null, e).then(function() {
                            return e.wait && n(), t;
                        })) : n();
                    },
                    parse: function(t) {
                        var n = r.clone(t);
                        return r([ "createdAt", "updatedAt" ]).each(function(t) {
                            n[t] && (n[t] = e._parseDate(n[t]));
                        }), n.updatedAt || (n.updatedAt = n.createdAt), n;
                    },
                    clone: function() {
                        return new this.constructor(this.attributes);
                    },
                    isNew: function() {
                        return !this.id;
                    },
                    change: function(t) {
                        t = t || {};
                        var n = this._changing;
                        this._changing = !0;
                        var i = this;
                        e._objectEach(this._silent, function(e) {
                            i._pending[e] = !0;
                        });
                        var o = r.extend({}, t.changes, this._silent);
                        if (this._silent = {}, e._objectEach(o, function(e, n) {
                            i.trigger("change:" + n, i, i.get(n), t);
                        }), n) return this;
                        for (;!r.isEmpty(this._pending); ) this._pending = {}, this.trigger("change", this, t), 
                        e._objectEach(this.changed, function(e, t) {
                            i._pending[t] || i._silent[t] || delete i.changed[t];
                        }), i._previousAttributes = r.clone(this.attributes);
                        return this._changing = !1, this;
                    },
                    hasChanged: function(e) {
                        return arguments.length ? this.changed && r.has(this.changed, e) : !r.isEmpty(this.changed);
                    },
                    changedAttributes: function(t) {
                        if (!t) return !!this.hasChanged() && r.clone(this.changed);
                        var n = {}, i = this._previousAttributes;
                        return e._objectEach(t, function(e, t) {
                            r.isEqual(i[t], e) || (n[t] = e);
                        }), n;
                    },
                    previous: function(e) {
                        return arguments.length && this._previousAttributes ? this._previousAttributes[e] : null;
                    },
                    previousAttributes: function() {
                        return r.clone(this._previousAttributes);
                    },
                    isValid: function() {
                        try {
                            this.validate(this.attributes);
                        } catch (e) {
                            return !1;
                        }
                        return !0;
                    },
                    validate: function(t) {
                        if (r.has(t, "ACL") && !(t.ACL instanceof e.ACL)) throw new i(i.OTHER_CAUSE, "ACL must be a AV.ACL.");
                    },
                    _validate: function(e, t) {
                        !t.silent && this.validate && (e = r.extend({}, this.attributes, e), this.validate(e));
                    },
                    getACL: function() {
                        return this.get("ACL");
                    },
                    setACL: function(e, t) {
                        return this.set("ACL", e, t);
                    }
                }), e.Object.createWithoutData = function(t, n, r) {
                    var i = new e.Object(t);
                    return i.id = n, i._hasData = r, i;
                }, e.Object.destroyAll = function(t, n) {
                    if (n = n || {}, !t || 0 === t.length) return e.Promise.resolve();
                    var r = t[0].className, i = "", s = !0;
                    return t.forEach(function(e) {
                        if (e.className != r) throw "AV.Object.destroyAll requires the argument object array's classNames must be the same";
                        if (!e.id) throw "Could not delete unsaved object";
                        s ? (i = e.id, s = !1) : i = i + "," + e.id;
                    }), o("classes", r, i, "DELETE", null, n);
                }, e.Object._getSubclass = function(t) {
                    if (!r.isString(t)) throw "AV.Object._getSubclass requires a string argument.";
                    var n = e.Object._classMap[t];
                    return n || (n = e.Object.extend(t), e.Object._classMap[t] = n), n;
                }, e.Object._create = function(t, n, r) {
                    return new (e.Object._getSubclass(t))(n, r);
                }, e.Object._classMap = {}, e.Object._extend = e._extend, e.Object.new = function(t, n) {
                    return new e.Object(t, n);
                }, e.Object.extend = function(t, n, i) {
                    if (!r.isString(t)) {
                        if (t && r.has(t, "className")) return e.Object.extend(t.className, t, n);
                        throw new Error("AV.Object.extend's first argument should be the className.");
                    }
                    "User" === t && (t = "_User");
                    var o = null;
                    if (r.has(e.Object._classMap, t)) {
                        var s = e.Object._classMap[t];
                        if (!n && !i) return s;
                        o = s._extend(n, i);
                    } else (n = n || {})._className = t, o = this._extend(n, i);
                    return o.extend = function(n) {
                        if (r.isString(n) || n && r.has(n, "className")) return e.Object.extend.apply(o, arguments);
                        var i = [ t ].concat(r.toArray(arguments));
                        return e.Object.extend.apply(o, i);
                    }, o.new = function(e, t) {
                        return new o(e, t);
                    }, e.Object._classMap[t] = o, o;
                }, Object.defineProperty(e.Object.prototype, "className", {
                    get: function() {
                        var e = this._className || this.constructor.name;
                        return "User" === e ? "_User" : e;
                    }
                }), e.Object.register = function(t) {
                    if (!(t.prototype instanceof e.Object)) throw new Error("registered class is not a subclass of AV.Object");
                    var n = t.name;
                    if (!n.length) throw new Error("registered class must be named");
                    e.Object._classMap[n] = t;
                }, e.Object._findUnsavedChildren = function(t, n, r) {
                    e._traverse(t, function(t) {
                        if (t instanceof e.Object) return t._refreshCache(), void (t.dirty() && n.push(t));
                        t instanceof e.File && (t.url() || t.id || r.push(t));
                    });
                }, e.Object._canBeSerializedAsValue = function(t) {
                    var n = !0;
                    return t instanceof e.Object || t instanceof e.File ? n = !!t.id : r.isArray(t) ? e._arrayEach(t, function(t) {
                        e.Object._canBeSerializedAsValue(t) || (n = !1);
                    }) : r.isObject(t) && e._objectEach(t, function(t) {
                        e.Object._canBeSerializedAsValue(t) || (n = !1);
                    }), n;
                }, e.Object._deepSaveAsync = function(t, n, s) {
                    var a = [], u = [];
                    e.Object._findUnsavedChildren(t, a, u), n && (a = r.filter(a, function(e) {
                        return e != n;
                    }));
                    var c = e.Promise.resolve();
                    r.each(u, function(e) {
                        c = c.then(function() {
                            return e.save();
                        });
                    });
                    var l = r.uniq(a), f = r.uniq(l);
                    return c.then(function() {
                        return e.Promise._continueWhile(function() {
                            return f.length > 0;
                        }, function() {
                            var t = [], n = [];
                            if (e._arrayEach(f, function(e) {
                                t.length > 20 ? n.push(e) : e._canBeSerialized() ? t.push(e) : n.push(e);
                            }), f = n, 0 === t.length) return e.Promise.reject(new i(i.OTHER_CAUSE, "Tried to save a batch with a cycle."));
                            var a = e.Promise.resolve(r.map(t, function(t) {
                                return t._allPreviousSaves || e.Promise.resolve();
                            })).then(function() {
                                return o("batch", null, null, "POST", {
                                    requests: r.map(t, function(e) {
                                        var t = e._getSaveJSON(), n = "POST", r = "/1.1/classes/" + e.className;
                                        return e.id && (r = r + "/" + e.id, n = "PUT"), e._startSave(), {
                                            method: n,
                                            path: r,
                                            body: t
                                        };
                                    })
                                }, s).then(function(n) {
                                    var r;
                                    if (e._arrayEach(t, function(e, t) {
                                        n[t].success ? e._finishSave(e.parse(n[t].success)) : (r = r || n[t].error, e._cancelSave());
                                    }), r) return e.Promise.reject(new i(r.code, r.error));
                                });
                            });
                            return e._arrayEach(t, function(e) {
                                e._allPreviousSaves = a;
                            }), a;
                        });
                    }).then(function() {
                        return t;
                    });
                };
            };
        }, {
            "./error": 34,
            "./request": 49,
            "./utils": 57,
            underscore: 21
        } ],
        44: [ function(e, t, n) {
            var r = e("underscore");
            t.exports = function(e) {
                e.Op = function() {
                    this._initialize.apply(this, arguments);
                }, e.Op.prototype = {
                    _initialize: function() {}
                }, r.extend(e.Op, {
                    _extend: e._extend,
                    _opDecoderMap: {},
                    _registerDecoder: function(t, n) {
                        e.Op._opDecoderMap[t] = n;
                    },
                    _decode: function(t) {
                        var n = e.Op._opDecoderMap[t.__op];
                        return n ? n(t) : void 0;
                    }
                }), e.Op._registerDecoder("Batch", function(t) {
                    var n = null;
                    return e._arrayEach(t.ops, function(t) {
                        t = e.Op._decode(t), n = t._mergeWithPrevious(n);
                    }), n;
                }), e.Op.Set = e.Op._extend({
                    _initialize: function(e) {
                        this._value = e;
                    },
                    value: function() {
                        return this._value;
                    },
                    toJSON: function() {
                        return e._encode(this.value());
                    },
                    _mergeWithPrevious: function(e) {
                        return this;
                    },
                    _estimate: function(e) {
                        return this.value();
                    }
                }), e.Op._UNSET = {}, e.Op.Unset = e.Op._extend({
                    toJSON: function() {
                        return {
                            __op: "Delete"
                        };
                    },
                    _mergeWithPrevious: function(e) {
                        return this;
                    },
                    _estimate: function(t) {
                        return e.Op._UNSET;
                    }
                }), e.Op._registerDecoder("Delete", function(t) {
                    return new e.Op.Unset();
                }), e.Op.Increment = e.Op._extend({
                    _initialize: function(e) {
                        this._amount = e;
                    },
                    amount: function() {
                        return this._amount;
                    },
                    toJSON: function() {
                        return {
                            __op: "Increment",
                            amount: this._amount
                        };
                    },
                    _mergeWithPrevious: function(t) {
                        if (t) {
                            if (t instanceof e.Op.Unset) return new e.Op.Set(this.amount());
                            if (t instanceof e.Op.Set) return new e.Op.Set(t.value() + this.amount());
                            if (t instanceof e.Op.Increment) return new e.Op.Increment(this.amount() + t.amount());
                            throw "Op is invalid after previous op.";
                        }
                        return this;
                    },
                    _estimate: function(e) {
                        return e ? e + this.amount() : this.amount();
                    }
                }), e.Op._registerDecoder("Increment", function(t) {
                    return new e.Op.Increment(t.amount);
                }), e.Op.Add = e.Op._extend({
                    _initialize: function(e) {
                        this._objects = e;
                    },
                    objects: function() {
                        return this._objects;
                    },
                    toJSON: function() {
                        return {
                            __op: "Add",
                            objects: e._encode(this.objects())
                        };
                    },
                    _mergeWithPrevious: function(t) {
                        if (t) {
                            if (t instanceof e.Op.Unset) return new e.Op.Set(this.objects());
                            if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                            if (t instanceof e.Op.Add) return new e.Op.Add(t.objects().concat(this.objects()));
                            throw "Op is invalid after previous op.";
                        }
                        return this;
                    },
                    _estimate: function(e) {
                        return e ? e.concat(this.objects()) : r.clone(this.objects());
                    }
                }), e.Op._registerDecoder("Add", function(t) {
                    return new e.Op.Add(e._decode(void 0, t.objects));
                }), e.Op.AddUnique = e.Op._extend({
                    _initialize: function(e) {
                        this._objects = r.uniq(e);
                    },
                    objects: function() {
                        return this._objects;
                    },
                    toJSON: function() {
                        return {
                            __op: "AddUnique",
                            objects: e._encode(this.objects())
                        };
                    },
                    _mergeWithPrevious: function(t) {
                        if (t) {
                            if (t instanceof e.Op.Unset) return new e.Op.Set(this.objects());
                            if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                            if (t instanceof e.Op.AddUnique) return new e.Op.AddUnique(this._estimate(t.objects()));
                            throw "Op is invalid after previous op.";
                        }
                        return this;
                    },
                    _estimate: function(t) {
                        if (t) {
                            var n = r.clone(t);
                            return e._arrayEach(this.objects(), function(t) {
                                if (t instanceof e.Object && t.id) {
                                    var i = r.find(n, function(n) {
                                        return n instanceof e.Object && n.id === t.id;
                                    });
                                    if (i) {
                                        var o = r.indexOf(n, i);
                                        n[o] = t;
                                    } else n.push(t);
                                } else r.contains(n, t) || n.push(t);
                            }), n;
                        }
                        return r.clone(this.objects());
                    }
                }), e.Op._registerDecoder("AddUnique", function(t) {
                    return new e.Op.AddUnique(e._decode(void 0, t.objects));
                }), e.Op.Remove = e.Op._extend({
                    _initialize: function(e) {
                        this._objects = r.uniq(e);
                    },
                    objects: function() {
                        return this._objects;
                    },
                    toJSON: function() {
                        return {
                            __op: "Remove",
                            objects: e._encode(this.objects())
                        };
                    },
                    _mergeWithPrevious: function(t) {
                        if (t) {
                            if (t instanceof e.Op.Unset) return t;
                            if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                            if (t instanceof e.Op.Remove) return new e.Op.Remove(r.union(t.objects(), this.objects()));
                            throw "Op is invalid after previous op.";
                        }
                        return this;
                    },
                    _estimate: function(t) {
                        if (t) {
                            var n = r.difference(t, this.objects());
                            return e._arrayEach(this.objects(), function(t) {
                                t instanceof e.Object && t.id && (n = r.reject(n, function(n) {
                                    return n instanceof e.Object && n.id === t.id;
                                }));
                            }), n;
                        }
                        return [];
                    }
                }), e.Op._registerDecoder("Remove", function(t) {
                    return new e.Op.Remove(e._decode(void 0, t.objects));
                }), e.Op.Relation = e.Op._extend({
                    _initialize: function(t, n) {
                        this._targetClassName = null;
                        var i = this, o = function(t) {
                            if (t instanceof e.Object) {
                                if (!t.id) throw "You can't add an unsaved AV.Object to a relation.";
                                if (i._targetClassName || (i._targetClassName = t.className), i._targetClassName !== t.className) throw "Tried to create a AV.Relation with 2 different types: " + i._targetClassName + " and " + t.className + ".";
                                return t.id;
                            }
                            return t;
                        };
                        this.relationsToAdd = r.uniq(r.map(t, o)), this.relationsToRemove = r.uniq(r.map(n, o));
                    },
                    added: function() {
                        var t = this;
                        return r.map(this.relationsToAdd, function(n) {
                            var r = e.Object._create(t._targetClassName);
                            return r.id = n, r;
                        });
                    },
                    removed: function() {
                        var t = this;
                        return r.map(this.relationsToRemove, function(n) {
                            var r = e.Object._create(t._targetClassName);
                            return r.id = n, r;
                        });
                    },
                    toJSON: function() {
                        var e = null, t = null, n = this, i = function(e) {
                            return {
                                __type: "Pointer",
                                className: n._targetClassName,
                                objectId: e
                            };
                        };
                        return this.relationsToAdd.length > 0 && (e = {
                            __op: "AddRelation",
                            objects: r.map(this.relationsToAdd, i)
                        }), this.relationsToRemove.length > 0 && (t = {
                            __op: "RemoveRelation",
                            objects: r.map(this.relationsToRemove, i)
                        }), e && t ? {
                            __op: "Batch",
                            ops: [ e, t ]
                        } : e || t || {};
                    },
                    _mergeWithPrevious: function(t) {
                        if (t) {
                            if (t instanceof e.Op.Unset) throw "You can't modify a relation after deleting it.";
                            if (t instanceof e.Op.Relation) {
                                if (t._targetClassName && t._targetClassName !== this._targetClassName) throw "Related object must be of class " + t._targetClassName + ", but " + this._targetClassName + " was passed in.";
                                var n = r.union(r.difference(t.relationsToAdd, this.relationsToRemove), this.relationsToAdd), i = r.union(r.difference(t.relationsToRemove, this.relationsToAdd), this.relationsToRemove), o = new e.Op.Relation(n, i);
                                return o._targetClassName = this._targetClassName, o;
                            }
                            throw "Op is invalid after previous op.";
                        }
                        return this;
                    },
                    _estimate: function(t, n, r) {
                        if (t) {
                            if (t instanceof e.Relation) {
                                if (this._targetClassName) if (t.targetClassName) {
                                    if (t.targetClassName !== this._targetClassName) throw "Related object must be a " + t.targetClassName + ", but a " + this._targetClassName + " was passed in.";
                                } else t.targetClassName = this._targetClassName;
                                return t;
                            }
                            throw "Op is invalid after previous op.";
                        }
                        new e.Relation(n, r).targetClassName = this._targetClassName;
                    }
                }), e.Op._registerDecoder("AddRelation", function(t) {
                    return new e.Op.Relation(e._decode(void 0, t.objects), []);
                }), e.Op._registerDecoder("RemoveRelation", function(t) {
                    return new e.Op.Relation([], e._decode(void 0, t.objects));
                });
            };
        }, {
            underscore: 21
        } ],
        45: [ function(e, t, n) {
            e("underscore");
            var r = e("rsvp").Promise;
            r._continueWhile = function(e, t) {
                return e() ? t().then(function() {
                    return r._continueWhile(e, t);
                }) : r.resolve();
            }, t.exports = r;
        }, {
            rsvp: 16,
            underscore: 21
        } ],
        46: [ function(e, t, n) {
            var r = e("./request").request;
            t.exports = function(e) {
                e.Installation = e.Object.extend("_Installation"), e.Push = e.Push || {}, e.Push.send = function(e, t) {
                    if (e.where && (e.where = e.where.toJSON().where), e.where && e.cql) throw new Error("Both where and cql can't be set");
                    if (e.push_time && (e.push_time = e.push_time.toJSON()), e.expiration_time && (e.expiration_time = e.expiration_time.toJSON()), 
                    e.expiration_time && e.expiration_time_interval) throw new Error("Both expiration_time and expiration_time_interval can't be set");
                    return r("push", null, null, "POST", e, t);
                };
            };
        }, {
            "./request": 49
        } ],
        47: [ function(e, t, n) {
            var r = e("underscore"), i = e("./error"), o = e("./request").request, s = e("./utils").ensureArray, a = function(e, t) {
                if (void 0 === e) throw new Error(t);
            };
            t.exports = function(e) {
                e.Query = function(t) {
                    r.isString(t) && (t = e.Object._getSubclass(t)), this.objectClass = t, this.className = t.prototype.className, 
                    this._where = {}, this._include = [], this._select = [], this._limit = -1, this._skip = 0, 
                    this._extraOptions = {};
                }, e.Query.or = function() {
                    var t = r.toArray(arguments), n = null;
                    e._arrayEach(t, function(e) {
                        if (r.isNull(n) && (n = e.className), n !== e.className) throw "All queries must be for the same class";
                    });
                    var i = new e.Query(n);
                    return i._orQuery(t), i;
                }, e.Query.and = function() {
                    var t = r.toArray(arguments), n = null;
                    e._arrayEach(t, function(e) {
                        if (r.isNull(n) && (n = e.className), n !== e.className) throw "All queries must be for the same class";
                    });
                    var i = new e.Query(n);
                    return i._andQuery(t), i;
                }, e.Query.doCloudQuery = function(t, n, i) {
                    var s = {
                        cql: t
                    };
                    return r.isArray(n) ? s.pvalues = n : i = n, o("cloudQuery", null, null, "GET", s, i).then(function(t) {
                        var n = new e.Query(t.className);
                        return {
                            results: r.map(t.results, function(e) {
                                var r = n._newObject(t);
                                return r._finishFetch && r._finishFetch(n._processResult(e), !0), r;
                            }),
                            count: t.count,
                            className: t.className
                        };
                    });
                }, e.Query._extend = e._extend, e.Query.prototype = {
                    _processResult: function(e) {
                        return e;
                    },
                    get: function(e, t) {
                        if (!e) throw new i(i.OBJECT_NOT_FOUND, "Object not found.");
                        var n = this, r = n._newObject();
                        r.id = e;
                        var o = n.toJSON(), s = {};
                        return o.keys && (s.keys = o.keys), o.include && (s.include = o.include), r.fetch(s, t);
                    },
                    toJSON: function() {
                        var t = {
                            where: this._where
                        };
                        return this._include.length > 0 && (t.include = this._include.join(",")), this._select.length > 0 && (t.keys = this._select.join(",")), 
                        this._limit >= 0 && (t.limit = this._limit), this._skip > 0 && (t.skip = this._skip), 
                        void 0 !== this._order && (t.order = this._order), e._objectEach(this._extraOptions, function(e, n) {
                            t[n] = e;
                        }), t;
                    },
                    _newObject: function(t) {
                        return t && t.className ? new e.Object(t.className) : new this.objectClass();
                    },
                    _createRequest: function(e, t) {
                        return o("classes", this.className, null, "GET", e || this.toJSON(), t);
                    },
                    find: function(e) {
                        var t = this;
                        return this._createRequest(null, e).then(function(e) {
                            return r.map(e.results, function(n) {
                                var r = t._newObject(e);
                                return r._finishFetch && r._finishFetch(t._processResult(n), !0), r;
                            });
                        });
                    },
                    destroyAll: function(t) {
                        return this.find(t).then(function(t) {
                            return e.Object.destroyAll(t);
                        });
                    },
                    count: function(e) {
                        var t = this.toJSON();
                        return t.limit = 0, t.count = 1, this._createRequest(t, e).then(function(e) {
                            return e.count;
                        });
                    },
                    first: function(e) {
                        var t = this, n = this.toJSON();
                        return n.limit = 1, this._createRequest(n, e).then(function(e) {
                            return r.map(e.results, function(e) {
                                var n = t._newObject();
                                return n._finishFetch && n._finishFetch(t._processResult(e), !0), n;
                            })[0];
                        });
                    },
                    skip: function(e) {
                        return a(e, "undefined is not a valid skip value"), this._skip = e, this;
                    },
                    limit: function(e) {
                        return a(e, "undefined is not a valid limit value"), this._limit = e, this;
                    },
                    equalTo: function(t, n) {
                        return a(t, "undefined is not a valid key"), a(n, "undefined is not a valid value"), 
                        this._where[t] = e._encode(n), this;
                    },
                    _addCondition: function(t, n, r) {
                        return a(t, "undefined is not a valid condition key"), a(n, "undefined is not a valid condition"), 
                        a(r, "undefined is not a valid condition value"), this._where[t] || (this._where[t] = {}), 
                        this._where[t][n] = e._encode(r), this;
                    },
                    sizeEqualTo: function(e, t) {
                        this._addCondition(e, "$size", t);
                    },
                    notEqualTo: function(e, t) {
                        return this._addCondition(e, "$ne", t), this;
                    },
                    lessThan: function(e, t) {
                        return this._addCondition(e, "$lt", t), this;
                    },
                    greaterThan: function(e, t) {
                        return this._addCondition(e, "$gt", t), this;
                    },
                    lessThanOrEqualTo: function(e, t) {
                        return this._addCondition(e, "$lte", t), this;
                    },
                    greaterThanOrEqualTo: function(e, t) {
                        return this._addCondition(e, "$gte", t), this;
                    },
                    containedIn: function(e, t) {
                        return this._addCondition(e, "$in", t), this;
                    },
                    notContainedIn: function(e, t) {
                        return this._addCondition(e, "$nin", t), this;
                    },
                    containsAll: function(e, t) {
                        return this._addCondition(e, "$all", t), this;
                    },
                    exists: function(e) {
                        return this._addCondition(e, "$exists", !0), this;
                    },
                    doesNotExist: function(e) {
                        return this._addCondition(e, "$exists", !1), this;
                    },
                    matches: function(e, t, n) {
                        return this._addCondition(e, "$regex", t), n || (n = ""), t.ignoreCase && (n += "i"), 
                        t.multiline && (n += "m"), n && n.length && this._addCondition(e, "$options", n), 
                        this;
                    },
                    matchesQuery: function(e, t) {
                        var n = t.toJSON();
                        return n.className = t.className, this._addCondition(e, "$inQuery", n), this;
                    },
                    doesNotMatchQuery: function(e, t) {
                        var n = t.toJSON();
                        return n.className = t.className, this._addCondition(e, "$notInQuery", n), this;
                    },
                    matchesKeyInQuery: function(e, t, n) {
                        var r = n.toJSON();
                        return r.className = n.className, this._addCondition(e, "$select", {
                            key: t,
                            query: r
                        }), this;
                    },
                    doesNotMatchKeyInQuery: function(e, t, n) {
                        var r = n.toJSON();
                        return r.className = n.className, this._addCondition(e, "$dontSelect", {
                            key: t,
                            query: r
                        }), this;
                    },
                    _orQuery: function(e) {
                        var t = r.map(e, function(e) {
                            return e.toJSON().where;
                        });
                        return this._where.$or = t, this;
                    },
                    _andQuery: function(e) {
                        var t = r.map(e, function(e) {
                            return e.toJSON().where;
                        });
                        return this._where.$and = t, this;
                    },
                    _quote: function(e) {
                        return "\\Q" + e.replace("\\E", "\\E\\\\E\\Q") + "\\E";
                    },
                    contains: function(e, t) {
                        return this._addCondition(e, "$regex", this._quote(t)), this;
                    },
                    startsWith: function(e, t) {
                        return this._addCondition(e, "$regex", "^" + this._quote(t)), this;
                    },
                    endsWith: function(e, t) {
                        return this._addCondition(e, "$regex", this._quote(t) + "$"), this;
                    },
                    ascending: function(e) {
                        return a(e, "undefined is not a valid key"), this._order = e, this;
                    },
                    addAscending: function(e) {
                        return a(e, "undefined is not a valid key"), this._order ? this._order += "," + e : this._order = e, 
                        this;
                    },
                    descending: function(e) {
                        return a(e, "undefined is not a valid key"), this._order = "-" + e, this;
                    },
                    addDescending: function(e) {
                        return a(e, "undefined is not a valid key"), this._order ? this._order += ",-" + e : this._order = "-" + e, 
                        this;
                    },
                    near: function(t, n) {
                        return n instanceof e.GeoPoint || (n = new e.GeoPoint(n)), this._addCondition(t, "$nearSphere", n), 
                        this;
                    },
                    withinRadians: function(e, t, n) {
                        return this.near(e, t), this._addCondition(e, "$maxDistance", n), this;
                    },
                    withinMiles: function(e, t, n) {
                        return this.withinRadians(e, t, n / 3958.8);
                    },
                    withinKilometers: function(e, t, n) {
                        return this.withinRadians(e, t, n / 6371);
                    },
                    withinGeoBox: function(t, n, r) {
                        return n instanceof e.GeoPoint || (n = new e.GeoPoint(n)), r instanceof e.GeoPoint || (r = new e.GeoPoint(r)), 
                        this._addCondition(t, "$within", {
                            $box: [ n, r ]
                        }), this;
                    },
                    include: function(e) {
                        var t = this;
                        return a(e, "undefined is not a valid key"), r(arguments).forEach(function(e) {
                            t._include = t._include.concat(s(e));
                        }), this;
                    },
                    select: function(e) {
                        var t = this;
                        return a(e, "undefined is not a valid key"), r(arguments).forEach(function(e) {
                            t._select = t._select.concat(s(e));
                        }), this;
                    },
                    each: function(t) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        if (this._order || this._skip || this._limit >= 0) {
                            var i = new Error("Cannot iterate on a query with sort, skip, or limit.");
                            return e.Promise.reject(i);
                        }
                        var o = new e.Query(this.objectClass);
                        o._limit = n.batchSize || 100, o._where = r.clone(this._where), o._include = r.clone(this._include), 
                        o.ascending("objectId");
                        var s = !1;
                        return e.Promise._continueWhile(function() {
                            return !s;
                        }, function() {
                            return o.find(n).then(function(n) {
                                var i = e.Promise.resolve();
                                return r.each(n, function(e) {
                                    i = i.then(function() {
                                        return t(e);
                                    });
                                }), i.then(function() {
                                    n.length >= o._limit ? o.greaterThan("objectId", n[n.length - 1].id) : s = !0;
                                });
                            });
                        });
                    }
                }, e.FriendShipQuery = e.Query._extend({
                    _objectClass: e.User,
                    _newObject: function() {
                        return new e.User();
                    },
                    _processResult: function(e) {
                        if (e && e[this._friendshipTag]) {
                            var t = e[this._friendshipTag];
                            return "Pointer" === t.__type && "_User" === t.className && (delete t.__type, delete t.className), 
                            t;
                        }
                        return null;
                    }
                });
            };
        }, {
            "./error": 34,
            "./request": 49,
            "./utils": 57,
            underscore: 21
        } ],
        48: [ function(e, t, n) {
            var r = e("underscore");
            t.exports = function(e) {
                e.Relation = function(e, t) {
                    if (!r.isString(t)) throw new TypeError("key must be a string");
                    this.parent = e, this.key = t, this.targetClassName = null;
                }, e.Relation.reverseQuery = function(t, n, r) {
                    var i = new e.Query(t);
                    return i.equalTo(n, r._toPointer()), i;
                }, e.Relation.prototype = {
                    _ensureParentAndKey: function(e, t) {
                        if (this.parent = this.parent || e, this.key = this.key || t, this.parent !== e) throw new Error("Internal Error. Relation retrieved from two different Objects.");
                        if (this.key !== t) throw new Error("Internal Error. Relation retrieved from two different keys.");
                    },
                    add: function(t) {
                        r.isArray(t) || (t = [ t ]);
                        var n = new e.Op.Relation(t, []);
                        this.parent.set(this.key, n), this.targetClassName = n._targetClassName;
                    },
                    remove: function(t) {
                        r.isArray(t) || (t = [ t ]);
                        var n = new e.Op.Relation([], t);
                        this.parent.set(this.key, n), this.targetClassName = n._targetClassName;
                    },
                    toJSON: function() {
                        return {
                            __type: "Relation",
                            className: this.targetClassName
                        };
                    },
                    query: function() {
                        var t, n;
                        return this.targetClassName ? (t = e.Object._getSubclass(this.targetClassName), 
                        n = new e.Query(t)) : (t = e.Object._getSubclass(this.parent.className), n = new e.Query(t), 
                        n._extraOptions.redirectClassNameForKey = this.key), n._addCondition("$relatedTo", "object", this.parent._toPointer()), 
                        n._addCondition("$relatedTo", "key", this.key), n;
                    }
                };
            };
        }, {
            underscore: 21
        } ],
        49: [ function(e, t, n) {
            (function(n) {
                var r = e("superagent"), i = e("debug")("leancloud:request"), o = e("md5"), a = e("./promise"), u = e("./cache"), c = e("./error"), l = e("./av"), f = e("underscore"), h = e("./utils").getSessionToken, d = void 0, p = {
                    cn: "https://api.leancloud.cn",
                    us: "https://us-api.leancloud.cn"
                }, _ = function(e, t) {
                    var n = new Date().getTime(), r = o(n + e);
                    return t ? r + "," + n + ",master" : r + "," + n;
                }, v = function(e) {
                    if (-1 === [ "batch", "classes", "files", "date", "functions", "call", "login", "push", "search/select", "requestPasswordReset", "requestEmailVerify", "requestPasswordResetBySmsCode", "resetPasswordBySmsCode", "requestMobilePhoneVerify", "requestLoginSmsCode", "verifyMobilePhone", "requestSmsCode", "verifySmsCode", "users", "usersByMobilePhone", "cloudQuery", "qiniu", "fileTokens", "statuses", "bigquery", "search/select", "subscribe/statuses/count", "subscribe/statuses", "installations" ].indexOf(e) && !/users\/[^\/]+\/updatePassword/.test(e) && !/users\/[^\/]+\/friendship\/[^\/]+/.test(e)) throw new Error("Bad router: " + e + ".");
                }, m = 0, g = function(e, t, n) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, s = arguments[4], u = m++;
                    return i("request(" + u + ")", e, t, n, o), new a(function(a, c) {
                        var l = r(e, t).set(o).send(n);
                        s && l.on("progress", s), l.end(function(e, t) {
                            return t && i("response(" + u + ")", t.status, t.body || t.text, t.header), e ? (t && (e.statusCode = t.status, 
                            e.responseText = t.text, e.response = t.body), c(e)) : a(t.body);
                        });
                    });
                }, y = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
                        "X-LC-Id": l.applicationId,
                        "Content-Type": "application/json;charset=UTF-8"
                    }, r = !1;
                    return "boolean" == typeof e.useMasterKey ? r = e.useMasterKey : "boolean" == typeof l._useMasterKey && (r = l._useMasterKey), 
                    r ? l.masterKey ? t["X-LC-Sign"] = _(l.masterKey, !0) : (console.warn("masterKey is not set, fall back to use appKey"), 
                    t["X-LC-Sign"] = _(l.applicationKey)) : t["X-LC-Sign"] = _(l.applicationKey), null !== l._config.applicationProduction && (t["X-LC-Prod"] = l._config.applicationProduction), 
                    l._config.isNode ? t["User-Agent"] = l._config.userAgent || "AV/" + l.version + "; Node.js/" + n.version : t["X-LC-UA"] = "AV/" + l.version, 
                    a.resolve().then(function() {
                        var n = h(e);
                        if (n) t["X-LC-Session"] = n; else if (!l._config.disableCurrentUser) return l.User.currentAsync().then(function(e) {
                            return e && e._sessionToken && (t["X-LC-Session"] = e._sessionToken), t;
                        });
                        return t;
                    });
                }, b = function(e, t, n, r, i) {
                    l.serverURL && (l._config.APIServerURL = l.serverURL, console.warn("Please use AV._config.APIServerURL to replace AV.serverURL, and it is an internal interface."));
                    var o = l._config.APIServerURL || p.cn;
                    if ("/" !== o.charAt(o.length - 1) && (o += "/"), o += "1.1/" + e, t && (o += "/" + t), 
                    n && (o += "/" + n), "users" !== e && "classes" !== e || !i || (o += "?", i._fetchWhenSave && (delete i._fetchWhenSave, 
                    o += "&new=true"), i._where && (o += "&where=" + encodeURIComponent(JSON.stringify(i._where)), 
                    delete i._where)), "get" === r.toLowerCase()) {
                        -1 === o.indexOf("?") && (o += "?");
                        for (var a in i) "object" === s(i[a]) && (i[a] = JSON.stringify(i[a])), o += "&" + a + "=" + encodeURIComponent(i[a]);
                    }
                    return o;
                }, w = function(e, t) {
                    return "number" != typeof t && (t = 3600), u.setAsync("APIServerURL", e, 1e3 * t);
                }, S = function(e) {
                    return new a(function(t, n) {
                        if (410 === e.statusCode) w(e.response.api_server, e.response.ttl).then(function() {
                            t(e.response.location);
                        }).catch(function(e) {
                            n(e);
                        }); else {
                            var r = {
                                code: -1,
                                error: e.responseText
                            };
                            if (e.response && e.response.code) r = e.response; else if (e.responseText) try {
                                r = JSON.parse(e.responseText);
                            } catch (e) {}
                            var i = new c(r.code, r.error);
                            n(i);
                        }
                    });
                }, A = function(e) {
                    l._config.APIServerURL = "https://" + e;
                    var t = f.findKey(p, function(e) {
                        return e === l._config.APIServerURL;
                    });
                    t && (l._config.region = t);
                }, O = function() {
                    var e = "https://app-router.leancloud.cn/1/route?appId=" + l.applicationId;
                    return g("get", e).then(function(e) {
                        if (e.api_server) return A(e.api_server), w(e.api_server, e.ttl);
                    }, function(e) {
                        if (e.statusCode >= 400 && e.statusCode < 500) throw e;
                    });
                };
                t.exports = {
                    ajax: g,
                    request: function(e, t, n, r) {
                        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o = arguments[5];
                        if (!l.applicationId) throw new Error("You must specify your applicationId using AV.init()");
                        if (!l.applicationKey && !l.masterKey) throw new Error("You must specify a AppKey using AV.init()");
                        return v(e), d ? d.then(function() {
                            var s = b(e, t, n, r, i);
                            return y(o).then(function(e) {
                                return g(r, s, i, e).then(null, function(t) {
                                    return S(t).then(function(t) {
                                        return g(r, t, i, e);
                                    });
                                });
                            });
                        }) : a.reject(new Error("Not initialized"));
                    },
                    setServerUrlByRegion: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "cn";
                        d = new a(function(t, n) {
                            if (!l._config.APIServerURL) return "cn" === e ? u.getAsync("APIServerURL").then(function(e) {
                                if (!e) return O();
                                A(e);
                            }).then(function() {
                                t();
                            }).catch(function(e) {
                                n(e);
                            }) : (l._config.region = e, l._config.APIServerURL = p[e], void t());
                            t();
                        });
                    }
                };
            }).call(this, e("_process"));
        }, {
            "./av": 29,
            "./cache": 32,
            "./error": 34,
            "./promise": 45,
            "./utils": 57,
            _process: 15,
            debug: 5,
            md5: 13,
            superagent: 17,
            underscore: 21
        } ],
        50: [ function(e, t, n) {
            var r = e("underscore"), i = e("./error");
            t.exports = function(e) {
                e.Role = e.Object.extend("_Role", {
                    constructor: function(t, n) {
                        if (r.isString(t) ? (e.Object.prototype.constructor.call(this, null, null), this.setName(t)) : e.Object.prototype.constructor.call(this, t, n), 
                        void 0 === n) {
                            var i = new e.ACL();
                            i.setPublicReadAccess(!0), this.getACL() || this.setACL(i);
                        } else {
                            if (!(n instanceof e.ACL)) throw new TypeError("acl must be an instance of AV.ACL");
                            this.setACL(n);
                        }
                    },
                    getName: function() {
                        return this.get("name");
                    },
                    setName: function(e, t) {
                        return this.set("name", e, t);
                    },
                    getUsers: function() {
                        return this.relation("users");
                    },
                    getRoles: function() {
                        return this.relation("roles");
                    },
                    validate: function(t, n) {
                        if ("name" in t && t.name !== this.getName()) {
                            var o = t.name;
                            if (this.id && this.id !== t.objectId) return new i(i.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                            if (!r.isString(o)) return new i(i.OTHER_CAUSE, "A role's name must be a String.");
                            if (!/^[0-9a-zA-Z\-_ ]+$/.test(o)) return new i(i.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.");
                        }
                        return !!e.Object.prototype.validate && e.Object.prototype.validate.call(this, t, n);
                    }
                });
            };
        }, {
            "./error": 34,
            underscore: 21
        } ],
        51: [ function(e, t, n) {
            var r = e("underscore"), i = e("./request").request;
            t.exports = function(e) {
                e.SearchSortBuilder = function() {
                    this._sortFields = [];
                }, e.SearchSortBuilder.prototype = {
                    _addField: function(e, t, n, r) {
                        var i = {};
                        return i[e] = {
                            order: t || "asc",
                            mode: n || "avg",
                            missing: "_" + (r || "last")
                        }, this._sortFields.push(i), this;
                    },
                    ascending: function(e, t, n) {
                        return this._addField(e, "asc", t, n);
                    },
                    descending: function(e, t, n) {
                        return this._addField(e, "desc", t, n);
                    },
                    whereNear: function(e, t, n) {
                        n = n || {};
                        var r = {}, i = {
                            lat: t.latitude,
                            lon: t.longitude
                        }, o = {
                            order: n.order || "asc",
                            mode: n.mode || "avg",
                            unit: n.unit || "km"
                        };
                        return o[e] = i, r._geo_distance = o, this._sortFields.push(r), this;
                    },
                    build: function() {
                        return JSON.stringify(e._encode(this._sortFields));
                    }
                }, e.SearchQuery = e.Query._extend({
                    _sid: null,
                    _hits: 0,
                    _queryString: null,
                    _highlights: null,
                    _sortBuilder: null,
                    _createRequest: function(e, t) {
                        return i("search/select", null, null, "GET", e || this.toJSON(), t);
                    },
                    sid: function(e) {
                        return this._sid = e, this;
                    },
                    queryString: function(e) {
                        return this._queryString = e, this;
                    },
                    highlights: function(e) {
                        var t;
                        return t = e && r.isString(e) ? arguments : e, this._highlights = t, this;
                    },
                    sortBy: function(e) {
                        return this._sortBuilder = e, this;
                    },
                    hits: function() {
                        return this._hits || (this._hits = 0), this._hits;
                    },
                    _processResult: function(e) {
                        return delete e.className, delete e._app_url, delete e._deeplink, e;
                    },
                    hasMore: function() {
                        return !this._hitEnd;
                    },
                    reset: function() {
                        this._hitEnd = !1, this._sid = null, this._hits = 0;
                    },
                    find: function() {
                        var e = this;
                        return this._createRequest().then(function(t) {
                            return t.sid ? (e._oldSid = e._sid, e._sid = t.sid) : (e._sid = null, e._hitEnd = !0), 
                            e._hits = t.hits || 0, r.map(t.results, function(n) {
                                n.className && (t.className = n.className);
                                var r = e._newObject(t);
                                return r.appURL = n._app_url, r._finishFetch(e._processResult(n), !0), r;
                            });
                        });
                    },
                    toJSON: function() {
                        var t = e.SearchQuery.__super__.toJSON.call(this);
                        if (delete t.where, this.className && (t.clazz = this.className), this._sid && (t.sid = this._sid), 
                        !this._queryString) throw "Please set query string.";
                        if (t.q = this._queryString, this._highlights && (t.highlights = this._highlights.join(",")), 
                        this._sortBuilder && t.order) throw "sort and order can not be set at same time.";
                        return this._sortBuilder && (t.sort = this._sortBuilder.build()), t;
                    }
                });
            };
        }, {
            "./request": 49,
            underscore: 21
        } ],
        52: [ function(e, t, n) {
            var r = e("underscore"), i = e("./request").request, o = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return AV.User.currentAsync().then(function(t) {
                    return t || AV.User._fetchUserBySessionToken(e.sessionToken);
                });
            }, a = function(e) {
                return o(e).then(function(e) {
                    return AV.Object.createWithoutData("_User", e.id)._toPointer();
                });
            };
            t.exports = function(e) {
                e.Status = function(e, t) {
                    return this.data = {}, this.inboxType = "default", this.query = null, e && "object" === (void 0 === e ? "undefined" : s(e)) ? this.data = e : (e && (this.data.image = e), 
                    t && (this.data.message = t)), this;
                }, e.Status.prototype = {
                    get: function(e) {
                        return this.data[e];
                    },
                    set: function(e, t) {
                        return this.data[e] = t, this;
                    },
                    destroy: function(t) {
                        return this.id ? i("statuses", null, this.id, "DELETE", t && t.sessionToken) : e.Promise.reject(new Error("The status id is not exists."));
                    },
                    toObject: function() {
                        return this.id ? e.Object.createWithoutData("_Status", this.id) : null;
                    },
                    _getDataJSON: function() {
                        var t = r.clone(this.data);
                        return e._encode(t);
                    },
                    send: function() {
                        var t = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        if (!n.sessionToken && !e.User.current()) throw new Error("Please signin an user.");
                        return this.query ? a(n).then(function(e) {
                            var r = t.query.toJSON();
                            r.className = t.query.className;
                            var o = {};
                            return o.query = r, t.data = t.data || {}, t.data.source = t.data.source || e, o.data = t._getDataJSON(), 
                            o.inboxType = t.inboxType || "default", i("statuses", null, null, "POST", o, n.sessionToken);
                        }).then(function(n) {
                            return t.id = n.objectId, t.createdAt = e._parseDate(n.createdAt), t;
                        }) : e.Status.sendStatusToFollowers(this, n);
                    },
                    _finishFetch: function(t) {
                        this.id = t.objectId, this.createdAt = e._parseDate(t.createdAt), this.updatedAt = e._parseDate(t.updatedAt), 
                        this.messageId = t.messageId, delete t.messageId, delete t.objectId, delete t.createdAt, 
                        delete t.updatedAt, this.data = e._decode(void 0, t);
                    }
                }, e.Status.sendStatusToFollowers = function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (!n.sessionToken && !e.User.current()) throw new Error("Please signin an user.");
                    return a(n).then(function(r) {
                        var o = {};
                        o.className = "_Follower", o.keys = "follower", o.where = {
                            user: r
                        };
                        var s = {};
                        return s.query = o, t.data = t.data || {}, t.data.source = t.data.source || r, s.data = t._getDataJSON(), 
                        s.inboxType = t.inboxType || "default", i("statuses", null, null, "POST", s, n.sessionToken).then(function(n) {
                            return t.id = n.objectId, t.createdAt = e._parseDate(n.createdAt), t;
                        });
                    });
                }, e.Status.sendPrivateStatus = function(t, n) {
                    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (!o.sessionToken && !e.User.current()) throw new Error("Please signin an user.");
                    if (!n) throw new Error("Invalid target user.");
                    var s = r.isString(n) ? n : n.id;
                    if (!s) throw new Error("Invalid target user.");
                    return a(o).then(function(n) {
                        var r = {};
                        r.className = "_User", r.where = {
                            objectId: s
                        };
                        var a = {};
                        return a.query = r, t.data = t.data || {}, t.data.source = t.data.source || n, a.data = t._getDataJSON(), 
                        a.inboxType = "private", t.inboxType = "private", i("statuses", null, null, "POST", a, o.sessionToken).then(function(n) {
                            return t.id = n.objectId, t.createdAt = e._parseDate(n.createdAt), t;
                        });
                    });
                }, e.Status.countUnreadStatuses = function(t) {
                    var n = (r.isString(arguments[1]) ? arguments[2] : arguments[1]) || {}, s = r.isString(arguments[1]) ? arguments[1] : "default";
                    if (!n.sessionToken && null == t && !e.User.current()) throw new Error("Please signin an user or pass the owner objectId.");
                    return o(n).then(function(t) {
                        var r = {};
                        return r.inboxType = e._encode(s), r.owner = e._encode(t), i("subscribe/statuses/count", null, null, "GET", r, n.sessionToken);
                    });
                }, e.Status.statusQuery = function(t) {
                    var n = new e.Query("_Status");
                    return t && n.equalTo("source", t), n;
                }, e.InboxQuery = e.Query._extend({
                    _objectClass: e.Status,
                    _sinceId: 0,
                    _maxId: 0,
                    _inboxType: "default",
                    _owner: null,
                    _newObject: function() {
                        return new e.Status();
                    },
                    _createRequest: function(e, t) {
                        return i("subscribe/statuses", null, null, "GET", e || this.toJSON(), t && t.sessionToken);
                    },
                    sinceId: function(e) {
                        return this._sinceId = e, this;
                    },
                    maxId: function(e) {
                        return this._maxId = e, this;
                    },
                    owner: function(e) {
                        return this._owner = e, this;
                    },
                    inboxType: function(e) {
                        return this._inboxType = e, this;
                    },
                    toJSON: function() {
                        var t = e.InboxQuery.__super__.toJSON.call(this);
                        return t.owner = e._encode(this._owner), t.inboxType = e._encode(this._inboxType), 
                        t.sinceId = e._encode(this._sinceId), t.maxId = e._encode(this._maxId), t;
                    }
                }), e.Status.inboxQuery = function(t, n) {
                    var r = new e.InboxQuery(e.Status);
                    return t && (r._owner = t), n && (r._inboxType = n), r;
                };
            };
        }, {
            "./request": 49,
            underscore: 21
        } ],
        53: [ function(e, t, n) {
            var r = e("superagent"), i = e("debug")("cos"), o = e("../promise");
            t.exports = function(e, t, n) {
                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                n.attributes.url = e.url, n._bucket = e.bucket, n.id = e.objectId;
                var a = e.upload_url + "?sign=" + encodeURIComponent(e.token);
                return new o(function(e, o) {
                    var u = r("POST", a).field("fileContent", t).field("op", "upload");
                    s.onprogress && u.on("progress", s.onprogress), u.end(function(t, r) {
                        if (r && i(r.status, r.body, r.text), t) return r && (t.statusCode = r.status, t.responseText = r.text, 
                        t.response = r.body), o(t);
                        e(n);
                    });
                });
            };
        }, {
            "../promise": 45,
            debug: 5,
            superagent: 17
        } ],
        54: [ function(e, t, n) {
            var r = e("superagent"), i = e("../promise"), o = e("debug")("qiniu");
            t.exports = function(e, t, n) {
                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                n.attributes.url = e.url, n._bucket = e.bucket, n.id = e.objectId;
                var a = e.token;
                return new i(function(e, i) {
                    var u = r("POST", "https://up.qbox.me").field("file", t).field("name", n.attributes.name).field("key", n._qiniu_key).field("token", a);
                    s.onprogress && u.on("progress", s.onprogress), u.end(function(t, r) {
                        if (r && o(r.status, r.body, r.text), t) return r && (t.statusCode = r.status, t.responseText = r.text, 
                        t.response = r.body), i(t);
                        e(n);
                    });
                });
            };
        }, {
            "../promise": 45,
            debug: 5,
            superagent: 17
        } ],
        55: [ function(e, t, n) {
            var r = e("superagent");
            e("../promise");
            t.exports = function(e, t, n) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return n.attributes.url = e.url, n._bucket = e.bucket, n.id = e.objectId, new Promise(function(o, s) {
                    var a = r("PUT", e.upload_url).set("Content-Type", n.attributes.metaData.mime_type).send(t);
                    i.onprogress && a.on("progress", i.onprogress), a.end(function(e, t) {
                        if (e) return t && (e.statusCode = t.status, e.responseText = t.text, e.response = t.body), 
                        s(e);
                        o(n);
                    });
                });
            };
        }, {
            "../promise": 45,
            superagent: 17
        } ],
        56: [ function(e, t, n) {
            var r = e("underscore"), i = e("./error"), o = e("./request").request, s = e("./promise"), a = function() {
                if ("undefined" == typeof wx || "function" != typeof wx.login) throw new Error("Weapp Login is only available in Weapp");
                return new s(function(e, t) {
                    wx.login({
                        success: function(n) {
                            var r = n.code, i = n.errMsg;
                            r ? e(r) : t(new Error(i));
                        }
                    });
                });
            };
            t.exports = function(e) {
                e.User = e.Object.extend("_User", {
                    _isCurrentUser: !1,
                    _mergeMagicFields: function(t) {
                        t.sessionToken && (this._sessionToken = t.sessionToken, delete t.sessionToken), 
                        e.User.__super__._mergeMagicFields.call(this, t);
                    },
                    _cleanupAuthData: function() {
                        if (this.isCurrent()) {
                            var t = this.get("authData");
                            t && e._objectEach(this.get("authData"), function(e, n) {
                                t[n] || delete t[n];
                            });
                        }
                    },
                    _synchronizeAllAuthData: function() {
                        if (this.get("authData")) {
                            var t = this;
                            e._objectEach(this.get("authData"), function(e, n) {
                                t._synchronizeAuthData(n);
                            });
                        }
                    },
                    _synchronizeAuthData: function(t) {
                        if (this.isCurrent()) {
                            var n;
                            r.isString(t) ? (n = t, t = e.User._authProviders[n]) : n = t.getAuthType();
                            var i = this.get("authData");
                            i && t && (t.restoreAuthentication(i[n]) || this._unlinkFrom(t));
                        }
                    },
                    _handleSaveResult: function(t) {
                        return t && !e._config.disableCurrentUser && (this._isCurrentUser = !0), this._cleanupAuthData(), 
                        this._synchronizeAllAuthData(), delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), 
                        this._refreshCache(), !t && !this.isCurrent() || e._config.disableCurrentUser ? s.resolve() : s.resolve(e.User._saveCurrentUser(this));
                    },
                    _linkWith: function(t, n) {
                        var i, o = this;
                        if (r.isString(t) ? (i = t, t = e.User._authProviders[t]) : i = t.getAuthType(), 
                        n) {
                            var s = this.get("authData") || {};
                            return s[i] = n, this.save({
                                authData: s
                            }).then(function(e) {
                                return e._handleSaveResult(!0).then(function() {
                                    return e;
                                });
                            });
                        }
                        return t.authenticate().then(function(e) {
                            return o._linkWith(t, e);
                        });
                    },
                    linkWithWeapp: function() {
                        var e = this;
                        return a().then(function(t) {
                            return e._linkWith("lc_weapp", {
                                code: t
                            });
                        });
                    },
                    _unlinkFrom: function(t) {
                        var n = this;
                        return r.isString(t) && (t = e.User._authProviders[t]), this._linkWith(t, null).then(function(e) {
                            return n._synchronizeAuthData(t), e;
                        });
                    },
                    _isLinked: function(e) {
                        var t;
                        return t = r.isString(e) ? e : e.getAuthType(), !!(this.get("authData") || {})[t];
                    },
                    logOut: function() {
                        this._logOutWithAll(), this._isCurrentUser = !1;
                    },
                    _logOutWithAll: function() {
                        if (this.get("authData")) {
                            var t = this;
                            e._objectEach(this.get("authData"), function(e, n) {
                                t._logOutWith(n);
                            });
                        }
                    },
                    _logOutWith: function(t) {
                        this.isCurrent() && (r.isString(t) && (t = e.User._authProviders[t]), t && t.deauthenticate && t.deauthenticate());
                    },
                    signUp: function(e, t) {
                        var n = e && e.username || this.get("username");
                        if (!n || "" === n) throw new i(i.OTHER_CAUSE, "Cannot sign up user with an empty name.");
                        var r = e && e.password || this.get("password");
                        if (!r || "" === r) throw new i(i.OTHER_CAUSE, "Cannot sign up user with an empty password.");
                        return this.save(e, t).then(function(e) {
                            return e._handleSaveResult(!0).then(function() {
                                return e;
                            });
                        });
                    },
                    signUpOrlogInWithMobilePhone: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e && e.mobilePhoneNumber || this.get("mobilePhoneNumber");
                        if (!n || "" === n) throw new i(i.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber with an empty mobilePhoneNumber.");
                        var r = e && e.smsCode || this.get("smsCode");
                        if (!r || "" === r) throw new i(i.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber  with an empty smsCode.");
                        return t._makeRequest = function(e, t, n, r, i) {
                            return o("usersByMobilePhone", null, null, "POST", i);
                        }, this.save(e, t).then(function(e) {
                            return delete e.attributes.smsCode, delete e._serverData.smsCode, e._handleSaveResult(!0).then(function() {
                                return e;
                            });
                        });
                    },
                    logIn: function() {
                        var e = this;
                        return o("login", null, null, "POST", this.toJSON()).then(function(t) {
                            var n = e.parse(t);
                            return e._finishFetch(n), e._handleSaveResult(!0).then(function() {
                                return n.smsCode || delete e.attributes.smsCode, e;
                            });
                        });
                    },
                    save: function(t, n, i) {
                        var o, s;
                        return r.isObject(t) || r.isNull(t) || r.isUndefined(t) ? (o = t, s = n) : ((o = {})[t] = n, 
                        s = i), s = s || {}, e.Object.prototype.save.call(this, o, s).then(function(e) {
                            return e._handleSaveResult(!1).then(function() {
                                return e;
                            });
                        });
                    },
                    follow: function(e, t) {
                        if (!this.id) throw "Please signin.";
                        if (!e) throw "Invalid target user.";
                        var n = r.isString(e) ? e : e.id;
                        if (!n) throw "Invalid target user.";
                        var i = "users/" + this.id + "/friendship/" + n;
                        return o(i, null, null, "POST", null, t);
                    },
                    unfollow: function(e, t) {
                        if (!this.id) throw "Please signin.";
                        if (!e) throw "Invalid target user.";
                        var n = r.isString(e) ? e : e.id;
                        if (!n) throw "Invalid target user.";
                        var i = "users/" + this.id + "/friendship/" + n;
                        return o(i, null, null, "DELETE", null, t);
                    },
                    followerQuery: function() {
                        return e.User.followerQuery(this.id);
                    },
                    followeeQuery: function() {
                        return e.User.followeeQuery(this.id);
                    },
                    fetch: function(t, n) {
                        return e.Object.prototype.fetch.call(this, t, n).then(function(e) {
                            return e._handleSaveResult(!1).then(function() {
                                return e;
                            });
                        });
                    },
                    updatePassword: function(e, t, n) {
                        var r = "users/" + this.id + "/updatePassword";
                        return o(r, null, null, "PUT", {
                            old_password: e,
                            new_password: t
                        }, n);
                    },
                    isCurrent: function() {
                        return this._isCurrentUser;
                    },
                    getUsername: function() {
                        return this.get("username");
                    },
                    getMobilePhoneNumber: function() {
                        return this.get("mobilePhoneNumber");
                    },
                    setMobilePhoneNumber: function(e, t) {
                        return this.set("mobilePhoneNumber", e, t);
                    },
                    setUsername: function(e, t) {
                        return this.set("username", e, t);
                    },
                    setPassword: function(e, t) {
                        return this.set("password", e, t);
                    },
                    getEmail: function() {
                        return this.get("email");
                    },
                    setEmail: function(e, t) {
                        return this.set("email", e, t);
                    },
                    authenticated: function() {
                        return console.warn("DEPRECATED: 如果要判断当前用户的登录状态是否有效，请使用 currentUser.isAuthenticated().then()，如果要判断该用户是否是当前登录用户，请使用 user.id === currentUser.id。"), 
                        !!this._sessionToken && !e._config.disableCurrentUser && e.User.current() && e.User.current().id === this.id;
                    },
                    isAuthenticated: function() {
                        var t = this;
                        return s.resolve().then(function() {
                            return !!t._sessionToken && e.User._fetchUserBySessionToken(t._sessionToken).then(function() {
                                return !0;
                            }, function(e) {
                                if (211 === e.code) return !1;
                                throw e;
                            });
                        });
                    },
                    getSessionToken: function() {
                        return this._sessionToken;
                    },
                    getRoles: function(t) {
                        return e.Relation.reverseQuery("_Role", "users", this).find(t);
                    }
                }, {
                    _currentUser: null,
                    _currentUserMatchesDisk: !1,
                    _CURRENT_USER_KEY: "currentUser",
                    _authProviders: {},
                    signUp: function(t, n, r, i) {
                        return (r = r || {}).username = t, r.password = n, e.Object._create("_User").signUp(r, i);
                    },
                    logIn: function(t, n, r) {
                        var i = e.Object._create("_User");
                        return i._finishFetch({
                            username: t,
                            password: n
                        }), i.logIn(r);
                    },
                    become: function(e) {
                        return this._fetchUserBySessionToken(e).then(function(e) {
                            return e._handleSaveResult(!0).then(function() {
                                return e;
                            });
                        });
                    },
                    _fetchUserBySessionToken: function(t) {
                        var n = e.Object._create("_User");
                        return o("users", "me", null, "GET", {
                            session_token: t
                        }).then(function(e) {
                            var t = n.parse(e);
                            return n._finishFetch(t), n;
                        });
                    },
                    logInWithMobilePhoneSmsCode: function(t, n, r) {
                        var i = e.Object._create("_User");
                        return i._finishFetch({
                            mobilePhoneNumber: t,
                            smsCode: n
                        }), i.logIn(r);
                    },
                    signUpOrlogInWithMobilePhone: function(t, n, r, i) {
                        return (r = r || {}).mobilePhoneNumber = t, r.smsCode = n, e.Object._create("_User").signUpOrlogInWithMobilePhone(r, i);
                    },
                    logInWithMobilePhone: function(t, n, r) {
                        var i = e.Object._create("_User");
                        return i._finishFetch({
                            mobilePhoneNumber: t,
                            password: n
                        }), i.logIn(r);
                    },
                    signUpOrlogInWithAuthData: function(t, n) {
                        return e.User._logInWith(n, t);
                    },
                    loginWithWeapp: function() {
                        var e = this;
                        return a().then(function(t) {
                            return e.signUpOrlogInWithAuthData({
                                code: t
                            }, "lc_weapp");
                        });
                    },
                    associateWithAuthData: function(e, t, n) {
                        return e._linkWith(t, n);
                    },
                    logOut: function() {
                        return e._config.disableCurrentUser ? (console.warn("AV.User.current() was disabled in multi-user environment, call logOut() from user object instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), 
                        s.resolve(null)) : (null !== e.User._currentUser && (e.User._currentUser._logOutWithAll(), 
                        e.User._currentUser._isCurrentUser = !1), e.User._currentUserMatchesDisk = !0, e.User._currentUser = null, 
                        e.localStorage.removeItemAsync(e._getAVPath(e.User._CURRENT_USER_KEY)));
                    },
                    followerQuery: function(t) {
                        if (!t || !r.isString(t)) throw "Invalid user object id.";
                        var n = new e.FriendShipQuery("_Follower");
                        return n._friendshipTag = "follower", n.equalTo("user", e.Object.createWithoutData("_User", t)), 
                        n;
                    },
                    followeeQuery: function(t) {
                        if (!t || !r.isString(t)) throw "Invalid user object id.";
                        var n = new e.FriendShipQuery("_Followee");
                        return n._friendshipTag = "followee", n.equalTo("user", e.Object.createWithoutData("_User", t)), 
                        n;
                    },
                    requestPasswordReset: function(e) {
                        return o("requestPasswordReset", null, null, "POST", {
                            email: e
                        });
                    },
                    requestEmailVerify: function(e) {
                        return o("requestEmailVerify", null, null, "POST", {
                            email: e
                        });
                    },
                    requestMobilePhoneVerify: function(e) {
                        return o("requestMobilePhoneVerify", null, null, "POST", {
                            mobilePhoneNumber: e
                        });
                    },
                    requestPasswordResetBySmsCode: function(e) {
                        return o("requestPasswordResetBySmsCode", null, null, "POST", {
                            mobilePhoneNumber: e
                        });
                    },
                    resetPasswordBySmsCode: function(e, t) {
                        return o("resetPasswordBySmsCode", null, e, "PUT", {
                            password: t
                        });
                    },
                    verifyMobilePhone: function(e) {
                        return o("verifyMobilePhone", null, e, "POST", null);
                    },
                    requestLoginSmsCode: function(e) {
                        return o("requestLoginSmsCode", null, null, "POST", {
                            mobilePhoneNumber: e
                        });
                    },
                    currentAsync: function() {
                        return e._config.disableCurrentUser ? (console.warn("AV.User.currentAsync() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), 
                        s.resolve(null)) : e.User._currentUser ? s.resolve(e.User._currentUser) : e.User._currentUserMatchesDisk ? s.resolve(e.User._currentUser) : e.localStorage.getItemAsync(e._getAVPath(e.User._CURRENT_USER_KEY)).then(function(t) {
                            if (!t) return null;
                            e.User._currentUserMatchesDisk = !0, e.User._currentUser = e.Object._create("_User"), 
                            e.User._currentUser._isCurrentUser = !0;
                            var n = JSON.parse(t);
                            return e.User._currentUser.id = n._id, delete n._id, e.User._currentUser._sessionToken = n._sessionToken, 
                            delete n._sessionToken, e.User._currentUser._finishFetch(n), e.User._currentUser._synchronizeAllAuthData(), 
                            e.User._currentUser._refreshCache(), e.User._currentUser._opSetQueue = [ {} ], e.User._currentUser;
                        });
                    },
                    current: function() {
                        if (e._config.disableCurrentUser) return console.warn("AV.User.current() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), 
                        null;
                        if (e.User._currentUser) return e.User._currentUser;
                        if (e.User._currentUserMatchesDisk) return e.User._currentUser;
                        e.User._currentUserMatchesDisk = !0;
                        var t = e.localStorage.getItem(e._getAVPath(e.User._CURRENT_USER_KEY));
                        if (!t) return null;
                        e.User._currentUser = e.Object._create("_User"), e.User._currentUser._isCurrentUser = !0;
                        var n = JSON.parse(t);
                        return e.User._currentUser.id = n._id, delete n._id, e.User._currentUser._sessionToken = n._sessionToken, 
                        delete n._sessionToken, e.User._currentUser._finishFetch(n), e.User._currentUser._synchronizeAllAuthData(), 
                        e.User._currentUser._refreshCache(), e.User._currentUser._opSetQueue = [ {} ], e.User._currentUser;
                    },
                    _saveCurrentUser: function(t) {
                        return (e.User._currentUser !== t ? e.User.logOut() : s.resolve()).then(function() {
                            t._isCurrentUser = !0, e.User._currentUser = t;
                            var n = t.toJSON();
                            return n._id = t.id, n._sessionToken = t._sessionToken, e.localStorage.setItemAsync(e._getAVPath(e.User._CURRENT_USER_KEY), JSON.stringify(n)).then(function() {
                                e.User._currentUserMatchesDisk = !0;
                            });
                        });
                    },
                    _registerAuthenticationProvider: function(t) {
                        e.User._authProviders[t.getAuthType()] = t, !e._config.disableCurrentUser && e.User.current() && e.User.current()._synchronizeAuthData(t.getAuthType());
                    },
                    _logInWith: function(t, n) {
                        return e.Object._create("_User")._linkWith(t, n);
                    }
                });
            };
        }, {
            "./error": 34,
            "./promise": 45,
            "./request": 49,
            underscore: 21
        } ],
        57: [ function(e, t, n) {
            var r = e("underscore");
            t.exports = {
                isNullOrUndefined: function(e) {
                    return r.isNull(e) || r.isUndefined(e);
                },
                ensureArray: function(e) {
                    return r.isArray(e) ? e : void 0 === e || null === e ? [] : [ e ];
                },
                getSessionToken: function(e) {
                    return e.sessionToken ? e.sessionToken : e.user && "function" == typeof e.user.getSessionToken ? e.user.getSessionToken() : void 0;
                }
            };
        }, {
            underscore: 21
        } ],
        58: [ function(e, t, n) {
            t.exports = "js2.0.0-beta.4";
        }, {} ]
    }, {}, [ 38 ])(38);
});