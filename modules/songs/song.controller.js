import { SongBandModel } from "./song.model"
import * as songP from "./sogn.present"
import { MessageModel } from "../message.model"
export const addNewsongBand = async (req, res, next) => {
  try {
    const { song } = req.body
    const songToJson = JSON.parse(song)
    const thisImg = req.files[0]
    const pathSongImag = thisImg.path
    const fileName = thisImg.filename
    const songBandModel = new SongBandModel(
      songToJson.name_band,
      songToJson.detail_band,
      songToJson.price_band,
      fileName,
      pathSongImag
    )

    const updateDataOnDb = await songP.addNewSongBand(
      req.mysql_db,
      songBandModel
    )
    res.json(updateDataOnDb)
  } catch (error) {
    console.log(error)
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const updateSongBand = async (req, res, next) => {
  try {
    if (req.song.id) {
      const { name_band, detail_band, price_band } = req.body
      const songData = new SongBandModel(name_band, detail_band, price_band, "")
      const update_bane = await songP.updateSongBand(
        req.song.id,
        req.mysql_db,
        songData
      )
      res.json(update_bane).end()
    }
    res.json(new MessageModel("This id is not exists.", 404)).end()
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const deleteSongBand = async (req, res, next) => {
  try {
    if (req.song.id) {
      const id_song = req.song.id
      const img_src = req.song.img_src
      const delete_this = await songP.deleteSongBand(
        id_song,
        img_src,
        req.mysql_db
      )
      res.json(delete_this)
    } else {
      res
        .status(404)
        .json(new MessageModel("This id is not exists.", 404))
        .end()
    }
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const getSongList = async (req, res, next) => {
  try {
    const { limit_start, limit_end } = req.query
    const listSong = await songP.getListSong(
      limit_start,
      limit_end,
      req.mysql_db
    )
    res.json(listSong)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const getSongOne = async (req, res, next) => {
  try {
    const thissong = req.song
    res.json(thissong)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const idSongParam = (req, res, next, id) => {
  if (id) {
    songP
      .getOneSongBand(id, req.mysql_db)
      .then(song => {
        req.song = song.data
        next()
      })
      .catch(e => {
        next(new MessageModel(JSON.stringify(e), 500))
      })
  } else {
    next(new MessageModel("Require is not a id song.", 404))
  }
}
