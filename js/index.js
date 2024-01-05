const xi = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver(s => {
    for (const r of s) if (r.type === "childList") for (const o of r.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
  }).observe(document, {childList: !0, subtree: !0});

  function n(s) {
    const r = {};
    return s.integrity && (r.integrity = s.integrity), s.referrerpolicy && (r.referrerPolicy = s.referrerpolicy), s.crossorigin === "use-credentials" ? r.credentials = "include" : s.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
  }

  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r)
  }
};
xi();

function xn(e, t) {
  const n = Object.create(null), i = e.split(",");
  for (let s = 0; s < i.length; s++) n[i[s]] = !0;
  return t ? s => !!n[s.toLowerCase()] : s => !!n[s]
}

const wi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ci = xn(wi);

function ys(e) {
  return !!e || e === ""
}

function wn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], s = q(i) ? Ti(i) : wn(i);
      if (s) for (const r in s) t[r] = s[r]
    }
    return t
  } else {
    if (q(e)) return e;
    if (J(e)) return e
  }
}

const Mi = /;(?![^(]*\))/g, Ei = /:(.+)/;

function Ti(e) {
  const t = {};
  return e.split(Mi).forEach(n => {
    if (n) {
      const i = n.split(Ei);
      i.length > 1 && (t[i[0].trim()] = i[1].trim())
    }
  }), t
}

function tt(e) {
  let t = "";
  if (q(e)) t = e; else if (A(e)) for (let n = 0; n < e.length; n++) {
    const i = tt(e[n]);
    i && (t += i + " ")
  } else if (J(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim()
}

const xt = e => q(e) ? e : e == null ? "" : A(e) || J(e) && (e.toString === Ms || !F(e.toString)) ? JSON.stringify(e, xs, 2) : String(e),
  xs = (e, t) => t && t.__v_isRef ? xs(e, t.value) : st(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [i, s]) => (n[`${i} =>`] = s, n), {})} : ws(t) ? {[`Set(${t.size})`]: [...t.values()]} : J(t) && !A(t) && !Es(t) ? String(t) : t,
  U = {}, nt = [], me = () => {
  }, Oi = () => !1, Ai = /^on[^a-z]/, Ht = e => Ai.test(e), Cn = e => e.startsWith("onUpdate:"), G = Object.assign,
  Mn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
  }, Fi = Object.prototype.hasOwnProperty, P = (e, t) => Fi.call(e, t), A = Array.isArray,
  st = e => jt(e) === "[object Map]", ws = e => jt(e) === "[object Set]", F = e => typeof e == "function",
  q = e => typeof e == "string", En = e => typeof e == "symbol", J = e => e !== null && typeof e == "object",
  Cs = e => J(e) && F(e.then) && F(e.catch), Ms = Object.prototype.toString, jt = e => Ms.call(e),
  Ii = e => jt(e).slice(8, -1), Es = e => jt(e) === "[object Object]",
  Tn = e => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  At = xn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  Bt = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
  }, Pi = /-(\w)/g, rt = Bt(e => e.replace(Pi, (t, n) => n ? n.toUpperCase() : "")), Si = /\B([A-Z])/g,
  lt = Bt(e => e.replace(Si, "-$1").toLowerCase()), Ts = Bt(e => e.charAt(0).toUpperCase() + e.slice(1)),
  Zt = Bt(e => e ? `on${Ts(e)}` : ""), It = (e, t) => !Object.is(e, t), Xt = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  }, Pt = (e, t, n) => {
    Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
  }, Li = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
  };
let Jn;
const Ni = () => Jn || (Jn = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let ye;

class Ri {
  constructor(t = !1) {
    this.active = !0, this.effects = [], this.cleanups = [], !t && ye && (this.parent = ye, this.index = (ye.scopes || (ye.scopes = [])).push(this) - 1)
  }

  run(t) {
    if (this.active) {
      const n = ye;
      try {
        return ye = this, t()
      } finally {
        ye = n
      }
    }
  }

  on() {
    ye = this
  }

  off() {
    ye = this.parent
  }

  stop(t) {
    if (this.active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
      if (this.scopes) for (n = 0, i = this.scopes.length; n < i; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
      }
      this.active = !1
    }
  }
}

function ki(e, t = ye) {
  t && t.active && t.effects.push(e)
}

const On = e => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t
}, Os = e => (e.w & Re) > 0, As = e => (e.n & Re) > 0, Hi = ({deps: e}) => {
  if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Re
}, ji = e => {
  const {deps: t} = e;
  if (t.length) {
    let n = 0;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      Os(s) && !As(s) ? s.delete(e) : t[n++] = s, s.w &= ~Re, s.n &= ~Re
    }
    t.length = n
  }
}, rn = new WeakMap;
let dt = 0, Re = 1;
const on = 30;
let ge;
const De = Symbol(""), ln = Symbol("");

class An {
  constructor(t, n = null, i) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, ki(this, i)
  }

  run() {
    if (!this.active) return this.fn();
    let t = ge, n = Le;
    for (; t;) {
      if (t === this) return;
      t = t.parent
    }
    try {
      return this.parent = ge, ge = this, Le = !0, Re = 1 << ++dt, dt <= on ? Hi(this) : Yn(this), this.fn()
    } finally {
      dt <= on && ji(this), Re = 1 << --dt, ge = this.parent, Le = n, this.parent = void 0, this.deferStop && this.stop()
    }
  }

  stop() {
    ge === this ? this.deferStop = !0 : this.active && (Yn(this), this.onStop && this.onStop(), this.active = !1)
  }
}

function Yn(e) {
  const {deps: t} = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0
  }
}

let Le = !0;
const Fs = [];

function ct() {
  Fs.push(Le), Le = !1
}

function ft() {
  const e = Fs.pop();
  Le = e === void 0 ? !0 : e
}

function le(e, t, n) {
  if (Le && ge) {
    let i = rn.get(e);
    i || rn.set(e, i = new Map);
    let s = i.get(n);
    s || i.set(n, s = On()), Is(s)
  }
}

function Is(e, t) {
  let n = !1;
  dt <= on ? As(e) || (e.n |= Re, n = !Os(e)) : n = !e.has(ge), n && (e.add(ge), ge.deps.push(e))
}

function Oe(e, t, n, i, s, r) {
  const o = rn.get(e);
  if (!o) return;
  let c = [];
  if (t === "clear") c = [...o.values()]; else if (n === "length" && A(e)) o.forEach((u, d) => {
    (d === "length" || d >= i) && c.push(u)
  }); else switch (n !== void 0 && c.push(o.get(n)), t) {
    case"add":
      A(e) ? Tn(n) && c.push(o.get("length")) : (c.push(o.get(De)), st(e) && c.push(o.get(ln)));
      break;
    case"delete":
      A(e) || (c.push(o.get(De)), st(e) && c.push(o.get(ln)));
      break;
    case"set":
      st(e) && c.push(o.get(De));
      break
  }
  if (c.length === 1) c[0] && cn(c[0]); else {
    const u = [];
    for (const d of c) d && u.push(...d);
    cn(On(u))
  }
}

function cn(e, t) {
  for (const n of A(e) ? e : [...e]) (n !== ge || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run())
}

const Bi = xn("__proto__,__v_isRef,__isVue"),
  Ps = new Set(Object.getOwnPropertyNames(Symbol).map(e => Symbol[e]).filter(En)), Ui = Fn(), $i = Fn(!1, !0),
  Ki = Fn(!0), Zn = Di();

function Di() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
    e[t] = function (...n) {
      const i = k(this);
      for (let r = 0, o = this.length; r < o; r++) le(i, "get", r + "");
      const s = i[t](...n);
      return s === -1 || s === !1 ? i[t](...n.map(k)) : s
    }
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    e[t] = function (...n) {
      ct();
      const i = k(this)[t].apply(this, n);
      return ft(), i
    }
  }), e
}

function Fn(e = !1, t = !1) {
  return function (i, s, r) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && r === (e ? t ? rr : ks : t ? Rs : Ns).get(i)) return i;
    const o = A(i);
    if (!e && o && P(Zn, s)) return Reflect.get(Zn, s, r);
    const c = Reflect.get(i, s, r);
    return (En(s) ? Ps.has(s) : Bi(s)) || (e || le(i, "get", s), t) ? c : Q(c) ? !o || !Tn(s) ? c.value : c : J(c) ? e ? Hs(c) : Sn(c) : c
  }
}

const Wi = Ss(), zi = Ss(!0);

function Ss(e = !1) {
  return function (n, i, s, r) {
    let o = n[i];
    if (_t(o) && Q(o) && !Q(s)) return !1;
    if (!e && !_t(s) && (js(s) || (s = k(s), o = k(o)), !A(n) && Q(o) && !Q(s))) return o.value = s, !0;
    const c = A(n) && Tn(i) ? Number(i) < n.length : P(n, i), u = Reflect.set(n, i, s, r);
    return n === k(r) && (c ? It(s, o) && Oe(n, "set", i, s) : Oe(n, "add", i, s)), u
  }
}

