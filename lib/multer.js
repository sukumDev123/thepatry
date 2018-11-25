import multer from "multer"
import path from "path"
const storage = multer.diskStorage({
  destination: path.resolve("./public/"),
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.originalname.split(/[.]+/)[0]}-${Date.now()}-${path.extname(
        file.originalname
      )}`
    )
  }
})

const uploads = multer({
  storage: storage
})

export default uploads
