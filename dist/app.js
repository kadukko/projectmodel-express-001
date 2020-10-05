"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable space-before-function-paren */
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _knex = require('knex'); var Knex = _interopRequireWildcard(_knex);

var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);


var _knexfile = require('../knexfile'); var _knexfile2 = _interopRequireDefault(_knexfile);
var _AuthRouter = require('./routers/AuthRouter'); var _AuthRouter2 = _interopRequireDefault(_AuthRouter);

_dotenv2.default.config()

const environment = process.env.ENVIRONMENT || 'development'

class App {
  
  
  

   constructor() {
    this.express = _express2.default.call(void 0, )
    this.multer = _multer2.default.call(void 0, )
    this.middlewares()
    this.database()
    this.routes()
  }

   middlewares() {
    this.express.use(_bodyparser2.default.json())
    this.express.use(_bodyparser2.default.urlencoded({ extended: true }))
    this.express.use(_cors2.default.call(void 0, ))
  }

   database() {
    this.knex = Knex.default.call(void 0, _knexfile2.default[environment])
  }

   routes() {
    this.express.get('/', (req, res) => {
      return res.send('Hello World')
    })

    this.express.use(new (0, _AuthRouter2.default)(this.knex).router)
  }
}

exports. default = new App().express
