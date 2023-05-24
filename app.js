const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));
app.use("/image", express.static(path.join(__dirname, "image")));
app.use("/api/auth/", require("./routes/auth.routes"));
app.use("/api/people/", require("./routes/people.routes"));
app.use("/api/upload/", require("./routes/upload.routes"));
app.use("/api/update/", require("./routes/update.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    const data = await mongoose.connect(config.get("urlMongo"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`Server start ${PORT}`));
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}
start();
