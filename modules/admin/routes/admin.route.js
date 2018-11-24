import * as cont from "../controllers/admin.controller"
const certFirebase = require("./partydesign.json")
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
  router.post(
    "/admin/createNewUser",
    adminFirebaseConnect,
    cont.create_new_user
  )
  router.post(
    "/admin/loginWithEmail",
    adminFirebaseConnect,
    cont.loginWithEmail
  )
  return router
}
