export class MessageModel {
  constructor(msg, status, data = [], size = 0) {
    this.message = msg
    this.status = status
    this.data = data
    this.size = size
  }
}