function Vi(e, t) {
  const n = P(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && n && Oe(e, "delete", t, void 0), i
}

function qi(e, t) {
  const n = Reflect.has(e, t);
  return (!En(t) || !Ps.has(t)) && le(e, "has", t), n
}

function Ji(e) {
  return le(e, "iterate", A(e) ? "length" : De), Reflect.ownKeys(e)
}

const Ls = {get: Ui, set: Wi, deleteProperty: Vi, has: qi, ownKeys: Ji}, Yi = {
  get: Ki, set(e, t) {
    return !0
  }, deleteProperty(e, t) {
    return !0
  }
}, Zi = G({}, Ls, {get: $i, set: zi}), In = e => e, Ut = e => Reflect.getPrototypeOf(e);

function wt(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const s = k(e), r = k(t);
  t !== r && !n && le(s, "get", t), !n && le(s, "get", r);
  const {has: o} = Ut(s), c = i ? In : n ? Rn : Nn;
  if (o.call(s, t)) return c(e.get(t));
  if (o.call(s, r)) return c(e.get(r));
  e !== s && e.get(t)
}

function Ct(e, t = !1) {
  const n = this.__v_raw, i = k(n), s = k(e);
  return e !== s && !t && le(i, "has", e), !t && le(i, "has", s), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function Mt(e, t = !1) {
  return e = e.__v_raw, !t && le(k(e), "iterate", De), Reflect.get(e, "size", e)
}

function Xn(e) {
  e = k(e);
  const t = k(this);
  return Ut(t).has.call(t, e) || (t.add(e), Oe(t, "add", e, e)), this
}

function Qn(e, t) {
  t = k(t);
  const n = k(this), {has: i, get: s} = Ut(n);
  let r = i.call(n, e);
  r || (e = k(e), r = i.call(n, e));
  const o = s.call(n, e);
  return n.set(e, t), r ? It(t, o) && Oe(n, "set", e, t) : Oe(n, "add", e, t), this
}

function Gn(e) {
  const t = k(this), {has: n, get: i} = Ut(t);
  let s = n.call(t, e);
  s || (e = k(e), s = n.call(t, e)), i && i.call(t, e);
  const r = t.delete(e);
  return s && Oe(t, "delete", e, void 0), r
}

function es() {
  const e = k(this), t = e.size !== 0, n = e.clear();
  return t && Oe(e, "clear", void 0, void 0), n
}

function Et(e, t) {
  return function (i, s) {
    const r = this, o = r.__v_raw, c = k(o), u = t ? In : e ? Rn : Nn;
    return !e && le(c, "iterate", De), o.forEach((d, g) => i.call(s, u(d), u(g), r))
  }
}

function Tt(e, t, n) {
  return function (...i) {
    const s = this.__v_raw, r = k(s), o = st(r), c = e === "entries" || e === Symbol.iterator && o,
      u = e === "keys" && o, d = s[e](...i), g = n ? In : t ? Rn : Nn;
    return !t && le(r, "iterate", u ? ln : De), {
      next() {
        const {value: b, done: x} = d.next();
        return x ? {value: b, done: x} : {value: c ? [g(b[0]), g(b[1])] : g(b), done: x}
      }, [Symbol.iterator]() {
        return this
      }
    }
  }
}

function Ie(e) {
  return function (...t) {
    return e === "delete" ? !1 : this
  }
}

function Xi() {
  const e = {
    get(r) {
      return wt(this, r)
    }, get size() {
      return Mt(this)
    }, has: Ct, add: Xn, set: Qn, delete: Gn, clear: es, forEach: Et(!1, !1)
  }, t = {
    get(r) {
      return wt(this, r, !1, !0)
    }, get size() {
      return Mt(this)
    }, has: Ct, add: Xn, set: Qn, delete: Gn, clear: es, forEach: Et(!1, !0)
  }, n = {
    get(r) {
      return wt(this, r, !0)
    }, get size() {
      return Mt(this, !0)
    }, has(r) {
      return Ct.call(this, r, !0)
    }, add: Ie("add"), set: Ie("set"), delete: Ie("delete"), clear: Ie("clear"), forEach: Et(!0, !1)
  }, i = {
    get(r) {
      return wt(this, r, !0, !0)
    }, get size() {
      return Mt(this, !0)
    }, has(r) {
      return Ct.call(this, r, !0)
    }, add: Ie("add"), set: Ie("set"), delete: Ie("delete"), clear: Ie("clear"), forEach: Et(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach(r => {
    e[r] = Tt(r, !1, !1), n[r] = Tt(r, !0, !1), t[r] = Tt(r, !1, !0), i[r] = Tt(r, !0, !0)
  }), [e, n, t, i]
}

const [Qi, Gi, er, tr] = Xi();

function Pn(e, t) {
  const n = t ? e ? tr : er : e ? Gi : Qi;
  return (i, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? i : Reflect.get(P(n, s) && s in i ? n : i, s, r)
}

const nr = {get: Pn(!1, !1)}, sr = {get: Pn(!1, !0)}, ir = {get: Pn(!0, !1)}, Ns = new WeakMap, Rs = new WeakMap,
  ks = new WeakMap, rr = new WeakMap;

function or(e) {
  switch (e) {
    case"Object":
    case"Array":
      return 1;
    case"Map":
    case"Set":
    case"WeakMap":
    case"WeakSet":
      return 2;
    default:
      return 0
  }
}

function lr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : or(Ii(e))
}

function Sn(e) {
  return _t(e) ? e : Ln(e, !1, Ls, nr, Ns)
}

function cr(e) {
  return Ln(e, !1, Zi, sr, Rs)
}

function Hs(e) {
  return Ln(e, !0, Yi, ir, ks)
}

function Ln(e, t, n, i, s) {
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const r = s.get(e);
  if (r) return r;
  const o = lr(e);
  if (o === 0) return e;
  const c = new Proxy(e, o === 2 ? i : n);
  return s.set(e, c), c
}

function it(e) {
  return _t(e) ? it(e.__v_raw) : !!(e && e.__v_isReactive)
}

function _t(e) {
  return !!(e && e.__v_isReadonly)
}

function js(e) {
  return !!(e && e.__v_isShallow)
}

function Bs(e) {
  return it(e) || _t(e)
}

function k(e) {
  const t = e && e.__v_raw;
  return t ? k(t) : e
}

function Us(e) {
  return Pt(e, "__v_skip", !0), e
}

const Nn = e => J(e) ? Sn(e) : e, Rn = e => J(e) ? Hs(e) : e;

function fr(e) {
  Le && ge && (e = k(e), Is(e.dep || (e.dep = On())))
}

function ur(e, t) {
  e = k(e), e.dep && cn(e.dep)
}

function Q(e) {
  return !!(e && e.__v_isRef === !0)
}

function ar(e) {
  return Q(e) ? e.value : e
}

const dr = {
  get: (e, t, n) => ar(Reflect.get(e, t, n)), set: (e, t, n, i) => {
    const s = e[t];
    return Q(s) && !Q(n) ? (s.value = n, !0) : Reflect.set(e, t, n, i)
  }
};

function $s(e) {
  return it(e) ? e : new Proxy(e, dr)
}

class hr {
  constructor(t, n, i, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new An(t, () => {
      this._dirty || (this._dirty = !0, ur(this))
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = i
  }

  get value() {
    const t = k(this);
    return fr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
  }

  set value(t) {
    this._setter(t)
  }
}

function pr(e, t, n = !1) {
  let i, s;
  const r = F(e);
  return r ? (i = e, s = me) : (i = e.get, s = e.set), new hr(i, s, r || !s, n)
}

function Ne(e, t, n, i) {
  let s;
  try {
    s = i ? e(...i) : e()
  } catch (r) {
    $t(r, t, n)
  }
  return s
}

function ue(e, t, n, i) {
  if (F(e)) {
    const r = Ne(e, t, n, i);
    return r && Cs(r) && r.catch(o => {
      $t(o, t, n)
    }), r
  }
  const s = [];
  for (let r = 0; r < e.length; r++) s.push(ue(e[r], t, n, i));
  return s
}

function $t(e, t, n, i = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy, c = n;
    for (; r;) {
      const d = r.ec;
      if (d) {
        for (let g = 0; g < d.length; g++) if (d[g](e, o, c) === !1) return
      }
      r = r.parent
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Ne(u, null, 10, [e, o, c]);
      return
    }
  }
  gr(e, n, s, i)
}

function gr(e, t, n, i = !0) {
  console.error(e)
}

let St = !1, fn = !1;
const oe = [];
let Ee = 0;
const pt = [];
let ht = null, Qe = 0;
const gt = [];
let Pe = null, Ge = 0;
const Ks = Promise.resolve();
let kn = null, un = null;

function mr(e) {
  const t = kn || Ks;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function _r(e) {
  let t = Ee + 1, n = oe.length;
  for (; t < n;) {
    const i = t + n >>> 1;
    bt(oe[i]) < e ? t = i + 1 : n = i
  }
  return t
}

function Ds(e) {
  (!oe.length || !oe.includes(e, St && e.allowRecurse ? Ee + 1 : Ee)) && e !== un && (e.id == null ? oe.push(e) : oe.splice(_r(e.id), 0, e), Ws())
}

function Ws() {
  !St && !fn && (fn = !0, kn = Ks.then(qs))
}

function br(e) {
  const t = oe.indexOf(e);
  t > Ee && oe.splice(t, 1)
}

function zs(e, t, n, i) {
  A(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? i + 1 : i)) && n.push(e), Ws()
}

function vr(e) {
  zs(e, ht, pt, Qe)
}

function yr(e) {
  zs(e, Pe, gt, Ge)
}

function Hn(e, t = null) {
  if (pt.length) {
    for (un = t, ht = [...new Set(pt)], pt.length = 0, Qe = 0; Qe < ht.length; Qe++) ht[Qe]();
    ht = null, Qe = 0, un = null, Hn(e, t)
  }
}

function Vs(e) {
  if (gt.length) {
    const t = [...new Set(gt)];
    if (gt.length = 0, Pe) {
      Pe.push(...t);
      return
    }
    for (Pe = t, Pe.sort((n, i) => bt(n) - bt(i)), Ge = 0; Ge < Pe.length; Ge++) Pe[Ge]();
    Pe = null, Ge = 0
  }
}

const bt = e => e.id == null ? 1 / 0 : e.id;

function qs(e) {
  fn = !1, St = !0, Hn(e), oe.sort((n, i) => bt(n) - bt(i));
  const t = me;
  try {
    for (Ee = 0; Ee < oe.length; Ee++) {
      const n = oe[Ee];
      n && n.active !== !1 && Ne(n, null, 14)
    }
  } finally {
    Ee = 0, oe.length = 0, Vs(), St = !1, kn = null, (oe.length || pt.length || gt.length) && qs(e)
  }
}

function xr(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || U;
  let s = n;
  const r = t.startsWith("update:"), o = r && t.slice(7);
  if (o && o in i) {
    const g = `${o === "modelValue" ? "model" : o}Modifiers`, {number: b, trim: x} = i[g] || U;
    x ? s = n.map(O => O.trim()) : b && (s = n.map(Li))
  }
  let c, u = i[c = Zt(t)] || i[c = Zt(rt(t))];
  !u && r && (u = i[c = Zt(lt(t))]), u && ue(u, e, 6, s);
  const d = i[c + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {}; else if (e.emitted[c]) return;
    e.emitted[c] = !0, ue(d, e, 6, s)
  }
}

function Js(e, t, n = !1) {
  const i = t.emitsCache, s = i.get(e);
  if (s !== void 0) return s;
  const r = e.emits;
  let o = {}, c = !1;
  if (!F(e)) {
    const u = d => {
      const g = Js(d, t, !0);
      g && (c = !0, G(o, g))
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
  }
  return !r && !c ? (i.set(e, null), null) : (A(r) ? r.forEach(u => o[u] = null) : G(o, r), i.set(e, o), o)
}

function Kt(e, t) {
  return !e || !Ht(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), P(e, t[0].toLowerCase() + t.slice(1)) || P(e, lt(t)) || P(e, t))
}

let we = null, Ys = null;

function Lt(e) {
  const t = we;
  return we = e, Ys = e && e.type.__scopeId || null, t
}

function wr(e, t = we, n) {
  if (!t || e._n) return e;
  const i = (...s) => {
    i._d && us(-1);
    const r = Lt(t), o = e(...s);
    return Lt(r), i._d && us(1), o
  };
  return i._n = !0, i._c = !0, i._d = !0, i
}

function Qt(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: s,
    props: r,
    propsOptions: [o],
    slots: c,
    attrs: u,
    emit: d,
    render: g,
    renderCache: b,
    data: x,
    setupState: O,
    ctx: R,
    inheritAttrs: L
  } = e;
  let I, N;
  const ce = Lt(e);
  try {
    if (n.shapeFlag & 4) {
      const z = s || i;
      I = xe(g.call(z, z, b, r, O, x, R)), N = u
    } else {
      const z = t;
      I = xe(z.length > 1 ? z(r, {attrs: u, slots: c, emit: d}) : z(r, null)), N = t.props ? u : Cr(u)
    }
  } catch (z) {
    mt.length = 0, $t(z, e, 1), I = Te(_e)
  }
  let Y = I;
  if (N && L !== !1) {
    const z = Object.keys(N), {shapeFlag: se} = Y;
    z.length && se & 7 && (o && z.some(Cn) && (N = Mr(N, o)), Y = Ve(Y, N))
  }
  return n.dirs && (Y.dirs = Y.dirs ? Y.dirs.concat(n.dirs) : n.dirs), n.transition && (Y.transition = n.transition), I = Y, Lt(ce), I
}

const Cr = e => {
  let t;
  for (const n in e) (n === "class" || n === "style" || Ht(n)) && ((t || (t = {}))[n] = e[n]);
  return t
}, Mr = (e, t) => {
  const n = {};
  for (const i in e) (!Cn(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n
};

function Er(e, t, n) {
  const {props: i, children: s, component: r} = e, {props: o, children: c, patchFlag: u} = t, d = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return i ? ts(i, o, d) : !!o;
    if (u & 8) {
      const g = t.dynamicProps;
      for (let b = 0; b < g.length; b++) {
        const x = g[b];
        if (o[x] !== i[x] && !Kt(d, x)) return !0
      }
    }
  } else return (s || c) && (!c || !c.$stable) ? !0 : i === o ? !1 : i ? o ? ts(i, o, d) : !0 : !!o;
  return !1
}

function ts(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (t[r] !== e[r] && !Kt(n, r)) return !0
  }
  return !1
}

function Tr({vnode: e, parent: t}, n) {
  for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
}

const Or = e => e.__isSuspense;

function Ar(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : yr(e)
}

function Fr(e, t) {
  if (X) {
    let n = X.provides;
    const i = X.parent && X.parent.provides;
    i === n && (n = X.provides = Object.create(i)), n[e] = t
  }
}

function Gt(e, t, n = !1) {
  const i = X || we;
  if (i) {
    const s = i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && F(t) ? t.call(i.proxy) : t
  }
}

const ns = {};

function en(e, t, n) {
  return Zs(e, t, n)
}

function Zs(e, t, {immediate: n, deep: i, flush: s, onTrack: r, onTrigger: o} = U) {
  const c = X;
  let u, d = !1, g = !1;
  if (Q(e) ? (u = () => e.value, d = js(e)) : it(e) ? (u = () => e, i = !0) : A(e) ? (g = !0, d = e.some(it), u = () => e.map(N => {
    if (Q(N)) return N.value;
    if (it(N)) return et(N);
    if (F(N)) return Ne(N, c, 2)
  })) : F(e) ? t ? u = () => Ne(e, c, 2) : u = () => {
    if (!(c && c.isUnmounted)) return b && b(), ue(e, c, 3, [x])
  } : u = me, t && i) {
    const N = u;
    u = () => et(N())
  }
  let b, x = N => {
    b = I.onStop = () => {
      Ne(N, c, 4)
    }
  };
  if (vt) return x = me, t ? n && ue(t, c, 3, [u(), g ? [] : void 0, x]) : u(), me;
  let O = g ? [] : ns;
  const R = () => {
    if (!!I.active) if (t) {
      const N = I.run();
      (i || d || (g ? N.some((ce, Y) => It(ce, O[Y])) : It(N, O))) && (b && b(), ue(t, c, 3, [N, O === ns ? void 0 : O, x]), O = N)
    } else I.run()
  };
  R.allowRecurse = !!t;
  let L;
  s === "sync" ? L = R : s === "post" ? L = () => ne(R, c && c.suspense) : L = () => {
    !c || c.isMounted ? vr(R) : R()
  };
  const I = new An(u, L);
  return t ? n ? R() : O = I.run() : s === "post" ? ne(I.run.bind(I), c && c.suspense) : I.run(), () => {
    I.stop(), c && c.scope && Mn(c.scope.effects, I)
  }
}

function Ir(e, t, n) {
  const i = this.proxy, s = q(e) ? e.includes(".") ? Xs(i, e) : () => i[e] : e.bind(i, i);
  let r;
  F(t) ? r = t : (r = t.handler, n = t);
  const o = X;
  ot(this);
  const c = Zs(s, r.bind(i), n);
  return o ? ot(o) : ze(), c
}

function Xs(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let s = 0; s < n.length && i; s++) i = i[n[s]];
    return i
  }
}

function et(e, t) {
  if (!J(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
  if (t.add(e), Q(e)) et(e.value, t); else if (A(e)) for (let n = 0; n < e.length; n++) et(e[n], t); else if (ws(e) || st(e)) e.forEach(n => {
    et(n, t)
  }); else if (Es(e)) for (const n in e) et(e[n], t);
  return e
}

function Pr() {
  const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
  return ti(() => {
    e.isMounted = !0
  }), ni(() => {
    e.isUnmounting = !0
  }), e
}

const fe = [Function, Array], Sr = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: fe,
    onEnter: fe,
    onAfterEnter: fe,
    onEnterCancelled: fe,
    onBeforeLeave: fe,
    onLeave: fe,
    onAfterLeave: fe,
    onLeaveCancelled: fe,
    onBeforeAppear: fe,
    onAppear: fe,
    onAfterAppear: fe,
    onAppearCancelled: fe
  },
  setup(e, {slots: t}) {
    const n = yo(), i = Pr();
    let s;
    return () => {
      const r = t.default && Gs(t.default(), !0);
      if (!r || !r.length) return;
      let o = r[0];
      if (r.length > 1) {
        for (const L of r) if (L.type !== _e) {
          o = L;
          break
        }
      }
      const c = k(e), {mode: u} = c;
      if (i.isLeaving) return tn(o);
      const d = ss(o);
      if (!d) return tn(o);
      const g = an(d, c, i, n);
      dn(d, g);
      const b = n.subTree, x = b && ss(b);
      let O = !1;
      const {getTransitionKey: R} = d.type;
      if (R) {
        const L = R();
        s === void 0 ? s = L : L !== s && (s = L, O = !0)
      }
      if (x && x.type !== _e && (!$e(d, x) || O)) {
        const L = an(x, c, i, n);
        if (dn(x, L), u === "out-in") return i.isLeaving = !0, L.afterLeave = () => {
          i.isLeaving = !1, n.update()
        }, tn(o);
        u === "in-out" && d.type !== _e && (L.delayLeave = (I, N, ce) => {
          const Y = Qs(i, x);
          Y[String(x.key)] = x, I._leaveCb = () => {
            N(), I._leaveCb = void 0, delete g.delayedLeave
          }, g.delayedLeave = ce
        })
      }
      return o
    }
  }
}, Lr = Sr;

function Qs(e, t) {
  const {leavingVNodes: n} = e;
  let i = n.get(t.type);
  return i || (i = Object.create(null), n.set(t.type, i)), i
}

function an(e, t, n, i) {
  const {
    appear: s,
    mode: r,
    persisted: o = !1,
    onBeforeEnter: c,
    onEnter: u,
    onAfterEnter: d,
    onEnterCancelled: g,
    onBeforeLeave: b,
    onLeave: x,
    onAfterLeave: O,
    onLeaveCancelled: R,
    onBeforeAppear: L,
    onAppear: I,
    onAfterAppear: N,
    onAppearCancelled: ce
  } = t, Y = String(e.key), z = Qs(n, e), se = (j, Z) => {
    j && ue(j, i, 9, Z)
  }, ke = {
    mode: r, persisted: o, beforeEnter(j) {
      let Z = c;
      if (!n.isMounted) if (s) Z = L || c; else return;
      j._leaveCb && j._leaveCb(!0);
      const V = z[Y];
      V && $e(e, V) && V.el._leaveCb && V.el._leaveCb(), se(Z, [j])
    }, enter(j) {
      let Z = u, V = d, ae = g;
      if (!n.isMounted) if (s) Z = I || u, V = N || d, ae = ce || g; else return;
      let ie = !1;
      const de = j._enterCb = qe => {
        ie || (ie = !0, qe ? se(ae, [j]) : se(V, [j]), ke.delayedLeave && ke.delayedLeave(), j._enterCb = void 0)
      };
      Z ? (Z(j, de), Z.length <= 1 && de()) : de()
    }, leave(j, Z) {
      const V = String(e.key);
      if (j._enterCb && j._enterCb(!0), n.isUnmounting) return Z();
      se(b, [j]);
      let ae = !1;
      const ie = j._leaveCb = de => {
        ae || (ae = !0, Z(), de ? se(R, [j]) : se(O, [j]), j._leaveCb = void 0, z[V] === e && delete z[V])
      };
      z[V] = e, x ? (x(j, ie), x.length <= 1 && ie()) : ie()
    }, clone(j) {
      return an(j, t, n, i)
    }
  };
  return ke
}

function tn(e) {
  if (Dt(e)) return e = Ve(e), e.children = null, e
}

function ss(e) {
  return Dt(e) ? e.children ? e.children[0] : void 0 : e
}

function dn(e, t) {
  e.shapeFlag & 6 && e.component ? dn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Gs(e, t = !1, n) {
  let i = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const c = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === pe ? (o.patchFlag & 128 && s++, i = i.concat(Gs(o.children, t, c))) : (t || o.type !== _e) && i.push(c != null ? Ve(o, {key: c}) : o)
  }
  if (s > 1) for (let r = 0; r < i.length; r++) i[r].patchFlag = -2;
  return i
}

const hn = e => !!e.type.__asyncLoader, Dt = e => e.type.__isKeepAlive;

function Nr(e, t) {
  ei(e, "a", t)
}

function Rr(e, t) {
  ei(e, "da", t)
}

function ei(e, t, n = X) {
  const i = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s;) {
      if (s.isDeactivated) return;
      s = s.parent
    }
    return e()
  });
  if (Wt(t, i, n), n) {
    let s = n.parent;
    for (; s && s.parent;) Dt(s.parent.vnode) && kr(i, t, n, s), s = s.parent
  }
}

