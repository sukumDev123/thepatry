import * as firebase from "firebase"
import { UserModel } from "../models/user.model"
import { MessageModel } from "../../message.model"
import bcrypt from "bcrypt"
export const loginUser = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

/**
 *
 * @param {UserModel} user
 * @param {*}
 */
export const register_user = async (user, mysqlCommand) => {
  try {
    const mysql = mysqlCommand.promise()
    const [rows] = await mysql.query(
      "select email from users where email = ?",
      [user.email]
    )

    if (!rows.length) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password, salt)
      await mysql.query(
        "insert into users(email , password , roles , displayName) value(?,?,?)",
        [user.email, hash, user.role, user.displayName]
      )
      return new MessageModel("The user is add success.", 200)
    }
    return new MessageModel("User is exists.", 200)
  } catch (error) {
    return new MessageModel(error, 500)
  }
}
const check_password = (input_password, password) =>
  bcrypt.compareSync(input_password, password)
export const login_normal = async (mysqlCommand, { email, password }) => {
  try {
    const mysql = mysqlCommand.promise()
    const [rows] = await mysql.query(
      "select displayName , email , roles , password,id from users where  email = ?",
      [email]
    )
    // console.log(rows)
    if (rows.length) {
      console.log(check_password(password, rows[0].password))

      switch (check_password(password, rows[0].password)) {
        case true: {
          const user_input = {
            displayName: rows[0].displayName,
            roles: rows[0].roles,
            email: rows[0].email,
            id: rows[0].id
          }
          return user_input
        }
        case false: {
          return new MessageModel("Password is wrong.", 401)
        }
      }
    }
    return new MessageModel("Email isn't exists.", 301)
  } catch (error) {
    return new MessageModel(error, 500)
  }
}
