/*滚动条封装S*/
$(function () {
	rxued.scrolls = {
		doScroll: function(obj, ulclass, li, prev, next, scrollsl, fn) {
			var oUllist = obj.find(ulclass);
			var oLi = obj.find(li);
			var theLength = oLi.length;
			var oWidth = parseInt(oLi.eq(0).outerWidth()) + parseInt(oLi.eq(0).css("margin-left")) + parseInt(oLi.eq(0).css(
				"margin-right"));
			oUllist.width(oWidth * theLength);
			if (theLength > scrollsl) {
				obj.find(prev).show();
				obj.find(next).show()
			} else {
				obj.find(prev).hide();
				obj.find(next).hide()
			}
			var iNum = 0;
			obj.find(prev).unbind("click");
			obj.find(prev).click(function() {
				if (!oUllist.is(":animated")) {
					if (iNum == 0) {} else {
						iNum -= scrollsl;
						oUllist.animate({
							"marginLeft": -oWidth * iNum + "px"
						}, 500)
					}
				}
			});
			obj.find(next).unbind("click");
			obj.find(next).click(function() {
				if (!oUllist.is(":animated")) {
					iNum += scrollsl;
					if (iNum >= theLength) {
						oUllist.animate({
							"marginLeft": 0 + "px"
						}, 500);
						iNum = 0
					}
					if (theLength - iNum < scrollsl) {
						oUllist.animate({
							"marginLeft": -oWidth * (theLength - scrollsl) + "px"
						}, 500)
					} else {
						oUllist.animate({
							"marginLeft": -oWidth * iNum + "px"
						}, 500)
					}
				}
			});
			if (typeof(fn) == "function") {
				fn()
			}
		},
		doScroll2: function(obj, ulclass, ul_li, olclass, ol_li, ol_active, prev, next) {
			var oUllist = obj.find(ulclass);
			var oOllist = obj.find(olclass);
			var oi = 0;
			var oUlli = obj.find(ul_li);
			var oOlli = obj.find(ol_li);
			var theLength = oUlli.length;
			var oWidth = parseInt(oUlli.eq(0).outerWidth()) + parseInt(oUlli.eq(0).css("margin-left")) + parseInt(oUlli.eq(0).css(
				"margin-right"));
			oUllist.width(oWidth * theLength);
			obj.find(prev).unbind("click");
			obj.find(prev).click(function() {
				if (!oUllist.is(":animated")) {
					if (oi == 0) {
						return false
					} else {
						oi--;
						oUllist.animate({
							"marginLeft": -oWidth * oi + "px"
						}, 500);
						oOlli.eq(oi).addClass(ol_active).siblings().removeClass(ol_active)
					}
				}
			});
			obj.find(next).unbind("click");
			obj.find(next).click(function() {
				if (!oUllist.is(":animated")) {
					if (oi == theLength - 1) {
						return false
					} else {
						oi++;
						oUllist.animate({
							"marginLeft": -oWidth * oi + "px"
						}, 500);
						oOlli.eq(oi).addClass(ol_active).siblings().removeClass(ol_active)
					}
				}
			});
			oOlli.click(function() {
				oi = $(this).index();
				$(this).addClass(ol_active).siblings().removeClass(ol_active);
				oUllist.animate({
					"marginLeft": -oWidth * oi + "px"
				}, 500)
			})
		},
		doScroll3: function(obj, ulclass, li, prev, next, scrollsl, bigimgclass, cur, fn) {
			var oUllist = obj.find(ulclass);
			var oLi = obj.find(li);
			var theLength = oLi.length;
			var oWidth = parseInt(oLi.eq(0).outerWidth()) + parseInt(oLi.eq(0).css("margin-left")) + parseInt(oLi.eq(0).css(
				"margin-right"));
			oUllist.width(oWidth * theLength);
			var iNum = 0;
			obj.find(prev).unbind("click");
			obj.find(prev).click(function() {
				if (!oUllist.is(":animated")) {
					if (iNum == 0) {} else {
						iNum -= scrollsl;
						oUllist.animate({
							"marginLeft": -oWidth * iNum + "px"
						}, 500)
					}
				}
			});
			obj.find(next).unbind("click");
			obj.find(next).click(function() {
				if (!oUllist.is(":animated")) {
					iNum += scrollsl;
					if (iNum >= theLength) {
						oUllist.animate({
							"marginLeft": 0 + "px"
						}, 500);
						iNum = 0
					}
					if (theLength - iNum < scrollsl) {
						oUllist.animate({
							"marginLeft": -oWidth * (theLength - scrollsl) + "px"
						}, 500)
					} else {
						oUllist.animate({
							"marginLeft": -oWidth * iNum + "px"
						}, 500)
					}
				}
			});
			oLi.click(function() {
				$(this).addClass(cur).siblings().removeClass(cur);
				var othisSrc = $(this).find("img").attr("src");
				obj.find(bigimgclass).attr("src", othisSrc);
				if (typeof(fn) == "function") {
					fn()
				}
			})
		}
	};
})
var rxued;
if (!rxued) {
	rxued = {}
}
(function(e) {
	e.fn.extend({
		slimScroll: function(n) {
			var i = e.extend({
				width: "auto",
				height: "250px",
				maxHeight: "50px",
				size: "2px",
				color: "#cecece",
				position: "right",
				distance: "1px",
				start: "top",
				opacity: 0.4,
				alwaysVisible: !1,
				disableFadeOut: !1,
				railVisible: !1,
				railColor: "#333",
				railOpacity: 0.2,
				railDraggable: !0,
				railClass: "slimScrollRail",
				barClass: "slimScrollBar",
				wrapperClass: "slimScrollDiv",
				allowPageScroll: !1,
				wheelStep: 20,
				touchScrollStep: 200,
				borderRadius: "7px",
				railBorderRadius: "7px"
			}, n);
			return this.each(function() {
				function o(t) {
					if (d) {
						t = t || window.event;
						var n = 0;
						t.wheelDelta && (n = -t.wheelDelta / 120), t.detail && (n = t.detail / 3), e(t.target || t.srcTarget || t.srcElement)
							.closest("." + i.wrapperClass).is(y.parent()) && r(n, !0), t.preventDefault && !v && t.preventDefault(), v ||
							(t.returnValue = !1)
					}
				}

				function r(e, t, n) {
					v = !1;
					var o = e,
						r = y.outerHeight() - _.outerHeight();
					t && (o = parseInt(_.css("top")) + e * parseInt(i.wheelStep) / 100 * _.outerHeight(), o = Math.min(Math.max(
							o, 0), r), o = e > 0 ? Math.ceil(o) : Math.floor(o), _.css({
							top: o + "px"
						})), f = parseInt(_.css("top")) / (y.outerHeight() - _.outerHeight()), o = f * (y[0].scrollHeight - y.outerHeight()),
						n && (o = e, e = o / y[0].scrollHeight * y.outerHeight(), e = Math.min(Math.max(e, 0), r), _.css({
							top: e + "px"
						})), y.scrollTop(o), y.trigger("slimscrolling", ~~o), s(), l()
				}

				function a() {
					m = Math.max(y.outerHeight() / y[0].scrollHeight * y.outerHeight(), 30), _.css({
						height: m + "px"
					});
					var e = m == y.outerHeight() ? "none" : "block";
					_.css({
						display: e
					})
				}

				function s() {
					a(), clearTimeout(u), f == ~~f ? (v = i.allowPageScroll, g != f && y.trigger("slimscroll", 0 == ~~f ? "top" :
						"bottom")) : v = !1, g = f, m >= y.outerHeight() ? v = !0 : (_.stop(!0, !0).fadeIn("fast"), i.railVisible &&
						x.stop(!0, !0).fadeIn("fast"))
				}

				function l() {
					i.alwaysVisible || (u = setTimeout(function() {
						i.disableFadeOut && d || c || h || (_.fadeOut("slow"), x.fadeOut("slow"))
					}, 1000))
				}
				var d, c, h, u, p, m, f, g, v = !1,
					y = e(this);
				if (y.parent().hasClass(i.wrapperClass)) {
					var b = y.scrollTop(),
						_ = y.closest("." + i.barClass),
						x = y.closest("." + i.railClass);
					if (a(), e.isPlainObject(n)) {
						if ("height" in n && "auto" == n.height) {
							y.parent().css("height", "auto"), y.css("height", "auto");
							var E = y.parent().parent().height();
							y.parent().css("height", E), y.css("height", E)
						}
						if ("scrollTo" in n) {
							b = parseInt(i.scrollTo)
						} else {
							if ("scrollBy" in n) {
								b += parseInt(i.scrollBy)
							} else {
								if ("destroy" in n) {
									return _.remove(), x.remove(), void y.unwrap()
								}
							}
						}
						r(b, !1, !0)
					}
				} else {
					if (!(e.isPlainObject(n) && "destroy" in n)) {
						i.height = "auto" == i.height ? y.parent().height() : i.height, b = e("<div></div>").addClass(i.wrapperClass)
							.css({
								position: "relative",
								overflow: "hidden",
								width: i.width,
								height: i.height
							}), y.css({
								overflow: "hidden",
								width: i.width,
								height: i.height
							});
						var x = e("<div></div>").addClass(i.railClass).css({
								width: i.size,
								height: "100%",
								position: "absolute",
								top: 0,
								display: i.alwaysVisible && i.railVisible ? "block" : "none",
								"border-radius": i.railBorderRadius,
								background: i.railColor,
								opacity: i.railOpacity,
								zIndex: 90
							}),
							_ = e("<div></div>").addClass(i.barClass).css({
								background: i.color,
								width: i.size,
								position: "absolute",
								top: 0,
								opacity: i.opacity,
								display: i.alwaysVisible ? "block" : "none",
								"border-radius": i.borderRadius,
								BorderRadius: i.borderRadius,
								MozBorderRadius: i.borderRadius,
								WebkitBorderRadius: i.borderRadius,
								zIndex: 99
							}),
							E = "right" == i.position ? {
								right: i.distance
							} : {
								left: i.distance
							};
						x.css(E), _.css(E), y.wrap(b), y.parent().append(_), y.parent().append(x), i.railDraggable && _.bind(
								"mousedown",
								function(n) {
									var i = e(document);
									return h = !0, t = parseFloat(_.css("top")), pageY = n.pageY, i.bind("mousemove.slimscroll", function(e) {
										currTop = t + e.pageY - pageY, _.css("top", currTop), r(0, _.position().top, !1)
									}), i.bind("mouseup.slimscroll", function(e) {
										h = !1, l(), i.unbind(".slimscroll")
									}), !1
								}).bind("selectstart.slimscroll", function(e) {
								return e.stopPropagation(), e.preventDefault(), !1
							}), x.hover(function() {
								s()
							}, function() {
								l()
							}), _.hover(function() {
								c = !0
							}, function() {
								c = !1
							}), y.hover(function() {
								d = !0, s(), l()
							}, function() {
								d = !1, l()
							}), y.bind("touchstart", function(e, t) {
								e.originalEvent.touches.length && (p = e.originalEvent.touches[0].pageY)
							}), y.bind("touchmove", function(e) {
								v || e.originalEvent.preventDefault(), e.originalEvent.touches.length && (r((p - e.originalEvent.touches[
									0].pageY) / i.touchScrollStep, !0), p = e.originalEvent.touches[0].pageY)
							}), a(), "bottom" === i.start ? (_.css({
								top: y.outerHeight() - _.outerHeight()
							}), r(0, !0)) : "top" !== i.start && (r(e(i.start).position().top, null, !0), i.alwaysVisible || _.hide()),
							window.addEventListener ? (this.addEventListener("DOMMouseScroll", o, !1), this.addEventListener(
								"mousewheel", o, !1)) : document.attachEvent("onmousewheel", o)
					}
				}
			}), this
		}
	}), e.fn.extend({
		slimscroll: e.fn.slimScroll
	})
})(jQuery);
/*滚动条封装N*/
