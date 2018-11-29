import { ThemePresent } from "./theme.presnet"
import { ThemeModel } from "./theme.model"
import { MessageModel } from "../message.model"

export const addNewFoodController = async (req, res, next) => {
  try {
    const { theme } = req.body
    const { name_theme, detail_theme, price_theme } = JSON.parse(theme)
    const files = req.files[0]
    const nameFile = files.filename
    const themeModel = new ThemeModel(
      name_theme,
      detail_theme,
      price_theme,
      nameFile
    )
    const themePresnet = await new ThemePresent(
      req.mysql_db
    ).addNewThemePresent(themeModel)
    res.json(themePresnet)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}

export const deleteTheme = async (req, res, next) => {
  try {
    const id = req.theme.id
    const img_theme = req.theme.img_theme
    const deleteThemePlace = await new ThemePresent(
      req.mysql_db
    ).deleteThemePresent(id, img_theme)

    res.json(deleteThemePlace)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const getListAllTheme = async (req, res, next) => {
  try {
    const { start_theme, end_theme } = req.query
    const getListTheme = await new ThemePresent(
      req.mysql_db
    ).getListOfThemePresent(start_theme, end_theme)
    res.json(getListTheme)
  } catch (error) {
    next(new MessageModel(JSON.stringify(error), 500))
  }
}
export const getOneOfTheme = (req, res, next) => {
  res.json(req.totalTheme)
}
export const paramId = (req, res, next, id) => {
  if (id) {
    new ThemePresent(req.mysql_db).getOneThemePresent(id).then(data => {
      req.theme = data.data
      req.totalTheme = data
      next()
    })
  } else {
    next(new MessageModel("Id is not require.", 404))
  }
}
