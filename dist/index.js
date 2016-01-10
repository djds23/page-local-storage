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

if (module !== undefined) {
  module.exports = function () {
    return _store2.default;
  }();
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

},{"./errors":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvZXJyb3JzLmpzIiwibGliL2luZGV4LmpzIiwibGliL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lDQU0sYUFBYTtZQUFiLGFBQWE7O0FBQ2pCLFdBREksYUFBYSxDQUNKLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRTswQkFEekQsYUFBYTs7dUVBQWIsYUFBYTs7QUFHZixVQUFLLE9BQU8sV0FBUyxVQUFVLG9CQUFlLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxvQ0FBK0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEFBQUUsQ0FBQTs7R0FDdEk7O1NBSkcsYUFBYTtFQUFTLEtBQUs7O0lBTzNCLGFBQWE7WUFBYixhQUFhOztBQUNqQixXQURJLGFBQWEsQ0FDSixVQUFVLEVBQUU7MEJBRHJCLGFBQWE7O3dFQUFiLGFBQWE7O0FBR2YsV0FBSyxPQUFPLFdBQVMsVUFBVSw0REFBeUQsQ0FBQTs7R0FDekY7O1NBSkcsYUFBYTtFQUFTLEtBQUs7O1FBT3hCLGFBQWEsR0FBYixhQUFhO1FBQUUsYUFBYSxHQUFiLGFBQWE7Ozs7Ozs7Ozs7O0FDVnJDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUN4QixRQUFNLENBQUMsT0FBTyxHQUFHLEFBQUMsWUFBTTtBQUN0QiwyQkFBd0I7R0FDekIsRUFBRyxDQUFDO0NBQ047Ozs7Ozs7Ozs7Ozs7OztJQ0xLLGdCQUFnQjtXQUFoQixnQkFBZ0I7MEJBQWhCLGdCQUFnQjs7O2VBQWhCLGdCQUFnQjs7NEJBQ0wsR0FBVyxFQUFFLEtBQWEsRUFBUTtBQUMvQyxVQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3hCLGNBQU0sWUFMSCxhQUFhLENBS1EsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7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TUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQ3ZCLFdBQU8sQ0FBQyxDQUFDO0dBQ1Y7O0FBRUQsTUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QyxTQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQ3JDLENBQUMsQ0FBQTs7QUFFRixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUNoRCxRQUFNLFlBL0VnQixhQUFhLENBK0VYLFFBQVEsQ0FBQyxDQUFDO0NBQ25DLENBQUMsQ0FBQTs7a0JBRWEsZ0JBQWdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIEFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChtZXRob2ROYW1lLCBleHBlY3RlZEFyZ0NvdW50LCByZWNpZXZlZEFyZ0NvdW50KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubWVzc2FnZSA9IGAgLSAke21ldGhvZE5hbWV9IC0gcmVjaWV2ZWQgJHtleHBlY3RlZEFyZ0NvdW50LnRvU3RyaW5nKCl9IGFyZ3VtZW50cyB3aGVuIGl0IHJlcXVpcmVzICR7cmVjaWV2ZWRBcmdDb3VudC50b1N0cmluZygpfWBcbiAgfVxufVxuXG5jbGFzcyBSZWFkT25seUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvciAobWV0aG9kTmFtZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm1lc3NhZ2UgPSBgIC0gJHttZXRob2ROYW1lfSAtIGlzIGEgcmVhZC1vbmx5IHByb3BlcnR5LiBUaGVyZWZvcmUgaXQgY2Fubm90IGJlIHNldC5gXG4gIH1cbn1cblxuZXhwb3J0IHsgQXJndW1lbnRFcnJvciwgUmVhZE9ubHlFcnJvciB9O1xuXG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgcGFnZUxvY2FsU3RvcmFnZSBmcm9tICcuL3N0b3JlJztcblxuaWYgKG1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gKCgpID0+IHtcbiAgICByZXR1cm4gcGFnZUxvY2FsU3RvcmFnZTtcbiAgfSkoKTtcbn1cblxuXG4iLCIvKiBAZmxvdyAqL1xuaW1wb3J0IHsgQXJndW1lbnRFcnJvciwgUmVhZE9ubHlFcnJvciB9IGZyb20gJy4vZXJyb3JzJ1xuXG5jbGFzcyBwYWdlTG9jYWxTdG9yYWdlIHtcbiAgc3RhdGljIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBBcmd1bWVudEVycm9yKCdzZXRJdGVtJywgYXJndW1lbnRzLmxlbmd0aCwgMik7XG4gICAgfVxuXG4gICAgbGV0IGxvY2FsQ2FjaGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0od2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgaWYgKGxvY2FsQ2FjaGUpIHtcbiAgICAgIGxvY2FsQ2FjaGUgPSBKU09OLnBhcnNlKGxvY2FsQ2FjaGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbENhY2hlID0ge307XG4gICAgfVxuXG4gICAgbG9jYWxDYWNoZVtrZXldID0gdmFsdWU7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBKU09OLnN0cmluZ2lmeShsb2NhbENhY2hlKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0SXRlbShrZXk6IHN0cmluZyk6ID9zdHJpbmcge1xuICAgIGxldCBsb2NhbENhY2hlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIGlmICghbG9jYWxDYWNoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbG9jYWxDYWNoZSA9IEpTT04ucGFyc2UobG9jYWxDYWNoZSk7XG4gICAgbGV0IHN0b3JlZFZhbHVlID0gbG9jYWxDYWNoZVtrZXldO1xuICAgIGlmIChzdG9yZWRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RvcmVkVmFsdWU7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBsb2NhbENhY2hlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBpZiAobG9jYWxDYWNoZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBsb2NhbE9iaiA9IEpTT04ucGFyc2UobG9jYWxDYWNoZSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKGxvY2FsT2JqKS5sZW5ndGggPCAyKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0od2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlbGV0ZSBsb2NhbE9ialtrZXldO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh3aW5kb3cubG9jYXRpb24uaHJlZiwgSlNPTi5zdHJpbmdpZnkobG9jYWxPYmopKTtcbiAgfVxuXG4gIHN0YXRpYyBrZXkoaW5kZXg6IG51bWJlcik6ID9zdHJpbmcge1xuICAgIGxldCBsb2NhbENhY2hlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBpZiAobG9jYWxDYWNoZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGtleUFycmF5ID0gT2JqZWN0LmtleXMoSlNPTi5wYXJzZShsb2NhbENhY2hlKSk7XG4gICAgbGV0IHJldHVyblZhbHVlID0ga2V5QXJyYXlbaW5kZXhdO1xuICAgIHJldHVybiB0eXBlb2YgcmV0dXJuVmFsdWUgPT09ICd1bmRlZmluZWQnICA/IG51bGwgOiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0od2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICB9XG59XG5cbnBhZ2VMb2NhbFN0b3JhZ2UuX19kZWZpbmVHZXR0ZXJfXygnbGVuZ3RoJywgKCkgPT4ge1xuICBsZXQgbG9jYWxDYWNoZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIGlmIChsb2NhbENhY2hlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBsZXQgbG9jYWxPYmogPSBKU09OLnBhcnNlKGxvY2FsQ2FjaGUpO1xuICByZXR1cm4gT2JqZWN0LmtleXMobG9jYWxPYmopLmxlbmd0aDtcbn0pXG5cbnBhZ2VMb2NhbFN0b3JhZ2UuX19kZWZpbmVTZXR0ZXJfXygnbGVuZ3RoJywgKCkgPT4ge1xuICB0aHJvdyBuZXcgUmVhZE9ubHlFcnJvcignbGVuZ3RoJyk7XG59KVxuXG5leHBvcnQgZGVmYXVsdCBwYWdlTG9jYWxTdG9yYWdlO1xuXG4iXX0=
