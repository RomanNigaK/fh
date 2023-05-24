const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "image/");
  },
  filename(req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.errorFile = "Недопустимый вид фаила";
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
