import * as cont from "../controllers/admin.controller"
import * as admin from "firebase-admin"
const certFirebase = require("../../../lib/partydesign.json")
let conf = false
const adminFirebaseConnect = (req, res, next) => {
  if (!conf) {
    admin.initializeApp({
      credential: admin.credential.cert(certFirebase),
      databaseURL: "https://partydesign-a0c84.firebaseio.com"
    })
    conf = true
  }
  next()
}
export const adminRouter = router => {
  router.post("/user/createNewUser", adminFirebaseConnect, cont.create_new_user)
  router.post("/admin/findWithEmail", adminFirebaseConnect, cont.loginWithEmail)
  return router
}
