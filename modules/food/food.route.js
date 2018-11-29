import uploads from "../../lib/multer"
import * as foodC from "./food.controller"
export const foodRouter = router => {
  router.post(
    "/user/add/food",
    uploads.array("foodImg", 12),
    foodC.addNewFoodController
  )
  router.get("/user/list/foods", foodC.getListOfFoodPlace)
  router
    .route("/user/food/:id_food")
    .get(foodC.getOneOfFood)
    .delete(foodC.deleteFood)
  router.param("id_food", foodC.paramId)
  return router
}
