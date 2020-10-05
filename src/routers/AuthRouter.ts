/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable space-before-function-paren */
import express, { Response } from 'express'
import * as Knex from 'knex'
import bcrypt from 'bcryptjs'

// Types
import { Request } from '../types/Request'

// Middlewares
import mdAuth from '../middlewares/auth'

// Others
import { generateToken } from '../functions'

// Main Class
export default class AuthRouter {
  public router: express.Router
  private knex: Knex

  public constructor(knex: Knex) {
    this.router = express.Router()
    this.knex = knex

    this.routes()
  }

  private routes(): void {
    // POST /register"
    this.register()

    // POST "/login"
    this.login()

    // GET "/me"
    this.me()
  }

  private register(): void {
    this.router.post('/register', async (req: Request, res: Response): Promise<any> => {
      const { email } = req.body

      try {
        if (await this.knex('users').where({ email }).first()) {
          return res.status(400).send({ error: 'User already exists' })
        }

        const password = await bcrypt.hash(req.body.password, 8)

        await this.knex('users').insert({
          username: email,
          email,
          password
        })

        const user = await this.knex('users').where({ email }).first()

        user.password = undefined

        const token = generateToken({ id: user.id })

        return res.send({ user, token })
      } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' })
      }
    })
  }

  private login(): void {
    this.router.post('/login', async (req: Request, res: Response): Promise<any> => {
      const { email, password } = req.body

      const user = await this.knex('users').where({ email }).first()

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      user.password = undefined

      const token = generateToken({ id: user.id })

      res.send({
        token
      })
    })
  }

  private me() {
    this.router.get('/me', mdAuth, async (req: Request, res: Response): Promise<any> => {
      const user = await this.knex('users').where({ id: req.userId }).first()

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      user.password = undefined

      return res.send({ user })
    })
  }
}
