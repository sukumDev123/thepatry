import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import { adminRouter } from "../modules/admin/routes/admin.route"
import { userRouter } from "../modules/users/routes/user.route"
import { MysqlConnect } from "./mysql"
import { songRoute } from "../modules/songs/sogn.route"
import { locationRouter } from "../modules/locations/location.route"
import { foodRouter } from "../modules/food/food.route"
import { themeRouter } from "../modules/theme/theme.route"
const mysqlConnect = new MysqlConnect()
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
const mysqlConnectMid = (req, res, next) => {
  req.mysql_db = mysqlConnect.getMysqlDb()
  next()
}
const midleware = app => {
  app.use(express.static("./"))
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())
  app.use(headerSet)
  app.use(mysqlConnectMid)
}

const app_router = app => {
  const Router = express.Router()

  app.use("/api/v1", adminRouter(Router))
  app.use("/api/v1/user", userRouter(Router))
  app.use("/api/v1/song", songRoute(Router))
  app.use("/api/v1/location", locationRouter(Router))
  app.use("/api/v1/food", foodRouter(Router))
  app.use("/api/v1/theme", themeRouter(Router))
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
