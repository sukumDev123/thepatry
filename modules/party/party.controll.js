import { PartyPresent } from "./party.present"
import { PartyModel } from "./party.model"
export const addParty = (req, res, next) => {
  const {
    name_party,
    song,
    food,
    location,
    theme,
    start_time,
    price_total,
    id_user
  } = req.body
  const partyModel = new PartyModel(
    name_party,
    song.id_song,
    theme.id_theme,
    food.id_food,
    location.id_location,
    price_total,
    id_user,
    `${start_time}`
  )

  const partyPresent = new PartyPresent(req.mysql_db)
  partyPresent
    .addNewParty(partyModel)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      next(err)
    })
}
export const getPartyList = (req, res, next) => {
  const { start_party, end_party, id_user } = req.query
  const getList = new PartyPresent(req.mysql_db)
  getList
    .getListParty(start_party, end_party, id_user)
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
}

export const allList = (req, res, next) => {
  const getAll = new PartyPresent(req.mysql_db)
  getAll
    .getAllListParty()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(JSON.stringify(err)))
}
