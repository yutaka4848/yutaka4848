function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/*
    Please insert these modules into html.(<script type="module">)
        -> fetch_csv_data.js
        -> proc_csv.js
*/

var rootElem = document.currentScript.parentElement;
var ChartParameters = /*#__PURE__*/function (_React$Component) {
  _inherits(ChartParameters, _React$Component);
  var _super = _createSuper(ChartParameters);
  function ChartParameters(props) {
    var _this;
    _classCallCheck(this, ChartParameters);
    _this = _super.call(this, props);
    _this.state = {
      dataList: [],
      dataSelect: "",
      fieldSelect: []
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleAddField = _this.handleAddField.bind(_assertThisInitialized(_this));
    _this.handleDelField = _this.handleDelField.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.createSelectList = _this.createSelectList.bind(_assertThisInitialized(_this));
    _this.chart = new Chart(document.querySelector("#chart_field"), {
      type: "bar",
      options: {
        responsive: false,
        aspectRatio: 16 / 9,
        plugins: {
          title: {
            display: true,
            text: "Vital Statistics"
          }
        }
      }
    });
    return _this;
  }
  _createClass(ChartParameters, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res, dataList;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch("/api/list");
            case 2:
              res = _context.sent;
              _context.next = 5;
              return res.json();
            case 5:
              dataList = _context.sent.list;
              this.setState({
                dataList: dataList,
                dataSelect: dataList[0]
              });
              _context.next = 9;
              return import("/scripts/fetch_csv_data.js");
            case 9:
              this.modules = _context.sent;
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "createSelectList",
    value: function createSelectList() {
      var result = [];
      try {
        this.state.dataList.forEach(function (val, idx) {
          result.push( /*#__PURE__*/React.createElement("option", {
            key: "data_list_".concat(idx),
            value: val
          }, val));
        });
      } catch (err) {
        result.push("Error");
      }
      return /*#__PURE__*/React.createElement("select", null, result);
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref) {
      var target = _ref.target;
      this.setState({
        dataSelect: target.value
      });
    }
  }, {
    key: "handleAddField",
    value: function handleAddField(event) {
      var field_list = document.querySelector("select[id='field_list']");
      var select_field = document.querySelector("select[id='select_field']");
      var field = document.createElement("option");
      field.textContent = field_list.value;
      select_field.appendChild(field);
      var _iterator = _createForOfIteratorHelper(field_list),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var elem = _step.value;
          if (field_list.value == elem.value) {
            elem.setAttribute("disabled", true);
            elem.setAttribute("hidden", true);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.setState(function (state) {
        state.fieldSelect.push(field_list.value);
      });
    }
  }, {
    key: "handleDelField",
    value: function handleDelField(event) {
      var field_list = document.querySelector("select[id='field_list']");
      var select_field = document.querySelector("select[id='select_field']");
      var _iterator2 = _createForOfIteratorHelper(select_field),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var elem = _step2.value;
          if (select_field.value == elem.value) {
            elem.setAttribute("disabled", true);
            elem.setAttribute("hidden", true);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(field_list),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _elem = _step3.value;
          if (select_field.value == _elem.value) {
            _elem.removeAttribute("disabled");
            _elem.removeAttribute("hidden");
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.setState(function (state) {
        state.fieldSelect = state.fieldSelect.reduce(function (res, val) {
          if (val != select_field.value) res.push(val);
          return res;
        }, []);
      });
    }
  }, {
    key: "handleReplot",
    value: function () {
      var _handleReplot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
        var target, formData, column;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              target = _ref2.target;
              formData = new FormData(document.querySelector("form[id='parameters']"));
              column = this.state.fieldSelect;
              if (column.length > 0) {
                this.modules.createChart(this.chart, this.csvTable, {
                  label_field: this.fieldNames[0],
                  column: column
                });
              }
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function handleReplot(_x) {
        return _handleReplot.apply(this, arguments);
      }
      return handleReplot;
    }()
  }, {
    key: "handleClick",
    value: function () {
      var _handleClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
        var target, formData, filename, remove, count, fieldGroup, _iterator4, _step4, field;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              target = _ref3.target;
              formData = new FormData(document.querySelector("form[id='parameters']"));
              filename = this.state.dataSelect;
              remove = [" ", "　", new RegExp("Se\\d{2}", "g")]; // to replaceAll
              _context3.next = 6;
              return this.modules.requestCsvData({
                filename: filename,
                remove: remove
              });
            case 6:
              this.csvTable = _context3.sent;
              this.fieldNames = this.csvTable.getFeildNames;
              this.modules.createChart(this.chart, this.csvTable, {
                label_field: this.fieldNames[0],
                column: [this.fieldNames[1]]
              });
              if (!this.fieldList) {
                this.fieldList = ReactDOM.createRoot(document.querySelector("select[id='field_list']"));
                this.selectField = ReactDOM.createRoot(document.querySelector("select[id='select_field']"));
              }
              count = 0;
              fieldGroup = [];
              _iterator4 = _createForOfIteratorHelper(this.fieldNames);
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  field = _step4.value;
                  if (field) {
                    fieldGroup.push( /*#__PURE__*/React.createElement("option", {
                      key: "field".concat(count, "_").concat(field),
                      value: field
                    }, field));
                    count++;
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
              this.fieldList.render(fieldGroup);
              fieldGroup = fieldGroup.map(function (v) {
                v.props.disabled = true;
                v.props.hidden = true;
              });
              this.selectField.render(fieldGroup);
              this.setState({
                fieldSelect: []
              });
            case 18:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function handleClick(_x2) {
        return _handleClick.apply(this, arguments);
      }
      return handleClick;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement("form", {
        name: "parameters",
        id: "parameters",
        className: "d-flex flex-column justify-content-center"
      }, /*#__PURE__*/React.createElement("fieldset", {
        id: "data_list",
        name: "data_list",
        className: "d-flex flex-row justify-content-evenly",
        onChange: this.handleChange
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-2"
      }, this.state.dataList && this.createSelectList()), /*#__PURE__*/React.createElement("div", {
        className: "p-2"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick(e) {
          return _this2.handleClick(e);
        },
        name: "fetch_data",
        id: "fetch_data",
        className: "btn btn-primary rounded",
        type: "button",
        value: "read_data"
      }, "Read"))), /*#__PURE__*/React.createElement("fieldset", {
        id: "field",
        name: "field",
        className: "d-flex flex-row justify-content-evenly"
      }, /*#__PURE__*/React.createElement("select", {
        id: "field_list",
        className: "p-2",
        size: 5,
        style: {
          width: "10rem"
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "d-flex flex-column align-items-center"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        value: "add_field",
        className: "btn rounded",
        onClick: this.handleAddField
      }, /*#__PURE__*/React.createElement("div", {
        className: "shape_arrow"
      }, /*#__PURE__*/React.createElement("div", {
        className: "shape_arrow_body"
      }), /*#__PURE__*/React.createElement("div", {
        className: "shape_arrow_head right_head"
      }))), /*#__PURE__*/React.createElement("button", {
        type: "button",
        value: "del_field",
        className: "btn rounded",
        onClick: this.handleDelField
      }, /*#__PURE__*/React.createElement("div", {
        className: "shape_arrow"
      }, /*#__PURE__*/React.createElement("div", {
        className: "shape_arrow_body left_body"
      }), /*#__PURE__*/React.createElement("div", {
        className: "shape_arrow_head left_head"
      })))), /*#__PURE__*/React.createElement("select", {
        id: "select_field",
        className: "p-2",
        size: 5,
        style: {
          width: "10rem"
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "p-2"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick(e) {
          return _this2.handleReplot(e);
        },
        name: "plot",
        id: "plot",
        className: "btn btn-primary rounded",
        type: "button",
        value: "plot"
      }, "PLOT"))));
    }
  }]);
  return ChartParameters;
}(React.Component);
var root = ReactDOM.createRoot(rootElem);
root.render( /*#__PURE__*/React.createElement(ChartParameters, null));