export class AdminModel {
  constructor(
    email,
    password,
    displayName,
    varidatetion = false,
    role = "admin"
  ) {
    this.email = email
    this.emailVaridation = varidatetion
    this.password = password
    this.displayName = displayName
    this.role = role
    this.create_at = +new Date()
  }
}