function kr(e, t, n, i) {
  const s = Wt(t, e, i, !0);
  si(() => {
    Mn(i[t], s)
  }, n)
}

function Wt(e, t, n = X, i = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted) return;
      ct(), ot(n);
      const c = ue(t, n, e, o);
      return ze(), ft(), c
    });
    return i ? s.unshift(r) : s.push(r), r
  }
}

const Ae = e => (t, n = X) => (!vt || e === "sp") && Wt(e, t, n), Hr = Ae("bm"), ti = Ae("m"), jr = Ae("bu"),
  Br = Ae("u"), ni = Ae("bum"), si = Ae("um"), Ur = Ae("sp"), $r = Ae("rtg"), Kr = Ae("rtc");

function Dr(e, t = X) {
  Wt("ec", e, t)
}

let pn = !0;

function Wr(e) {
  const t = ri(e), n = e.proxy, i = e.ctx;
  pn = !1, t.beforeCreate && is(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: r,
    methods: o,
    watch: c,
    provide: u,
    inject: d,
    created: g,
    beforeMount: b,
    mounted: x,
    beforeUpdate: O,
    updated: R,
    activated: L,
    deactivated: I,
    beforeDestroy: N,
    beforeUnmount: ce,
    destroyed: Y,
    unmounted: z,
    render: se,
    renderTracked: ke,
    renderTriggered: j,
    errorCaptured: Z,
    serverPrefetch: V,
    expose: ae,
    inheritAttrs: ie,
    components: de,
    directives: qe,
    filters: Kn
  } = t;
  if (d && zr(d, i, null, e.appContext.config.unwrapInjectedRef), o) for (const W in o) {
    const $ = o[W];
    F($) && (i[W] = $.bind(n))
  }
  if (s) {
    const W = s.call(n, n);
    J(W) && (e.data = Sn(W))
  }
  if (pn = !0, r) for (const W in r) {
    const $ = r[W], Ce = F($) ? $.bind(n, n) : F($.get) ? $.get.bind(n, n) : me,
      qt = !F($) && F($.set) ? $.set.bind(n) : me, ut = To({get: Ce, set: qt});
    Object.defineProperty(i, W, {enumerable: !0, configurable: !0, get: () => ut.value, set: Je => ut.value = Je})
  }
  if (c) for (const W in c) ii(c[W], i, n, W);
  if (u) {
    const W = F(u) ? u.call(n) : u;
    Reflect.ownKeys(W).forEach($ => {
      Fr($, W[$])
    })
  }
  g && is(g, e, "c");

  function te(W, $) {
    A($) ? $.forEach(Ce => W(Ce.bind(n))) : $ && W($.bind(n))
  }

  if (te(Hr, b), te(ti, x), te(jr, O), te(Br, R), te(Nr, L), te(Rr, I), te(Dr, Z), te(Kr, ke), te($r, j), te(ni, ce), te(si, z), te(Ur, V), A(ae)) if (ae.length) {
    const W = e.exposed || (e.exposed = {});
    ae.forEach($ => {
      Object.defineProperty(W, $, {get: () => n[$], set: Ce => n[$] = Ce})
    })
  } else e.exposed || (e.exposed = {});
  se && e.render === me && (e.render = se), ie != null && (e.inheritAttrs = ie), de && (e.components = de), qe && (e.directives = qe)
}

