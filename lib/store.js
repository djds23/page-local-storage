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
module.exports = exports['default'];