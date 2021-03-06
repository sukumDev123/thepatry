import { AdminModel } from "../model/admin.model"
import * as apre from "../presents/admin.present"
export const create_new_user = async (req, res, next) => {
  if (req.body) {
    try {
      const { email, password, displayName } = req.body
      const userModel = new AdminModel(email, password, displayName)
      const createUser = await apre.create_user(userModel)
      res.json(createUser)
    } catch (error) {
      console.log(error)
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
export const loginWithEmail = async (req, res, next) => {
  if (req.body) {
    try {
      const { email } = req.body
      const findUserTouseUuid = await apre.findUser(email)
      const createToken = await apre.getToken(findUserTouseUuid.uid)
      res.json(createToken)
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