function zr(e, t, n = me, i = !1) {
  A(e) && (e = gn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    J(r) ? "default" in r ? o = Gt(r.from || s, r.default, !0) : o = Gt(r.from || s) : o = Gt(r), Q(o) && i ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: c => o.value = c
    }) : t[s] = o
  }
}

function is(e, t, n) {
  ue(A(e) ? e.map(i => i.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function ii(e, t, n, i) {
  const s = i.includes(".") ? Xs(n, i) : () => n[i];
  if (q(e)) {
    const r = t[e];
    F(r) && en(s, r)
  } else if (F(e)) en(s, e.bind(n)); else if (J(e)) if (A(e)) e.forEach(r => ii(r, t, n, i)); else {
    const r = F(e.handler) ? e.handler.bind(n) : t[e.handler];
    F(r) && en(s, r, e)
  }
}

function ri(e) {
  const t = e.type, {mixins: n, extends: i} = t, {
    mixins: s,
    optionsCache: r,
    config: {optionMergeStrategies: o}
  } = e.appContext, c = r.get(t);
  let u;
  return c ? u = c : !s.length && !n && !i ? u = t : (u = {}, s.length && s.forEach(d => Nt(u, d, o, !0)), Nt(u, t, o)), r.set(t, u), u
}

function Nt(e, t, n, i = !1) {
  const {mixins: s, extends: r} = t;
  r && Nt(e, r, n, !0), s && s.forEach(o => Nt(e, o, n, !0));
  for (const o in t) if (!(i && o === "expose")) {
    const c = Vr[o] || n && n[o];
    e[o] = c ? c(e[o], t[o]) : t[o]
  }
  return e
}

const Vr = {
  data: rs,
  props: Be,
  emits: Be,
  methods: Be,
  computed: Be,
  beforeCreate: ee,
  created: ee,
  beforeMount: ee,
  mounted: ee,
  beforeUpdate: ee,
  updated: ee,
  beforeDestroy: ee,
  beforeUnmount: ee,
  destroyed: ee,
  unmounted: ee,
  activated: ee,
  deactivated: ee,
  errorCaptured: ee,
  serverPrefetch: ee,
  components: Be,
  directives: Be,
  watch: Jr,
  provide: rs,
  inject: qr
};

function rs(e, t) {
  return t ? e ? function () {
    return G(F(e) ? e.call(this, this) : e, F(t) ? t.call(this, this) : t)
  } : t : e
}

function qr(e, t) {
  return Be(gn(e), gn(t))
}

function gn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t
  }
  return e
}

function ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}

function Be(e, t) {
  return e ? G(G(Object.create(null), e), t) : t
}

function Jr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = G(Object.create(null), e);
  for (const i in t) n[i] = ee(e[i], t[i]);
  return n
}

function Yr(e, t, n, i = !1) {
  const s = {}, r = {};
  Pt(r, zt, 1), e.propsDefaults = Object.create(null), oi(e, t, s, r);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? e.props = i ? s : cr(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r
}

function Zr(e, t, n, i) {
  const {props: s, attrs: r, vnode: {patchFlag: o}} = e, c = k(s), [u] = e.propsOptions;
  let d = !1;
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const g = e.vnode.dynamicProps;
      for (let b = 0; b < g.length; b++) {
        let x = g[b];
        if (Kt(e.emitsOptions, x)) continue;
        const O = t[x];
        if (u) if (P(r, x)) O !== r[x] && (r[x] = O, d = !0); else {
          const R = rt(x);
          s[R] = mn(u, c, R, O, e, !1)
        } else O !== r[x] && (r[x] = O, d = !0)
      }
    }
  } else {
    oi(e, t, s, r) && (d = !0);
    let g;
    for (const b in c) (!t || !P(t, b) && ((g = lt(b)) === b || !P(t, g))) && (u ? n && (n[b] !== void 0 || n[g] !== void 0) && (s[b] = mn(u, c, b, void 0, e, !0)) : delete s[b]);
    if (r !== c) for (const b in r) (!t || !P(t, b) && !0) && (delete r[b], d = !0)
  }
  d && Oe(e, "set", "$attrs")
}

function oi(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1, c;
  if (t) for (let u in t) {
    if (At(u)) continue;
    const d = t[u];
    let g;
    s && P(s, g = rt(u)) ? !r || !r.includes(g) ? n[g] = d : (c || (c = {}))[g] = d : Kt(e.emitsOptions, u) || (!(u in i) || d !== i[u]) && (i[u] = d, o = !0)
  }
  if (r) {
    const u = k(n), d = c || U;
    for (let g = 0; g < r.length; g++) {
      const b = r[g];
      n[b] = mn(s, u, b, d[b], e, !P(d, b))
    }
  }
  return o
}

function mn(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
    const c = P(o, "default");
    if (c && i === void 0) {
      const u = o.default;
      if (o.type !== Function && F(u)) {
        const {propsDefaults: d} = s;
        n in d ? i = d[n] : (ot(s), i = d[n] = u.call(null, t), ze())
      } else i = u
    }
    o[0] && (r && !c ? i = !1 : o[1] && (i === "" || i === lt(n)) && (i = !0))
  }
  return i
}

function li(e, t, n = !1) {
  const i = t.propsCache, s = i.get(e);
  if (s) return s;
  const r = e.props, o = {}, c = [];
  let u = !1;
  if (!F(e)) {
    const g = b => {
      u = !0;
      const [x, O] = li(b, t, !0);
      G(o, x), O && c.push(...O)
    };
    !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g)
  }
  if (!r && !u) return i.set(e, nt), nt;
  if (A(r)) for (let g = 0; g < r.length; g++) {
    const b = rt(r[g]);
    os(b) && (o[b] = U)
  } else if (r) for (const g in r) {
    const b = rt(g);
    if (os(b)) {
      const x = r[g], O = o[b] = A(x) || F(x) ? {type: x} : x;
      if (O) {
        const R = fs(Boolean, O.type), L = fs(String, O.type);
        O[0] = R > -1, O[1] = L < 0 || R < L, (R > -1 || P(O, "default")) && c.push(b)
      }
    }
  }
  const d = [o, c];
  return i.set(e, d), d
}

function os(e) {
  return e[0] !== "$"
}

function ls(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : ""
}

function cs(e, t) {
  return ls(e) === ls(t)
}

function fs(e, t) {
  return A(t) ? t.findIndex(n => cs(n, e)) : F(t) && cs(t, e) ? 0 : -1
}

const ci = e => e[0] === "_" || e === "$stable", jn = e => A(e) ? e.map(xe) : [xe(e)], Xr = (e, t, n) => {
  const i = wr((...s) => jn(t(...s)), n);
  return i._c = !1, i
}, fi = (e, t, n) => {
  const i = e._ctx;
  for (const s in e) {
    if (ci(s)) continue;
    const r = e[s];
    if (F(r)) t[s] = Xr(s, r, i); else if (r != null) {
      const o = jn(r);
      t[s] = () => o
    }
  }
}, ui = (e, t) => {
  const n = jn(t);
  e.slots.default = () => n
}, Qr = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = k(t), Pt(t, "_", n)) : fi(t, e.slots = {})
  } else e.slots = {}, t && ui(e, t);
  Pt(e.slots, zt, 1)
}, Gr = (e, t, n) => {
  const {vnode: i, slots: s} = e;
  let r = !0, o = U;
  if (i.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? r = !1 : (G(s, t), !n && c === 1 && delete s._) : (r = !t.$stable, fi(t, s)), o = t
  } else t && (ui(e, t), o = {default: 1});
  if (r) for (const c in s) !ci(c) && !(c in o) && delete s[c]
};

function He(e, t, n, i) {
  const s = e.dirs, r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const c = s[o];
    r && (c.oldValue = r[o].value);
    let u = c.dir[i];
    u && (ct(), ue(u, n, 8, [e.el, c, e, t]), ft())
  }
}

