"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Loader;
var _react = _interopRequireDefault(require("react"));
require("../App.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function Loader() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-container"
  }));
}