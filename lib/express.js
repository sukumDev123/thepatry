import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import { userRouter } from "../modules/users/routes/user.route"
import * as admin from "firebase-admin"
const certFirebase = require("./partydesign.json")
let conf = false
function headerSet(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  )
  next()
}

function notFoundPage(req, res, next) {
  let err = {
    message: "Not Found",
    status: 404
  }

  next(err)
}
function handlerErroo(error, req, res, next) {
  res.status(error.status || 500).json({
    status: error.status,
    message: error.message
  })
}
const midleware = app => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())
  app.use(headerSet)
  app.use((req, res, next) => {
    if (!conf) {
      admin.initializeApp({
        credential: admin.credential.cert(certFirebase),
        databaseURL: "https://partydesign-a0c84.firebaseio.com"
      })
      conf = true
    }
    next()
  })
}
const app_router = app => {
  const Router = express.Router()
  app.use("/api/v1", userRouter(Router))
  app.use(notFoundPage)
  app.use(handlerErroo)
}
export const start = () => {
  const app = express()

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
  }
  midleware(app)
  app_router(app)
  return app
}
