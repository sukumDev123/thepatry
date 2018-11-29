export class PartyModel {
  constructor(
    name_party = "",
    song = 0,
    theme = 0,
    food = 0,
    location = 0,
    price_total = 0,
    id_user = 0,
    start_time = ""
  ) {
    this.name_party = name_party
    this.song = song
    this.theme = theme
    this.food = food
    this.location = location
    this.price_total = price_total
    this.id_user = id_user
    this.start_time = start_time
  }
}
