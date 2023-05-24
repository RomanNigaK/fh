const { Router } = require("express");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const router = Router();

router.post("/all", async (req, res) => {
  try {
    const people = await User.find();

    if (!people) {
      return res.status(400).json({ message: "Пользователей не обнаружено" });
    }
    console.log(people);

    res.json({ people });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
