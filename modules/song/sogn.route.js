import * as songControl from "./song.controller"

export const songRoute = router => {
  router.get("/user/songlistuser")
  router.post("/admin/songlistadmin")
  router
    .route("/admin/song/:id_song")
    .put()
    .delete()
  router.param("id_song")

  return router
}
