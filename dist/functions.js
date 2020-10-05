"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable space-before-function-paren */

var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _config = require('./config'); var _config2 = _interopRequireDefault(_config);

 function generateToken(params = {}) {
  return _jsonwebtoken2.default.sign(params, _config2.default.appSecret, {
    expiresIn: 86400
  })
} exports.generateToken = generateToken;

exports. default = {
  generateToken
}
