import { LocationModel } from "../locations/location.model"
import { FoodModel } from "./food.model"
import { MessageModel } from "../message.model"

export class FoodPresnet {
  constructor(mysql) {
    this.mysql = mysql.promise()
  }

  /**
   *
   * @param {FoodModel} food
   */
  addNewFoodPresent(food) {
    const { detail_food, name_food, img_food, price_food } = food
    const arrayFood = [detail_food, name_food, img_food, price_food]
    const sqlInsert =
      "INSERT INTO tb_food(name_food , detail_food , img_food , price_food) VALUES (?,?,?,?)"
    return new Promise((res, rej) => {
      this.mysql
        .query(sqlInsert, arrayFood)
        .then(food =>
          res(new MessageModel("The Food place is added in database.", 200))
        )
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  deleteFoodPresent(id_food) {
    return new Promise((res, rej) => {
      const deleteSql = "DELETE FROM tb_food WHERE id = ?"
      const arrayId = [id_food]
      this.mysql
        .query(deleteSql, arrayId)
        .then(succ => res(new MessageModel("Food place is deleted.", 200)))
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  getOneFoodPresent(id_food) {
    return new Promise((res, rej) => {
      const select_sql = "SELECT * FROM tb_food WHERE id = ?"
      const arrayId = [id_food]
      this.mysql
        .query(select_sql, arrayId)
        .then(([rows]) => {
          if (rows.length) {
            res(new MessageModel("Food place is showed.", 200, rows[0]))
          } else {
            res(new MessageModel("Food Place is not exists.", 200))
          }
        })
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  getListOfFoodPresent(start, end) {
    return new Promise((res, rej) => {
      const sqlSelect = `SELECT  * FROM tb_food order by create_at desc limit ${start},${end}`
      this.mysql
        .query(sqlSelect)
        .then(([rows]) => {
          if (rows.length) {
            res(new MessageModel("List of Food are shown.", 200, rows))
          } else {
            res(new MessageModel("Food place is empty.", 200))
          }
        })
        .catch(err => rej(new MessageModel(err, 500)))
    })
  }
}
