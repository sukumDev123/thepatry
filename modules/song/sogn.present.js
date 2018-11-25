import { MessageModel } from "../message.model"
import { SongBandModel } from "./song.model"
import fs from "fs"
import path from "path"
const errHandler = err => new MessageModel(err, 500)

/**
 *
 * @param {*} mysqlCommand
 * @param {SongBandModel} songBand
 */
export const addNewSongBand = (mysqlCommand, songBand, img_files) =>
  new Promise((res, rej) => {
    mysqlCommand
      .promise()
      .query(
        "INSERT INTO songBand(name_band,detail_band,price_band,img_src) VALUES(?,?,?,?)"[
          (songBand.name_band,
          songBand.detail_band,
          songBand.price_band,
          songBand.img_src)
        ]
      )
      .then(data => res(addPhotoOnServer(data, songBand.img_src, img_files)))
      .catch(err => rej(errHandler(err)))
  })
const addPhotoOnServer = (data, name_img, img_files, cb) => {
  console.log(data)
  fs.writeFile(
    path.resolve(`./public/songband/${name_img}`, img_files, err =>
      err
        ? cb({ message: err, status: false })
        : cb({ message: "Image was writen.", status: true })
    )
  )
}
export const getOneSongBand = (id_song, mysqlCommand) =>
  new Promise((res, rej) => {
    mysqlCommand
      .promise()
      .query("Select * from songBand where id = ?", [id_song])
      .then(([rows]) => {
        switch (rows.length) {
          case true:
            res(new MessageModel("I find the song band success.", 200, rows[0]))

          case false:
            res(new MessageModel("The Song Band is not exists.", 200))
        }
      })
      .catch(err => rej(errHandler(err)))
  })
export const getListSong = (start_list, end_list, mysqlCommand) =>
  new Promise((res, rej) => {
    mysqlCommand
      .promise()
      .query(
        "select * from songBand order by create_at desc limit ? , ?"[
          (start_list, end_list)
        ]
      )
      .then(([rows]) => {
        switch (rows.length) {
          case true:
            res(
              new MessageModel(
                "I find list of the song band success.",
                200,
                rows
              )
            )
          case false:
            res(new MessageModel("The song is empty data.", 200))
        }
      })
      .catch(err => rej(errHandler(err)))
  })

/**
 *
 * @param {*} id_song
 * @param {*} mysqlCommand
 * @param {SongBandModel} songBandDataEdit
 */
export const updateSongBand = (id_song, mysqlCommand, songBandDataEdit) =>
  new Promise((res, rej) => {
    mysqlCommand
      .promise()
      .query(
        "UPDATE songBand SET name_bane = ? , detail_bane = ? , price_band = ? WHERE id = ?",
        [
          songBandDataEdit.name_band,
          songBandDataEdit.detail_band,
          songBandDataEdit.price_band,
          id_song
        ]
      )
      .then(data => res(data))
      .catch(err => new MessageModel(err, 500))
  })

export const deleteSongBand = async (id_song, mysqlCommand) =>
  new Promise((res, rej) => {
    mysqlCommand
      .promise()
      .query("DELETE FROM songBand WHERE id = ?", [id_song])
      .then(suc => res(suc))
      .catch(err => new MessageModel(err, 500))
  })
