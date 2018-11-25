import * as firebase from "firebase"
export const loginUser = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)
