/* eslint-disable space-before-function-paren */

import jwt from 'jsonwebtoken'
import config from './config'

export function generateToken(params = {}): string {
  return jwt.sign(params, config.appSecret, {
    expiresIn: 86400
  })
}

export default {
  generateToken
}
