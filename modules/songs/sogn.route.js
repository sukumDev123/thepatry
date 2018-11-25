import * as songControl from "./song.controller"
import uploads from "../../lib/multer"

export const songRoute = router => {
  // router.get("/user/songlistuser")
  router.get("/admin/songlistadmin", songControl.getSongList)
  router.post(
    "/admin/add/song",
    uploads.array("image", 12),
    songControl.addNewsongBand
  )
  // router
  //   .route("/admin/song/:id_song")
  //   .put()
  //   .delete()
  // router.param("id_song")

  return router
}
