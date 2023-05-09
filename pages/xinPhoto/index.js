var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(a) {
    return void 0 === a ? "undefined" : t(a);
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : void 0 === a ? "undefined" : t(a);
};

getApp();

var e = null;

Page({
    data: {
        heart: [],
        multiple: 6,
        grid: 36,
        maxWidth: 324,
        btnDis: !1,
        progressVis: "none",
        percent: 0,
        bgColor: "#ffffff",
        heartColor: "#FF9CC2",
        images: [ "../../images/1.jpg", "../../images/2.jpg", "../../images/3.jpg", "../../images/4.jpg", "../../images/5.jpg", "../../images/6.jpg", "../../images/7.jpg", "../../images/8.jpg", "../../images/9.jpg", "../../images/10.jpg" ],
        section: [ {
            icon: "../../images/love/1.png",
            id: "1"
        }, {
            icon: "../../images/love/1.png",
            id: "2"
        }, {
            icon: "../../images/love/1.png",
            id: "3"
        }, {
            icon: "../../images/love/1.png",
            id: "4"
        } ]
    },
    onShow: function(){

      var t = this;
      wx.createCanvasContext("myCanvas"), wx.createCanvasContext("myCanvas2"), t.data.multiple,
        t.data.grid, t.data.maxWidth, t.reset();
    },
    onLoad: function() {
        wx.createInterstitialAd && ((e = wx.createInterstitialAd({
            adUnitId: "adunit-9648112abbcbb559"
        })).onLoad(function() {}), e.onError(function(t) {}), e.onClose(function() {})), 
        e && e.show().catch(function(t) {
            console.error(t);
        });
    },
    oneImg: function(t) {
        wx.createCanvasContext("myCanvas"), wx.createCanvasContext("myCanvas2");
        var a = this, e = (a.data.multiple, a.data.maxWidth, a.data.grid), n = a.data.heart, o = t.changedTouches[0].x, i = t.changedTouches[0].y;
        o = Math.floor(o / e), i = Math.floor(i / e), !n[i][o] > 0 || wx.chooseImage({
            count: 1,
            sourceType: [ "album" ],
            success: function(t) {
                console.log("res", t);
                var e = t.tempFilePaths[0];
                wx.getImageInfo({
                    src: t.tempFilePaths[0],
                    success: function(t) {
                        console.log("图片信息", t), a.drawImg(e, t, o, i), n[i][o] = 3;
                    }
                });
            }
        });
    },
    moreImg: function() {
        var t = this, e = (wx.createCanvasContext("myCanvas"), wx.createCanvasContext("myCanvas2"), 
        t.data.multiple, t.data.grid, t.data.heart);
        wx.chooseImage({
            sourceType: [ "album" ],
            success: function(n) {
                console.log("res", n);
                for (var o = n.tempFilePaths.length, i = 0, r = 0; r < e.length; r++) {
                    var s = function(r) {
                        for (var s = 0; s < e[r].length; s++) {
                            var l = function(a) {
                                if (i >= o) return {
                                    v: {
                                        v: void 0
                                    }
                                };
                                if (1 == e[r][a]) {
                                    var s = n.tempFilePaths[i++];
                                    wx.getImageInfo({
                                        src: s,
                                        success: function(n) {
                                            wx.showToast({
                                                title: "上传中...",
                                                icon: "loading",
                                                duration: 2e3
                                            }), console.log("图片信息", n), t.drawImg(s, n, a, r), e[r][a] = 2;
                                        }
                                    });
                                }
                            }(s);
                            if ("object" === (void 0 === l ? "undefined" : a(l))) return l.v;
                        }
                    }(r);
                    if ("object" === (void 0 === s ? "undefined" : a(s))) return s.v;
                }
            }
        });
    },
    drawImg: function(t, a, e, n) {
        var o = this, i = wx.createCanvasContext("myCanvas"), r = wx.createCanvasContext("myCanvas2"), s = o.data.multiple, l = o.data.grid, c = (o.data.heart, 
        a.width), d = a.height, f = c > d ? d : c, g = 0, m = 0;
        c > d && (g = (c - d) / 2), c < d && (m = (d - c) / 2), i.drawImage(t, g, m, f, f, e * l, n * l, l, l), 
        i.draw(!0), r.drawImage(t, g, m, f, f, e * l * s, n * l * s, l * s, l * s), r.draw(!0);
    },
    saveImg: function() {
        function t(i, r) {
            i < 0 && (--r, i = 2), r < 0 || wx.canvasToTempFilePath({
                x: i * o,
                y: r * o,
                width: 3 * n * e,
                height: 3 * n * e,
                canvasId: "myCanvas2",
                quality: 1,
                fileType: "jpg",
                success: function(e) {
                    wx.showToast({
                        title: "保存中...",
                        icon: "loading",
                        duration: 2e3
                    }), console.log(e.tempFilePath), wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function(e) {
                            t(--i, r), a.progressAdd();
                        },
                        fail: function(t) {
                            console.log(t.errMsg);
                        }
                    });
                }
            });
        }
        var a = this, e = a.data.multiple, n = a.data.grid, o = (a.data.maxWidth, 3 * n * e);
        a.setData({
            btnDis: !0,
            progressVis: "block"
        }), t(2, 2);
    },
    progressAdd: function() {
        var t = this;
        t.setData({
            percent: t.data.percent + 12
        }), t.data.percent > 100 && t.setData({
            percent: 0,
            btnDis: !1,
            progressVis: "none"
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "发现一款可以制作心形照片墙的神器！快来看看吧~",
            path: "/pages/love/index"
        };
    },
    setBtn: function() {
        this.reset();
    },
    replenishImg: function() {
        wx.showToast({
            title: "生成中...",
            icon: "loading",
            duration: 2e3
        });
        for (var t = this, a = wx.createCanvasContext("myCanvas"), e = wx.createCanvasContext("myCanvas2"), n = t.data.multiple, o = t.data.grid, i = (t.data.maxWidth, 
        t.data.heart), r = t.data.images, s = r.length - 1, l = 0; l < i.length; l++) for (var c = 0; c < i[l].length; c++) if (1 == i[l][c]) {
            var d = r[function(t, a) {
                var e = s - 0;
                return 0 + Math.round(Math.random() * e);
            }()];
            a.drawImage(d, c * o, l * o, o, o), a.draw(!0), e.drawImage(d, c * o * n, l * o * n, o * n, o * n), 
            e.draw(!0);
        }
        t.drawLine();
    },
    reset: function() {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 2e3
        });
        var t = this, a = wx.createCanvasContext("myCanvas"), e = wx.createCanvasContext("myCanvas2"), n = t.data.multiple, o = t.data.grid, i = t.data.maxWidth, r = t.data.heartColor;
        a.setFillStyle("#fff"), a.fillRect(0, 0, i, i), e.setFillStyle("#fff"), e.fillRect(0, 0, i * n, i * n);
        var s = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 1, 1, 0, 1, 1, 0, 0 ], [ 0, 1, 1, 1, 1, 1, 1, 1, 0 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 0, 1, 1, 1, 1, 1, 1, 1, 0 ], [ 0, 0, 1, 1, 1, 1, 1, 0, 0 ], [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ] ];
        t.setData({
            heart: s
        });
        for (var l = 0; l < s.length; l++) for (var c = 0; c < s[l].length; c++) 1 == s[l][c] && (a.rect(c * o, l * o, o, o), 
        a.setFillStyle(r), a.fill(), e.rect(c * o * n, l * o * n, o * n, o * n), e.setFillStyle(r), 
        e.fill());
        e.draw(!0), a.draw(!0), t.drawLine();
    },
    shape: function(t) {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 2e3
        });
        var a = this, e = wx.createCanvasContext("myCanvas"), n = wx.createCanvasContext("myCanvas2"), o = a.data.multiple, i = a.data.grid, r = a.data.maxWidth, s = a.data.heartColor;
        if (1 == t.currentTarget.dataset.id && (e.setFillStyle("#fff"), e.fillRect(0, 0, r, r), 
        n.setFillStyle("#fff"), n.fillRect(0, 0, r * o, r * o), l = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 1, 1, 0, 1, 1, 0, 0 ], [ 0, 1, 1, 1, 1, 1, 1, 1, 0 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 0, 1, 1, 1, 1, 1, 1, 1, 0 ], [ 0, 0, 1, 1, 1, 1, 1, 0, 0 ], [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ] ]), 
        2 == t.currentTarget.dataset.id && (e.setFillStyle("#fff"), e.fillRect(0, 0, r, r), 
        n.setFillStyle("#fff"), n.fillRect(0, 0, r * o, r * o), l = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 1, 1, 0, 1, 1, 0, 0 ], [ 0, 1, 0, 0, 1, 0, 0, 1, 0 ], [ 1, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 1, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 1, 0, 0, 0, 0, 0, 1, 0 ], [ 0, 0, 1, 0, 0, 0, 1, 0, 0 ], [ 0, 0, 0, 1, 0, 1, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ] ]), 
        3 == t.currentTarget.dataset.id && (e.setFillStyle("#fff"), e.fillRect(0, 0, r, r), 
        n.setFillStyle("#fff"), n.fillRect(0, 0, r * o, r * o), l = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 1, 1, 0, 1, 1, 0, 0 ], [ 0, 1, 0, 0, 1, 0, 0, 1, 0 ], [ 1, 0, 0, 1, 1, 1, 0, 0, 1 ], [ 1, 0, 0, 1, 1, 1, 0, 0, 1 ], [ 0, 1, 0, 1, 1, 1, 0, 1, 0 ], [ 0, 0, 1, 0, 0, 0, 1, 0, 0 ], [ 0, 0, 0, 1, 0, 1, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ] ]), 
        4 == t.currentTarget.dataset.id) {
            e.setFillStyle("#fff"), e.fillRect(0, 0, r, r), n.setFillStyle("#fff"), n.fillRect(0, 0, r * o, r * o);
            var l = [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 1, 1, 0, 0, 1, 0, 0, 1, 1 ], [ 1, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 1, 1, 0, 0, 0, 0, 0, 1, 1 ], [ 1, 1, 1, 0, 0, 0, 1, 1, 1 ], [ 1, 1, 1, 1, 0, 1, 1, 1, 1 ] ];
        }
        a.setData({
            heart: l
        });
        for (var c = 0; c < l.length; c++) for (var d = 0; d < l[c].length; d++) 1 == l[c][d] && (e.rect(d * i, c * i, i, i), 
        e.setFillStyle(s), e.fill(), n.rect(d * i * o, c * i * o, i * o, i * o), n.setFillStyle(s), 
        n.fill());
        n.draw(!0), e.draw(!0), a.drawLine();
    },
    drawLine: function() {
        var t = this, a = wx.createCanvasContext("myCanvas"), e = wx.createCanvasContext("myCanvas2"), n = (t.data.multiple, 
        t.data.grid), o = t.data.maxWidth, i = t.data.bgColor;
        a.setStrokeStyle(i), e.setStrokeStyle(i);
        for (var r = 1; r < 3; r++) a.moveTo(r * n * 3, 0), a.lineTo(r * n * 3, o), a.stroke(), 
        a.moveTo(0, r * n * 3), a.lineTo(o, r * n * 3), a.stroke();
        a.draw(!0), e.draw(!0);
    }
});