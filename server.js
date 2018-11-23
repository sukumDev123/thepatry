import { start } from "./lib/express"
import http from "http"
const start_server = () => {
  process.env.PORT = process.env.PORT || 3000
  process.env.NODE_ENV = process.env.NODE_ENV || "development"

  http
    .createServer(start())
    .listen(process.env.PORT, () =>
      console.log(`Connect server to port : ${process.env.PORT} `)
    )
}
start_server()
