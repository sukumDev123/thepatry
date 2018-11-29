import * as themeC from "./theme.controller"
import uploads from "../../lib/multer"
export const themeRouter = router => {
  router.get("/user/list/themes", themeC.getListAllTheme)
  router.post(
    "/user/add/theme",
    uploads.array("themeImg", 12),
    themeC.addNewFoodController
  )
  router
    .route("/user/theme/:id_theme")
    .delete(themeC.deleteTheme)
    .get(themeC.getOneOfTheme)
  router.param("id_theme", themeC.paramId)
  return router
}
