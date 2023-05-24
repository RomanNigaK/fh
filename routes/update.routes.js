const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const router = Router();

router.post("/data", async (req, res) => {
  const { name, password, userid } = req.body;

  try {
    //const result = await User.deleteMany();
    const user = await User.findByIdAndUpdate(userid, {
      name: name,
      password: password,
    });

    const updateuser = await User.findById(userid);

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    console.log("user:", updateuser);

    res.json({
      name: updateuser.name,
      login: updateuser.login,
      password: updateuser.password,
      birthday: updateuser.birthday,
      email: updateuser.email,
      image: updateuser.image,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