function ai() {
  return {
    app: null,
    config: {
      isNativeTag: Oi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}

let eo = 0;

function to(e, t) {
  return function (i, s = null) {
    F(i) || (i = Object.assign({}, i)), s != null && !J(s) && (s = null);
    const r = ai(), o = new Set;
    let c = !1;
    const u = r.app = {
      _uid: eo++,
      _component: i,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: Oo,
      get config() {
        return r.config
      },
      set config(d) {
      },
      use(d, ...g) {
        return o.has(d) || (d && F(d.install) ? (o.add(d), d.install(u, ...g)) : F(d) && (o.add(d), d(u, ...g))), u
      },
      mixin(d) {
        return r.mixins.includes(d) || r.mixins.push(d), u
      },
      component(d, g) {
        return g ? (r.components[d] = g, u) : r.components[d]
      },
      directive(d, g) {
        return g ? (r.directives[d] = g, u) : r.directives[d]
      },
      mount(d, g, b) {
        if (!c) {
          const x = Te(i, s);
          return x.appContext = r, g && t ? t(x, d) : e(x, d, b), c = !0, u._container = d, d.__vue_app__ = u, $n(x.component) || x.component.proxy
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__)
      },
      provide(d, g) {
        return r.provides[d] = g, u
      }
    };
    return u
  }
}

function _n(e, t, n, i, s = !1) {
  if (A(e)) {
    e.forEach((x, O) => _n(x, t && (A(t) ? t[O] : t), n, i, s));
    return
  }
  if (hn(i) && !s) return;
  const r = i.shapeFlag & 4 ? $n(i.component) || i.component.proxy : i.el, o = s ? null : r, {i: c, r: u} = e,
    d = t && t.r, g = c.refs === U ? c.refs = {} : c.refs, b = c.setupState;
  if (d != null && d !== u && (q(d) ? (g[d] = null, P(b, d) && (b[d] = null)) : Q(d) && (d.value = null)), F(u)) Ne(u, c, 12, [o, g]); else {
    const x = q(u), O = Q(u);
    if (x || O) {
      const R = () => {
        if (e.f) {
          const L = x ? g[u] : u.value;
          s ? A(L) && Mn(L, r) : A(L) ? L.includes(r) || L.push(r) : x ? (g[u] = [r], P(b, u) && (b[u] = g[u])) : (u.value = [r], e.k && (g[e.k] = u.value))
        } else x ? (g[u] = o, P(b, u) && (b[u] = o)) : Q(u) && (u.value = o, e.k && (g[e.k] = o))
      };
      o ? (R.id = -1, ne(R, n)) : R()
    }
  }
}

const ne = Ar;

function no(e) {
  return so(e)
}

function so(e, t) {
  const n = Ni();
  n.__VUE__ = !0;
  const {
      insert: i,
      remove: s,
      patchProp: r,
      createElement: o,
      createText: c,
      createComment: u,
      setText: d,
      setElementText: g,
      parentNode: b,
      nextSibling: x,
      setScopeId: O = me,
      cloneNode: R,
      insertStaticContent: L
    } = e, I = (l, f, a, p = null, h = null, v = null, w = !1, _ = null, y = !!f.dynamicChildren) => {
      if (l === f) return;
      l && !$e(l, f) && (p = yt(l), Fe(l, h, v, !0), l = null), f.patchFlag === -2 && (y = !1, f.dynamicChildren = null);
      const {type: m, ref: M, shapeFlag: C} = f;
      switch (m) {
        case Bn:
          N(l, f, a, p);
          break;
        case _e:
          ce(l, f, a, p);
          break;
        case nn:
          l == null && Y(f, a, p, w);
          break;
        case pe:
          qe(l, f, a, p, h, v, w, _, y);
          break;
        default:
          C & 1 ? ke(l, f, a, p, h, v, w, _, y) : C & 6 ? Kn(l, f, a, p, h, v, w, _, y) : (C & 64 || C & 128) && m.process(l, f, a, p, h, v, w, _, y, Ye)
      }
      M != null && h && _n(M, l && l.ref, v, f || l, !f)
    }, N = (l, f, a, p) => {
      if (l == null) i(f.el = c(f.children), a, p); else {
        const h = f.el = l.el;
        f.children !== l.children && d(h, f.children)
      }
    }, ce = (l, f, a, p) => {
      l == null ? i(f.el = u(f.children || ""), a, p) : f.el = l.el
    }, Y = (l, f, a, p) => {
      [l.el, l.anchor] = L(l.children, f, a, p, l.el, l.anchor)
    }, z = ({el: l, anchor: f}, a, p) => {
      let h;
      for (; l && l !== f;) h = x(l), i(l, a, p), l = h;
      i(f, a, p)
    }, se = ({el: l, anchor: f}) => {
      let a;
      for (; l && l !== f;) a = x(l), s(l), l = a;
      s(f)
    }, ke = (l, f, a, p, h, v, w, _, y) => {
      w = w || f.type === "svg", l == null ? j(f, a, p, h, v, w, _, y) : ae(l, f, h, v, w, _, y)
    }, j = (l, f, a, p, h, v, w, _) => {
      let y, m;
      const {type: M, props: C, shapeFlag: E, transition: T, patchFlag: S, dirs: D} = l;
      if (l.el && R !== void 0 && S === -1) y = l.el = R(l.el); else {
        if (y = l.el = o(l.type, v, C && C.is, C), E & 8 ? g(y, l.children) : E & 16 && V(l.children, y, null, p, h, v && M !== "foreignObject", w, _), D && He(l, null, p, "created"), C) {
          for (const K in C) K !== "value" && !At(K) && r(y, K, null, C[K], v, l.children, p, h, Me);
          "value" in C && r(y, "value", null, C.value), (m = C.onVnodeBeforeMount) && ve(m, p, l)
        }
        Z(y, l, l.scopeId, w, p)
      }
      D && He(l, null, p, "beforeMount");
      const B = (!h || h && !h.pendingBranch) && T && !T.persisted;
      B && T.beforeEnter(y), i(y, f, a), ((m = C && C.onVnodeMounted) || B || D) && ne(() => {
        m && ve(m, p, l), B && T.enter(y), D && He(l, null, p, "mounted")
      }, h)
    }, Z = (l, f, a, p, h) => {
      if (a && O(l, a), p) for (let v = 0; v < p.length; v++) O(l, p[v]);
      if (h) {
        let v = h.subTree;
        if (f === v) {
          const w = h.vnode;
          Z(l, w, w.scopeId, w.slotScopeIds, h.parent)
        }
      }
    }, V = (l, f, a, p, h, v, w, _, y = 0) => {
      for (let m = y; m < l.length; m++) {
        const M = l[m] = _ ? Se(l[m]) : xe(l[m]);
        I(null, M, f, a, p, h, v, w, _)
      }
    }, ae = (l, f, a, p, h, v, w) => {
      const _ = f.el = l.el;
      let {patchFlag: y, dynamicChildren: m, dirs: M} = f;
      y |= l.patchFlag & 16;
      const C = l.props || U, E = f.props || U;
      let T;
      a && je(a, !1), (T = E.onVnodeBeforeUpdate) && ve(T, a, f, l), M && He(f, l, a, "beforeUpdate"), a && je(a, !0);
      const S = h && f.type !== "foreignObject";
      if (m ? ie(l.dynamicChildren, m, _, a, p, S, v) : w || Ce(l, f, _, null, a, p, S, v, !1), y > 0) {
        if (y & 16) de(_, f, C, E, a, p, h); else if (y & 2 && C.class !== E.class && r(_, "class", null, E.class, h), y & 4 && r(_, "style", C.style, E.style, h), y & 8) {
          const D = f.dynamicProps;
          for (let B = 0; B < D.length; B++) {
            const K = D[B], he = C[K], Ze = E[K];
            (Ze !== he || K === "value") && r(_, K, he, Ze, h, l.children, a, p, Me)
          }
        }
        y & 1 && l.children !== f.children && g(_, f.children)
      } else !w && m == null && de(_, f, C, E, a, p, h);
      ((T = E.onVnodeUpdated) || M) && ne(() => {
        T && ve(T, a, f, l), M && He(f, l, a, "updated")
      }, p)
    }, ie = (l, f, a, p, h, v, w) => {
      for (let _ = 0; _ < f.length; _++) {
        const y = l[_], m = f[_], M = y.el && (y.type === pe || !$e(y, m) || y.shapeFlag & 70) ? b(y.el) : a;
        I(y, m, M, null, p, h, v, w, !0)
      }
    }, de = (l, f, a, p, h, v, w) => {
      if (a !== p) {
        for (const _ in p) {
          if (At(_)) continue;
          const y = p[_], m = a[_];
          y !== m && _ !== "value" && r(l, _, m, y, w, f.children, h, v, Me)
        }
        if (a !== U) for (const _ in a) !At(_) && !(_ in p) && r(l, _, a[_], null, w, f.children, h, v, Me);
        "value" in p && r(l, "value", a.value, p.value)
      }
    }, qe = (l, f, a, p, h, v, w, _, y) => {
      const m = f.el = l ? l.el : c(""), M = f.anchor = l ? l.anchor : c("");
      let {patchFlag: C, dynamicChildren: E, slotScopeIds: T} = f;
      T && (_ = _ ? _.concat(T) : T), l == null ? (i(m, a, p), i(M, a, p), V(f.children, a, M, h, v, w, _, y)) : C > 0 && C & 64 && E && l.dynamicChildren ? (ie(l.dynamicChildren, E, a, h, v, w, _), (f.key != null || h && f === h.subTree) && di(l, f, !0)) : Ce(l, f, a, M, h, v, w, _, y)
    }, Kn = (l, f, a, p, h, v, w, _, y) => {
      f.slotScopeIds = _, l == null ? f.shapeFlag & 512 ? h.ctx.activate(f, a, p, w, y) : Vt(f, a, p, h, v, w, y) : te(l, f, y)
    }, Vt = (l, f, a, p, h, v, w) => {
      const _ = l.component = vo(l, p, h);
      if (Dt(l) && (_.ctx.renderer = Ye), xo(_), _.asyncDep) {
        if (h && h.registerDep(_, W), !l.el) {
          const y = _.subTree = Te(_e);
          ce(null, y, f, a)
        }
        return
      }
      W(_, l, f, a, h, v, w)
    }, te = (l, f, a) => {
      const p = f.component = l.component;
      if (Er(l, f, a)) if (p.asyncDep && !p.asyncResolved) {
        $(p, f, a);
        return
      } else p.next = f, br(p.update), p.update(); else f.component = l.component, f.el = l.el, p.vnode = f
    }, W = (l, f, a, p, h, v, w) => {
      const _ = () => {
        if (l.isMounted) {
          let {next: M, bu: C, u: E, parent: T, vnode: S} = l, D = M, B;
          je(l, !1), M ? (M.el = S.el, $(l, M, w)) : M = S, C && Xt(C), (B = M.props && M.props.onVnodeBeforeUpdate) && ve(B, T, M, S), je(l, !0);
          const K = Qt(l), he = l.subTree;
          l.subTree = K, I(he, K, b(he.el), yt(he), l, h, v), M.el = K.el, D === null && Tr(l, K.el), E && ne(E, h), (B = M.props && M.props.onVnodeUpdated) && ne(() => ve(B, T, M, S), h)
        } else {
          let M;
          const {el: C, props: E} = f, {bm: T, m: S, parent: D} = l, B = hn(f);
          if (je(l, !1), T && Xt(T), !B && (M = E && E.onVnodeBeforeMount) && ve(M, D, f), je(l, !0), C && Yt) {
            const K = () => {
              l.subTree = Qt(l), Yt(C, l.subTree, l, h, null)
            };
            B ? f.type.__asyncLoader().then(() => !l.isUnmounted && K()) : K()
          } else {
            const K = l.subTree = Qt(l);
            I(null, K, a, p, l, h, v), f.el = K.el
          }
          if (S && ne(S, h), !B && (M = E && E.onVnodeMounted)) {
            const K = f;
            ne(() => ve(M, D, K), h)
          }
          f.shapeFlag & 256 && l.a && ne(l.a, h), l.isMounted = !0, f = a = p = null
        }
      }, y = l.effect = new An(_, () => Ds(l.update), l.scope), m = l.update = y.run.bind(y);
      m.id = l.uid, je(l, !0), m()
    }, $ = (l, f, a) => {
      f.component = l;
      const p = l.vnode.props;
      l.vnode = f, l.next = null, Zr(l, f.props, p, a), Gr(l, f.children, a), ct(), Hn(void 0, l.update), ft()
    }, Ce = (l, f, a, p, h, v, w, _, y = !1) => {
      const m = l && l.children, M = l ? l.shapeFlag : 0, C = f.children, {patchFlag: E, shapeFlag: T} = f;
      if (E > 0) {
        if (E & 128) {
          ut(m, C, a, p, h, v, w, _, y);
          return
        } else if (E & 256) {
          qt(m, C, a, p, h, v, w, _, y);
          return
        }
      }
      T & 8 ? (M & 16 && Me(m, h, v), C !== m && g(a, C)) : M & 16 ? T & 16 ? ut(m, C, a, p, h, v, w, _, y) : Me(m, h, v, !0) : (M & 8 && g(a, ""), T & 16 && V(C, a, p, h, v, w, _, y))
    }, qt = (l, f, a, p, h, v, w, _, y) => {
      l = l || nt, f = f || nt;
      const m = l.length, M = f.length, C = Math.min(m, M);
      let E;
      for (E = 0; E < C; E++) {
        const T = f[E] = y ? Se(f[E]) : xe(f[E]);
        I(l[E], T, a, null, h, v, w, _, y)
      }
      m > M ? Me(l, h, v, !0, !1, C) : V(f, a, p, h, v, w, _, y, C)
    }, ut = (l, f, a, p, h, v, w, _, y) => {
      let m = 0;
      const M = f.length;
      let C = l.length - 1, E = M - 1;
      for (; m <= C && m <= E;) {
        const T = l[m], S = f[m] = y ? Se(f[m]) : xe(f[m]);
        if ($e(T, S)) I(T, S, a, null, h, v, w, _, y); else break;
        m++
      }
      for (; m <= C && m <= E;) {
        const T = l[C], S = f[E] = y ? Se(f[E]) : xe(f[E]);
        if ($e(T, S)) I(T, S, a, null, h, v, w, _, y); else break;
        C--, E--
      }
      if (m > C) {
        if (m <= E) {
          const T = E + 1, S = T < M ? f[T].el : p;
          for (; m <= E;) I(null, f[m] = y ? Se(f[m]) : xe(f[m]), a, S, h, v, w, _, y), m++
        }
      } else if (m > E) for (; m <= C;) Fe(l[m], h, v, !0), m++; else {
        const T = m, S = m, D = new Map;
        for (m = S; m <= E; m++) {
          const re = f[m] = y ? Se(f[m]) : xe(f[m]);
          re.key != null && D.set(re.key, m)
        }
        let B, K = 0;
        const he = E - S + 1;
        let Ze = !1, zn = 0;
        const at = new Array(he);
        for (m = 0; m < he; m++) at[m] = 0;
        for (m = T; m <= C; m++) {
          const re = l[m];
          if (K >= he) {
            Fe(re, h, v, !0);
            continue
          }
          let be;
          if (re.key != null) be = D.get(re.key); else for (B = S; B <= E; B++) if (at[B - S] === 0 && $e(re, f[B])) {
            be = B;
            break
          }
          be === void 0 ? Fe(re, h, v, !0) : (at[be - S] = m + 1, be >= zn ? zn = be : Ze = !0, I(re, f[be], a, null, h, v, w, _, y), K++)
        }
        const Vn = Ze ? io(at) : nt;
        for (B = Vn.length - 1, m = he - 1; m >= 0; m--) {
          const re = S + m, be = f[re], qn = re + 1 < M ? f[re + 1].el : p;
          at[m] === 0 ? I(null, be, a, qn, h, v, w, _, y) : Ze && (B < 0 || m !== Vn[B] ? Je(be, a, qn, 2) : B--)
        }
      }
    }, Je = (l, f, a, p, h = null) => {
      const {el: v, type: w, transition: _, children: y, shapeFlag: m} = l;
      if (m & 6) {
        Je(l.component.subTree, f, a, p);
        return
      }
      if (m & 128) {
        l.suspense.move(f, a, p);
        return
      }
      if (m & 64) {
        w.move(l, f, a, Ye);
        return
      }
      if (w === pe) {
        i(v, f, a);
        for (let C = 0; C < y.length; C++) Je(y[C], f, a, p);
        i(l.anchor, f, a);
        return
      }
      if (w === nn) {
        z(l, f, a);
        return
      }
      if (p !== 2 && m & 1 && _) if (p === 0) _.beforeEnter(v), i(v, f, a), ne(() => _.enter(v), h); else {
        const {leave: C, delayLeave: E, afterLeave: T} = _, S = () => i(v, f, a), D = () => {
          C(v, () => {
            S(), T && T()
          })
        };
        E ? E(v, S, D) : D()
      } else i(v, f, a)
    }, Fe = (l, f, a, p = !1, h = !1) => {
      const {type: v, props: w, ref: _, children: y, dynamicChildren: m, shapeFlag: M, patchFlag: C, dirs: E} = l;
      if (_ != null && _n(_, null, a, l, !0), M & 256) {
        f.ctx.deactivate(l);
        return
      }
      const T = M & 1 && E, S = !hn(l);
      let D;
      if (S && (D = w && w.onVnodeBeforeUnmount) && ve(D, f, l), M & 6) yi(l.component, a, p); else {
        if (M & 128) {
          l.suspense.unmount(a, p);
          return
        }
        T && He(l, null, f, "beforeUnmount"), M & 64 ? l.type.remove(l, f, a, h, Ye, p) : m && (v !== pe || C > 0 && C & 64) ? Me(m, f, a, !1, !0) : (v === pe && C & 384 || !h && M & 16) && Me(y, f, a), p && Dn(l)
      }
      (S && (D = w && w.onVnodeUnmounted) || T) && ne(() => {
        D && ve(D, f, l), T && He(l, null, f, "unmounted")
      }, a)
    }, Dn = l => {
      const {type: f, el: a, anchor: p, transition: h} = l;
      if (f === pe) {
        vi(a, p);
        return
      }
      if (f === nn) {
        se(l);
        return
      }
      const v = () => {
        s(a), h && !h.persisted && h.afterLeave && h.afterLeave()
      };
      if (l.shapeFlag & 1 && h && !h.persisted) {
        const {leave: w, delayLeave: _} = h, y = () => w(a, v);
        _ ? _(l.el, v, y) : y()
      } else v()
    }, vi = (l, f) => {
      let a;
      for (; l !== f;) a = x(l), s(l), l = a;
      s(f)
    }, yi = (l, f, a) => {
      const {bum: p, scope: h, update: v, subTree: w, um: _} = l;
      p && Xt(p), h.stop(), v && (v.active = !1, Fe(w, l, f, a)), _ && ne(_, f), ne(() => {
        l.isUnmounted = !0
      }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve())
    }, Me = (l, f, a, p = !1, h = !1, v = 0) => {
      for (let w = v; w < l.length; w++) Fe(l[w], f, a, p, h)
    }, yt = l => l.shapeFlag & 6 ? yt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : x(l.anchor || l.el),
    Wn = (l, f, a) => {
      l == null ? f._vnode && Fe(f._vnode, null, null, !0) : I(f._vnode || null, l, f, null, null, null, a), Vs(), f._vnode = l
    }, Ye = {p: I, um: Fe, m: Je, r: Dn, mt: Vt, mc: V, pc: Ce, pbc: ie, n: yt, o: e};
  let Jt, Yt;
  return t && ([Jt, Yt] = t(Ye)), {render: Wn, hydrate: Jt, createApp: to(Wn, Jt)}
}

function je({effect: e, update: t}, n) {
  e.allowRecurse = t.allowRecurse = n
}

function di(e, t, n = !1) {
  const i = e.children, s = t.children;
  if (A(i) && A(s)) for (let r = 0; r < i.length; r++) {
    const o = i[r];
    let c = s[r];
    c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[r] = Se(s[r]), c.el = o.el), n || di(o, c))
  }
}

