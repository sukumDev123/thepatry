import { register, loginNormal } from "../controllers/user.controller";
export const userRouter = router => {
  router.post("/register", register);
  router.post("/loginFunction", loginNormal);
  return router;
};
