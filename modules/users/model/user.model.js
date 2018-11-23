export class UserModel {
  constructor(email, password, name, varidatetion = false) {
    this.email = email
    this.emailVaridation = varidatetion
    this.password = password
    this.name = name
    this.create_at = +new Date()
  }
}