function io(e) {
  const t = e.slice(), n = [0];
  let i, s, r, o, c;
  const u = e.length;
  for (i = 0; i < u; i++) {
    const d = e[i];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[i] = s, n.push(i);
        continue
      }
      for (r = 0, o = n.length - 1; r < o;) c = r + o >> 1, e[n[c]] < d ? r = c + 1 : o = c;
      d < e[n[r]] && (r > 0 && (t[i] = n[r - 1]), n[r] = i)
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0;) n[r] = o, o = t[o];
  return n
}

const ro = e => e.__isTeleport, oo = Symbol(), pe = Symbol(void 0), Bn = Symbol(void 0), _e = Symbol(void 0),
  nn = Symbol(void 0), mt = [];
let We = null;

function Ue(e = !1) {
  mt.push(We = e ? null : [])
}

function lo() {
  mt.pop(), We = mt[mt.length - 1] || null
}

let Rt = 1;

function us(e) {
  Rt += e
}

function hi(e) {
  return e.dynamicChildren = Rt > 0 ? We || nt : null, lo(), Rt > 0 && We && We.push(e), e
}

function Xe(e, t, n, i, s, r) {
  return hi(H(e, t, n, i, s, r, !0))
}

function co(e, t, n, i, s) {
  return hi(Te(e, t, n, i, s, !0))
}

function fo(e) {
  return e ? e.__v_isVNode === !0 : !1
}

function $e(e, t) {
  return e.type === t.type && e.key === t.key
}

const zt = "__vInternal", pi = ({key: e}) => e != null ? e : null,
  Ft = ({ref: e, ref_key: t, ref_for: n}) => e != null ? q(e) || Q(e) || F(e) ? {i: we, r: e, k: t, f: !!n} : e : null;

function H(e, t = null, n = null, i = 0, s = null, r = e === pe ? 0 : 1, o = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && pi(t),
    ref: t && Ft(t),
    scopeId: Ys,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: i,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null
  };
  return c ? (Un(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= q(n) ? 8 : 16), Rt > 0 && !o && We && (u.patchFlag > 0 || r & 6) && u.patchFlag !== 32 && We.push(u), u
}

const Te = uo;

function uo(e, t = null, n = null, i = 0, s = null, r = !1) {
  if ((!e || e === oo) && (e = _e), fo(e)) {
    const c = Ve(e, t, !0);
    return n && Un(c, n), c
  }
  if (Eo(e) && (e = e.__vccOpts), t) {
    t = ao(t);
    let {class: c, style: u} = t;
    c && !q(c) && (t.class = tt(c)), J(u) && (Bs(u) && !A(u) && (u = G({}, u)), t.style = wn(u))
  }
  const o = q(e) ? 1 : Or(e) ? 128 : ro(e) ? 64 : J(e) ? 4 : F(e) ? 2 : 0;
  return H(e, t, n, i, s, o, r, !0)
}

function ao(e) {
  return e ? Bs(e) || zt in e ? G({}, e) : e : null
}

