import {
  loginUser,
  register_user,
  login_normal
} from "../presents/user.present"
import { UserModel } from "../models/user.model"

export const login = async (req, res, next) => {
  if (req.body) {
    try {
      const { email, password } = req.body
      const loginUserVa = await loginUser(email, password)
      res.json(loginUserVa)
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
export const register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body
    const register = await register_user(
      new UserModel(email, password, displayName, false, "user"),
      req.mysql_db
    )
    console.log(register)
    res.json(register)
  } catch (error) {
    console.log(error)
    next({ message: JSON.stringify(error), status: 500 })
  }
}
export const loginNormal = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const loginData = await login_normal(req.mysql_db, {
      email: email,
      password: password
    })
    res.json(loginData)
  } catch (error) {
    console.log(error)
    next({ message: JSON.stringify(error), status: 500 })
  }
}
