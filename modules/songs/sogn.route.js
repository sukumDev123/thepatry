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
  router
    .route("/admin/song/:id_song")
    .put(songControl.updateSongBand)
    .delete(songControl.deleteSongBand)
  router.param("id_song" , songControl.idSongParam)

  return router
}
