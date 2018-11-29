import {
  loginUser,
  register_user,
  login_normal
} from "../presents/user.present"
import { UserModel } from "../models/user.model"
import { MessageModel } from "../../message.model"

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
    const { roles } = req.query
    const { email, password } = req.body
    const loginData = await login_normal(req.mysql_db, {
      email: email,
      password: password
    })
    if (roles === "admin") {
      if (loginData.roles) {
        loginData.success = true
        res.json(new MessageModel("Admin is logined.", 200, loginData)).end()
      } else {
        res
          .status(401)
          .json(
            new MessageModel("You are not a admin.", 401, {
              email: "",
              displayName: "",
              roles: "",
              success: false
            })
          )
          .end()
      }
    } else {
      res.json(new MessageModel("Get auth.", 200, loginData))
    }
  } catch (error) {
    console.log(error)
    next({ message: JSON.stringify(error), status: 500 })
  }
}
// export const createNewUser = async (req, res, next) => {}
