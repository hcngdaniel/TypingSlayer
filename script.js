(function() {
  var e = {
    3382: function(e, t, l) {
      "use strict";
      var n = l(9199)
        , a = l(3429)
        , o = (l(7658),
          l(7296))
        , u = l(680)
        , i = l(6617)
        , r = l(5941);
      const s = {
        key: 0
      }
        , c = {
          class: "table"
        }
        , v = {
          class: "posText"
        }
        , d = {
          class: "displayBox"
        }
        , p = {
          key: 0
        }
        , f = {
          class: "text_error",
          align: "right"
        }
        , g = {
          class: "scoreBox"
        }
        , m = (0,
          n._)("span", {
            class: "text_normal"
          }, "時間", -1)
        , h = {
          class: "timer_normal"
        }
        , w = (0,
          n._)("span", {
            class: "text_normal"
          }, "速度", -1)
        , y = {
          class: "speedBox"
        }
        , b = (0,
          n._)("span", {
            class: "text_normal"
          }, "正確", -1)
        , _ = {
          class: "timer_normal"
        }
        , x = {
          class: "inputBox"
        }
        , O = {
          mounted() { },
          methods: {}
        };
      var k = Object.assign(O, {
        __name: "App",
        setup(e) {
          const { proxy: t } = (0,
            n.FN)()
            , l = (0,
              n.iH)(!1)
            , a = (0,
              n.iH)(!0)
            , O = (0,
              n.iH)(!1)
            , k = (0,
              n.iH)(0)
            , D = (0,
              n.Fl)((() => 600 - k.value))
            , S = (0,
              n.Fl)((() => Math.floor(D.value / 60)))
            , H = (0,
              n.Fl)((() => D.value % 60 < 10 ? "0" + D.value % 60 : D.value % 60))
            , j = (0,
              n.Fl)((() => 0 == k.value ? 0 : Number((Math.round(10 * U.value / k.value * 60) / 10).toFixed(1))))
            , T = (0,
              n.iH)("")
            , W = (0,
              n.iH)("")
            , I = (0,
              n.iH)("")
            , E = (0,
              n.iH)("")
            , P = (0,
              n.iH)(!0)
            , z = (0,
              n.iH)(!0)
            , U = (0,
              n.iH)(0)
            , C = (0,
              n.iH)(null)
            , K = (0,
              n.iH)("")
            , V = (0,
              n.qj)([[], [], [], [], []])
            , B = (0,
              n.qj)([[], [], [], [], []])
            , F = (0,
              n.iH)([])
            , M = (0,
              n.iH)(0)
            , N = (0,
              n.iH)([{
                colKey: "no",
                title: "名次",
                width: "40"
              }, {
                colKey: "stdID",
                title: "學生證編號",
                width: "100"
              }, {
                colKey: "lang",
                title: "字體",
                width: "50"
              }, {
                colKey: "speed",
                title: "速度(字/分)",
                width: "80"
              }, {
                colKey: "logTime",
                title: "記錄時間",
                width: "100"
              }])
            , L = (0,
              n.iH)([])
            , Z = ({ row: e }) => e.stdID == T.value ? (M.value = e.no,
              "custom-row") : ""
            , q = async () => {
              const e = {};
              try {
                const t = await fetch("https://g.puiching.edu.mo/~ricky/typing3/admin/server.php?action=complete", {
                  method: "POST",
                  body: JSON.stringify(e)
                })
                  , l = await t.json();
                r.log(l),
                  L.value = l.top100List
              } catch (t) {
                r.error("Error:", t)
              }
            }
            ;
          (0,
            n.bv)((() => {
              u.Z.set("stdID", "1360475-9"),
                T.value = u.Z.get("stdID"),
                Y(),
                window.addEventListener("beforeunload", J),
                t.$wamp.subscribe("pcms.typing3.test", (function(e) {
                  r.log("teacher call me"),
                    r.log(e)
                }
                )),
                t.$wamp.subscribe("pcms.typing3.toClass", (function(e) {
                  r.log("teacher call class with ", e);
                  var t = e[0];
                  t.classID == W.value && ("%" != t.subclass && t.subclass != I.value || (z.value = t.startExam))
                }
                )),
                t.$wamp.subscribe("pcms.typing3.toStudent", (function(e) {
                  r.log("teacher call with ", e);
                  var t = e[0];
                  t.stdID == T.value && (z.value = t.startExam)
                }
                ))
            }
            ));
          const J = e => {
            r.log("confirm leaving"),
              z.value && (e.preventDefault(),
                e.returnValue = !0)
          }
            , Y = () => {
              fetch("https://g.puiching.edu.mo/~ricky/typing3/admin/server.php?action=getStdInfo&stdID=" + T.value).then((e => e.json())).then((e => {
                r.log(e),
                  P.value = e.lang,
                  z.value = e.startExam,
                  W.value = e.classID,
                  I.value = e.subclass,
                  E.value = e.classNo + " " + e.cName,
                  z.value && ($("Online"),
                    A("Online"))
              }
              ))
            }
            , $ = e => {
              r.log("publish to Teaher");
              let l = {};
              l.stdID = T.value,
                l.lang = P.value,
                l.status = e,
                l.rTime = S.value + ":" + H.value,
                l.correct = U.value,
                l.speed = j.value,
                l.logTime = (new Date).toLocaleString("en-US"),
                r.log(l),
                t.$wamp.publish("pcms.typing3.toTeacher", [l])
            }
            , A = e => {
              r.log("update to Server");
              let t = {};
              t.stdID = T.value,
                t.lang = P.value,
                t.startExam = z.value,
                t.status = e,
                t.rTime = S.value + ":" + H.value,
                t.correct = U.value,
                t.speed = j.value,
                r.log(t),
                fetch("https://g.puiching.edu.mo/~ricky/typing3/admin/server.php?action=updateStatus", {
                  method: "POST",
                  body: JSON.stringify(t)
                }).then((e => e.json())).then((e => {
                  r.log(e)
                }
                ))
            }
            , G = () => {
              const e = setInterval((() => {
                k.value++,
                  0 != k.value && 600 != k.value && k.value % 30 == 0 && z.value && ($("Typing"),
                    A("Typing")),
                  600 == k.value && (clearInterval(e),
                    $("End"),
                    A("End"),
                    q(),
                    O.value = !0,
                    z.value = !1)
              }
              ), 1e3)
            }
            , Q = () => {
              a.value = !1,
                l.value = !0;
              for (var e = 0; e < 5; e++)
                V[e].splice(0, V[e].length),
                  B[e].splice(0, B[e].length);
              var t = {};
              t.stdID = T.value,
                t.lang = P.value,
                fetch("https://g.puiching.edu.mo/~ricky/typing3/admin/server.php?action=getWordList", {
                  method: "POST",
                  body: JSON.stringify(t)
                }).then((e => e.json())).then((e => {
                  r.log(e);
                  for (var t = 0; t < e.length; t++) {
                    var n = t % 5;
                    V[n].push(e[t]),
                      B[n].push(!1)
                  }
                  G(),
                    C.value.focus(),
                    l.value = !1
                }
                ))
            }
            , R = e => {
              const { e: t } = e;
              Q(),
                t.stopPropagation()
            }
            , X = e => {
              const { e: t } = e;
              O.value = !1,
                t.stopPropagation()
            }
            ;
          function ee() {
            var e = {};
            e.stdID = T.value,
              e.lang = P.value,
              fetch("https://g.puiching.edu.mo/~ricky/typing3/admin/server.php?action=getWordList", {
                method: "POST",
                body: JSON.stringify(e)
              }).then((e => e.json())).then((e => {
                r.log(e);
                for (var t = 0; t < e.length; t++) {
                  var l = t % 5;
                  V[l].push(e[t]),
                    B[l].push(!1)
                }
              }
              ))
          }
          function te() {
            for (var e = 0; e < 5; e++)
              for (var t = 0; t < V[e].length; t++)
                if (true) {
                  V[e].length < 5 && (r.log("needMore"),
                    ee()),
                    U.value += V[e][t].length,
                    B[e][t] = !0,
                    F.value.push({
                      y: e,
                      i: t
                    }),
                    setTimeout((() => {
                      var e = F.value[0];
                      F.value.shift();
                      var t = e.y
                        , l = e.i;
                      V[t].splice(l, 1),
                        B[t].splice(l, 1)
                    }
                    ), 800),
                    K.value = "",
                    r.log("match", V[e][t], K.value);
                  break
                }
          }
          return (e, t) => {
            const u = (0,
              n.up)("t-loading")
              , r = (0,
                n.up)("t-dialog")
              , k = (0,
                n.up)("t-table")
              , D = (0,
                n.up)("t-space")
              , T = (0,
                n.up)("t-card")
              , W = (0,
                n.up)("t-input")
              , I = (0,
                n.up)("t-col")
              , F = (0,
                n.up)("t-row");
            return (0,
              n.wg)(),
              (0,
                n.iD)(n.HY, null, [(0,
                  n.Wm)(u, {
                    indicator: "",
                    loading: l.value,
                    fullscreen: ""
                  }, null, 8, ["loading"]), (0,
                    n.Wm)(r, {
                      visible: a.value,
                      "onUpdate:visible": t[1] || (t[1] = e => a.value = e),
                      "cancel-btn": null,
                      closeBtn: !1,
                      closeOnEscKeydown: !1,
                      closeOnOverlayClick: !1,
                      "confirm-btn": "確定",
                      header: "提示",
                      onConfirm: R
                    }, {
                      default: (0,
                        n.w5)((() => [(0,
                          n._)("h3", null, [(0,
                            n.Uk)("請選擇輸入的中文字： "), (0,
                              n.Wm)((0,
                                n.SU)(i.Z), {
                                modelValue: P.value,
                                "onUpdate:modelValue": t[0] || (t[0] = e => P.value = e),
                                class: "my-toggle-blue",
                                "on-label": "繁體",
                                trueValue: "tw",
                                "off-label": "简体",
                                falseValue: "cn"
                              }, null, 8, ["modelValue"])])])),
                      _: 1
                    }, 8, ["visible"]), (0,
                      n.Wm)(r, {
                        visible: O.value,
                        "onUpdate:visible": t[2] || (t[2] = e => O.value = e),
                        width: "60%",
                        "confirm-btn": null,
                        "cancel-btn": null,
                        closeBtn: !1,
                        closeOnEscKeydown: !1,
                        closeOnOverlayClick: !1,
                        header: "成績",
                        onConfirm: X
                      }, {
                        default: (0,
                          n.w5)((() => [(0,
                            n._)("h3", null, "你的打字成績為 " + (0,
                              n.zw)(j.value) + "字/分", 1), z.value ? ((0,
                                n.wg)(),
                                (0,
                                  n.iD)("h3", s, "你的打字成績分數為 " + (0,
                                    n.zw)(10 * j.value) + " 分", 1)) : (0,
                                      n.kq)("", !0), (0,
                                        n._)("div", c, [(0,
                                          n.Wm)(k, {
                                            "row-key": "index",
                                            data: L.value,
                                            columns: N.value,
                                            "table-layout": "fixed",
                                            class: "myTable",
                                            maxHeight: "250",
                                            stripe: !0,
                                            hover: !0,
                                            "row-class-name": Z,
                                            bordered: "",
                                            "lazy-load": ""
                                          }, null, 8, ["data", "columns"])]), (0,
                                            n.wy)((0,
                                              n._)("h3", null, [(0,
                                                n.Uk)("你的最快速度排在全校百強的第"), (0,
                                                  n._)("span", v, (0,
                                                    n.zw)(M.value), 1), (0,
                                                      n.Uk)("位。")], 512), [[n.F8, M.value > 0]])])),
                        _: 1
                      }, 8, ["visible"]), (0,
                        n.Wm)(F, null, {
                          default: (0,
                            n.w5)((() => [(0,
                              n.Wm)(I, {
                                span: 10,
                                offset: 1,
                                class: "mainContainer"
                              }, {
                                default: (0,
                                  n.w5)((() => [(0,
                                    n._)("div", d, [(0,
                                      n._)("h1", null, [(0,
                                        n.Uk)("中文打字"), z.value ? ((0,
                                          n.wg)(),
                                          (0,
                                            n.iD)("span", p, " - 計分模式")) : (0,
                                              n.kq)("", !0)]), (0,
                                                n._)("p", f, (0,
                                                  n.zw)(E.value), 1), (0,
                                                    n.Wm)(T, {
                                                      class: "boxContainer",
                                                      align: "left"
                                                    }, {
                                                      default: (0,
                                                        n.w5)((() => [(0,
                                                          n.Wm)(D, {
                                                            direction: "vertical",
                                                            size: 30
                                                          }, {
                                                            default: (0,
                                                              n.w5)((() => [((0,
                                                                n.wg)(!0),
                                                                (0,
                                                                  n.iD)(n.HY, null, (0,
                                                                    n.Ko)(V, ((e, t) => ((0,
                                                                      n.wg)(),
                                                                      (0,
                                                                        n.j4)(D, {
                                                                          class: "textLine",
                                                                          size: 30,
                                                                          key: e
                                                                        }, {
                                                                          default: (0,
                                                                            n.w5)((() => [((0,
                                                                              n.wg)(!0),
                                                                              (0,
                                                                                n.iD)(n.HY, null, (0,
                                                                                  n.Ko)(e, ((e, l) => ((0,
                                                                                    n.wg)(),
                                                                                    (0,
                                                                                      n.iD)("div", {
                                                                                        key: e,
                                                                                        class: "words"
                                                                                      }, [((0,
                                                                                        n.wg)(!0),
                                                                                        (0,
                                                                                          n.iD)(n.HY, null, (0,
                                                                                            n.Ko)(e, ((e, a) => ((0,
                                                                                              n.wg)(),
                                                                                              (0,
                                                                                                n.iD)("span", {
                                                                                                  key: e.id,
                                                                                                  class: (0,
                                                                                                    n.C_)(B[t][l] || e == K.value[a] ? "correct_word" : "normal_word")
                                                                                                }, (0,
                                                                                                  n.zw)(e), 3)))), 128))])))), 128))])),
                                                                          _: 2
                                                                        }, 1024)))), 128))])),
                                                            _: 1
                                                          })])),
                                                      _: 1
                                                    })]), (0,
                                                      n._)("div", g, [(0,
                                                        n.Wm)(D, {
                                                          size: 120,
                                                          align: "center"
                                                        }, {
                                                          default: (0,
                                                            n.w5)((() => [(0,
                                                              n.Wm)(D, {
                                                                class: "sBox",
                                                                direction: "vertical",
                                                                align: "end"
                                                              }, {
                                                                default: (0,
                                                                  n.w5)((() => [m, (0,
                                                                    n._)("span", h, (0,
                                                                      n.zw)(S.value) + ":" + (0,
                                                                        n.zw)(H.value), 1)])),
                                                                _: 1
                                                              }), (0,
                                                                n.Wm)(D, {
                                                                  direction: "vertical",
                                                                  align: "center"
                                                                }, {
                                                                  default: (0,
                                                                    n.w5)((() => [w, (0,
                                                                      n._)("div", y, [(0,
                                                                        n.Wm)((0,
                                                                          n.SU)(o.ZP), {
                                                                          maxValue: 100,
                                                                          value: j.value
                                                                        }, null, 8, ["value"])])])),
                                                                  _: 1
                                                                }), (0,
                                                                  n.Wm)(D, {
                                                                    class: "sBox",
                                                                    direction: "vertical",
                                                                    align: "end"
                                                                  }, {
                                                                    default: (0,
                                                                      n.w5)((() => [b, (0,
                                                                        n._)("span", _, (0,
                                                                          n.zw)(U.value), 1)])),
                                                                    _: 1
                                                                  })])),
                                                          _: 1
                                                        })]), (0,
                                                          n._)("div", x, [(0,
                                                            n.Wm)(F, null, {
                                                              default: (0,
                                                                n.w5)((() => [(0,
                                                                  n.Wm)(I, {
                                                                    span: 6,
                                                                    offset: 3
                                                                  }, {
                                                                    default: (0,
                                                                      n.w5)((() => [(0,
                                                                        n.Wm)(W, {
                                                                          align: "right",
                                                                          ref_key: "myInput",
                                                                          ref: C,
                                                                          modelValue: K.value,
                                                                          "onUpdate:modelValue": t[3] || (t[3] = e => K.value = e),
                                                                          onChange: te
                                                                        }, null, 8, ["modelValue"])])),
                                                                    _: 1
                                                                  })])),
                                                              _: 1
                                                            })])])),
                                _: 1
                              })])),
                          _: 1
                        })], 64)
          }
        }
      });
      const D = k;
      var S = D
        , H = l(8778);
      l(385);
      const j = (0,
        n.ri)(S);
      j.use(H.Z, {
        url: "ws://g.puiching.edu.mo:8080/ws",
        realm: "realm1",
        auto_reestablish: !0,
        auto_close_timeout: -1
      }),
        j.use(a.ZP).mount("#app")
    },
    2575: function() { },
    2794: function() { },
    6322: function() { },
    2480: function() { },
    2361: function() { },
    4616: function() { },
    5024: function() { },
    6020: function() { }
  }
    , t = {};
  function l(n) {
    var a = t[n];
    if (void 0 !== a)
      return a.exports;
    var o = t[n] = {
      id: n,
      loaded: !1,
      exports: {}
    };
    return e[n].call(o.exports, o, o.exports, l),
      o.loaded = !0,
      o.exports
  }
  l.m = e,
    function() {
      l.amdD = function() {
        throw new Error("define cannot be used indirect")
      }
    }(),
    function() {
      var e = [];
      l.O = function(t, n, a, o) {
        if (!n) {
          var u = 1 / 0;
          for (c = 0; c < e.length; c++) {
            n = e[c][0],
              a = e[c][1],
              o = e[c][2];
            for (var i = !0, r = 0; r < n.length; r++)
              (!1 & o || u >= o) && Object.keys(l.O).every((function(e) {
                return l.O[e](n[r])
              }
              )) ? n.splice(r--, 1) : (i = !1,
                o < u && (u = o));
            if (i) {
              e.splice(c--, 1);
              var s = a();
              void 0 !== s && (t = s)
            }
          }
          return t
        }
        o = o || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > o; c--)
          e[c] = e[c - 1];
        e[c] = [n, a, o]
      }
    }(),
    function() {
      l.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e["default"]
        }
          : function() {
            return e
          }
          ;
        return l.d(t, {
          a: t
        }),
          t
      }
    }(),
    function() {
      l.d = function(e, t) {
        for (var n in t)
          l.o(t, n) && !l.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
          })
      }
    }(),
    function() {
      l.g = function() {
        if ("object" === typeof globalThis)
          return globalThis;
        try {
          return this || new Function("return this")()
        } catch (e) {
          if ("object" === typeof window)
            return window
        }
      }()
    }(),
    function() {
      l.hmd = function(e) {
        return e = Object.create(e),
          e.children || (e.children = []),
          Object.defineProperty(e, "exports", {
            enumerable: !0,
            set: function() {
              throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + e.id)
            }
          }),
          e
      }
    }(),
    function() {
      l.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }
    }(),
    function() {
      l.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }),
          Object.defineProperty(e, "__esModule", {
            value: !0
          })
      }
    }(),
    function() {
      var e = {
        143: 0
      };
      l.O.j = function(t) {
        return 0 === e[t]
      }
        ;
      var t = function(t, n) {
        var a, o, u = n[0], i = n[1], r = n[2], s = 0;
        if (u.some((function(t) {
          return 0 !== e[t]
        }
        ))) {
          for (a in i)
            l.o(i, a) && (l.m[a] = i[a]);
          if (r)
            var c = r(l)
        }
        for (t && t(n); s < u.length; s++)
          o = u[s],
            l.o(e, o) && e[o] && e[o][0](),
            e[o] = 0;
        return l.O(c)
      }
        , n = self["webpackChunktyping3"] = self["webpackChunktyping3"] || [];
      n.forEach(t.bind(null, 0)),
        n.push = t.bind(null, n.push.bind(n))
    }();
  var n = l.O(void 0, [998], (function() {
    return l(3382)
  }
  ));
  n = l.O(n)
}
)();
//# sourceMappingURL=app.ceac731c.js.map
