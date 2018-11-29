import mysql from "mysql2"
const configDB = require("./json/dbconfig.json")
export class MysqlConnect {
  constructor() {
    this.mysql_command
  }
  connect() {
    if (!this.mysql_command) {
      console.log("Created New Mysql.")

      this.mysql_command = mysql.createPool(configDB)
      this.connected = true
    }
    return this
  }
  getMysqlDb() {
    if (this.mysql_command) {
      return this.mysql_command
    } else {
      return this.connect().getMysqlDb()
    }
  }
}
