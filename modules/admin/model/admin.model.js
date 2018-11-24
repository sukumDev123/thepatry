export class AdminModel {
  constructor(email, password, name, varidatetion = false, role = "admin") {
    this.email = email
    this.emailVaridation = varidatetion
    this.password = password
    this.name = name
    this.role = role
    this.create_at = +new Date()
  }
}
