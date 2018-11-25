import { login, register, loginNormal } from "../controllers/user.controller"
import * as firebase from "firebase"
const config_firebase = require("../../../lib/json/partyuser.json")
let firecon = false

const firebaseConn = (req, res, next) => {
  if (!firecon) {
    firebase.initializeApp(config_firebase)
    firecon = true
  }
  next()
}
const connectDb = (req, res, next) => {}
export const userRouter = router => {
  router.post("/loginUserWithfirebase", firebaseConn, login)
  router.post("/register", register)
  router.post("/loginFunction", loginNormal)
  return router
}
