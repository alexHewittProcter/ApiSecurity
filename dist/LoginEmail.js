"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginEmail = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginEmail = function LoginEmail(email) {
  _classCallCheck(this, LoginEmail);

  this.attempts = 0;
  this.email = email;
};

exports.LoginEmail = LoginEmail;