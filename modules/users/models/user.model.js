export class UserModel {
  constructor(
    email,
    password,
    displayName,
    varidatetion = false,
    role = "user"
  ) {
    this.email = email
    this.emailVaridation = varidatetion
    this.password = password
    this.displayName = displayName
    this.role = role
    this.create_at = +new Date()
  }
}
