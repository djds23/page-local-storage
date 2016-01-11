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
module.exports = exports['default'];

},{"./errors":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvZXJyb3JzLmpzIiwibGliL2luZGV4LmpzIiwibGliL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lDQU0sYUFBYTtZQUFiLGFBQWE7O0FBQ2pCLFdBREksYUFBYSxDQUNKLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRTswQkFEekQsYUFBYTs7dUVBQWIsYUFBYTs7QUFHZixVQUFLLE9BQU8sV0FBUyxVQUFVLG9CQUFlLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxvQ0FBK0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEFBQUUsQ0FBQTs7R0FDdEk7O1NBSkcsYUFBYTtFQUFTLEtBQUs7O0lBTzNCLGFBQWE7WUFBYixhQUFhOztBQUNqQixXQURJLGFBQWEsQ0FDSixVQUFVLEVBQUU7MEJBRHJCLGFBQWE7O3dFQUFiLGFBQWE7O0FBR2YsV0FBSyxPQUFPLFdBQVMsVUFBVSw0REFBeUQsQ0FBQTs7R0FDekY7O1NBSkcsYUFBYTtFQUFTLEtBQUs7O1FBT3hCLGFBQWEsR0FBYixhQUFhO1FBQUUsYUFBYSxHQUFiLGFBQWE7Ozs7Ozs7Ozs7O0FDVnJDLE9BQU8sQ0FBQyxPQUFPLGtCQUFtQixDQUFBO0FBQ2xDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUN4QixRQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUNyQzs7Ozs7Ozs7Ozs7Ozs7O0lDSkssZ0JBQWdCO1dBQWhCLGdCQUFnQjswQkFBaEIsZ0JBQWdCOzs7ZUFBaEIsZ0JBQWdCOzs0QkFDTCxHQUFXLEVBQUUsS0FBYSxFQUFRO0FBQy9DLFVBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDeEIsY0FBTSxZQUxILGFBQWEsQ0FLUSxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0s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QUFJLENBQUMsQ0FBQztBQUNuRSxNQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDdkIsV0FBTyxDQUFDLENBQUM7R0FDVjs7QUFFRCxNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLFNBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7Q0FDckMsQ0FBQyxDQUFBOztBQUVGLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQ2hELFFBQU0sWUEvRWdCLGFBQWEsQ0ErRVgsUUFBUSxDQUFDLENBQUM7Q0FDbkMsQ0FBQyxDQUFBOztrQkFFYSxnQkFBZ0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQXJndW1lbnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IgKG1ldGhvZE5hbWUsIGV4cGVjdGVkQXJnQ291bnQsIHJlY2lldmVkQXJnQ291bnQpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5tZXNzYWdlID0gYCAtICR7bWV0aG9kTmFtZX0gLSByZWNpZXZlZCAke2V4cGVjdGVkQXJnQ291bnQudG9TdHJpbmcoKX0gYXJndW1lbnRzIHdoZW4gaXQgcmVxdWlyZXMgJHtyZWNpZXZlZEFyZ0NvdW50LnRvU3RyaW5nKCl9YFxuICB9XG59XG5cbmNsYXNzIFJlYWRPbmx5RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChtZXRob2ROYW1lKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubWVzc2FnZSA9IGAgLSAke21ldGhvZE5hbWV9IC0gaXMgYSByZWFkLW9ubHkgcHJvcGVydHkuIFRoZXJlZm9yZSBpdCBjYW5ub3QgYmUgc2V0LmBcbiAgfVxufVxuXG5leHBvcnQgeyBBcmd1bWVudEVycm9yLCBSZWFkT25seUVycm9yIH07XG5cbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBwYWdlTG9jYWxTdG9yYWdlIGZyb20gJy4vc3RvcmUnO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBwYWdlTG9jYWxTdG9yYWdlXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59XG5cblxuIiwiLyogQGZsb3cgKi9cbmltcG9ydCB7IEFyZ3VtZW50RXJyb3IsIFJlYWRPbmx5RXJyb3IgfSBmcm9tICcuL2Vycm9ycydcblxuY2xhc3MgcGFnZUxvY2FsU3RvcmFnZSB7XG4gIHN0YXRpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgQXJndW1lbnRFcnJvcignc2V0SXRlbScsIGFyZ3VtZW50cy5sZW5ndGgsIDIpO1xuICAgIH1cblxuICAgIGxldCBsb2NhbENhY2hlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIGlmIChsb2NhbENhY2hlKSB7XG4gICAgICBsb2NhbENhY2hlID0gSlNPTi5wYXJzZShsb2NhbENhY2hlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxDYWNoZSA9IHt9O1xuICAgIH1cblxuICAgIGxvY2FsQ2FjaGVba2V5XSA9IHZhbHVlO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh3aW5kb3cubG9jYXRpb24uaHJlZiwgSlNPTi5zdHJpbmdpZnkobG9jYWxDYWNoZSkpO1xuICB9XG5cbiAgc3RhdGljIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiA/c3RyaW5nIHtcbiAgICBsZXQgbG9jYWxDYWNoZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICBpZiAoIWxvY2FsQ2FjaGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxvY2FsQ2FjaGUgPSBKU09OLnBhcnNlKGxvY2FsQ2FjaGUpO1xuICAgIGxldCBzdG9yZWRWYWx1ZSA9IGxvY2FsQ2FjaGVba2V5XTtcbiAgICBpZiAoc3RvcmVkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0b3JlZFZhbHVlO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgbG9jYWxDYWNoZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgaWYgKGxvY2FsQ2FjaGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbG9jYWxPYmogPSBKU09OLnBhcnNlKGxvY2FsQ2FjaGUpO1xuICAgIGlmIChPYmplY3Qua2V5cyhsb2NhbE9iaikubGVuZ3RoIDwgMikge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZWxldGUgbG9jYWxPYmpba2V5XTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0od2luZG93LmxvY2F0aW9uLmhyZWYsIEpTT04uc3RyaW5naWZ5KGxvY2FsT2JqKSk7XG4gIH1cblxuICBzdGF0aWMga2V5KGluZGV4OiBudW1iZXIpOiA/c3RyaW5nIHtcbiAgICBsZXQgbG9jYWxDYWNoZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgaWYgKGxvY2FsQ2FjaGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBrZXlBcnJheSA9IE9iamVjdC5rZXlzKEpTT04ucGFyc2UobG9jYWxDYWNoZSkpO1xuICAgIGxldCByZXR1cm5WYWx1ZSA9IGtleUFycmF5W2luZGV4XTtcbiAgICByZXR1cm4gdHlwZW9mIHJldHVyblZhbHVlID09PSAndW5kZWZpbmVkJyAgPyBudWxsIDogcmV0dXJuVmFsdWU7XG4gIH1cblxuICBzdGF0aWMgY2xlYXIoKTogdm9pZCB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgfVxufVxuXG5wYWdlTG9jYWxTdG9yYWdlLl9fZGVmaW5lR2V0dGVyX18oJ2xlbmd0aCcsICgpID0+IHtcbiAgbGV0IGxvY2FsQ2FjaGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0od2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICBpZiAobG9jYWxDYWNoZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgbGV0IGxvY2FsT2JqID0gSlNPTi5wYXJzZShsb2NhbENhY2hlKTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGxvY2FsT2JqKS5sZW5ndGg7XG59KVxuXG5wYWdlTG9jYWxTdG9yYWdlLl9fZGVmaW5lU2V0dGVyX18oJ2xlbmd0aCcsICgpID0+IHtcbiAgdGhyb3cgbmV3IFJlYWRPbmx5RXJyb3IoJ2xlbmd0aCcpO1xufSlcblxuZXhwb3J0IGRlZmF1bHQgcGFnZUxvY2FsU3RvcmFnZTtcblxuIl19
