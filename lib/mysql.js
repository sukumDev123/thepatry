import mysql from "mysql2/promise"
const configDB = require("./json/dbconfig.json")
export class MysqlConnect {
  constructor() {
    this.connected = false
    this.mysql_command
  }
  connect() {
    if (!this.connected) {
      this.mysql_command = mysql.createPool(configDB).Promise
      this.connected = true
    }
    return this
  }
  getMysqlDb() {
    if (this.connected) {
      return this.mysql_command
    } else {
      return this.connect().getMysqlDb()
    }
  }
}
