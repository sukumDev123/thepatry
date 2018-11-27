import * as locationC from "./location.controller"
import uploads from "../../lib/multer"
export const locationRouter = router => {
  router.get("/user/list/locations", locationC.getListAllUser)
  router.post(
    "/admin/add/location",
    uploads.array("locationImg", 12),
    locationC.addNewOfLocation
  )
  router
    .route("/user/location/:id_location")
    .get(locationC.getOneOfUser)
    .put(locationC.updateLocation)
    .delete(locationC.deleteLocation)
  router.param("id_location", locationC.getLocationParam)
  return router
}
