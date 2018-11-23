import { UserModel } from "../model/user.model"
import * as upre from "../presents/user.present"
export const create_new_user = async (req, res, next) => {
  if (req.body) {
    try {
      const userModel = new UserModel(...req.body)
      const createUser = await upre.create_user(userModel)
      res.json(createUser)
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
