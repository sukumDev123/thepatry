import { login } from "../controllers/user.controller"
import * as firebase from "firebase"
const config_firebase = require("../../../lib/partyuser.json")
let firecon = false

const firebaseConn = (req, res, next) => {
  if (!firecon) {
    firebase.initializeApp(config_firebase)
    firecon = true
  }
  next()
}
export const userRouter = router => {
  router.post("/loginUser", firebaseConn, login)

  return router
}