function Ve(e, t, n = !1) {
  const {props: i, ref: s, patchFlag: r, children: o} = e, c = t ? po(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && pi(c),
    ref: t && t.ref ? n && s ? A(s) ? s.concat(Ft(t)) : [s, Ft(t)] : Ft(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== pe ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ve(e.ssContent),
    ssFallback: e.ssFallback && Ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  }
}

function ho(e = " ", t = 0) {
  return Te(Bn, null, e, t)
}

function Ot(e = "", t = !1) {
  return t ? (Ue(), co(_e, null, e)) : Te(_e, null, e)
}

function xe(e) {
  return e == null || typeof e == "boolean" ? Te(_e) : A(e) ? Te(pe, null, e.slice()) : typeof e == "object" ? Se(e) : Te(Bn, null, String(e))
}

function Se(e) {
  return e.el === null || e.memo ? e : Ve(e)
}

function Un(e, t) {
  let n = 0;
  const {shapeFlag: i} = e;
  if (t == null) t = null; else if (A(t)) n = 16; else if (typeof t == "object") if (i & 65) {
    const s = t.default;
    s && (s._c && (s._d = !1), Un(e, s()), s._c && (s._d = !0));
    return
  } else {
    n = 32;
    const s = t._;
    !s && !(zt in t) ? t._ctx = we : s === 3 && we && (we.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
  } else F(t) ? (t = {default: t, _ctx: we}, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [ho(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n
}

function po(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const s in i) if (s === "class") t.class !== i.class && (t.class = tt([t.class, i.class])); else if (s === "style") t.style = wn([t.style, i.style]); else if (Ht(s)) {
      const r = t[s], o = i[s];
      o && r !== o && !(A(r) && r.includes(o)) && (t[s] = r ? [].concat(r, o) : o)
    } else s !== "" && (t[s] = i[s])
  }
  return t
}

function ve(e, t, n, i = null) {
  ue(e, t, 7, [n, i])
}

function go(e, t, n, i) {
  let s;
  const r = n && n[i];
  if (A(e) || q(e)) {
    s = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++) s[o] = t(e[o], o, void 0, r && r[o])
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, r && r[o])
  } else if (J(e)) if (e[Symbol.iterator]) s = Array.from(e, (o, c) => t(o, c, void 0, r && r[c])); else {
    const o = Object.keys(e);
    s = new Array(o.length);
    for (let c = 0, u = o.length; c < u; c++) {
      const d = o[c];
      s[c] = t(e[d], d, c, r && r[c])
    }
  } else s = [];
  return n && (n[i] = s), s
}

const bn = e => e ? gi(e) ? $n(e) || e.proxy : bn(e.parent) : null, kt = G(Object.create(null), {
  $: e => e,
  $el: e => e.vnode.el,
  $data: e => e.data,
  $props: e => e.props,
  $attrs: e => e.attrs,
  $slots: e => e.slots,
  $refs: e => e.refs,
  $parent: e => bn(e.parent),
  $root: e => bn(e.root),
  $emit: e => e.emit,
  $options: e => ri(e),
  $forceUpdate: e => () => Ds(e.update),
  $nextTick: e => mr.bind(e.proxy),
  $watch: e => Ir.bind(e)
}), mo = {
  get({_: e}, t) {
    const {ctx: n, setupState: i, data: s, props: r, accessCache: o, type: c, appContext: u} = e;
    let d;
    if (t[0] !== "$") {
      const O = o[t];
      if (O !== void 0) switch (O) {
        case 1:
          return i[t];
        case 2:
          return s[t];
        case 4:
          return n[t];
        case 3:
          return r[t]
      } else {
        if (i !== U && P(i, t)) return o[t] = 1, i[t];
        if (s !== U && P(s, t)) return o[t] = 2, s[t];
        if ((d = e.propsOptions[0]) && P(d, t)) return o[t] = 3, r[t];
        if (n !== U && P(n, t)) return o[t] = 4, n[t];
        pn && (o[t] = 0)
      }
    }
    const g = kt[t];
    let b, x;
    if (g) return t === "$attrs" && le(e, "get", t), g(e);
    if ((b = c.__cssModules) && (b = b[t])) return b;
    if (n !== U && P(n, t)) return o[t] = 4, n[t];
    if (x = u.config.globalProperties, P(x, t)) return x[t]
  }, set({_: e}, t, n) {
    const {data: i, setupState: s, ctx: r} = e;
    return s !== U && P(s, t) ? (s[t] = n, !0) : i !== U && P(i, t) ? (i[t] = n, !0) : P(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0)
  }, has({_: {data: e, setupState: t, accessCache: n, ctx: i, appContext: s, propsOptions: r}}, o) {
    let c;
    return !!n[o] || e !== U && P(e, o) || t !== U && P(t, o) || (c = r[0]) && P(c, o) || P(i, o) || P(kt, o) || P(s.config.globalProperties, o)
  }, defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : P(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
  }
}, _o = ai();
let bo = 0;

function vo(e, t, n) {
  const i = e.type, s = (t ? t.appContext : e.appContext) || _o, r = {
    uid: bo++,
    vnode: e,
    type: i,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Ri(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: li(i, s),
    emitsOptions: Js(i, s),
    emit: null,
    emitted: null,
    propsDefaults: U,
    inheritAttrs: i.inheritAttrs,
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = {_: r}, r.root = t ? t.root : r, r.emit = xr.bind(null, r), e.ce && e.ce(r), r
}

let X = null;
const yo = () => X || we, ot = e => {
  X = e, e.scope.on()
}, ze = () => {
  X && X.scope.off(), X = null
};

function gi(e) {
  return e.vnode.shapeFlag & 4
}

let vt = !1;

function xo(e, t = !1) {
  vt = t;
  const {props: n, children: i} = e.vnode, s = gi(e);
  Yr(e, n, s, t), Qr(e, i);
  const r = s ? wo(e, t) : void 0;
  return vt = !1, r
}

function wo(e, t) {
  const n = e.type;
  e.accessCache = Object.create(null), e.proxy = Us(new Proxy(e.ctx, mo));
  const {setup: i} = n;
  if (i) {
    const s = e.setupContext = i.length > 1 ? Mo(e) : null;
    ot(e), ct();
    const r = Ne(i, e, 0, [e.props, s]);
    if (ft(), ze(), Cs(r)) {
      if (r.then(ze, ze), t) return r.then(o => {
        as(e, o, t)
      }).catch(o => {
        $t(o, e, 0)
      });
      e.asyncDep = r
    } else as(e, r, t)
  } else mi(e, t)
}

function as(e, t, n) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = $s(t)), mi(e, n)
}

let ds;

function mi(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && ds && !i.render) {
      const s = i.template;
      if (s) {
        const {isCustomElement: r, compilerOptions: o} = e.appContext.config, {delimiters: c, compilerOptions: u} = i,
          d = G(G({isCustomElement: r, delimiters: c}, o), u);
        i.render = ds(s, d)
      }
    }
    e.render = i.render || me
  }
  ot(e), ct(), Wr(e), ft(), ze()
}

function Co(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return le(e, "get", "$attrs"), t[n]
    }
  })
}

function Mo(e) {
  const t = i => {
    e.exposed = i || {}
  };
  let n;
  return {
    get attrs() {
      return n || (n = Co(e))
    }, slots: e.slots, emit: e.emit, expose: t
  }
}

function $n(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy($s(Us(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in kt) return kt[n](e)
    }
  }))
}

function Eo(e) {
  return F(e) && "__vccOpts" in e
}

const To = (e, t) => pr(e, t, vt), Oo = "3.2.33", Ao = "http://www.w3.org/2000/svg",
  Ke = typeof document != "undefined" ? document : null, hs = Ke && Ke.createElement("template"), Fo = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e)
    },
    createElement: (e, t, n, i) => {
      const s = t ? Ke.createElementNS(Ao, e) : Ke.createElement(e, n ? {is: n} : void 0);
      return e === "select" && i && i.multiple != null && s.setAttribute("multiple", i.multiple), s
    },
    createText: e => Ke.createTextNode(e),
    createComment: e => Ke.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Ke.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t
    },
    insertStaticContent(e, t, n, i, s, r) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === r || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling));) ; else {
        hs.innerHTML = i ? `<svg>${e}</svg>` : e;
        const c = hs.content;
        if (i) {
          const u = c.firstChild;
          for (; u.firstChild;) c.appendChild(u.firstChild);
          c.removeChild(u)
        }
        t.insertBefore(c, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  };

function Io(e, t, n) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function Po(e, t, n) {
  const i = e.style, s = q(n);
  if (n && !s) {
    for (const r in n) vn(i, r, n[r]);
    if (t && !q(t)) for (const r in t) n[r] == null && vn(i, r, "")
  } else {
    const r = i.display;
    s ? t !== n && (i.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (i.display = r)
  }
}

const ps = /\s*!important$/;

function vn(e, t, n) {
  if (A(n)) n.forEach(i => vn(e, t, i)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
    const i = So(e, t);
    ps.test(n) ? e.setProperty(lt(i), n.replace(ps, ""), "important") : e[i] = n
  }
}

const gs = ["Webkit", "Moz", "ms"], sn = {};

function So(e, t) {
  const n = sn[t];
  if (n) return n;
  let i = rt(t);
  if (i !== "filter" && i in e) return sn[t] = i;
  i = Ts(i);
  for (let s = 0; s < gs.length; s++) {
    const r = gs[s] + i;
    if (r in e) return sn[t] = r
  }
  return t
}

const ms = "http://www.w3.org/1999/xlink";

function Lo(e, t, n, i, s) {
  if (i && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(ms, t.slice(6, t.length)) : e.setAttributeNS(ms, t, n); else {
    const r = Ci(t);
    n == null || r && !ys(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
  }
}

function No(e, t, n, i, s, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    i && o(i, s, r), e[t] = n == null ? "" : n;
    return
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const u = n == null ? "" : n;
    (e.value !== u || e.tagName === "OPTION") && (e.value = u), n == null && e.removeAttribute(t);
    return
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = ys(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0)
  }
  try {
    e[t] = n
  } catch {
  }
  c && e.removeAttribute(t)
}

const [_i, Ro] = (() => {
  let e = Date.now, t = !1;
  if (typeof window != "undefined") {
    Date.now() > document.createEvent("Event").timeStamp && (e = () => performance.now());
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53)
  }
  return [e, t]
})();
let yn = 0;
const ko = Promise.resolve(), Ho = () => {
  yn = 0
}, jo = () => yn || (ko.then(Ho), yn = _i());

function Bo(e, t, n, i) {
  e.addEventListener(t, n, i)
}

function Uo(e, t, n, i) {
  e.removeEventListener(t, n, i)
}

function $o(e, t, n, i, s = null) {
  const r = e._vei || (e._vei = {}), o = r[t];
  if (i && o) o.value = i; else {
    const [c, u] = Ko(t);
    if (i) {
      const d = r[t] = Do(i, s);
      Bo(e, c, d, u)
    } else o && (Uo(e, c, o, u), r[t] = void 0)
  }
}

const _s = /(?:Once|Passive|Capture)$/;

function Ko(e) {
  let t;
  if (_s.test(e)) {
    t = {};
    let n;
    for (; n = e.match(_s);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
  }
  return [lt(e.slice(2)), t]
}

function Do(e, t) {
  const n = i => {
    const s = i.timeStamp || _i();
    (Ro || s >= n.attached - 1) && ue(Wo(i, n.value), t, 5, [i])
  };
  return n.value = e, n.attached = jo(), n
}

function Wo(e, t) {
  if (A(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0
    }, t.map(i => s => !s._stopped && i && i(s))
  } else return t
}

const bs = /^on[a-z]/, zo = (e, t, n, i, s = !1, r, o, c, u) => {
  t === "class" ? Io(e, i, s) : t === "style" ? Po(e, n, i) : Ht(t) ? Cn(t) || $o(e, t, n, i, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Vo(e, t, i, s)) ? No(e, t, i, r, o, c, u) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), Lo(e, t, i, s))
};

function Vo(e, t, n, i) {
  return i ? !!(t === "innerHTML" || t === "textContent" || t in e && bs.test(t) && F(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || bs.test(t) && q(n) ? !1 : t in e
}

const qo = {
  name: String,
  type: String,
  css: {type: Boolean, default: !0},
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Lr.props;
const Jo = G({patchProp: zo}, Fo);
let vs;

function Yo() {
  return vs || (vs = no(Jo))
}

const Zo = (...e) => {
  const t = Yo().createApp(...e), {mount: n} = t;
  return t.mount = i => {
    const s = Xo(i);
    if (!s) return;
    const r = t._component;
    !F(r) && !r.render && !r.template && (r.template = s.innerHTML), s.innerHTML = "";
    const o = n(s, !1, s instanceof SVGElement);
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o
  }, t
};

function Xo(e) {
  return q(e) ? document.querySelector(e) : e
}

var Qo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, s] of t) n[i] = s;
  return n
};
const Go = {
    data() {
      return {
        popup_logo: "",
        popup_title: "",
        title: "",
        headline: "",
        video_code: "",
        video_code_mem: "",
        articles: "",
        isMagnified: !1,
        isMinified: !1,
        isVisible: !1,
        isFixed: !0,
        showLogo: !0,
        cookieMinutes: 60,
        delaySeconds: 3,
        testMode: !1,
        mode: "fixed"
      }
    }, methods: {
      showPopUp() {
        setTimeout(() => {
          this.$cookies.isKey("svp_closed") ? this.isVisible = !1 : this.isVisible = !0
        }, this.delaySeconds * 1e3)
      }, svpMagnify() {
        this.isMagnified = !this.isMagnified, this.isMinified = !1, this.video_code == "" && (this.video_code = this.video_code_mem), this.$cookies.isKey("svp_closed") && this.$cookies.remove("svp_closed")
      }, svpMinify() {
        this.isMinified = !this.isMinified, this.isVisible = !1, this.isMagnified = !1, this.video_code = "", this.$cookies.set("svp_closed", 1, this.cookieMinutes * 60 * 12), this.isFixed === !0 && (this.isVisible = !1)
      }, setSettings() {
        fetch("", {
          method: "GET",
          headers: {"Content-Type": "application/json", Accept: "application/json"}
        }).then(e => e.text()).then(e => {
          /*let t = JSON.parse(e);
          this.popup_logo = t.svp_popup_svg_logo, this.popup_title = t.svp_popup_title, this.headline = t.svp_headline, this.title = t.svp_title, this.video_code_mem = t.svp_video_code, this.video_code = this.video_code_mem, this.testMode = t.svp_test_mode_active == "on", this.showLogo = t.svp_show_logo == "on", this.articles = t.posts, this.mode = t.svp_mode, this.mode == "static" && (this.isFixed = !1, this.$cookies.isKey("svp_closed") ? this.isMinified = !0 : this.isMinified = !1), this.isFixed !== !0 && this.showPopUp();
          let n = document.getElementById("svp_cta");*/
          /*n && n.addEventListener("click", i => {
            this.isVisible = !0, this.svpMagnify()
          })*/
        })
      }, setSubscription() {
      }
    }, mounted() {
      this.$cookies.isKey("svp_closed") && (this.isMinified = !0), svp_cookie_minutes != null && (this.cookieMinutes = svp_cookie_minutes), svp_delay != null && (this.delaySeconds = svp_delay), this.setSettings()
    }
  }, el = {class: "svp__wrapper"}, tl = {class: "svp__header"}, nl = {key: 0, class: "svp__logo"}, sl = ["innerHTML"],
  il = H("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xml:space": "preserve",
    width: "40",
    height: "30",
    style: {"background-color": "#ffffff00"},
    viewBox: "0 0 40 30"
  }, [H("path", {d: "m28 15-16 7.5v-15L28 15ZM6 0a6 6 0 0 0-6 6v18a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6H6Z"})], -1),
  rl = [il], ol = {class: "label"}, ll = H("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xml:space": "preserve",
    viewBox: "0 0 1000 1000"
  }, [H("path", {d: "M292.19 12.89c-21.64 5.74-40.85 22.08-49.91 42.4-3.53 7.51-4.2 18.55-5.08 94.74l-1.1 86.13-86.13 1.1c-81.93 1.1-86.57 1.33-96.06 5.74-15.9 7.51-27.83 19.43-35.78 35.77l-7.29 14.8-.66 314.69c-.44 314.25-.44 314.69 4.2 329.93 3.97 13.25 6.63 17.22 18.33 29.15 11.92 11.71 15.9 14.35 29.15 18.33 15.24 4.64 15.68 4.64 329.93 4.19l314.69-.66 14.8-7.29c16.34-7.95 28.27-19.88 35.78-35.78 4.42-9.5 4.64-14.13 5.74-96.06l1.1-86.13 86.13-1.1c81.93-1.1 86.57-1.33 96.06-5.74 15.9-7.51 27.83-19.43 35.78-35.77l7.29-14.8.66-314.69c.44-314.25.44-314.69-4.19-329.93-3.98-13.25-6.63-17.23-18.33-29.15-11.7-11.48-16.12-14.35-28.71-18.33-15.02-4.64-16.12-4.64-325.73-4.42-238.74.01-312.94.67-320.67 2.88zm622.98 373.43v301.44H312.29V84.88h602.88v301.44zM237.2 509.33v197.21l6.4 13.25c7.51 15.68 19.21 28.05 34.45 36l11.04 5.96 199.2.66 199.42.44v152.38H84.83V312.35H237.2v196.98z"}), H("path", {d: "M562.94 163.28c-30.03 10.82-33.35 51.9-5.52 68.24 7.29 4.42 11.7 4.64 79.28 5.3l71.55.66-119.47 119.69c-82.38 82.6-120.58 122.35-123.01 127.87-4.64 11.48-4.2 21.64 1.77 32.68 9.05 17 29.15 24.07 47.48 16.56 5.52-2.43 45.27-40.63 127.87-123.01L762.58 291.8l.66 71.55c.66 67.58.88 71.99 5.3 79.28 5.3 9.28 16.34 17 26.72 18.99 17.67 3.31 37.76-9.72 42.62-27.38 1.55-6.63 2.21-44.83 1.77-128.09l-.66-118.59-5.08-8.17c-2.87-4.42-8.83-10.38-13.25-13.25l-8.17-5.08-120.36-.44c-99.82-.43-121.91.01-129.19 2.66z"})], -1),
  cl = [ll], fl = H("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xml:space": "preserve",
    style: {"enable-background": "new 0 0 330 330"},
    viewBox: "0 0 330 330"
  }, [H("path", {d: "M315 .001H15c-8.284 0-15 6.716-15 15v299.998c0 8.284 6.716 15 15 15h300c8.284 0 15-6.716 15-15V15.001c0-8.284-6.716-15-15-15zm-15 299.998H30V30.001h270v269.998z"}), H("path", {d: "M84.394 245.606A14.948 14.948 0 0 0 95 250c3.838 0 7.678-1.465 10.606-4.394l59.393-59.392 59.391 59.392A14.952 14.952 0 0 0 234.997 250c3.838 0 7.678-1.465 10.606-4.394 5.858-5.857 5.858-15.355 0-21.213L186.212 165l59.394-59.393c5.858-5.857 5.858-15.355 0-21.213-5.857-5.858-15.354-5.858-21.213 0L165 143.788l-59.393-59.395c-5.859-5.858-15.355-5.858-21.213 0-5.858 5.857-5.858 15.355 0 21.213l59.393 59.395-59.393 59.393c-5.858 5.857-5.858 15.355 0 21.212z"})], -1),
  ul = [fl], al = {class: "svp__player"}, dl = ["innerHTML"], hl = {class: "svp__headline"}, pl = {class: "svp__title"},
  gl = {class: "svp__related"}, ml = H("div", {class: "lp_icon"}, [H("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xml:space": "preserve",
    width: "40",
    height: "30",
    viewBox: "0 0 40 30"
  }, [H("path", {d: "m28 15-16 7.5v-15L28 15ZM6 0a6 6 0 0 0-6 6v18a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6H6Z"})])], -1),
  _l = {class: "lp_title"}, bl = ["href"], vl = {key: 0, class: "svp_test_mode"};

