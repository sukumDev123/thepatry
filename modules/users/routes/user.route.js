import * as cont from "../controllers/user.controller"
export const userRouter = router => {
  router.post("/user/createNewUser", cont.create_new_user)
  return router
}
