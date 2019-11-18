import * as cont from "../controllers/admin.controller";

export const adminRouter = router => {
  router.post("/user/createNewUser", cont.create_new_user);
  router.post("/admin/findWithEmail", cont.loginWithEmail);
  return router;
};
