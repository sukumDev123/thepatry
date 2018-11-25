import * as firebase from "firebase"
import { UserModel } from "../models/user.model"
export const loginUser = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

/**
 *
 * @param {UserModel} user
 */
export const register_user = user => {}
