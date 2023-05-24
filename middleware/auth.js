const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }

  try {
    console.log("1");
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован!!" });
    }

    const fromToken = jwt.verify(token, config.get("jwtSecret"));
    console.log(fromToken);
    req.user = fromToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Пользователь не авторизован111111" });
  }
};
