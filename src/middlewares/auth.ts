/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express'
import { Request } from '../types/Request'
import jwt from 'jsonwebtoken'

import config from '../config'

export default (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.header('authorization')

  if (!authHeader) { return res.status(401).send({ error: 'No token provided' }) }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) { return res.status(401).send({ error: 'Token error' }) }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' })
  }

  jwt.verify(token, config.appSecret, (err, decoded: any) => {
    if (err) { return res.status(401).send({ error: 'Invalid token' }) }

    req.userId = decoded.id
    next()
  })
}
