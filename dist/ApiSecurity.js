"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiSecurity = void 0;

var _index = require("./index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiSecurity =
/*#__PURE__*/
function () {
  function ApiSecurity() {
    _classCallCheck(this, ApiSecurity);

    this.loginEndpoint = new _index.LoginEndpoint();
  }

  _createClass(ApiSecurity, [{
    key: "loginBlockCallback",
    value: function loginBlockCallback(callback) {
      this.loginEndpoint.addBlockCallback(callback);
    }
  }, {
    key: "loginFailure",
    value: function loginFailure(email) {
      this.loginEndpoint.loginFailure(email);
    }
  }, {
    key: "loginSucceed",
    value: function loginSucceed(email) {
      this.loginEndpoint.loginSucceed(email);
    }
  }]);

  return ApiSecurity;
}();

exports.ApiSecurity = ApiSecurity;