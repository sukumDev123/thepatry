import { FoodModel } from "./food.model"
import { FoodPresnet } from "./food.present"
import { MessageModel } from "../message.model"

export const addNewFoodController = async (req, res, next) => {
  try {
    const { food } = req.body
    const { name_food, detail_food, price_food } = JSON.parse(food)
    const files = req.files[0]
    const nameFile = files.filename
    const foodObject = new FoodModel(
      name_food,
      detail_food,
      price_food,
      nameFile
    )
    const foodPresnet = await new FoodPresnet(req.mysql_db).addNewFoodPresent(
      foodObject
    )
    res.json(foodPresnet)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const getListOfFoodPlace = async (req, res, next) => {
  try {
    const { start_food, end_food } = req.query
    const getList = await new FoodPresnet(req.mysql_db).getListOfFoodPresent(
      start_food,
      end_food
    )
    res.json(getList)
  } catch (error) {
    console.log(error)
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const getOneOfFood = (req, res) => {
  res.json(req.foodTotal).end()
}
export const deleteFood = async (req, res, next) => {
  try {
    const { id, img_theme } = req.food

    const deleteFoodPlace = await new FoodPresnet(
      req.mysql_db
    ).deleteFoodPresent(id, img_theme)
    res.json(deleteFoodPlace)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const paramId = (req, res, next, id) => {
  if (id) {
    new FoodPresnet(req.mysql_db).getOneFoodPresent(id).then(data => {
      req.food = data.data
      req.foodTotal = data
      next()
    })
  } else {
    next(new MessageModel("Id is not require.", 404))
  }
}
