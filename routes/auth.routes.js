const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const router = Router();
const fs = require("fs");

router.post(
  "/reg",
  [
    check("email", "Email: не корректный email").isEmail(),

    check("login", "Логин: Минимальное количество символов 6").isLength({
      min: 6,
    }),
    check("password", "Пароль:  Минимальное количество символов 6").isLength({
      min: 6,
    }),
    check("name", "Имя: обязательно к заполнению").isLength({
      min: 1,
    }),
    check("birthday", "Дата рождения: обязательно к заполнению").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Не коректные данные" });
      }
      const { name, login, email, password, birthday, image, sex } = req.body;

      const isUser = await User.findOne({ login });

      if (isUser) {
        return res.status(400).json({ message: "пользователь существует" });
      }

      const user = new User({
        name,
        login,
        email,
        password,
        birthday,
        image,
        sex,
      });
      console.log(user);
      await user.save();

      res.status(201).send({ message: "Пользователь создан", status: 201 });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

router.post(
  "/login",
  [
    check("login", "Введите Login").exists(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Не коректные данные" });
      }
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      isMatch = password === user.password;
      if (!isMatch) {
        return res.status(400).json({ message: "Пароль не верен!" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({
        token,
        userId: user.id,
        info: {
          name: user.name,
          login: user.login,
          password: user.password,
          birthday: user.birthday,
          email: user.email,
          image: user.image,
          sex: user.sex,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

router.post("/user", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    res.json({
      name: user.name,
      login: user.login,
      password: user.password,
      birthday: user.birthday,
      email: user.email,
      image: user.image,
      sex: user.sex,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
