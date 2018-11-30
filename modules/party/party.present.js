import { MessageModel } from "../message.model"

export class PartyPresent {
  constructor(mysql) {
    this.mysql = mysql.promise()
  }
  addNewParty(party) {
    return new Promise((res, rej) => {
      const {
        name_party,
        food,
        location,
        theme,
        song,
        price_total,
        id_user,
        start_time
      } = party
      this.mysql
        .query(
          `INSERT INTO history_party(name_party,id_food , id_location,id_theme , id_song , price_total,id_user,start_time) VALUES(?,?,?,?,?,?,?,?)`,
          [
            name_party,
            food,
            location,
            theme,
            song,
            price_total,
            id_user,
            start_time
          ]
        )
        .then(data => {
          res(new MessageModel(`Insert new party success.`, 200))
        })
        .catch(err => rej(new MessageModel(JSON.stringify(err), 500)))
    })
  }
  getListParty(start, end, id_user) {
    return new Promise((res, rej) => {
      const sqlADd = `SELECT * FROM history_party hp
      WHERE hp.id_user = ? `
      this.mysql
        .query(sqlADd, [id_user])
        .then(([rows]) => {
          res(new MessageModel("List party success.", 200, rows))
        })
        .catch(err => console.log(err))
    })
  }
}
