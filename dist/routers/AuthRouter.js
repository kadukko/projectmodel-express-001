"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable space-before-function-paren */
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

// Types


// Middlewares
var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

// Others
var _functions = require('../functions');

// Main Class
 class AuthRouter {
  
  

   constructor(knex) {
    this.router = _express2.default.Router()
    this.knex = knex

    this.routes()
  }

   routes() {
    // POST /register"
    this.register()

    // POST "/login"
    this.login()

    // GET "/me"
    this.me()
  }

   register() {
    this.router.post('/register', async (req, res) => {
      const { email } = req.body

      try {
        if (await this.knex('users').where({ email }).first()) {
          return res.status(400).send({ error: 'User already exists' })
        }

        const password = await _bcryptjs2.default.hash(req.body.password, 8)

        await this.knex('users').insert({
          username: email,
          email,
          password
        })

        const user = await this.knex('users').where({ email }).first()

        user.password = undefined

        const token = _functions.generateToken.call(void 0, { id: user.id })

        return res.send({ user, token })
      } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' })
      }
    })
  }

   login() {
    this.router.post('/login', async (req, res) => {
      const { email, password } = req.body

      const user = await this.knex('users').where({ email }).first()

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      if (!await _bcryptjs2.default.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      user.password = undefined

      const token = _functions.generateToken.call(void 0, { id: user.id })

      res.send({
        token
      })
    })
  }

   me() {
    this.router.get('/me', _auth2.default, async (req, res) => {
      const user = await this.knex('users').where({ id: req.userId }).first()

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      user.password = undefined

      return res.send({ user })
    })
  }
} exports.default = AuthRouter;
