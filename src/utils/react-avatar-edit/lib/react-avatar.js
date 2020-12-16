!(function(t, e) {
	'object' == typeof exports && 'object' == typeof module
		? (module.exports = e(require('react')))
		: 'function' == typeof define && define.amd
		? define(['react'], e)
		: 'object' == typeof exports
		? (exports.reactAvatar = e(require('react')))
		: (t.reactAvatar = e(t.react));
})(window, function(t) {
	return (function(t) {
		var e = {};
		function i(n) {
			if (e[n]) return e[n].exports;
			var a = (e[n] = { i: n, l: !1, exports: {} });
			return t[n].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
		}
		return (
			(i.m = t),
			(i.c = e),
			(i.d = function(t, e, n) {
				i.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: n });
			}),
			(i.r = function(t) {
				Object.defineProperty(t, '__esModule', { value: !0 });
			}),
			(i.n = function(t) {
				var e =
					t && t.__esModule
						? function() {
								return t.default;
						  }
						: function() {
								return t;
						  };
				return i.d(e, 'a', e), e;
			}),
			(i.o = function(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(i.p = ''),
			i((i.s = 22))
		);
	})([
		function(e, i) {
			e.exports = t;
		},
		function(t, e, i) {
			(t.exports = i(21)), i(19), i(18), i(17), i(16), i(15), i(14), i(13), i(12), i(11), i(10), i(9), i(8);
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.DD = {
					anim: new Konva.Animation(function() {
						var t = this.dirty;
						return (this.dirty = !1), t;
					}),
					isDragging: !1,
					justDragged: !1,
					offset: { x: 0, y: 0 },
					node: null,
					_drag: function(t) {
						var e = Konva.DD,
							i = e.node;
						if (i) {
							if (!e.isDragging) {
								var n = i.getStage().getPointerPosition();
								n || (i.getStage()._setPointerPosition(t), (n = i.getStage().getPointerPosition()));
								var a = i.dragDistance();
								if (
									Math.max(Math.abs(n.x - e.startPointerPos.x), Math.abs(n.y - e.startPointerPos.y)) <
									a
								)
									return;
							}
							if (
								(i.getStage()._setPointerPosition(t),
								!e.isDragging &&
									((e.isDragging = !0),
									i.fire('dragstart', { type: 'dragstart', target: i, evt: t }, !0),
									!i.isDragging()))
							)
								return;
							i._setDragPosition(t), i.fire('dragmove', { type: 'dragmove', target: i, evt: t }, !0);
						}
					},
					_endDragBefore: function(t) {
						var e,
							i = Konva.DD,
							n = i.node;
						n &&
							((e = n.getLayer()),
							i.anim.stop(),
							i.isDragging &&
								((i.isDragging = !1),
								(i.justDragged = !0),
								(Konva.listenClickTap = !1),
								t && (t.dragEndNode = n)),
							delete i.node,
							(n.getLayer() || e || n instanceof Konva.Stage) && (e || n).draw());
					},
					_endDragAfter: function(t) {
						var e = (t = t || {}).dragEndNode;
						t && e && e.fire('dragend', { type: 'dragend', target: e, evt: t }, !0);
					},
				}),
					(Konva.Node.prototype.startDrag = function() {
						var t = Konva.DD,
							e = this.getStage(),
							i = this.getLayer(),
							n = e.getPointerPosition(),
							a = this.getAbsolutePosition();
						n &&
							(t.node && t.node.stopDrag(),
							(t.node = this),
							(t.startPointerPos = n),
							(t.offset.x = n.x - a.x),
							(t.offset.y = n.y - a.y),
							t.anim.setLayers(i || this.getLayers()),
							t.anim.start(),
							this._setDragPosition());
					}),
					(Konva.Node.prototype._setDragPosition = function(t) {
						var e = Konva.DD,
							i = this.getStage().getPointerPosition(),
							n = this.getDragBoundFunc();
						if (i) {
							var a = { x: i.x - e.offset.x, y: i.y - e.offset.y };
							void 0 !== n && (a = n.call(this, a, t)),
								this.setAbsolutePosition(a),
								(this._lastPos && this._lastPos.x === a.x && this._lastPos.y === a.y) ||
									(e.anim.dirty = !0),
								(this._lastPos = a);
						}
					}),
					(Konva.Node.prototype.stopDrag = function() {
						var t = Konva.DD,
							e = {};
						t._endDragBefore(e), t._endDragAfter(e);
					}),
					(Konva.Node.prototype.setDraggable = function(t) {
						this._setAttr('draggable', t), this._dragChange();
					});
				var t = Konva.Node.prototype.remove;
				(Konva.Node.prototype.__originalRemove = t),
					(Konva.Node.prototype.remove = function() {
						var e = Konva.DD;
						e.node && e.node._id === this._id && this.stopDrag(), t.call(this);
					}),
					(Konva.Node.prototype.isDragging = function() {
						var t = Konva.DD;
						return !(!t.node || t.node._id !== this._id || !t.isDragging);
					}),
					(Konva.Node.prototype._listenDrag = function() {
						var t = this;
						this._dragCleanup(),
							'Stage' === this.getClassName()
								? this.on('contentMousedown.konva contentTouchstart.konva', function(e) {
										Konva.DD.node || t.startDrag(e);
								  })
								: this.on('mousedown.konva touchstart.konva', function(e) {
										1 !== e.evt.button && 2 !== e.evt.button && (Konva.DD.node || t.startDrag(e));
								  });
					}),
					(Konva.Node.prototype._dragChange = function() {
						if (this.attrs.draggable) this._listenDrag();
						else {
							this._dragCleanup();
							var t = this.getStage(),
								e = Konva.DD;
							t && e.node && e.node._id === this._id && e.node.stopDrag();
						}
					}),
					(Konva.Node.prototype._dragCleanup = function() {
						'Stage' === this.getClassName()
							? (this.off('contentMousedown.konva'), this.off('contentTouchstart.konva'))
							: (this.off('mousedown.konva'), this.off('touchstart.konva'));
					}),
					Konva.Factory.addGetterSetter(Konva.Node, 'dragBoundFunc'),
					Konva.Factory.addGetter(Konva.Node, 'draggable', !1),
					Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'draggable'),
					Konva.isBrowser &&
						(window.addEventListener('mouseup', Konva.DD._endDragBefore, !0),
						window.addEventListener('touchend', Konva.DD._endDragBefore, !0),
						window.addEventListener('mousemove', Konva.DD._drag),
						window.addEventListener('touchmove', Konva.DD._drag),
						window.addEventListener('mouseup', Konva.DD._endDragAfter, !1),
						window.addEventListener('touchend', Konva.DD._endDragAfter, !1));
			})();
		},
		function(t, e) {
			!(function(t) {
				'use strict';
				var e =
					t.global.performance && t.global.performance.now
						? function() {
								return t.global.performance.now();
						  }
						: function() {
								return new Date().getTime();
						  };
				var i =
					t.global.requestAnimationFrame ||
					t.global.webkitRequestAnimationFrame ||
					t.global.mozRequestAnimationFrame ||
					t.global.oRequestAnimationFrame ||
					t.global.msRequestAnimationFrame ||
					function(t) {
						setTimeout(t, 1e3 / 60);
					};
				function n() {
					return i.apply(t.global, arguments);
				}
				(t.Animation = function(i, n) {
					var a = t.Animation;
					(this.func = i),
						this.setLayers(n),
						(this.id = a.animIdCounter++),
						(this.frame = { time: 0, timeDiff: 0, lastTime: e() });
				}),
					(t.Animation.prototype = {
						setLayers: function(t) {
							var e;
							return (e = t ? (t.length > 0 ? t : [t]) : []), (this.layers = e), this;
						},
						getLayers: function() {
							return this.layers;
						},
						addLayer: function(t) {
							var e,
								i = this.layers,
								n = i.length;
							for (e = 0; e < n; e++) if (i[e]._id === t._id) return !1;
							return this.layers.push(t), !0;
						},
						isRunning: function() {
							var e,
								i = t.Animation.animations,
								n = i.length;
							for (e = 0; e < n; e++) if (i[e].id === this.id) return !0;
							return !1;
						},
						start: function() {
							var i = t.Animation;
							return (
								this.stop(),
								(this.frame.timeDiff = 0),
								(this.frame.lastTime = e()),
								i._addAnimation(this),
								this
							);
						},
						stop: function() {
							return t.Animation._removeAnimation(this), this;
						},
						_updateFrameObject: function(t) {
							(this.frame.timeDiff = t - this.frame.lastTime),
								(this.frame.lastTime = t),
								(this.frame.time += this.frame.timeDiff),
								(this.frame.frameRate = 1e3 / this.frame.timeDiff);
						},
					}),
					(t.Animation.animations = []),
					(t.Animation.animIdCounter = 0),
					(t.Animation.animRunning = !1),
					(t.Animation._addAnimation = function(t) {
						this.animations.push(t), this._handleAnimation();
					}),
					(t.Animation._removeAnimation = function(t) {
						var e,
							i = t.id,
							n = this.animations,
							a = n.length;
						for (e = 0; e < a; e++)
							if (n[e].id === i) {
								this.animations.splice(e, 1);
								break;
							}
					}),
					(t.Animation._runFrames = function() {
						var t,
							i,
							n,
							a,
							r,
							o,
							s,
							h,
							l = {},
							c = this.animations;
						for (a = 0; a < c.length; a++)
							if (
								((i = (t = c[a]).layers),
								(n = t.func),
								t._updateFrameObject(e()),
								(o = i.length),
								!n || !1 !== n.call(t, t.frame))
							)
								for (r = 0; r < o; r++) void 0 !== (s = i[r])._id && (l[s._id] = s);
						for (h in l) l.hasOwnProperty(h) && l[h].draw();
					}),
					(t.Animation._animationLoop = function() {
						var e = t.Animation;
						e.animations.length ? (e._runFrames(), n(e._animationLoop)) : (e.animRunning = !1);
					}),
					(t.Animation._handleAnimation = function() {
						this.animRunning || ((this.animRunning = !0), n(this._animationLoop));
					}),
					(t.BaseLayer.prototype.batchDraw = function() {
						var e = this,
							i = t.Animation;
						return (
							this.batchAnim ||
								(this.batchAnim = new i(function() {
									e.batchAnim.stop();
								}, this)),
							this.batchAnim.isRunning() || this.batchAnim.start(),
							this
						);
					}),
					(t.Stage.prototype.batchDraw = function() {
						return (
							this.getChildren().each(function(t) {
								t.batchDraw();
							}),
							this
						);
					});
			})(Konva);
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Path = function(t) {
					this.___init(t);
				}),
					(Konva.Path.prototype = {
						___init: function(t) {
							this.dataArray = [];
							var e = this;
							Konva.Shape.call(this, t),
								(this.className = 'Path'),
								(this.dataArray = Konva.Path.parsePathData(this.getData())),
								(this.pathLength = 0);
							for (var i = 0; i < this.dataArray.length; ++i)
								this.pathLength += this.dataArray[i].pathLength;
							this.on('dataChange.konva', function() {
								(e.dataArray = Konva.Path.parsePathData(this.getData())), (this.pathLength = 0);
								for (var t = 0; t < this.dataArray.length; ++t)
									this.pathLength += this.dataArray[t].pathLength;
							}),
								this.sceneFunc(this._sceneFunc);
						},
						_sceneFunc: function(t) {
							var e = this.dataArray;
							t.beginPath();
							for (var i = 0; i < e.length; i++) {
								var n = e[i].command,
									a = e[i].points;
								switch (n) {
									case 'L':
										t.lineTo(a[0], a[1]);
										break;
									case 'M':
										t.moveTo(a[0], a[1]);
										break;
									case 'C':
										t.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
										break;
									case 'Q':
										t.quadraticCurveTo(a[0], a[1], a[2], a[3]);
										break;
									case 'A':
										var r = a[0],
											o = a[1],
											s = a[2],
											h = a[3],
											l = a[4],
											c = a[5],
											d = a[6],
											u = a[7],
											f = s > h ? s : h,
											g = s > h ? 1 : s / h,
											v = s > h ? h / s : 1;
										t.translate(r, o),
											t.rotate(d),
											t.scale(g, v),
											t.arc(0, 0, f, l, l + c, 1 - u),
											t.scale(1 / g, 1 / v),
											t.rotate(-d),
											t.translate(-r, -o);
										break;
									case 'z':
										t.closePath();
								}
							}
							t.fillStrokeShape(this);
						},
						getSelfRect: function() {
							var t = [];
							this.dataArray.forEach(function(e) {
								t = t.concat(e.points);
							});
							for (var e, i, n = t[0], a = t[0], r = t[1], o = t[1], s = 0; s < t.length / 2; s++)
								(e = t[2 * s]),
									(i = t[2 * s + 1]),
									isNaN(e) || ((n = Math.min(n, e)), (a = Math.max(a, e))),
									isNaN(i) || ((r = Math.min(r, i)), (o = Math.max(o, i)));
							return {
								x: Math.round(n),
								y: Math.round(r),
								width: Math.round(a - n),
								height: Math.round(o - r),
							};
						},
						getLength: function() {
							return this.pathLength;
						},
						getPointAtLength: function(t) {
							var e,
								i = 0,
								n = this.dataArray.length;
							if (!n) return null;
							for (; i < n && t > this.dataArray[i].pathLength; )
								(t -= this.dataArray[i].pathLength), ++i;
							if (i === n) return { x: (e = this.dataArray[i - 1].points.slice(-2))[0], y: e[1] };
							if (t < 0.01) return { x: (e = this.dataArray[i].points.slice(0, 2))[0], y: e[1] };
							var a = this.dataArray[i],
								r = a.points;
							switch (a.command) {
								case 'L':
									return Konva.Path.getPointOnLine(t, a.start.x, a.start.y, r[0], r[1]);
								case 'C':
									return Konva.Path.getPointOnCubicBezier(
										t / a.pathLength,
										a.start.x,
										a.start.y,
										r[0],
										r[1],
										r[2],
										r[3],
										r[4],
										r[5],
									);
								case 'Q':
									return Konva.Path.getPointOnQuadraticBezier(
										t / a.pathLength,
										a.start.x,
										a.start.y,
										r[0],
										r[1],
										r[2],
										r[3],
									);
								case 'A':
									var o = r[0],
										s = r[1],
										h = r[2],
										l = r[3],
										c = r[4],
										d = r[5],
										u = r[6];
									return (
										(c += (d * t) / a.pathLength),
										Konva.Path.getPointOnEllipticalArc(o, s, h, l, c, u)
									);
							}
							return null;
						},
					}),
					Konva.Util.extend(Konva.Path, Konva.Shape),
					(Konva.Path.getLineLength = function(t, e, i, n) {
						return Math.sqrt((i - t) * (i - t) + (n - e) * (n - e));
					}),
					(Konva.Path.getPointOnLine = function(t, e, i, n, a, r, o) {
						void 0 === r && (r = e), void 0 === o && (o = i);
						var s = (a - i) / (n - e + 1e-8),
							h = Math.sqrt((t * t) / (1 + s * s));
						n < e && (h *= -1);
						var l,
							c = s * h;
						if (n === e) l = { x: r, y: o + c };
						else if ((o - i) / (r - e + 1e-8) === s) l = { x: r + h, y: o + c };
						else {
							var d,
								u,
								f = this.getLineLength(e, i, n, a);
							if (f < 1e-8) return;
							var g = (r - e) * (n - e) + (o - i) * (a - i);
							(d = e + (g /= f * f) * (n - e)), (u = i + g * (a - i));
							var v = this.getLineLength(r, o, d, u),
								p = Math.sqrt(t * t - v * v);
							(h = Math.sqrt((p * p) / (1 + s * s))),
								n < e && (h *= -1),
								(l = { x: d + h, y: u + (c = s * h) });
						}
						return l;
					}),
					(Konva.Path.getPointOnCubicBezier = function(t, e, i, n, a, r, o, s, h) {
						function l(t) {
							return t * t * t;
						}
						function c(t) {
							return 3 * t * t * (1 - t);
						}
						function d(t) {
							return 3 * t * (1 - t) * (1 - t);
						}
						function u(t) {
							return (1 - t) * (1 - t) * (1 - t);
						}
						return {
							x: s * l(t) + r * c(t) + n * d(t) + e * u(t),
							y: h * l(t) + o * c(t) + a * d(t) + i * u(t),
						};
					}),
					(Konva.Path.getPointOnQuadraticBezier = function(t, e, i, n, a, r, o) {
						function s(t) {
							return t * t;
						}
						function h(t) {
							return 2 * t * (1 - t);
						}
						function l(t) {
							return (1 - t) * (1 - t);
						}
						return { x: r * s(t) + n * h(t) + e * l(t), y: o * s(t) + a * h(t) + i * l(t) };
					}),
					(Konva.Path.getPointOnEllipticalArc = function(t, e, i, n, a, r) {
						var o = Math.cos(r),
							s = Math.sin(r),
							h = i * Math.cos(a),
							l = n * Math.sin(a);
						return { x: t + (h * o - l * s), y: e + (h * s + l * o) };
					}),
					(Konva.Path.parsePathData = function(t) {
						if (!t) return [];
						var e = t,
							i = [
								'm',
								'M',
								'l',
								'L',
								'v',
								'V',
								'h',
								'H',
								'z',
								'Z',
								'c',
								'C',
								'q',
								'Q',
								't',
								'T',
								's',
								'S',
								'a',
								'A',
							];
						e = e.replace(new RegExp(' ', 'g'), ',');
						for (var n = 0; n < i.length; n++) e = e.replace(new RegExp(i[n], 'g'), '|' + i[n]);
						var a,
							r = e.split('|'),
							o = [],
							s = [],
							h = 0,
							l = 0,
							c = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
						for (n = 1; n < r.length; n++) {
							var d = r[n],
								u = d.charAt(0);
							for (d = d.slice(1), s.length = 0; (a = c.exec(d)); ) s.push(a[0]);
							for (var f = [], g = 0, v = s.length; g < v; g++) {
								var p = parseFloat(s[g]);
								isNaN(p) ? f.push(0) : f.push(p);
							}
							for (; f.length > 0 && !isNaN(f[0]); ) {
								var m,
									y,
									_,
									b,
									C,
									S,
									w,
									x,
									K,
									k,
									A = null,
									P = [],
									D = h,
									L = l;
								switch (u) {
									case 'l':
										(h += f.shift()), (l += f.shift()), (A = 'L'), P.push(h, l);
										break;
									case 'L':
										(h = f.shift()), (l = f.shift()), P.push(h, l);
										break;
									case 'm':
										var F = f.shift(),
											T = f.shift();
										if (
											((h += F),
											(l += T),
											(A = 'M'),
											o.length > 2 && 'z' === o[o.length - 1].command)
										)
											for (var G = o.length - 2; G >= 0; G--)
												if ('M' === o[G].command) {
													(h = o[G].points[0] + F), (l = o[G].points[1] + T);
													break;
												}
										P.push(h, l), (u = 'l');
										break;
									case 'M':
										(h = f.shift()), (l = f.shift()), (A = 'M'), P.push(h, l), (u = 'L');
										break;
									case 'h':
										(h += f.shift()), (A = 'L'), P.push(h, l);
										break;
									case 'H':
										(h = f.shift()), (A = 'L'), P.push(h, l);
										break;
									case 'v':
										(l += f.shift()), (A = 'L'), P.push(h, l);
										break;
									case 'V':
										(l = f.shift()), (A = 'L'), P.push(h, l);
										break;
									case 'C':
										P.push(f.shift(), f.shift(), f.shift(), f.shift()),
											(h = f.shift()),
											(l = f.shift()),
											P.push(h, l);
										break;
									case 'c':
										P.push(h + f.shift(), l + f.shift(), h + f.shift(), l + f.shift()),
											(h += f.shift()),
											(l += f.shift()),
											(A = 'C'),
											P.push(h, l);
										break;
									case 'S':
										(y = h),
											(_ = l),
											'C' === (m = o[o.length - 1]).command &&
												((y = h + (h - m.points[2])), (_ = l + (l - m.points[3]))),
											P.push(y, _, f.shift(), f.shift()),
											(h = f.shift()),
											(l = f.shift()),
											(A = 'C'),
											P.push(h, l);
										break;
									case 's':
										(y = h),
											(_ = l),
											'C' === (m = o[o.length - 1]).command &&
												((y = h + (h - m.points[2])), (_ = l + (l - m.points[3]))),
											P.push(y, _, h + f.shift(), l + f.shift()),
											(h += f.shift()),
											(l += f.shift()),
											(A = 'C'),
											P.push(h, l);
										break;
									case 'Q':
										P.push(f.shift(), f.shift()), (h = f.shift()), (l = f.shift()), P.push(h, l);
										break;
									case 'q':
										P.push(h + f.shift(), l + f.shift()),
											(h += f.shift()),
											(l += f.shift()),
											(A = 'Q'),
											P.push(h, l);
										break;
									case 'T':
										(y = h),
											(_ = l),
											'Q' === (m = o[o.length - 1]).command &&
												((y = h + (h - m.points[0])), (_ = l + (l - m.points[1]))),
											(h = f.shift()),
											(l = f.shift()),
											(A = 'Q'),
											P.push(y, _, h, l);
										break;
									case 't':
										(y = h),
											(_ = l),
											'Q' === (m = o[o.length - 1]).command &&
												((y = h + (h - m.points[0])), (_ = l + (l - m.points[1]))),
											(h += f.shift()),
											(l += f.shift()),
											(A = 'Q'),
											P.push(y, _, h, l);
										break;
									case 'A':
										(b = f.shift()),
											(C = f.shift()),
											(S = f.shift()),
											(w = f.shift()),
											(x = f.shift()),
											(K = h),
											(k = l),
											(h = f.shift()),
											(l = f.shift()),
											(A = 'A'),
											(P = this.convertEndpointToCenterParameterization(
												K,
												k,
												h,
												l,
												w,
												x,
												b,
												C,
												S,
											));
										break;
									case 'a':
										(b = f.shift()),
											(C = f.shift()),
											(S = f.shift()),
											(w = f.shift()),
											(x = f.shift()),
											(K = h),
											(k = l),
											(h += f.shift()),
											(l += f.shift()),
											(A = 'A'),
											(P = this.convertEndpointToCenterParameterization(
												K,
												k,
												h,
												l,
												w,
												x,
												b,
												C,
												S,
											));
								}
								o.push({
									command: A || u,
									points: P,
									start: { x: D, y: L },
									pathLength: this.calcLength(D, L, A || u, P),
								});
							}
							('z' !== u && 'Z' !== u) ||
								o.push({ command: 'z', points: [], start: void 0, pathLength: 0 });
						}
						return o;
					}),
					(Konva.Path.calcLength = function(t, e, i, n) {
						var a,
							r,
							o,
							s,
							h = Konva.Path;
						switch (i) {
							case 'L':
								return h.getLineLength(t, e, n[0], n[1]);
							case 'C':
								for (
									a = 0,
										r = h.getPointOnCubicBezier(0, t, e, n[0], n[1], n[2], n[3], n[4], n[5]),
										s = 0.01;
									s <= 1;
									s += 0.01
								)
									(o = h.getPointOnCubicBezier(s, t, e, n[0], n[1], n[2], n[3], n[4], n[5])),
										(a += h.getLineLength(r.x, r.y, o.x, o.y)),
										(r = o);
								return a;
							case 'Q':
								for (
									a = 0, r = h.getPointOnQuadraticBezier(0, t, e, n[0], n[1], n[2], n[3]), s = 0.01;
									s <= 1;
									s += 0.01
								)
									(o = h.getPointOnQuadraticBezier(s, t, e, n[0], n[1], n[2], n[3])),
										(a += h.getLineLength(r.x, r.y, o.x, o.y)),
										(r = o);
								return a;
							case 'A':
								a = 0;
								var l = n[4],
									c = n[5],
									d = n[4] + c,
									u = Math.PI / 180;
								if (
									(Math.abs(l - d) < u && (u = Math.abs(l - d)),
									(r = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], l, 0)),
									c < 0)
								)
									for (s = l - u; s > d; s -= u)
										(o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0)),
											(a += h.getLineLength(r.x, r.y, o.x, o.y)),
											(r = o);
								else
									for (s = l + u; s < d; s += u)
										(o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0)),
											(a += h.getLineLength(r.x, r.y, o.x, o.y)),
											(r = o);
								return (
									(o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], d, 0)),
									a + h.getLineLength(r.x, r.y, o.x, o.y)
								);
						}
						return 0;
					}),
					(Konva.Path.convertEndpointToCenterParameterization = function(t, e, i, n, a, r, o, s, h) {
						var l = h * (Math.PI / 180),
							c = (Math.cos(l) * (t - i)) / 2 + (Math.sin(l) * (e - n)) / 2,
							d = (-1 * Math.sin(l) * (t - i)) / 2 + (Math.cos(l) * (e - n)) / 2,
							u = (c * c) / (o * o) + (d * d) / (s * s);
						u > 1 && ((o *= Math.sqrt(u)), (s *= Math.sqrt(u)));
						var f = Math.sqrt(
							(o * o * (s * s) - o * o * (d * d) - s * s * (c * c)) / (o * o * (d * d) + s * s * (c * c)),
						);
						a === r && (f *= -1), isNaN(f) && (f = 0);
						var g = (f * o * d) / s,
							v = (f * -s * c) / o,
							p = (t + i) / 2 + Math.cos(l) * g - Math.sin(l) * v,
							m = (e + n) / 2 + Math.sin(l) * g + Math.cos(l) * v,
							y = function(t) {
								return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
							},
							_ = function(t, e) {
								return (t[0] * e[0] + t[1] * e[1]) / (y(t) * y(e));
							},
							b = function(t, e) {
								return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(_(t, e));
							},
							C = b([1, 0], [(c - g) / o, (d - v) / s]),
							S = [(c - g) / o, (d - v) / s],
							w = [(-1 * c - g) / o, (-1 * d - v) / s],
							x = b(S, w);
						return (
							_(S, w) <= -1 && (x = Math.PI),
							_(S, w) >= 1 && (x = 0),
							0 === r && x > 0 && (x -= 2 * Math.PI),
							1 === r && x < 0 && (x += 2 * Math.PI),
							[p, m, o, s, C, x, l, r]
						);
					}),
					Konva.Factory.addGetterSetter(Konva.Path, 'data'),
					Konva.Collection.mapMethods(Konva.Path);
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Rect = function(t) {
					this.___init(t);
				}),
					(Konva.Rect.prototype = {
						___init: function(t) {
							Konva.Shape.call(this, t), (this.className = 'Rect'), this.sceneFunc(this._sceneFunc);
						},
						_sceneFunc: function(t) {
							var e = this.getCornerRadius(),
								i = this.getWidth(),
								n = this.getHeight();
							t.beginPath(),
								e
									? ((e = Math.min(e, i / 2, n / 2)),
									  t.moveTo(e, 0),
									  t.lineTo(i - e, 0),
									  t.arc(i - e, e, e, (3 * Math.PI) / 2, 0, !1),
									  t.lineTo(i, n - e),
									  t.arc(i - e, n - e, e, 0, Math.PI / 2, !1),
									  t.lineTo(e, n),
									  t.arc(e, n - e, e, Math.PI / 2, Math.PI, !1),
									  t.lineTo(0, e),
									  t.arc(e, e, e, Math.PI, (3 * Math.PI) / 2, !1))
									: t.rect(0, 0, i, n),
								t.closePath(),
								t.fillStrokeShape(this);
						},
					}),
					Konva.Util.extend(Konva.Rect, Konva.Shape),
					Konva.Factory.addGetterSetter(Konva.Rect, 'cornerRadius', 0, Konva.Validators.getNumberValidator()),
					Konva.Collection.mapMethods(Konva.Rect);
			})();
		},
		function(t, e) {
			!(function(t) {
				'use strict';
				var e = 2 * Math.PI - 1e-4;
				(t.Circle = function(t) {
					this.___init(t);
				}),
					(t.Circle.prototype = {
						_centroid: !0,
						___init: function(e) {
							t.Shape.call(this, e), (this.className = 'Circle'), this.sceneFunc(this._sceneFunc);
						},
						_sceneFunc: function(t) {
							t.beginPath(),
								t.arc(0, 0, this.getRadius(), 0, e, !1),
								t.closePath(),
								t.fillStrokeShape(this);
						},
						getWidth: function() {
							return 2 * this.getRadius();
						},
						getHeight: function() {
							return 2 * this.getRadius();
						},
						setWidth: function(e) {
							t.Node.prototype.setWidth.call(this, e), this.radius() !== e / 2 && this.setRadius(e / 2);
						},
						setHeight: function(e) {
							t.Node.prototype.setHeight.call(this, e), this.radius() !== e / 2 && this.setRadius(e / 2);
						},
					}),
					t.Util.extend(t.Circle, t.Shape),
					t.Factory.addGetterSetter(t.Circle, 'radius', 0, t.Validators.getNumberValidator()),
					t.Factory.addOverloadedGetterSetter(t.Circle, 'radius'),
					t.Collection.mapMethods(t.Circle);
			})(Konva);
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Image = function(t) {
					this.___init(t);
				}),
					(Konva.Image.prototype = {
						___init: function(t) {
							Konva.Shape.call(this, t),
								(this.className = 'Image'),
								this.sceneFunc(this._sceneFunc),
								this.hitFunc(this._hitFunc);
						},
						_useBufferCanvas: function() {
							return (
								(this.hasShadow() || 1 !== this.getAbsoluteOpacity()) &&
								this.hasStroke() &&
								this.getStage()
							);
						},
						_sceneFunc: function(t) {
							var e,
								i,
								n,
								a = this.getWidth(),
								r = this.getHeight(),
								o = this.getImage();
							o &&
								((e = this.getCropWidth()),
								(i = this.getCropHeight()),
								(n =
									e && i
										? [o, this.getCropX(), this.getCropY(), e, i, 0, 0, a, r]
										: [o, 0, 0, a, r])),
								(this.hasFill() || this.hasStroke()) &&
									(t.beginPath(), t.rect(0, 0, a, r), t.closePath(), t.fillStrokeShape(this)),
								o && t.drawImage.apply(t, n);
						},
						_hitFunc: function(t) {
							var e = this.getWidth(),
								i = this.getHeight();
							t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this);
						},
						getWidth: function() {
							var t = this.getImage();
							return this.attrs.width || (t ? t.width : 0);
						},
						getHeight: function() {
							var t = this.getImage();
							return this.attrs.height || (t ? t.height : 0);
						},
					}),
					Konva.Util.extend(Konva.Image, Konva.Shape),
					Konva.Factory.addGetterSetter(Konva.Image, 'image'),
					Konva.Factory.addComponentsGetterSetter(Konva.Image, 'crop', ['x', 'y', 'width', 'height']),
					Konva.Factory.addGetterSetter(Konva.Image, 'cropX', 0, Konva.Validators.getNumberValidator()),
					Konva.Factory.addGetterSetter(Konva.Image, 'cropY', 0, Konva.Validators.getNumberValidator()),
					Konva.Factory.addGetterSetter(Konva.Image, 'cropWidth', 0, Konva.Validators.getNumberValidator()),
					Konva.Factory.addGetterSetter(Konva.Image, 'cropHeight', 0, Konva.Validators.getNumberValidator()),
					Konva.Collection.mapMethods(Konva.Image),
					(Konva.Image.fromURL = function(t, e) {
						var i = new Image();
						(i.onload = function() {
							var t = new Konva.Image({ image: i });
							e(t);
						}),
							(i.crossOrigin = 'Anonymous'),
							(i.src = t);
					});
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Group = function(t) {
					this.___init(t);
				}),
					Konva.Util.addMethods(Konva.Group, {
						___init: function(t) {
							(this.nodeType = 'Group'), Konva.Container.call(this, t);
						},
						_validateAdd: function(t) {
							var e = t.getType();
							'Group' !== e &&
								'Shape' !== e &&
								Konva.Util.throw('You may only add groups and shapes to groups.');
						},
					}),
					Konva.Util.extend(Konva.Group, Konva.Container),
					Konva.Collection.mapMethods(Konva.Group);
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.FastLayer = function(t) {
					this.____init(t);
				}),
					Konva.Util.addMethods(Konva.FastLayer, {
						____init: function(t) {
							(this.nodeType = 'Layer'),
								(this.canvas = new Konva.SceneCanvas()),
								Konva.BaseLayer.call(this, t);
						},
						_validateAdd: function(t) {
							'Shape' !== t.getType() && Konva.Util.throw('You may only add shapes to a fast layer.');
						},
						_setCanvasSize: function(t, e) {
							this.canvas.setSize(t, e);
						},
						hitGraphEnabled: function() {
							return !1;
						},
						getIntersection: function() {
							return null;
						},
						drawScene: function(t) {
							var e = this.getLayer(),
								i = t || (e && e.getCanvas());
							return (
								this.getClearBeforeDraw() && i.getContext().clear(),
								Konva.Container.prototype.drawScene.call(this, i),
								this
							);
						},
						draw: function() {
							return this.drawScene(), this;
						},
						setVisible: function(t) {
							return (
								Konva.Node.prototype.setVisible.call(this, t),
								(this.getCanvas()._canvas.style.display = t ? 'block' : 'none'),
								this
							);
						},
					}),
					Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer),
					Konva.Collection.mapMethods(Konva.FastLayer);
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				var t = [
						{ x: 0, y: 0 },
						{ x: -1, y: -1 },
						{ x: 1, y: -1 },
						{ x: 1, y: 1 },
						{ x: -1, y: 1 },
					],
					e = t.length;
				(Konva.Layer = function(t) {
					this.____init(t);
				}),
					Konva.Util.addMethods(Konva.Layer, {
						____init: function(t) {
							(this.nodeType = 'Layer'),
								(this.canvas = new Konva.SceneCanvas()),
								(this.hitCanvas = new Konva.HitCanvas({ pixelRatio: 1 })),
								Konva.BaseLayer.call(this, t);
						},
						_setCanvasSize: function(t, e) {
							this.canvas.setSize(t, e), this.hitCanvas.setSize(t, e);
						},
						_validateAdd: function(t) {
							var e = t.getType();
							'Group' !== e &&
								'Shape' !== e &&
								Konva.Util.throw('You may only add groups and shapes to a layer.');
						},
						getIntersection: function(i, n) {
							var a, r, o, s;
							if (!this.hitGraphEnabled() || !this.isVisible()) return null;
							for (var h = 1, l = !1; ; ) {
								for (r = 0; r < e; r++) {
									if (
										((o = t[r]),
										(s = (a = this._getIntersection({ x: i.x + o.x * h, y: i.y + o.y * h }))
											.shape) && n)
									)
										return s.findAncestor(n, !0);
									if (s) return s;
									if (((l = !!a.antialiased), !a.antialiased)) break;
								}
								if (!l) return null;
								h += 1;
							}
						},
						_getImageData: function(t, e) {
							var i = this.hitCanvas.width || 1,
								n = this.hitCanvas.height || 1,
								a = Math.round(e) * i + Math.round(t);
							return (
								this._hitImageData ||
									(this._hitImageData = this.hitCanvas.context.getImageData(0, 0, i, n)),
								[
									this._hitImageData.data[4 * a + 0],
									this._hitImageData.data[4 * a + 1],
									this._hitImageData.data[4 * a + 2],
									this._hitImageData.data[4 * a + 3],
								]
							);
						},
						_getIntersection: function(t) {
							var e,
								i,
								n = this.hitCanvas.pixelRatio,
								a = this.hitCanvas.context.getImageData(Math.round(t.x * n), Math.round(t.y * n), 1, 1)
									.data,
								r = a[3];
							return 255 === r
								? ((e = Konva.Util._rgbToHex(a[0], a[1], a[2])),
								  (i = Konva.shapes['#' + e]) ? { shape: i } : { antialiased: !0 })
								: r > 0
								? { antialiased: !0 }
								: {};
						},
						drawScene: function(t, e) {
							var i = this.getLayer(),
								n = t || (i && i.getCanvas());
							return (
								this._fire('beforeDraw', { node: this }),
								this.getClearBeforeDraw() && n.getContext().clear(),
								Konva.Container.prototype.drawScene.call(this, n, e),
								this._fire('draw', { node: this }),
								this
							);
						},
						drawHit: function(t, e) {
							var i = this.getLayer(),
								n = t || (i && i.hitCanvas);
							return (
								i &&
									i.getClearBeforeDraw() &&
									i
										.getHitCanvas()
										.getContext()
										.clear(),
								Konva.Container.prototype.drawHit.call(this, n, e),
								(this.imageData = null),
								this
							);
						},
						clear: function(t) {
							return (
								Konva.BaseLayer.prototype.clear.call(this, t),
								this.getHitCanvas()
									.getContext()
									.clear(t),
								(this.imageData = null),
								this
							);
						},
						setVisible: function(t) {
							return (
								Konva.Node.prototype.setVisible.call(this, t),
								t
									? ((this.getCanvas()._canvas.style.display = 'block'),
									  (this.hitCanvas._canvas.style.display = 'block'))
									: ((this.getCanvas()._canvas.style.display = 'none'),
									  (this.hitCanvas._canvas.style.display = 'none')),
								this
							);
						},
						enableHitGraph: function() {
							return this.setHitGraphEnabled(!0), this;
						},
						disableHitGraph: function() {
							return this.setHitGraphEnabled(!1), this;
						},
						setSize: function(t, e) {
							return (
								Konva.BaseLayer.prototype.setSize.call(this, t, e), this.hitCanvas.setSize(t, e), this
							);
						},
					}),
					Konva.Util.extend(Konva.Layer, Konva.BaseLayer),
					Konva.Factory.addGetterSetter(Konva.Layer, 'hitGraphEnabled', !0),
					Konva.Collection.mapMethods(Konva.Layer);
			})();
		},
		function(t, e) {
			!(function(t) {
				'use strict';
				(t.BaseLayer = function(t) {
					this.___init(t);
				}),
					t.Util.addMethods(t.BaseLayer, {
						___init: function(e) {
							(this.nodeType = 'Layer'), t.Container.call(this, e);
						},
						createPNGStream: function() {
							return this.canvas._canvas.createPNGStream();
						},
						getCanvas: function() {
							return this.canvas;
						},
						getHitCanvas: function() {
							return this.hitCanvas;
						},
						getContext: function() {
							return this.getCanvas().getContext();
						},
						clear: function(t) {
							return this.getContext().clear(t), this;
						},
						clearHitCache: function() {
							this._hitImageData = void 0;
						},
						setZIndex: function(e) {
							t.Node.prototype.setZIndex.call(this, e);
							var i = this.getStage();
							return (
								i &&
									(i.content.removeChild(this.getCanvas()._canvas),
									e < i.getChildren().length - 1
										? i.content.insertBefore(
												this.getCanvas()._canvas,
												i.getChildren()[e + 1].getCanvas()._canvas,
										  )
										: i.content.appendChild(this.getCanvas()._canvas)),
								this
							);
						},
						moveToTop: function() {
							t.Node.prototype.moveToTop.call(this);
							var e = this.getStage();
							return (
								e &&
									(e.content.removeChild(this.getCanvas()._canvas),
									e.content.appendChild(this.getCanvas()._canvas)),
								this
							);
						},
						moveUp: function() {
							if (!t.Node.prototype.moveUp.call(this)) return this;
							var e = this.getStage();
							return e
								? (e.content.removeChild(this.getCanvas()._canvas),
								  this.index < e.getChildren().length - 1
										? e.content.insertBefore(
												this.getCanvas()._canvas,
												e.getChildren()[this.index + 1].getCanvas()._canvas,
										  )
										: e.content.appendChild(this.getCanvas()._canvas),
								  this)
								: this;
						},
						moveDown: function() {
							if (t.Node.prototype.moveDown.call(this)) {
								var e = this.getStage();
								if (e) {
									var i = e.getChildren();
									e.content.removeChild(this.getCanvas()._canvas),
										e.content.insertBefore(
											this.getCanvas()._canvas,
											i[this.index + 1].getCanvas()._canvas,
										);
								}
							}
							return this;
						},
						moveToBottom: function() {
							if (t.Node.prototype.moveToBottom.call(this)) {
								var e = this.getStage();
								if (e) {
									var i = e.getChildren();
									e.content.removeChild(this.getCanvas()._canvas),
										e.content.insertBefore(this.getCanvas()._canvas, i[1].getCanvas()._canvas);
								}
							}
							return this;
						},
						getLayer: function() {
							return this;
						},
						remove: function() {
							var e = this.getCanvas()._canvas;
							return (
								t.Node.prototype.remove.call(this),
								e && e.parentNode && t.Util._isInDocument(e) && e.parentNode.removeChild(e),
								this
							);
						},
						getStage: function() {
							return this.parent;
						},
						setSize: function(t, e) {
							return this.canvas.setSize(t, e), this;
						},
						_toKonvaCanvas: function(e) {
							return (
								((e = e || {}).width = e.width || this.getWidth()),
								(e.height = e.height || this.getHeight()),
								(e.x = void 0 !== e.x ? e.x : this.getX()),
								(e.y = void 0 !== e.y ? e.y : this.getY()),
								t.Node.prototype._toKonvaCanvas.call(this, e)
							);
						},
						getWidth: function() {
							if (this.parent) return this.parent.getWidth();
						},
						setWidth: function() {
							t.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
						},
						getHeight: function() {
							if (this.parent) return this.parent.getHeight();
						},
						setHeight: function() {
							t.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
						},
						_applyTransform: function(t, e, i) {
							var n = t.getAbsoluteTransform(i).getMatrix();
							e.transform(n[0], n[1], n[2], n[3], n[4], n[5]);
						},
					}),
					t.Util.extend(t.BaseLayer, t.Container),
					t.Factory.addGetterSetter(t.BaseLayer, 'clearBeforeDraw', !0),
					t.Collection.mapMethods(t.BaseLayer);
			})(Konva);
		},
		function(t, e) {
			!(function() {
				'use strict';
				var t = '_',
					e = [
						'mousedown',
						'mousemove',
						'mouseup',
						'mouseout',
						'touchstart',
						'touchmove',
						'touchend',
						'mouseover',
						'wheel',
						'contextmenu',
					],
					i = e.length;
				function n(e, i) {
					e.content.addEventListener(
						i,
						function(n) {
							e[t + i](n);
						},
						!1,
					);
				}
				(Konva.Stage = function(t) {
					this.___init(t);
				}),
					Konva.Util.addMethods(Konva.Stage, {
						___init: function(t) {
							(this.nodeType = 'Stage'),
								Konva.Container.call(this, t),
								(this._id = Konva.idCounter++),
								this._buildDOM(),
								this._bindContentEvents(),
								(this._enableNestedTransforms = !1),
								Konva.stages.push(this);
						},
						_validateAdd: function(t) {
							'Layer' !== t.getType() && Konva.Util.throw('You may only add layers to the stage.');
						},
						setContainer: function(t) {
							if ('string' == typeof t) {
								if ('.' === t.charAt(0)) {
									var e = t.slice(1);
									t = Konva.document.getElementsByClassName(e)[0];
								} else {
									var i;
									(i = '#' !== t.charAt(0) ? t : t.slice(1)), (t = Konva.document.getElementById(i));
								}
								if (!t) throw 'Can not find container in document with id ' + i;
							}
							return this._setAttr('container', t), this;
						},
						shouldDrawHit: function() {
							return !0;
						},
						draw: function() {
							return Konva.Node.prototype.draw.call(this), this;
						},
						setHeight: function(t) {
							return Konva.Node.prototype.setHeight.call(this, t), this._resizeDOM(), this;
						},
						setWidth: function(t) {
							return Konva.Node.prototype.setWidth.call(this, t), this._resizeDOM(), this;
						},
						clear: function() {
							var t,
								e = this.children,
								i = e.length;
							for (t = 0; t < i; t++) e[t].clear();
							return this;
						},
						clone: function(t) {
							return (
								t || (t = {}),
								(t.container = Konva.document.createElement('div')),
								Konva.Container.prototype.clone.call(this, t)
							);
						},
						destroy: function() {
							var t = this.content;
							Konva.Container.prototype.destroy.call(this),
								t && Konva.Util._isInDocument(t) && this.getContainer().removeChild(t);
							var e = Konva.stages.indexOf(this);
							return e > -1 && Konva.stages.splice(e, 1), this;
						},
						getPointerPosition: function() {
							return this.pointerPos;
						},
						getStage: function() {
							return this;
						},
						getContent: function() {
							return this.content;
						},
						_toKonvaCanvas: function(t) {
							var e = (t = t || {}).x || 0,
								i = t.y || 0,
								n = new Konva.SceneCanvas({
									width: t.width || this.getWidth(),
									height: t.height || this.getHeight(),
									pixelRatio: t.pixelRatio || 1,
								}),
								a = n.getContext()._context,
								r = this.children;
							return (
								(e || i) && a.translate(-1 * e, -1 * i),
								r.each(function(n) {
									if (n.isVisible()) {
										var r = n._toKonvaCanvas(t);
										a.drawImage(
											r._canvas,
											e,
											i,
											r.getWidth() / r.getPixelRatio(),
											r.getHeight() / r.getPixelRatio(),
										);
									}
								}),
								n
							);
						},
						toImage: function(t) {
							var e = t.callback;
							(t.callback = function(t) {
								Konva.Util._getImage(t, function(t) {
									e(t);
								});
							}),
								this.toDataURL(t);
						},
						getIntersection: function(t, e) {
							var i,
								n,
								a = this.getChildren();
							for (i = a.length - 1; i >= 0; i--) if ((n = a[i].getIntersection(t, e))) return n;
							return null;
						},
						_resizeDOM: function() {
							if (this.content) {
								var t,
									e,
									i = this.getWidth(),
									n = this.getHeight(),
									a = this.getChildren(),
									r = a.length;
								for (
									this.content.style.width = i + 'px',
										this.content.style.height = n + 'px',
										this.bufferCanvas.setSize(i, n),
										this.bufferHitCanvas.setSize(i, n),
										t = 0;
									t < r;
									t++
								)
									(e = a[t]).setSize(i, n), e.draw();
							}
						},
						add: function(t) {
							if (arguments.length > 1) {
								for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
								return this;
							}
							return (
								Konva.Container.prototype.add.call(this, t),
								t._setCanvasSize(this.width(), this.height()),
								t.draw(),
								Konva.isBrowser && this.content.appendChild(t.canvas._canvas),
								this
							);
						},
						getParent: function() {
							return null;
						},
						getLayer: function() {
							return null;
						},
						getLayers: function() {
							return this.getChildren();
						},
						_bindContentEvents: function() {
							if (Konva.isBrowser) for (var t = 0; t < i; t++) n(this, e[t]);
						},
						_mouseover: function(t) {
							Konva.UA.mobile ||
								(this._setPointerPosition(t), this._fire('contentMouseover', { evt: t }));
						},
						_mouseout: function(t) {
							if (!Konva.UA.mobile) {
								this._setPointerPosition(t);
								var e = this.targetShape;
								e &&
									!Konva.isDragging() &&
									(e._fireAndBubble('mouseout', { evt: t }),
									e._fireAndBubble('mouseleave', { evt: t }),
									(this.targetShape = null)),
									(this.pointerPos = void 0),
									this._fire('contentMouseout', { evt: t });
							}
						},
						_mousemove: function(t) {
							return Konva.UA.ieMobile
								? this._touchmove(t)
								: (void 0 === t.movementX && void 0 === t.movementY) ||
								  0 !== t.movementY ||
								  0 !== t.movementX
								? Konva.UA.mobile
									? null
									: (this._setPointerPosition(t),
									  Konva.isDragging() ||
											((e = this.getIntersection(this.getPointerPosition())) && e.isListening()
												? Konva.isDragging() ||
												  (this.targetShape && this.targetShape._id === e._id)
													? e._fireAndBubble('mousemove', { evt: t })
													: (this.targetShape &&
															(this.targetShape._fireAndBubble('mouseout', { evt: t }, e),
															this.targetShape._fireAndBubble(
																'mouseleave',
																{ evt: t },
																e,
															)),
													  e._fireAndBubble('mouseover', { evt: t }, this.targetShape),
													  e._fireAndBubble('mouseenter', { evt: t }, this.targetShape),
													  (this.targetShape = e))
												: (this.targetShape &&
														!Konva.isDragging() &&
														(this.targetShape._fireAndBubble('mouseout', { evt: t }),
														this.targetShape._fireAndBubble('mouseleave', { evt: t }),
														(this.targetShape = null)),
												  this._fire('mousemove', {
														evt: t,
														target: this,
														currentTarget: this,
												  })),
											this._fire('contentMousemove', { evt: t })),
									  void (t.cancelable && t.preventDefault()))
								: null;
							var e;
						},
						_mousedown: function(t) {
							if (Konva.UA.ieMobile) return this._touchstart(t);
							if (!Konva.UA.mobile) {
								this._setPointerPosition(t);
								var e = this.getIntersection(this.getPointerPosition());
								(Konva.listenClickTap = !0),
									e && e.isListening()
										? ((this.clickStartShape = e), e._fireAndBubble('mousedown', { evt: t }))
										: this._fire('mousedown', { evt: t, target: this, currentTarget: this }),
									this._fire('contentMousedown', { evt: t });
							}
						},
						_mouseup: function(t) {
							if (Konva.UA.ieMobile) return this._touchend(t);
							if (!Konva.UA.mobile) {
								this._setPointerPosition(t);
								var e = this.getIntersection(this.getPointerPosition()),
									i = this.clickStartShape,
									n = this.clickEndShape,
									a = !1,
									r = Konva.DD;
								Konva.inDblClickWindow
									? ((a = !0), clearTimeout(this.dblTimeout))
									: r && r.justDragged
									? r && (r.justDragged = !1)
									: ((Konva.inDblClickWindow = !0), clearTimeout(this.dblTimeout)),
									(this.dblTimeout = setTimeout(function() {
										Konva.inDblClickWindow = !1;
									}, Konva.dblClickWindow)),
									e && e.isListening()
										? ((this.clickEndShape = e),
										  e._fireAndBubble('mouseup', { evt: t }),
										  Konva.listenClickTap &&
												i &&
												i._id === e._id &&
												(e._fireAndBubble('click', { evt: t }),
												a && n && n._id === e._id && e._fireAndBubble('dblclick', { evt: t })))
										: (this._fire('mouseup', { evt: t, target: this, currentTarget: this }),
										  Konva.listenClickTap &&
												this._fire('click', { evt: t, target: this, currentTarget: this }),
										  a && this._fire('dblclick', { evt: t, target: this, currentTarget: this })),
									this._fire('contentMouseup', { evt: t }),
									Konva.listenClickTap &&
										(this._fire('contentClick', { evt: t }),
										a && this._fire('contentDblclick', { evt: t })),
									(Konva.listenClickTap = !1);
							}
							t.cancelable && t.preventDefault();
						},
						_contextmenu: function(t) {
							this._setPointerPosition(t);
							var e = this.getIntersection(this.getPointerPosition());
							e && e.isListening()
								? e._fireAndBubble('contextmenu', { evt: t })
								: this._fire('contextmenu', { evt: t, target: this, currentTarget: this }),
								this._fire('contentContextmenu', { evt: t });
						},
						_touchstart: function(t) {
							this._setPointerPosition(t);
							var e = this.getIntersection(this.getPointerPosition());
							(Konva.listenClickTap = !0),
								e && e.isListening()
									? ((this.tapStartShape = e),
									  e._fireAndBubble('touchstart', { evt: t }),
									  e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault())
									: this._fire('touchstart', { evt: t, target: this, currentTarget: this }),
								this._fire('contentTouchstart', { evt: t });
						},
						_touchend: function(t) {
							this._setPointerPosition(t);
							var e = this.getIntersection(this.getPointerPosition()),
								i = !1;
							Konva.inDblClickWindow
								? ((i = !0), clearTimeout(this.dblTimeout))
								: ((Konva.inDblClickWindow = !0), clearTimeout(this.dblTimeout)),
								(this.dblTimeout = setTimeout(function() {
									Konva.inDblClickWindow = !1;
								}, Konva.dblClickWindow)),
								e && e.isListening()
									? (e._fireAndBubble('touchend', { evt: t }),
									  Konva.listenClickTap &&
											this.tapStartShape &&
											e._id === this.tapStartShape._id &&
											(e._fireAndBubble('tap', { evt: t }),
											i && e._fireAndBubble('dbltap', { evt: t })),
									  e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault())
									: (this._fire('touchend', { evt: t, target: this, currentTarget: this }),
									  Konva.listenClickTap &&
											this._fire('tap', { evt: t, target: this, currentTarget: this }),
									  i && this._fire('dbltap', { evt: t, target: this, currentTarget: this })),
								this._fire('contentTouchend', { evt: t }),
								Konva.listenClickTap &&
									(this._fire('contentTap', { evt: t }),
									i && this._fire('contentDbltap', { evt: t })),
								(Konva.listenClickTap = !1);
						},
						_touchmove: function(t) {
							this._setPointerPosition(t);
							var e,
								i = Konva.DD;
							Konva.isDragging() ||
								((e = this.getIntersection(this.getPointerPosition())) && e.isListening()
									? (e._fireAndBubble('touchmove', { evt: t }),
									  e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault())
									: this._fire('touchmove', { evt: t, target: this, currentTarget: this }),
								this._fire('contentTouchmove', { evt: t })),
								i &&
									Konva.isDragging() &&
									Konva.DD.node.preventDefault() &&
									t.cancelable &&
									t.preventDefault();
						},
						_wheel: function(t) {
							this._setPointerPosition(t);
							var e = this.getIntersection(this.getPointerPosition());
							e && e.isListening()
								? e._fireAndBubble('wheel', { evt: t })
								: this._fire('wheel', { evt: t, target: this, currentTarget: this }),
								this._fire('contentWheel', { evt: t });
						},
						_setPointerPosition: function(t) {
							var e = this._getContentPosition(),
								i = null,
								n = null;
							if (void 0 !== (t = t || window.event).touches) {
								if (t.touches.length > 0) {
									var a = t.touches[0];
									(i = a.clientX - e.left), (n = a.clientY - e.top);
								}
							} else (i = t.clientX - e.left), (n = t.clientY - e.top);
							null !== i && null !== n && (this.pointerPos = { x: i, y: n });
						},
						_getContentPosition: function() {
							var t = this.content.getBoundingClientRect
								? this.content.getBoundingClientRect()
								: { top: 0, left: 0 };
							return { top: t.top, left: t.left };
						},
						_buildDOM: function() {
							if (
								((this.bufferCanvas = new Konva.SceneCanvas()),
								(this.bufferHitCanvas = new Konva.HitCanvas({ pixelRatio: 1 })),
								Konva.isBrowser)
							) {
								var t = this.getContainer();
								if (!t) throw 'Stage has no container. A container is required.';
								(t.innerHTML = ''),
									(this.content = Konva.document.createElement('div')),
									(this.content.style.position = 'relative'),
									(this.content.style.userSelect = 'none'),
									(this.content.className = 'konvajs-content'),
									this.content.setAttribute('role', 'presentation'),
									t.appendChild(this.content),
									this._resizeDOM();
							}
						},
						_onContent: function(t, e) {
							var i,
								n,
								a = t.split(' '),
								r = a.length;
							for (i = 0; i < r; i++) (n = a[i]), this.content.addEventListener(n, e, !1);
						},
						cache: function() {
							Konva.Util.warn(
								'Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.',
							);
						},
						clearCache: function() {},
					}),
					Konva.Util.extend(Konva.Stage, Konva.Container),
					Konva.Factory.addGetter(Konva.Stage, 'container'),
					Konva.Factory.addOverloadedGetterSetter(Konva.Stage, 'container');
			})();
		},
		function(t, e) {
			!(function(t) {
				'use strict';
				var e = 'hasShadow',
					i = 'shadowRGBA';
				function n(t) {
					t.fill();
				}
				function a(t) {
					t.stroke();
				}
				function r(t) {
					t.fill();
				}
				function o(t) {
					t.stroke();
				}
				function s() {
					this._clearCache(e);
				}
				function h() {
					this._clearCache(i);
				}
				(t.Shape = function(t) {
					this.__init(t);
				}),
					t.Util.addMethods(t.Shape, {
						__init: function(e) {
							(this.nodeType = 'Shape'),
								(this._fillFunc = n),
								(this._strokeFunc = a),
								(this._fillFuncHit = r),
								(this._strokeFuncHit = o);
							for (var i, l = t.shapes; !(i = t.Util.getRandomColor()) || i in l; );
							(this.colorKey = i),
								(l[i] = this),
								t.Node.call(this, e),
								this.on(
									'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
									s,
								),
								this.on(
									'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
									h,
								);
						},
						hasChildren: function() {
							return !1;
						},
						getChildren: function() {
							return [];
						},
						getContext: function() {
							return this.getLayer().getContext();
						},
						getCanvas: function() {
							return this.getLayer().getCanvas();
						},
						hasShadow: function() {
							return this._getCache(e, this._hasShadow);
						},
						_hasShadow: function() {
							return (
								this.getShadowEnabled() &&
								0 !== this.getShadowOpacity() &&
								!!(
									this.getShadowColor() ||
									this.getShadowBlur() ||
									this.getShadowOffsetX() ||
									this.getShadowOffsetY()
								)
							);
						},
						getShadowRGBA: function() {
							return this._getCache(i, this._getShadowRGBA);
						},
						_getShadowRGBA: function() {
							if (this.hasShadow()) {
								var e = t.Util.colorToRGBA(this.shadowColor());
								return (
									'rgba(' +
									e.r +
									',' +
									e.g +
									',' +
									e.b +
									',' +
									e.a * (this.getShadowOpacity() || 1) +
									')'
								);
							}
						},
						hasFill: function() {
							return !!(
								this.getFill() ||
								this.getFillPatternImage() ||
								this.getFillLinearGradientColorStops() ||
								this.getFillRadialGradientColorStops()
							);
						},
						hasStroke: function() {
							return (
								this.strokeEnabled() && !(!this.stroke() && !this.getStrokeLinearGradientColorStops())
							);
						},
						intersects: function(t) {
							var e = this.getStage().bufferHitCanvas;
							return (
								e.getContext().clear(),
								this.drawHit(e),
								e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3] > 0
							);
						},
						destroy: function() {
							return t.Node.prototype.destroy.call(this), delete t.shapes[this.colorKey], this;
						},
						_useBufferCanvas: function(t) {
							return (
								(!t &&
									this.perfectDrawEnabled() &&
									1 !== this.getAbsoluteOpacity() &&
									this.hasFill() &&
									this.hasStroke() &&
									this.getStage()) ||
								(this.perfectDrawEnabled() &&
									this.hasShadow() &&
									1 !== this.getAbsoluteOpacity() &&
									this.hasFill() &&
									this.hasStroke() &&
									this.getStage())
							);
						},
						getSelfRect: function() {
							var t = this.getSize();
							return {
								x: this._centroid ? Math.round(-t.width / 2) : 0,
								y: this._centroid ? Math.round(-t.height / 2) : 0,
								width: t.width,
								height: t.height,
							};
						},
						getClientRect: function(t) {
							var e = (t = t || {}).skipTransform,
								i = t.relativeTo,
								n = this.getSelfRect(),
								a = (this.hasStroke() && this.strokeWidth()) || 0,
								r = n.width + a,
								o = n.height + a,
								s = !t.skipShadow && this.hasShadow(),
								h = s ? this.shadowOffsetX() : 0,
								l = s ? this.shadowOffsetY() : 0,
								c = r + Math.abs(h),
								d = o + Math.abs(l),
								u = (s && this.shadowBlur()) || 0,
								f = c + 2 * u,
								g = d + 2 * u,
								v = 0;
							Math.round(a / 2) !== a / 2 && (v = 1);
							var p = {
								width: f + v,
								height: g + v,
								x: -Math.round(a / 2 + u) + Math.min(h, 0) + n.x,
								y: -Math.round(a / 2 + u) + Math.min(l, 0) + n.y,
							};
							return e ? p : this._transformedRect(p, i);
						},
						drawScene: function(t, e, i, n) {
							var a,
								r,
								o = this.getLayer(),
								s = t || o.getCanvas(),
								h = s.getContext(),
								l = this._cache.canvas,
								c = this.sceneFunc(),
								d = this.hasShadow(),
								u = this.hasStroke();
							if (!this.isVisible() && !i) return this;
							if (l)
								return (
									h.save(),
									o._applyTransform(this, h, e),
									this._drawCachedSceneCanvas(h),
									h.restore(),
									this
								);
							if (!c) return this;
							if ((h.save(), this._useBufferCanvas(i) && !n)) {
								if (
									((r = (a = this.getStage().bufferCanvas).getContext()).clear(),
									r.save(),
									r._applyLineJoin(this),
									!i)
								)
									if (o) o._applyTransform(this, r, e);
									else {
										var f = this.getAbsoluteTransform(e).getMatrix();
										h.transform(f[0], f[1], f[2], f[3], f[4], f[5]);
									}
								c.call(this, r, this), r.restore();
								var g = a.pixelRatio;
								d && !s.hitCanvas
									? (h.save(),
									  h._applyShadow(this),
									  h._applyOpacity(this),
									  h._applyGlobalCompositeOperation(this),
									  h.drawImage(a._canvas, 0, 0, a.width / g, a.height / g),
									  h.restore())
									: (h._applyOpacity(this),
									  h._applyGlobalCompositeOperation(this),
									  h.drawImage(a._canvas, 0, 0, a.width / g, a.height / g));
							} else {
								if ((h._applyLineJoin(this), !i))
									if (o) o._applyTransform(this, h, e);
									else {
										var v = this.getAbsoluteTransform(e).getMatrix();
										h.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
									}
								d && u && !s.hitCanvas
									? (h.save(),
									  i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)),
									  h._applyShadow(this),
									  c.call(this, h, this),
									  h.restore(),
									  this.hasFill() && this.getShadowForStrokeEnabled() && c.call(this, h, this))
									: d && !s.hitCanvas
									? (h.save(),
									  i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)),
									  h._applyShadow(this),
									  c.call(this, h, this),
									  h.restore())
									: (i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)),
									  c.call(this, h, this));
							}
							return h.restore(), this;
						},
						drawHit: function(t, e, i) {
							var n = this.getLayer(),
								a = t || n.hitCanvas,
								r = a.getContext(),
								o = this.hitFunc() || this.sceneFunc(),
								s = this._cache.canvas,
								h = s && s.hit;
							if (!this.shouldDrawHit(a) && !i) return this;
							if ((n && n.clearHitCache(), h))
								return (
									r.save(),
									n._applyTransform(this, r, e),
									this._drawCachedHitCanvas(r),
									r.restore(),
									this
								);
							if (!o) return this;
							if ((r.save(), r._applyLineJoin(this), !i))
								if (n) n._applyTransform(this, r, e);
								else {
									var l = this.getAbsoluteTransform(e).getMatrix();
									r.transform(l[0], l[1], l[2], l[3], l[4], l[5]);
								}
							return o.call(this, r, this), r.restore(), this;
						},
						drawHitFromCache: function(e) {
							var i,
								n,
								a,
								r,
								o,
								s = e || 0,
								h = this._cache.canvas,
								l = this._getCachedSceneCanvas(),
								c = h.hit,
								d = c.getContext(),
								u = c.getWidth(),
								f = c.getHeight();
							d.clear(), d.drawImage(l._canvas, 0, 0, u, f);
							try {
								for (
									a = (n = (i = d.getImageData(0, 0, u, f)).data).length,
										r = t.Util._hexToRgb(this.colorKey),
										o = 0;
									o < a;
									o += 4
								)
									n[o + 3] > s
										? ((n[o] = r.r), (n[o + 1] = r.g), (n[o + 2] = r.b), (n[o + 3] = 255))
										: (n[o + 3] = 0);
								d.putImageData(i, 0, 0);
							} catch (e) {
								t.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
							}
							return this;
						},
					}),
					t.Util.extend(t.Shape, t.Node),
					t.Factory.addGetterSetter(t.Shape, 'stroke', void 0, t.Validators.getStringValidator()),
					t.Factory.addGetterSetter(t.Shape, 'strokeWidth', 2, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'strokeHitEnabled', !0, t.Validators.getBooleanValidator()),
					t.Factory.addGetterSetter(t.Shape, 'perfectDrawEnabled', !0, t.Validators.getBooleanValidator()),
					t.Factory.addGetterSetter(
						t.Shape,
						'shadowForStrokeEnabled',
						!0,
						t.Validators.getBooleanValidator(),
					),
					t.Factory.addGetterSetter(t.Shape, 'lineJoin'),
					t.Factory.addGetterSetter(t.Shape, 'lineCap'),
					t.Factory.addGetterSetter(t.Shape, 'sceneFunc'),
					t.Factory.addGetterSetter(t.Shape, 'hitFunc'),
					t.Factory.addGetterSetter(t.Shape, 'dash'),
					t.Factory.addGetterSetter(t.Shape, 'dashOffset', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'shadowColor', void 0, t.Validators.getStringValidator()),
					t.Factory.addGetterSetter(t.Shape, 'shadowBlur', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'shadowOpacity', 1, t.Validators.getNumberValidator()),
					t.Factory.addComponentsGetterSetter(t.Shape, 'shadowOffset', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'shadowOffsetX', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'shadowOffsetY', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternImage'),
					t.Factory.addGetterSetter(t.Shape, 'fill', void 0, t.Validators.getStringValidator()),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternX', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternY', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'fillLinearGradientColorStops'),
					t.Factory.addGetterSetter(t.Shape, 'strokeLinearGradientColorStops'),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientStartRadius', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientEndRadius', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientColorStops'),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternRepeat', 'repeat'),
					t.Factory.addGetterSetter(t.Shape, 'fillEnabled', !0),
					t.Factory.addGetterSetter(t.Shape, 'strokeEnabled', !0),
					t.Factory.addGetterSetter(t.Shape, 'shadowEnabled', !0),
					t.Factory.addGetterSetter(t.Shape, 'dashEnabled', !0),
					t.Factory.addGetterSetter(t.Shape, 'strokeScaleEnabled', !0),
					t.Factory.addGetterSetter(t.Shape, 'fillPriority', 'color'),
					t.Factory.addComponentsGetterSetter(t.Shape, 'fillPatternOffset', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternOffsetX', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternOffsetY', 0, t.Validators.getNumberValidator()),
					t.Factory.addComponentsGetterSetter(t.Shape, 'fillPatternScale', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternScaleX', 1, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternScaleY', 1, t.Validators.getNumberValidator()),
					t.Factory.addComponentsGetterSetter(t.Shape, 'fillLinearGradientStartPoint', ['x', 'y']),
					t.Factory.addComponentsGetterSetter(t.Shape, 'strokeLinearGradientStartPoint', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'fillLinearGradientStartPointX', 0),
					t.Factory.addGetterSetter(t.Shape, 'strokeLinearGradientStartPointX', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillLinearGradientStartPointY', 0),
					t.Factory.addGetterSetter(t.Shape, 'strokeLinearGradientStartPointY', 0),
					t.Factory.addComponentsGetterSetter(t.Shape, 'fillLinearGradientEndPoint', ['x', 'y']),
					t.Factory.addComponentsGetterSetter(t.Shape, 'strokeLinearGradientEndPoint', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'fillLinearGradientEndPointX', 0),
					t.Factory.addGetterSetter(t.Shape, 'strokeLinearGradientEndPointX', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillLinearGradientEndPointY', 0),
					t.Factory.addGetterSetter(t.Shape, 'strokeLinearGradientEndPointY', 0),
					t.Factory.addComponentsGetterSetter(t.Shape, 'fillRadialGradientStartPoint', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientStartPointX', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientStartPointY', 0),
					t.Factory.addComponentsGetterSetter(t.Shape, 'fillRadialGradientEndPoint', ['x', 'y']),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientEndPointX', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillRadialGradientEndPointY', 0),
					t.Factory.addGetterSetter(t.Shape, 'fillPatternRotation', 0),
					t.Factory.backCompat(t.Shape, {
						dashArray: 'dash',
						getDashArray: 'getDash',
						setDashArray: 'getDash',
						drawFunc: 'sceneFunc',
						getDrawFunc: 'getSceneFunc',
						setDrawFunc: 'setSceneFunc',
						drawHitFunc: 'hitFunc',
						getDrawHitFunc: 'getHitFunc',
						setDrawHitFunc: 'setHitFunc',
					}),
					t.Collection.mapMethods(t.Shape);
			})(Konva);
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Container = function(t) {
					this.__init(t);
				}),
					Konva.Util.addMethods(Konva.Container, {
						__init: function(t) {
							(this.children = new Konva.Collection()), Konva.Node.call(this, t);
						},
						getChildren: function(t) {
							if (!t) return this.children;
							var e = new Konva.Collection();
							return (
								this.children.each(function(i) {
									t(i) && e.push(i);
								}),
								e
							);
						},
						hasChildren: function() {
							return this.getChildren().length > 0;
						},
						removeChildren: function() {
							for (var t, e = Konva.Collection.toCollection(this.children), i = 0; i < e.length; i++)
								delete (t = e[i]).parent, (t.index = 0), t.remove();
							return (e = null), (this.children = new Konva.Collection()), this;
						},
						destroyChildren: function() {
							for (var t, e = Konva.Collection.toCollection(this.children), i = 0; i < e.length; i++)
								delete (t = e[i]).parent, (t.index = 0), t.destroy();
							return (e = null), (this.children = new Konva.Collection()), this;
						},
						add: function(t) {
							if (arguments.length > 1) {
								for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
								return this;
							}
							if (t.getParent()) return t.moveTo(this), this;
							var i = this.children;
							return (
								this._validateAdd(t),
								(t.index = i.length),
								(t.parent = this),
								i.push(t),
								this._fire('add', { child: t }),
								Konva.DD && t.isDragging() && Konva.DD.anim.setLayers(t.getLayer()),
								this
							);
						},
						destroy: function() {
							return (
								this.hasChildren() && this.destroyChildren(),
								Konva.Node.prototype.destroy.call(this),
								this
							);
						},
						find: function(t) {
							return this._generalFind(t, !1);
						},
						findOne: function(t) {
							var e = this._generalFind(t, !0);
							return e.length > 0 ? e[0] : void 0;
						},
						_generalFind: function(t, e) {
							var i = [];
							return (
								'string' == typeof t
									? (i = this._findByString(t, e))
									: 'function' == typeof t && (i = this._findByFunction(t, e)),
								Konva.Collection.toCollection(i)
							);
						},
						_findByString: function(t) {
							var e,
								i,
								n,
								a,
								r,
								o,
								s,
								h = [],
								l = t.replace(/ /g, '').split(','),
								c = l.length;
							for (e = 0; e < c; e++) {
								if (((n = l[e]), !Konva.Util.isValidSelector(n))) {
									var d =
										'Selector "' +
										n +
										'" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".\nIf you have a custom shape with such className, please change it to start with upper letter like "Triangle".\nKonva is awesome, right?';
									Konva.Util.warn(d);
								}
								if ('#' === n.charAt(0)) (r = this._getNodeById(n.slice(1))) && h.push(r);
								else if ('.' === n.charAt(0)) (a = this._getNodesByName(n.slice(1))), (h = h.concat(a));
								else
									for (s = (o = this.getChildren()).length, i = 0; i < s; i++)
										h = h.concat(o[i]._get(n));
							}
							return h;
						},
						_findByFunction: function(t, e) {
							var i = [],
								n = function(a) {
									if (!(e && i.length > 0)) {
										var r = a.getChildren(),
											o = r.length;
										t(a) && (i = i.concat(a));
										for (var s = 0; s < o; s++) n(r[s]);
									}
								};
							return n(this), i;
						},
						_getNodeById: function(t) {
							var e = Konva.ids[t];
							return void 0 !== e && this.isAncestorOf(e) ? e : null;
						},
						_getNodesByName: function(t) {
							var e = Konva.names[t] || [];
							return this._getDescendants(e);
						},
						_get: function(t) {
							for (
								var e = Konva.Node.prototype._get.call(this, t),
									i = this.getChildren(),
									n = i.length,
									a = 0;
								a < n;
								a++
							)
								e = e.concat(i[a]._get(t));
							return e;
						},
						toObject: function() {
							var t = Konva.Node.prototype.toObject.call(this);
							t.children = [];
							for (var e = this.getChildren(), i = e.length, n = 0; n < i; n++) {
								var a = e[n];
								t.children.push(a.toObject());
							}
							return t;
						},
						_getDescendants: function(t) {
							for (var e = [], i = t.length, n = 0; n < i; n++) {
								var a = t[n];
								this.isAncestorOf(a) && e.push(a);
							}
							return e;
						},
						isAncestorOf: function(t) {
							for (var e = t.getParent(); e; ) {
								if (e._id === this._id) return !0;
								e = e.getParent();
							}
							return !1;
						},
						clone: function(t) {
							var e = Konva.Node.prototype.clone.call(this, t);
							return (
								this.getChildren().each(function(t) {
									e.add(t.clone());
								}),
								e
							);
						},
						getAllIntersections: function(t) {
							var e = [];
							return (
								this.find('Shape').each(function(i) {
									i.isVisible() && i.intersects(t) && e.push(i);
								}),
								e
							);
						},
						_setChildrenIndices: function() {
							this.children.each(function(t, e) {
								t.index = e;
							});
						},
						drawScene: function(t, e, i) {
							var n = this.getLayer(),
								a = t || (n && n.getCanvas()),
								r = a && a.getContext(),
								o = this._cache.canvas,
								s = o && o.scene;
							return (
								(this.isVisible() || i) &&
									(!i && s
										? (r.save(),
										  n._applyTransform(this, r, e),
										  this._drawCachedSceneCanvas(r),
										  r.restore())
										: this._drawChildren(a, 'drawScene', e, !1, i)),
								this
							);
						},
						drawHit: function(t, e, i) {
							var n = this.getLayer(),
								a = t || (n && n.hitCanvas),
								r = a && a.getContext(),
								o = this._cache.canvas,
								s = o && o.hit;
							return (
								(this.shouldDrawHit(a) || i) &&
									(n && n.clearHitCache(),
									!i && s
										? (r.save(),
										  n._applyTransform(this, r, e),
										  this._drawCachedHitCanvas(r),
										  r.restore())
										: this._drawChildren(a, 'drawHit', e)),
								this
							);
						},
						_drawChildren: function(t, e, i, n, a) {
							var r,
								o,
								s = this.getLayer(),
								h = t && t.getContext(),
								l = this.getClipWidth(),
								c = this.getClipHeight(),
								d = this.getClipFunc(),
								u = (l && c) || d;
							if (u && s) {
								h.save();
								var f = this.getAbsoluteTransform(i),
									g = f.getMatrix();
								h.transform(g[0], g[1], g[2], g[3], g[4], g[5]),
									h.beginPath(),
									d
										? d.call(this, h, this)
										: ((r = this.getClipX()), (o = this.getClipY()), h.rect(r, o, l, c)),
									h.clip(),
									(g = f
										.copy()
										.invert()
										.getMatrix()),
									h.transform(g[0], g[1], g[2], g[3], g[4], g[5]);
							}
							this.children.each(function(r) {
								r[e](t, i, n, a);
							}),
								u && h.restore();
						},
						shouldDrawHit: function(t) {
							var e = this.getLayer(),
								i = Konva.DD && Konva.isDragging() && -1 !== Konva.DD.anim.getLayers().indexOf(e);
							return (t && t.isCache) || (e && e.hitGraphEnabled() && this.isVisible() && !i);
						},
						getClientRect: function(t) {
							var e,
								i,
								n,
								a,
								r,
								o = (t = t || {}).skipTransform,
								s = t.relativeTo,
								h = this;
							this.children.each(function(r) {
								if (r.getVisible()) {
									var o = r.getClientRect({ relativeTo: h, skipShadow: t.skipShadow });
									(0 === o.width && 0 === o.height) ||
										(void 0 === e
											? ((e = o.x), (i = o.y), (n = o.x + o.width), (a = o.y + o.height))
											: ((e = Math.min(e, o.x)),
											  (i = Math.min(i, o.y)),
											  (n = Math.max(n, o.x + o.width)),
											  (a = Math.max(a, o.y + o.height))));
								}
							});
							for (var l = this.find('Shape'), c = !1, d = 0; d < l.length; d++)
								if (l[d]._isVisible(this)) {
									c = !0;
									break;
								}
							return (
								(r = c
									? { x: e, y: i, width: n - e, height: a - i }
									: { x: 0, y: 0, width: 0, height: 0 }),
								o ? r : this._transformedRect(r, s)
							);
						},
					}),
					Konva.Util.extend(Konva.Container, Konva.Node),
					(Konva.Container.prototype.get = Konva.Container.prototype.find),
					Konva.Factory.addComponentsGetterSetter(Konva.Container, 'clip', ['x', 'y', 'width', 'height']),
					Konva.Factory.addGetterSetter(
						Konva.Container,
						'clipX',
						void 0,
						Konva.Validators.getNumberValidator(),
					),
					Konva.Factory.addGetterSetter(
						Konva.Container,
						'clipY',
						void 0,
						Konva.Validators.getNumberValidator(),
					),
					Konva.Factory.addGetterSetter(
						Konva.Container,
						'clipWidth',
						void 0,
						Konva.Validators.getNumberValidator(),
					),
					Konva.Factory.addGetterSetter(
						Konva.Container,
						'clipHeight',
						void 0,
						Konva.Validators.getNumberValidator(),
					),
					Konva.Factory.addGetterSetter(Konva.Container, 'clipFunc'),
					Konva.Collection.mapMethods(Konva.Container);
			})();
		},
		function(t, e) {
			!(function(t) {
				'use strict';
				var e = 'Shape',
					i = ['id'],
					n = [
						'xChange.konva',
						'yChange.konva',
						'scaleXChange.konva',
						'scaleYChange.konva',
						'skewXChange.konva',
						'skewYChange.konva',
						'rotationChange.konva',
						'offsetXChange.konva',
						'offsetYChange.konva',
						'transformsEnabledChange.konva',
					].join(' '),
					a = ['scaleXChange.konva', 'scaleYChange.konva'].join(' ');
				(t.Node = function(t) {
					this._init(t);
				}),
					t.Util.addMethods(t.Node, {
						_init: function(e) {
							(this._id = t.idCounter++),
								(this.eventListeners = {}),
								(this.attrs = {}),
								(this._cache = {}),
								(this._filterUpToDate = !1),
								(this._isUnderCache = !1),
								this.setAttrs(e),
								this.on(n, function() {
									this._clearCache('transform'),
										this._clearSelfAndDescendantCache('absoluteTransform');
								}),
								this.on(a, function() {
									this._clearSelfAndDescendantCache('absoluteScale');
								}),
								this.on('visibleChange.konva', function() {
									this._clearSelfAndDescendantCache('visible');
								}),
								this.on('listeningChange.konva', function() {
									this._clearSelfAndDescendantCache('listening');
								}),
								this.on('opacityChange.konva', function() {
									this._clearSelfAndDescendantCache('absoluteOpacity');
								});
						},
						_clearCache: function(t) {
							t ? delete this._cache[t] : (this._cache = {});
						},
						_getCache: function(t, e) {
							return void 0 === this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t];
						},
						_clearSelfAndDescendantCache: function(t) {
							this._clearCache(t),
								this.children &&
									this.getChildren().each(function(e) {
										e._clearSelfAndDescendantCache(t);
									});
						},
						clearCache: function() {
							return delete this._cache.canvas, (this._filterUpToDate = !1), this;
						},
						cache: function(e) {
							var i = e || {},
								n = {};
							(void 0 !== i.x && void 0 !== i.y && void 0 !== i.width && void 0 !== i.height) ||
								(n = this.getClientRect({ skipTransform: !0, relativeTo: this.getParent() }));
							var a = i.width || n.width,
								r = i.height || n.height,
								o = i.pixelRatio,
								s = void 0 === i.x ? n.x : i.x,
								h = void 0 === i.y ? n.y : i.y,
								l = i.offset || 0,
								c = i.drawBorder || !1;
							if (a && r) {
								(a += 2 * l), (r += 2 * l), (s -= l), (h -= l);
								var d = new t.SceneCanvas({ pixelRatio: o, width: a, height: r }),
									u = new t.SceneCanvas({ pixelRatio: o, width: a, height: r }),
									f = new t.HitCanvas({ pixelRatio: 1, width: a, height: r }),
									g = d.getContext(),
									v = f.getContext();
								return (
									(f.isCache = !0),
									this.clearCache(),
									g.save(),
									v.save(),
									g.translate(-s, -h),
									v.translate(-s, -h),
									(this._isUnderCache = !0),
									this._clearSelfAndDescendantCache('absoluteOpacity'),
									this._clearSelfAndDescendantCache('absoluteScale'),
									this.drawScene(d, this, !0),
									this.drawHit(f, this, !0),
									(this._isUnderCache = !1),
									g.restore(),
									v.restore(),
									c &&
										(g.save(),
										g.beginPath(),
										g.rect(0, 0, a, r),
										g.closePath(),
										g.setAttr('strokeStyle', 'red'),
										g.setAttr('lineWidth', 5),
										g.stroke(),
										g.restore()),
									(this._cache.canvas = { scene: d, filter: u, hit: f, x: s, y: h }),
									this
								);
							}
							t.Util.error(
								'Can not cache the node. Width or height of the node equals 0. Caching is skipped.',
							);
						},
						getClientRect: function() {
							throw new Error('abstract "getClientRect" method call');
						},
						_transformedRect: function(t, e) {
							var i,
								n,
								a,
								r,
								o = [
									{ x: t.x, y: t.y },
									{ x: t.x + t.width, y: t.y },
									{ x: t.x + t.width, y: t.y + t.height },
									{ x: t.x, y: t.y + t.height },
								],
								s = this.getAbsoluteTransform(e);
							return (
								o.forEach(function(t) {
									var e = s.point(t);
									void 0 === i && ((i = a = e.x), (n = r = e.y)),
										(i = Math.min(i, e.x)),
										(n = Math.min(n, e.y)),
										(a = Math.max(a, e.x)),
										(r = Math.max(r, e.y));
								}),
								{ x: i, y: n, width: a - i, height: r - n }
							);
						},
						_drawCachedSceneCanvas: function(t) {
							t.save(),
								t._applyOpacity(this),
								t._applyGlobalCompositeOperation(this),
								t.translate(this._cache.canvas.x, this._cache.canvas.y);
							var e = this._getCachedSceneCanvas(),
								i = e.pixelRatio;
							t.drawImage(e._canvas, 0, 0, e.width / i, e.height / i), t.restore();
						},
						_drawCachedHitCanvas: function(t) {
							var e = this._cache.canvas.hit;
							t.save(),
								t.translate(this._cache.canvas.x, this._cache.canvas.y),
								t.drawImage(e._canvas, 0, 0),
								t.restore();
						},
						_getCachedSceneCanvas: function() {
							var e,
								i,
								n,
								a,
								r = this.filters(),
								o = this._cache.canvas,
								s = o.scene,
								h = o.filter,
								l = h.getContext();
							if (r) {
								if (!this._filterUpToDate) {
									var c = s.pixelRatio;
									try {
										for (
											e = r.length,
												l.clear(),
												l.drawImage(s._canvas, 0, 0, s.getWidth() / c, s.getHeight() / c),
												i = l.getImageData(0, 0, h.getWidth(), h.getHeight()),
												n = 0;
											n < e;
											n++
										)
											'function' == typeof (a = r[n])
												? (a.call(this, i), l.putImageData(i, 0, 0))
												: t.Util.error(
														'Filter should be type of function, but got ' +
															typeof a +
															' insted. Please check correct filters',
												  );
									} catch (e) {
										t.Util.error('Unable to apply filter. ' + e.message);
									}
									this._filterUpToDate = !0;
								}
								return h;
							}
							return s;
						},
						on: function(t, e) {
							if (3 === arguments.length) return this._delegate.apply(this, arguments);
							var i,
								n,
								a,
								r,
								o = t.split(' '),
								s = o.length;
							for (i = 0; i < s; i++)
								(a = (n = o[i].split('.'))[0]),
									(r = n[1] || ''),
									this.eventListeners[a] || (this.eventListeners[a] = []),
									this.eventListeners[a].push({ name: r, handler: e });
							return this;
						},
						off: function(t, e) {
							var i,
								n,
								a,
								r,
								o,
								s = (t || '').split(' '),
								h = s.length;
							if (!t) for (n in this.eventListeners) this._off(n);
							for (i = 0; i < h; i++)
								if (((r = (a = s[i].split('.'))[0]), (o = a[1]), r))
									this.eventListeners[r] && this._off(r, o, e);
								else for (n in this.eventListeners) this._off(n, o, e);
							return this;
						},
						dispatchEvent: function(t) {
							var e = { target: this, type: t.type, evt: t };
							return this.fire(t.type, e), this;
						},
						addEventListener: function(t, e) {
							return (
								this.on(t, function(t) {
									e.call(this, t.evt);
								}),
								this
							);
						},
						removeEventListener: function(t) {
							return this.off(t), this;
						},
						_delegate: function(e, i, n) {
							var a = this;
							this.on(e, function(e) {
								for (var r = e.target.findAncestors(i, !0, a), o = 0; o < r.length; o++)
									((e = t.Util.cloneObject(e)).currentTarget = r[o]), n.call(r[o], e);
							});
						},
						remove: function() {
							var t = this.getParent();
							return (
								t &&
									t.children &&
									(t.children.splice(this.index, 1), t._setChildrenIndices(), delete this.parent),
								this._clearSelfAndDescendantCache('stage'),
								this._clearSelfAndDescendantCache('absoluteTransform'),
								this._clearSelfAndDescendantCache('visible'),
								this._clearSelfAndDescendantCache('listening'),
								this._clearSelfAndDescendantCache('absoluteOpacity'),
								this
							);
						},
						destroy: function() {
							t._removeId(this.getId());
							for (var e = (this.getName() || '').split(/\s/g), i = 0; i < e.length; i++) {
								var n = e[i];
								t._removeName(n, this._id);
							}
							return this.remove(), this;
						},
						getAttr: function(e) {
							var i = 'get' + t.Util._capitalize(e);
							return t.Util._isFunction(this[i]) ? this[i]() : this.attrs[e];
						},
						getAncestors: function() {
							for (var e = this.getParent(), i = new t.Collection(); e; ) i.push(e), (e = e.getParent());
							return i;
						},
						getAttrs: function() {
							return this.attrs || {};
						},
						setAttrs: function(e) {
							var i, n;
							if (!e) return this;
							for (i in e)
								'children' !== i &&
									((n = 'set' + t.Util._capitalize(i)),
									t.Util._isFunction(this[n]) ? this[n](e[i]) : this._setAttr(i, e[i]));
							return this;
						},
						isListening: function() {
							return this._getCache('listening', this._isListening);
						},
						_isListening: function() {
							var t = this.getListening(),
								e = this.getParent();
							return 'inherit' === t ? !e || e.isListening() : t;
						},
						isVisible: function() {
							return this._getCache('visible', this._isVisible);
						},
						_isVisible: function(t) {
							var e = this.getVisible(),
								i = this.getParent();
							return (
								(t === i && 'inherit' === e) ||
								(t === i ? e : 'inherit' === e ? !i || i._isVisible(t) : e)
							);
						},
						shouldDrawHit: function() {
							var t = this.getLayer();
							return (
								(!t && this.isListening() && this.isVisible()) ||
								(t && t.hitGraphEnabled() && this.isListening() && this.isVisible())
							);
						},
						show: function() {
							return this.setVisible(!0), this;
						},
						hide: function() {
							return this.setVisible(!1), this;
						},
						getZIndex: function() {
							return this.index || 0;
						},
						getAbsoluteZIndex: function() {
							var t,
								i,
								n,
								a,
								r = this.getDepth(),
								o = this,
								s = 0;
							return (
								'Stage' !== o.nodeType &&
									(function h(l) {
										for (t = [], i = l.length, n = 0; n < i; n++)
											(a = l[n]),
												s++,
												a.nodeType !== e && (t = t.concat(a.getChildren().toArray())),
												a._id === o._id && (n = i);
										t.length > 0 && t[0].getDepth() <= r && h(t);
									})(o.getStage().getChildren()),
								s
							);
						},
						getDepth: function() {
							for (var t = 0, e = this.parent; e; ) t++, (e = e.parent);
							return t;
						},
						setPosition: function(t) {
							return this.setX(t.x), this.setY(t.y), this;
						},
						getPosition: function() {
							return { x: this.getX(), y: this.getY() };
						},
						getAbsolutePosition: function(e) {
							var i = this.getAbsoluteTransform(e).getMatrix(),
								n = new t.Transform(),
								a = this.offset();
							return (n.m = i.slice()), n.translate(a.x, a.y), n.getTranslation();
						},
						setAbsolutePosition: function(t) {
							var e,
								i = this._clearTransform();
							return (
								(this.attrs.x = i.x),
								(this.attrs.y = i.y),
								delete i.x,
								delete i.y,
								(e = this.getAbsoluteTransform()).invert(),
								e.translate(t.x, t.y),
								(t = {
									x: this.attrs.x + e.getTranslation().x,
									y: this.attrs.y + e.getTranslation().y,
								}),
								this.setPosition({ x: t.x, y: t.y }),
								this._setTransform(i),
								this
							);
						},
						_setTransform: function(t) {
							var e;
							for (e in t) this.attrs[e] = t[e];
							this._clearCache('transform'), this._clearSelfAndDescendantCache('absoluteTransform');
						},
						_clearTransform: function() {
							var t = {
								x: this.getX(),
								y: this.getY(),
								rotation: this.getRotation(),
								scaleX: this.getScaleX(),
								scaleY: this.getScaleY(),
								offsetX: this.getOffsetX(),
								offsetY: this.getOffsetY(),
								skewX: this.getSkewX(),
								skewY: this.getSkewY(),
							};
							return (
								(this.attrs.x = 0),
								(this.attrs.y = 0),
								(this.attrs.rotation = 0),
								(this.attrs.scaleX = 1),
								(this.attrs.scaleY = 1),
								(this.attrs.offsetX = 0),
								(this.attrs.offsetY = 0),
								(this.attrs.skewX = 0),
								(this.attrs.skewY = 0),
								this._clearCache('transform'),
								this._clearSelfAndDescendantCache('absoluteTransform'),
								t
							);
						},
						move: function(t) {
							var e = t.x,
								i = t.y,
								n = this.getX(),
								a = this.getY();
							return (
								void 0 !== e && (n += e),
								void 0 !== i && (a += i),
								this.setPosition({ x: n, y: a }),
								this
							);
						},
						_eachAncestorReverse: function(t, e) {
							var i,
								n,
								a = [],
								r = this.getParent();
							if (e && e._id === this._id) t(this);
							else {
								for (a.unshift(this); r && (!e || r._id !== e._id); ) a.unshift(r), (r = r.parent);
								for (i = a.length, n = 0; n < i; n++) t(a[n]);
							}
						},
						rotate: function(t) {
							return this.setRotation(this.getRotation() + t), this;
						},
						moveToTop: function() {
							if (!this.parent)
								return t.Util.warn('Node has no parent. moveToTop function is ignored.'), !1;
							var e = this.index;
							return (
								this.parent.children.splice(e, 1),
								this.parent.children.push(this),
								this.parent._setChildrenIndices(),
								!0
							);
						},
						moveUp: function() {
							if (!this.parent) return t.Util.warn('Node has no parent. moveUp function is ignored.'), !1;
							var e = this.index;
							return (
								e < this.parent.getChildren().length - 1 &&
								(this.parent.children.splice(e, 1),
								this.parent.children.splice(e + 1, 0, this),
								this.parent._setChildrenIndices(),
								!0)
							);
						},
						moveDown: function() {
							if (!this.parent)
								return t.Util.warn('Node has no parent. moveDown function is ignored.'), !1;
							var e = this.index;
							return (
								e > 0 &&
								(this.parent.children.splice(e, 1),
								this.parent.children.splice(e - 1, 0, this),
								this.parent._setChildrenIndices(),
								!0)
							);
						},
						moveToBottom: function() {
							if (!this.parent)
								return t.Util.warn('Node has no parent. moveToBottom function is ignored.'), !1;
							var e = this.index;
							return (
								e > 0 &&
								(this.parent.children.splice(e, 1),
								this.parent.children.unshift(this),
								this.parent._setChildrenIndices(),
								!0)
							);
						},
						setZIndex: function(e) {
							if (!this.parent)
								return t.Util.warn('Node has no parent. zIndex parameter is ignored.'), !1;
							var i = this.index;
							return (
								this.parent.children.splice(i, 1),
								this.parent.children.splice(e, 0, this),
								this.parent._setChildrenIndices(),
								this
							);
						},
						getAbsoluteOpacity: function() {
							return this._getCache('absoluteOpacity', this._getAbsoluteOpacity);
						},
						_getAbsoluteOpacity: function() {
							var t = this.getOpacity(),
								e = this.getParent();
							return e && !e._isUnderCache && (t *= this.getParent().getAbsoluteOpacity()), t;
						},
						moveTo: function(t) {
							return (
								this.getParent() !== t &&
									((this.__originalRemove || this.remove).call(this), t.add(this)),
								this
							);
						},
						toObject: function() {
							var e,
								i,
								n,
								a,
								r = {},
								o = this.getAttrs();
							for (e in ((r.attrs = {}), o))
								(i = o[e]),
									(n = 'function' == typeof this[e] && this[e]),
									delete o[e],
									(a = n ? n.call(this) : null),
									(o[e] = i),
									a !== i && (r.attrs[e] = i);
							return (r.className = this.getClassName()), t.Util._prepareToStringify(r);
						},
						toJSON: function() {
							return JSON.stringify(this.toObject());
						},
						getParent: function() {
							return this.parent;
						},
						findAncestors: function(t, e, i) {
							var n = [];
							e && this._isMatch(t) && n.push(this);
							for (var a = this.parent; a; ) {
								if (a === i) return n;
								a._isMatch(t) && n.push(a), (a = a.parent);
							}
							return n;
						},
						findAncestor: function(t, e, i) {
							return this.findAncestors(t, e, i)[0];
						},
						_isMatch: function(e) {
							if (!e) return !1;
							var i,
								n,
								a = e.replace(/ /g, '').split(','),
								r = a.length;
							for (i = 0; i < r; i++)
								if (
									((n = a[i]),
									t.Util.isValidSelector(n) ||
										(t.Util.warn(
											'Selector "' +
												n +
												'" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".',
										),
										t.Util.warn(
											'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".',
										),
										t.Util.warn('Konva is awesome, right?')),
									'#' === n.charAt(0))
								) {
									if (this.id() === n.slice(1)) return !0;
								} else if ('.' === n.charAt(0)) {
									if (this.hasName(n.slice(1))) return !0;
								} else if (0 !== this._get(n).length) return !0;
							return !1;
						},
						getLayer: function() {
							var t = this.getParent();
							return t ? t.getLayer() : null;
						},
						getStage: function() {
							return this._getCache('stage', this._getStage);
						},
						_getStage: function() {
							var t = this.getParent();
							return t ? t.getStage() : void 0;
						},
						fire: function(t, e, i) {
							return (
								((e = e || {}).target = e.target || this),
								i ? this._fireAndBubble(t, e) : this._fire(t, e),
								this
							);
						},
						getAbsoluteTransform: function(t) {
							return t
								? this._getAbsoluteTransform(t)
								: this._getCache('absoluteTransform', this._getAbsoluteTransform);
						},
						_getAbsoluteTransform: function(e) {
							var i = new t.Transform();
							return (
								this._eachAncestorReverse(function(t) {
									var e = t.transformsEnabled();
									'all' === e
										? i.multiply(t.getTransform())
										: 'position' === e &&
										  i.translate(t.getX() - t.getOffsetX(), t.getY() - t.getOffsetY());
								}, e),
								i
							);
						},
						getAbsoluteScale: function(t) {
							return t
								? this._getAbsoluteScale(t)
								: this._getCache('absoluteScale', this._getAbsoluteScale);
						},
						_getAbsoluteScale: function(t) {
							for (var e = this; e; ) e._isUnderCache && (t = e), (e = e.getParent());
							var i = 1,
								n = 1;
							return (
								this._eachAncestorReverse(function(t) {
									(i *= t.scaleX()), (n *= t.scaleY());
								}, t),
								{ x: i, y: n }
							);
						},
						getTransform: function() {
							return this._getCache('transform', this._getTransform);
						},
						_getTransform: function() {
							var e = new t.Transform(),
								i = this.getX(),
								n = this.getY(),
								a = t.getAngle(this.getRotation()),
								r = this.getScaleX(),
								o = this.getScaleY(),
								s = this.getSkewX(),
								h = this.getSkewY(),
								l = this.getOffsetX(),
								c = this.getOffsetY();
							return (
								(0 === i && 0 === n) || e.translate(i, n),
								0 !== a && e.rotate(a),
								(0 === s && 0 === h) || e.skew(s, h),
								(1 === r && 1 === o) || e.scale(r, o),
								(0 === l && 0 === c) || e.translate(-1 * l, -1 * c),
								e
							);
						},
						clone: function(e) {
							var n,
								a,
								r,
								o,
								s,
								h = t.Util.cloneObject(this.attrs);
							for (var l in i) delete h[i[l]];
							for (n in e) h[n] = e[n];
							var c = new this.constructor(h);
							for (n in this.eventListeners)
								for (r = (a = this.eventListeners[n]).length, o = 0; o < r; o++)
									(s = a[o]).name.indexOf('konva') < 0 &&
										(c.eventListeners[n] || (c.eventListeners[n] = []),
										c.eventListeners[n].push(s));
							return c;
						},
						_toKonvaCanvas: function(e) {
							e = e || {};
							var i = this.getClientRect(),
								n = this.getStage(),
								a = void 0 !== e.x ? e.x : i.x,
								r = void 0 !== e.y ? e.y : i.y,
								o = e.pixelRatio || 1,
								s = new t.SceneCanvas({
									width: e.width || i.width || (n ? n.getWidth() : 0),
									height: e.height || i.height || (n ? n.getHeight() : 0),
									pixelRatio: o,
								}),
								h = s.getContext();
							return h.save(), (a || r) && h.translate(-1 * a, -1 * r), this.drawScene(s), h.restore(), s;
						},
						toCanvas: function(t) {
							return this._toKonvaCanvas(t)._canvas;
						},
						toDataURL: function(t) {
							var e = (t = t || {}).mimeType || null,
								i = t.quality || null,
								n = this._toKonvaCanvas(t).toDataURL(e, i);
							return t.callback && t.callback(n), n;
						},
						toImage: function(e) {
							if (!e || !e.callback) throw 'callback required for toImage method config argument';
							var i = e.callback;
							delete e.callback,
								t.Util._getImage(this.toDataURL(e), function(t) {
									i(t);
								});
						},
						setSize: function(t) {
							return this.setWidth(t.width), this.setHeight(t.height), this;
						},
						getSize: function() {
							return { width: this.getWidth(), height: this.getHeight() };
						},
						getWidth: function() {
							return this.attrs.width || 0;
						},
						getHeight: function() {
							return this.attrs.height || 0;
						},
						getClassName: function() {
							return this.className || this.nodeType;
						},
						getType: function() {
							return this.nodeType;
						},
						getDragDistance: function() {
							return void 0 !== this.attrs.dragDistance
								? this.attrs.dragDistance
								: this.parent
								? this.parent.getDragDistance()
								: t.dragDistance;
						},
						_get: function(t) {
							return this.className === t || this.nodeType === t ? [this] : [];
						},
						_off: function(t, e, i) {
							var n,
								a,
								r,
								o = this.eventListeners[t];
							for (n = 0; n < o.length; n++)
								if (
									((a = o[n].name),
									(r = o[n].handler),
									!(('konva' === a && 'konva' !== e) || (e && a !== e) || (i && i !== r)))
								) {
									if ((o.splice(n, 1), 0 === o.length)) {
										delete this.eventListeners[t];
										break;
									}
									n--;
								}
						},
						_fireChangeEvent: function(t, e, i) {
							this._fire(t + 'Change', { oldVal: e, newVal: i });
						},
						setId: function(e) {
							var i = this.getId();
							return t._removeId(i), t._addId(this, e), this._setAttr('id', e), this;
						},
						setName: function(e) {
							var i,
								n,
								a = (this.getName() || '').split(/\s/g),
								r = (e || '').split(/\s/g);
							for (n = 0; n < a.length; n++)
								(i = a[n]), -1 === r.indexOf(i) && i && t._removeName(i, this._id);
							for (n = 0; n < r.length; n++) (i = r[n]), -1 === a.indexOf(i) && i && t._addName(this, i);
							return this._setAttr('name', e), this;
						},
						addName: function(t) {
							if (!this.hasName(t)) {
								var e = this.name(),
									i = e ? e + ' ' + t : t;
								this.setName(i);
							}
							return this;
						},
						hasName: function(t) {
							return -1 !== (this.name() || '').split(/\s/g).indexOf(t);
						},
						removeName: function(t) {
							var e = (this.name() || '').split(/\s/g),
								i = e.indexOf(t);
							return -1 !== i && (e.splice(i, 1), this.setName(e.join(' '))), this;
						},
						setAttr: function(e, i) {
							var n = this['set' + t.Util._capitalize(e)];
							return t.Util._isFunction(n) ? n.call(this, i) : this._setAttr(e, i), this;
						},
						_setAttr: function(e, i) {
							var n;
							((n = this.attrs[e]) === i && !t.Util.isObject(i)) ||
								(void 0 === i || null === i ? delete this.attrs[e] : (this.attrs[e] = i),
								this._fireChangeEvent(e, n, i));
						},
						_setComponentAttr: function(t, e, i) {
							var n;
							void 0 !== i &&
								((n = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)),
								(this.attrs[t][e] = i),
								this._fireChangeEvent(t, n, i));
						},
						_fireAndBubble: function(t, i, n) {
							var a = !0;
							if (
								(i && this.nodeType === e && (i.target = this),
								'mouseenter' === t &&
								n &&
								(this._id === n._id || (this.isAncestorOf && this.isAncestorOf(n)))
									? (a = !1)
									: 'mouseleave' === t &&
									  n &&
									  (this._id === n._id || (this.isAncestorOf && this.isAncestorOf(n))) &&
									  (a = !1),
								a)
							) {
								this._fire(t, i);
								var r =
									('mouseenter' === t || 'mouseleave' === t) &&
									n &&
									n.isAncestorOf &&
									n.isAncestorOf(this) &&
									!n.isAncestorOf(this.parent);
								((i && !i.cancelBubble) || !i) &&
									this.parent &&
									this.parent.isListening() &&
									!r &&
									(n && n.parent
										? this._fireAndBubble.call(this.parent, t, i, n.parent)
										: this._fireAndBubble.call(this.parent, t, i));
							}
						},
						_fire: function(t, e) {
							var i,
								n = this.eventListeners[t];
							if ((((e = e || {}).currentTarget = this), (e.type = t), n))
								for (i = 0; i < n.length; i++) n[i].handler.call(this, e);
						},
						draw: function() {
							return this.drawScene(), this.drawHit(), this;
						},
					}),
					(t.Node.create = function(e, i) {
						return t.Util._isString(e) && (e = JSON.parse(e)), this._createNode(e, i);
					}),
					(t.Node._createNode = function(e, i) {
						var n,
							a,
							r,
							o = t.Node.prototype.getClassName.call(e),
							s = e.children;
						if ((i && (e.attrs.container = i), (n = new t[o](e.attrs)), s))
							for (a = s.length, r = 0; r < a; r++) n.add(this._createNode(s[r]));
						return n;
					}),
					t.Factory.addOverloadedGetterSetter(t.Node, 'position'),
					t.Factory.addGetterSetter(t.Node, 'x', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Node, 'y', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(
						t.Node,
						'globalCompositeOperation',
						'source-over',
						t.Validators.getStringValidator(),
					),
					t.Factory.addGetterSetter(t.Node, 'opacity', 1, t.Validators.getNumberValidator()),
					t.Factory.addGetter(t.Node, 'name'),
					t.Factory.addOverloadedGetterSetter(t.Node, 'name'),
					t.Factory.addGetter(t.Node, 'id'),
					t.Factory.addOverloadedGetterSetter(t.Node, 'id'),
					t.Factory.addGetterSetter(t.Node, 'rotation', 0, t.Validators.getNumberValidator()),
					t.Factory.addComponentsGetterSetter(t.Node, 'scale', ['x', 'y']),
					t.Factory.addGetterSetter(t.Node, 'scaleX', 1, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Node, 'scaleY', 1, t.Validators.getNumberValidator()),
					t.Factory.addComponentsGetterSetter(t.Node, 'skew', ['x', 'y']),
					t.Factory.addGetterSetter(t.Node, 'skewX', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Node, 'skewY', 0, t.Validators.getNumberValidator()),
					t.Factory.addComponentsGetterSetter(t.Node, 'offset', ['x', 'y']),
					t.Factory.addGetterSetter(t.Node, 'offsetX', 0, t.Validators.getNumberValidator()),
					t.Factory.addGetterSetter(t.Node, 'offsetY', 0, t.Validators.getNumberValidator()),
					t.Factory.addSetter(t.Node, 'dragDistance', t.Validators.getNumberValidator()),
					t.Factory.addOverloadedGetterSetter(t.Node, 'dragDistance'),
					t.Factory.addSetter(t.Node, 'width', t.Validators.getNumberValidator()),
					t.Factory.addOverloadedGetterSetter(t.Node, 'width'),
					t.Factory.addSetter(t.Node, 'height', t.Validators.getNumberValidator()),
					t.Factory.addOverloadedGetterSetter(t.Node, 'height'),
					t.Factory.addGetterSetter(t.Node, 'listening', 'inherit', function(e) {
						return (
							!0 === e ||
								!1 === e ||
								'inherit' === e ||
								t.Util.warn(
									e +
										' is a not valid value for "listening" attribute. The value may be true, false or "inherit".',
								),
							e
						);
					}),
					t.Factory.addGetterSetter(t.Node, 'preventDefault', !0, t.Validators.getBooleanValidator()),
					t.Factory.addGetterSetter(t.Node, 'filters', null, function(t) {
						return (this._filterUpToDate = !1), t;
					}),
					t.Factory.addGetterSetter(t.Node, 'visible', 'inherit', function(e) {
						return (
							!0 === e ||
								!1 === e ||
								'inherit' === e ||
								t.Util.warn(
									e +
										' is a not valid value for "visible" attribute. The value may be true, false or "inherit".',
								),
							e
						);
					}),
					t.Factory.addGetterSetter(t.Node, 'transformsEnabled', 'all', t.Validators.getStringValidator()),
					t.Factory.addOverloadedGetterSetter(t.Node, 'size'),
					t.Factory.backCompat(t.Node, {
						rotateDeg: 'rotate',
						setRotationDeg: 'setRotation',
						getRotationDeg: 'getRotation',
					}),
					t.Collection.mapMethods(t.Node);
			})(Konva);
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Factory = {
					addGetterSetter: function(t, e, i, n, a) {
						this.addGetter(t, e, i), this.addSetter(t, e, n, a), this.addOverloadedGetterSetter(t, e);
					},
					addGetter: function(t, e, i) {
						var n = 'get' + Konva.Util._capitalize(e);
						t.prototype[n] = function() {
							var t = this.attrs[e];
							return void 0 === t ? i : t;
						};
					},
					addSetter: function(t, e, i, n) {
						var a = 'set' + Konva.Util._capitalize(e);
						t.prototype[a] = function(t) {
							return (
								i && void 0 !== t && null !== t && (t = i.call(this, t, e)),
								this._setAttr(e, t),
								n && n.call(this),
								this
							);
						};
					},
					addComponentsGetterSetter: function(t, e, i, n, a) {
						var r,
							o,
							s = i.length,
							h = Konva.Util._capitalize,
							l = 'get' + h(e),
							c = 'set' + h(e);
						(t.prototype[l] = function() {
							var t = {};
							for (r = 0; r < s; r++) t[(o = i[r])] = this.getAttr(e + h(o));
							return t;
						}),
							(t.prototype[c] = function(t) {
								var i,
									r = this.attrs[e];
								for (i in (n && (t = n.call(this, t)), t))
									t.hasOwnProperty(i) && this._setAttr(e + h(i), t[i]);
								return this._fireChangeEvent(e, r, t), a && a.call(this), this;
							}),
							this.addOverloadedGetterSetter(t, e);
					},
					addOverloadedGetterSetter: function(t, e) {
						var i = Konva.Util._capitalize(e),
							n = 'set' + i,
							a = 'get' + i;
						t.prototype[e] = function() {
							return arguments.length ? (this[n](arguments[0]), this) : this[a]();
						};
					},
					addDeprecatedGetterSetter: function(t, e, i, n) {
						Konva.Util.error('Adding deprecated ' + e);
						var a = 'get' + Konva.Util._capitalize(e),
							r =
								e +
								' property is deprecated and will be removed soon. Look at Konva change log for more information.';
						(t.prototype[a] = function() {
							Konva.Util.error(r);
							var t = this.attrs[e];
							return void 0 === t ? i : t;
						}),
							this.addSetter(t, e, n, function() {
								Konva.Util.error(r);
							}),
							this.addOverloadedGetterSetter(t, e);
					},
					backCompat: function(t, e) {
						Konva.Util.each(e, function(e, i) {
							var n = t.prototype[i],
								a = 'get' + Konva.Util._capitalize(e),
								r = 'set' + Konva.Util._capitalize(e);
							function o() {
								n.apply(this, arguments),
									Konva.Util.error(
										'"' +
											e +
											'" method is deprecated and will be removed soon. Use ""' +
											i +
											'" instead.',
									);
							}
							(t.prototype[e] = o), (t.prototype[a] = o), (t.prototype[r] = o);
						});
					},
					afterSetFilter: function() {
						this._filterUpToDate = !1;
					},
				}),
					(Konva.Validators = {
						RGBComponent: function(t) {
							return t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
						},
						alphaComponent: function(t) {
							return t > 1 ? 1 : t < 1e-4 ? 1e-4 : t;
						},
						_formatValue: function(t) {
							return Konva.Util._isString(t)
								? '"' + t + '"'
								: '[object Number]' === Object.prototype.toString.call(t)
								? t
								: Konva.Util._isBoolean(t)
								? t
								: Object.prototype.toString.call(t);
						},
						getNumberValidator: function() {
							if (Konva.isUnminified)
								return function(t, e) {
									return (
										Konva.Util._isNumber(t) ||
											Konva.Util.warn(
												Konva.Validators._formatValue(t) +
													' is a not valid value for "' +
													e +
													'" attribute. The value should be a number.',
											),
										t
									);
								};
						},
						getNumberOrAutoValidator: function() {
							if (Konva.isUnminified)
								return function(t, e) {
									return (
										Konva.Util._isNumber(t) ||
											'auto' === t ||
											Konva.Util.warn(
												Konva.Validators._formatValue(t) +
													' is a not valid value for "' +
													e +
													'" attribute. The value should be a number or "auto".',
											),
										t
									);
								};
						},
						getStringValidator: function() {
							if (Konva.isUnminified)
								return function(t, e) {
									return (
										Konva.Util._isString(t) ||
											Konva.Util.warn(
												Konva.Validators._formatValue(t) +
													' is a not valid value for "' +
													e +
													'" attribute. The value should be a string.',
											),
										t
									);
								};
						},
						getFunctionValidator: function() {
							if (Konva.isUnminified)
								return function(t, e) {
									return (
										Konva.Util._isFunction(t) ||
											Konva.Util.warn(
												Konva.Validators._formatValue(t) +
													' is a not valid value for "' +
													e +
													'" attribute. The value should be a function.',
											),
										t
									);
								};
						},
						getNumberArrayValidator: function() {
							if (Konva.isUnminified)
								return function(t, e) {
									return (
										Konva.Util._isArray(t)
											? t.forEach(function(t) {
													Konva.Util._isNumber(t) ||
														Konva.Util.warn(
															'"' +
																e +
																'" attribute has non numeric element ' +
																t +
																'. Make sure that all elements are numbers.',
														);
											  })
											: Konva.Util.warn(
													Konva.Validators._formatValue(t) +
														' is a not valid value for "' +
														e +
														'" attribute. The value should be a array of numbers.',
											  ),
										t
									);
								};
						},
						getBooleanValidator: function() {
							if (Konva.isUnminified)
								return function(t, e) {
									return (
										!0 === t ||
											!1 === t ||
											Konva.Util.warn(
												Konva.Validators._formatValue(t) +
													' is a not valid value for "' +
													e +
													'" attribute. The value should be a boolean.',
											),
										t
									);
								};
						},
					});
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				var t = [
					'arc',
					'arcTo',
					'beginPath',
					'bezierCurveTo',
					'clearRect',
					'clip',
					'closePath',
					'createLinearGradient',
					'createPattern',
					'createRadialGradient',
					'drawImage',
					'fill',
					'fillText',
					'getImageData',
					'createImageData',
					'lineTo',
					'moveTo',
					'putImageData',
					'quadraticCurveTo',
					'rect',
					'restore',
					'rotate',
					'save',
					'scale',
					'setLineDash',
					'setTransform',
					'stroke',
					'strokeText',
					'transform',
					'translate',
				];
				(Konva.Context = function(t) {
					this.init(t);
				}),
					(Konva.Context.prototype = {
						init: function(t) {
							(this.canvas = t),
								(this._context = t._canvas.getContext('2d')),
								Konva.enableTrace && ((this.traceArr = []), this._enableTrace());
						},
						fillShape: function(t) {
							t.getFillEnabled() && this._fill(t);
						},
						strokeShape: function(t) {
							t.getStrokeEnabled() && this._stroke(t);
						},
						fillStrokeShape: function(t) {
							t.getFillEnabled() && this._fill(t), t.getStrokeEnabled() && this._stroke(t);
						},
						getTrace: function(t) {
							var e,
								i,
								n,
								a,
								r = this.traceArr,
								o = r.length,
								s = '';
							for (e = 0; e < o; e++)
								(n = (i = r[e]).method)
									? ((a = i.args),
									  (s += n),
									  t
											? (s += '()')
											: Konva.Util._isArray(a[0])
											? (s += '([' + a.join(',') + '])')
											: (s += '(' + a.join(',') + ')'))
									: ((s += i.property), t || (s += '=' + i.val)),
									(s += ';');
							return s;
						},
						clearTrace: function() {
							this.traceArr = [];
						},
						_trace: function(t) {
							var e = this.traceArr;
							e.push(t), e.length >= Konva.traceArrMax && e.shift();
						},
						reset: function() {
							var t = this.getCanvas().getPixelRatio();
							this.setTransform(1 * t, 0, 0, 1 * t, 0, 0);
						},
						getCanvas: function() {
							return this.canvas;
						},
						clear: function(t) {
							var e = this.getCanvas();
							t
								? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0)
								: this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio);
						},
						_applyLineCap: function(t) {
							var e = t.getLineCap();
							e && this.setAttr('lineCap', e);
						},
						_applyOpacity: function(t) {
							var e = t.getAbsoluteOpacity();
							1 !== e && this.setAttr('globalAlpha', e);
						},
						_applyLineJoin: function(t) {
							var e = t.getLineJoin();
							e && this.setAttr('lineJoin', e);
						},
						setAttr: function(t, e) {
							this._context[t] = e;
						},
						arc: function() {
							var t = arguments;
							this._context.arc(t[0], t[1], t[2], t[3], t[4], t[5]);
						},
						beginPath: function() {
							this._context.beginPath();
						},
						bezierCurveTo: function() {
							var t = arguments;
							this._context.bezierCurveTo(t[0], t[1], t[2], t[3], t[4], t[5]);
						},
						clearRect: function() {
							var t = arguments;
							this._context.clearRect(t[0], t[1], t[2], t[3]);
						},
						clip: function() {
							this._context.clip();
						},
						closePath: function() {
							this._context.closePath();
						},
						createImageData: function() {
							var t = arguments;
							return 2 === t.length
								? this._context.createImageData(t[0], t[1])
								: 1 === t.length
								? this._context.createImageData(t[0])
								: void 0;
						},
						createLinearGradient: function() {
							var t = arguments;
							return this._context.createLinearGradient(t[0], t[1], t[2], t[3]);
						},
						createPattern: function() {
							var t = arguments;
							return this._context.createPattern(t[0], t[1]);
						},
						createRadialGradient: function() {
							var t = arguments;
							return this._context.createRadialGradient(t[0], t[1], t[2], t[3], t[4], t[5]);
						},
						drawImage: function() {
							var t = arguments,
								e = this._context;
							3 === t.length
								? e.drawImage(t[0], t[1], t[2])
								: 5 === t.length
								? e.drawImage(t[0], t[1], t[2], t[3], t[4])
								: 9 === t.length && e.drawImage(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
						},
						isPointInPath: function(t, e) {
							return this._context.isPointInPath(t, e);
						},
						fill: function() {
							this._context.fill();
						},
						fillRect: function(t, e, i, n) {
							this._context.fillRect(t, e, i, n);
						},
						strokeRect: function(t, e, i, n) {
							this._context.strokeRect(t, e, i, n);
						},
						fillText: function() {
							var t = arguments;
							this._context.fillText(t[0], t[1], t[2]);
						},
						measureText: function(t) {
							return this._context.measureText(t);
						},
						getImageData: function() {
							var t = arguments;
							return this._context.getImageData(t[0], t[1], t[2], t[3]);
						},
						lineTo: function() {
							var t = arguments;
							this._context.lineTo(t[0], t[1]);
						},
						moveTo: function() {
							var t = arguments;
							this._context.moveTo(t[0], t[1]);
						},
						rect: function() {
							var t = arguments;
							this._context.rect(t[0], t[1], t[2], t[3]);
						},
						putImageData: function() {
							var t = arguments;
							this._context.putImageData(t[0], t[1], t[2]);
						},
						quadraticCurveTo: function() {
							var t = arguments;
							this._context.quadraticCurveTo(t[0], t[1], t[2], t[3]);
						},
						restore: function() {
							this._context.restore();
						},
						rotate: function() {
							var t = arguments;
							this._context.rotate(t[0]);
						},
						save: function() {
							this._context.save();
						},
						scale: function() {
							var t = arguments;
							this._context.scale(t[0], t[1]);
						},
						setLineDash: function() {
							var t = arguments,
								e = this._context;
							this._context.setLineDash
								? e.setLineDash(t[0])
								: 'mozDash' in e
								? (e.mozDash = t[0])
								: 'webkitLineDash' in e && (e.webkitLineDash = t[0]);
						},
						getLineDash: function() {
							return this._context.getLineDash();
						},
						setTransform: function() {
							var t = arguments;
							this._context.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]);
						},
						stroke: function() {
							this._context.stroke();
						},
						strokeText: function() {
							var t = arguments;
							this._context.strokeText(t[0], t[1], t[2]);
						},
						transform: function() {
							var t = arguments;
							this._context.transform(t[0], t[1], t[2], t[3], t[4], t[5]);
						},
						translate: function() {
							var t = arguments;
							this._context.translate(t[0], t[1]);
						},
						_enableTrace: function() {
							var e,
								i,
								n = this,
								a = t.length,
								r = Konva.Util._simplifyArray,
								o = this.setAttr,
								s = function(t) {
									var e,
										a = n[t];
									n[t] = function() {
										return (
											(i = r(Array.prototype.slice.call(arguments, 0))),
											(e = a.apply(n, arguments)),
											n._trace({ method: t, args: i }),
											e
										);
									};
								};
							for (e = 0; e < a; e++) s(t[e]);
							n.setAttr = function() {
								o.apply(n, arguments);
								var t = arguments[0],
									e = arguments[1];
								('shadowOffsetX' !== t && 'shadowOffsetY' !== t && 'shadowBlur' !== t) ||
									(e /= this.canvas.getPixelRatio()),
									n._trace({ property: t, val: e });
							};
						},
					}),
					[
						'fillStyle',
						'strokeStyle',
						'shadowColor',
						'shadowBlur',
						'shadowOffsetX',
						'shadowOffsetY',
						'lineCap',
						'lineDashOffset',
						'lineJoin',
						'lineWidth',
						'miterLimit',
						'font',
						'textAlign',
						'textBaseline',
						'globalAlpha',
						'globalCompositeOperation',
					].forEach(function(t) {
						Object.defineProperty(Konva.Context.prototype, t, {
							get: function() {
								return this._context[t];
							},
							set: function(e) {
								this._context[t] = e;
							},
						});
					}),
					(Konva.SceneContext = function(t) {
						Konva.Context.call(this, t);
					}),
					(Konva.SceneContext.prototype = {
						_fillColor: function(t) {
							var e = t.fill();
							this.setAttr('fillStyle', e), t._fillFunc(this);
						},
						_fillPattern: function(t) {
							var e = t.getFillPatternX(),
								i = t.getFillPatternY(),
								n = t.getFillPatternScale(),
								a = Konva.getAngle(t.getFillPatternRotation()),
								r = t.getFillPatternOffset();
							(e || i) && this.translate(e || 0, i || 0),
								a && this.rotate(a),
								n && this.scale(n.x, n.y),
								r && this.translate(-1 * r.x, -1 * r.y),
								this.setAttr(
									'fillStyle',
									this.createPattern(t.getFillPatternImage(), t.getFillPatternRepeat() || 'repeat'),
								),
								this.fill();
						},
						_fillLinearGradient: function(t) {
							var e = t.getFillLinearGradientStartPoint(),
								i = t.getFillLinearGradientEndPoint(),
								n = t.getFillLinearGradientColorStops(),
								a = this.createLinearGradient(e.x, e.y, i.x, i.y);
							if (n) {
								for (var r = 0; r < n.length; r += 2) a.addColorStop(n[r], n[r + 1]);
								this.setAttr('fillStyle', a), t._fillFunc(this);
							}
						},
						_fillRadialGradient: function(t) {
							for (
								var e = t.getFillRadialGradientStartPoint(),
									i = t.getFillRadialGradientEndPoint(),
									n = t.getFillRadialGradientStartRadius(),
									a = t.getFillRadialGradientEndRadius(),
									r = t.getFillRadialGradientColorStops(),
									o = this.createRadialGradient(e.x, e.y, n, i.x, i.y, a),
									s = 0;
								s < r.length;
								s += 2
							)
								o.addColorStop(r[s], r[s + 1]);
							this.setAttr('fillStyle', o), this.fill();
						},
						_fill: function(t) {
							var e = t.fill(),
								i = t.getFillPriority();
							if (e && 'color' === i) this._fillColor(t);
							else {
								var n = t.getFillPatternImage();
								if (n && 'pattern' === i) this._fillPattern(t);
								else {
									var a = t.getFillLinearGradientColorStops();
									if (a && 'linear-gradient' === i) this._fillLinearGradient(t);
									else {
										var r = t.getFillRadialGradientColorStops();
										r && 'radial-gradient' === i
											? this._fillRadialGradient(t)
											: e
											? this._fillColor(t)
											: n
											? this._fillPattern(t)
											: a
											? this._fillLinearGradient(t)
											: r && this._fillRadialGradient(t);
									}
								}
							}
						},
						_strokeLinearGradient: function(t) {
							var e = t.getStrokeLinearGradientStartPoint(),
								i = t.getStrokeLinearGradientEndPoint(),
								n = t.getStrokeLinearGradientColorStops(),
								a = this.createLinearGradient(e.x, e.y, i.x, i.y);
							if (n) {
								for (var r = 0; r < n.length; r += 2) a.addColorStop(n[r], n[r + 1]);
								this.setAttr('strokeStyle', a);
							}
						},
						_stroke: function(t) {
							var e = t.dash(),
								i = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
							t.hasStroke() &&
								(i || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)),
								this._applyLineCap(t),
								e &&
									t.dashEnabled() &&
									(this.setLineDash(e), this.setAttr('lineDashOffset', t.dashOffset())),
								this.setAttr('lineWidth', t.strokeWidth()),
								t.getShadowForStrokeEnabled() || this.setAttr('shadowColor', 'rgba(0,0,0,0)'),
								t.getStrokeLinearGradientColorStops()
									? this._strokeLinearGradient(t)
									: this.setAttr('strokeStyle', t.stroke()),
								t._strokeFunc(this),
								i || this.restore());
						},
						_applyShadow: function(t) {
							var e = Konva.Util,
								i = e.get(t.getShadowRGBA(), 'black'),
								n = e.get(t.getShadowBlur(), 5),
								a = e.get(t.getShadowOffset(), { x: 0, y: 0 }),
								r = t.getAbsoluteScale(),
								o = this.canvas.getPixelRatio(),
								s = r.x * o,
								h = r.y * o;
							this.setAttr('shadowColor', i),
								this.setAttr('shadowBlur', n * Math.min(Math.abs(s), Math.abs(h))),
								this.setAttr('shadowOffsetX', a.x * s),
								this.setAttr('shadowOffsetY', a.y * h);
						},
						_applyGlobalCompositeOperation: function(t) {
							var e = t.getGlobalCompositeOperation();
							'source-over' !== e && this.setAttr('globalCompositeOperation', e);
						},
					}),
					Konva.Util.extend(Konva.SceneContext, Konva.Context),
					(Konva.HitContext = function(t) {
						Konva.Context.call(this, t);
					}),
					(Konva.HitContext.prototype = {
						_fill: function(t) {
							this.save(), this.setAttr('fillStyle', t.colorKey), t._fillFuncHit(this), this.restore();
						},
						_stroke: function(t) {
							if (t.hasStroke() && t.strokeHitEnabled()) {
								var e = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
								e || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)),
									this._applyLineCap(t),
									this.setAttr('lineWidth', t.strokeWidth()),
									this.setAttr('strokeStyle', t.colorKey),
									t._strokeFuncHit(this),
									e || this.restore();
							}
						},
					}),
					Konva.Util.extend(Konva.HitContext, Konva.Context);
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				var t;
				(Konva.Canvas = function(t) {
					this.init(t);
				}),
					(Konva.Canvas.prototype = {
						init: function(e) {
							var i =
								(e || {}).pixelRatio ||
								Konva.pixelRatio ||
								(function() {
									if (t) return t;
									var e = Konva.Util.createCanvasElement().getContext('2d');
									return (t =
										(Konva.window.devicePixelRatio || 1) /
										(e.webkitBackingStorePixelRatio ||
											e.mozBackingStorePixelRatio ||
											e.msBackingStorePixelRatio ||
											e.oBackingStorePixelRatio ||
											e.backingStorePixelRatio ||
											1));
								})();
							(this.pixelRatio = i),
								(this._canvas = Konva.Util.createCanvasElement()),
								(this._canvas.style.padding = 0),
								(this._canvas.style.margin = 0),
								(this._canvas.style.border = 0),
								(this._canvas.style.background = 'transparent'),
								(this._canvas.style.position = 'absolute'),
								(this._canvas.style.top = 0),
								(this._canvas.style.left = 0);
						},
						getContext: function() {
							return this.context;
						},
						getPixelRatio: function() {
							return this.pixelRatio;
						},
						setPixelRatio: function(t) {
							var e = this.pixelRatio;
							(this.pixelRatio = t), this.setSize(this.getWidth() / e, this.getHeight() / e);
						},
						setWidth: function(t) {
							(this.width = this._canvas.width = t * this.pixelRatio),
								(this._canvas.style.width = t + 'px');
							var e = this.pixelRatio;
							this.getContext()._context.scale(e, e);
						},
						setHeight: function(t) {
							(this.height = this._canvas.height = t * this.pixelRatio),
								(this._canvas.style.height = t + 'px');
							var e = this.pixelRatio;
							this.getContext()._context.scale(e, e);
						},
						getWidth: function() {
							return this.width;
						},
						getHeight: function() {
							return this.height;
						},
						setSize: function(t, e) {
							this.setWidth(t), this.setHeight(e);
						},
						toDataURL: function(t, e) {
							try {
								return this._canvas.toDataURL(t, e);
							} catch (t) {
								try {
									return this._canvas.toDataURL();
								} catch (t) {
									return Konva.Util.warn('Unable to get data URL. ' + t.message), '';
								}
							}
						},
					}),
					(Konva.SceneCanvas = function(t) {
						var e = t || {},
							i = e.width || 0,
							n = e.height || 0;
						Konva.Canvas.call(this, e), (this.context = new Konva.SceneContext(this)), this.setSize(i, n);
					}),
					Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas),
					(Konva.HitCanvas = function(t) {
						var e = t || {},
							i = e.width || 0,
							n = e.height || 0;
						Konva.Canvas.call(this, e),
							(this.context = new Konva.HitContext(this)),
							this.setSize(i, n),
							(this.hitCanvas = !0);
					}),
					Konva.Util.extend(Konva.HitCanvas, Konva.Canvas);
			})();
		},
		function(t, e) {
			!(function() {
				'use strict';
				(Konva.Collection = function() {
					var t = [].slice.call(arguments),
						e = t.length,
						i = 0;
					for (this.length = e; i < e; i++) this[i] = t[i];
					return this;
				}),
					(Konva.Collection.prototype = []),
					(Konva.Collection.prototype.each = function(t) {
						for (var e = 0; e < this.length; e++) t(this[e], e);
					}),
					(Konva.Collection.prototype.toArray = function() {
						var t,
							e = [],
							i = this.length;
						for (t = 0; t < i; t++) e.push(this[t]);
						return e;
					}),
					(Konva.Collection.toCollection = function(t) {
						var e,
							i = new Konva.Collection(),
							n = t.length;
						for (e = 0; e < n; e++) i.push(t[e]);
						return i;
					}),
					(Konva.Collection._mapMethod = function(t) {
						Konva.Collection.prototype[t] = function() {
							var e,
								i = this.length,
								n = [].slice.call(arguments);
							for (e = 0; e < i; e++) this[e][t].apply(this[e], n);
							return this;
						};
					}),
					(Konva.Collection.mapMethods = function(t) {
						var e = t.prototype;
						for (var i in e) Konva.Collection._mapMethod(i);
					}),
					(Konva.Transform = function(t) {
						this.m = (t && t.slice()) || [1, 0, 0, 1, 0, 0];
					}),
					(Konva.Transform.prototype = {
						copy: function() {
							return new Konva.Transform(this.m);
						},
						point: function(t) {
							var e = this.m;
							return { x: e[0] * t.x + e[2] * t.y + e[4], y: e[1] * t.x + e[3] * t.y + e[5] };
						},
						translate: function(t, e) {
							return (
								(this.m[4] += this.m[0] * t + this.m[2] * e),
								(this.m[5] += this.m[1] * t + this.m[3] * e),
								this
							);
						},
						scale: function(t, e) {
							return (this.m[0] *= t), (this.m[1] *= t), (this.m[2] *= e), (this.m[3] *= e), this;
						},
						rotate: function(t) {
							var e = Math.cos(t),
								i = Math.sin(t),
								n = this.m[0] * e + this.m[2] * i,
								a = this.m[1] * e + this.m[3] * i,
								r = this.m[0] * -i + this.m[2] * e,
								o = this.m[1] * -i + this.m[3] * e;
							return (this.m[0] = n), (this.m[1] = a), (this.m[2] = r), (this.m[3] = o), this;
						},
						getTranslation: function() {
							return { x: this.m[4], y: this.m[5] };
						},
						skew: function(t, e) {
							var i = this.m[0] + this.m[2] * e,
								n = this.m[1] + this.m[3] * e,
								a = this.m[2] + this.m[0] * t,
								r = this.m[3] + this.m[1] * t;
							return (this.m[0] = i), (this.m[1] = n), (this.m[2] = a), (this.m[3] = r), this;
						},
						multiply: function(t) {
							var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
								i = this.m[1] * t.m[0] + this.m[3] * t.m[1],
								n = this.m[0] * t.m[2] + this.m[2] * t.m[3],
								a = this.m[1] * t.m[2] + this.m[3] * t.m[3],
								r = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
								o = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
							return (
								(this.m[0] = e),
								(this.m[1] = i),
								(this.m[2] = n),
								(this.m[3] = a),
								(this.m[4] = r),
								(this.m[5] = o),
								this
							);
						},
						invert: function() {
							var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
								e = this.m[3] * t,
								i = -this.m[1] * t,
								n = -this.m[2] * t,
								a = this.m[0] * t,
								r = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
								o = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
							return (
								(this.m[0] = e),
								(this.m[1] = i),
								(this.m[2] = n),
								(this.m[3] = a),
								(this.m[4] = r),
								(this.m[5] = o),
								this
							);
						},
						getMatrix: function() {
							return this.m;
						},
						setAbsolutePosition: function(t, e) {
							var i = this.m[0],
								n = this.m[1],
								a = this.m[2],
								r = this.m[3],
								o = this.m[4],
								s = (i * (e - this.m[5]) - n * (t - o)) / (i * r - n * a),
								h = (t - o - a * s) / i;
							return this.translate(h, s);
						},
					});
				var t = Math.PI / 180,
					e = 180 / Math.PI,
					i = {
						aliceblue: [240, 248, 255],
						antiquewhite: [250, 235, 215],
						aqua: [0, 255, 255],
						aquamarine: [127, 255, 212],
						azure: [240, 255, 255],
						beige: [245, 245, 220],
						bisque: [255, 228, 196],
						black: [0, 0, 0],
						blanchedalmond: [255, 235, 205],
						blue: [0, 0, 255],
						blueviolet: [138, 43, 226],
						brown: [165, 42, 42],
						burlywood: [222, 184, 135],
						cadetblue: [95, 158, 160],
						chartreuse: [127, 255, 0],
						chocolate: [210, 105, 30],
						coral: [255, 127, 80],
						cornflowerblue: [100, 149, 237],
						cornsilk: [255, 248, 220],
						crimson: [220, 20, 60],
						cyan: [0, 255, 255],
						darkblue: [0, 0, 139],
						darkcyan: [0, 139, 139],
						darkgoldenrod: [184, 132, 11],
						darkgray: [169, 169, 169],
						darkgreen: [0, 100, 0],
						darkgrey: [169, 169, 169],
						darkkhaki: [189, 183, 107],
						darkmagenta: [139, 0, 139],
						darkolivegreen: [85, 107, 47],
						darkorange: [255, 140, 0],
						darkorchid: [153, 50, 204],
						darkred: [139, 0, 0],
						darksalmon: [233, 150, 122],
						darkseagreen: [143, 188, 143],
						darkslateblue: [72, 61, 139],
						darkslategray: [47, 79, 79],
						darkslategrey: [47, 79, 79],
						darkturquoise: [0, 206, 209],
						darkviolet: [148, 0, 211],
						deeppink: [255, 20, 147],
						deepskyblue: [0, 191, 255],
						dimgray: [105, 105, 105],
						dimgrey: [105, 105, 105],
						dodgerblue: [30, 144, 255],
						firebrick: [178, 34, 34],
						floralwhite: [255, 255, 240],
						forestgreen: [34, 139, 34],
						fuchsia: [255, 0, 255],
						gainsboro: [220, 220, 220],
						ghostwhite: [248, 248, 255],
						gold: [255, 215, 0],
						goldenrod: [218, 165, 32],
						gray: [128, 128, 128],
						green: [0, 128, 0],
						greenyellow: [173, 255, 47],
						grey: [128, 128, 128],
						honeydew: [240, 255, 240],
						hotpink: [255, 105, 180],
						indianred: [205, 92, 92],
						indigo: [75, 0, 130],
						ivory: [255, 255, 240],
						khaki: [240, 230, 140],
						lavender: [230, 230, 250],
						lavenderblush: [255, 240, 245],
						lawngreen: [124, 252, 0],
						lemonchiffon: [255, 250, 205],
						lightblue: [173, 216, 230],
						lightcoral: [240, 128, 128],
						lightcyan: [224, 255, 255],
						lightgoldenrodyellow: [250, 250, 210],
						lightgray: [211, 211, 211],
						lightgreen: [144, 238, 144],
						lightgrey: [211, 211, 211],
						lightpink: [255, 182, 193],
						lightsalmon: [255, 160, 122],
						lightseagreen: [32, 178, 170],
						lightskyblue: [135, 206, 250],
						lightslategray: [119, 136, 153],
						lightslategrey: [119, 136, 153],
						lightsteelblue: [176, 196, 222],
						lightyellow: [255, 255, 224],
						lime: [0, 255, 0],
						limegreen: [50, 205, 50],
						linen: [250, 240, 230],
						magenta: [255, 0, 255],
						maroon: [128, 0, 0],
						mediumaquamarine: [102, 205, 170],
						mediumblue: [0, 0, 205],
						mediumorchid: [186, 85, 211],
						mediumpurple: [147, 112, 219],
						mediumseagreen: [60, 179, 113],
						mediumslateblue: [123, 104, 238],
						mediumspringgreen: [0, 250, 154],
						mediumturquoise: [72, 209, 204],
						mediumvioletred: [199, 21, 133],
						midnightblue: [25, 25, 112],
						mintcream: [245, 255, 250],
						mistyrose: [255, 228, 225],
						moccasin: [255, 228, 181],
						navajowhite: [255, 222, 173],
						navy: [0, 0, 128],
						oldlace: [253, 245, 230],
						olive: [128, 128, 0],
						olivedrab: [107, 142, 35],
						orange: [255, 165, 0],
						orangered: [255, 69, 0],
						orchid: [218, 112, 214],
						palegoldenrod: [238, 232, 170],
						palegreen: [152, 251, 152],
						paleturquoise: [175, 238, 238],
						palevioletred: [219, 112, 147],
						papayawhip: [255, 239, 213],
						peachpuff: [255, 218, 185],
						peru: [205, 133, 63],
						pink: [255, 192, 203],
						plum: [221, 160, 203],
						powderblue: [176, 224, 230],
						purple: [128, 0, 128],
						rebeccapurple: [102, 51, 153],
						red: [255, 0, 0],
						rosybrown: [188, 143, 143],
						royalblue: [65, 105, 225],
						saddlebrown: [139, 69, 19],
						salmon: [250, 128, 114],
						sandybrown: [244, 164, 96],
						seagreen: [46, 139, 87],
						seashell: [255, 245, 238],
						sienna: [160, 82, 45],
						silver: [192, 192, 192],
						skyblue: [135, 206, 235],
						slateblue: [106, 90, 205],
						slategray: [119, 128, 144],
						slategrey: [119, 128, 144],
						snow: [255, 255, 250],
						springgreen: [0, 255, 127],
						steelblue: [70, 130, 180],
						tan: [210, 180, 140],
						teal: [0, 128, 128],
						thistle: [216, 191, 216],
						transparent: [255, 255, 255, 0],
						tomato: [255, 99, 71],
						turquoise: [64, 224, 208],
						violet: [238, 130, 238],
						wheat: [245, 222, 179],
						white: [255, 255, 255],
						whitesmoke: [245, 245, 245],
						yellow: [255, 255, 0],
						yellowgreen: [154, 205, 5],
					},
					n = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
				Konva.Util = {
					_isElement: function(t) {
						return !(!t || 1 != t.nodeType);
					},
					_isFunction: function(t) {
						return !!(t && t.constructor && t.call && t.apply);
					},
					_isObject: function(t) {
						return !!t && t.constructor === Object;
					},
					_isArray: function(t) {
						return '[object Array]' === Object.prototype.toString.call(t);
					},
					_isNumber: function(t) {
						return '[object Number]' === Object.prototype.toString.call(t) && !isNaN(t) && isFinite(t);
					},
					_isString: function(t) {
						return '[object String]' === Object.prototype.toString.call(t);
					},
					_isBoolean: function(t) {
						return '[object Boolean]' === Object.prototype.toString.call(t);
					},
					isObject: function(t) {
						return t instanceof Object;
					},
					isValidSelector: function(t) {
						if ('string' != typeof t) return !1;
						var e = t[0];
						return '#' === e || '.' === e || e === e.toUpperCase();
					},
					_sign: function(t) {
						return 0 === t ? 0 : t > 0 ? 1 : -1;
					},
					createCanvasElement: function() {
						var t = Konva.isBrowser ? Konva.document.createElement('canvas') : new Konva._nodeCanvas();
						try {
							t.style = t.style || {};
						} catch (t) {}
						return t;
					},
					_isInDocument: function(t) {
						for (; (t = t.parentNode); ) if (t == Konva.document) return !0;
						return !1;
					},
					_simplifyArray: function(t) {
						var e,
							i,
							n = [],
							a = t.length,
							r = Konva.Util;
						for (e = 0; e < a; e++)
							(i = t[e]),
								r._isNumber(i) ? (i = Math.round(1e3 * i) / 1e3) : r._isString(i) || (i = i.toString()),
								n.push(i);
						return n;
					},
					_getImage: function(t, e) {
						var i, n;
						t
							? this._isElement(t)
								? e(t)
								: this._isString(t)
								? (((i = new Konva.window.Image()).onload = function() {
										e(i);
								  }),
								  (i.src = t))
								: t.data
								? (((n = Konva.Util.createCanvasElement()).width = t.width),
								  (n.height = t.height),
								  n.getContext('2d').putImageData(t, 0, 0),
								  this._getImage(n.toDataURL(), e))
								: e(null)
							: e(null);
					},
					_getRGBAString: function(t) {
						return ['rgba(', t.red || 0, ',', t.green || 0, ',', t.blue || 0, ',', t.alpha || 1, ')'].join(
							'',
						);
					},
					_rgbToHex: function(t, e, i) {
						return ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1);
					},
					_hexToRgb: function(t) {
						t = t.replace('#', '');
						var e = parseInt(t, 16);
						return { r: (e >> 16) & 255, g: (e >> 8) & 255, b: 255 & e };
					},
					getRandomColor: function() {
						for (var t = ((16777215 * Math.random()) << 0).toString(16); t.length < 6; ) t = '0' + t;
						return '#' + t;
					},
					get: function(t, e) {
						return void 0 === t ? e : t;
					},
					getRGB: function(t) {
						var e;
						return t in i
							? { r: (e = i[t])[0], g: e[1], b: e[2] }
							: '#' === t[0]
							? this._hexToRgb(t.substring(1))
							: 'rgb(' === t.substr(0, 4)
							? ((e = n.exec(t.replace(/ /g, ''))),
							  { r: parseInt(e[1], 10), g: parseInt(e[2], 10), b: parseInt(e[3], 10) })
							: { r: 0, g: 0, b: 0 };
					},
					colorToRGBA: function(t) {
						return (
							(t = t || 'black'),
							Konva.Util._namedColorToRBA(t) ||
								Konva.Util._hex3ColorToRGBA(t) ||
								Konva.Util._hex6ColorToRGBA(t) ||
								Konva.Util._rgbColorToRGBA(t) ||
								Konva.Util._rgbaColorToRGBA(t)
						);
					},
					_namedColorToRBA: function(t) {
						var e = i[t.toLowerCase()];
						return e ? { r: e[0], g: e[1], b: e[2], a: 1 } : null;
					},
					_rgbColorToRGBA: function(t) {
						if (0 === t.indexOf('rgb(')) {
							var e = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
							return { r: e[0], g: e[1], b: e[2], a: 1 };
						}
					},
					_rgbaColorToRGBA: function(t) {
						if (0 === t.indexOf('rgba(')) {
							var e = (t = t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
							return { r: e[0], g: e[1], b: e[2], a: e[3] };
						}
					},
					_hex6ColorToRGBA: function(t) {
						if ('#' === t[0] && 7 === t.length)
							return {
								r: parseInt(t.slice(1, 3), 16),
								g: parseInt(t.slice(3, 5), 16),
								b: parseInt(t.slice(5, 7), 16),
								a: 1,
							};
					},
					_hex3ColorToRGBA: function(t) {
						if ('#' === t[0] && 4 === t.length)
							return {
								r: parseInt(t[1] + t[1], 16),
								g: parseInt(t[2] + t[2], 16),
								b: parseInt(t[3] + t[3], 16),
								a: 1,
							};
					},
					_merge: function(t, e) {
						var i = this._clone(e);
						for (var n in t) this._isObject(t[n]) ? (i[n] = this._merge(t[n], i[n])) : (i[n] = t[n]);
						return i;
					},
					trimRight: function(t) {
						return t.replace(/\s+$/, '');
					},
					trimLeft: function(t) {
						return t.replace(/^\s+/, '');
					},
					haveIntersection: function(t, e) {
						return !(
							e.x > t.x + t.width ||
							e.x + e.width < t.x ||
							e.y > t.y + t.height ||
							e.y + e.height < t.y
						);
					},
					cloneObject: function(t) {
						var e = {};
						for (var i in t)
							this._isObject(t[i])
								? (e[i] = this.cloneObject(t[i]))
								: this._isArray(t[i])
								? (e[i] = this.cloneArray(t[i]))
								: (e[i] = t[i]);
						return e;
					},
					cloneArray: function(t) {
						return t.slice(0);
					},
					_degToRad: function(e) {
						return e * t;
					},
					_radToDeg: function(t) {
						return t * e;
					},
					_capitalize: function(t) {
						return t.charAt(0).toUpperCase() + t.slice(1);
					},
					throw: function(t) {
						throw new Error('Konva error: ' + t);
					},
					error: function(t) {
						console.error('Konva error: ' + t);
					},
					warn: function(t) {
						Konva.global.console &&
							console.warn &&
							Konva.showWarnings &&
							console.warn('Konva warning: ' + t);
					},
					extend: function(t, e) {
						function i() {
							this.constructor = t;
						}
						i.prototype = e.prototype;
						var n = t.prototype;
						for (var a in ((t.prototype = new i()), n)) n.hasOwnProperty(a) && (t.prototype[a] = n[a]);
						(t.__super__ = e.prototype), (t.super = e);
					},
					addMethods: function(t, e) {
						var i;
						for (i in e) t.prototype[i] = e[i];
					},
					_getControlPoints: function(t, e, i, n, a, r, o) {
						var s = Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - e, 2)),
							h = Math.sqrt(Math.pow(a - i, 2) + Math.pow(r - n, 2)),
							l = (o * s) / (s + h),
							c = (o * h) / (s + h);
						return [i - l * (a - t), n - l * (r - e), i + c * (a - t), n + c * (r - e)];
					},
					_expandPoints: function(t, e) {
						var i,
							n,
							a = t.length,
							r = [];
						for (i = 2; i < a - 2; i += 2)
							(n = Konva.Util._getControlPoints(
								t[i - 2],
								t[i - 1],
								t[i],
								t[i + 1],
								t[i + 2],
								t[i + 3],
								e,
							)),
								r.push(n[0]),
								r.push(n[1]),
								r.push(t[i]),
								r.push(t[i + 1]),
								r.push(n[2]),
								r.push(n[3]);
						return r;
					},
					_removeLastLetter: function(t) {
						return t.substring(0, t.length - 1);
					},
					each: function(t, e) {
						for (var i in t) e(i, t[i]);
					},
					_inRange: function(t, e, i) {
						return e <= t && t < i;
					},
					_getProjectionToSegment: function(t, e, i, n, a, r) {
						var o,
							s,
							h,
							l = (t - i) * (t - i) + (e - n) * (e - n);
						if (0 == l) (o = t), (s = e), (h = (a - i) * (a - i) + (r - n) * (r - n));
						else {
							var c = ((a - t) * (i - t) + (r - e) * (n - e)) / l;
							c < 0
								? ((o = t), (s = e), (h = (t - a) * (t - a) + (e - r) * (e - r)))
								: c > 1
								? ((o = i), (s = n), (h = (i - a) * (i - a) + (n - r) * (n - r)))
								: (h = ((o = t + c * (i - t)) - a) * (o - a) + ((s = e + c * (n - e)) - r) * (s - r));
						}
						return [o, s, h];
					},
					_getProjectionToLine: function(t, e, i) {
						var n = Konva.Util.cloneObject(t),
							a = Number.MAX_VALUE;
						return (
							e.forEach(function(r, o) {
								if (i || o !== e.length - 1) {
									var s = e[(o + 1) % e.length],
										h = Konva.Util._getProjectionToSegment(r.x, r.y, s.x, s.y, t.x, t.y),
										l = h[0],
										c = h[1],
										d = h[2];
									d < a && ((n.x = l), (n.y = c), (a = d));
								}
							}),
							n
						);
					},
					_prepareArrayForTween: function(t, e, i) {
						var n,
							a = [],
							r = [];
						if (t.length > e.length) {
							var o = e;
							(e = t), (t = o);
						}
						for (n = 0; n < t.length; n += 2) a.push({ x: t[n], y: t[n + 1] });
						for (n = 0; n < e.length; n += 2) r.push({ x: e[n], y: e[n + 1] });
						var s = [];
						return (
							r.forEach(function(t) {
								var e = Konva.Util._getProjectionToLine(t, a, i);
								s.push(e.x), s.push(e.y);
							}),
							s
						);
					},
					_prepareToStringify: function(t) {
						var e;
						for (var i in ((t.visitedByCircularReferenceRemoval = !0), t))
							if (t.hasOwnProperty(i) && t[i] && 'object' == typeof t[i])
								if (
									((e = Object.getOwnPropertyDescriptor(t, i)),
									t[i].visitedByCircularReferenceRemoval || Konva.Util._isElement(t[i]))
								) {
									if (!e.configurable) return null;
									delete t[i];
								} else if (null === Konva.Util._prepareToStringify(t[i])) {
									if (!e.configurable) return null;
									delete t[i];
								}
						return delete t.visitedByCircularReferenceRemoval, t;
					},
				};
			})();
		},
		function(t, e) {
			var i;
			i = (function() {
				return this;
			})();
			try {
				i = i || Function('return this')() || (0, eval)('this');
			} catch (t) {
				'object' == typeof window && (i = window);
			}
			t.exports = i;
		},
		function(t, e, i) {
			(function(e) {
				/*
				 * Konva JavaScript Framework v@@version
				 * http://konvajs.github.io/
				 * Licensed under the MIT
				 * Date: @@date
				 *
				 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
				 * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
				 *
				 * @license
				 */
				!(function() {
					'use strict';
					var i = Math.PI / 180,
						n = {
							version: '@@version',
							stages: [],
							idCounter: 0,
							ids: {},
							names: {},
							shapes: {},
							listenClickTap: !1,
							inDblClickWindow: !1,
							isBrowser:
								'undefined' != typeof window &&
								('[object Window]' === {}.toString.call(window) ||
									'[object global]' === {}.toString.call(window)),
							isUnminified: /comment/.test(function() {}),
							enableTrace: !1,
							traceArrMax: 100,
							dblClickWindow: 400,
							pixelRatio: void 0,
							dragDistance: 3,
							angleDeg: !0,
							showWarnings: !0,
							Filters: {},
							isDragging: function() {
								var t = n.DD;
								return !!t && t.isDragging;
							},
							isDragReady: function() {
								var t = n.DD;
								return !!t && !!t.node;
							},
							_addId: function(t, e) {
								e && (this.ids[e] = t);
							},
							_removeId: function(t) {
								void 0 !== t && delete this.ids[t];
							},
							_addName: function(t, e) {
								e && (this.names[e] || (this.names[e] = []), this.names[e].push(t));
							},
							_removeName: function(t, e) {
								if (t) {
									var i = this.names[t];
									if (i) {
										for (var n = 0; n < i.length; n++) i[n]._id === e && i.splice(n, 1);
										0 === i.length && delete this.names[t];
									}
								}
							},
							getAngle: function(t) {
								return this.angleDeg ? t * i : t;
							},
							_detectIE: function(t) {
								var e = t.indexOf('msie ');
								if (e > 0) return parseInt(t.substring(e + 5, t.indexOf('.', e)), 10);
								if (t.indexOf('trident/') > 0) {
									var i = t.indexOf('rv:');
									return parseInt(t.substring(i + 3, t.indexOf('.', i)), 10);
								}
								var n = t.indexOf('edge/');
								return n > 0 && parseInt(t.substring(n + 5, t.indexOf('.', n)), 10);
							},
							_parseUA: function(t) {
								var e = t.toLowerCase(),
									i =
										/(chrome)[ /]([\w.]+)/.exec(e) ||
										/(webkit)[ /]([\w.]+)/.exec(e) ||
										/(opera)(?:.*version|)[ /]([\w.]+)/.exec(e) ||
										/(msie) ([\w.]+)/.exec(e) ||
										(e.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
										[],
									a = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
									r = !!t.match(/IEMobile/i);
								return {
									browser: i[1] || '',
									version: i[2] || '0',
									isIE: n._detectIE(e),
									mobile: a,
									ieMobile: r,
								};
							},
							UA: void 0,
						},
						a =
							void 0 !== e
								? e
								: 'undefined' != typeof window
								? window
								: 'undefined' != typeof WorkerGlobalScope
								? self
								: {};
					(n.UA = n._parseUA((a.navigator && a.navigator.userAgent) || '')),
						a.Konva &&
							console.error(
								'Konva instance is already exist in current eviroment. Please use only one instance.',
							),
						(a.Konva = n),
						(n.global = a),
						(n.window = a),
						(n.document = a.document),
						(t.exports = n);
				})();
			}.call(this, i(20)));
		},
		function(t, e, i) {
			'use strict';
			i.r(e);
			var n = i(0),
				a = i.n(n),
				r = i(1),
				o = i.n(r);
			function s(t) {
				return (s =
					'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
						? function(t) {
								return typeof t;
						  }
						: function(t) {
								return t &&
									'function' == typeof Symbol &&
									t.constructor === Symbol &&
									t !== Symbol.prototype
									? 'symbol'
									: typeof t;
						  })(t);
			}
			function h(t) {
				for (var e = 1; e < arguments.length; e++) {
					var i = null != arguments[e] ? arguments[e] : {},
						n = Object.keys(i);
					'function' == typeof Object.getOwnPropertySymbols &&
						(n = n.concat(
							Object.getOwnPropertySymbols(i).filter(function(t) {
								return Object.getOwnPropertyDescriptor(i, t).enumerable;
							}),
						)),
						n.forEach(function(e) {
							f(t, e, i[e]);
						});
				}
				return t;
			}
			function l(t, e) {
				for (var i = 0; i < e.length; i++) {
					var n = e[i];
					(n.enumerable = n.enumerable || !1),
						(n.configurable = !0),
						'value' in n && (n.writable = !0),
						Object.defineProperty(t, n.key, n);
				}
			}
			function c(t) {
				return (c = Object.setPrototypeOf
					? Object.getPrototypeOf
					: function(t) {
							return t.__proto__ || Object.getPrototypeOf(t);
					  })(t);
			}
			function d(t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t;
			}
			function u(t, e) {
				return (u =
					Object.setPrototypeOf ||
					function(t, e) {
						return (t.__proto__ = e), t;
					})(t, e);
			}
			function f(t, e, i) {
				return (
					e in t
						? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
						: (t[e] = i),
					t
				);
			}
			i(7), i(6), i(5), i(4), i(3), i(2);
			var g = (function(t) {
				function e(t) {
					var i, n;
					!(function(t, e) {
						if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
					})(this, e);
					var a = (i =
							!(n = c(e).call(this, t)) || ('object' !== s(n) && 'function' != typeof n)
								? d(this)
								: n).generateHash('avatar_container'),
						r = i.generateHash('avatar_loader');
					return (
						(i.onFileLoad = i.onFileLoad.bind(d(i))),
						(i.onCloseClick = i.onCloseClick.bind(d(i))),
						(i.state = {
							imgWidth: 0,
							imgHeight: 0,
							scale: 1,
							containerId: a,
							loaderId: r,
							lastMouseY: 0,
							showLoader: !(i.props.src || i.props.img),
						}),
						i
					);
				}
				var i, n;
				return (
					(function(t, e) {
						if ('function' != typeof e && null !== e)
							throw new TypeError('Super expression must either be null or a function');
						(t.prototype = Object.create(e && e.prototype, {
							constructor: { value: t, writable: !0, configurable: !0 },
						})),
							e && u(t, e);
					})(e, a.a.Component),
					(i = e),
					(n = [
						{
							key: 'generateHash',
							value: function(t) {
								var e = function() {
									return Math.floor(65536 * (1 + Math.random()))
										.toString(16)
										.substring(1);
								};
								return t + '-' + e() + '-' + e() + '-' + e();
							},
						},
						{
							key: 'onCloseCallback',
							value: function() {
								this.props.onClose();
							},
						},
						{
							key: 'onCropCallback',
							value: function(t) {
								this.props.onCrop(t);
							},
						},
						{
							key: 'onFileLoadCallback',
							value: function(t) {
								this.props.onFileLoad(t);
							},
						},
						{
							key: 'onBeforeFileLoadCallback',
							value: function(t) {
								this.props.onBeforeFileLoad(t);
							},
						},
						{
							key: 'onImageLoadCallback',
							value: function(t) {
								this.props.onImageLoad(t);
							},
						},
						{
							key: 'componentDidMount',
							value: function() {
								var t = this;
								if (!this.state.showLoader) {
									var e = this.props.img || new Image();
									!this.props.img && this.props.src && (e.src = this.props.src),
										this.setState({ image: e }, function() {
											if (t.image.complete) return t.init();
											t.image.onload = function() {
												t.onImageLoadCallback(t.image), t.init();
											};
										});
								}
							},
						},
						{
							key: 'onFileLoad',
							value: function(t) {
								if ((t.preventDefault(), this.onBeforeFileLoadCallback(t), t.target.value)) {
									var e = new FileReader(),
										i = t.target.files[0];
									this.onFileLoadCallback(i);
									var n = new Image(),
										a = this;
									(e.onloadend = function() {
										(n.src = e.result),
											a.setState({ image: n, file: i, showLoader: !1 }, function() {
												if (a.image.complete) return a.init();
												a.image.onload = function() {
													return a.init();
												};
											});
									}),
										e.readAsDataURL(i);
								}
							},
						},
						{
							key: 'onCloseClick',
							value: function() {
								var t = this;
								this.setState({ showLoader: !0 }, function() {
									return t.onCloseCallback();
								});
							},
						},
						{
							key: 'init',
							value: function() {
								var t,
									e,
									i = this.props,
									n = i.height,
									a = i.minCropRadius,
									r = i.cropRadius,
									o = this.image.width,
									s = this.image.height,
									h = s / o,
									l = this.props,
									c = l.imageWidth,
									d = l.imageHeight;
								d &&
									c &&
									console.warn(
										'The imageWidth and imageHeight properties can not be set together, using only imageWidth.',
									),
									d && !c
										? (e = (t = d || s) / h)
										: c
										? (t = (e = c) * h || s)
										: (e = (t = n || s) / h);
								var u = t / s,
									f = Math.max(a, r || Math.min(e, t) / 3);
								this.setState({ imgWidth: e, imgHeight: t, scale: u, cropRadius: f }, this.initCanvas);
							},
						},
						{
							key: 'initCanvas',
							value: function() {
								var t = this,
									e = this.initStage(),
									i = this.initBackground(),
									n = this.initShading(),
									a = this.initCrop(),
									r = this.initCropStroke(),
									s = this.initResize(),
									h = this.initResizeIcon(),
									l = new o.a.Layer();
								l.add(i), l.add(n), l.add(r), l.add(a), l.add(s), l.add(h), e.add(l);
								var c = function() {
										var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
										return a.radius() - t;
									},
									d = function(t) {
										return a.x() - c(t) < 0;
									},
									u = function(t) {
										return a.y() - c(t) < 0;
									},
									f = function(t) {
										return a.x() + c(t) > e.width();
									},
									g = function(t) {
										return a.y() + c(t) > e.height();
									},
									v = function(e) {
										return c(e) >= t.minCropRadius ? e : a.radius() - t.minCropRadius;
									},
									p = function(t) {
										return t + 0.86 * a.radius();
									},
									m = function(t) {
										return t - 0.5 * a.radius();
									},
									y = function(t, e) {
										s.x(p(t) - 8), s.y(m(e) - 8), h.x(p(t) - 8), h.y(m(e) - 10);
									},
									_ = function() {
										return a.toDataURL({
											x: a.x() - a.radius(),
											y: a.y() - a.radius(),
											width: 2 * a.radius(),
											height: 2 * a.radius(),
										});
									},
									b = function(t) {
										var e =
											t > 0 ||
											(function(t) {
												return !(d(t) || f(t) || g(t) || u(t));
											})(t)
												? t
												: 0;
										r.radius(r.radius() - v(e)), a.radius(a.radius() - v(e)), s.fire('resize');
									};
								this.onCropCallback(_()),
									a.on('dragmove', function() {
										return a.fire('resize');
									}),
									a.on('dragend', function() {
										return t.onCropCallback(_());
									}),
									a.on('resize', function() {
										var i = d() ? a.radius() + 1 : f() ? e.width() - a.radius() - 1 : a.x(),
											n = u() ? a.radius() + 1 : g() ? e.height() - a.radius() - 1 : a.y();
										y(i, n),
											a.setFillPatternOffset({ x: i / t.scale, y: n / t.scale }),
											a.x(i),
											r.x(i),
											a.y(n),
											r.y(n);
									}),
									a.on('mouseenter', function() {
										return (e.container().style.cursor = 'move');
									}),
									a.on('mouseleave', function() {
										return (e.container().style.cursor = 'default');
									}),
									a.on('dragstart', function() {
										return (e.container().style.cursor = 'move');
									}),
									a.on('dragend', function() {
										return (e.container().style.cursor = 'default');
									}),
									s.on('touchstart', function(e) {
										s.on('dragmove', function(i) {
											if ('touchmove' === i.evt.type) {
												var n =
													i.evt.changedTouches[0].pageY - e.evt.changedTouches[0].pageY || 0;
												b(n * t.mobileScaleSpeed);
											}
										});
									}),
									s.on('dragmove', function(e) {
										if ('touchmove' !== e.evt.type) {
											var i = e.evt.y,
												n = i ? i - t.state.lastMouseY : void 0,
												a = e.evt.movementY || n || 0;
											t.setState({ lastMouseY: i }), b(a);
										}
									}),
									s.on('dragend', function() {
										return t.onCropCallback(_());
									}),
									s.on('resize', function() {
										return y(a.x(), a.y());
									}),
									s.on('mouseenter', function() {
										return (e.container().style.cursor = 'nesw-resize');
									}),
									s.on('mouseleave', function() {
										return (e.container().style.cursor = 'default');
									}),
									s.on('dragstart', function(i) {
										t.setState({ lastMouseY: i.evt.y }),
											(e.container().style.cursor = 'nesw-resize');
									}),
									s.on('dragend', function() {
										return (e.container().style.cursor = 'default');
									});
							},
						},
						{
							key: 'initStage',
							value: function() {
								return new o.a.Stage({
									container: this.containerId,
									width: this.width,
									height: this.height,
								});
							},
						},
						{
							key: 'initBackground',
							value: function() {
								return new o.a.Image({
									x: 0,
									y: 0,
									width: this.width,
									height: this.height,
									image: this.image,
								});
							},
						},
						{
							key: 'initShading',
							value: function() {
								return new o.a.Rect({
									x: 0,
									y: 0,
									width: this.width,
									height: this.height,
									fill: this.shadingColor,
									strokeWidth: 4,
									opacity: this.shadingOpacity,
								});
							},
						},
						{
							key: 'initCrop',
							value: function() {
								return new o.a.Circle({
									x: this.halfWidth,
									y: this.halfHeight,
									radius: this.cropRadius,
									fillPatternImage: this.image,
									fillPatternOffset: {
										x: this.halfWidth / this.scale,
										y: this.halfHeight / this.scale,
									},
									fillPatternScale: { x: this.scale, y: this.scale },
									opacity: 1,
									draggable: !0,
									dashEnabled: !0,
									dash: [10, 5],
								});
							},
						},
						{
							key: 'initCropStroke',
							value: function() {
								return new o.a.Circle({
									x: this.halfWidth,
									y: this.halfHeight,
									radius: this.cropRadius,
									stroke: this.cropColor,
									strokeWidth: this.lineWidth,
									strokeScaleEnabled: !0,
									dashEnabled: !0,
									dash: [10, 5],
								});
							},
						},
						{
							key: 'initResize',
							value: function() {
								return new o.a.Rect({
									x: this.halfWidth + 0.86 * this.cropRadius - 8,
									y: this.halfHeight + -0.5 * this.cropRadius - 8,
									width: 16,
									height: 16,
									draggable: !0,
									dragBoundFunc: function(t) {
										return { x: this.getAbsolutePosition().x, y: t.y };
									},
								});
							},
						},
						{
							key: 'initResizeIcon',
							value: function() {
								return new o.a.Path({
									x: this.halfWidth + 0.86 * this.cropRadius - 8,
									y: this.halfHeight + -0.5 * this.cropRadius - 10,
									data:
										'M47.624,0.124l12.021,9.73L44.5,24.5l10,10l14.661-15.161l9.963,12.285v-31.5H47.624z M24.5,44.5   L9.847,59.653L0,47.5V79h31.5l-12.153-9.847L34.5,54.5L24.5,44.5z',
									fill: this.cropColor,
									scale: { x: 0.2, y: 0.2 },
								});
							},
						},
						{
							key: 'render',
							value: function() {
								var t = this,
									e = this.props,
									i = e.width,
									n = e.height,
									r = {
										display: 'flex',
										justifyContent: 'center',
										backgroundColor: this.backgroundColor,
										width: i || this.width,
										position: 'relative',
									},
									o = this.props.label,
									s = h({}, this.props.labelStyle, { lineHeight: (n || 200) + 'px' }),
									l = h({}, this.props.borderStyle, { width: i || 200, height: n || 200 });
								return a.a.createElement(
									'div',
									null,
									this.state.showLoader
										? a.a.createElement(
												'div',
												{ style: l },
												a.a.createElement('input', {
													onChange: function(e) {
														return t.onFileLoad(e);
													},
													name: this.loaderId,
													type: 'file',
													id: this.loaderId,
													style: {
														width: 0.1,
														height: 0.1,
														opacity: 0,
														overflow: 'hidden',
														position: 'absolute',
														zIndex: -1,
													},
													accept: this.mimeTypes,
												}),
												a.a.createElement('label', { htmlFor: this.loaderId, style: s }, o),
										  )
										: a.a.createElement(
												'div',
												{ style: r },
												a.a.createElement(
													'svg',
													{
														onClick: this.onCloseClick,
														style: {
															position: 'absolute',
															zIndex: 999,
															cursor: 'pointer',
															left: '10px',
															top: '10px',
														},
														viewBox: '0 0 475.2 475.2',
														width: '20px',
														height: '20px',
													},
													a.a.createElement(
														'g',
														null,
														a.a.createElement('path', {
															d:
																'M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6    s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7    s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7    C468.6,170.8,468.6,304.4,386.5,386.5z',
															fill: this.closeIconColor,
														}),
														a.a.createElement('path', {
															d:
																'M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1    l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4    c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z',
															fill: this.closeIconColor,
														}),
													),
												),
												a.a.createElement('div', { id: this.containerId }),
										  ),
								);
							},
						},
						{
							key: 'lineWidth',
							get: function() {
								return this.props.lineWidth;
							},
						},
						{
							key: 'containerId',
							get: function() {
								return this.state.containerId;
							},
						},
						{
							key: 'closeIconColor',
							get: function() {
								return this.props.closeIconColor;
							},
						},
						{
							key: 'cropColor',
							get: function() {
								return this.props.cropColor;
							},
						},
						{
							key: 'loaderId',
							get: function() {
								return this.state.loaderId;
							},
						},
						{
							key: 'mimeTypes',
							get: function() {
								return this.props.mimeTypes;
							},
						},
						{
							key: 'backgroundColor',
							get: function() {
								return this.props.backgroundColor;
							},
						},
						{
							key: 'shadingColor',
							get: function() {
								return this.props.shadingColor;
							},
						},
						{
							key: 'shadingOpacity',
							get: function() {
								return this.props.shadingOpacity;
							},
						},
						{
							key: 'mobileScaleSpeed',
							get: function() {
								return this.props.mobileScaleSpeed;
							},
						},
						{
							key: 'cropRadius',
							get: function() {
								return this.state.cropRadius;
							},
						},
						{
							key: 'minCropRadius',
							get: function() {
								return this.props.minCropRadius;
							},
						},
						{
							key: 'scale',
							get: function() {
								return this.state.scale;
							},
						},
						{
							key: 'width',
							get: function() {
								return this.state.imgWidth;
							},
						},
						{
							key: 'halfWidth',
							get: function() {
								return this.state.imgWidth / 2;
							},
						},
						{
							key: 'height',
							get: function() {
								return this.state.imgHeight;
							},
						},
						{
							key: 'halfHeight',
							get: function() {
								return this.state.imgHeight / 2;
							},
						},
						{
							key: 'image',
							get: function() {
								return this.state.image;
							},
						},
					]) && l(i.prototype, n),
					e
				);
			})();
			f(g, 'defaultProps', {
				shadingColor: 'grey',
				shadingOpacity: 0.6,
				cropColor: 'white',
				closeIconColor: 'white',
				lineWidth: 4,
				minCropRadius: 30,
				backgroundColor: 'grey',
				mimeTypes: 'image/jpeg,image/png',
				mobileScaleSpeed: 0.5,
				onClose: function() {},
				onCrop: function() {},
				onFileLoad: function() {},
				onImageLoad: function() {},
				onBeforeFileLoad: function() {},
				label: 'Choose a file',
				labelStyle: {
					fontSize: '1.25em',
					fontWeight: '700',
					color: 'black',
					display: 'inline-block',
					fontFamily: 'sans-serif',
					cursor: 'pointer',
				},
				borderStyle: {
					border: '2px solid #979797',
					borderStyle: 'dashed',
					borderRadius: '8px',
					textAlign: 'center',
				},
			}),
				(e.default = g);
		},
	]);
});
