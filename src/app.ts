/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable space-before-function-paren */
import express, { Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import * as Knex from 'knex'
import knex from 'knex'
import dotenv from 'dotenv'

import { Request } from './types/Request'
import knexfile from '../knexfile'
import AuthRouter from './routers/AuthRouter'

dotenv.config()

const environment = process.env.ENVIRONMENT || 'development'

class App {
  public express: express.Application
  public multer: multer.Multer
  public knex: Knex

  public constructor() {
    this.express = express()
    this.multer = multer()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(cors())
  }

  private database(): void {
    this.knex = knex(knexfile[environment])
  }

  private routes(): void {
    this.express.get('/', (req: Request, res: Response) => {
      return res.send('Hello World')
    })

    this.express.use(new AuthRouter(this.knex).router)
  }
}

export default new App().express
