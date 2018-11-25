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
export const addNewSongBand = (mysqlCommand, songBand) =>
  new Promise((res, rej) => {
    const { name_band, detail_band, price_band, img_src, path_img } = songBand
    const arraySong = [name_band, detail_band, price_band, img_src, path_img]
    const sql_add_song = `INSERT INTO songBand(name_band,detail_band,price_band,img_src,path_img) VALUES (?,?,?,?,?)`
    const msgSuccess = `Upload New Song Band Conllection Success.`
    mysqlCommand
      .promise()
      .query(sql_add_song, arraySong)
      .then(data => res(new MessageModel(msgSuccess, 200)))
      .catch(err => rej(errHandler(err)))
  })

export const getOneSongBand = (id_song, mysqlCommand) =>
  new Promise((res, rej) => {
    mysqlCommand
      .promise()
      .query("Select * from songBand where id = ?", [id_song])
      .then(([rows]) => {
        if (rows.length) {
          return res(new MessageModel(msgSuccess, 200, rows))
        } else {
          return res(new MessageModel("The song is empty data.", 200))
        }
      })
      .catch(err => rej(errHandler(err)))
  })
export const getListSong = (start_list, end_list, mysqlCommand) =>
  new Promise((res, rej) => {
    const getListSql = `select * from songBand order by create_at desc limit ${start_list},${end_list}`
    const msgSuccess = "I find list of the song band success."
    mysqlCommand
      .promise()
      .query(getListSql)
      .then(([rows]) => {
        if (rows.length) {
          return res(new MessageModel(msgSuccess, 200, rows))
        } else {
          return res(new MessageModel("The song is empty data.", 200))
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
    const update_sql_song = `UPDATE songBand SET name_bane = ? , detail_bane = ? , price_band = ? WHERE id = ?`
    const { name_band, detail_band, price_band } = songBandDataEdit
    const array_song = [name_band, detail_band, price_band, id_song]
    mysqlCommand
      .promise()
      .query(update_sql_song, array_song)
      .then(data => res(data))
      .catch(err => rej(new MessageModel(err, 500)))
  })

export const deleteSongBand = async (id_song, mysqlCommand) =>
  new Promise((res, rej) => {
    getOneSongBand(id_song, mysqlCommand).then(suc => {
      fs.unlinkSync(path.resolve(`./public/${suc.img_src}`))
      mysqlCommand
        .promise()
        .query("DELETE FROM songBand WHERE id = ?", [id_song])
        .then(suc => res(suc))
        .catch(err => rej(new MessageModel(err, 500)))
    })
  })
