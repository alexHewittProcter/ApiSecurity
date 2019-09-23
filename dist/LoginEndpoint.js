"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginEndpoint = void 0;

var _LoginEmail = require("./LoginEmail");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginEndpoint =
/*#__PURE__*/
function () {
  function LoginEndpoint() {
    _classCallCheck(this, LoginEndpoint);

    this.loginEmails = [];
    this.blockCallbacks = [];
    this.acceptedAttempts = 3; //Default to 3
  }

  _createClass(LoginEndpoint, [{
    key: "loginFailure",
    value: function loginFailure(email) {
      var emailObject = this.findEmail(email);
      emailObject.attempts++;

      if (emailObject.attempts >= this.acceptedAttempts) {
        this.callCallbacks();
      }
    }
  }, {
    key: "loginSucceed",
    value: function loginSucceed(email) {
      var emailObject = this.findEmail(email);
      var objectIndex = this.findEmailIndex(emailObject);
      this.loginEmails.splice(objectIndex, 1);
    }
  }, {
    key: "findEmail",
    value: function findEmail(email) {
      var emailArray = this.loginEmails.filter(function (loginEmail) {
        return loginEmail.email === email;
      });

      if (emailArray.length === 1) {
        return emailArray[0];
      } else {
        //Create new object
        var newLoginEmail = new _LoginEmail.LoginEmail(email);
        this.loginEmails.push(newLoginEmail);
        return newLoginEmail;
      }
    }
  }, {
    key: "findEmailIndex",
    value: function findEmailIndex(emailObject) {
      return this.loginEmails.indexOf(emailObject);
    }
  }, {
    key: "addBlockCallback",
    value: function addBlockCallback(callback) {
      this.blockCallbacks.push(callback);
    }
  }, {
    key: "callCallbacks",
    value: function callCallbacks() {
      this.blockCallbacks.forEach(function (callback) {
        return callback();
      });
    }
  }]);

  return LoginEndpoint;
}();

exports.LoginEndpoint = LoginEndpoint;