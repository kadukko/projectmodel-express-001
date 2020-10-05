"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable @typescript-eslint/no-explicit-any */


var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config'); var _config2 = _interopRequireDefault(_config);

exports. default = (req, res, next) => {
  const authHeader = req.header('authorization')

  if (!authHeader) { return res.status(401).send({ error: 'No token provided' }) }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) { return res.status(401).send({ error: 'Token error' }) }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' })
  }

  _jsonwebtoken2.default.verify(token, _config2.default.appSecret, (err, decoded) => {
    if (err) { return res.status(401).send({ error: 'Invalid token' }) }

    req.userId = decoded.id
    next()
  })
}
