import { MessageModel } from "../message.model"
import { LocationModel } from "./location.model"
import fs from "fs"
import path from "path"
export class LocationPresent {
  constructor(mysql) {
    this.mysql = mysql.promise()
  }
  getListLocation(start, end) {
    return new Promise((res, rej) => {
      if (this.mysql) {
        const sqlSelect = `SELECT * FROM tb_location order by create_at limit ${start},${end}`
        const getTotal = `select count(*) as size from tb_location`

        this.mysql
          .query(sqlSelect)
          .then(([rows]) => {
            const list = rows
            if (list.length) {
              this.mysql.query(getTotal).then(([rows]) => {
                console.log(rows)
                const { size } = rows[0]
                res(new MessageModel("Find Location success.", 200, list, size))
              })
            } else {
              res(new MessageModel("Location is empty.", 200, []))
            }
          })
          .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
      }
    })
  }
  /**
   *
   * @param {LocationModel} location
   */
  addNewLocation(location) {
    return new Promise((res, rej) => {
      const {
        name_location,
        detail_location,
        img_location,
        price_location
      } = location
      const sqlInsert = `INSERT INTO tb_location(name_location,detail_location , img_location,price_location) VALUES (?,?,?,?)`
      const dataToInsert = [
        name_location,
        detail_location,
        img_location,
        price_location
      ]
      this.mysql
        .query(sqlInsert, dataToInsert)
        .then(data =>
          res(new MessageModel("Insert data to tb_location db success", 200))
        )
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  updateLocation(location, id_location) {
    return new Promise((res, rej) => {
      const updateSql = `UPDATE tb_location SET name_location = ? , detail_location =? , price_location = ? where id= ?`
      const { name_location, detail_location, price_location } = location
      const updateLocationData = [
        name_location,
        detail_location,
        price_location,
        id_location
      ]
      this.mysql
        .query(updateSql, updateLocationData)
        .then(data => res(new MessageModel("Update location success.", 200)))
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  deleteLocation(id_location, img_src) {
    return new Promise((res, rej) => {
      const deleteSql = `DELETE FROM tb_location WHERE id = ?`
      const id_toDeleteOnDb = [id_location]
      fs.unlinkSync(path.resolve(`./public/${img_src}`))

      this.mysql
        .query(deleteSql, id_toDeleteOnDb)
        .then(data => res(new MessageModel("Location is deleted.", 200)))
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  getOneLocation(id_location) {
    return new Promise((res, rej) => {
      const getOneLocation = `SELECT * FROM tb_location WHERE id = ?`
      const id_loca_arr = [id_location]
      this.mysql
        .query(getOneLocation, id_loca_arr)
        .then(([rows]) => {
          if (rows.length) {
            res(new MessageModel("Location is show .", 200, rows[0]))
          } else {
            res(new MessageModel("Location is not exists.", 200))
          }
        })
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
}
