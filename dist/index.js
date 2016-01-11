(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArgumentError = function (_Error) {
  _inherits(ArgumentError, _Error);

  function ArgumentError(methodName, expectedArgCount, recievedArgCount) {
    _classCallCheck(this, ArgumentError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArgumentError).call(this));

    _this.message = " - " + methodName + " - recieved " + expectedArgCount.toString() + " arguments when it requires " + recievedArgCount.toString();
    return _this;
  }

  return ArgumentError;
}(Error);

var ReadOnlyError = function (_Error2) {
  _inherits(ReadOnlyError, _Error2);

  function ReadOnlyError(methodName) {
    _classCallCheck(this, ReadOnlyError);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ReadOnlyError).call(this));

    _this2.message = " - " + methodName + " - is a read-only property. Therefore it cannot be set.";
    return _this2;
  }

  return ReadOnlyError;
}(Error);

exports.ArgumentError = ArgumentError;
exports.ReadOnlyError = ReadOnlyError;

},{}],2:[function(require,module,exports){
'use strict';

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_store2.default);
exports.default = _store2.default;
if (module !== undefined) {
  module.exports = exports['default'];
}

},{"./store":3}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pageLocalStorage = function () {
  function pageLocalStorage() {
    _classCallCheck(this, pageLocalStorage);
  }

  _createClass(pageLocalStorage, null, [{
    key: 'setItem',
    value: function setItem(key, value) {
      if (arguments.length < 2) {
        throw new _errors.ArgumentError('setItem', arguments.length, 2);
      }

      var localCache = window.localStorage.getItem(window.location.href);

      if (localCache) {
        localCache = JSON.parse(localCache);
      } else {
        localCache = {};
      }

      localCache[key] = value;
      window.localStorage.setItem(window.location.href, JSON.stringify(localCache));
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      var localCache = window.localStorage.getItem(window.location.href);

      if (!localCache) {
        return null;
      }

      localCache = JSON.parse(localCache);
      var storedValue = localCache[key];
      if (storedValue === undefined) {
        return null;
      }

      return storedValue;
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      var localCache = window.localStorage.getItem(window.location.href);
      if (localCache === null) {
        return;
      }

      var localObj = JSON.parse(localCache);
      if (Object.keys(localObj).length < 2) {
        window.localStorage.removeItem(window.location.href);
        return;
      }

      delete localObj[key];
      window.localStorage.setItem(window.location.href, JSON.stringify(localObj));
    }
  }, {
    key: 'key',
    value: function key(index) {
      var localCache = window.localStorage.getItem(window.location.href);
      if (localCache === null) {
        return null;
      }

      var keyArray = Object.keys(JSON.parse(localCache));
      var returnValue = keyArray[index];
      return typeof returnValue === 'undefined' ? null : returnValue;
    }
  }, {
    key: 'clear',
    value: function clear() {
      window.localStorage.removeItem(window.location.href);
    }
  }]);

  return pageLocalStorage;
}();

pageLocalStorage.__defineGetter__('length', function () {
  var localCache = window.localStorage.getItem(window.location.href);
  if (localCache === null) {
    return 0;
  }

  var localObj = JSON.parse(localCache);
  return Object.keys(localObj).length;
});

pageLocalStorage.__defineSetter__('length', function () {
  throw new _errors.ReadOnlyError('length');
});

exports.default = pageLocalStorage;

},{"./errors":1}]},{},[2]);
