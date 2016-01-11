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