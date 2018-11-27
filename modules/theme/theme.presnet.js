export class ThemePresent {
  constructor(mysql) {
    this.mysql = mysql.promise()
  }
  getListOfThemePresent(start, end) {
    return new Promise((res, rej) => {
      const sqlSelect = `SELECT  * FROM tb_theme order by create_at desc limit ${start},${end}`
      this.mysql
        .query(sqlSelect)
        .then(([rows]) => {
          if (rows.length) {
            res(new MessageModel("List of Theme are shown.", 200, rows))
          } else {
            res(new MessageModel("Theme place is empty.", 200))
          }
        })
        .catch(err => rej(new MessageModel(err, 500)))
    })
  }
  getOneThemePresent(id_theme) {
    return new Promise((res, rej) => {
      const select_sql = "SELECT * FROM tb_theme WHERE id = ?"
      const arrayId = [id_theme]
      this.mysql
        .query(select_sql, arrayId)
        .then(([rows]) => {
          if (rows.length) {
            res(new MessageModel("Theme place is showed.", 200, rows[0]))
          } else {
            res(new MessageModel("Theme Place is not exists.", 200))
          }
        })
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  deleteThemePresent(id_theme) {
    return new Promise((res, rej) => {
      const deleteSql = "DELETE FROM tb_theme WHERE id = ?"
      const arrayId = [id_theme]
      this.mysql
        .query(deleteSql, arrayId)
        .then(succ => res(new MessageModel("Theme place is deleted.", 200)))
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  addNewThemePresent(theme) {
    const { detail_theme, name_theme, img_theme, price_theme } = theme
    const arraytheme = [detail_theme, name_theme, img_theme, price_theme]
    const sqlInsert =
      "INSERT INTO tb_theme(name_theme , detail_theme , img_theme , price_theme) VALUES (?,?,?,?)"
    return new Promise((res, rej) => {
      this.mysql
        .query(sqlInsert, arraytheme)
        .then(theme =>
          res(new MessageModel("The theme place is added in database.", 200))
        )
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
}
