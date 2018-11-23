import { UserModel } from "../model/user.model"
import * as upre from "../presents/user.present"
export const create_new_user = async (req, res, next) => {
  if (req.body) {
    try {
      const { email, password, name } = req.body
      const userModel = new UserModel(email, password, name)
      const createUser = await upre.create_user(userModel)
      res.json(createUser)
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
export const loginWithEmail = async (req, res, next) => {
  if (req.body) {
    try {
      const { email } = req.body
      const findUserTouseUuid = await upre.findUser(email)
      const createToken = await upre.getToken(findUserTouseUuid.uid)
      res.json(createToken)
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
