/* eslint-disable space-before-function-paren */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.APP_SECRET || 'no_secret'

export function generateToken(params = {}): string {
  return jwt.sign(params, secret, {
    expiresIn: 86400
  })
}

export default {
  generateToken
}
