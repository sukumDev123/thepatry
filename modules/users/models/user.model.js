export class UserModel {
  constructor(email, password, name, varidatetion = false, role = "user") {
    this.email = email
    this.emailVaridation = varidatetion
    this.password = password
    this.name = name
    this.role = role
    this.create_at = +new Date()
  }
}
