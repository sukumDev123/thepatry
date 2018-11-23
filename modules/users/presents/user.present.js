import * as admin from "firebase-admin"
import { UserModel } from "../model/user.model"

/**
 *
 * @param {UserModel} user
 */
export const create_user = user => admin.auth().createUser(user)

export const findUser = email => admin.auth().getUserByEmail(email)

export const getToken = uuid => admin.auth().createCustomToken(uuid)

export const checkToken = idToken => admin.auth().verifyIdToken(idToken, true)

export const revokeTOken = uuid => admin.auth().revokeRefreshTokens(uuid)

export const linkVerificationEmail = email =>
  admin.auth().generateEmailVerificationLink(email)
