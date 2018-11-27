import { LocationPresent } from "./location.present"
import { LocationModel } from "./location.model"
import { MessageModel } from "../message.model"

export const addNewOfLocation = async (req, res, next) => {
  try {
    const thisImg = req.files[0]
    const fileName = thisImg.filename
    const { location } = req.body
    const locationToJson = JSON.parse(location)
    const { name_location, detail_location, price_location } = locationToJson
    const locationModel = new LocationModel(
      name_location,
      detail_location,
      fileName,
      price_location
    )
    const addToLocationDb = await new LocationPresent(
      req.mysql_db
    ).addNewLocation(locationModel)
    res.json(addToLocationDb)
  } catch (error) {
    next({ message: error.message, status: error.status })
  }
}

export const getListAllUser = async (req, res, next) => {
  try {
    const { start_location, end_location } = req.query
    const getListLocation = await new LocationPresent(
      req.mysql_db
    ).getListLocation(start_location, end_location)
    res.json(getListLocation)
  } catch (error) {
    next({ message: error.message, status: error.status })
  }
}
export const getOneOfUser = (req, res, next) => {
  res.json(res.responeLocation)
}
export const updateLocation = async (req, res, next) => {
  try {
    const { name_location, detail_location, price_location } = req.body
    const locationModel = new LocationModel(
      name_location,
      detail_location,
      "",
      price_location
    )
    const updateLocation = await new LocationPresent(
      req.mysql_db
    ).updateLocation(locationModel, req.location.id)
    res.json(updateLocation)
  } catch (error) {
    next(error)
  }
}
export const deleteLocation = async (req, res, next) => {
  try {
    const id_location = req.location.id
    const delete_toDb = await new LocationPresent(req.mysql_db).deleteLocation(
      id_location
    )
    res.json(delete_toDb)
  } catch (error) {
    next(error)
  }
}
export const getLocationParam = (req, res, next, id) => {
  if (id) {
    new LocationPresent(req.mysql_db).getOneLocation(id).then(data => {
      req.location = data.data
      res.responeLocation = data
      next()
    })
  }
  next(new MessageModel("Id is not require.", 404))
}
