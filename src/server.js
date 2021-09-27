const express = require("express");
const connect = require("./config/db");
require("dotenv").config();
const { body } = require("express-validator");
const { register, login } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const lectureController = require("./controllers/lecture.controller");

const app = express();
app.use(express.json());

app.use("/users", userController);
app.use("/students", studentController);
app.use("/lectures", lectureController);

app.post("/signup", register);
app.post("/signin", login);
app.listen(process.env.SERVER_PORT, async () => {
  await connect();
  console.log("App responded");
});
