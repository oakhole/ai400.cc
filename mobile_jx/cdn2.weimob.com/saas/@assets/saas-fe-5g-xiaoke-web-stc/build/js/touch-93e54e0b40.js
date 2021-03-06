! function(e) {
    function t(e, t, o, n) {
        return Math.abs(e - t) >= Math.abs(o - n) ? e - t > 0 ? "Left" : "Right" : o - n > 0 ? "Up" : "Down"
    }

    function o() {
        d = null, T.last && (T.el.trigger("longTap"), T = {})
    }

    function n() {
        d && clearTimeout(d), d = null
    }

    function i() {
        l && clearTimeout(l), p && clearTimeout(p), s && clearTimeout(s), d && clearTimeout(d), l = p = s = d = null, T = {}
    }

    function u(e) {
        return ("touch" == e.pointerType || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary
    }

    function c(e, t) {
        return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t
    }

    function r() {
        v && (e(document).off(h.down, g).off(h.up, w).off(h.move, m).off(h.cancel, i), e(window).off("scroll", i), i(), v = !1)
    }

    function a(a) {
        var M, b, x, P, S = 0,
            D = 0;
        r(), h = a && "down" in a ? a : "ontouchstart" in document ? {
            down: "touchstart",
            up: "touchend",
            move: "touchmove",
            cancel: "touchcancel"
        } : "onpointerdown" in document ? {
            down: "pointerdown",
            up: "pointerup",
            move: "pointermove",
            cancel: "pointercancel"
        } : "onmspointerdown" in document ? {
            down: "MSPointerDown",
            up: "MSPointerUp",
            move: "MSPointerMove",
            cancel: "MSPointerCancel"
        } : !1, h && ("MSGesture" in window && (f = new MSGesture, f.target = document.body, e(document).bind("MSGestureEnd", function(e) {
            var t = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
            t && (T.el.trigger("swipe"), T.el.trigger("swipe" + t))
        })), g = function(t) {
            (!(P = c(t, "down")) || u(t)) && (x = P ? t : t.touches[0], t.touches && 1 === t.touches.length && T.x2 && (T.x2 = void 0, T.y2 = void 0), M = Date.now(), b = M - (T.last || M), T.el = e("tagName" in x.target ? x.target : x.target.parentNode), l && clearTimeout(l), T.x1 = x.pageX, T.y1 = x.pageY, b > 0 && 250 >= b && (T.isDoubleTap = !0), T.last = M, d = setTimeout(o, y), f && P && f.addPointer(t.pointerId))
        }, m = function(e) {
            (!(P = c(e, "move")) || u(e)) && (x = P ? e : e.touches[0], n(), T.x2 = x.pageX, T.y2 = x.pageY, S += Math.abs(T.x1 - T.x2), D += Math.abs(T.y1 - T.y2))
        }, w = function(o) {
            (!(P = c(o, "up")) || u(o)) && (n(), T.x2 && Math.abs(T.x1 - T.x2) > 30 || T.y2 && Math.abs(T.y1 - T.y2) > 30 ? s = setTimeout(function() {
                T.el && (T.el.trigger("swipe"), T.el.trigger("swipe" + t(T.x1, T.x2, T.y1, T.y2))), T = {}
            }, 0) : "last" in T && (30 > S && 30 > D ? p = setTimeout(function() {
                var t = e.Event("tap");
                t.cancelTouch = i, T.el && T.el.trigger(t), T.isDoubleTap ? (T.el && T.el.trigger("doubleTap"), T = {}) : l = setTimeout(function() {
                    l = null, T.el && T.el.trigger("singleTap"), T = {}
                }, 250)
            }, 0) : T = {}), S = D = 0)
        }, e(document).on(h.up, w).on(h.down, g).on(h.move, m), e(document).on(h.cancel, i), e(window).on("scroll", i), v = !0)
    }
    var l, p, s, d, f, g, w, m, h, T = {},
        y = 750,
        v = !1;
    ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(t) {
        e.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), e.touch = {
        setup: a
    }, e(document).ready(a)
}(Zepto);