function yl(e, t, n, i, s, r) {
  return s.isVisible ? (Ue(), Xe("div", {
    key: 0,
    class: tt([{magnified: s.isMagnified, visible: s.isVisible, minified: s.isMinified, fixed: s.isFixed}, "svp"])
  }, [H("div", el, [H("div", tl, [s.showLogo ? (Ue(), Xe("div", nl, [H("div", {
    id: "svp_svg",
    innerHTML: s.popup_logo
  }, null, 8, sl), H("a", {
    onClick: t[0] || (t[0] = o => r.svpMagnify()),
    id: "svp_play",
    href: "javascript:void(0)"
  }, rl), H("div", ol, xt(s.popup_title), 1)])) : Ot("", !0), s.isFixed ? Ot("", !0) : (Ue(), Xe("a", {
    key: 1,
    onClick: t[1] || (t[1] = o => r.svpMagnify()),
    class: tt([{flip: s.isMagnified}, "svp__icon svp__magnify"]),
    href: "javascript:void(0)"
  }, cl, 2)), H("a", {
    onClick: t[2] || (t[2] = o => r.svpMinify()),
    class: tt([{hidden: s.isMinified}, "svp__icon svp__close"]),
    href: "javascript:void(0)"
  }, ul, 2)]), H("div", al, [H("div", {
    innerHTML: s.video_code,
    class: "playerContainer"
  }, null, 8, dl)]), H("div", {
    onClick: t[3] || (t[3] = o => r.svpMagnify()),
    class: "svp__content"
  }, [H("div", hl, xt(s.headline), 1), H("div", pl, xt(s.title), 1)]), H("div", gl, [H("ul", null, [(Ue(!0), Xe(pe, null, go(s.articles, o => (Ue(), Xe("li", null, [ml, H("div", _l, [H("a", {href: o.permalink}, xt(o.title), 9, bl)])]))), 256))])]), s.testMode ? (Ue(), Xe("div", vl, "Test mode active")) : Ot("", !0)])], 2)) : Ot("", !0)
}

var xl = Qo(Go, [["render", yl]]), bi = {exports: {}};
(function (e, t) {
  (function () {
    var n = {expires: "1d", path: "; path=/", domain: "", secure: "", sameSite: "; SameSite=Lax"}, i = {
      install: function (s, r) {
        r && this.config(r.expires, r.path, r.domain, r.secure, r.sameSite), s.prototype && (s.prototype.$cookies = this), s.config && s.config.globalProperties && (s.config.globalProperties.$cookies = this, s.provide("$cookies", this)), s.$cookies = this
      }, config: function (s, r, o, c, u) {
        n.expires = s || "1d", n.path = r ? "; path=" + r : "; path=/", n.domain = o ? "; domain=" + o : "", n.secure = c ? "; Secure" : "", n.sameSite = u ? "; SameSite=" + u : "; SameSite=Lax"
      }, get: function (s) {
        var r = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(s).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        if (r && r.substring(0, 1) === "{" && r.substring(r.length - 1, r.length) === "}") try {
          r = JSON.parse(r)
        } catch {
          return r
        }
        return r
      }, set: function (s, r, o, c, u, d, g) {
        if (s) {
          if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(s)) throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]	 current key name: ' + s)
        } else throw new Error("Cookie name is not found in the first argument.");
        r && r.constructor === Object && (r = JSON.stringify(r));
        var b = "";
        if (o = o == null ? n.expires : o, o && o != 0) switch (o.constructor) {
          case Number:
            o === 1 / 0 || o === -1 ? b = "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : b = "; max-age=" + o;
            break;
          case String:
            if (/^(?:\d+(y|m|d|h|min|s))$/i.test(o)) {
              var x = o.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, "$1");
              switch (o.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                case"m":
                  b = "; max-age=" + +x * 2592e3;
                  break;
                case"d":
                  b = "; max-age=" + +x * 86400;
                  break;
                case"h":
                  b = "; max-age=" + +x * 3600;
                  break;
                case"min":
                  b = "; max-age=" + +x * 60;
                  break;
                case"s":
                  b = "; max-age=" + x;
                  break;
                case"y":
                  b = "; max-age=" + +x * 31104e3;
                  break
              }
            } else b = "; expires=" + o;
            break;
          case Date:
            b = "; expires=" + o.toUTCString();
            break
        }
        return document.cookie = encodeURIComponent(s) + "=" + encodeURIComponent(r) + b + (u ? "; domain=" + u : n.domain) + (c ? "; path=" + c : n.path) + (d == null ? n.secure : d ? "; Secure" : "") + (g == null ? n.sameSite : g ? "; SameSite=" + g : ""), this
      }, remove: function (s, r, o) {
        return !s || !this.isKey(s) ? !1 : (document.cookie = encodeURIComponent(s) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (o ? "; domain=" + o : n.domain) + (r ? "; path=" + r : n.path) + "; SameSite=Lax", !0)
      }, isKey: function (s) {
        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(s).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
      }, keys: function () {
        if (!document.cookie) return [];
        for (var s = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), r = 0; r < s.length; r++) s[r] = decodeURIComponent(s[r]);
        return s
      }
    };
    e.exports = i, typeof window != "undefined" && (window.$cookies = i)
  })()
})(bi);
var wl = bi.exports;
Zo(xl).use(wl).mount("#svp");
