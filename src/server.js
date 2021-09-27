const express = require("express");
const connect = require("./config/db");

const app = express();
app.use(express.json());

app.listen(8020, async () => {
  await connect();
  console.log("App responded");
});
