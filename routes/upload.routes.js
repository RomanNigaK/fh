const { Router } = require("express");
const User = require("../models/User");

const file = require("../middleware/file");
console.log("fff", file.single("avatar"));
const router = Router();

router.post("/file", file.single("avatar"), async (req, res) => {
  console.log(req.body);
  try {
    if (req.errorFile) {
      return res.status(400).json({ message: req.errorFile });
    }

    if (req.body.userid) {
      const user = await User.findByIdAndUpdate(req.body.userid, {
        image: req.file.filename,
      });
    }

    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
